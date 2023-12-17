import { DefaultTheme as DefaultNavigationTheme } from '@react-navigation/native'
import { DefaultTheme } from 'styled-components/native'

export const getNavigationTheme = (theme: DefaultTheme, isDarkMode: boolean) => ({
  ...DefaultNavigationTheme,
  dark: isDarkMode,
  colors: {
    ...DefaultNavigationTheme.colors,
    text: theme.colors.text,
    card: theme.colors.background,
    background: theme.colors.background,
  },
})
