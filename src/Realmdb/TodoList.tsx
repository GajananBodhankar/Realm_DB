// import React from 'react';
// import {FlatList, Text, View} from 'react-native';
// import {todoContext, Todo} from './realm';
// import {style} from './styles';

// const {useQuery} = todoContext;

// export const TodoList = () => {
//   const todos = useQuery(Todo);
//   return (
//     <View style={style.container}>
//       <Text>TodoList</Text>
//       <FlatList
//         data={todos}
//         renderItem={({item}) => <Text>{item.description}</Text>}
//       />
//     </View>
//   );
// };

// import React, {useEffect} from 'react';
// import {View, Text} from 'react-native';
// import setupRealm from './realm';

// export default function TodoList() {
//   useEffect(() => {
//     // Open a Realm instance
//     async function check() {
//       const realm = await setupRealm();

//       // Perform write operations inside a transaction block
//       realm.write(() => {
//         realm.create('Person', {name: 'John', age: 30});
//         realm.create('Person', {name: 'Jane', age: 25});
//       });

//       // Query data from Realm
//       const people = realm.objects('Person');

//       // Output the data to the console
//       console.log(people);
//     }
//     check();
//   }, []);

//   return (
//     <View>
//       <Text>Hello RealmDB!</Text>
//     </View>
//   );
// }
