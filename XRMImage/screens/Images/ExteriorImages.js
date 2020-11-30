import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {baseURL, baseUrl} from '../../shared/config';
import {submitForm} from '../../shared/ApiEndpoints';
import {connect} from 'react-redux';

function ExteriorImages(props) {
  const [photo, setPhoto] = useState('');
  const handelPhoto = (data) => {
    console.log('photo');
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        console.log(response);
        setPhoto(response);
        uploadImage(data, response);
      }
    });
  };
  const uploadImage = (data, response) => {
    console.log('data', data);
    console.log('api called', props.vin);
    var formData = new FormData();
    console.log('response', response);
    const image = 'data:image/jpeg;base64,' + response.data;
    formData.append(data.toString(), image);
    console.log(formData);

    axios
      .put(`${baseURL}/${submitForm}/${props.vin}`, formData, {
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((response) => {
        console.log('response', response);
      })
      .catch((err) => {
        console.log('err', err.response);
      });
  };
  return (
    <View>
      <ScrollView>
        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                handelPhoto('front_45_right');
              }}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
                  45 {'\u00b0'} Right Front
                </Text>
                {!photo.uri ? (
                  <Image
                    source={require('../../assests/images/front_right_45.png')}
                    style={{height: 50, width: 100, marginTop: 30}}
                  />
                ) : (
                  <Image
                    source={{uri: photo.uri}}
                    style={{height: 50, width: 100, marginTop: 20}}
                  />
                )}
                <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
                  Click Here to Upload
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                handelPhoto('rear_right_45');
              }}>
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
                  45 {'\u00b0'} Right Rear
                </Text>
                {!photo.uri ? (
                  <Image
                    source={require('../../assests/images/rear_right_45.png')}
                    style={{height: 50, width: 100, marginTop: 30}}
                  />
                ) : (
                  <Image
                    source={{uri: photo.uri}}
                    style={{height: 50, width: 100, marginTop: 30}}
                  />
                )}
                <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
                  Click Here to Upload
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              45 {'\u00b0'} Left Rear
            </Text>
            <Image
              source={require('../../assests/images/rear_left_45.png')}
              style={{height: 50, width: 100, marginTop: 30}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
              Click Here to Upload
            </Text>
          </View>
        </View>

        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              45 {'\u00b0'} Front Left
            </Text>
            <Image
              source={require('../../assests/images/front_left_45.png')}
              style={{height: 50, width: 100, marginTop: 30}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
              Click Here to Upload
            </Text>
          </View>
        </View>

        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              Full Driver Side View
            </Text>
            <Image
              source={require('../../assests/images/full_driver_side_view.png')}
              style={{height: 50, width: 100, marginTop: 30}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
              Click Here to Upload
            </Text>
          </View>
        </View>

        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
              Trunk
            </Text>
            <Image
              source={require('../../assests/images/trunk.png')}
              style={{width: 100, marginTop: 30, height: 60}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
              Click Here to Upload
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    vin: state.featureReducer.vin,
  };
};
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
export default connect(mapStateToProps)(ExteriorImages);
