import React, { useState } from "react";
import axios from 'axios'
import {
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { fecthApi } from "../store/action/ProjectAct";

export default function ModalAdd({ modal, showModal }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [trip, setTrip] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleSubmit = () => {
    const newTrip = {
      tripName : trip,
      dueDate: date
    }
    console.log(newTrip)
    axios.post('http://192.168.1.17:3000/trip',newTrip)
    .then(()=>{
      console.log('asss')
      dispatch(fecthApi())
      showModal(!modal)
    })
    .catch(err=>{
      console.log('aaa')
      console.log(err)
    })
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
      }}
    >
      {modal && (
        <View style={styles.modal}>
          <View style={styles.input}>
            <View style={{ flexDirection: "row-reverse" }}>
              <Icon
                iconStyle={{
                  margin: 10,
                }}
                onPress={() => showModal(!modal)}
                name="backspace"
                type="material"
              />
            </View>
            <Text style={{ fontSize: 30, marginBottom: 30 }}>ADD NEW TRIP</Text>
            <Input
              containerStyle={{ marginBottom: 10 }}
              label="Trip Name"
              value={trip}
              inputStyle={{ fontSize: 15 }}
              onChangeText={(text) => setTrip(text)}
            />
            <View style={{ flexDirection: "row" }}>
              <Input
                disabled
                containerStyle={{ marginBottom: 10, width: "80%" }}
                label="Due Date"
                value={date.toDateString()}
                inputStyle={{ fontSize: 15 }}
              />
              <Icon
                raised
                name="event"
                iconStyle={{
                  color: "grey",
                }}
                type="material"
                onPress={showDatepicker}
              />
            </View>
            <Button
              icon={
                <Icon
                  name="done"
                  type="material"
                  iconStyle={{
                    marginRight: 10,
                    color: "white",
                  }}
                />
              }
              onPress={() => handleSubmit()}
              title="add"
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    zIndex: 5,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 20,
  },
  modal: {
    backgroundColor: "rgba(146, 143, 139, 0.39)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    height: "70%",
    width: "90%",
  },
});
