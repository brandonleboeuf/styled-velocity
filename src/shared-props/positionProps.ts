import { PropsAvailablePropTypes } from '@propTypes'
import { positionPropsAvailable } from '@sharedProps'
import { convertValue, createStyle, isNullOrUndefined } from '@utils'
import { css } from 'styled-components'

export const positionProps = css`
  ${props =>
    positionPropsAvailable.map(
      ({ prop, property, propertyTwo, propertyThree, conversionType }: PropsAvailablePropTypes) => {
        if (isNullOrUndefined(props[prop])) {
          return
        }

        const properties = [property, propertyTwo, propertyThree]
        const value = conversionType ? convertValue(props[prop], conversionType) : props[prop]

        let style = ''

        /*
         * See if there's a second or third prop, EG: mx: margin-left and margin-right
         */
        for (let index = 0; index < properties.length; index++) {
          if (properties[index]) {
            /*
             * If we're converting cells, let's add a legit fallback
             */
            if (conversionType === 'getCells') {
              style += createStyle({
                property: properties[index],
                value: convertValue(props[prop], 'getCellsFallback'),
              })
            }

            style += createStyle({ property: properties[index], value })
          }
        }

        return style
      },
    )};
`
