import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from '../pages/Settings'
import DeleteAccount from '../pages/DeleteAccount'
import Perfil from '../pages/Perfil'
import ChangePassword from '../pages/ChangePassword'

function SettingsStackApp (): React.JSX.Element {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
        initialRouteName="Settings"
      >
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Profile" component={Perfil}/>
        <Stack.Screen name="DeleteAccount" component={DeleteAccount}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword}/>
    </Stack.Navigator>
  )
}

export default SettingsStackApp
