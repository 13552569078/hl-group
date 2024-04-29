function echartsFontSize(res: number, basisHeight: number) {
  const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  if (!clientHeight) return
  const fontSize = clientHeight / basisHeight
  return res * fontSize
}

const EChartUtils = {
  echartsFontSize,
}

export { EChartUtils }
