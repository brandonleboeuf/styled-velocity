import { isString, isNumber, isBoolean } from '@utils'

/*
 * Add additional conversion types here
 */
export const getColumnWidth = itemCount => `${parseFloat((100 / itemCount).toFixed(4))}%`

export const booleanToIntString = value => `${+value}`

/*
  We need to achieve...
  
  width; 50vw; 
  width: calc(var(--cel, 50vw) * 20);
*/
export const getCellsFallback = cells => `${parseFloat((cells * 2.5).toFixed(4))}vw`
export const getCells = cells => `calc(var(--cel, ${getCellsFallback(cells)}) * ${cells})`

/*
 * if you entered 0, return 0, else
 * if you enter a prop where it's value is less than or equal to 1,
 * it assumes you're making a percentage and creates one, otherwise it'll assume it's a pixel value if above 1
 */

export const percentageOrPixel = value =>
  value === 0 ? value : value <= 1 && value >= 0 ? `${parseFloat((value * 100).toFixed(4))}%` : `${value}px`

export const getFlexProperty = property => {
  if (property === 'top' || property === 'left' || property === 'start') return 'flex-start'
  else if (property === 'bottom' || property === 'right' || property === 'end') return 'flex-end'
  else if (property === 'middle') return 'center'
  else return property
}

export const getCellTranslateFallback = ({ x, y }) =>
  `translate(${x ? (isString(x) ? x : getCellsFallback(x)) : 0}, ${y ? (isString(y) ? y : getCellsFallback(y)) : 0})`

/*
@media(min-width: 2000px){
  transform: translate(NaNpx, NaNpx);
}
@media(min-width: xpx){
  transform: translate(0, 0);
}
@media(min-width: ypx){
  transform: translate(0, 0);
}
*/

export const getCellTranslate = ({ x, y }) =>
  `translate(${x ? (isString(x) ? x : getCells(x)) : 0}, ${y ? (isString(y) ? y : getCells(y)) : 0})`

export const toCellsMax = val => val * 50 + 'px'

export const gridTemplateRows = value => `repeat(${value}, var(--grid-cell-size))`
export const gridSpan = value => `span ${value}`
export const gridMeasurement = value => value + 1
export const gridCells = value => `calc(var(--grid-cell-size) * ${value})`

export const gridCellTranslate = ({ x, y }) =>
  `translate(${x ? (isString(x) ? x : gridCells(x)) : 0}, ${y ? (isString(y) ? y : gridCells(y)) : 0})`

/*
 * Check for the correct type first
 */
export const conversionTypes = {
  getColumnWidth: value => (isNumber(value) ? getColumnWidth(value) : value),
  booleanToIntString: value => (isBoolean(value) ? booleanToIntString(value) : value),
  getCellsFallback: value => (isNumber(value) ? getCellsFallback(value) : value),
  getCells: value => (isNumber(value) ? getCells(value) : value),
  getFlexProperty: value => (isString(value) ? getFlexProperty(value) : value),
  percentageOrPixel: value => (isNumber(value) ? percentageOrPixel(value) : value),
  getCellTranslateFallback: getCellTranslateFallback,
  getCellTranslate: getCellTranslate,
  gridTemplateRows: gridTemplateRows,
  gridSpan: gridSpan,
  gridMeasurement: gridMeasurement,
  gridCells: gridCells,
  gridCellTranslate: gridCellTranslate,
}
