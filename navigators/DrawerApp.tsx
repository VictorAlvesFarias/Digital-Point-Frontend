import 'react-native-gesture-handler'
import React from 'react'
import Home from '../pages/Home'
import Points from '../pages/Points'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerMenuContentApp from '../components/DrawerContentApp'
import { colors, theme } from '../global.styles'
import SettingsStackApp from './SettingsStackApp'
import ExpandedWorkPoint from '../pages/ExpandedWorkPoint'

const Draw = createDrawerNavigator()

function DrawerApp (): JSX.Element {
  return (
    <Draw.Navigator
      drawerContent={props => <DrawerMenuContentApp {...props}/>}
      initialRouteName='Home'
      screenOptions={{
        headerTitle: '',
        headerTitleStyle: { fontFamily: 'Klik-bold', color: colors.zinc[700], fontSize: 25 },
        headerStyle: {
          backgroundColor: theme.background

        },
        headerShadowVisible: false
      }}
      >
      <Draw.Screen
        name="Points"
        options={{
          title: 'Meus Pontos'
        }}
        component={Points}
      />
      <Draw.Screen
        name="Home"
        options={{
          title: 'Diário'
        }}
        component={Home}
      />
      <Draw.Screen
        name="SettingsStack"
        options={{
          title: 'Configurações'
        }}
        component={SettingsStackApp}
      />
      <Draw.Screen
        name="ExpandedWorkPoint"
        options={{
          title: 'Ponto'
        }}
        component={ExpandedWorkPoint}
      />
    </Draw.Navigator>
  )
}

export default DrawerApp
