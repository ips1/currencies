import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { ExchangeBoard } from '../screens/ExchangeBoard/ExchangeBoard.tsx'
import { RateConversion } from '../screens/RateConversion/RateConversion.tsx'
import { RootStackParamList } from './params.ts'
import { NavigationRoute } from './route.ts'

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: FC = () => (
  <RootStack.Navigator initialRouteName={NavigationRoute.ExchangeBoard}>
    <RootStack.Screen
      name={NavigationRoute.ExchangeBoard}
      options={{
        title: 'Currencies',
      }}
    >
      {(props) => <ExchangeBoard {...props} localCurrency="CZK" />}
    </RootStack.Screen>
    <RootStack.Screen
      name={NavigationRoute.RateConversion}
      options={({ route }) => ({
        title: `${route.params.localCurrencyCode} to ${route.params.foreignCurrency.currencyCode}`,
      })}
      component={RateConversion}
    />
  </RootStack.Navigator>
)
