import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Linking
} from "react-native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SplashLogo from "../assets/images/motherson.png";
import logo from "../assets/images/logo.png";
import motherSonLogo from "../assets/images/motherSonLogo.png";




const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
    
      <View style={styles.header}>
      <Image
          source={motherSonLogo}
          style={styles.motherSonlogo}
        resizeMode='contain'
        />
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={logo}
          style={styles.logo}
        resizeMode='contain'
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay connected with your Doctors!</Text>
        <Text style={styles.text}>Get expert advice at your finger tips!</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignInScreen")}
            style={styles.signIn}
          >
            <Text style={styles.textSign}>Get Started</Text>
            <MaterialIcons name="navigate-next" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.95}
             onPress={() => 
            //  navigation.navigate("PrivacyPolicy")
             Linking.openURL('https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html')
             } style={styles.privacyfooter}>
              <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
             </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height, width } = Dimensions.get("screen");
const height_logo = height * 0.28;
const width_logo = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    elevation: ELEVATION,
    backgroundColor: "#f0faf9",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.8,
    shadowRadius: 7,
    borderRadius: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  privacyfooter:{
    height: 40,
    // width : "100%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    position : "absolute",
    alignSelf : "center",
    bottom : 0
},
bottomtext:{
//  color:'#e01d5e',
color : "#009387",
 fontSize: 15,
//  fontWeight:'bold'
},
motherSonlogo :{height :50, width :width /3, 
  position : "absolute", bottom : 0, alignSelf : "flex-end",
},
  logo: {
    width: width_logo,
    height: height_logo,
    // flex: 2,
    // width: "75%",
    // height: "20%",
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    backgroundColor: "#009387",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "#fff",
    fontWeight: "bold",
  },
});
