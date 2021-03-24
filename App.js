// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, ActivityIndicator, Alert, PermissionsAndroid,
  Image, SafeAreaView, StatusBar, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import "./Global"
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import DrawerStackScreen from './screens/DrawerNav'
import { Platform } from 'react-native';
import Splash from "./assets/images/Splash.gif";
import patientLogo from "./assets/images/patientLogo.gif";

import launch_screen from "./assets/images/launch_screen.jpg";
import launch_screen1 from "./assets/images/launch_screen1.jpg";

import SplashScreen from 'react-native-splash-screen'

export default function App({ navigation }) {


  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [showGif, setShowGif] = React.useState(false)

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,

  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({

    signIn: (username, password) => {
      setIsLoading(true);

      let payload = {
        "mobile": username,
        "password": password,
        fcm_token: FCM_Token

      }
      console.log("Login :", `${BASE_URL}login`)
      console.log("Payload :", JSON.stringify(payload))
      fetch(`${BASE_URL}login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(async (data) => {
          console.log(JSON.stringify(data));
          if (data.code == 200) {
            await AsyncStorage.setItem('userToken', data.data.token)
            const userToken = AsyncStorage.getItem('userToken');
            dispatch({ type: 'LOGIN', id: username, token: userToken });
          }
          else {
            Alert.alert(Alert_Title, `${data.message} ${username}`);
          }
        })
        .catch(err => {
          Alert.alert(Alert_Title, SOMETHING_WENT_WRONG)
        })

    },
    signOut: async () => {
      setUserToken(null);
      setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: (username, password, email, confirm_password) => {
      // setIsLoading(false);
      fetch(`${BASE_URL}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: username,
          password,
          email,
          confirm_password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(JSON.stringify(data));

          Alert.alert(Alert_Title, data.message);
          if (data.code == 500) {
            this.pros.navigation.navigate("SignInScreen");
          }

        })
        .catch((e) => {
          Alert.alert(Alert_Title, "something went wrong");
        });
    },

  }), []);

  const CheckToken = () => {

    setTimeout(async () => {
      setIsLoading(false);
      let checkToken;
      checkToken = null;
      try {
        checkToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: checkToken });
    }, 1000);
  }

  useEffect(() => {
    console.log("object")
    SplashScreen.hide();
    setShowGif(true)
    setTimeout(() => {
      setShowGif(false)
      requestPermissions()
      CheckToken()
    }, 3000);

  }, []);

  if(showGif){
    return (
      <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      source={launch_screen1}
      >
      <StatusBar backgroundColor="#070393" barStyle="light-content" />

        {/* <ActivityIndicator size="large" /> */}
        <Image
        source={patientLogo}
        resizeMode= {"contain"}
        style={{height : 300, width : 300}}
        />
      </ImageBackground>
    );
  }

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
  //     backgroundColor : "#fff" }}>
  //       {/* <ActivityIndicator size="large" /> */}
  //       <Image
  //       source={Splash}
  //       resizeMode= {"contain"}
  //       style={{height : 300, width : 300}}
  //       />
  //     </View>
  //   );
  // }
  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      
        <StatusBar backgroundColor={backgroundColor} barStyle="light-content" {...props} />
      
    </View>
  );
  
  return (
    <View style={{flex:1}}>
      {/* <MyStatusBar backgroundColor="#009387" /> */}
      <AuthContext.Provider value={authContext}>
       {/* <StatusBar backgroundColor="#009387" barStyle="light-content" /> */}
      <NavigationContainer>
        {loginState.userToken !== null ?
          <DrawerStackScreen />
          :
          <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider></View>
  );
}
const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]
    ).then((result) => {
      if (result['android.permission.CAMERA']
        && result['android.permission.RECORD_AUDIO'] === 'granted') {
        console.log('Permission granted')
      } else {
        Alert.alert('Please Go into Settings and  Allow permissions to continue');
      }
    });
  }
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});