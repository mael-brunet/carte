import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useContext, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { View } from '../../components/Themed';
import { PhotoContext } from '../photoContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {

  const { photos, setPhotos } = useContext(PhotoContext);

  const getPhotos = async () => {
    const photoStorage = (await AsyncStorage.getItem("photos")) || "[]";
    const photos2 = JSON.parse(photoStorage);
    setPhotos(photos2);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    console.log("Updated photos:", photos);
  }, [photos]);
  
  type PhotoType = {
    uri: string;
    latitude: number;
    longitude: number;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
      
      <Text> tm 1</Text>
      {photos.map((photo: PhotoType) => {
         console.log("tesststt");
        return (<View key={photo.uri}>
        <Image source={{ uri: photo.uri }} style={{ width: 200, height: 300 }} />
        <Text> Test </Text>
        </View> );   
      })}
      <Text> tm 2</Text>
      </ScrollView>
      <Link href="/modal" asChild style={styles.button}>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="plus"
              size={25}
              color={'black'}
              style={{ opacity: pressed ? 0.5 : 1, alignSelf: 'center' }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    width:"33%",
  },
  button: {
    borderRadius: 200,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    justifyContent: 'center',
    position: 'absolute',
    bottom:10,
    alignSelf: 'center',
  },
  boxSmall: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'skyblue',
  },
  boxLarge: {
    width: 300,
    height: 300,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: 'steelblue',
  },
});
