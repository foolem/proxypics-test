import { call, put, select } from 'redux-saga/effects';
import PhotoActions from '../redux/photoRedux';
import { CredentialsSelectors } from '../redux/credentialsRedux';
import { RNS3 } from 'react-native-aws3';

export function* getPhotos(api, data) {
  const response = yield call(api.getPhotos, data.data);

  if (response.ok) {
    yield put(PhotoActions.photosSuccess(response.data));
  } else {
    yield put(PhotoActions.photosFailure());
  }
}

export function* createPhoto(api, data) {
  const credentials = yield select(CredentialsSelectors.selectCredentials);

  const file = {
    uri: data.data.uri,
    name: new Date().toISOString() + '.png',
    type: data.data.type,
  };

  const options = {
    bucket: credentials.bucket,
    region: credentials.region,
    accessKey: credentials.accessKey,
    secretKey: credentials.secretKey,
    successActionStatus: 201,
  };

  let s3Success = false;
  let location = '';

  yield RNS3.put(file, options).then((s3Response) => {
    if (s3Response.status === 201) {
      s3Success = true;
      location = s3Response.body.postResponse.location;
    }
  });

  if (s3Success) {
    const response = yield call(api.createPhoto, {
      orderId: data.data.orderId,
      url: location,
    });

    if (response.ok) {
      yield put(PhotoActions.createPhotoSuccess(response.data));
    } else {
      yield put(PhotoActions.createPhotoFailure());
    }
  } else {
    yield put(PhotoActions.createPhotoFailure());
  }
}
