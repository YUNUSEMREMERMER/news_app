import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import { WebView } from 'react-native-webview';
import styles from './styles';

const NewsDetailScreen = (props) => {
  const [value, setValue] = useState(0);

  const addFavorite = async () => {
    setValue(value - 1);
    const userId = await AsyncStorage.getItem('userId');
    firestore()
      .collection('Favorites')
      .add({
        userId: userId,
        source: { name: props.route.params.item.source.name },
        title: props.route.params.item.title,
        urlToImage: props.route.params.item.urlToImage,
        url: props.route.params.item.url,
      })
      .then(() => {
        console.log('Favorite added!');
      });
  };

  const deleteFavorite = () => {
    setValue(value + 1);
    firestore()
      .collection('Favorites')
      .get()
      .then((collectionSnapshot) => {
        collectionSnapshot.forEach((documentSnapshot) => {
          documentSnapshot.data().title === props.route.params.item.title &&
            firestore()
              .collection('Favorites')
              .doc(documentSnapshot.id)
              .delete()
              .then(() => {
                console.log('favorite deleted!');
              });
        });
      });
  };

  useEffect(() => {
    (() => {
      firestore()
        .collection('Favorites')
        .get()
        .then((collectionSnapshot) => {
          let list = [];
          collectionSnapshot.forEach((documentSnapshot) => {
            list.push(documentSnapshot.data().title);
          });

          props.navigation.setOptions({
            title: props.route.params.item.source.name,
            headerRight: () => {
              if (list.includes(props.route.params.item.title)) {
                return (
                  <TouchableOpacity onPress={deleteFavorite}>
                    <Icon name="heart" size={20} color="black" />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity onPress={addFavorite}>
                    <Icon name="heart-o" size={20} color="black" />
                  </TouchableOpacity>
                );
              }
            },
          });
        });
    })();
  }, [props, value]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: props.route.params.item.url }} />
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
