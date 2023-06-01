import { FontAwesome } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";
import { Text, View } from '../../components/Themed';
import { PhotoContext } from '../photoContext';
import * as Sharing from 'expo-sharing';

export default function TabTwoScreen() {

  type PhotoType = {
    uri: string;
    latitude: number;
    longitude: number;
  };

  const { photos } = useContext(PhotoContext);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} >
      {photos.map((photo: PhotoType) => {
        return (<Marker coordinate={{ latitude: photo.latitude, longitude: photo.longitude }}>
        <FontAwesome
              name="map-marker"
              size={25}
              color={'red'}
            />
          <Callout style={styles.callout}>
          <Text>Longitude : {photo.longitude}</Text>
          <Text >Latitude : {photo.latitude}</Text>
          <Text>
              <Image source={{ uri: photo.uri }} style={{ width: 75, height: 50 }} />
          </Text>        
        </Callout>
      </Marker>);   
      })}
        <Marker coordinate={{ latitude: 43, longitude: 3 }}>
          <FontAwesome
            name="map-marker"
            size={25}
            color={'red'}
          />
          <Callout style={styles.callout}>
            <Text>Longitude : {43}</Text>
            <Text >Latitude : {3}</Text>
            <Text>
                <View style={{ height: 75, width: 50, backgroundColor: 'black'}}/>
            </Text>     
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  callout: {
    width: 500,
  }
});
