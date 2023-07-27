import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Splashstyle} from '../Styles/Styles';
const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);
  return (
    <View style={Splashstyle.mainContainer}>
      <Image
        source={require('../Assets//RealmDBlogo.png')}
        style={Splashstyle.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;
