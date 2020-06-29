import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './styles';

export default function StateFilters({ data, setActiveState }) {
  return (
    <View style={styles.states}>
      {data.map((item, i) => (
        <TouchableOpacity key={i} onPress={() => setActiveState(item.value)}>
          <View style={item.active ? styles.stateActive : styles.stateInactive}>
            <Text
              style={
                item.active ? styles.stateTextActive : styles.stateTextInactive
              }>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
