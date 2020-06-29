import { createReducer, createActions } from 'reduxsauce';
import produce from 'immer';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ordersRequest: ['data'],
  ordersSuccess: ['data'],
  ordersFailure: ['data'],
  createOrderRequest: ['data'],
  createOrderSuccess: ['data'],
  createOrderFailure: ['data'],
  setMeta: ['data'],
});

export const OrderTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  orders: [],
  newOrder: {
    address: '',
    latitude: '',
    longitude: '',
    status: 'pending',
  },
  errors: {},
  meta: {
    created_at: '',
    address: '',
    state: 'pending',
  },
  fetching: false,
};

/* ------------- Selectors ------------- */

export const OrderSelectors = {
  selectOrder: (state) => state.order,
};

/* ------------- Reducers ------------- */

export const ordersRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const ordersSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.orders = data;
  });

export const ordersFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.errors = data;
  });

export const createOrderRequest = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = true;
  });

export const createOrderSuccess = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.newOrder = data;
  });

export const createOrderFailure = (state, { data }) =>
  produce(state, (draft) => {
    draft.fetching = false;
    draft.errors = data;
  });

export const setMeta = (state, { data }) =>
  produce(state, (draft) => {
    draft.meta = data;
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDERS_REQUEST]: ordersRequest,
  [Types.ORDERS_SUCCESS]: ordersSuccess,
  [Types.ORDERS_FAILURE]: ordersFailure,
  [Types.CREATE_ORDER_REQUEST]: createOrderRequest,
  [Types.CREATE_ORDER_SUCCESS]: createOrderSuccess,
  [Types.CREATE_ORDER_FAILURE]: createOrderFailure,
  [Types.SET_META]: setMeta,
});
