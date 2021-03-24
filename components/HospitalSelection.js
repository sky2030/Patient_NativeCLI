import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const HospitalSelection = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // console.log(userToken)
    await fetch("http://mconnecthealth.com:2000/v1/patient/hospitals", {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        //  console.log(results.data)
        setData(results.data);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert("Something Went Wrong" + err);
      });

    // console.log(` Hospital Data from DB ${data}`)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={styles.HospitalCard}
        onPress={() => navigation.navigate("Speciality", { item })}
      >
        <View style={styles.headerNew}>
          <Text style={styles.headtextNew}> {item.hospitalname} </Text>
        </View>
        <View style={styles.cardbody}>
          <View style={styles.drImage}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.picture }}
            />
          </View>
          <View style={styles.detail}>
            <Text style={styles.headtext2}>{item.place} </Text>
            <Text style={styles.headtext2}> {item.city}</Text>
            <Text style={styles.headtext2}>{item.state}</Text>
            <Text style={styles.headtext2}> {item.hospitalcode}</Text>
            <View style={styles.btnnew}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />

      {/* <TouchableOpacity
                activeOpacity={0.95} 
                style={styles.HospitalCard}
                onPress={()=>navigation.navigate("Speciality")}>
        
               <View style={styles.headerNew}>
                    <Text style={styles.headtextNew}> Apollo Hospital </Text>
                </View>
               <View style={styles.cardbody}>
                        <View style={styles.drImage}>
                        <Image
                      style={{width:100,height:100}}
                      source={hospitalNew} 
                        />
                        </View>
                    <View style={styles.detail}>
                                  <Text style={styles.headtext2}>Registeration No-10023234 </Text>
                                  <Text style={styles.headtext2}> New Delhi </Text>
                                  <Text style={styles.headtext2}>Pin Code-110017 </Text>
                                  <Text style={styles.headtext2}> Rating: ***** </Text>
                                  <View style={styles.btnnew}>
                                  </View>
                      </View>
               </View>      
   
            </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 40,
    width: "100%",
  },
  head: {
    backgroundColor: "#58DCFC",
    padding: 20,
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    backgroundColor: "#493187",
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
  header: {
    color: "black",
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  headtext: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },

  btnnew: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 80,
    marginTop: 10,
  },

  headtextNew: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  HospitalCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#e6ffe6",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  headerNew: {
    backgroundColor: "#07a9b8",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headerNew1: {
    backgroundColor: "#3385ff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 35,
    padding: 5,
    elevation: 2,
    borderRadius: 4,
  },
  headtext3: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    width: "100%",
    marginBottom: 5,
  },
  headtext2: {
    color: "#4E557C",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    width: "100%",
  },
  cardbody: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10,
    flex: 1,
  },

  drImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "28%",
    marginHorizontal: 10,
  },
  detail: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "column",
    flex: 2,
    width: "70%",
  },
  headtextTop: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 70,
    color: "#fff",
  },
  headTop: {
    backgroundColor: "#07a9b8",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
});

export default HospitalSelection;
