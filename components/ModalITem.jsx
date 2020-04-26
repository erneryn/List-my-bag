import React from "react";
import { Text, StyleSheet,  TextInput,View, Alert, KeyboardAvoidingView, SafeAreaView, CheckBox } from "react-native";
import Picker from "react-native-picker-select";
import { Icon, Input, Button } from "react-native-elements";
import { useState } from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { fecthApi } from '../store/action/ProjectAct'
import { useDispatch } from "react-redux";

export default function ModalITem({ showModal, setShowModal , projectId}) {
  const [selected, setSelected] = useState(false);
  const [category, setCategory] = useState(false)
  const [name,setName] = useState('')

  const dispatch = useDispatch()

  const handleClose = () => {
    setShowModal(!showModal);
  };

  const addItem = () => {
    let Category = selected ? selected : category
    const item = {
      itemName: name , 
      category :  Category
    }
    axios.post(`http://192.168.1.17:3000/item/${projectId}`,item)
    .then(()=>{
      dispatch(fecthApi())
      setShowModal(!showModal)
    })
  }


  return (

    <View style={styles.container} >
      <View style={styles.modal}>
        <Button
          title=" close"
          type="clear"
          onPress={() => handleClose()}
          icon={<Text>X</Text>}
        />
        <Text
          style={{
            fontSize: 21,
            color: "grey",
            marginBottom: 20,
            textDecorationLine: "underline",
          }}
        >
          Add New Item
        </Text>
        <Input
          containerStyle={{
            marginBottom: 20,
          }}
          placeholder="Item Name"
          onChangeText={(text) => setName(text)}
        />

        <Picker
          placeholder={{
            label: "Select Category",
            color: "#9EA0A4",
          }}
        disabled={category ? true : false}
          onValueChange={(val) => setSelected(val)}
          items={[
            { label: "Head", value: "Head" },
            { label: "Body", value: "Body" },
            { label: "Bottom", value: "Bottom" },
            { label: "Foot Wear", value: "Foot Wear" },
            { label: "Sleeping Wear", value: "Sleeping Wear" },
            { label: "Cooking Item", value: "Cooking Item" },
          ]}
        />
        <Text>or</Text> 
        <Input
          containerStyle={{
            marginBottom: 20,
          }}
          disabled={ selected ? true : false}
          placeholder="Custom Category"
          onChangeText={(text)=> setCategory(text)}
        />
        <Button
          title="ADD"
          containerStyle={{ marginTop: 20 }}
          buttonStyle={{
            borderRadius: 20,
            width: 300,
          }}
          onPress={() => addItem()}
        />
      </View>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23, 23, 22, 0.9)",
    position:'absolute',
    width:'100%',
    bottom:0,
    top:0,
    justifyContent:'center',
    alignItems:'center'
    
  },
  modal: {
    width:'90%',
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "column",
    padding:15
  },
  keyboard:{
    
  },
  picker: {
    textDecorationLine: "underline",
  },
});
