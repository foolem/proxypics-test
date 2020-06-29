import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import IconF from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import styles from './styles';
import { Colors } from '../../themes';

export default function AddPhoto({ onSuccess, fetching }) {
  handleImagePicker = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select or take a photo',
        quality: 0.1,
        noData: true,
        mediaType: 'photo',
      },
      (response) => {
        if (!response.error) {
          onSuccess({ uri: response.uri, type: response.type });
        }
      },
    );
  };

  return (
    <TouchableOpacity onPress={() => (!fetching ? handleImagePicker() : {})}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Add photo</Text>
        </View>
        <View style={styles.iconContainer}>
          {fetching && <ActivityIndicator animating color={Colors.primary} />}
          {!fetching && <IconF name="plus" size={20} color={Colors.primary} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}
