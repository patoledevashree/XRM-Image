import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getAllFeatures, UpdateVinNumber} from '../redux/action/FeatureAction';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {baseURL, vinGateWay} from '../shared/config.js';
import {
  getVehicleInfo,
  submitForm,
  getVehicleVin,
  decodeVinValues,
} from '../shared/ApiEndpoints';
import Toast from 'react-native-simple-toast';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

function Home(props) {
  useEffect(() => {
    props.getAllFeatures();
  }, []);
  // const Camera = null
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [scan, setScan] = useState(false);
  const [isDisabled, setDisable] = useState(true);
  const [torchOn, setTorch] = useState(false);
  const [camera, setCamera] = useState({
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.auto,
  });
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [inPbs, setPbs] = useState(false);

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
    console.log(props.vin);
    axios
      .post(
        `${baseURL}/${submitForm}/${props.vin}`,
        {
          features: props.featureList,
        },
        {
          headers: {
            'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6',
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('response', response);
        Toast.show('Data Submitted Successfully');
      })
      .catch((err) => {
        console.log('err', err.response);
        Toast.show(err.response.data.message);
      });
  };
  const onSuccess = (e) => {
    console.log('success', e);
    let file = e;
    console.log('file', file);
    setScan(false);

    // let imageFormData = new FormData();
    // imageFormData.append('file', file);
    // console.log('form', imageFormData);
    // fetch(
    //   'https://www.recognition.ws/vinbarcode/v1?accessCode=868a5748-6bc2-40be-bed4-fb1b963ba5b5&saveimage=TRUE&youridentifier=demo&vindecode=TRUE',
    //   {
    //     method: 'post',
    //     body: imageFormData,
    //     headers: {'Content-Type': 'multipart/form-data'},
    //   },
    // )
    //   .then(function (response) {
    //     console.log('response', response);
    //     return response.json();
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
    // axios
    //   .post(
    //     `${vinURL}/${vinQuery}?accessCode=868a5748-6bc2-40be-bed4-fb1b963ba5b5&saveimage=TRUE&youridentifier=demo&vindecode=TRUE`,
    //     {imageFormData},
    //     {
    //       headers: {'Content-Type': 'multipart/form-data'},
    //     },
    //   )
    //   .then((res) => {
    //     console.log('res', res);
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
    axios
      .get(`${baseURL}/${getVehicleVin}/${file[0].data}`, {
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((res) => {
        console.log('response', res);

        setPbs(true);
      })
      .catch((err) => {
        console.log('err', err.response);
        setPbs(false);
        getVehicleInfoFromVinApi(file[0].data);
      });
  };
  const getVehicleInfoFromVinApi = (vinNumber) => {
    console.log('vin', vinNumber);
    setLoading(true);
    axios
      .get(`${vinGateWay}/${decodeVinValues}/${vinNumber}?format=json`)
      .then((res) => {
        console.log('response', res);
        // Toast.show('BarCode Detected success')
        if (res.data.Results.length) {
          let tempVehicleInfo = {
            Year: res.data.Results[0].ModelYear || '-',
            Make: res.data.Results[0].Make || '-',
            Model: res.data.Results[0].Model || '-',
            Trim: res.data.Results[0].Trim || '-',
            // ExteriorColor: {
            //   Description: res.data.Results[0].Colour || '-',
            // },
          };
          let vin = res.data.Results[0].VIN;
          props.UpdateVinNumber(vin);
          setDisable(false);
          setVehicleInfo(tempVehicleInfo);
        } else {
          setVehicleInfo({});
          Toast.show('Unable to fetch details');
        }
        setLoading(false);
      });
    // .catch((err) => {
    //   console.log('err', err.response);
    // });
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
            {console.log('vehicle', vehicleInfo)}
            {vehicleInfo.Year ? (
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
                      <Text>{vehicleInfo.Year}</Text>
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
                      <Text>{vehicleInfo.Make}</Text>
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
                      <Text>{vehicleInfo.Model}</Text>
                    </View>
                    {/* <View
                      style={{
                        width: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Colour
                      </Text>
                      <Text>{vehicleInfo.ExteriorColor.Description}</Text>
                    </View> */}
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
        <View>
          <RNCamera
            // ref={(ref) => (this.camera = ref)}
            defaultTouchToFocus
            type={RNCamera.Constants.Type.back}
            flashMode={camera.flashMode}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={
              'We need your permission to use your camera phone'
            }
            type={camera.type}
            // onBarCodeRead={onSuccess}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log('barcodes', barcodes);
              onSuccess(barcodes);
            }}
            googleVisionBarcodeMode={
              RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode
                .ALTERNATE
            }
            camera1ScanMode="boost"
            onFocusChanged={(e) => {
              console.log('focus', e);
            }}
            onZoomChanged={(e) => {
              console.log('zoom', e);
            }}
            focusDepth={0.9}
            style={{height: '100%', width: '100%'}}>
            <BarcodeMask
              height={'70%'}
              width={'90%'}
              showAnimatedLine={true}
              backgroundColor={'rgba(0, 0, 0, 0)'}
            />
          </RNCamera>
          <View style={[styles.overlay, styles.topOverlay]}>
            <Text style={styles.scanScreenMessage}>
              Please scan the barcode.
            </Text>
          </View>
          <View style={styles.overlay}>
            <Button
              onPress={() => {
                console.log('scan clicked');
              }}
              style={styles.enterBarcodeManualButton}
              title="Enter Barcode"
            />
          </View>
        </View>
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
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // bottomOverlay: {
  //   bottom: 0,
  //   backgroundColor: 'rgba(0,0,0,0.4)',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
