import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const doSignUp = async (UserEmail, UserPassword) => {
  if (!UserEmail) {
    Alert.alert('Error', 'Email required *');
    return;
  } else if (!UserPassword && UserPassword.trim() && UserPassword.length > 6) {
    Alert.alert('Error', 'Weak password, minimum 6 chars');
    return;
  } else {
    const response = await doCreateUser(UserEmail, UserPassword);
    return response;
  }
};

export const doCreateUser = async (UserEmail, UserPassword) => {
  try {
    let response = await auth().createUserWithEmailAndPassword(
      UserEmail,
      UserPassword
    );
    if (response) {
      console.log(response);
      //create firestore doc
      firestore()
        .collection('Users')
        .add({
          mail: UserEmail,
          password: UserPassword,
        })
        .then((res) => {
          console.log('User added!' + res.id);
        });
      return response;
    }
  } catch (e) {
    console.error(e.message);
  }
};

export const signIn = async (UserEmail, UserPassword) => {
  try {
    let response = await auth().signInWithEmailAndPassword(
      UserEmail,
      UserPassword
    );
    if (response) {
      console.log(response);

      firestore()
        .collection('Users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            documentSnapshot.data().mail === UserEmail &&
              AsyncStorage.setItem('userId', documentSnapshot.id);
          });
        });

      return response;
    }
  } catch (e) {
    console.error(e.message);
  }
};

export const usersCollection = () => {
  firestore()
    .collection('Users')
    .get()
    .then((collectionSnapshot) => {
      console.log('Total users: ', collectionSnapshot.size);
      collectionSnapshot.forEach((documentSnapshot) => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
};

export const userDocument = firestore()
  .collection('Users')
  .doc('3ae76e95-5112-4b55-8878-e7c29dd300aa');
