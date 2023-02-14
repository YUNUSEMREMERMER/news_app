import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import styles from './styles';
import { signIn } from '../../helpers/Firebase';
import useThemeColors from '../../constans/ThemeColors';
import I18n from '../../language/_i18n';

const LoginScreen = (props) => {
  const themeColors = useThemeColors();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleButton = async () => {
    const response = await signIn(mail, password);
    response && props.navigation.navigate('MyTab');
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: themeColors.background }}>
      <Text style={{ ...styles.title, color: themeColors.primary }}>
        {I18n.t('trns_5')}
      </Text>
      <View style={{ ...styles.input, backgroundColor: themeColors.inputBack }}>
        <TextInput
          placeholder={I18n.t('trns_3')}
          placeholderTextColor="gray"
          style={styles.text_input}
          value={mail}
          keyboardType="email-address"
          onChangeText={(input) => setMail(input)}
        />
      </View>
      <View style={{ ...styles.input, backgroundColor: themeColors.inputBack }}>
        <TextInput
          placeholder={I18n.t('trns_4')}
          placeholderTextColor="gray"
          style={styles.text_input}
          secureTextEntry={true}
          value={password}
          onChangeText={(input) => setPassword(input)}
        />
      </View>
      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: themeColors.primary }}
        onPress={handleButton}>
        <Text style={{ color: 'white' }}>{I18n.t('trns_5')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('RegisterScreen');
        }}>
        <Text style={{ ...styles.text, color: themeColors.primary }}>
          {I18n.t('trns_19')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
