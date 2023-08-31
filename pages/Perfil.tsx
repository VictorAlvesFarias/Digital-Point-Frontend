import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { defaultStyles, fontSize, theme } from '../global.styles'
import { Controller, useForm } from 'react-hook-form'
import Input from '../components/Input'
import Click from '../components/Click'
import { A, P } from '../components/Text'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestUpdateUser } from '../api'
import { useError } from '../extensions/errors'
import { getData, setStoreData } from '../asyncStorage'
import { SafeAreaView } from 'react-native-safe-area-context'

function Perfil ({ navigation }: any): React.JSX.Element {
  const [loading, setLoading] = useState(false)

  const [formDisable, setFormDisable] = useState(true)

  const schema = z.object({
    email: z.string().nonempty('Campos a preencher').email('Email inválido'),
    name: z.string().nonempty('Campos a preencher')
  })

  const { control, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: zodResolver(schema)
  })

  function handleUpdateUser (data: any): void {
    setLoading(true)

    void getData('digitalPointTokenAcess')
      .then(token => {
        requestUpdateUser(data, token)
          .then(() => {
            setLoading(false)
          })
          .catch((error: any) => {
            setLoading(false)
            useError(error, setError)
          })
      })
    setStoreData('digitalPointUser', JSON.stringify({
      name: data.name,
      email: data.email
    }))
  }

  useEffect(() => {
    void getData('digitalPointUser')
      .then((response: any) => {
        const values = JSON.parse(response)
        reset({
          name: values.name,
          email: values.email
        })
      })
  }, [])

  return (
    <SafeAreaView style={defaultStyles.safeAreaViewBetween}>
        <View style={styles.Header}>
          <View style={styles.HeaderContent}>
              <A onClick={() => navigation.pop()}>
                <AntDesign size={30} color={theme.primary} name="arrowleft"/>
              </A>
              <AntDesign color={theme.primary} name="user" size={60} ></AntDesign>
          </View>
        </View>
        <View style={defaultStyles.form}>
            <P style={defaultStyles.errorMessage}>{Object.values(errors)[0]?.message}</P>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                      placeholder="Nome"
                      font={{
                        color: theme.primaryText,
                        size: fontSize.small
                      }}
                      disable={formDisable}
                      style={ !formDisable ? defaultStyles.input : defaultStyles.disableInput }
                      onChange={onChange}
                      value={value}/>
                )}
                name="name"
                />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                      placeholder="E-Mail"
                      font={{
                        color: theme.primaryText,
                        size: fontSize.small
                      }}
                      disable={formDisable}
                      style={ !formDisable ? defaultStyles.input : defaultStyles.disableInput }
                      onChange={onChange}
                      value={value}/>
                )}
                name="email"
            />
        </View>
        <View style={styles.Footer}>
            {
                !formDisable
                  ? <Click
                    onClick={handleSubmit(handleUpdateUser)}
                    loading = {loading}
                    font={{
                      size: fontSize.small,
                      color: theme.secondaryText
                    }}
                    style={defaultStyles.button}
                    gradientColors={[theme.primary, theme.primaryGradient]}>
                    Salvar
                </Click>
                  : <Click
                    onClick={() => { setFormDisable(false) }}
                    font={{
                      size: fontSize.small,
                      color: theme.secondaryText
                    }}
                    style={defaultStyles.button}
                    gradientColors={[theme.primary, theme.primaryGradient]}>
                    Editar
                </Click>
            }
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    marginBottom: 25,
    paddingRight: 30
  },
  HeaderContent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Perfil
