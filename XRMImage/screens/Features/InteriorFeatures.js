import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {UpdateFeatureList} from '../../redux/action/FeatureAction';
import CheckBox from '@react-native-community/checkbox';

function InteriorFeatures(props) {
  console.log('list', props.featureList);
  const list = props.featureList;
  return (
    <View>
      {props.features.length !== 0
        ? props.features.map((item) => {
            return (
              <View key={item._id}>
                {item.isForImage && item.category === 'Interior' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      marginLeft: 20,
                    }}>
                    <CheckBox
                      value={list.includes(item._id)}
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
export default connect(mapStateToProps, mapDispatchToProps)(InteriorFeatures);
