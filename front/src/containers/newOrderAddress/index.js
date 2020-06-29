import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, View } from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './styles';
import { Colors } from '../../themes';

export default function NewOrderAddressScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const credentials = useSelector(({ credentials }) => credentials);

  const params = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.upperSection}>
          <View style={styles.iconContainer}>
            <IconM name="map-marker-outline" size={20} color={Colors.primary} />
          </View>
          <GooglePlacesAutocomplete
            placeholder="Search for a place"
            autoFocus
            fetchDetails
            onPress={(data, details) => {
              params.setState((state) => ({
                ...state,
                address: details.formatted_address,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              }));
              navigation.goBack();
            }}
            query={{
              key: credentials.googleMapsKey,
              language: 'en',
            }}
            styles={{
              textInputContainer: styles.textInputContainer,
              textInput: styles.textInput,
              predefinedPlacesDescription: styles.predefinedPlacesDescription,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
