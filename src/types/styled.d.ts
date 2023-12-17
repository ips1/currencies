import { Property } from 'csstype'
import 'styled-components/native'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      text: Property.Color
      textSecondary: Property.Color
      background: Property.Color
    }
  }
}
