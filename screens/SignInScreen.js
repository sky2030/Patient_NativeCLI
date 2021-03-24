import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  // TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Keyboard, Linking,
  ScrollView
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
// import { MaterialIcons } from '@expo/vector-icons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {TextInput} from 'react-native-paper';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { AuthContext } from "../components/context";
//import Users from '../model/users';
const SignInScreen = ({ navigation }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    check_textInputChange: false,
    check_emailInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPassword: true,
  });

  const { signIn } = useContext(AuthContext);

  const EmailInputChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(val) === false) {
      setData({
        ...data,
        email: val,
        check_emailInputChange: false,
        isValidEmail: false,
      });
      return false;
    }
    else {
      setData({
        ...data,
        email: val,
        check_emailInputChange: true,
        isValidEmail: true,
      });
    }

  };

  const textInputChange = (val) => {
    if (val.trim().length == 10) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleValidEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(val) === false) {
      setData({
        ...data,
        isValidEmail: false,
      });
      console.log("Email is Not Correct");
      return false;
    } else {
      setData({
        ...data,
        isValidEmail: true,
      });
      console.log("Email is Correct");
      return true;
    }

  };

  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      console.log("Email is Correct");
      return true;
    }
  };

  const EmailHandle = (email) => {
    if (email.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Email Address field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }
    if (validateEmail(email) == false) {
      Alert.alert("Wrong Input!", "Enter valid Email ID", [{ text: "Okay" }]);
      return;
    }
    let payload = {
      email,
    };
    console.log("payload :", payload);
    fetch(`${BASE_URL}forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        Alert.alert(Alert_Title, data.message);
        if (data.code == 200) {
          Alert.alert(Alert_Title, data.message + " Your Password has been sent to your Email Address");
        }
      })
      .catch((e) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  }

  const loginHandle = (username, password) => {
    // const foundUser = Users.filter( item => {
    //     return userName == item.username && password == item.password;
    // } );

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }

    // if ( foundUser.length == 0 ) {
    //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //         {text: 'Okay'}
    //     ]);
    //     return;
    // }
    signIn(username, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>WELCOME TO VRCure! </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
      <ScrollView showsVerticalScrollIndicator={false} >

          <TextInput
           style={styles.textInput}
           theme={theme}
           label="Your Phone Number"
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
            autoCapitalize="none"
            keyboardType={"number-pad"}
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Phone number must be 10 characters long.
            </Text>
          </Animatable.View>
        )}

       
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
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        {/* <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity> */}
        <Collapse>
          <CollapseHeader>
            <Text style={{ color: "#009387", marginTop: 15 }}>
              Forgot password?
          </Text>
          </CollapseHeader>
          <CollapseBody>

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
                data.check_emailInputChange ? (
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
                onChangeText={(val) => EmailInputChange(val)}
                onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
              />

            {data.isValidEmail ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  please enter a valid Email address
            </Text>
              </Animatable.View>
            )}
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: "#009387",
                  backgroundColor: "#009387",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => {
                EmailHandle(data.email);
              }}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sent New Password
            </Text>
            </TouchableOpacity>
          </CollapseBody>
        </Collapse>

        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                backgroundColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              Keyboard.dismiss()
              loginHandle(data.username, data.password);
            }}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
            style={[
              styles.signIn,
              {
                borderColor: "#009387",
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#009387",
                },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity> */}
          <Text style={{marginTop :10}}><Text>Don't have an account</Text>
            <Text style={styles.signUpText} onPress={() =>navigation.navigate("SignUpScreen")}> Sign Up</Text>
            </Text>
        </View>
        {/* <TouchableOpacity activeOpacity={0.95}
             onPress={() => 
            //  navigation.navigate("PrivacyPolicy")
             Linking.openURL('https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html')
             } style={styles.privacyfooter}>
              <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
             </TouchableOpacity> */}
             </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
const theme = {
  colors: {
    primary: '#009387',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  signUpText:{
    color: '#009387',
    fontSize :17
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  privacyfooter:{
    // backgroundColor:"white",
    padding:20,
    height: 40,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    position : "absolute",
    bottom : 0
},
bottomtext:{
 color:'#009387',
 fontSize: 15,
 fontWeight:'bold'
},
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    // flex: 1,
    // paddingLeft: 10,
    // color: "#05375a",
    // height: HEIGHT_ROW
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
