
import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet,
  Text, 
  View, 
  Image
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Dimensions from 'Dimensions';

import FormScreen from './src/components/FormScreen'
import HomeScreen from './src/components/HomeScreen'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Registration: FormScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "screen"
  }
);

export default createAppContainer(AppNavigator);

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2da1d2',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo:{

  }
});
