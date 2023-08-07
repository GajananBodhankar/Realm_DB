/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useRef, useState} from 'react';
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
  const nameRef = useRef<TextInput>(null);
  const cnfRef = useRef<TextInput>(null);
  const pwdRef = useRef<TextInput>(null);
  const mailRef = useRef<TextInput>(null);

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
    let mainFlag = false;
    if (nameRef.current?.isFocused()) {
      if (!regexPattern.test(name)) {
        Alert.alert('Invalid format for name, only alphabets accepted');
        mainFlag = true;
      }
    }
    if (mailRef.current?.isFocused()) {
      if (!x.test(email)) {
        Alert.alert('Invalid format for email, ensure to end with @gmail.com');
        mainFlag = true;
      }
    }
    if (pwdRef.current?.isFocused()) {
      if (password.length !== 5 || !Number(password)) {
        Alert.alert('Please enter password in numberic form having 5 digits');
        mainFlag = true;
      }
    }
    if (cnfRef.current?.isFocused()) {
      if (cnf.length !== 5 || !Number(cnf)) {
        Alert.alert('Please enter password in numberic form having 5 digits');
        mainFlag = true;
      } else if (cnf !== password) {
        Alert.alert('Password mismatched!!');
        mainFlag = true;
      }
    }
    if (
      regexPattern.test(name) &&
      x.test(email) &&
      password.length === 5 &&
      Number(password) &&
      mainFlag === false
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
    } else if (mainFlag === false) {
      if (
        name.length == 0 &&
        password.length == 0 &&
        cnf.length == 0 &&
        email.length == 0
      ) {
        Alert.alert('Please fill all the details');
      } else if (!regexPattern.test(name)) {
        Alert.alert('Invalid format for name, only alphabets accepted');
      } else if (!x.test(email)) {
        Alert.alert('Invalid format for email, ensure to end with @gmail.com');
      } else if (password.length !== 5 || !Number(password)) {
        Alert.alert('Please enter password in numberic form having 5 digits');
      } else if (cnf.length !== 5 || !Number(cnf)) {
        Alert.alert('Please enter password in numberic form having 5 digits');
      } else {
        Alert.alert('Error!!Ensure you have filled the details correctly');
      }
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
          ref={nameRef}
          placeholder="Name"
          style={Accountstyle.placeholder1}
          placeholderTextColor={'grey'}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          ref={mailRef}
          placeholder="Email"
          style={Accountstyle.placeholder1}
          placeholderTextColor={'grey'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          ref={pwdRef}
          placeholder="Password"
          style={Accountstyle.placeholder2}
          placeholderTextColor={'grey'}
          value={password}
          maxLength={5}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          ref={cnfRef}
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
