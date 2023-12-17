import 'styled-components/native'
import { Property } from 'csstype'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      text: Property.Color
      textSecondary: Property.Color
      background: Property.Color
    }
  }
}
