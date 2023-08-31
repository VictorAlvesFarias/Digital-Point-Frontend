import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Click from '../components/Click'
import { defaultStyles, fontSize, theme } from '../global.styles'
import { Controller, useForm } from 'react-hook-form'
import Input from '../components/Input'
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestPutWorkPoint } from '../api'
import { getData } from '../asyncStorage'
import { globalDate, dateValidator, hourValidator } from '../extensions/date'
import { P } from '../components/Text'

function ExpandedWorkPoint ({ values, onClose }: any): React.JSX.Element {
  const schema = z.object({
    departureHour: z.string().nonempty('Campos a preencher').refine(data => hourValidator(data), { message: 'Existem campos inválidos' }),
    entryHour: z.string().nonempty('Campos a preencher').refine(data => hourValidator(data), { message: 'Existem campos inválidos' }),
    departureDay: z.string().nonempty('Campos a preencher').refine(data => dateValidator(data), { message: 'Existem campos inválidos' }),
    entryDay: z.string().nonempty('Campos a preencher').refine(data => dateValidator(data), { message: 'Existem campos inválidos' })
  })

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: values
  })

  const [loading, setLoading] = useState(false)

  function handlePut (data: any): void {
    const post = {
      entryTime: `${globalDate(data.entryDay)}T${data.entryHour}:00.000Z`,
      departureTime: `${globalDate(data.departureDay)}T${data.departureHour}:00.000Z`
    }

    setLoading(true)

    void getData('digitalPointTokenAcess')
      .then((token: any) => {
        requestPutWorkPoint(values.id, post, token)
          .then(response => {
            console.log('response', response)
            onClose(true)
          })
          .catch(() => {
            setLoading(false)
          })
      })
  }

  return (
    <SafeAreaView style={styles.SafeAreaViewRoot}>
      <View style={styles.WorkPoint}>
        <KeyboardAvoidingWrapper>
          <React.Fragment>
              <P style={defaultStyles.paragraph}>Entrada</P>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      defaultValue={values.entryHour}
                      font={{
                        color: theme.primaryText,
                        size: fontSize.small
                      }}
                      style={defaultStyles.input }
                      onChange={onChange}
                      value={value}
                      placeholder="Dia da Entrada"/>
                )}
                name="entryDay"
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    defaultValue={values.entryDay}
                    placeholder="Horário de Entrada"
                    font={{
                      color: theme.primaryText,
                      size: fontSize.small
                    }}
                    style={defaultStyles.input }
                    onChange={onChange}
                    value={value}/>
                )}
                name="entryHour"
              />
              <P style={defaultStyles.paragraph}>Saída</P>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        defaultValue={values.departureDay}
                        font={{
                          color: theme.primaryText,
                          size: fontSize.small
                        }}
                        style={defaultStyles.input }
                        onChange={onChange}
                        value={value}
                        placeholder="Dia de Saída"/>
                )}
                name="departureDay"
              />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        defaultValue={values.departureHour}
                        font={{
                          color: theme.primaryText,
                          size: fontSize.small
                        }}
                        style={defaultStyles.input }
                        onChange={onChange}
                        value={value}
                        placeholder="Horário de Saída"/>
                )}
                name="departureHour"
              />
          </React.Fragment>
        </KeyboardAvoidingWrapper>
        {Object.values(errors)[0]?.message != null &&
            <P style={defaultStyles.errorMessage}>{Object.values(errors)[0]?.message}</P>
        }
      </View>
      <View style={styles.Footer}>
          <Click
            onClick={() => onClose(false)}
            style={defaultStyles.button}
            font={{
              size: fontSize.small,
              color: theme.secondaryText
            }}
            gradientColors={[theme.primary, theme.primaryGradient]}
          >
            Voltar
          </Click>
          <Click
              onClick={handleSubmit(handlePut)}
              style={defaultStyles.button}
              font={{
                size: fontSize.small,
                color: theme.secondaryText
              }}
              gradientColors={[theme.primary, theme.primaryGradient]}
              loading={loading}
          >
              Salvar
          </Click>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  SafeAreaViewRoot: {
    flex: 1,
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between'
  },
  Footer: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 45,
    paddingHorizontal: 20
  },
  WorkPoint: {
    gap: 20,
    display: 'flex',
    paddingHorizontal: 20
  },
  Title: {
    textAlign: 'center',
    marginRight: 60
  },
  Header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 10
  }
})

export default ExpandedWorkPoint
