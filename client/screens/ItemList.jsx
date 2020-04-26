import React from "react";
import { Text, View, StyleSheet} from "react-native";
import { Header, CheckBox } from "react-native-elements";
import {
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native-gesture-handler";
import { ListItem } from 'react-native-elements'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Icon, Input, Button } from "react-native-elements";

import ModalITem from "../components/ModalITem";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fecthApi,FetchProject } from '../store/action/ProjectAct'

import axios from 'axios'

export default function ItemList({ route, navigation }) {
  const projects = useSelector((state) => state.project);
  const projectId = route.params.project._id;
  //project which
  const project = projects.find((project) => project._id == projectId);
  const [items,setItems] = useState(project.items);

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);

  useEffect(() =>{
    setItems(project.items)
  },[projects])
  
  useEffect(()=>{
    setItems(items)
  },[items])


  const setCheck = (selectedItem)=>{
    let tempItems = [...items]
    console.log(tempItems)
    let itemWillUpdate = {
      category : selectedItem.category,
      itemName : selectedItem.itemName,
      status : selectedItem.status == 'check' ? 'uncheck' : 'check'
    }
    const findIdx = tempItems.findIndex((e)=> e._id == selectedItem._id)
    tempItems[findIdx].status = itemWillUpdate.status
    setItems(tempItems)
    axios.put(`http://192.168.1.17:3000/item/${selectedItem._id}`,itemWillUpdate)
      .then(()=>{
        dispatch(fecthApi())
      })
  }



  const formCheck = (selectedItem) => {
    return (
      <CheckBox
        containerStyle={{
          padding: 0,
        }}
        checked={selectedItem.status == "check" ? true : false}
        onPress={()=> setCheck(selectedItem)}
      />
    );
  };

  return (
    <>
      <View style={{
        flex:1
      }}>
        <Header
          leftComponent={
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <View
                style={{
                  marginLeft: 10,
                  width: "auto",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Icon type="font-awesome" name="chevron-left" />
              </View>
            </TouchableOpacity>
          }
          centerComponent={
            <Text style={{ fontSize: 20, marginLeft: 8 }}>Item List</Text>
          }
          backgroundColor="#f4511e"
        />
       
        

          <View style={{
            flex:1
          }}>
            <ScrollView>

          {items.map((e, i) => (
            <ListItem
            
            key={i}
            title={e.itemName}
            rightElement={formCheck(e)}
            bottomDivider
            subtitle={"category : " + e.category}
            onPress={()=> setCheck(e)}
            />
            ))}
            </ScrollView>
            </View>

              {/* <View style={{
                flex:1,
                height:'50%'
              }}>
            </View> */}
      </View>

      <View style={style.addButtonContainer}>
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <View style={style.addButton}>
            <Icon color="white" type="font-awesome" name="plus" />
            <Text
              style={{
                color: "white",
                marginLeft: 10,
              }}
            >
              Add Item
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {showModal && (
        <ModalITem
          showModal={showModal}
          setShowModal={setShowModal}
          projectId={project._id}
        />
      )}
    </>
  );
}

const style = StyleSheet.create({
  addButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    bottom: 0,
    marginBottom: 30,
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#003049",
    padding: 10,
    width: "100%",
    borderRadius: 20,
  },
});
