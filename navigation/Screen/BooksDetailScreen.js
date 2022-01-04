import React, {useState, useEffect} from 'react';
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
  FlatList,
  Image,
  Alert,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import {Title} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {set} from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BooksDetailScreen = ({route, navigation}) => {
  const {id, category, title, author, rating, image, fav} = route.params;
  const [book_Fav, setBookFav] = useState(fav);
  console.log('SetBookFav: ' + book_Fav);

  return (
    <ScrollView>
      <View style={styles.main}>
        <FitImage source={{uri: image}} style={styles.fitImage} />
        <View style={styles.infoBox}>
          <Text>{''}</Text>
          <Text>Book Title : </Text>
          <Text style={styles.propText}>{'    ' + title}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Written By: </Text>
          <Text style={styles.propText}>{'    ' + author}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text>Category: </Text>
          <Text style={styles.propText}>{'    ' + category}</Text>
        </View>
        <View style={styles.rating}>
          <Rating
            readonly={true}
            startingValue={rating}
            ratingCount={5}
            imageSize={40}
            showRating
          />
          <Text> </Text>
        </View>

        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          {/* Delete book */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DeleteBook', {id: id});
            }}>
            <FontAwesome name="remove" color="#05375a" size={30} />
          </TouchableOpacity>

          {/* Edit Book */}
          <TouchableOpacity
            style={{paddingLeft: 20}}
            onPress={() => {
              navigation.navigate('EditBook', {
                id: id,
                title: title,
                category: category,
                author: author,
                rating: rating,
              });
            }}>
            <FontAwesome name="edit" color="#05375a" size={30} />
          </TouchableOpacity>

          {/* Set Favorious */}
          {book_Fav == 0 ? (
            <TouchableOpacity
              style={{paddingLeft: 20}}
              onPress={() => {
                setBookFav(1);
                // db.transaction(tx => {
                //   tx.executeSql(
                //     'UPDATE book_list SET book_fav = 1 WHERE book_id = ?',
                //     [id],
                //     (tx, results) => {
                //       console.log('Results', results.rowsAffected);
                //       if (results.rowsAffected > 0) {
                //         Alert.alert('Success', 'You are change Successfully');
                //       } else alert('Change Failed');
                //     },
                //   );
                // });
              }}>
              <FontAwesome name="heart-o" color="#05375a" size={30} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{paddingLeft: 20}}
              onPress={() => {
                setBookFav(0);
                // db.transaction(tx => {
                //   tx.executeSql(
                //     'UPDATE book_list SET book_fav = 0 WHERE book_id = ?',
                //     [id],
                //     (tx, results) => {
                //       console.log('Results', results.rowsAffected);
                //       if (results.rowsAffected > 0) {
                //         Alert.alert('Success', 'You are change Successfully');
                //       } else alert('Change Failed');
                //     },
                //   );
                // });
              }}>
              <FontAwesome name="heart" color="#05375a" size={30} />
            </TouchableOpacity>
          )}

          {/* Save */}
          <TouchableOpacity
            style={{paddingLeft: 20}}
            onPress={() => {
              // navigation.push('Home');
              db.transaction(tx => {
                tx.executeSql(
                  'UPDATE book_list SET book_fav = ? WHERE book_id = ?',
                  [book_Fav, id],
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
            }}>
            <FontAwesome name="save" color="#05375a" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BooksDetailScreen;

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
