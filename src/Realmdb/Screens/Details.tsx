import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  Pressable,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import {User} from '../../../App';
import {RealmData, migration} from './realm';
import {Detailstyle} from '../Styles/Styles';
import {navigate} from './Navigate';
const Details = ({navigation}: any) => {
  const {mainData, setMainData} = useContext(User);
  const handlePressEdit = (item: any) => {
    navigation.navigate('Add', {item});
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => navigate('Login')},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  const handlePressDelete = (item: any, index: number) => {
    Realm.open({
      schema: [RealmData],
      schemaVersion: 2,
      onMigration: migration,
    }).then(response => {
      response.write(() => {
        let tempData = response.objects('Data');
        let elementDelete = tempData.findIndex(
          element => element.title === item.title,
        );
        if (elementDelete >= 0) {
          response.delete(tempData[elementDelete]);
          setMainData(response.objects('Data'));
        }
      });
    });
  };
  const disp = ({item, index}: any) => {
    if (item.title) {
      return (
        <View style={Detailstyle.flatlist}>
          <View>
            <Text style={Detailstyle.txt1}>{item.title}</Text>
            <Text style={Detailstyle.txt2}>{item.description}</Text>
          </View>
          <View>
            <Pressable
              style={Detailstyle.pressableIcon}
              onPress={() => handlePressDelete(item, index)}>
              <Image
                source={require('../Assets/Delete.png')}
                style={Detailstyle.Icon}
              />
            </Pressable>
            <Pressable onPress={() => handlePressEdit(item)}>
              <Image
                source={require('../Assets/write.png')}
                style={Detailstyle.Icon}
              />
            </Pressable>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={Detailstyle.mainContainer}>
      <SafeAreaView />
      <Pressable
        style={Detailstyle.PressableAdd}
        onPress={() => navigation.navigate('Add', {})}>
        <Text style={Detailstyle.addtext}>Add Data</Text>
      </Pressable>
      <View style={Detailstyle.MainFlat}>
        <FlatList data={mainData} renderItem={disp} />
      </View>
      <Pressable
        style={Detailstyle.PressableLogout}
        onPress={() => navigate('Login')}>
        <Text style={Detailstyle.addtext}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Details;
