export function decimalToDegrees({lat, lng}) {
  let latCard = 'N'
  let lngCard = 'E'

  if (lat < 0) latCard = 'S'
  if (lng < 0) lngCard = 'W'

  return convertToDegrees(lat, latCard) + ', ' + convertToDegrees(lng, lngCard)
}

function convertToDegrees(num, card) {
  const deg = Math.abs(Math.trunc(num))
  const decMin = Math.abs((num - Math.trunc(num)) * 60)
  const min = Math.trunc(decMin)
  const decSec = Math.abs((decMin - Math.trunc(decMin)) * 60)
  const sec = Math.trunc(decSec)
  return `${deg}\u00b0${padLeadingZero(min)}\u2032${padLeadingZero(sec)}\u2033 ${card}`
}

function padLeadingZero(num) {
  const numStr = num.toString()
  return numStr.length < 2 ? `0${numStr}` : numStr
}
