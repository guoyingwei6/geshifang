const STYLE_MAP = {
  'gs-h1': {
    'font-size': '21px',
    'font-weight': '700',
    color: '#D94836',
    'text-align': 'center',
    margin: '30px 0 18px 0',
    'line-height': '1.7',
  },
  'gs-h2': {
    'font-size': '18px',
    'font-weight': '700',
    color: '#E25A47',
    margin: '24px 0 12px 0',
    'line-height': '1.7',
  },
  'gs-h3': {
    'font-size': '16px',
    'font-weight': '700',
    color: '#D94836',
    margin: '20px 0 10px 0',
    'line-height': '1.7',
  },
  'gs-body': {
    'font-size': '15px',
    color: '#2D2D2D',
    'line-height': '1.9',
    margin: '0 0 1em 0',
  },
  'gs-small': {
    'font-size': '13px',
    color: '#999999',
    'line-height': '1.6',
  },
  'gs-blockquote': {
    background: '#F5F5F5',
    'border-left': '4px solid #D94A1E',
    padding: '16px 18px',
    margin: '18px 0',
    'border-radius': '0 6px 6px 0',
    color: '#333333',
    'font-size': '15px',
    'line-height': '1.9',
  },
  'gs-card': {
    background: '#F7F8FA',
    'border-radius': '8px',
    padding: '16px 20px',
    margin: '16px 0',
    border: '1px solid #E5E6EB',
  },
  'gs-card-accent': {
    'border-left': '4px solid #D94A1E',
  },
  'gs-card-green': {
    'border-left': '4px solid #07C160',
  },
  'gs-divider': {
    height: '1px',
    background: 'linear-gradient(to right, transparent, #E5E6EB, transparent)',
    margin: '24px 0',
    border: 'none',
  },
  'gs-stat': {
    'text-align': 'center',
    padding: '20px',
    background: 'linear-gradient(135deg, #F0F4FA 0%, #FFFFFF 100%)',
    'border-radius': '8px',
    margin: '16px 0',
    border: '1px solid #E5E6EB',
  },
}

const TAG_STYLE_MAP = {
  TABLE: {
    width: '100%',
    'border-collapse': 'separate',
    'border-spacing': '0',
    border: '1px solid #E5E6EB',
    'border-radius': '6px',
    overflow: 'hidden',
    margin: '16px 0',
    'font-size': '14px',
    'line-height': '1.6',
  },
  TH: {
    background: '#D94A1E',
    color: '#FFFFFF',
    'font-weight': '600',
    padding: '10px 14px',
    'text-align': 'left',
  },
  TD: {
    padding: '10px 14px',
    border: '1px solid #E5E6EB',
    color: '#2D2D2D',
  },
}

function objToInline(styles) {
  return Object.entries(styles)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ')
}

export function getInlineStyles(tagName, classList) {
  const classes = classList ? Array.from(classList) : []
  const styles = {}

  for (const cls of classes) {
    if (STYLE_MAP[cls]) {
      Object.assign(styles, STYLE_MAP[cls])
    }
  }

  const tag = tagName ? tagName.toUpperCase() : ''
  if (TAG_STYLE_MAP[tag] && classes.length === 0) {
    Object.assign(styles, TAG_STYLE_MAP[tag])
  }

  return styles
}

export function htmlWithInlineStyles(htmlString) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  applyInlineToTree(doc.body)
  return doc.body.innerHTML
}

function applyInlineToTree(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return

  const tag = node.tagName
  const classes = node.classList

  const existingStyle = node.getAttribute('style') || ''
  const computed = getInlineStyles(tag, classes)
  const inlineStr = objToInline(computed)

  if (inlineStr) {
    const merged = existingStyle
      ? existingStyle.endsWith(';') ? existingStyle + ' ' + inlineStr : existingStyle + '; ' + inlineStr
      : inlineStr
    node.setAttribute('style', merged)
  }

  for (const child of node.children) {
    applyInlineToTree(child)
  }
}

export function objToStyleString(obj) {
  return objToInline(obj)
}

export { STYLE_MAP, TAG_STYLE_MAP }
