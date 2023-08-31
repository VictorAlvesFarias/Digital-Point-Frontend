import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors, fontSize, theme } from '../global.styles'
import { H1 } from '../components/Text'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function Logo (): React.JSX.Element {
  return (
    <LinearGradient style={styles.container}
      colors={[theme.primary, theme.primaryGradient]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <H1 style={styles.Title}>Digital Point</H1>
      <FontAwesome5 color={colors.zinc[0]} name="map-pin" size={20} />
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    flexDirection: 'row'
  },
  Title: {
    fontSize: fontSize.large,
    color: colors.zinc[0],
    textAlign: 'center',
    fontFamily: 'Klik-Light',
    marginLeft: 10
  }
})

export default Logo
