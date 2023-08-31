import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { defaultStyles, fontSize, theme } from '../global.styles'
import { Controller, useForm } from 'react-hook-form'
import Click from '../components/Click'
import { A, P } from '../components/Text'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestDeleteAccount } from '../api'
import { getData } from '../asyncStorage'
import { AuthContext } from '../context/AuthProvider'
import { useError } from '../extensions/errors'
import Password from '../components/Password'
import { SafeAreaView } from 'react-native-safe-area-context'

function DeleteAccount ({ navigation }: any): React.JSX.Element {
  const schema = z.object({
    password: z.string().nonempty('Campos a preencher')
  })

  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(schema)
  })

  const { logout }: any = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  function handleDeleteAccount (data: any): void {
    setLoading(true)

    void getData('digitalPointTokenAcess')
      .then((token: any) => {
        requestDeleteAccount(data.password, token)
          .then(() => {
            logout()
          })
          .catch((error) => {
            setLoading(false)
            useError(error, setError)
          })
      })
  }

  return (
     <SafeAreaView style={defaultStyles.safeAreaView}>
        <View style={styles.Header}>
          <View style={styles.HeaderContent}>
            <A onClick={() => navigation.pop()} >
                <AntDesign size={30} color={theme.primary} name="arrowleft"/>
            </A>
            <Feather color={theme.primary} name="trash" size={60} ></Feather>
          </View>
        </View>
        <View style={defaultStyles.form}>
            <P style={defaultStyles.errorMessage}>{Object.values(errors)[0]?.message}</P>
            <Controller
                control={control}
                defaultValue={''}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Password
                        placeholder="Senha"
                        font={{
                          color: theme.primaryText,
                          size: fontSize.small
                        }}
                        type={'password'}
                        style={defaultStyles.input}
                        password={{
                          iconDisable: <Feather name={'eye'} color={theme.primaryText} size={20}></Feather>,
                          icon: <Feather name={'eye-off'} color={theme.primaryText} size={20}></Feather>
                        }}
                        onChange={onChange}/>
                )}
                name="password"
            />
        </View>
        <View style={styles.Footer}>
            <Click
                loading={loading}
                onClick={handleSubmit(handleDeleteAccount)}
                font={{
                  size: fontSize.small,
                  color: theme.secondaryText
                }}
                  style={defaultStyles.button}
                  gradientColors={[theme.primary, theme.primaryGradient]}
              >
                Apagar Conta
            </Click>
        </View>
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Footer: {
    paddingTop: 25,
    paddingBottom: 40,
    marginHorizontal: 25,
    gap: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  Header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginBottom: 75,
    paddingRight: 30
  },
  HeaderContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default DeleteAccount
