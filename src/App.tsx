/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native'
import React, { FC, useMemo, useState } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components/native'
import { RootNavigator } from './navigation/RootNavigator.tsx'
import { darkTheme } from './theme/dark.ts'
import { lightTheme } from './theme/light.ts'
import { getNavigationTheme } from './theme/navigationTheme.ts'

const App: FC = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const activeTheme = isDarkMode ? darkTheme : lightTheme
  const navigationTheme = useMemo(() => getNavigationTheme(activeTheme, isDarkMode), [activeTheme, isDarkMode])

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={activeTheme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
