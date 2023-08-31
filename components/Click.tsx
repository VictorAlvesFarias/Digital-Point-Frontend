import React from 'react'
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

function Click ({
  children,
  loading,
  onClick,
  gradientColors,
  style,
  font
}: any): React.JSX.Element {
  const styles = StyleSheet.create({
    buttonRoot: {
      height: style.height !== undefined ? style.height : null,
      width: style.width !== undefined ? style.width : null,
      flex: style.flex !== undefined ? style.flex : null
    }
  })

  return (
    loading === false || loading === undefined
      ? <TouchableOpacity
      style={styles.buttonRoot}
      onPress={onClick}
    >
      <LinearGradient
        style={ style }
        colors={gradientColors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
          <Text style={{ color: font.color, fontSize: font.size }}>{ children }</Text>
      </LinearGradient>
    </TouchableOpacity>
      : <View style={[styles.buttonRoot]} >
      <LinearGradient
        style={ style }
        colors={ gradientColors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        >
          <ActivityIndicator color={'white'}/>
      </LinearGradient>
    </View>
  )
}

export default Click
