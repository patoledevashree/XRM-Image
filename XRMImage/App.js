import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './navigation/HomeStack';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    );
  }
}
