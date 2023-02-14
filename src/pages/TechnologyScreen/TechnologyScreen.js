import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import NewsCard from '../../components/NewsCard/NewsCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_KEY } from '@env';
import styles from './styles';
import axios from 'axios';

const TechnologyNewsScreen = (props) => {
  const [headlines, setHeadlines] = useState({});

  const category = 'technology';
  const country = 'tr';
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

  useEffect(() => {
    (async () => {
      const res = await (await axios(url)).data;
      setHeadlines(res);
    })();
  }, [props.navigation, url]);

  function renderItem({ item }) {
    return <NewsCard item={item} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={headlines && headlines.articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TechnologyNewsScreen;
