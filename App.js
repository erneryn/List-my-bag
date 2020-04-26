import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import { Provider } from 'react-redux'
import store from './store/index'
import ItemList from "./screens/ItemList";
import Demo from "./screens/Demo";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "#f4511e",
              borderColor: "black",
              borderBottomWidth:0
            },
            headerTintColor: "white"
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Project"
          component={ItemList}
          options={{
            title: ""
          }}
        />
        <Stack.Screen
        name="Demo"
        component={Demo}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
