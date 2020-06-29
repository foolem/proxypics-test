import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, FlatList } from 'react-native';

import OrderActions from '../../redux/orderRedux';
import CredentialsActions from '../../redux/credentialsRedux';
import StateFilters from '../../components/stateFilters';
import OtherFilters from '../../components/otherFilters';
import Order from '../../components/order';
import styles from './styles';

export default function OrdersScreen({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(({ order }) => order);
  const states = [
    {
      name: 'In Progress',
      value: 'pending',
      active: state.meta.state === 'pending',
    },
    {
      name: 'Completed',
      value: 'completed',
      active: state.meta.state === 'completed',
    },
  ];

  useEffect(() => {
    dispatch(OrderActions.ordersRequest());
    dispatch(CredentialsActions.credentialsRequest());
  }, []);

  useEffect(() => {
    dispatch(OrderActions.ordersRequest());
  }, [state.meta]);

  return (
    <SafeAreaView style={styles.container}>
      <StateFilters
        data={states}
        setActiveState={(data) =>
          dispatch(OrderActions.setMeta({ ...state.meta, state: data }))
        }
      />

      <OtherFilters
        setMeta={(data) =>
          dispatch(OrderActions.setMeta({ ...state.meta, ...data }))
        }
      />

      <FlatList
        style={styles.listContainer}
        data={state.orders}
        renderItem={({ item }) => (
          <Order
            data={item}
            onPress={() => navigation.navigate('Order', item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={() => dispatch(OrderActions.ordersRequest())}
        refreshing={state.fetching}
      />
    </SafeAreaView>
  );
}
