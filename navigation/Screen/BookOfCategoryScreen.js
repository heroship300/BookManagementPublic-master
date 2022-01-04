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
  Alert,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BooksList from '../../assets/BooksData';

const BookOfCategoryScreen = ({route, navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  const category = route.params.category;
  // console.log(category);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM book_list WHERE book_category = ?',
        [category],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          console.log(temp);
          setFlatListItems(temp);
        },
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };

  let listItemView = item => {
    return (
      <View key={item.book_id} style={{padding: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('BooksDetail', {
              id: item.book_id,
              title: item.book_title,
              category: item.book_category,
              author: item.book_author,
              rating: item.book_rating,
              image: item.book_image,
            });
          }}>
          <View style={{width: '100%', overflow: 'hidden', height: 452}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: item.book_image}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <FlatList
        data={flatListItems}
        // ItemSeparatorComponent={listViewItemSeparator}
        ItemSeparatorComponent={
          Platform.OS !== 'android' &&
          (({highlighted}) => (
            <View style={[style.separator, highlighted && {marginLeft: 0}]} />
          ))
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listItemView(item)}
      />
    </View>
  );
};

export default BookOfCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
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
