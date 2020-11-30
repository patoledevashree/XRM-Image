import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {getAllFeatures} from '../redux/action/FeatureAction';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

function Home(props) {
  useEffect(() => {
    props.getAllFeatures();
  }, []);

  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <View style={{...styles.cardWrapper, marginTop: 10}}>
          <View style={{...styles.card, height: 400}}>
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
          <View style={{...styles.card, paddingBottom: 20}}>
            <View style={{paddingLeft: 30, paddingTop: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Images</Text>
            </View>
            <TouchableOpacity>
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
            <TouchableOpacity>
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
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    features: state.featureReducer.features,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllFeatures: () => dispatch(getAllFeatures()),
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
  },
  button: {
    width: 300,
    height: 50,
    // borderWidth: 1,
    shadowColor: '#777',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 35,
    marginTop: 25,
    backgroundColor: 'crimson',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
