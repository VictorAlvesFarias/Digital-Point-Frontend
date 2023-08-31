import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/Login'
import CreateAccount from '../pages/CreateAccount'
import SuccessCreateAccount from '../pages/SuccessCreateAccount'
import ErrorCreateAccount from '../pages/ErrorCreateAccount'

function InitialStackApp (): React.JSX.Element {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount}/>
        <Stack.Screen name="SuccessCreateAccount" component={SuccessCreateAccount}/>
        <Stack.Screen name="ErrorCreateAccount" component={ErrorCreateAccount}/>
    </Stack.Navigator>
  )
}

export default InitialStackApp
