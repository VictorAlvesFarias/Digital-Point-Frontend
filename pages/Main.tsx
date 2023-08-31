import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import DrawerApp from '../navigators/DrawerApp'
import InitialStackApp from '../navigators/InitialStackApp'
import Logo from './Logo'

function Main (): React.JSX.Element {
  const { authenticated }: any = useContext(AuthContext)

  return (
    <NavigationContainer>
      {authenticated === true
        ? <DrawerApp></DrawerApp>
        : authenticated === false
          ? <InitialStackApp></InitialStackApp>
          : <Logo/>
      }
    </NavigationContainer>
  )
}

export default Main
