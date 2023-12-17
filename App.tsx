/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { ExchangeBoard } from './src/screens/ExchangeBoard/ExchangeBoard.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import styled, { ThemeProvider } from 'styled-components/native'
import { lightTheme } from './src/theme/light.ts'
import { darkTheme } from './src/theme/dark.ts'

const StyledSafeAreaView = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.background};
`

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const activeTheme = isDarkMode ? darkTheme : lightTheme

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={activeTheme}>
        <StyledSafeAreaView>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <ExchangeBoard />
        </StyledSafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
