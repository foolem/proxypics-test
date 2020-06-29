import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import IconF from 'react-native-vector-icons/Feather';

import styles from './styles';
import { Colors } from '../../themes';

export default function Order({ data, onPress }) {
  const createdAt = new Date(data.created_at);
  const formattedDate = `${createdAt.getMonth()}/${createdAt.getDate()}/${createdAt.getFullYear()}`;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.address}>{data.address}</Text>
            <Text>{formattedDate}</Text>
            <Text>{data.photos_number} photos</Text>
          </View>
        </View>
        <View>
          <IconF name="chevron-right" size={20} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
