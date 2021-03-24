import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";

import Watch from "../assets/images/Watch.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DatePicker from "../components/Datetimepicker";
import AsyncStorage from "@react-native-community/async-storage";

// let Timecolor="#D2E0DE";
const DoctorBooking = ({ navigation, route }) => {
  let { deptcode } = route.params.item;
  const [Timecolor, setTimecolor] = useState("#D2E0DE");
  const [Doctor, setDoctor] = useState({});
  const [hospitalcode, sethospitalcode] = useState("");
  const Timehandler = (event) => {
    setTimecolor("lightblue");
  };

  //   objToQueryString(obj) {
  //     const keyValuePairs = [];
  //     for (const key in obj) {
  //         keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  //     }
  //     return keyValuePairs.join('&');
  // }

  const fetchData = async () => {
    await sethospitalcode(route.params.hospitalcode);
    // await setDoctor(route.params.item._1d)
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);
    let URL = `http://95d3131e0e56.ngrok.io  /v1/patient/doctorslots?code=${hospitalcode}&did=${route.params.item._id}&day_from=1600626600000&day_to=1601404200000`;
    console.log(URL);
    fetch(
      URL,
      //        fetch(`http://95d3131e0e56.ngrok.io  /v1/patient/doctorslots?code=${hospitalcode}&did=${route.params.item._id}&day_from=1600626600000&day_to=1601404200000`,
      { method: "GET", headers: { Authorization: userToken } }
    )
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        //  setData(results.data)
        // setLoading(false)
      })
      .catch((err) => {
        Alert.alert("Something Went Wrong" + err);
      });
  };

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener("focus", () => {
      setDoctor(route.params.item);
      sethospitalcode(route.params.hospitalcode);
      console.log(route.params.hospitalcode);
      console.log(route.params.item._id);
    });
    return unsubscribe;
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.headTop}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtextTop}>Booking Slot's </Text>
      </View>

      <ScrollView style={styles.selectDoctor}>
        <View style={styles.card}>
          <View style={styles.Drhead}>
            <Text style={styles.DrName}>
              Dr. {Doctor.first_name} {Doctor.last_name}{" "}
            </Text>
          </View>

          <View style={styles.Drinfo}>
            <View style={{ flex: 1, padding: 10 }}>
              <Image source={{ uri: Doctor.picture }} style={styles.img} />
            </View>
            <View style={{ flex: 2, marginVertical: 10 }}>
              <Text style={styles.SlotDate}>{Doctor.designation}</Text>
              <Text style={styles.headtext}>{Doctor.degree}</Text>
              <Text style={styles.headtext}>
                Consultation Fees: Rs.{Doctor.consultation}{" "}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.MiddleCard}>
          {/* <View style={styles.offline}> 
               <CheckBox/>
                 <Text style={styles.headtext}>Hospital Visit Appointment</Text> 
               </View> */}
          <View style={styles.offline}>
            <Text style={styles.headtext}>Next Available OPD on :</Text>
            <Text style={styles.SlotDate}> 10- Aug-2020 </Text>
          </View>
          <View style={styles.dateselect}>
            <Text style={styles.headtext}>Choose Another Date </Text>
            <View style={styles.calendar}>
              <DatePicker />
            </View>
          </View>
          <Text style={styles.headtext}>Consultation Type</Text>
          <View style={styles.typestyle}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => Alert.alert("Simple Button pressed")}
              style={styles.consulttype}
            >
              <Text style={styles.btntext}>Self</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => Alert.alert("Simple Button pressed")}
              style={styles.consulttype}
            >
              <Text style={styles.btntext}>For Family</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => Alert.alert("Simple Button pressed")}
              style={styles.consulttype}
            >
              <Text style={styles.btntext}>Offline</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.Bookinghead}>
          <Text style={styles.Bookingheadtext}>Booking Slots Status</Text>
        </View>

        <View style={styles.row1}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => Timehandler()}>
            {/* style={[styles.timers,{backgroundColor:Timecolor}]} */}
            <View style={styles.timers}>
              <Image source={Watch} style={styles.watches} />
              <Text style={styles.headtext2}>09:00 AM</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.timers}>
            <Image source={Watch} style={styles.watches} />
            <Text style={styles.headtext2}>09:30 AM</Text>
          </View>
          <View style={styles.timers}>
            <Image source={Watch} style={styles.watches} />
            <Text style={styles.headtext2}>10:00 AM</Text>
          </View>
        </View>

        <View style={styles.row1}>
          <View style={styles.timers}>
            <Image source={Watch} style={styles.watches} />
            <Text style={styles.headtext2}>10:30 AM</Text>
          </View>
          <View style={styles.timers}>
            <Image source={Watch} style={styles.watches} />
            <Text style={styles.headtext2}>11:00 AM</Text>
          </View>
          <View style={styles.timers}>
            <Image source={Watch} style={styles.watches} />
            <Text style={styles.headtext2}>11:30 AM</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.headTop}
        onPress={() => navigation.navigate("Appointment")}
      >
        <Text style={styles.paytext}>Proceed To Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoctorBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    padding: 10,
    color: "#fff",
  },
  headTop: {
    backgroundColor: "#076961",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  paytext: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 100,
    color: "#fff",
    margin: 10,
  },
  headtextTop: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 70,
    color: "#fff",
  },
  offline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  selectDoctor: {
    height: 175,
  },
  head: {
    backgroundColor: "#58DCFC",
    padding: 15,
    height: 60,
    width: "100%",
  },
  dateselect: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendar: {
    marginLeft: 20,
  },
  typestyle: {
    flexDirection: "row",
    marginTop: 10,
  },
  consulttype: {
    backgroundColor: "#009387",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: 30,
    padding: 5,
    elevation: 2,
    borderRadius: 4,
    marginLeft: 5,
  },

  btntext: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  footer: {
    backgroundColor: "#58DCFC",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomtext: {
    color: "#fff",
    fontSize: 15,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headtext: {
    color: "#08211c",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  SlotDate: {
    color: "#074a44",
    marginBottom: 5,
    fontSize: 22,
    fontWeight: "bold",
  },
  DrName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  Drhead: {
    width: "100%",
    backgroundColor: "#009387",
    alignItems: "center",
  },
  Drinfo: {
    flexDirection: "row",
  },
  headtext2: {
    color: "black",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },

  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#e6ffe6",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  MiddleCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#e6ffe6",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 15,
    paddingLeft: 15,
  },

  timers: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#e6ffe6",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },

  cardContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },

  input3: {
    marginBottom: 15,
    marginTop: 15,
  },
  Bookinghead: {
    alignItems: "center",
  },
  Bookingheadtext: {
    marginVertical: 5,
    fontSize: 25,
    color: "#074a44",
    fontWeight: "bold",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  watches: {
    width: 50,
    height: 50,
  },
});
