import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Image, ScrollView } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/Feather';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import PhotoActions from '../../redux/photoRedux';
import OrderActions from '../../redux/orderRedux';
import AddPhoto from '../../components/addPhoto';

import styles from './styles';
import { Colors, Images } from '../../themes';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NewOrderScreen({ navigation }) {
  const dispatch = useDispatch();
  const photo = useSelector(({ photo }) => photo);
  const newOrder = useSelector(({ order }) => order.newOrder);

  const [state, setState] = useState(newOrder);

  useEffect(() => {
    setState(newOrder);
  }, [newOrder]);

  useEffect(() => {
    dispatch(OrderActions.createOrderRequest(state));
  }, [state.latitude]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.upperSection}>
            {!state.latitude && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('New Order Address', {
                    setState,
                  })
                }>
                <View style={styles.row}>
                  <View style={styles.rowLeft}>
                    <View style={styles.iconContainer}>
                      <IconM
                        name="map-marker-outline"
                        size={20}
                        color={Colors.primary}
                      />
                    </View>
                    <View>
                      <Text style={styles.address}>Find address</Text>
                    </View>
                  </View>
                  <View>
                    <IconF
                      name="chevron-right"
                      size={20}
                      color={Colors.primary}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}

            {!!state.latitude && (
              <>
                <View style={styles.iconContainer}>
                  <IconM
                    name="map-marker-outline"
                    size={20}
                    color={Colors.primary}
                  />
                </View>
                <View>
                  <Text style={styles.address}>{state.address}</Text>
                </View>
              </>
            )}
          </View>
          <View>
            {!!state.latitude && (
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                  latitude: parseFloat(state.latitude),
                  longitude: parseFloat(state.longitude),
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
                    latitude: parseFloat(state.latitude),
                    longitude: parseFloat(state.longitude),
                  }}></Marker>
              </MapView>
            )}
            {!!!state.latitude && (
              <Image source={Images.chooseImage} style={styles.map} />
            )}
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

        {!!newOrder.id && newOrder.state === 'pending' && (
          <AddPhoto
            onSuccess={(res) =>
              dispatch(
                PhotoActions.createPhotoRequest({
                  uri: res.uri,
                  type: res.type,
                  orderId: newOrder.id,
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
