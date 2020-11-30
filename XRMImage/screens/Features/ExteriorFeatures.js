import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {UpdateFeatureList} from '../../redux/action/FeatureAction';

function ExteriorFeatures(props) {
  const list = props.featureList;

  return (
    <View>
      {props.features.length !== 0
        ? props.features.map((item) => {
            return (
              <View key={item._id}>
                {item.isForImage && item.category === 'Exterior' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      marginTop: 20,
                    }}>
                    <CheckBox
                      value={list.includes(item.name)}
                      tintColors={{true: 'crimson', false: 'black'}}
                      style={{width: 50}}
                      onValueChange={(val) => {
                        props.UpdateFeatureList(item._id);
                      }}
                    />
                    <Text style={{fontSize: 20}}>{item.name}</Text>
                  </View>
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    features: state.featureReducer.features,
    featureList: state.featureReducer.featureList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateFeatureList: (id) => dispatch(UpdateFeatureList(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExteriorFeatures);
