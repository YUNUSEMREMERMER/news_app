import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationService from '../../helpers/NotificationService';
import axios from 'axios';
import { API_KEY } from '@env';
import useThemeColors from '../../constans/ThemeColors';
import I18n from '../../language/_i18n';

const SettingsScreen = () => {
  const themeColors = useThemeColors();
  const categories = [
    {
      id: 0,
      title: I18n.t('trns_6'),
    },
    {
      id: 1,
      title: I18n.t('trns_7'),
    },
    {
      id: 2,
      title: I18n.t('trns_8'),
    },
    {
      id: 3,
      title: I18n.t('trns_9'),
    },
    {
      id: 4,
      title: I18n.t('trns_10'),
    },
    {
      id: 5,
      title: I18n.t('trns_11'),
    },
  ];
  const [userId, setUserId] = useState('');
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [value, setValue] = useState(0);
  const category = 'general';
  const country = 'tr';
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

  useEffect(() => {
    AsyncStorage.getItem('userId').then((res) => setUserId(res));
    (() => {
      firestore()
        .collection('Categories')
        .get()
        .then((collectionSnapshot) => {
          let list = [];
          collectionSnapshot.forEach((documentSnapshot) => {
            documentSnapshot.data().userId === userId &&
              list.push(documentSnapshot.data().category_name);
          });
          setSelectedCategoryList(list);
        });
    })();
  }, [userId, value]);

  function renderCategory({ item }) {
    return selectedCategoryList.includes(item.title) ? (
      <TouchableOpacity
        style={{
          ...styles.button_container2,
          borderColor: themeColors.primary,
          backgroundColor: themeColors.primary,
        }}
        onPress={() => {
          setValue(value + 1);
          AsyncStorage.getItem('userId').then((res) => setUserId(res));
          firestore()
            .collection('Categories')
            .get()
            .then((collectionSnapshot) => {
              collectionSnapshot.forEach((documentSnapshot) => {
                documentSnapshot.data().category_name === item.title &&
                  documentSnapshot.data().userId === userId &&
                  firestore()
                    .collection('Categories')
                    .doc(documentSnapshot.id)
                    .delete()
                    .then(() => {
                      console.log('Category deleted!');
                    });
              });
            });
        }}>
        <Text style={{ color: 'white' }}>{item.title}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{ ...styles.button_container, borderColor: themeColors.primary }}
        onPress={() => {
          setValue(value - 1);
          firestore()
            .collection('Categories')
            .add({
              userId: userId,
              category_name: item.title,
            })
            .then((res) => {
              console.log('Category added!' + res.id);
            });
        }}>
        <Text style={{ color: themeColors.primary }}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  const sendNotification = async () => {
    const res = await (await axios(url)).data;
    let notificationData = {
      title: 'yeni haber',
      body: res.articles[0].title,
      token: await AsyncStorage.getItem('token'),
    };
    await NotificationService.sendSingleDeviceNotification(notificationData);
  };
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
      <Button
        title={I18n.t('trns_12')}
        onPress={sendNotification}
        color={themeColors.primary}
      />
    </View>
  );
};

export default SettingsScreen;
