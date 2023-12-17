import 'styled-components/native'
import { Property } from 'csstype'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      foreground: Property.Color
      background: Property.Color
    }
  }
}
