import React from 'react'
import { SafeAreaView } from 'react-native'
import { colors, defaultStyles, theme } from '../global.styles'
import { A, H1 } from '../components/Text'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'

function SuccessCreateAccount ({ navigation }: any): React.JSX.Element {
  return (
      <SafeAreaView style={defaultStyles.safeAreaView}>
            <LinearGradient style={[defaultStyles.fullScreenCenter, { gap: 25 }]}
              colors={[theme.primary, theme.primaryGradient]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
            >
              <H1 style={defaultStyles.title}>Conta Criada com sucesso</H1>
              <A onClick={() => navigation.push('Login')}>
                <AntDesign size={30} color={colors.zinc[0]} name="arrowright"/>
              </A>
          </LinearGradient>
      </SafeAreaView>
  )
}

export default SuccessCreateAccount
