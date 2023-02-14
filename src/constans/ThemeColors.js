import { useColorScheme } from 'react-native';

const Colors = {
  light: {
    tabBarBackground: 'rgba(32, 32, 44, 0.5)',
    primary: '#0095f6',
    secondary: '#1877F2',
    background: 'white',
    title: '#212121',
    text: '#212121',
    disableButton: '#544BC3',
    inputBack: '#FAFAFA',
    placeholder: '#9E9E9E',
    activeInputBG: '#F2F1FE',
    socialButtonBG: 'white',
    socialButtonBorder: '#EEEEEE',
    tabbarIconColorActive: '#0095f6',
    tabbarIconColorDeactive: '#9E9E9E',
    tabbarBg: 'white',
  },
  dark: {
    tabBarBackground: 'rgba(50, 32, 44, 0.5)',
    primary: '#0095f6',
    secondary: '#1877F2',
    background: '#181A20',
    title: 'white',
    text: 'white',
    disableButton: '#544BC3',
    inputBack: '#1F222A',
    placeholder: '#9E9E9E',
    activeInputBG: '#1D1E31',
    socialButtonBG: '#1F222A',
    socialButtonBorder: '#35383F',
    tabbarIconColorActive: '#0095f6',
    tabbarIconColorDeactive: '#9E9E9E',
    tabbarBg: 'rgba(24, 26, 32, 0.85)',
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return colors;
};

export default useThemeColors;
