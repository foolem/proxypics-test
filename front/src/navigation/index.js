import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { Colors } from '../themes';

import OrdersScreen from '../containers/orders';
import OrderScreen from '../containers/order';
import NewOrderScreen from '../containers/newOrder';
import NewOrderAddressScreen from '../containers/newOrderAddress';

const OrdersStack = createStackNavigator();

export default function Container() {
  return (
    <NavigationContainer>
      <OrdersStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.title,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <OrdersStack.Screen
          name="Orders"
          component={OrdersScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                icon="plus"
                color={Colors.white}
                size={30}
                onPress={() => navigation.navigate('New Order')}
              />
            ),
          })}
        />
        <OrdersStack.Screen
          name="Order"
          component={OrderScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                icon="plus"
                color={Colors.white}
                size={30}
                onPress={() => navigation.navigate('New Order')}
              />
            ),
          })}
        />
        <OrdersStack.Screen name="New Order" component={NewOrderScreen} />
        <OrdersStack.Screen
          name="New Order Address"
          component={NewOrderAddressScreen}
        />
      </OrdersStack.Navigator>
    </NavigationContainer>
  );
}
