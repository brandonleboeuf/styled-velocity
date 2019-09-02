import { SharedPropsPropTypes } from '@propTypes'
import * as React from 'react'
import { Box } from './Box'
import { StyledFlex } from './styled'

export interface FlexProps extends SharedPropsPropTypes {
  /**
   * The children of the Flex component.
   * @type React.ReactNode
   */
  children?: React.ReactNode

  /**
   * The className of the Flex component.
   * @type string
   */
  className?: string

  /**
   * Define the html element being output
   * @type string
   * @defaultValue 'div'
   * @example
   * element="div"
   * element="span"
   */
  element?: string
}

const defaultProps: FlexProps = {
  align: 'left',
  autoWidthColumns: false,
  direction: 'row',
  element: 'div',
  valign: 'top',
  wrap: 'wrap',
}

const Flex: React.FunctionComponent<FlexProps> & {
  defaultProps: Partial<FlexProps>
  Item: typeof Box
  Box: typeof Box
  BoxProps: any
} = React.forwardRef(
  (
    { align, autoWidthColumns, children, className, columns, direction, element, valign, valignContent, wrap, ...rest },
    ref,
  ) =>
    React.createElement(
      StyledFlex,
      {
        as: element,
        className,
        align,
        valign,
        valignContent,
        direction,
        wrap,
        itemCount: React.Children.count(children),
        autoWidthColumns: columns === undefined && autoWidthColumns,
        columns,
        ref,
        get columnCount() {
          return this.autoWidthColumns ? this.itemCount : this.columns
        },
        ...rest,
      },
      children,
    ),
)

Flex.Item = Box
Flex.Box = Box

Flex.defaultProps = defaultProps
Flex.displayName = 'Flex'

export { Flex }
