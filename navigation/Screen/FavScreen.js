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
  // Alert,
} from 'react-native';
import {set} from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FavScreen = ({route, navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM book_list WHERE book_fav = 1', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          let fav = results.rows.item(i);
          // console.log(category);
          if (!temp.includes(fav, 0)) {
            temp.push(fav);
          }
        }
        setFlatListItems(temp);
        console.log(flatListItems);
      });
    });
  }, []);
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
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
              rating: item.book_rate,
              image: item.book_image,
              fav: item.book_fav,
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
    <View style={styles.container}>
      <View style={{flex: 6, flexDirection: 'column'}}>
        <FlatList
          data={flatListItems}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listItemView(item)}
        />
      </View>
    </View>
  );
};

export default FavScreen;

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


