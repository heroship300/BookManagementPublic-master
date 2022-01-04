import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from "react-native-linear-gradient";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// React Context
import {AuthContext} from '../../component/context';

// SQLite Database
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'System_db.db'});

const SignInScreen = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);

  let [userName, setUserName] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [validUser, setValidUser] = useState(false);

  let SignInAction = () => {
    console.log(
      '\nInput User: ' + userName,
      '\nInput Password: ' + userPassword,
    );
    // setUserData({});
    signIn(userName, userPassword);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}> Welcome! </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}> Username: </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={userName => setUserName(userName)}
          />
        </View>
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

        <View>
          <TouchableOpacity
            onPress={() => SignInAction()}
            style={[
              styles.signIn,
              {
                marginTop: 15,
                borderWidth: 1,
                borderColor: '#009387',
                backgroundColor: '#009387',
              },
            ]}>
            <Text style={[styles.textSign, {color: 'white'}]}> Sign In </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={[
              styles.signIn,
              {marginTop: 15, borderWidth: 1, borderColor: '#009387'},
            ]}>
            <Text> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
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
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
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
});
