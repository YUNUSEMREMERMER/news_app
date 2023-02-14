import React, { useEffect } from 'react';
import Wrapper from './src/pages/Wrapper.js';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    getFCMToken();
    requestPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then((token) => {
        console.log('token=>>>', token);
        AsyncStorage.setItem('token', token);
      });
  };

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  return <Wrapper />;
};

export default App;
