import React from 'react'
import { SafeAreaView } from 'react-native'
import { colors, defaultStyles, theme } from '../global.styles'
import { A, H1, P } from '../components/Text'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'

function ErrorCreateAccount ({ navigation }: any): React.JSX.Element {
  return (
        <SafeAreaView style={defaultStyles.safeAreaView}>
            <LinearGradient
              style={[defaultStyles.fullScreenCenter, { gap: 30 }]}
              colors={[theme.primary, theme.primaryGradient]}
              start={{ x: 0.7, y: 0 }}
              end={{ x: 0.9, y: 2 }}
            >
              <H1 style={defaultStyles.title}>Erro ao criar conta.</H1>
              <P style={[defaultStyles.secondParagraph, { width: '75%' }]}>Verfique suas informações e tente novamente mais tarde.</P>
              <P style={[defaultStyles.secondParagraph, { width: '75%' }]}>Se o problema persistir, contate o suporte.</P>
              <A onClick={() => navigation.pop()} >
                <AntDesign size={30} color={colors.zinc[0]} name="arrowleft"/>
              </A>
          </LinearGradient>
        </SafeAreaView>
  )
}

export default ErrorCreateAccount
