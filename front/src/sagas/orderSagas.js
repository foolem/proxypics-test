import { call, put, select } from 'redux-saga/effects';
import OrderActions, { OrderSelectors } from '../redux/orderRedux';

export function* getOrders(api) {
  const order = yield select(OrderSelectors.selectOrder);
  const response = yield call(api.getOrders, order.meta);

  if (response.ok) {
    yield put(OrderActions.ordersSuccess(response.data));
  } else {
    yield put(OrderActions.ordersFailure());
  }
}

export function* createOrder(api, data) {
  const response = yield call(api.createOrder, data.data);

  if (response.ok) {
    yield put(OrderActions.createOrderSuccess(response.data));
  } else {
    yield put(OrderActions.createOrderFailure());
  }
}
