import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {baseURL, baseUrl} from '../../shared/config';
import {submitImage} from '../../shared/ApiEndpoints';
import {connect} from 'react-redux';
import Toast from 'react-native-simple-toast';

function InteriorImages(props) {
  const [dash_view_from_rear_seat, setdash_view_from_rear_seat] = useState('');
  const [sun_roof_if_applicable, setsun_roof_if_applicable] = useState('');
  const [back_up_camera, setback_up_camera] = useState('');
  const [navigation_system, setnavigation_system] = useState('');

  const handelPhoto = (data) => {
    console.log('photo');
    const options = {
      title: 'Select Image',

      allowsEditing: true,
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.showImagePicker(options, (response) => {
      // ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response);
      if (response.uri) {
        console.log(response);
        if (data === 'dash_view_from_rear_seat') {
          setdash_view_from_rear_seat(response);
        }
        if (data === 'sun_roof_if_applicable') {
          setsun_roof_if_applicable(response);
        }
        if (data === 'back_up_camera') {
          setback_up_camera(response);
        }
        if (data === 'navigation_system') {
          setnavigation_system(response);
        }
        uploadImage(data, response);
      }
    });
  };
  // const handelPhoto = (data) => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //     showCropGuidelines: true,
  //     mediaType: 'photo',
  //     includeBase64: true,
  //   }).then((image) => {
  //     let str = image.path.split('/');
  //     console.log(image);
  //     console.log(str);
  //     uploadImage(data, image);
  //   });
  //   // ImagePicker.openCropper({
  //   //   path,
  //   //   width: 300,
  //   //   height: 350,
  //   //   cropping: true,
  //   //   includeBase64: true,
  //   //   freeStyleCropEnabled: true,
  //   //   disableCropperColorSetters: false,
  //   //   enableRotationGesture: true,
  //   //   mediaType: 'photo',
  //   //   showCropGuidelines: true,

  //   //   compressImageQuality: 1,
  //   // }).then((image) => {
  //   //   console.log(image);
  //   // });
  // };

  const uploadImage = (data, response) => {
    console.log('data', data);
    console.log('api called', props.vin);
    var formData = new FormData();
    console.log('response', response);
    // let str = response.path.split('/');
    // console.log(str);
    // let fname = str[str.length - 1];
    const image = 'data:image/jpeg;base64,' + response.data;
    let obj = {[data]: response.fileName};
    console.log('obj', obj);
    // formData.append(obj);
    formData.append([data], {
      uri: response.uri,
      name: response.fileName,
      type: 'image/jpeg',
    });
    console.log(formData);
    if (props.vin === '') {
      Toast.show('Please enter Vin Number');
    } else {
      axios
        .put(`${baseURL}/${submitImage}/${props.vin}`, formData, {
          headers: {
            'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6',
            'Content-Type': 'multipart/form-data;',
          },
        })
        .then((response) => {
          console.log('response', response);
          Toast.show('Image Saved!!');
        })
        .catch((err) => {
          console.log('err', err.response.data);
        });
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={{...styles.cardWrapper, marginTop: 5}}>
          <View style={{...styles.card, height: 150, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                handelPhoto('dash_view_from_rear_seat');
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
                  Dash View From Rear Seat
                </Text>
                {!dash_view_from_rear_seat ? (
                  <Image
                    source={require('../../assests/images/dash_view_from_rear_seat.png')}
                    style={{height: 80, width: 150}}
                  />
                ) : (
                  <Image
                    source={{uri: dash_view_from_rear_seat.uri}}
                    style={{height: 80, width: 150}}
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
                handelPhoto('sun_roof_if_applicable');
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
                  Sun Roof (if applicable)
                </Text>
                {!sun_roof_if_applicable ? (
                  <Image
                    source={require('../../assests/images/sun_roof_if_applicable.png')}
                    style={{height: 70, width: 150, marginTop: 10}}
                  />
                ) : (
                  <Image
                    source={{uri: dash_view_from_rear_seat.uri}}
                    style={{height: 70, width: 150, marginTop: 10}}
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
                handelPhoto('back_up_camera');
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
                  Back Up camera (if applicable)
                </Text>
                {!back_up_camera ? (
                  <Image
                    source={require('../../assests/images/back_up_camera.png')}
                    style={{height: 80, width: 100, marginTop: 10}}
                  />
                ) : (
                  <Image
                    source={{uri: back_up_camera.uri}}
                    style={{height: 80, width: 100, marginTop: 10}}
                  />
                )}
                <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 5}}>
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
                handelPhoto('navigation_system');
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 10}}>
                  Navigation System (if applicable)
                </Text>
                {!navigation_system ? (
                  <Image
                    source={require('../../assests/images/navigation_system.png')}
                    style={{height: 50, width: 50, marginTop: 20}}
                  />
                ) : (
                  <Image
                    source={{uri: navigation_system.uri}}
                    style={{height: 50, width: 50, marginTop: 20}}
                  />
                )}
                <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
                  Click Here to Upload
                </Text>
              </View>
            </TouchableOpacity>
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
export default connect(mapStateToProps)(InteriorImages);
