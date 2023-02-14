import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import NewsCard from '../../components/NewsCard/NewsCard';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_KEY } from '@env';
import styles from './styles';
import axios from 'axios';

const GeneralNewsScreen = (props) => {
  const [headlines, setHeadlines] = useState({});

  const category = 'general';
  const country = 'tr';
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => props.navigation.navigate('SettingsScreen')}>
          <Icon name="settings" size={25} color="black" />
        </TouchableOpacity>
      ),
    });
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

export default GeneralNewsScreen;
