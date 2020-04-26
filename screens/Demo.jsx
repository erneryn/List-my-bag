import React from 'react';
import { View, TextInput, Image, KeyboardAvoidingView ,Text} from 'react-native';
import {StyleSheet } from 'react-native'
import { useEffect } from 'react';

const Demo = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
    >
    <View style={{
        flex:1
    }}>
        <Text>TEst</Text>
    </View>
      <TextInput
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />
       <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />
       <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />
       <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />
       <TextInput
        placeholder="Confirm Password"
        style={styles.input}
      />
      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'red',
        flex: 1,
        flexDirection:'column',
    },
    input:{
        backgroundColor: 'grey',
        borderColor: 'black',
        borderWidth:2,
        marginTop:10
    }    
})

export default Demo;