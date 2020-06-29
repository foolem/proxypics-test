import { createReducer, createActions } from 'reduxsauce';
import produce from 'immer';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  photosRequest: ['data'],
  photosSuccess: ['data'],
  photosFailure: ['data'],
  createPhotoRequest: ['data'],
  createPhotoSuccess: ['data'],
  createPhotoFailure: ['data'],
});

export const PhotoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  photos: [],
  errors: {},
  fetching: false,
  uploading: false,
};

/* ------------- Selectors ------------- */

export const PhotosSelectors = {
  selectPhoto: (state) => state.photo,
};

/* ------------- Reducers ------------- */

export const photosRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const photosSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.photos = data;
  });

export const photosFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.errors = data;
  });

export const createPhotoRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.uploading = true;
  });

export const createPhotoSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.uploading = false;
    draft.photos = [...state.photos, data];
  });

export const createPhotoFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.uploading = false;
    draft.errors = data;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PHOTOS_REQUEST]: photosRequest,
  [Types.PHOTOS_SUCCESS]: photosSuccess,
  [Types.PHOTOS_FAILURE]: photosFailure,
  [Types.CREATE_PHOTO_REQUEST]: createPhotoRequest,
  [Types.CREATE_PHOTO_SUCCESS]: createPhotoSuccess,
  [Types.CREATE_PHOTO_FAILURE]: createPhotoFailure,
});
