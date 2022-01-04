import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';

const DeleteBookScreen = ({route, navigation}) => {
  // console.log(route.params);
  const book_id = route.params.id;
  // console.log(book_id);
  const deleteAction = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  book_list where book_id=?',
        [book_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.push('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Delete Failed');
        },
      );
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log(route.id);
          deleteAction();
        }}
        style={[
          styles.signIn,
          {marginTop: 15, borderWidth: 1, borderColor: '#009387'},
        ]}>
        <Text> Delete </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.push('Home')}
        style={[
          styles.signIn,
          {marginTop: 15, borderWidth: 1, borderColor: '#009387'},
        ]}>
        <Text> Cancel </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
