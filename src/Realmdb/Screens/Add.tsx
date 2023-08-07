/* eslint-disable @typescript-eslint/no-shadow */
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Accountstyle, Addstyle} from '../Styles/Styles';
import {navigate} from './Navigate';
import {RealmData, migration} from './realm';
import {User} from '../../../App';
const Add = ({route}: any) => {
  const {item} = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {mainData, setMainData} = useContext(User);
  useEffect(() => {
    console.log('Item', item);
    if (item) {
      if (item.title && item.description) {
        setTitle(item.title);
        setDescription(item.description);
      }
    }
  }, []);
  const addData = () => {
    if (title?.length > 0 && description?.length > 0) {
      Realm.open({
        schema: [RealmData],
        schemaVersion: 2,
        onMigration: migration,
      }).then(response => {
        const tempData = response.objects('Data');
        let flag = false;
        tempData.forEach(item => {
          if (item?.title === title) {
            flag = true;
          }
        });
        if (flag === false) {
          response.write(() => {
            response.create('Data', {
              name: '',
              email: '',
              password: '',
              title: title,
              description: description,
            });
          });
          navigate('Details');
          setMainData(response.objects('Data'));
        } else {
          Realm.open({
            schema: [RealmData],
            schemaVersion: 2,
            onMigration: migration,
          }).then(response => {
            response.write(() => {
              let tempData = response.objects('Data');
              let elementDelete = tempData.findIndex(
                element => element?.title === title,
              );
              if (elementDelete >= 0) {
                tempData[elementDelete].description = description;
                tempData[elementDelete].title = title;
                setMainData(response.objects('Data'));
                navigate('Details');
              }
            });
          });
        }
      });
    } else {
      Alert.alert('Please enter the data');
    }
  };
  function desFn(text) {
    setDescription(text);
  }
  function titleFn(text) {
    setTitle(text);
  }
  return (
    <View style={Addstyle.mainContainer}>
      <SafeAreaView />
      <Pressable
        style={Accountstyle.pressableBack}
        onPress={() => navigate('Details')}>
        <Image
          source={require('../Assets/Back.png')}
          style={Accountstyle.backimage}
          resizeMode="contain"
        />
      </Pressable>
      <View style={Addstyle.subContainer}>
        <TextInput
          style={Addstyle.textInput}
          placeholder="Title"
          value={title}
          onChangeText={text => titleFn(text)}
        />
        <TextInput
          style={Addstyle.textInput}
          placeholder="Description"
          value={description}
          onChangeText={text => desFn(text)}
        />
        <Pressable style={Addstyle.pressable} onPress={addData}>
          <Text style={Addstyle.AddText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default Add;

// Realm.open({
//     schema: [RealmData],
//     schemaVersion: 2,
//     onMigration: migration,
//   }).then(realm => {
//     realm.write(() => {
//       realm.create('Data', {
//         name: '',
//         email: '',
//         password: '',
//         title: title,
//         description: description,
//       });
//       console.log(realm.objects('Data'));
//       setMainData(realm.objects('Data'));
//       // realm.delete(realm.objects('Data'));
//       // console.log(realm.objects('Data'));
//     });
//   });
