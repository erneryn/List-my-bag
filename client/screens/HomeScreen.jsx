import React, { useEffect, useState } from "react";
import TripCard from "../components/TripCard";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Constants from 'expo-constants'
import ModalAdd from '../components/ModalAdd'
import { Icon } from "react-native-elements";
import { fecthApi } from '../store/action/ProjectAct'

export default function HomeScreen({ navigation }) {
  const projects = useSelector(state => state.project);
  const [modal, showModal] = useState(false);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fecthApi())
  },[])
  
 
  return (
    <>
    <View style={{ flex: 1}}>
      <View style={style.titleContainer}>
        <Text style={style.title}>LIST ALL TRIP</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      {
        projects.length == 0 ?
        <Text>Kosong</Text>
        : 
        projects.map((item,idx)=>
        // <TouchableOpacity
        // key={idx}
        // onPress={() => navigation.navigate("Project", { name: item })}
        // >
          <TripCard key={idx} project={item} navigation={navigation} />
        // </TouchableOpacity>
        )
      }
      </ScrollView>
     <Icon
        containerStyle={style.iconContainer}
        raised
        name="add"
        iconStyle={{
          color: "blue"
        }}
        type="material"
        onPress={() => showModal(!modal)}
      />
    {
      modal && 
    <ModalAdd modal={modal} showModal={showModal} />
    }
    </View>
    
      </>
  );
}

const style = StyleSheet.create({
  titleContainer: {
    paddingTop:Constants.statusBarHeight,
    height: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#f4511e",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    color: "white"
  },
  flatlist: {
    margin: 10,
    marginTop: -25
  },
  iconContainer: {
    zIndex: 5,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20
  }
  
});
