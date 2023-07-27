import {Dimensions, Platform, StyleSheet} from 'react-native';

export const Accountstyle = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: '#001d2b',
  },
  subContainer: {
    alignSelf: 'center',
    paddingTop: Dimensions.get('screen').height / 5,
  },
  placeholder1: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    width: Dimensions.get('screen').width / 1.5,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 10,
    marginVertical: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
  },
  placeholder2: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginVertical: 10,

    width: Dimensions.get('screen').width / 1.5,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 10,
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
  },
  pressable: {
    width: Dimensions.get('screen').width / 1.5,
    marginTop: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 4,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    paddingVertical: 5,
  },
  backimage: {
    height: 30,
    width: 30,
  },
  pressableBack: {
    paddingTop: Platform.OS == 'android' ? 20 : 0,
    width: 40,
    paddingLeft: 20,
  },
});

export const Detailstyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#001d2b',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  flatlist: {
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  txt1: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
  txt2: {
    color: 'black',
    fontSize: 18,
    paddingLeft: 10,
  },
  PressableAdd: {
    width: 'auto',
    backgroundColor: '#1e90ff',
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
  addtext: {
    fontSize: 18,
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  MainFlat: {
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 5,
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2,
  },
  Icon: {
    height: 25,
    width: 25,
  },
  pressableIcon: {
    marginBottom: 10,
  },
});

export const Loginstyle = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001d2b',
  },
  placeholder1: {
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,

    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    width: Dimensions.get('screen').width / 1.5,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 10,
  },
  placeholder2: {
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginTop: 20,
    width: Dimensions.get('screen').width / 1.5,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 10,
  },
  pressable: {
    width: Dimensions.get('screen').width / 1.5,
    backgroundColor: '#1e90ff',
    borderRadius: 4,
    marginVertical: 20,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    paddingVertical: 5,
  },
  account1: {
    color: 'white',
    fontSize: 18,
  },
  account2: {
    color: '#1e90ff',
    fontSize: 18,
  },
});

export const Splashstyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001d2b',
  },
  image: {
    height: Dimensions.get('screen').height / 1.2,
    width: Dimensions.get('screen').width / 1.2,
  },
});

export const Addstyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#001d2b',
  },
  subContainer: {
    width: Dimensions.get('screen').width / 1.5,
    alignSelf: 'center',
    paddingTop: 50,
  },
  pressable: {
    width: Dimensions.get('screen').width / 1.5,
    backgroundColor: '#1e90ff',
    borderRadius: 4,
    marginVertical: 20,
  },
  AddText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    paddingVertical: 5,
  },
  textInput: {
    paddingVertical: Platform.OS == 'ios' ? 10 : 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginTop: 20,
    width: Dimensions.get('screen').width / 1.5,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 10,
  },
});
