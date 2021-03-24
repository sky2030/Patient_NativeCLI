import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Chip } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
let NA = "N/A";
const cityList = [
  {
    label: NA,
    value: NA,
  },
  {
    label: "Delhi",
    value: "Delhi",
  },
  {
    label: "Mathura",
    value: "Mathura",
  },
  {
    label: "Gzb",
    value: "Gzb",
  },
];
const departmentList = [
  {
    label: NA,
    value: NA,
  },
  {
    label: "Neorologist",
    value: "Neorologist",
  },
  {
    label: "Nephrology",
    value: "Nephrology",
  },
  {
    label: "Cardiology",
    value: "Cardiology",
  },
  {
    label: "Orthopadic",
    value: "Orthopadic",
  },

];
export default function SearchScreen() {
  const [doctor_name, setDoctor_name] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const theme = {
    colors: {
      primary: "#006aff",
    },
  };
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 3,
      paddingHorizontal: 5,
      color: "black",
      fontWeight: "500",
      // width: 90,
      backgroundColor: "transparent",
    },
  
    inputAndroid: {
      fontSize: 16,
      fontWeight: "500",
      paddingVertical: 3,
      color: "black",
      backgroundColor: "transparent",
      marginHorizontal: 20,
      width: 200,
      paddingHorizontal: 5
    },
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    root: {
      flex: 1,
      width: "100%",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    inputStyle: {
      margin: 2,
      width: "100%",
      height: 50,
    },
    button: {
      margin: 5,
      padding: 5,
      marginVertical: 20,
      width: "100%",
      backgroundColor: "#009387",
    },
    chip: {
      margin: 3,
    },
    chipView: {
      //   flex: 1,
      flexWrap: "wrap",
      flexDirection: "row",
      marginVertical: 10,
      justifyContent: "center",
    },
    Inputs: {
      fontSize: 18,
      fontWeight: "500",
      marginLeft: 10,
      marginVertical: 10
    },
    hwInput: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderBottomWidth: 3,
      borderBottomColor: 'grey',
      padding: 10,
      fontSize: 18,
      marginHorizontal: 10,
  
    },
  });
  return (
    <View style={styles.container}>
      <Text style={{padding : 10}}>
        Fill atleast one detail to search doctor
      </Text>
      <ScrollView>
        <KeyboardAvoidingView behavior="position" style={styles.root}>
          <TextInput
            label="Doctor Name"
            style={styles.inputStyle}
            value={doctor_name}
            theme={theme}
            mode="outlined"
            onChangeText={(text) => setDoctor_name(text)}
          />
          {/* <TextInput
            label="City"
            style={styles.inputStyle}
            value={city}
            theme={theme}
            mode="outlined"
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            label="Department"
            style={styles.inputStyle}
            value={department}
            theme={theme}
            mode="outlined"
            onChangeText={(text) => setDepartment(text)}
          /> */}
          <Text style={styles.Inputs}>City</Text>
          <View style={styles.hwInput}>
            <RNPickerSelect
              placeholder={{}}
              items={cityList}
              onValueChange={(value) => {
                setCity(value);
              }}
              style={pickerSelectStyles}
              value={city}
              useNativeAndroidPickerStyle={false}
            /></View>
            <Text style={styles.Inputs}>Department</Text>
          <View style={styles.hwInput}>
            <RNPickerSelect
              placeholder={{}}
              items={departmentList}
              onValueChange={(value) => {
                setDepartment(value);
              }}
              style={pickerSelectStyles}
              value={department}
              useNativeAndroidPickerStyle={false}
            /></View>
          {/* <View style={styles.chipView}>
            <Chip
              onPress={() => console.log("Pressed")}
              style={styles.chip}
              selected
            >
              symptoms
            </Chip>
          </View> */}
          <Button
            style={styles.button}
            mode="contained"
            icon="account-search"
            theme={theme}
            onPress={() => {}}
          >
            search
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
