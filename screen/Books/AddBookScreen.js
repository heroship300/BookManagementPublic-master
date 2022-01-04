import React, {useState} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {openDatabase} from 'react-native-sqlite-storage';


const AddBookScreen = ({navigation}) => {
  let [title, setTitle] = useState('');
  let [category, setCategory] = useState('');
  let [rating, setRating] = useState('');
  let [author, setAuthor] = useState('');

  let addBook = () => {
    console.log(title, category, author, rating);

    if (!title) {
      alert('Điền Tựa Đề');
      return;
    }
    if (!category) {
      alert('Điền Thể Loại');
      return;
    }
    if (!author) {
      alert('Điền Tên Tác Giả');
      return;
    }
    if (!rating) {
      alert('Điền Đánh Giá');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO book_list (book_title, book_category, book_author, book_rate) VALUES (?,?,?,?)',
        [title, category, author, rating],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Add Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.push('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Add Failed');
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text_footer}> Tên Sách: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Title Input"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setTitle(val)}
            />
          </View>

          <Text style={styles.text_footer}> Thể Loại Sách: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Category Input"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setCategory(val)}
            />
          </View>

          <Text style={styles.text_footer}> Tác Giả: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Author Input"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setAuthor(val)}
            />
          </View>

          <Text style={styles.text_footer}> Rating: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Rating Input"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => {
                if (val > 0 && val < 6) {
                  setRating(val);
                } else {
                  alert('Ban da nhap sai Rating! 1~5');
                }
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                addBook();
              }}
              style={[
                styles.signIn,
                {marginTop: 15, borderWidth: 1, borderColor: '#009387'},
              ]}>
              <Text> Submit </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
