import styled from 'styled-components'
import { createStyle, convertValue } from '@utils'

import {
  appearanceProps,
  cssProps,
  dimensionProps,
  displayMode,
  flexProps,
  gridLines,
  growShrinkProps,
  textProps,
} from '@sharedProps'

/* Flexbox is 1 dimensional (row), Grid is 2 dimensional (row, column) */
/* justify-* is row axis */
/* align-* is column axis */

export const StyledFlex = styled.div`
  position: relative;
  display: flex;

  > * {
    position: relative;
    max-width: 100%;
    margin: 0;

    ${growShrinkProps};
    ${props =>
    props.autoWidthColumns &&
      !props.columns &&
      createStyle({ property: 'flex-basis', value: convertValue(props.itemCount, 'getColumnWidth') })};

    ${props =>
    props.columns &&
      !props.autoWidthColumns &&
      createStyle({ property: 'flex-basis', value: convertValue(props.columns, 'getColumnWidth') })};
  }

  ${gridLines};
  ${displayMode};
  ${appearanceProps};
  ${dimensionProps};
  ${flexProps};
  ${textProps};
  ${cssProps};
`
