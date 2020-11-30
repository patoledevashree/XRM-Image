import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import LOGO from '../../assests/images/logo.svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import Features from '../Features/Features';
function TopBar() {
  return (
    <View>
      <View style={{backgroundColor: 'red', flex: 1, flexDirection: 'row'}}>
        {/* <LOGO height={100} width={100} style={{marginLeft: 20}} /> */}
        <FontAwesome
          name="search"
          size={25}
          style={{position: 'absolute', top: 30, right: 20}}
        />
      </View>
      {/* <Features /> */}
    </View>
  );
}

export default TopBar;
