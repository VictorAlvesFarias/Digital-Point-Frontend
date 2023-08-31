import { StyleSheet } from 'react-native'

export const colors = {
  red: {
    100: '#EF4444'
  },
  blue: {
    100: '#EF4444'
  },
  yellow: {
    100: '#EF4444'
  },
  esmerald: {
    100: '#D1FAE5',
    200: '#A7F3D0',
    400: '#3EE7B7'
  },
  teal: {
    400: '#2DD4BF'
  },
  zinc: {
    0: 'white',
    300: '#D4D4D8',
    200: '#E4E4E7',
    700: '#3F3F46',
    1000: 'black'
  },
  custom: [
    '#7159c1',
    '#9B49c1',
    '#9B49c159',
    '#D4D4f5'
  ]
}

export const theme = {
  primary: colors.custom[0],
  primaryGradient: colors.custom[1],
  details: colors.custom[2],
  primaryText: colors.zinc[1000],
  secondaryText: colors.zinc[0],
  input: colors.custom[3],
  disableInput: 'transparent',
  background: 'white'
}

export const fontSize = {
  small: 15,
  medium: 20,
  large: 30
}

export const defaultStyles = StyleSheet.create({
  errorMessage: {
    color: colors.red[100],
    fontSize: 16,
    paddingLeft: 10
  },
  safeAreaView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  safeAreaViewBetween: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  input: {
    backgroundColor: theme.input,
    borderRadius: 8,
    color: 'purple'
  },
  disableInput: {
    borderWidth: 1,
    borderColor: theme.input,
    borderRadius: 8,
    color: 'purple'
  },
  form: {
    gap: 25,
    paddingHorizontal: 25
  },
  button: {
    height: 45,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    color: theme.primaryText
  },
  buttonUnflex: {
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    color: theme.primaryText
  },
  switch: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  paragraph: {
    color: theme.primaryText,
    fontSize: fontSize.small
  },
  secondParagraph: {
    color: theme.secondaryText,
    fontSize: fontSize.small
  },
  fullScreenCenter: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: fontSize.large,
    color: theme.secondaryText
  }
})
