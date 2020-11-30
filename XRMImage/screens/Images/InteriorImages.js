import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

function InteriorImages() {
  return (
    <View>
      <ScrollView>
        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              Dash View From Rear Seat
            </Text>
            <Image
              source={require('../../assests/images/dash_view_from_rear_seat.png')}
              style={{height: 100, width: 150}}
            />
          </View>
        </View>
        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              Sun Roof (if applicable)
            </Text>
            <Image
              source={require('../../assests/images/sun_roof_if_applicable.png')}
              style={{height: 80, width: 150, marginTop: 10}}
            />
          </View>
        </View>

        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              Back Up camera (if applicable)
            </Text>
            <Image
              source={require('../../assests/images/back_up_camera.png')}
              style={{height: 80, width: 100, marginTop: 10}}
            />
          </View>
        </View>

        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              Navigation System (if applicable)
            </Text>
            <Image
              source={require('../../assests/images/navigation_system.png')}
              style={{height: 50, width: 50, marginTop: 20}}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '90%',
    alignSelf: 'center',
    // marginTop: 20,
  },
  card: {
    marginTop: 6,
    // height: 300,
    marginBottom: 20,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 5,
    // alignItems: 'center',
  },
});
export default InteriorImages;
