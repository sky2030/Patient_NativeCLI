import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import Avatar from "../assets/images/Avatar-icon.png";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
  Foundation,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
const ProfileScreen = ({ navigation }) => {
  const [data, Setdata] = useState({});
  const [loading, setLoading] = useState(true);

  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    //   await fetch(`http://mconnecthealth.com:2000/v1/patient/`)
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
    GetProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.ProfileCard}>
        <View style={styles.avatar}>
          <Image
            source={data.picture == null ? Avatar : { uri: data.picture }}
            style={styles.img}
          />
        </View>
        <Text style={styles.PatientName}>{data.patient_name}</Text>
        <View style={styles.Profileinfo}>
          <View style={styles.row}>
            <Entypo name="mobile" size={32} color="#61041e" />
            <Text style={styles.DetailText}>{data.mobile}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="email" size={32} color="#61041e" />
            <Text style={styles.DetailText}>{data.email}</Text>
          </View>
        </View>
        <View style={styles.Profileinfo}>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="city-variant"
              size={32}
              color="#61041e"
            />
            <Text style={styles.DetailText}>{data.city}</Text>
          </View>
          <View style={styles.row}>
            <Foundation name="torso-female" size={32} color="#61041e" />
            <Text style={styles.DetailText}>{data.mothers_name} </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <Animatable.View animation="fadeInUpBig">
          <View style={styles.cardsrow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("GeneralInfo", { data })}
              style={styles.optionCards}
            >
              <AntDesign name="profile" size={40} color="#f50227" />
              <Text style={styles.smallcardtext}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Myfamily", { data })}
              style={styles.optionCards}
            >
              <Ionicons name="ios-people" size={40} color="#00e823" />

              <Text style={styles.smallcardtext}>My Family</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardsrow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("HealthHistory")}
              style={styles.optionCards}
            >
              <MaterialIcons name="healing" size={40} color="#d40ee6" />

              <Text style={styles.smallcardtext}>Health History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("MedicalProcedures")}
              style={styles.optionCards}
            >
              <FontAwesome5 name="procedures" size={40} color="#0e1ce6" />
              <Text style={styles.smallcardtext}>Procedures</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardsrow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Appointment")}
              style={styles.optionCards}
            >
              <MaterialCommunityIcons
                name="calendar-clock"
                size={40}
                color="#0b635c"
              />
              <Text style={styles.smallcardtext}>Appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Prescription")}
              style={styles.optionCards}
            >
              <Fontisto name="prescription" size={40} color="#9f02e8" />
              <Text style={styles.smallcardtext}>Prescription</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    width: "100%",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
  },
  footer: {
    backgroundColor: "#077464",
    position: "absolute",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    bottom: 1,
  },
  bottomtext: {
    color: "#fff",
    fontSize: 15,
  },
  cardsrow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
    marginTop: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  avatar: {
    flex: 1,
  },
  Profileinfo: {
    flexDirection: "row",
    width: "95%",
  },

  PatientName: {
    color: "#014142",
    marginBottom: 5,
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  smallcardtext: {
    color: "#009387",
    marginVertical: 8,
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  DetailText: {
    color: "#014142",
    marginLeft: 10,
    marginTop: 2,
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  optionCards: {
    borderRadius: 3,
    elevation: 5,
    backgroundColor: "white",
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 12,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "40%",
  },
  ProfileCard: {
    backgroundColor: "#fff",
    borderRadius: 2,
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#fff",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    height: "38%",
    paddingBottom: 20,
    marginBottom: 20,
  },
  img: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
