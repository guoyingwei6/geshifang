export const BUILT_IN_THEMES = {
  classic: {
    label: '格式坊经典（原默认）',
    shortLabel: '格式坊经典',
    description: '原有红橙色排版，完整保留此前默认效果',
    defaults: {
      indent: true, headerBg: '#D94A1E', h1Color: '#D94836', h1Size: '21px',
      h2Color: '#E25A47', h2Size: '18px', h3Color: '#D94836', h3Size: '16px',
      h4Color: '#B85A47', h4Size: '15px', font: "-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif",
      spacing: '1em'
    },
    container: 'max-width:677px;margin:0 auto;box-sizing:border-box;background:#FFFFFF;color:#2D2D2D;',
    paragraph: 'font-size:15px;color:#2D2D2D;line-height:1.9;margin:0 0 1em 0;',
    caption: 'font-size:13px;color:#B8B8B8;line-height:1.7;margin:6px 0 1.4em 0;text-indent:0;',
    blockquote: 'background:#F5F5F5;border-left:4px solid #D94A1E;padding:16px 18px;margin:18px 0;border-radius:0 6px 6px 0;color:#333333;font-size:15px;line-height:1.9;',
    list: 'padding-left:1.5em;margin:12px 0;font-size:15px;line-height:1.8;color:#2D2D2D;',
    table: 'width:100%;border-collapse:separate;border-spacing:0;border:1px solid #E5E6EB;border-radius:4px;overflow:hidden;margin:18px 0;font-size:14px;line-height:1.7;',
    th: 'font-weight:600;padding:10px 14px;text-align:left;border-right:1px solid rgba(255,255,255,0.15);',
    td: 'padding:10px 14px;border:1px solid #E5E6EB;',
    rowEven: '#FFFFFF', rowOdd: '#F7F8FA',
    codeBlock: "background:#1E1E2E;color:#FFFFFF;border-radius:6px;padding:14px 16px;margin:16px 0;font-size:13px;line-height:1.7;overflow-x:auto;font-family:'JetBrains Mono','Fira Code','Consolas',monospace;",
    inlineCode: "background:#F7F0EE;color:#D43D2A;padding:1px 5px;border-radius:3px;font-size:0.9em;font-family:'JetBrains Mono','Fira Code','Consolas',monospace;",
    image: 'max-width:100%;height:auto;display:block;margin:18px auto 8px auto;border-radius:4px;',
    imageWrap: '', strong: 'font-weight:700;color:#D94A1E;', highlight: 'background:#FFF1EE;color:#D43D2A;padding:0 3px;border-radius:2px;',
    link: 'color:#D94A1E;text-decoration:underline;', hr: 'border:none;border-top:1px solid #E5E6EB;margin:20px 0;'
  },
  'moyu-green': {
    label: '摸鱼绿（默认）', shortLabel: '摸鱼绿', description: '高信息密度、清爽工具感，适合教程与清单',
    defaults: { indent: false, headerBg: '#059669', h1Color: '#111827', h1Size: '24px', h2Color: '#111827', h2Size: '18px', h3Color: '#111827', h3Size: '16px', h4Color: '#374151', h4Size: '14px', font: "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif", spacing: '1em' },
    container: 'max-width:677px;margin:0 auto;padding:18px 20px;box-sizing:border-box;background:#FFFFFF;color:#374151;',
    paragraph: 'font-size:14px;color:#374151;line-height:1.9;margin:0 0 16px 0;text-align:justify;', caption: 'font-size:12px;color:#9CA3AF;line-height:1.7;margin:7px 0 20px;text-align:center;text-indent:0;',
    blockquote: 'background:#F0FDF4;border:1px dashed #6EE7B7;border-left:4px solid #059669;padding:15px 18px;margin:20px 0;color:#1F2937;font-size:14px;line-height:1.85;',
    list: 'padding-left:1.45em;margin:14px 0 20px;font-size:14px;line-height:1.85;color:#374151;', table: 'width:100%;border-collapse:collapse;margin:20px 0;font-size:13px;line-height:1.7;border:1px solid #D1FAE5;',
    th: 'font-weight:700;padding:10px 12px;text-align:left;border:1px solid #A7F3D0;', td: 'padding:10px 12px;border:1px solid #D1FAE5;', rowEven: '#FFFFFF', rowOdd: '#F0FDF4',
    codeBlock: "background:#111827;color:#E5E7EB;border-left:4px solid #10B981;padding:15px 17px;margin:18px 0;font-size:13px;line-height:1.7;overflow-x:auto;font-family:'JetBrains Mono','Consolas',monospace;",
    inlineCode: "background:#F3F4F6;color:#1F2937;padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:'JetBrains Mono','Consolas',monospace;",
    image: 'max-width:100%;height:auto;display:block;margin:0 auto;border-radius:0;', imageWrap: 'padding:6px;background:#F0FDF4;border:1px solid #D1FAE5;margin:20px 0 8px;',
    strong: 'font-weight:700;color:#059669;', highlight: 'background:linear-gradient(120deg,#A7F3D0 0%,rgba(167,243,208,0) 100%);padding:0 4px;font-weight:600;color:#111827;', link: 'color:#059669;text-decoration:underline;', hr: 'border:none;border-top:2px solid #A7F3D0;margin:26px 0;'
  },
  'red-white': {
    label: '红白', shortLabel: '红白', description: '强对比、有力量感，适合观点与深度分析',
    defaults: { indent: false, headerBg: '#DC2626', h1Color: '#1C1917', h1Size: '24px', h2Color: '#1C1917', h2Size: '19px', h3Color: '#991B1B', h3Size: '16px', h4Color: '#57534E', h4Size: '15px', font: "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif", spacing: '1em' },
    container: 'max-width:677px;margin:0 auto;padding:20px;box-sizing:border-box;background:#FFFFFF;color:#374151;', paragraph: 'font-size:15px;color:#374151;line-height:1.9;margin:0 0 18px;text-align:justify;', caption: 'font-size:12px;color:#9CA3AF;line-height:1.7;margin:8px 0 22px;text-align:center;text-indent:0;',
    blockquote: 'background:#FEF2F2;border-left:4px solid #DC2626;border-radius:0 10px 10px 0;padding:18px 22px;margin:22px 0;color:#991B1B;font-size:15px;font-weight:700;line-height:1.85;', list: 'padding-left:1.5em;margin:14px 0 22px;font-size:15px;line-height:1.85;color:#374151;',
    table: 'width:100%;border-collapse:collapse;margin:22px 0;font-size:14px;line-height:1.7;border:1px solid #FECACA;', th: 'font-weight:700;padding:10px 12px;text-align:left;border:1px solid #FCA5A5;', td: 'padding:10px 12px;border:1px solid #FECACA;', rowEven: '#FFFFFF', rowOdd: '#FFF7F7',
    codeBlock: "background:#1C1917;color:#FAFAF9;border-top:4px solid #DC2626;padding:16px 18px;margin:20px 0;font-size:13px;line-height:1.7;overflow-x:auto;font-family:'JetBrains Mono','Consolas',monospace;", inlineCode: "background:#F3F4F6;color:#1F2937;padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:'JetBrains Mono','Consolas',monospace;",
    image: 'max-width:100%;height:auto;display:block;margin:0 auto;border-radius:8px;', imageWrap: 'padding:6px;border:1px solid #FECACA;background:#FFFFFF;border-radius:10px;margin:22px 0 8px;', strong: 'font-weight:700;color:#DC2626;', highlight: 'background:#FEE2E2;color:#991B1B;padding:2px 6px;border-radius:3px;font-weight:700;', link: 'color:#DC2626;text-decoration:underline;', hr: 'border:none;border-top:1px solid #FECACA;border-bottom:1px solid #FEE2E2;height:4px;margin:28px 0;'
  },
  'moyu-ticket': {
    label: '摸鱼票据', shortLabel: '摸鱼票据', description: '票根与收据视觉，适合工具对比与创意评测',
    defaults: { indent: false, headerBg: '#059669', h1Color: '#1A1A1A', h1Size: '24px', h2Color: '#1A1A1A', h2Size: '18px', h3Color: '#1A1A1A', h3Size: '15px', h4Color: '#555555', h4Size: '14px', font: "-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif", spacing: '1em' },
    container: 'max-width:677px;margin:0 auto;padding:22px 20px;box-sizing:border-box;background:#FFFDF5;color:#555555;border-left:1px dashed #D1D5DB;border-right:1px dashed #D1D5DB;', paragraph: 'font-size:14px;color:#555555;line-height:1.9;margin:0 0 18px;text-align:justify;', caption: 'font-size:11px;color:#999999;letter-spacing:1px;line-height:1.7;margin:7px 0 22px;text-align:center;text-indent:0;',
    blockquote: 'background:#F0FDF4;border-left:4px solid #059669;padding:14px 16px;margin:22px 0;color:#1A1A1A;font-size:14px;font-weight:600;line-height:1.8;', list: 'padding-left:1.5em;margin:14px 0 22px;font-size:14px;line-height:1.85;color:#555555;',
    table: 'width:100%;border-collapse:collapse;margin:22px 0;font-size:13px;line-height:1.7;background:#FFFEF8;border:1px solid #E5E7EB;', th: 'font-weight:800;padding:9px 11px;text-align:left;border:1px dashed #A7F3D0;letter-spacing:1px;', td: 'padding:9px 11px;border:1px dashed #D1D5DB;', rowEven: '#FFFEF8', rowOdd: '#F0FDF4',
    codeBlock: "background:#1A1A1A;color:#F9FAFB;border-left:8px solid #059669;padding:15px 17px;margin:22px 0;font-size:13px;line-height:1.7;overflow-x:auto;font-family:'JetBrains Mono','Consolas',monospace;", inlineCode: "background:#F3F4F6;color:#1F2937;padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:'JetBrains Mono','Consolas',monospace;",
    image: 'max-width:100%;height:auto;display:block;margin:0 auto;', imageWrap: 'background:#FFFEF8;border:1px solid #EEEEEE;padding:6px;margin:22px 0 8px;box-shadow:5px 5px 0 #A7F3D0;', strong: 'font-weight:700;color:#059669;', highlight: 'background:linear-gradient(120deg,#A7F3D0 0%,rgba(167,243,208,0) 100%);padding:0 4px;font-weight:600;color:#111111;', link: 'color:#059669;text-decoration:underline;', hr: 'border:none;border-top:2px dashed #1A1A1A;margin:28px 0;'
  },
  'olive-journal': {
    label: '橄榄手记', shortLabel: '橄榄手记', description: '克制的内刊手记感，适合深度评测与复盘',
    defaults: { indent: false, headerBg: '#1E1F23', h1Color: '#23251D', h1Size: '24px', h2Color: '#23251D', h2Size: '18px', h3Color: '#23251D', h3Size: '16px', h4Color: '#65675E', h4Size: '14px', font: "'IBM Plex Sans',-apple-system,system-ui,'PingFang SC','Microsoft YaHei',sans-serif", spacing: '1em' },
    container: 'max-width:677px;margin:0 auto;padding:22px 18px;box-sizing:border-box;background:#FDFDF8;color:#4D4F46;border:1px solid #BFC1B7;border-radius:6px;', paragraph: 'font-size:14px;color:#4D4F46;line-height:1.9;margin:0 0 18px;text-align:justify;', caption: 'font-size:11px;color:#9EA096;line-height:1.7;margin:7px 0 22px;text-align:center;text-indent:0;',
    blockquote: 'background:#EEEFE9;border:1px solid #BFC1B7;border-left:4px solid #ED7B2F;border-radius:6px;padding:15px 17px;margin:22px 0;color:#23251D;font-size:14px;line-height:1.85;', list: 'padding-left:1.5em;margin:14px 0 22px;font-size:14px;line-height:1.85;color:#4D4F46;',
    table: 'width:100%;border-collapse:collapse;margin:22px 0;font-size:13px;line-height:1.7;background:#FDFDF8;border:1px solid #BFC1B7;', th: 'font-weight:800;padding:10px 12px;text-align:left;border:1px solid #BFC1B7;letter-spacing:.5px;', td: 'padding:10px 12px;border:1px solid #BFC1B7;', rowEven: '#FDFDF8', rowOdd: '#EEEFE9',
    codeBlock: "background:#1E1F23;color:#FDFDF8;border-radius:6px;padding:16px 18px;margin:22px 0;font-size:13px;line-height:1.7;overflow-x:auto;font-family:ui-monospace,Menlo,Monaco,Consolas,monospace;", inlineCode: 'background:#EEEFE9;color:#23251D;padding:2px 6px;border-radius:4px;font-size:0.9em;border:1px solid #B6B7AF;font-family:ui-monospace,Menlo,Monaco,Consolas,monospace;',
    image: 'max-width:100%;height:auto;display:block;margin:0 auto;border-radius:4px;', imageWrap: 'background:#FDFDF8;border:1px solid #BFC1B7;border-radius:6px;padding:6px;margin:22px 0 8px;', strong: 'font-weight:700;color:#23251D;', highlight: 'background:#EEEFE9;padding:1px 5px;border-radius:4px;font-weight:600;color:#23251D;border:1px solid #BFC1B7;', link: 'color:#B17816;text-decoration:underline;text-decoration-color:#ED7B2F;', hr: 'border:none;border-top:1px solid #BFC1B7;margin:28px 0;'
  }
}

export function getArticleTheme(id = 'classic') {
  return BUILT_IN_THEMES[id] || BUILT_IN_THEMES.classic
}

export function renderThemeHeading(themeId, level, content, index, overrides = {}) {
  const theme = getArticleTheme(themeId)
  const size = overrides[`h${level}Size`] || theme.defaults[`h${level}Size`]
  const color = overrides[`h${level}Color`] || theme.defaults[`h${level}Color`]
  const tag = `h${level}`
  if (themeId === 'moyu-green') {
    if (level === 1 && index === 1) return `<h1 style="font-size:${size};font-weight:800;color:#FFFFFF;background:#111827;border-bottom:5px solid #10B981;padding:20px 22px;margin:8px 0 24px;line-height:1.45;letter-spacing:.5px;">${content}</h1>`
    if (level === 1) return `<h1 style="font-size:${size};font-weight:800;color:${color};border-left:5px solid #059669;background:#F0FDF4;padding:9px 14px;margin:28px 0 15px;line-height:1.55;">${content}</h1>`
    if (level === 2) return `<h2 style="font-size:${size};font-weight:800;color:${color};border-left:5px solid #059669;background:#F0FDF4;padding:9px 14px;margin:28px 0 15px;line-height:1.55;">${content}</h2>`
  }
  if (themeId === 'red-white') {
    if (level === 1 && index === 1) return `<h1 style="font-size:${size};font-weight:800;color:#FFFFFF;background:#DC2626;border-radius:10px;padding:22px 24px;margin:8px 0 26px;line-height:1.45;box-shadow:0 6px 0 #FECACA;">${content}</h1>`
    if (level === 1) return `<h1 style="font-size:${size};font-weight:800;color:${color};display:flex;align-items:center;gap:12px;border-bottom:3px solid #DC2626;padding:0 0 12px;margin:32px 0 16px;line-height:1.5;"><span style="display:inline-block;background:#DC2626;color:#FFFFFF;border-radius:5px;padding:5px 11px;font-size:14px;letter-spacing:1px;">${String(index - 1).padStart(2, '0')}</span><span>${content}</span></h1>`
    if (level === 2) return `<h2 style="font-size:${size};font-weight:800;color:${color};border-left:8px solid #DC2626;border-bottom:1px solid #FECACA;padding:7px 12px;margin:30px 0 15px;line-height:1.55;">${content}</h2>`
  }
  if (themeId === 'moyu-ticket') {
    if (level === 1 && index === 1) return `<h1 style="font-size:${size};font-weight:900;color:${color};background:#FFFEF8;border:2px solid #1A1A1A;padding:22px 20px;margin:8px 0 28px;line-height:1.4;letter-spacing:1px;box-shadow:7px 7px 0 #A7F3D0;">${content}</h1>`
    if (level === 1) return `<h1 style="font-size:${size};font-weight:800;color:${color};border-bottom:2px solid #1A1A1A;padding:0 0 10px;margin:32px 0 16px;line-height:1.5;"><span style="display:inline-block;background:#059669;color:#FFFFFF;font-size:12px;padding:5px 10px;margin-right:10px;letter-spacing:1px;">${String(index - 1).padStart(2, '0')}</span>${content}</h1>`
    if (level === 2) return `<h2 style="font-size:${size};font-weight:800;color:${color};border-bottom:2px solid #1A1A1A;padding:0 0 10px;margin:32px 0 16px;line-height:1.5;"><span style="display:inline-block;background:#059669;color:#FFFFFF;font-size:12px;padding:5px 10px;margin-right:10px;letter-spacing:1px;">${String(index).padStart(2, '0')}</span>${content}</h2>`
  }
  if (themeId === 'olive-journal') {
    if (level === 1 && index === 1) return `<h1 style="font-size:${size};font-weight:800;color:${color};background:#FDFDF8;border:1px solid #BFC1B7;border-radius:6px;padding:24px 22px 18px;margin:4px 0 28px;line-height:1.35;box-shadow:inset 0 -5px 0 #EEEFE9;">${content}</h1>`
    if (level === 1) return `<h1 style="font-size:${size};font-weight:800;color:${color};border-bottom:1px solid #BFC1B7;padding:0 0 10px;margin:30px 0 16px;line-height:1.5;"><span style="font-size:10px;color:#ED7B2F;letter-spacing:2px;margin-right:10px;">PART ${String(index - 1).padStart(2, '0')}</span>${content}</h1>`
    if (level === 2) return `<h2 style="font-size:${size};font-weight:800;color:${color};border-bottom:1px solid #BFC1B7;padding:0 0 10px;margin:30px 0 16px;line-height:1.5;"><span style="font-size:10px;color:#ED7B2F;letter-spacing:2px;margin-right:10px;">PART ${String(index).padStart(2, '0')}</span>${content}</h2>`
  }
  const weights = { 1: 700, 2: 700, 3: 700, 4: 600 }
  const margins = { 1: '30px 0 18px', 2: '24px 0 12px', 3: '20px 0 10px', 4: '16px 0 8px' }
  const align = level === 1 ? 'text-align:center;' : ''
  const accent = themeId === 'olive-journal' && level === 3 ? 'box-shadow:inset 0 -0.5em 0 rgba(237,123,47,.18);width:fit-content;' : ''
  return `<${tag} style="font-size:${size};font-weight:${weights[level]};color:${color};margin:${margins[level]};line-height:1.7;${align}${accent}">${content}</${tag}>`
}
