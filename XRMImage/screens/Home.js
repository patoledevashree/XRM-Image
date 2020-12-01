import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getAllFeatures, UpdateVinNumber} from '../redux/action/FeatureAction';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {baseURL} from '../shared/config.js';
import {getVehicleInfo, submitForm} from '../shared/ApiEndpoints';
import Toast from 'react-native-simple-toast';
import {RNCamera} from 'react-native-camera';

function Home(props) {
  useEffect(() => {
    props.getAllFeatures();
  }, []);

  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [scan, setScan] = useState(false);
  const [isDisabled, setDisable] = useState(true);

  const handleSearch = () => {
    console.log('seacrch');
    console.log('query', query.length);
    let vinNumber = '';
    let stockNumber = '';
    if (query.length === 17) {
      vinNumber = query;
    } else {
      stockNumber = query;
    }
    setLoading(true);
    axios
      .get(`${baseURL}/${getVehicleInfo}`, {
        params: {
          vin: vinNumber,
          stockNumber: stockNumber,
        },
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((response) => {
        console.log('response', response);
        setResult(response.data.message);
        let vin = response.data.message.VIN;
        console.log('vin', vin);
        props.UpdateVinNumber(vin);
        setDisable(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err.response);
        Toast.show(err.response.data.message);
        setLoading(false);
      });
  };

  const submitform = () => {
    axios
      .post(`${baseURL}/${submitForm}/${props.vin}`, props.featureList, {
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((response) => {
        console.log('response', response);
      })
      .catch((err) => {
        console.log('err', err.response);
      });
  };
  const onSuccess = (e) => {
    console.log('success', e);
  };
  return (
    <View>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View style={styles.search}>
            <View>
              <TextInput
                style={{width: 200}}
                placeholder="Search By Vin No./Stock No."
                value={query}
                onChangeText={(val) => {
                  setQuery(val);
                }}
              />
            </View>
            <View>
              <FontAwesome
                name="search"
                size={25}
                color="#777"
                style={{position: 'relative', top: 10, marginLeft: 35}}
                onPress={() => {
                  handleSearch();
                }}
              />
            </View>
          </View>
          <View style={{marginLeft: 10}}>
            <FontAwesome
              name="qrcode"
              size={30}
              color={'crimson'}
              onPress={() => {
                console.log('qr code');
                console.log(scan);
                setScan(true);
              }}
            />
          </View>
        </View>
        {isLoading === true ? (
          <View style={{justifyContent: 'center', marginVertical: 20}}>
            <ActivityIndicator size={'large'} color={'crimson'} />
          </View>
        ) : (
          <View>
            {result._id ? (
              <View style={{...styles.cardWrapper, marginTop: 10}}>
                <View
                  style={{
                    ...styles.card,
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Year
                      </Text>
                      <Text>{result.Year}</Text>
                    </View>
                    <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Make
                      </Text>
                      <Text>{result.Make}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Model
                      </Text>
                      <Text>{result.Model}</Text>
                    </View>
                    <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Colour
                      </Text>
                      <Text>{result.ExteriorColor.Description}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        )}
        <View style={{...styles.cardWrapper, marginTop: 10}}>
          <View style={{...styles.card, height: 400, alignItems: 'center'}}>
            <View style={{paddingLeft: 30, paddingTop: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Features</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InteriorFeatures');
              }}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    paddingTop: 10,
                  }}>
                  Interior Features
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExteriorFeatures');
              }}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    paddingTop: 10,
                  }}>
                  Exterior Features
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Media');
              }}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    paddingTop: 10,
                  }}>
                  Media
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    paddingTop: 10,
                  }}>
                  Others
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{...styles.cardWrapper, marginTop: 10}}>
          <View
            style={{...styles.card, paddingBottom: 20, alignItems: 'center'}}>
            <View style={{paddingLeft: 30, paddingTop: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Images</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InteriorImages');
              }}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    paddingTop: 10,
                  }}>
                  Interior Images
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExteriorImages');
              }}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    paddingTop: 10,
                  }}>
                  Exterior Images
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={() => {
            submitform();
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 150,
                height: 40,
                borderRadius: 3,
                backgroundColor: isDisabled ? '#607D8B' : 'crimson',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  marginTop: 5,
                  fontSize: 18,
                }}>
                Submit
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      {console.log(scan)}
      {scan == true ? (
        <RNCamera
          // ref={(ref) => (this.camera = ref)}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          onBarCodeRead={onSuccess}
          style={{height: '100%', width: '100%'}}></RNCamera>
      ) : null}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    features: state.featureReducer.features,
    vin: state.featureReducer.vin,
    featureList: state.featureReducer.featureList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllFeatures: () => dispatch(getAllFeatures()),
    UpdateVinNumber: (vin) => dispatch(UpdateVinNumber(vin)),
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
  button: {
    width: 270,
    height: 50,
    // borderWidth: 1,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
    // marginLeft: 35,
    marginTop: 25,
    backgroundColor: 'crimson',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 10,
    // borderWidth: 1,
    height: 50,
    width: 300,
    paddingLeft: 10,
    flexDirection: 'row',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
