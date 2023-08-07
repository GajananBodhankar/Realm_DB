/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Pressable, TextInput, View, Text, Alert, StatusBar} from 'react-native';
import {RealmData, migration} from './realm';
import {User} from '../../../App';
import {Loginstyle} from '../Styles/Styles';
import {navigate} from './Navigate';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mailRef = useRef<TextInput>(null);
  const pwdRef = useRef<TextInput>(null);
  async function Read() {
    Realm.open({
      schema: [RealmData],
      schemaVersion: 2,
      onMigration: migration,
    }).then(response => {
      const data = response.objects('Data');
      if (data) {
        const temp: Array<any> = [];
        mainData.forEach(i => temp.push(i));
        data.forEach(i => temp.push(i));
        setMainData(temp);
      }
      console.log(data);
      // response.write(() => {
      //   response.delete(response.objects('Data'));
      // });
    });
  }
  const login = () => {
    const x = /^[\w.-]+@gmail.com$/;
    let mainFlag = false;
    if (mailRef.current?.isFocused()) {
      if (!x.test(email)) {
        Alert.alert('Invalid email format, please include @gmail.com in it');
        mainFlag = true;
      }
    }
    if (pwdRef.current?.isFocused()) {
      if (!Number(password) || password.length !== 5) {
        Alert.alert('Ensure the length of password must be 5 with all digits');
        mainFlag = true;
      }
    }
    if (Number(password) && password.length === 5 && x.test(email)) {
      if (mainFlag == false) {
        let flag = false;
        mainData.map(item => {
          if (item?.email === email && item?.password === password) {
            flag = true;
          }
        });
        if (flag) {
          console.log('True');
          navigation.navigate('Details');
          mainFlag = false;
          setEmail('');
          setPassword('');
        } else {
          console.log('False');
          Alert.alert('Invalid credentials');
          setEmail('');
          setPassword('');
        }
      }
    } else if (mainFlag === false) {
      if (email.length == 0 && password.length == 0) {
        Alert.alert('Please fill all the details');
      } else if (!x.test(email)) {
        Alert.alert('Invalid email format, please include @gmail.com in it');
      } else if (!Number(password) || password.length !== 5) {
        Alert.alert('Ensure the length of password must be 5 with all digits');
      } else {
        Alert.alert(
          'Please ensure, password must be a five digit number and email should end with @gmail.com',
        );
      }
    }
  };
  const {mainData, setMainData} = useContext(User);
  useEffect(() => {
    Read();
    console.log('mainData', mainData);
  }, []);
  return (
    <View style={Loginstyle.mainConatiner}>
      <StatusBar barStyle="light-content" />
      <TextInput
        ref={mailRef}
        placeholder="Email"
        style={Loginstyle.placeholder1}
        placeholderTextColor={'grey'}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        ref={pwdRef}
        placeholder="Password"
        style={Loginstyle.placeholder2}
        placeholderTextColor={'grey'}
        value={password}
        maxLength={5}
        onChangeText={text => setPassword(text)}
      />
      <Pressable style={Loginstyle.pressable} onPress={login}>
        <Text style={Loginstyle.loginText}>Login</Text>
      </Pressable>
      <Text style={Loginstyle.account1}>
        {"Don't have an account? "}
        <Text
          style={Loginstyle.account2}
          // onPress={() => navigation.navigate('CreateAccount')}
          onPress={() => navigate('CreateAccount')}>
          Create Account
        </Text>
      </Text>
    </View>
  );
};

export default Login;
