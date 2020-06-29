import { call, put } from 'redux-saga/effects';
import CredentialsActions from '../redux/credentialsRedux';

export function* getCredentials(api) {
  const response = yield call(api.getCredentials);

  if (response.ok) {
    yield put(CredentialsActions.credentialsSuccess(response.data));
  } else {
    yield put(CredentialsActions.credentialsFailure());
  }
}
