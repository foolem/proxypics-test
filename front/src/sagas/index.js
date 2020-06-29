import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';

/* ------------- Types ------------- */

import { OrderTypes } from '../redux/orderRedux';
import { PhotoTypes } from '../redux/photoRedux';
import { CredentialsTypes } from '../redux/credentialsRedux';

/* ------------- Sagas ------------- */

import { getOrders, createOrder } from './orderSagas';
import { getPhotos, createPhoto } from './photoSagas';
import { getCredentials } from './credentialsSagas';

/* ------------- API ------------- */

const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(OrderTypes.ORDERS_REQUEST, getOrders, api),
    takeLatest(OrderTypes.CREATE_ORDER_REQUEST, createOrder, api),
    takeLatest(PhotoTypes.PHOTOS_REQUEST, getPhotos, api),
    takeLatest(PhotoTypes.CREATE_PHOTO_REQUEST, createPhoto, api),
    takeLatest(CredentialsTypes.CREDENTIALS_REQUEST, getCredentials, api),
  ]);
}
