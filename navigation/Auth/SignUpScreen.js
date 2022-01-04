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
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../../component/context';

// import SQLiteScreen from '../../screen/SQLite/SQLiteScreen';
// let csdl = new SQLiteScreen();
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'System_db.db'});

const SignUpScreen = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userConfirmPassword, setUserConfirmPassword] = useState('');

  let register_user = () => {
    console.log(userName, userPassword);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if (!userConfirmPassword) {
      alert('Please fill Confirm Password');
      return;
    }
    if (userPassword != userConfirmPassword) {
      alert('Mật khẩu khác nhau');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO user_list (user_name, user_password) VALUES (?,?)',
        [userName, userPassword],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('SignIn'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}> Register Now! </Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          {/* UserName */}
          <Text style={styles.text_footer}> Your Name: </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="words"
              onChangeText={userName => setUserName(userName)}
            />
          </View>

          {/* userPassword */}
          <Text style={[styles.text_footer, {marginTop: 5}]}> Password: </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              secureTextEntry={false}
              placeholder="Your Passwords"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={userPassword => setUserPassword(userPassword)}
            />
          </View>

          {/* userConfirmPassword */}
          <Text style={[styles.text_footer, {marginTop: 5}]}>
            {' '}
            Confirm Password:{' '}
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              secureTextEntry={false}
              placeholder="Confirm Your Passwords"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={confirmUserPassword =>
                setUserConfirmPassword(confirmUserPassword)
              }
            />
          </View>

          {/* Sign up */}
          <View>
            <TouchableOpacity
              onPress={() => {
                register_user();
              }}
              style={[
                styles.signIn,
                {
                  marginTop: 15,
                  borderWidth: 1,
                  borderColor: '#009387',
                  backgroundColor: '#009387',
                },
              ]}>
              <Text style={[styles.textSign, {color: 'white'}]}> Sign Up </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In */}
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {marginTop: 15, borderWidth: 1, borderColor: '#009387'},
              ]}>
              <Text> Sign In </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
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
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
