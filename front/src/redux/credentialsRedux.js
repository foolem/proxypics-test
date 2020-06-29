import { createReducer, createActions } from 'reduxsauce';
import produce from 'immer';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  credentialsRequest: ['data'],
  credentialsSuccess: ['data'],
  credentialsFailure: ['data'],
});

export const CredentialsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  bucket: '',
  region: '',
  accessKey: '',
  secretKey: '',
  googleMapsKey: '',
  errors: {},
  fetching: false,
};

/* ------------- Selectors ------------- */

export const CredentialsSelectors = {
  selectCredentials: (state) => state.credentials,
};

/* ------------- Reducers ------------- */

export const credentialsRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const credentialsSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.bucket = data.bucket;
    draft.region = data.region;
    draft.accessKey = data.access_key;
    draft.secretKey = data.secret_key;
    draft.googleMapsKey = data.google_maps_key;
  });

export const credentialsFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.errors = data;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREDENTIALS_REQUEST]: credentialsRequest,
  [Types.CREDENTIALS_SUCCESS]: credentialsSuccess,
  [Types.CREDENTIALS_FAILURE]: credentialsFailure,
});
