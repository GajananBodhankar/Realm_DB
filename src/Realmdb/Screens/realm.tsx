// import Realm from 'realm';
// import {createRealmContext} from '@realm/react';
// import {ObjectId} from 'bson';

// export class Todo extends Realm.Object {
//   _id!: Realm.BSON.ObjectId;
//   description!: string;
//   completed!: boolean;
//   createdAt!: Date;
//   static schema = {
//     name: 'Todo',
//     properties: {
//       _id: 'objectId',
//       description: 'string',
//       completed: {type: 'bool', default: false},
//       createdAt: 'date',
//     },
//   };
// }
// export const todoContext = createRealmContext({
//   schema: [Todo],
//   onFirstOpen(realm: {
//     create: (
//       arg0: string,
//       arg1: {
//         _id: ObjectId;
//         description: string;
//         completed: boolean;
//         createdAt: Date;
//       },
//     ) => void;
//   }) {
//     realm.create('Todo', {
//       _id: new Realm.BSON.ObjectId(),
//       description: 'Learn react native',
//       completed: false,
//       createdAt: new Date(),
//     });
//   },
// });

// class Task {
//   // static schema: {
//   //   name: string;
//   //   properties: {
//   //     id: string;
//   //     title: string;
//   //     description: string;
//   //     isCompleted: string;
//   //   };
//   // };
// }
// Task.schema = {
//   name: 'Task',
//   properties: {
//     id: 'int',
//     title: 'string',
//     description: 'string',
//     isCompleted: 'bool',
//   },
// };

// export default Task;

import {useContext} from 'react';
import Realm from 'realm';
import {User} from '../../../App';

// Define your data schema for Realm
export const RealmData = {
  name: 'Data',
  properties: {
    name: 'string',
    email: 'string',
    password: 'string',
    title: 'string',
    description: 'string',
  },
};

export const migration = (
  oldRealm: {schemaVersion: number},
  newRealm: {objects: (arg0: string) => any},
) => {
  if (oldRealm.schemaVersion < 2) {
    const newObjects = newRealm.objects('Data');
    for (let i = 0; i < newObjects.length; i++) {
      newObjects[i].name = '';
      newObjects[i].title = '';
      newObjects[i].description = '';
    }
  }
};

// const realm = new Realm({
//   schema: [RealmData],
//   schemaVersion: 1, // Update the schema version to 1
//   migration, // Add the migration function
// });
// export default function CreateRealm(name, email, password) {
//   const {mainData, setMainData} = useContext(User);
//   Realm.open({
//     schema: [RealmData], // Add more schemas if needed
//     schemaVersion: 1,
//     onMigration: migration,
//     // You can provide other configuration options here if required
//     // For example: schemaVersion, migration, encryption, etc.
//   }).then(realm => {
//     realm.write(() => {
//       realm.create('Data', {name: name, email: email, password: password});
//       console.log(realm.objects('Data'));
//       setMainData(realm.objects('Data'));
//       return true;
//       // realm.delete(realm.objects('Data'));
//       // console.log(realm.objects('Data'));
//     });
//   });
// }
