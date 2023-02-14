import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import NewsCard from '../../components/NewsCard/NewsCard';
import styles from './styles';

const FavoritesScreen = () => {
  const [favoriteNews, setFavoriteNews] = useState({});
  const [userId, setUserId] = useState({});
  function renderItem({ item }) {
    return item._data.userId === userId && <NewsCard item={item._data} />;
  }

  useEffect(() => {
    AsyncStorage.getItem('userId').then((res) => setUserId(res));
    firestore()
      .collection('Favorites')
      .get()
      .then((collectionSnapshot) => {
        setFavoriteNews(collectionSnapshot);
      });
  }, [favoriteNews]);
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteNews._docs && favoriteNews._docs}
        renderItem={renderItem}
        keyExtractor={(item) => item._data.title}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoritesScreen;
