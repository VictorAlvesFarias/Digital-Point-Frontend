import React from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';

const KeyboardAvoidingWrapper = ({ children }:any) => {
  return (
        <ScrollView >
          <KeyboardAvoidingView style={{gap:20}} behavior='height'>
            {children}
          </KeyboardAvoidingView>
        </ScrollView>   
  );
};

export default KeyboardAvoidingWrapper;
