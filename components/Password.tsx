import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

function Password({
    placeholder,
    value,
    onChange,
    style,
    disable,
    password,
    defaultValue,
    font,
    field
}:any) {

    const [passwordIsVisible,setPasswordIsVisible] = useState(false) 
    
    return (
    <View style={[ styles.InputRoot,style ]}>
        <TextInput 
            {...field}
            defaultValue={defaultValue}
            editable={!disable} 
            placeholderTextColor={font.color} 
            style={[styles.InputContainer,{color:font.color,fontSize:font.size}]} 
            value={value} 
            onChangeText={onChange} 
            placeholder={placeholder}
            secureTextEntry={password&&!passwordIsVisible}>
        </TextInput>
        {
            !passwordIsVisible?
                <TouchableOpacity onPress={()=>setPasswordIsVisible(true)}>
                    {password.icon}
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>setPasswordIsVisible(false)}>
                    {password.iconDisable}
                </TouchableOpacity>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    InputRoot:{
        borderRadius:999,       
        paddingHorizontal:20,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    InputContainer:{
        borderRadius:999,   
        fontSize:15,
        flex:1,  
        backgroundColor:"transparent"
    }
})

export default Password