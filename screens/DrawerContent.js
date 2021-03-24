import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert, Text, SafeAreaView } from "react-native";

import Profile from "../assets/images/Avatar-icon.png";
import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../components/context";
import { useFocusEffect } from '@react-navigation/native';
// import {
//   Fontisto,
//   FontAwesome5,
//   MaterialIcons,
//   MaterialCommunityIcons,
//   AntDesign
// } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AntDesign from "react-native-vector-icons/AntDesign";


export function DrawerContent(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //   console.log(userToken)
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then(async(results) => {
        if (results.code == 200) {
          console.log(results, "result=====GetProfile");
           await AsyncStorage.setItem('userData',JSON.stringify(results.data) )
          setData(results.data);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  useEffect(() => {
    GetProfile();
  }, []);


  const { signOut } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignItems: "center", marginVertical: 10 }}>
                <Avatar.Image
                  source={
                    data?.picture == null ? Profile : { uri: data?.picture }
                  }
                  size={60}
                />
                {/* <Caption
                  style={{
                    marginTop: 5,
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {data.gender}
                </Caption> */}
              </View>

              <View style={{ marginLeft: 18, flex: 1 }}>
                <Title style={styles.title}>{data?.patient_name}</Title>
                <View style={{flexDirection : "row"}}>
                <MaterialIcons name="phone" size={24} color="#009387" size={18} />
                  <Caption style={styles.caption}>{data?.mobile}</Caption>
                </View>
                {/* <Caption style={styles.caption}>{data.email}</Caption>
                <Caption style={styles.caption}>{data.city}</Caption> */}
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="home" size={24} color="#009387" />
              )}
              label="Dashboard"
              labelStyle={{ textAlign: "left" }}
              onPress={() => {
                props.navigation.navigate("Hospital");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="profile" size={24} color="#009387" />
              )}
              label="Profile"
              labelStyle={{ textAlign: "left" }}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="calendar" size={24} color="#009387" />
              )}
              label="Appointments"
              labelStyle={{ textAlign: "left" }}
              onPress={() => {
                props.navigation.navigate("Appointment");
              }}
            />
            <DrawerItem

              icon={({ color, size }) => (

                <FontAwesome5 name="prescription" size={24} color="#009387" />
              )}
              label="  Prescriptions"
              onPress={() => {
                props.navigation.navigate("PrescriptionHistory", { appointment_id: undefined });
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="payment" size={24} color="#009387" />
              )}
              label="Transaction"
              onPress={() => {
                props.navigation.navigate("Transaction");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="contact-phone" size={24} color="#009387" />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("Contactus");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color="#009387" size={30} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    borderBottomWidth: 1,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    color: "black",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
