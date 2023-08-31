import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function Input ({
  placeholder,
  value,
  onChange,
  style,
  disable,
  defaultValue,
  font,
  field
}: any): React.JSX.Element {
  return (
    <View style={[styles.InputRoot, style]}>
        <TextInput
            {...field}
            defaultValue={defaultValue}
            editable={!disable}
            placeholderTextColor={font.color}
            style={[styles.InputContainer, { color: font.color, fontSize: font.size }]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}>
        </TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  InputRoot: {
    borderRadius: 999,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  InputContainer: {
    borderRadius: 999,
    fontSize: 15,
    flex: 1,
    backgroundColor: 'transparent'
  }
})

export default Input
