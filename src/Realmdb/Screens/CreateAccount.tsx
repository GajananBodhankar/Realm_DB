/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  Alert,
  Platform,
  Image,
  SafeAreaView,
} from 'react-native';
import {RealmData, migration} from './realm';
import Realm from 'realm';
import {User} from '../../../App';
import {Accountstyle} from '../Styles/Styles';
import {navigate} from './Navigate';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cnf, setCnf] = useState('');
  const {mainData, setMainData} = useContext(User);

  async function create(name: string, email: string, password: string) {
    // const realm = await CreateRealm(name, email, password);
    // console.log(realm);

    Realm.open({
      schema: [RealmData],
      schemaVersion: 2,
      onMigration: migration,
    }).then(realm => {
      realm.write(() => {
        realm.create('Data', {
          name: name,
          email: email,
          password: password,
          title: '',
          description: '',
        });
        console.log(realm.objects('Data'));
        setMainData(realm.objects('Data'));
        // realm.delete(realm.objects('Data'));
        // console.log(realm.objects('Data'));
      });
    });
  }
  const handlePress = () => {
    const regexPattern = /^[A-Za-z\s]+$/;
    const x = /^[\w.-]+@gmail.com$/;
    if (
      regexPattern.test(name) &&
      x.test(email) &&
      password.length === 5 &&
      Number(password)
    ) {
      if (cnf === password) {
        Realm.open({
          schema: [RealmData],
          schemaVersion: 2,
          onMigration: migration,
        }).then(response => {
          const tempData = response.objects('Data');
          if (tempData) {
            let flag = false;
            tempData.forEach(i => {
              if (i?.email === email) {
                flag = true;
              }
            });
            if (flag === false) {
              create(name, email, password);
              navigate('Login');
            } else {
              Alert.alert('Email already taken');
              setEmail('');
            }
          } else {
            create(name, email, password);
            navigate('Login');
          }
        });
      } else {
        Alert.alert('Password and confirm password did not match');
      }
    } else {
      Alert.alert(
        'Please ensure, password must be a five digit number,email should end with @gmail.com and name must only have alphabets',
      );
    }
  };

  return (
    <View style={Accountstyle.mainConatiner}>
      <SafeAreaView />
      <Pressable
        style={Accountstyle.pressableBack}
        onPress={() => navigate('Login')}>
        <Image
          source={require('../Assets/Back.png')}
          style={Accountstyle.backimage}
          resizeMode="contain"
        />
      </Pressable>
      <View style={Accountstyle.subContainer}>
        <TextInput
          placeholder="Name"
          style={Accountstyle.placeholder1}
          placeholderTextColor={'grey'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholder="Email"
          style={Accountstyle.placeholder1}
          placeholderTextColor={'grey'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          style={Accountstyle.placeholder2}
          placeholderTextColor={'grey'}
          value={password}
          maxLength={5}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          placeholder="Confirm Password"
          style={Accountstyle.placeholder2}
          placeholderTextColor={'grey'}
          value={cnf}
          maxLength={5}
          onChangeText={text => setCnf(text)}
        />
        <Pressable style={Accountstyle.pressable} onPress={handlePress}>
          <Text style={Accountstyle.loginText}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateAccount;
