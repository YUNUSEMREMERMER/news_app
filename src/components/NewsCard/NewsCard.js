import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const NewsCard = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ ...styles.card, backgroundColor: 'white' }}
      onPress={() => {
        navigation.navigate('NewsDetailScreen', { item: props.item });
      }}>
      <Image
        style={styles.image}
        source={{
          uri: props.item.urlToImage
            ? props.item.urlToImage
            : 'https://picsum.photos/200/300',
        }}
      />
      <Text style={{ ...styles.card_text, color: 'black' }}>
        {props.item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default NewsCard;
