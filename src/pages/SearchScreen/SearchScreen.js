import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_KEY } from '@env';
import styles from './styles';
import NewsCard from '../../components/NewsCard/NewsCard';
import useThemeColors from '../../constans/ThemeColors';
import I18n from '../../language/_i18n';

const SearchScreen = (props) => {
  const [value, setValue] = useState('');
  const [headlines, setHeadlines] = useState({});
  const url = `https://newsapi.org/v2/everything?q=${value}&apiKey=${API_KEY}`;

  useEffect(() => {
    value !== '' &&
      (async () => {
        const res = await (await axios(url)).data;
        setHeadlines(res);
      })();
  }, [url, value]);

  function renderItem({ item }) {
    return <NewsCard item={item} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ ...styles.input, borderColor: 'gray' }}>
        <Icon name="search" size={20} color="gray" />
        <TextInput
          placeholder={I18n.t('trns_18')}
          placeholderTextColor="gray"
          style={styles.text_input}
          value={value}
          onChangeText={(input) => setValue(input)}
        />
      </View>

      <FlatList
        data={headlines && headlines.articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SearchScreen;
