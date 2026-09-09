import { getArticleTheme, renderThemeHeading } from './articleThemes.js'

const CODE_FENCE_RE = /^```(\w*)$/
const CODE_INDENT_RE = /^(?:\t|    )/
const IMG_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g
const HASH_HEADING_RE = /^(#{1,5})\s+(.+)$/
// “第二部分就是……”是正文，不应因为以“第二部分”开头而被识别成标题。
// 对“第 X 章/部分”形式要求后面有空格或冒号，避免吞掉正文；中文数字序号仍可不加空格。
const H1_RE = /^(?:[一二三四五六七八九十]+[、.．]\s*|第[一二三四五六七八九十]+[章节篇部分](?:\s+|[：:]\s*))(.+)$/
const H2_RE = /^(?:[（(][一二三四五六七八九十]+[)）])\s*(.+)$/
const H3_RE = /^(?:[【［][^】］]+[】］])\s*(.+)$/
const HR_RE = /^-{3,}$/
const TASK_RE = /^[-*]\s+\[([ x])\]\s+(.+)$/
const OL_RE = /^\d+[.．、]\s+(.+)$/
const UL_RE = /^[-*•●]\s+(.+)$/
const QUOTE_RE = /^\s*>\s?(.*)$/
const CALLOUT_RE = /^\[!([A-Za-z][\w-]*)\]([+-])?(?:\s+(.*))?$/
const BOLD_RE = /\*\*(.+?)\*\*/g
const HIGHLIGHT_RE = /==(.+?)==/g
const STRIKE_RE = /~~(.+?)~~/g
const INLINE_CODE_RE = /`([^`]+)`/g
const LINK_RE = /\[([^\]]*)\]\(([^)]+)\)/g

const LI_STYLE = 'margin-bottom:6px;'
// Guards against pathological indentation producing endless nesting.
const MAX_LIST_DEPTH = 8

const CALLOUT_META = {
  note: { label: 'Note', icon: '✎' },
  abstract: { label: 'Abstract', icon: '▤' },
  summary: { label: 'Summary', icon: '▤' },
  tldr: { label: 'TL;DR', icon: '▤' },
  info: { label: 'Info', icon: 'ⓘ' },
  todo: { label: 'Todo', icon: '☑' },
  tip: { label: 'Tip', icon: '✦' },
  hint: { label: 'Hint', icon: '✦' },
  important: { label: 'Important', icon: '★' },
  success: { label: 'Success', icon: '✓' },
  check: { label: 'Check', icon: '✓' },
  done: { label: 'Done', icon: '✓' },
  question: { label: 'Question', icon: '?' },
  help: { label: 'Help', icon: '?' },
  faq: { label: 'FAQ', icon: '?' },
  warning: { label: 'Warning', icon: '⚠' },
  caution: { label: 'Caution', icon: '⚠' },
  attention: { label: 'Attention', icon: '⚠' },
  failure: { label: 'Failure', icon: '×' },
  fail: { label: 'Fail', icon: '×' },
  missing: { label: 'Missing', icon: '×' },
  danger: { label: 'Danger', icon: '!' },
  error: { label: 'Error', icon: '!' },
  bug: { label: 'Bug', icon: '⚙' },
  example: { label: 'Example', icon: '▣' },
  quote: { label: 'Quote', icon: '❞' },
  cite: { label: 'Cite', icon: '❞' },
}

function renderBold(text, theme) {
  return text.replace(BOLD_RE, `<strong style="${theme.strong}">$1</strong>`)
}

function renderHighlight(text, theme) {
  return text.replace(HIGHLIGHT_RE, `<mark style="${theme.highlight}">$1</mark>`)
}

function renderStrike(text) {
  return text.replace(STRIKE_RE, '<s style="text-decoration:line-through; color:#999;">$1</s>')
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return text.replace(/[&<>"']/g, m => map[m])
}

const IMG_PH = '\u0000IMG\u0000'
const CODE_PH = '\u0000COD\u0000'
const LINK_PH = '\u0000LNK\u0000'
const IMG_PH_RE = /\u0000IMG\u0000/g
const CODE_PH_RE = /\u0000COD\u0000/g
const LINK_PH_RE = /\u0000LNK\u0000/g

function extractAll(text) {
  const images = [], codes = [], links = []
  const noCode = text.replace(INLINE_CODE_RE, (m, c) => { codes.push(c); return CODE_PH })
  const noImgs = noCode.replace(IMG_RE, (m, alt, src) => { images.push({ alt, src }); return IMG_PH })
  const noLinks = noImgs.replace(LINK_RE, (m, text, href) => { links.push({ text, href }); return LINK_PH })
  return { text: noLinks, images, codes, links }
}

function restoreAll(text, images, codes, links, theme) {
  let li = 0, ii = 0, ci = 0
  const withLinks = text.replace(LINK_PH_RE, () => {
    const link = links[li++]
    return `<a href="${escapeHtml(link.href)}" style="${theme.link}">${renderBold(escapeHtml(link.text), theme)}</a>`
  })
  const withCode = withLinks.replace(CODE_PH_RE, () => `<code style="${theme.inlineCode}">${escapeHtml(codes[ci++])}</code>`)
  return withCode.replace(IMG_PH_RE, () => {
    const img = images[ii++]
    let src = img.src
    const m = src.match(/^pasted:(\d+)$/)
    if (m && window.pastedImages && window.pastedImages[parseInt(m[1])]) {
      src = window.pastedImages[parseInt(m[1])]
    }
    const rawAlt = (img.alt || '').trim()
    const alt = escapeHtml(rawAlt)
    const caption = isCaptionText(rawAlt) ? `<p data-gs-caption="true" style="${theme.caption}">${alt}</p>` : ''
    const image = `<img src="${escapeHtml(src)}" alt="${alt}" referrerpolicy="no-referrer" style="${theme.image}" />`
    return `${theme.imageWrap ? `<section style="${theme.imageWrap}">${image}</section>` : image}${caption}`
  })
}

function renderInline(text, theme) {
  const { text: extracted, images, codes, links } = extractAll(text)
  const escaped = escapeHtml(extracted)
  const highlighted = renderHighlight(escaped, theme)
  const bolded = renderBold(highlighted, theme)
  const striked = renderStrike(bolded)
  return restoreAll(striked, images, codes, links, theme)
}

function getCalloutMeta(type) {
  const normalized = String(type || '').toLowerCase()
  return CALLOUT_META[normalized] || {
    label: normalized ? normalized.charAt(0).toUpperCase() + normalized.slice(1) : 'Callout',
    icon: '▌',
  }
}

function splitQuotedParagraphs(lines) {
  const paragraphs = []
  let current = []

  for (const line of lines) {
    const text = line.trim()
    if (!text) {
      if (current.length) {
        paragraphs.push(current.join(' ').trim())
        current = []
      }
      continue
    }
    current.push(text)
  }

  if (current.length) paragraphs.push(current.join(' ').trim())
  return paragraphs
}

function renderQuotedParagraphs(lines, theme, paragraphStyle) {
  const paragraphs = splitQuotedParagraphs(lines)
  if (!paragraphs.length) return ''

  return paragraphs.map((text, index) => {
    const margin = index === paragraphs.length - 1 ? '0' : '0 0 12px'
    return `<p style="${paragraphStyle || ''}margin:${margin};">${renderInline(text, theme)}</p>`
  }).join('')
}

function renderBlockquote(lines, theme) {
  const content = renderQuotedParagraphs(lines, theme, 'line-height:inherit;')
  if (!content) return ''
  return `<blockquote style="${theme.blockquote}">${content}</blockquote>`
}

function renderCallout(lines, theme) {
  const match = lines[0].trim().match(CALLOUT_RE)
  if (!match) return renderBlockquote(lines, theme)

  const type = match[1].toLowerCase()
  const meta = getCalloutMeta(type)
  const callout = theme.callout || {
    container: theme.blockquote,
    header: 'display:flex;align-items:center;gap:8px;font-weight:700;padding:9px 18px;border-bottom:1px solid #E5E6EB;',
    body: 'padding:13px 18px 15px;',
  }
  const title = (match[3] || meta.label).trim() || meta.label
  const body = renderQuotedParagraphs(lines.slice(1), theme, 'line-height:inherit;')
  const bodyHtml = body ? `<div style="${callout.body}">${body}</div>` : ''

  return `<section data-gs-callout="${escapeHtml(type)}" style="${callout.container}"><div style="${callout.header}"><span aria-hidden="true">${escapeHtml(meta.icon)}</span><span>${renderInline(title, theme)}</span></div>${bodyHtml}</section>`
}

function isCaptionText(text) {
  return /^(图|表|Figure|Fig\.?|Table)\s*[:：.]/i.test(text.trim())
}

function getReadableTextColor(hex) {
  const normalized = String(hex || '').replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return '#FFFFFF'
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.72 ? '#2D2D2D' : '#FFFFFF'
}

function isTableRow(line) {
  const t = line.trim()
  return t.startsWith('|') && t.endsWith('|') && t.length > 2
}

function isTableSep(line) {
  const cells = line.trim().split('|').filter(c => c.trim())
  return cells.length > 0 && cells.every(c => /^[\s:-]+$/.test(c))
}

function parseTableRow(line) {
  return line.trim().split('|').filter(c => c.trim()).map(c => c.trim())
}

function renderTable(rows, sepIndex, headerBg, theme) {
  const headerCells = parseTableRow(rows[0])
  const bodyRows = rows.slice(sepIndex + 1)

  const headerText = getReadableTextColor(headerBg)
  let html = `<section style="overflow-x:auto;-webkit-overflow-scrolling:touch;"><table style="${theme.table}"><thead style="background:${headerBg} !important;color:${headerText} !important;"><tr>`
  headerCells.forEach((cell, i) => {
    const thColorStyle = `background:${headerBg} !important;color:${headerText} !important;${theme.th}`
    const style = i < headerCells.length - 1 ? thColorStyle : thColorStyle.replace(' border-right:1px solid rgba(255,255,255,0.15);', '')
    html += `<th style="${style}">${renderInline(cell, theme)}</th>`
  })
  html += '</tr></thead><tbody>'
  bodyRows.forEach((row, ri) => {
    const cells = parseTableRow(row)
    const bg = ri % 2 === 0 ? theme.rowEven : theme.rowOdd
    html += `<tr style="background:${bg};">`
    cells.forEach(cell => {
      html += `<td style="${theme.td}">${renderInline(cell, theme)}</td>`
    })
    html += '</tr>'
  })
  html += '</tbody></table></section>'
  return html
}

function getIndent(line) {
  const m = line.match(/^([\t ]*)/)
  if (!m) return 0
  const raw = m[1]
  return raw.replace(/\t/g, '  ').length
}

function classifyLine(line) {
  const trimmed = line.trim()
  if (!trimmed) return { type: 'empty' }

  let m
  if (HR_RE.test(trimmed)) return { type: 'hr' }
  if (m = trimmed.match(HASH_HEADING_RE)) {
    const level = Math.min(m[1].length, 4)
    return { type: `h${level}`, text: m[2].trim() }
  }
  if (m = trimmed.match(H1_RE)) return { type: 'h1', text: m[1].trim() }
  if (m = trimmed.match(/^(\d+(?:\.\d+)+\s+.+)$/)) return { type: 'h2', text: m[1].trim() }
  if (m = trimmed.match(H2_RE)) return { type: 'h2', text: m[1].trim() }
  if (m = trimmed.match(H3_RE)) return { type: 'h3', text: m[1].trim() }
  if (m = trimmed.match(TASK_RE)) return { type: 'task', checked: m[1] === 'x', text: m[2].trim() }
  if (m = trimmed.match(OL_RE)) return { type: 'ol', text: m[1].trim() }
  if (m = trimmed.match(UL_RE)) return { type: 'ul', text: m[1].trim() }
  if (/^!\[.*\]\(.+\)$/.test(trimmed)) return { type: 'img', text: trimmed }

  return { type: 'p', text: trimmed }
}

function isListType(t) {
  return t === 'ol' || t === 'ul' || t === 'task'
}

function isProbableCodeLine(text) {
  if (!text) return false
  if (/^[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/.test(text)) return false
  if (/^[A-Z][a-zA-Z\s.-]+,\s*[A-Z]/.test(text) && /\(\d{4}\)/.test(text)) return false
  if (/^(?:const|let|var|function|def|import|export|class|return|if|for|while|public|private|static|async|await|try|catch|throw|new|package|include)\b/.test(text)) return true
  if (/^(?:\/\/|\/\*|#|<!--|--|\$)/.test(text)) return true
  if (/^(?:curl|docker|npm|yarn|pnpm|git|python|python3|node|npx|pip|brew|bash|sh|make|gcc|cargo|go|rustc)\b/.test(text)) return true
  if (/^(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE)\b/i.test(text)) return true
  if (/[{}();]|=>|::|==|!=|\+\+|--|&&|\|\||<-|->|<\/|\/>/.test(text)) return true
  return false
}

export function formatLocally(rawText, headerBgColor = '#D94A1E', h1Color = '#D94836', h1Size = '21px', h2Color = '#E25A47', h2Size = '18px', h3Color = '#D94836', h3Size = '16px', h4Color = '#B85A47', h4Size = '15px', themeId = 'classic') {
  if (!rawText || typeof rawText !== 'string') return ''
  const theme = getArticleTheme(themeId)
  const headingOverrides = { h1Color, h1Size, h2Color, h2Size, h3Color, h3Size, h4Color, h4Size }

  const lines = rawText.split('\n')
  const parts = []
  let inCodeBlock = false
  let codeBuffer = []
  let codeLang = ''
  let inTable = false
  let tableRows = []
  let tableSepIndex = -1
  let inIndentCode = false
  let indentCodeBuffer = []
  // listRoot holds the whole list block as a tree; listStack tracks the lists
  // that are still open, from the outermost one to the deepest.
  let listRoot = null
  let listStack = []
  const headingCounts = { 1: 0, 2: 0, 3: 0, 4: 0 }

  function renderListItem(item, level) {
    if (item.type === 'raw') return item.text
    const inner = renderInline(item.text, theme)
    let childHtml = ''
    for (const child of item.children) {
      childHtml += renderList(child, level + 1)
    }
    if (item.type === 'task') {
      const chk = item.checked ? 'checked' : ''
      return `<li style="${LI_STYLE}list-style:none;"><span style="display:flex;align-items:flex-start;gap:6px;"><input type="checkbox" ${chk} disabled style="margin-top:0.35em;flex-shrink:0;" /><span>${inner}</span></span>${childHtml}</li>`
    }
    return `<li style="${LI_STYLE}">${inner}${childHtml}</li>`
  }

  function renderList(list, level) {
    // Tailwind Preflight resets ul/ol to list-style:none; restore the
    // semantic markers explicitly so bullets and ordered numbers render.
    const marker = list.tag === 'ol' ? 'list-style-type:decimal;list-style-position:outside;' : 'list-style-type:disc;list-style-position:outside;'
    const margin = level === 0 ? 'margin:12px 0;' : 'margin:6px 0 0;'
    let html = `<${list.tag} style="${theme.list}${marker}${margin}">`
    for (const item of list.items) {
      html += renderListItem(item, level)
    }
    html += `</${list.tag}>`
    return html
  }

  function flushListStack() {
    if (!listStack.length) return
    if (listRoot && listRoot.items.length) parts.push(renderList(listRoot, 0))
    listRoot = null
    listStack = []
  }

  function openRootList(tag, indent) {
    listRoot = { tag, items: [] }
    listStack = [{ list: listRoot, indent }]
  }

  function openChildList(tag, indent) {
    const parent = listStack[listStack.length - 1]
    const parentItem = parent.list.items[parent.list.items.length - 1]
    const child = { tag, items: [] }
    parentItem.children.push(child)
    listStack.push({ list: child, indent })
  }

  function flushCodeBlock() {
    if (!codeBuffer.length) return
    const code = codeBuffer.join('\n')
    parts.push(`<pre style="${theme.codeBlock}"><code style="background:transparent;color:inherit;white-space:pre-wrap;word-break:break-all;">${escapeHtml(code)}</code></pre>`)
    codeBuffer = []
    codeLang = ''
  }

  function flushTable() {
    if (!tableRows.length) return
    if (tableSepIndex >= 0) {
      parts.push(renderTable(tableRows, tableSepIndex, headerBgColor, theme))
    }
    tableRows = []
    tableSepIndex = -1
  }

  function flushIndentCode() {
    if (!indentCodeBuffer.length) return
    const code = indentCodeBuffer.map(l => l.replace(/^(?:\t|    )/, '')).join('\n')
    parts.push(`<pre style="${theme.codeBlock}"><code style="background:transparent;color:inherit;white-space:pre-wrap;word-break:break-all;">${escapeHtml(code)}</code></pre>`)
    indentCodeBuffer = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const fence = line.match(CODE_FENCE_RE)

    if (fence) {
      if (inCodeBlock) {
        flushCodeBlock()
        inCodeBlock = false
      } else {
        flushListStack()
        flushTable()
        inCodeBlock = true
        codeLang = fence[1]
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      continue
    }

    if (isTableRow(line) || (inTable && !line.trim())) {
      if (!inTable && isTableRow(line)) {
        flushListStack()
        inTable = true
        tableRows = []
        tableSepIndex = -1
      }
      if (!line.trim()) {
        flushTable()
        inTable = false
        continue
      }
      tableRows.push(line)
      if (isTableSep(line)) {
        tableSepIndex = tableRows.length - 1
      }
      const nextLine2 = i + 1 < lines.length ? lines[i + 1] : ''
      if (!nextLine2.trim() || !isTableRow(nextLine2)) {
        flushTable()
        inTable = false
      }
      continue
    }

    flushTable()

    const quoteMatch = line.match(QUOTE_RE)
    if (quoteMatch) {
      if (inIndentCode) {
        flushIndentCode()
        inIndentCode = false
      }
      flushListStack()
      const quotedLines = [quoteMatch[1]]
      let quoteEnd = i + 1
      while (quoteEnd < lines.length) {
        const nextQuote = lines[quoteEnd].match(QUOTE_RE)
        if (!nextQuote) break
        quotedLines.push(nextQuote[1])
        quoteEnd++
      }

      const rendered = quotedLines[0].trim().match(CALLOUT_RE)
        ? renderCallout(quotedLines, theme)
        : renderBlockquote(quotedLines, theme)
      if (rendered) parts.push(rendered)
      i = quoteEnd - 1
      continue
    }

    const c = classifyLine(line)
    const nextLine = i + 1 < lines.length ? lines[i + 1] : ''
    const nextC = classifyLine(nextLine)

    if (c.type === 'empty') {
      flushListStack()
      if (inIndentCode) {
        indentCodeBuffer.push(line)
        continue
      }
      continue
    }

    if (c.type === 'hr') {
      if (inIndentCode) {
        flushIndentCode()
        inIndentCode = false
      }
      flushListStack()
      parts.push(`<hr style="${theme.hr}" />`)
      continue
    }

    if (isListType(c.type)) {
      if (inIndentCode) {
        flushIndentCode()
        inIndentCode = false
      }
      const indent = getIndent(line)
      const listTag = c.type === 'ol' ? 'ol' : 'ul'

      if (!listStack.length) {
        openRootList(listTag, indent)
      } else {
        // Close every open list that is indented deeper than this line.
        while (listStack.length > 1 && indent < listStack[listStack.length - 1].indent) {
          listStack.pop()
        }
        const top = listStack[listStack.length - 1]
        if (indent > top.indent && top.list.items.length && listStack.length < MAX_LIST_DEPTH) {
          openChildList(listTag, indent)
        } else {
          // The outermost list keeps the leftmost indent seen so far, so a
          // block that starts indented and later dedents stays one list.
          if (indent < top.indent) top.indent = indent
          if (top.list.tag !== listTag && top.list.items.length) {
            if (listStack.length === 1) {
              flushListStack()
              openRootList(listTag, indent)
            } else {
              listStack.pop()
              openChildList(listTag, indent)
            }
          }
        }
      }

      listStack[listStack.length - 1].list.items.push({
        text: c.text,
        type: c.type === 'task' ? 'task' : listTag,
        checked: c.checked,
        children: []
      })

      // If next line is non-list non-empty, flush
      if (!isListType(nextC.type) && nextC.type !== 'empty') {
        flushListStack()
      }
      continue
    }

    if (inIndentCode) {
      if (CODE_INDENT_RE.test(line)) {
        indentCodeBuffer.push(line)
        const nextLine3 = i + 1 < lines.length ? lines[i + 1] : ''
        if (nextLine3.trim() && !CODE_INDENT_RE.test(nextLine3)) {
          flushIndentCode()
          inIndentCode = false
        }
        continue
      }
      flushIndentCode()
      inIndentCode = false
    }

    const prevLine = i > 0 ? lines[i - 1] : ''
    const canStartIndentCode = CODE_INDENT_RE.test(line) &&
      (!prevLine.trim() || inCodeBlock) &&
      c.type === 'p' &&
      isProbableCodeLine(c.text)

    if (canStartIndentCode) {
      flushListStack()
      inIndentCode = true
      indentCodeBuffer = [line]
      const nextLine3 = i + 1 < lines.length ? lines[i + 1] : ''
      if (nextLine3.trim() && !CODE_INDENT_RE.test(nextLine3)) {
        flushIndentCode()
        inIndentCode = false
      }
      continue
    }

    flushListStack()

    if (c.type === 'h1') {
      parts.push(renderThemeHeading(themeId, 1, renderInline(c.text, theme), ++headingCounts[1], headingOverrides))
    } else if (c.type === 'h2') {
      parts.push(renderThemeHeading(themeId, 2, renderInline(c.text, theme), ++headingCounts[2], headingOverrides))
    } else if (c.type === 'h3') {
      parts.push(renderThemeHeading(themeId, 3, renderInline(c.text, theme), ++headingCounts[3], headingOverrides))
    } else if (c.type === 'h4') {
      parts.push(renderThemeHeading(themeId, 4, renderInline(c.text, theme), ++headingCounts[4], headingOverrides))
    } else if (c.type === 'img') {
      parts.push(renderInline(c.text, theme))
    } else if (c.type === 'p') {
      const style = isCaptionText(c.text) ? theme.caption : theme.paragraph
      const attr = isCaptionText(c.text) ? ' data-gs-caption="true"' : ''
      parts.push(`<p${attr} style="${style}">${renderInline(c.text, theme)}</p>`)
    }
  }

  flushListStack()
  flushCodeBlock()
  flushTable()
  flushIndentCode()
  return `<section data-gs-article-theme="${themeId}" style="${theme.container}">${parts.join('\n')}</section>`
}
