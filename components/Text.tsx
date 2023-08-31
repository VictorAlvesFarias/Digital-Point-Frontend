import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export function A ({ children, style, onClick }: any): React.JSX.Element {
  return (
    <TouchableOpacity onPress={onClick} style={style} >
      {
        <Text style={style} >{children}</Text>
      }
    </TouchableOpacity>
  )
}

export function H1 ({ children, style }: any): React.JSX.Element {
  return (
      <Text style={style}>{children}</Text>
  )
}

export function P ({ children, style }: any): React.JSX.Element {
  return (
      <Text style={style}>{children}</Text>
  )
}
