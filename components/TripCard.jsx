import React from 'react'
import {Text, View,StyleSheet,TouchableOpacity, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import { DeleteProjecct } from '../store/action/ProjectAct'
import { fecthApi } from '../store/action/ProjectAct'
import Axios from 'axios';

export default function TripCard({ project, navigation }){
    const dispatch = useDispatch()

    const confirmDelete = ()=>{
        Alert.alert(
            'Delete',
            'Are You Sure delete this project ?',
            [
              {text: 'Cancel'},
              {text: 'OK', onPress: () =>{
                Axios.delete(`http://192.168.1.17:3000/trip/${project._id}`)
                .then(()=> dispatch(fecthApi()))
              }},
            ],
            { cancelable: false }
          )
    }

    const leftAction = () =>{
        return(
            <View style={styles.leftAction}>
                <TouchableOpacity 
                style={styles.buttonLeft}
                onPress={confirmDelete}>
                 <Icon
                name="delete"
                iconStyle={{
                  color: "white",
                }}
                type="material"
              />
              <Text
              style={{color:'white'}}
              >delete</Text>
            </TouchableOpacity>
            </View>
        )
    }
    
    return(
        <Swipeable
        renderLeftActions={leftAction}
        >
        <View style={{
            margin:5,
            height:100,
            borderRadius:10,
            backgroundColor:'#003049',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("Project", { project })}
            // onPress={() => navigation.navigate("Demo", { project })}

        >
        <View>
        <Text style={{fontSize:18,color:'white', padding:10}}>{project.tripName}</Text>
        </View>
        <View>
        <Text style={{padding:10,color:'white' ,marginLeft:'auto'}}>{new Date(project.dueDate).toDateString()}</Text>
        </View>
        </TouchableOpacity>
        </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    leftAction:{
    backgroundColor:'red',
    width:'20%',
    marginRight:-15,
    marginTop:5,
    marginBottom:5
    },
    buttonLeft:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }

})