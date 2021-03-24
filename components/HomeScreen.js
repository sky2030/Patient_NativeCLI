import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import Header from "../assets/images/Header.png";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Fontisto,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
const HomeScreen = ({ navigation }) => {
  const [data, Setdata] = useState({});
  const [loading, setLoading] = useState(true);

  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //   console.log(userToken)
    fetch(`http://mconnecthealth.com:2000/v1/patient/`, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        // console.log(results.data.mobile)
        Setdata(results.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    //  console.log("New Data is going to show")
    //  console.log(data.mobile)
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      GetProfile();
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          style={styles.imgBackground}
          source={Header}
        ></ImageBackground>
      </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.intro}>Welcome, </Text>
          <Text style={styles.PatientName}>{data.patient_name} </Text>
        </View>
        <Text style={styles.intro}>How can we help you? </Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.CardRows}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Hospital")}
          style={styles.card}
        >
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Fontisto name="doctor" size={45} color="#0b635c" />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.cardtext}>Book Doctor</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PrescriptionHistory")}
          style={styles.card}
        >
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Fontisto name="prescription" size={45} color="#0b635c" />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.cardtext}>Prescriptions</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.CardRows}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Transaction")}
          style={styles.card}
        >
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <FontAwesome5 name="money-check" size={40} color="#0b635c" />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.cardtext}>Transactions</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Appointment")}
          style={styles.card}
        >
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={45}
              color="#0b635c"
            />
          </View>
          <View style={{ flex: 2 }}>
            <Text style={styles.cardtext}>Upcoming Appointment</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  footer: {
    // backgroundColor: "#077464",
    position: "absolute",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 1,
  },
  bottomtext: {
    color: "#077464",
    fontSize: 15,
  },

  PatientName: {
    color: "#0b635c",
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontStyle: "italic",
  },
  intro: {
    color: "#0b635c",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
    marginTop: 7,
  },
  cardtext: {
    color: "#0b635c",
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  CardRows: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },

  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 70,
    width: "45%",
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    resizeMode: "cover",
  },
  header: {
    width: "100%",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    height: "45%",
  },
});
