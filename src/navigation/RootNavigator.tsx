import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { ExchangeBoard } from '../screens/ExchangeBoard/ExchangeBoard.tsx'
import { NavigationRoute } from './route.ts'

const RootStack = createNativeStackNavigator()

export const RootNavigator: FC = () => (
  <RootStack.Navigator initialRouteName={NavigationRoute.ExchangeBoard}>
    <RootStack.Screen
      name={NavigationRoute.ExchangeBoard}
      options={{
        title: 'Currencies',
      }}
    >
      {() => <ExchangeBoard localCurrency="CZK" />}
    </RootStack.Screen>
  </RootStack.Navigator>
)
