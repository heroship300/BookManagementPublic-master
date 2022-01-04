import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';
import {useEffect} from 'react/cjs/react.development';
import {AuthContext} from './component/context';

import AddBookScreen from './screen/Books/AddBookScreen';
import DeleteBookScreen from './screen/Books/DeleteBookScreen';
import EditBookScreen from './screen/Books/EditBookScreen';
import BooksStack from './navigation/Stack/BooksStack';
import CategoriesStack from './navigation/Stack/CategoriesStack';

const Stack = createStackNavigator();
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import AuthNavigator from './navigation/Auth/AuthNavigator';
import BooksList from './assets/BooksData';

import AsyncStorage from '@react-native-community/async-storage';

// SQLite
// import SQLite from 'react-native-sqlite-storage';
import {openDatabase} from 'react-native-sqlite-storage';
import BookOfCategoryScreen from './navigation/Screen/BookOfCategoryScreen';
import BooksDetailScreen from './navigation/Screen/BooksDetailScreen';
// import SQLiteScreen from './screen/SQLite/SQLiteScreen';
global.db = openDatabase(
  {name: 'System_db.db'},
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);

const App = () => {
  const [books, setBooks] = useState(BooksList);

  useEffect(() => {
    db.transaction(function (txn) {
      // Tạo Bảng User
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user_list'",
        [],
        function (tx, userRes) {
          let check = false;
          if (userRes.rows.length != 0) {
            check = true;
          }
          console.log('Tìm thấy bảng user:', check);
          if (userRes.rows.length == 0) {
            // txn.executeSql('DROP TABLE IF EXISTS user_list', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user_list(user_id INTEGER , user_name VARCHAR(20), user_password VARCHAR(10),PRIMARY KEY("user_id" AUTOINCREMENT))',
              [],
            );
          }
        },
      );
    }, []);
  });

  useEffect(() => {
    db.transaction(function (txn) {
      // Show User
      txn.executeSql('SELECT * FROM user_list ', [], (tx, results) => {
        var len = results.rows.length;
        console.log('Số lượng USER', len);
        if (len > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            console.log(item);
          }
        } else {
          alert('No user found');
        }
      });
    }, []);
  });

  useEffect(() => {
    db.transaction(function (txn) {
      // Tạo Bảng Book
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='book_list'",
        [],
        function (tx, bookRes) {
          let check = false;
          if (bookRes.rows.length != 0) {
            check = true;
          }
          console.log('Tìm thấy bảng Book:', check);
          if (bookRes.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS book_list', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS book_list(book_id INTEGER, book_title VARCHAR(20), book_category VARCHAR(20), book_author VARCHAR(20), book_rate INTEGER, book_image VARCHAR(255), book_fav INTEGER, PRIMARY KEY("book_id" AUTOINCREMENT))',
              [],
            );
          }
        },
      );
    }, []);
  });

  useEffect(() => {
    db.transaction(function (txn) {
      // Show Book
      txn.executeSql('SELECT * FROM book_list ', [], (tx, results) => {
        var len = results.rows.length;
        console.log('Số lượng Book', len);
        if (len > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            console.log(item);
          }
        } else {
          alert('No book found');
          // import Data BooksList

          for (let i of BooksList) {
            db.transaction(function (tx) {
              tx.executeSql(
                'INSERT INTO book_list (book_title, book_category, book_author, book_rate, book_image, book_fav) VALUES (?,?,?,?,?,?)',
                [i.title, i.category, i.author, i.rating, i.image, i.favourite],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                },
              );
            });
          }
        }
      });
    }, []);
  });

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userName: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userName, userPassword) => {
        let userToken;
        let validUser = false;

        // Function to check User Input
        const checkUser = () => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM user_list WHERE user_name = ? AND user_password = ?',
              [userName, userPassword],
              (tx, results) => {
                var len = results.rows.length;
                // console.log('len', len);
                if (len > 0) {
                  // setValidUser(true);
                  validUser = true;
                  console.log(validUser);
                  addToken();
                } else {
                  alert('Sai UserName hoặc Password!');
                }
              },
            );
          });
        };

        // Function to add Token
        const addToken = async () => {
          if (validUser == true) {
            userToken = Math.random().toString(36).substr(2, 11);
            console.log(userToken);
            try {
              await AsyncStorage.setItem('userToken', userToken);
            } catch (e) {
              console.log(e);
            }
          }
          dispatch({type: 'LOGIN', id: userName, token: userToken});
        };

        // Action
        checkUser();
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      // signUp: async (userName, password) => {
      //   await csdl.InsertUserQuery(userName, password);
      // },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken == null ? (
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="AddBook" component={AddBookScreen} />
            <Stack.Screen name="EditBook" component={EditBookScreen} />
            <Stack.Screen name="DeleteBook" component={DeleteBookScreen} />
            {/* <Stack.Screen
              name="AllBookTab"
              component={BooksStack}
              options={{
                headerLeft: null,
                headerShown: false,
              }}
            /> */}
            {/* <Stack.Screen name="BookOfCategory" component={CategoriesStack} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </AuthContext.Provider>

    // <NavigationContainer>
    //   <TabNavigator />
    // </NavigationContainer>
  );
};
export default App;
