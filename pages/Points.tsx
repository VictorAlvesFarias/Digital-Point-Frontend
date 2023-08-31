import React, { useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { getData } from '../asyncStorage'
import { P } from '../components/Text'
import { colors, defaultStyles, fontSize, theme } from '../global.styles'
import { useFocusEffect } from '@react-navigation/native'
import Click from '../components/Click'
import Feather from 'react-native-vector-icons/Feather'
import { requestDeleteWorkPoint, requestGetWorkPoint } from '../api'
import ExpandedWorkPoint from './ExpandedWorkPoint'
import { dateConvert, hoursConvert } from '../extensions/date'

function Point (): JSX.Element {
  const [extendedValues, setExtendedValues] = useState(
    {
      departureHour: '',
      entryHour: '',
      departureDay: '',
      entryDay: '',
      id: ''
    }
  )

  const [workPoints, setWorkPoints]: any = useState([])

  const [loading, setLoading] = useState(false)

  const [extended, setExtended] = useState(true)

  function handleUpdateList (): void {
    setLoading(true)

    void getData('digitalPointTokenAcess')
      .then(token => {
        requestGetWorkPoint(token)
          .then((response) => {
            console.log(response.data.workPointsList)
            setWorkPoints(response.data.workPointsList)
            setLoading(false)
          })
          .catch(() => {
            setLoading(false)
          })
      })
  }

  function handleSetDefaultValues (index: string): void {
    setExtendedValues({
      departureHour: hoursConvert(workPoints[index].departureTime),
      entryHour: hoursConvert(workPoints[index].entryTime),
      departureDay: dateConvert(workPoints[index].departureTime),
      entryDay: dateConvert(workPoints[index].entryTime),
      id: workPoints[index].id
    })
    setExtended(false)
  }

  function handleDelete (id: string): void {
    setLoading(true)

    void getData('digitalPointTokenAcess')
      .then((token: any) => {
        requestDeleteWorkPoint(id, token)
          .then(response => {
            handleUpdateList()
            setWorkPoints(response.data.workPointsList)
          })
          .catch(() => {
            setLoading(false)
          })
      })
  }

  function handleClose (data: boolean): void {
    setExtended(true)

    if (data) {
      handleUpdateList()
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      handleUpdateList()
    }, [])
  )

  return (
    <SafeAreaView style={defaultStyles.safeAreaView}>
      {
        !loading
          ? extended
            ? workPoints.length === 0
              ? <View style={defaultStyles.fullScreenCenter}>
                  <P style={defaultStyles.paragraph}>Nenhum ponto registrado</P>
                </View>
              : <FlatList
                style={styles.PointsList}
                data={workPoints}
                renderItem={({ item, index }: any) =>
                  <View style={styles.PointsListItem}>
                    <P style={styles.PointsListText}>Dia de Entrada: {dateConvert(item.entryTime)}</P>
                    <P style={styles.PointsListText}>Horario de Entrada: {hoursConvert(item.entryTime)}</P>
                    <P style={styles.PointsListText}>Dia de Saída: {dateConvert(item.departureTime)}</P>
                    <P style={styles.PointsListText}>Horario de Saída: {hoursConvert(item.departureTime)}</P>
                    <View style={styles.Switch} >
                      <Click
                          onClick={() => { handleSetDefaultValues(index) }}
                          style={styles.Button}
                          font={{
                            size: fontSize.small,
                            color: theme.secondaryText
                          }}
                          gradientColors={[theme.primary, theme.primaryGradient]}
                      >
                          Editar
                      </Click>
                      <Click
                          onClick={() => { handleDelete(item.id) }}
                          style={{}}
                          gradientColors={['transparent', 'transparent']}
                          font={{
                            size: fontSize.small,
                            color: theme.secondaryText
                          }}
                      >
                        <Feather color={theme.primary} name="trash" size={30} ></Feather>
                      </Click>
                    </View>
                  </View>
                }
              >
                </FlatList>
            : <ExpandedWorkPoint
                values={extendedValues}
                onClose={handleClose}>
              </ExpandedWorkPoint>
          : <View style={styles.LoadingContainer}>
          <ActivityIndicator size={50} color={theme.primary}/>
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  PointsListRoot: {
    flex: 1
  },
  Header: {
    height: 60,
    width: '100%'
  },
  ItemListPrimary: {
    height: 40,
    width: '100%'
  },
  ItemListSecondary: {
    height: 40,
    width: '100%'
  },
  PointsList: {
    paddingHorizontal: 15,
    display: 'flex'
  },
  PointsListItem: {
    padding: 20,
    marginBottom: 20,
    gap: 10,
    backgroundColor: colors.zinc[200],
    borderRadius: 10,
    borderLeftColor: theme.primary,
    borderLeftWidth: 10
  },
  PointsListText: {
    color: colors.zinc[700],
    fontSize: 20
  },
  LoadingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Button: {
    height: 45,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  Switch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default Point
