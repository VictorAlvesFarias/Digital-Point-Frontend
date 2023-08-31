import React from 'react'
import { defaultStyles, fontSize, theme } from '../global.styles'
import { StyleSheet, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Click from '../components/Click'

function Settings ({ navigation }: any): React.JSX.Element {
  return (
        <View style={defaultStyles.safeAreaViewBetween}>
            <View style={[styles.Header]}>
                <AntDesign color={theme.primary} name="setting" size={60} ></AntDesign>
            </View>
            <View style={styles.Footer}>
                <Click
                    onClick={() => navigation.push('Profile')}
                    font={{
                      size: fontSize.small,
                      color: theme.secondaryText
                    }}
                    style={defaultStyles.buttonUnflex}
                    gradientColors={[theme.primary, theme.primaryGradient]}>
                    Perfil
                </Click>
                <Click
                    onClick={() => navigation.push('ChangePassword')}
                    font={{
                      size: fontSize.small,
                      color: theme.secondaryText
                    }}
                    style={defaultStyles.buttonUnflex}
                    gradientColors={[theme.primary, theme.primaryGradient]}>
                    Alterar Senha
                </Click>
                <Click
                    onClick={() => navigation.push('DeleteAccount')}
                    font={{
                      size: fontSize.small,
                      color: theme.secondaryText
                    }}
                    style={defaultStyles.buttonUnflex}
                    gradientColors={[theme.primary, theme.primaryGradient]}>
                    Apagar Conta
                </Click>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({

  Footer: {
    marginBottom: 40,
    marginHorizontal: 20,
    gap: 20,
    flex: 1,
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'column'
  },
  Header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    gap: 10
  }
})

export default Settings
