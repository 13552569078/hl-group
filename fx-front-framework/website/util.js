export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

export function changeTheme(href) {
  const docHead = document.head
  const linkList = document.getElementsByTagName('link')
  let removedLink
  if(linkList) {
    for(let i = 0; i < linkList.length; i++) {
      if(linkList[i].getAttribute('hl') === 'theme') {
        removedLink = linkList[i]
        break
      }
    }
  }

  const linkStyle = document.createElement('link')
  linkStyle.setAttribute('rel','stylesheet')
  linkStyle.setAttribute('type','text/css')
  linkStyle.setAttribute('href', href)
  linkStyle.setAttribute('hl', 'theme')

  docHead.appendChild(linkStyle)
  setTimeout(() => {
    removedLink && docHead.removeChild(removedLink)
  }, 100)
}

export function addCssByStyle(cssString, attrs = {}) {
  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  Object.entries(attrs).forEach(([key, value]) => {
    style.setAttribute(key, value)
  })

  if(style.styleSheet) { // IE
    style.styleSheet.cssText = cssString
  } else { // w3c
    const cssText = document.createTextNode(cssString)
    style.appendChild(cssText)
  }

  const heads = document.getElementsByTagName('head')
  if(heads.length) {
    heads[0].appendChild(style)
  } else {
    document.documentElement.appendChild(style)
  }
}

export function addLinkByStyle(cssString, attrs = {}, disabled = false) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'data:text/css;charset=UTF-8,' + encodeURIComponent(cssString)
  link.disabled = disabled
  Object.entries(attrs).forEach(([key, value]) => {
    link.setAttribute(key, value)
  })
  document.getElementsByTagName('head')[0].appendChild(link)
}
