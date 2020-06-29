import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Image, ScrollView } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import PhotoActions from '../../redux/photoRedux';
import AddPhoto from '../../components/addPhoto';

import styles from './styles';
import { Colors, Images } from '../../themes';

export default function OrderScreen({ route }) {
  const dispatch = useDispatch();
  const photo = useSelector(({ photo }) => photo);
  const data = route.params;

  useEffect(() => {
    dispatch(PhotoActions.photosRequest(data.id));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.upperSection}>
            <View style={styles.iconContainer}>
              <IconM
                name="map-marker-outline"
                size={20}
                color={Colors.primary}
              />
            </View>
            <View>
              <Text style={styles.address}>{data.address}</Text>
            </View>
          </View>
          <View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: parseFloat(data.latitude),
                longitude: parseFloat(data.longitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                icon={
                  <IconM
                    name="map-marker-outline"
                    size={20}
                    color={Colors.primary}
                  />
                }
                coordinate={{
                  latitude: parseFloat(data.latitude),
                  longitude: parseFloat(data.longitude),
                }}></Marker>
            </MapView>
          </View>
        </View>

        {photo.fetching && (
          <View style={styles.fetchingContainer}>
            <ActivityIndicator animating color={Colors.primary} />
          </View>
        )}

        {!photo.fetching && (
          <View style={styles.section}>
            <View style={styles.upperSection}>
              <View style={styles.iconContainer}>
                <IconM name="image-filter" size={20} color={Colors.primary} />
              </View>
              <View>
                <Text>Photos</Text>
              </View>
            </View>
            <View>
              {photo.photos.map((item, i) => (
                <View key={i}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.resource_url }}
                  />
                </View>
              ))}
            </View>
          </View>
        )}

        {data.state === 'pending' && (
          <AddPhoto
            onSuccess={(res) =>
              dispatch(
                PhotoActions.createPhotoRequest({
                  uri: res.uri,
                  type: res.type,
                  orderId: data.id,
                }),
              )
            }
            fetching={photo.uploading}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
