export const parseLatLang = linkString => {
  const latStart = linkString.indexOf('=') + 1
  const latEnd = linkString.indexOf('%')
  const lat = Number(linkString.slice(latStart, latEnd))

  const langStart = linkString.indexOf('-')
  const langSlice = linkString.slice(langStart)
  const langEnd = langSlice.indexOf('%')
  const lang = Number(langSlice.slice(0, langEnd))

  return [lat, lang]
}
