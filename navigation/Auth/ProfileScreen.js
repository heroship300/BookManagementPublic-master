import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {AuthContext} from '../../component/context';

const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <View style={{flex:6, flexDirection:'column', alignSelf:'center', justifyContent:'center', alignItems: 'center'}}>
          <Text style={{flex:1, marginTop:20}}>Ứng Dụng Quản Lý Sách</Text>
          <Text style={{flex:2}}>Được Viết Bởi:</Text>
          <Text style={{flex:1}}>Đỗ Xuân Đích</Text>
          <Text style={{flex:1}}>và</Text>
          <Text style={{flex:1}}>Nguyễn Thanh Hải</Text>
        </View>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            style={[
              styles.signIn,
              {marginTop: 15, borderWidth: 1, borderColor: '#009387'},
            ]}>
            <Text> Sign OUT </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 3,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 1,
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
