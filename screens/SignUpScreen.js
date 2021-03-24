import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  // TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Linking
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../components/context';
import {TextInput} from 'react-native-paper';

const SignUpScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    email: '',
    confirm_password: '',
    check_textInputChange: false,
    check_textEmailChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const {signUp} = useContext(AuthContext);
  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
  };
  const SignUpHandle = (username, password, email, confirm_password) => {
    if (username.length == 0 || password.length == 0 || email.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Phone Number , Email ID or Password field can not be empty.',
        [{text: 'Okay'}],
      );
      return;
    }
    if (username.length != 10) {
      Alert.alert('Wrong Input!', 'Enter valid phone number', [{text: 'Okay'}]);
      return;
    }

    if (validateEmail(email) == false) {
      Alert.alert('Wrong Input!', 'Enter valid Email ID', [{text: 'Okay'}]);
      return;
    }
    if (password.length < 8) {
      Alert.alert('Wrong Input!', 'Enter valid password', [{text: 'Okay'}]);
      return;
    }
    if (confirm_password.length < 8) {
      Alert.alert('Wrong Input!', 'Enter valid confirm password', [
        {text: 'Okay'},
      ]);
      return;
    }
    if (confirm_password != password) {
      Alert.alert('Wrong Input!', 'Password mismatch', [{text: 'Okay'}]);
      return;
    }

    let payload = {
      mobile: username,
      password,
      email,
      confirm_password,
      patient_name: name,
    };
    console.log('payload :', payload);
    fetch(`${BASE_URL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        Alert.alert(Alert_Title, data.message);
        if (data.code == 200) {
          navigation.navigate('SignInScreen');
        }
      })
      .catch((e) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
    // signUp(username, password, email, confirm_password);
  };

  const textInputChange = (val) => {
    if (val.length == 10) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const textEmailChange = (val) => {
    if (val.length !== 0) {
      if (validateEmail(val)) {
        setData({
          ...data,
          email: val,
          check_textEmailChange: true,
        });
      } else {
        setData({
          ...data,
          email: val,
          check_textEmailChange: false,
        });
      }
    } else {
      setData({
        ...data,
        email: val,
        check_textEmailChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            theme={theme}
            label="Your Name"
            style={styles.textInput}
            value={name}
            onChangeText={(text) => setName(text)}
            left={
              <TextInput.Icon
                name={() => (
                  <Feather name={'user'} size={20} color={'#009387'} />
                )}
              />
            }
          />
          <TextInput
            style={styles.textInput}
            theme={theme}
            label="Mobile No."
            onChangeText={(text) => textInputChange(text)}
            left={
              <TextInput.Icon
                name={() => (
                  <Feather name={'phone-call'} size={20} color={'#009387'} />
                )}
              />
            }
            right={
              data.check_textInputChange ? (
                <TextInput.Icon
                  name={() => (
                    <Feather
                      name={'check-circle'}
                      size={20}
                      color={'#009387'}
                    />
                  )}
                />
              ) : null
            }
          />

          <TextInput
            style={styles.textInput}
            theme={theme}
            label="Your Email Address"
            left={
              <TextInput.Icon
                name={() => (
                  <Feather name={'mail'} size={20} color={'#009387'} />
                )}
              />
            }
            right={
              data.check_textEmailChange ? (
                <TextInput.Icon
                  name={() => (
                    <Feather
                      name={'check-circle'}
                      size={20}
                      color={'#009387'}
                    />
                  )}
                />
              ) : null
            }
            autoCapitalize="none"
            onChangeText={(val) => textEmailChange(val)}
          />

          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
            theme={theme}
            label="Your Password"
            left={
              <TextInput.Icon
                name={() => (
                  <Feather name={'lock'} size={20} color={'#009387'} />
                )}
              />
            }
            right={
              <TextInput.Icon
                name={() => (
                  <Feather
                    name={data.secureTextEntry ? 'eye-off' : 'eye'}
                    size={20}
                    color={'#009387'}
                    onPress={updateSecureTextEntry}
                  />
                )}
              />
            }
            autoCapitalize="none"
          />

          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
            theme={theme}
            label="Confirm Your Password"
            left={
              <TextInput.Icon
                name={() => (
                  <Feather name={'lock'} size={20} color={'#009387'} />
                )}
              />
            }
            right={
              <TextInput.Icon
                name={() => (
                  <Feather
                    name={data.confirm_secureTextEntry ? 'eye-off' : 'eye'}
                    size={20}
                    color={'#009387'}
                    onPress={updateConfirmSecureTextEntry}
                  />
                )}
              />
            }
            autoCapitalize="none"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
          />
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}
            onPress={() => 
               Linking.openURL('https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html')
               }
            >
              {' '}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}
            onPress={() => 
               Linking.openURL('https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html')
               }
            >
              {' '}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  backgroundColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => {
                SignUpHandle(
                  data.username,
                  data.password,
                  data.email,
                  data.confirm_password,
                );
              }}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: '#009387',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#009387',
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity> */}
            <Text style={{marginTop :10}}><Text>Already have an account</Text>
            <Text style={styles.signInText} onPress={() => navigation.goBack()}> Sign In</Text>
            </Text>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const theme = {
  colors: {
    primary: '#009387',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  signInText:{
    color: '#009387',
    fontSize :17
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
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
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    // flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    // paddingLeft: 10,
    // color: '#05375a',
    // height: HEIGHT_ROW,
    // backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
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
