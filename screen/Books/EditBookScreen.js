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

const EditBookScreen = ({route, navigation}) => {
  const book = route.params;
  // console.log(book);
  let id = book.id;
  let [title, setTitle] = useState(book.title);
  let [category, setCategory] = useState(book.category);
  let [rating, setRating] = useState(book.rating);
  let [author, setAuthor] = useState(book.author);

  console.log(typeof rating);
  const ratingPlaceHolder = rating.toString();
  console.log(ratingPlaceHolder);

  let submit = () => {
    console.log(title, category, author, rating);
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE book_list SET book_title = ?, book_category = ?, book_author = ?, book_rate = ? WHERE book_id = ?',
        [title, category, author, rating, id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.push('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Edit Failed');
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
              placeholder={title}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setTitle(val)}
            />
          </View>

          <Text style={styles.text_footer}> Thể Loại Sách: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder={category}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setCategory(val)}
            />
          </View>

          <Text style={styles.text_footer}> Tác Giả: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder={author}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => setAuthor(val)}
            />
          </View>

          <Text style={styles.text_footer}> Rating: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder={ratingPlaceHolder}
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
                submit();
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

export default EditBookScreen;

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
