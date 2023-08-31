import React, { useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'
import Input from '../components/Input'
import Click from '../components/Click'
import { useForm, Controller } from 'react-hook-form'
import { SafeAreaView, StyleSheet, View, useWindowDimensions, Animated, FlatList } from 'react-native'
import { A, H1, P } from '../components/Text'
import { colors, defaultStyles, fontSize, theme } from '../global.styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { requestCreateAccount, requestVerifyEmail } from '../api'
import { useError } from '../extensions/errors'
import Password from '../components/Password'

function CreateAccount ({ navigation }: any): JSX.Element {
  const schema = [
    z.object({
      email: z.string().nonempty('Campos a preencher').email('Email inválido'),
      name: z.string().nonempty('Campos a preencher')
    }),
    z.object({
      password: z.string().nonempty('Campos a preencher').refine(value => value.split('').length >= 6, { message: 'A senha deve possuir no minimo 6 caracteres' }),
      passwordConfirm: z.string().nonempty('Campos a preencher').refine(value => value.split('').length >= 6, { message: 'A senha deve possuir no minimo 6 caracteres' })
    }).superRefine(({ passwordConfirm, password }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'As senhas não conferem'
        })
      }
    })
  ]

  const FirstStep = useForm({
    resolver: zodResolver(schema[0])
  })

  const SecondStep = useForm({
    resolver: zodResolver(schema[1])
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const [loading, setLoading] = useState(false)

  const { width } = useWindowDimensions()

  const scrollX = useRef(new Animated.Value(0)).current

  const slidesRef: any = useRef()

  function scroollTo (): void {
    if (currentIndex < 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
      setCurrentIndex(1)
    }
  }

  function scroollToBack (): void {
    if (currentIndex === 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex - 1 })
      setCurrentIndex(0)
    }
  }

  function handleCreateAccount (data: any): void {
    const user = {
      name: FirstStep.watch('name'),
      email: FirstStep.watch('email'),
      password: data.password,
      passwordConfirm: data.passwordConfirm
    }

    setLoading(true)
    requestCreateAccount(user)
      .then(() => {
        navigation.push('SuccessCreateAccount')
        setLoading(false)
      })
      .catch(() => {
        navigation.push('ErrorCreateAccount')
        setLoading(false)
      })
  }

  function handleVerifyEmail (data: any): void {
    setLoading(true)
    requestVerifyEmail(data.email)
      .then(() => {
        setLoading(false)
        scroollTo()
      })
      .catch(errors => {
        setLoading(false)
        useError(errors, FirstStep.setError)
      })
  }

  return (
    <SafeAreaView style={defaultStyles.safeAreaView}>
      <LinearGradient
        style={styles.Header}
        colors={[theme.primaryGradient, theme.primary]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <A onClick={() => navigation.pop()}><AntDesign size={30} color={colors.zinc[0]} name="arrowleft" /></A>
        <H1 style={styles.Title}>Criar Conta</H1>
      </LinearGradient>
      <View>
        <FlatList
          data={
            [
              <View key={1} style={[{ width }, defaultStyles.form]}>
                {Object.values(FirstStep.formState.errors)[0] === undefined ? null : <P style={defaultStyles.errorMessage}>{Object.values(FirstStep.formState.errors)[0]?.message}</P>}
                <Controller
                  defaultValue=""
                  control={FirstStep.control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="Nome"
                      font={{
                        color: theme.primaryText,
                        size: fontSize.small
                      }}
                      style={defaultStyles.input}
                      onChange={onChange}
                      value={value} />
                  )}
                  name="name"
                />
                <Controller
                  defaultValue=""
                  control={FirstStep.control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder="E-mail"
                      font={{
                        color: theme.primaryText,
                        size: fontSize.small
                      }}
                      style={defaultStyles.input}
                      onChange={onChange}
                      value={value} />
                  )}
                  name="email"
                />
              </View>,
              <View key={2} style={[{ width }, defaultStyles.form]}>
                {Object.values(SecondStep.formState.errors)[0] === undefined ? null : <P style={defaultStyles.errorMessage}>{Object.values(SecondStep.formState.errors)[0]?.message}</P>}
                <Controller
                  defaultValue=""
                  control={SecondStep.control}
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
                      onChange={onChange} />
                  )}
                  name="password"
                />
                <Controller
                  defaultValue=""
                  control={SecondStep.control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Password
                      placeholder="Confirmar Senha"
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
                      onChange={onChange} />
                  )}
                  name="passwordConfirm"
                />
              </View>
            ]
          }
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => item}
          ref={slidesRef}
          horizontal
          pagingEnabled
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false
          })}
        >
        </FlatList>
      </View>
      <View style={[defaultStyles.switch, { paddingHorizontal: 25, marginTop: 25 }]}>
        {
          currentIndex === 1
            ? <React.Fragment>
              <Click
                onClick={FirstStep.handleSubmit(scroollToBack)}
                font={{
                  size: fontSize.small,
                  color: theme.secondaryText
                }}
                style={defaultStyles.button}
                gradientColors={[theme.primary, theme.primaryGradient]}
              >
                Voltar
              </Click>
              <Click
                onClick={SecondStep.handleSubmit(handleCreateAccount)}
                loading={loading}
                font={{
                  size: fontSize.small,
                  color: theme.secondaryText
                }}
                style={defaultStyles.button}
                gradientColors={[theme.primary, theme.primaryGradient]}
              >
                Criar
              </Click>
            </React.Fragment>
            : <Click
              onClick={FirstStep.handleSubmit(handleVerifyEmail)}
              loading={loading}
              font={{
                size: fontSize.small,
                color: theme.secondaryText
              }}
              style={defaultStyles.button}
              gradientColors={[theme.primary, theme.primaryGradient]}
            >
              Avançar
            </Click>
        }
      </View>
      <View style={styles.Footer}>
        <P style={{ color: theme.primaryText }}>Ja possui uma conta? </P>
        <A style={{ color: theme.primary }} onClick={() => navigation.push('Login')} >Entrar na conta</A>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Title: {
    fontSize: 30,
    color: colors.zinc[0],
    textAlign: 'center',
    marginRight: 20
  },
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
  Footer: {
    paddingVertical: 20,
    marginHorizontal: 30,
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: colors.zinc[300],
    marginTop: 25
  }
})

export default CreateAccount
