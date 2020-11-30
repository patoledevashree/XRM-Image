import {
  GET_FEATURES_REQUEST,
  GET_FEATURES_SUCCESS,
  GET_FEATURES_FALIURE,
  UPDATE_FEATURE_LIST,
} from './types';
import axios from 'axios';
import {baseURL} from '../../shared/config';
import {getFeatures} from '../../shared/ApiEndpoints';

export const getFeaturesRequest = () => {
  return {
    type: GET_FEATURES_REQUEST,
  };
};
export const getFeaturesSuccess = (data) => {
  return {
    type: GET_FEATURES_SUCCESS,
    payload: data,
  };
};
export const getFeaturesFaliure = (error) => {
  return {
    type: GET_FEATURES_SUCCESS,
    payload: error,
  };
};

export const getAllFeatures = () => {
  return (dispatch) => {
    dispatch(getFeaturesRequest());
    axios
      .get(`${baseURL}/${getFeatures}`, {
        headers: {'x-api-key': 'MV7PnHh2mC48n9n3oqKW3911T6Ch6gmd7xQJ0JQ6'},
      })
      .then((response) => {
        console.log('response', response);
        const data = response.data.message;
        dispatch(getFeaturesSuccess(data));
      })
      .catch((error) => {
        console.log('error', error.response);
        dispatch(getFeaturesFaliure(error));
      });
  };
};

export const UpdateFeatureList = (id) => {
  console.log('action');
  return {
    type: UPDATE_FEATURE_LIST,
    Id: id,
  };
};
