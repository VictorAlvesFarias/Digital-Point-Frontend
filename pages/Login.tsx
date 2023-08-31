import React, { useContext, useState } from 'react'
import Click from '../components/Click'
import Input from '../components/Input'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'
import Password from '../components/Password'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context/AuthProvider'
import { useForm, Controller } from 'react-hook-form'
import { colors, defaultStyles, fontSize, theme } from '../global.styles'
import { A, H1, P } from '../components/Text'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useError } from '../extensions/errors'

function Login ({ navigation }: any): JSX.Element {
  const schema = z.object({
    email: z.string().nonempty('Campos a preencher').email('Email inválido'),
    password: z.string().nonempty('Campos a preencher')
  })

  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(schema)
  })

  const { singIn }: any = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  function handleLogin (data: any): void {
    setLoading(true)

    singIn(data)
      .then((response: any) => {
        setLoading(false)
        console.log('err@.com', JSON.stringify(response))
        useError(response, setError)
      })
  }

  return (
    <SafeAreaView style={defaultStyles.safeAreaView}>
        <LinearGradient style={styles.Header}
            colors={[theme.primary, theme.primaryGradient]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <H1 style={styles.Title}>Digital Point</H1>
            <FontAwesome5 color={colors.zinc[0]} name="map-pin" size={20} />
        </LinearGradient>
        <View style={defaultStyles.form} >
            { Object.values(errors)[0]?.message !== undefined &&
              <P style={defaultStyles.errorMessage}>{Object.values(errors)[0]?.message}</P>
            }
            <Controller
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        placeholder="E-mail"
                        font={{
                          color: theme.primaryText,
                          size: fontSize.small
                        }}
                        style={defaultStyles.input }
                        onChange={onChange}
                        value={value}/>
                )}
                name="email"
            />
            <Controller
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Password
                        placeholder="Senha"
                        font={{
                          color: theme.primaryText,
                          size: fontSize.small
                        }}
                        style={defaultStyles.input}
                        password={{
                          iconDisable: <Feather name={'eye'} color={theme.primaryText} size={20}></Feather>,
                          icon: <Feather name={'eye-off'} color={theme.primaryText} size={20}></Feather>
                        }}
                        onChange={onChange}
                    />
                )}
                name="password"
            />
            <View style={defaultStyles.switch}>
                <Click
                    onClick={handleSubmit(handleLogin)}
                    loading={loading}
                    font={{
                      size: fontSize.small,
                      color: theme.secondaryText
                    }}
                    style={defaultStyles.button}
                    gradientColors={[theme.primary, theme.primaryGradient]}>
                    Entrar
                </Click>
            </View>
          </View>
        <View style={styles.Footer}>
            <P style={{ color: theme.primaryText }}> Não possui uma conta? </P>
            <A style={{ color: theme.primary }} onClick={() => navigation.push('CreateAccount')}>Cadastre-se</A>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minHeight: 150,
    backgroundColor: theme.primary,
    marginBottom: 25
  },
  Title: {
    fontSize: fontSize.large,
    color: colors.zinc[0],
    textAlign: 'center',
    fontFamily: 'Klik-Light',
    marginLeft: 10
  },
  Footer: {
    paddingVertical: 20,
    marginHorizontal: 25,
    marginTop: 25,
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: colors.zinc[300]
  }
})

export default Login
