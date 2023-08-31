import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { defaultStyles, fontSize, theme } from '../global.styles'
import Click from '../components/Click'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Controller, useForm } from 'react-hook-form'
import { A, P } from '../components/Text'
import { getData } from '../asyncStorage'
import { requestUpdatePassword } from '../api'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useError } from '../extensions/errors'
import Password from '../components/Password'
import Feather from 'react-native-vector-icons/Feather'

function ChangePassword ({ navigation }: any): React.JSX.Element {
  const schema = z.object({
    password: z.string().nonempty('Campos a preencher'),
    newPassword: z.string().nonempty('Campos a preencher').refine(value => value.split('').length >= 6, { message: 'A senha deve possuir no minimo 6 caracteres' }),
    newPasswordConfirm: z.string().nonempty('Campos a preencher').refine(value => value.split('').length >= 6, { message: 'A senha deve possuir no minimo 6 caracteres' })
  })

  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(schema)
  })

  const [loading, setLoading] = useState(false)

  function handleChangePassoword (data: any): void {
    setLoading(true)

    void getData('digitalPointTokenAcess')
      .then(token => {
        requestUpdatePassword(data, token)
          .then(() => {
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
            useError(error, setError)
          })
      })
  }

  return (
        <View style={defaultStyles.safeAreaView}>
          <View style={styles.Header}>
            <View style={styles.HeaderContent}>
              <A onClick={() => navigation.pop()} >
                  <AntDesign size={30} color={theme.primary} name="arrowleft"/>
              </A>
              <AntDesign color={theme.primary} name="user" size={60} ></AntDesign>
            </View>
          </View>
          <View style={defaultStyles.form}>
          <P style={defaultStyles.errorMessage}>{Object.values(errors)[0]?.message}</P>
                  <Controller
                      defaultValue={''}
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Password
                              password={{
                                iconDisable: <Feather name={'eye'} color={theme.primaryText} size={20}></Feather>,
                                icon: <Feather name={'eye-off'} color={theme.primaryText} size={20}></Feather>
                              }}
                              placeholder="Senha"
                              font={{
                                color: theme.primaryText,
                                size: fontSize.small
                              }}
                              style={defaultStyles.input }
                              onChange={onChange}
                              value={value}/>
                      )}
                      name="password"
                  />
                  <Controller
                      defaultValue={''}control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Password
                              password={{
                                iconDisable: <Feather name={'eye'} color={theme.primaryText} size={20}></Feather>,
                                icon: <Feather name={'eye-off'} color={theme.primaryText} size={20}></Feather>
                              }}
                              placeholder="Nova Senha"
                              font={{
                                color: theme.primaryText,
                                size: fontSize.small
                              }}
                                  style={defaultStyles.input }
                                  onChange={onChange}
                                  value={value}/>
                      )}
                      name="newPassword"
                  />
                  <Controller
                      defaultValue={''}control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Password
                              password={{
                                iconDisable: <Feather name={'eye'} color={theme.primaryText} size={20}></Feather>,
                                icon: <Feather name={'eye-off'} color={theme.primaryText} size={20}></Feather>
                              }}
                              placeholder="Confirmar Senha"
                              font={{
                                color: theme.primaryText,
                                size: fontSize.small
                              }}
                              style={defaultStyles.input }
                              onChange={onChange}
                              value={value}/>
                      )}
                      name="newPasswordConfirm"
                  />
        </View>
          <View style={styles.Footer}>
            <Click
                  loading={loading}
                  onClick={handleSubmit(handleChangePassoword)}
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
        </View>
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
    paddingRight: 30,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginBottom: 75
  },
  HeaderContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default ChangePassword
