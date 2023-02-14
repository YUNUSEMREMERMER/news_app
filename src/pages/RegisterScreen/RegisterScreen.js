import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import styles from './styles';
import { doSignUp } from '../../helpers/Firebase';
import useThemeColors from '../../constans/ThemeColors';
import I18n from '../../language/_i18n';

const RegisterScreen = (props) => {
  const themeColors = useThemeColors();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleButton = async () => {
    const response = await doSignUp(mail, password);
    response && props.navigation.navigate('LoginScreen');
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: themeColors.background }}>
      <Text style={{ ...styles.title, color: themeColors.primary }}>
        {I18n.t('trns_2')}
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
          value={password}
          secureTextEntry={true}
          onChangeText={(input) => setPassword(input)}
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: themeColors.primary,
        }}
        onPress={handleButton}>
        <Text style={{ color: 'white' }}>{I18n.t('trns_2')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
