import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {TextInput, Button, Dialog} from 'react-native-paper';
import moment from 'moment-timezone';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';

// import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import Feather from 'react-native-vector-icons/Feather';
import {RadioButton} from 'react-native-paper';
import AppHeader from '../components/AppHeader';

let NA = 'N/A';
const deviceHeight = Dimensions.get('window').height;
const retnum = (str) => {
  var num = str.replace(/[^0-9]/g, '');
  return parseInt(num, 10);
};

const genderItem = [
  {
    label: NA,
    value: NA,
  },
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];
const maritalstatusItem = [
  {
    label: NA,
    value: NA,
  },
  {
    label: 'Married',
    value: 'Married',
  },
  {
    label: 'UnMarried',
    value: 'UnMarried',
  },
];
const bloodGroupItem = [
  {
    label: NA,
    value: NA,
  },
  {
    label: 'O+',
    value: 'O+',
  },
  {
    label: 'O-',
    value: 'O-',
  },
  {
    label: 'AB+',
    value: 'AB+',
  },
  {
    label: 'AB-',
    value: 'AB-',
  },
  {
    label: 'A+',
    value: 'A+',
  },
  {
    label: 'A-',
    value: 'A-',
  },
  {
    label: 'B+',
    value: 'B+',
  },
  {
    label: 'B-',
    value: 'B-',
  },
];
const weightItem = () => {
  let list = [];
  let index = 1;
  while (index <= 200) {
    list.push(`${index} Kg`);
    index++;
  }
  return list;
};

const heightItem = () => {
  let list = [];
  let index = 30;
  while (index <= 225) {
    list.push(`${index} cm`);
    index++;
  }
  return list;
};
const IdData = {value: '', isDefault: false};
const allergiesData = {value: ''};
function PatientGeneralInfo({navigation, route}) {
  const [id, setId] = useState(route.params.data._id);
  const [email, setemail] = useState(route.params.data.email);
  const [patient_name, setpatient_name] = useState(
    route.params.data.patient_name,
  );
  const [patient_Lastname, setpatient_Lastname] = useState('');
  const [mothers_name, setmothername] = useState(
    route.params.data.mothers_name,
  );

  const [gender, setgender] = useState(route.params.data.gender);
  const [dob, setDOB] = useState(undefined);
  const [picture, setPicture] = useState(route.params.data.picture);
  const [place, setplace] = useState(route.params.data.place);
  const [city, setcity] = useState(route.params.data.city);
  const [state, setstate] = useState(route.params.data.state);
  const [pincode, setpincode] = useState(route.params.data.pincode);
  const [weight, setweight] = useState(route.params.data.weight);
  const [height, setheight] = useState(route.params.data.height);
  const [bloodgroup, setbloodgroup] = useState(route.params.data.bloodgroup);
  const [maritalStatus, setmaritalStatus] = useState(
    route.params.data.maritalStatus,
  );

  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);
  const [healthID, setHealthID] = useState([{...IdData}]);
  const [allergies, setallergies] = useState([{...allergiesData}]);
  const [checked, setChecked] = React.useState('first');
  const [showGenderDialogue, setshowGenderDialogue] = useState(false);
  const [showHeightDialogue, setshowHeightDialogue] = useState(false);
  const [showWeightDialogue, setshowWeightDialogue] = useState(false);

  const showGenderDialog = () => setshowGenderDialogue(true);
  const hideGenderDialog = () => setshowGenderDialogue(false);
  const showHeightDialog = () => setshowHeightDialogue(true);
  const hideHeightDialog = () => setshowHeightDialogue(false);
  const showWeightDialog = () => setshowWeightDialogue(true);
  const hideWeightDialog = () => setshowWeightDialogue(false);

  const separator = () => {
    return <View style={{height: 0.8, backgroundColor: '#009387'}}></View>;
  };

  const _renderGenderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{height: 40, justifyContent: 'center'}}
        onPress={() => {
          setgender(item);
          setshowGenderDialogue(false);
        }}>
        <Text
          style={{fontSize: 18, color: item == gender ? '#009387' : 'black'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const _renderHeightListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{height: 40, justifyContent: 'center'}}
        onPress={() => {
          setheight(item);
          setshowHeightDialogue(false);
        }}>
        <Text
          style={{fontSize: 18, color: item == gender ? '#009387' : 'black'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const _renderWeightListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{height: 40, justifyContent: 'center'}}
        onPress={() => {
          setweight(item);
          setshowWeightDialogue(false);
        }}>
        <Text
          style={{fontSize: 18, color: item == gender ? '#009387' : 'black'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(route.params.data.dob);
      setemail(route.params.data.email);
      setpatient_name(route.params.data.patient_name);
      setmothername(route.params.data.mothers_name);
      setgender(route.params.data.gender);
      setDOB(route.params.data.dob);
      setPicture(route.params.data.picture);
      setplace(route.params.data.place);
      setcity(route.params.data.city);
      setstate(route.params.data.state);
      setpincode(route.params.data.pincode);
      setId(route.params.data._id);
      setweight(route.params.data.weight + ' Kg');
      setheight(route.params.data.height + ' cm');
      setDOB(route.params.data.birthday_millis);
      if (route.params.data.health_ids.length) {
        let temparray = route.params.data.health_ids.map((item) => {
          if (route.params.data.default_health_id == item.id) {
            return {value: item.id, isDefault: true};
          } else {
            return {value: item.id, isDefault: false};
          }
        });
        setHealthID(temparray);
      }
    });
    return unsubscribe;
  }, [route.params.data]);

  const handleDatePicker = (date) => {
    setDOB(date);
    //updateDOB(date);
    setDatePickerAvailable(false);
  };

  const submitData = async () => {
    if (
      email &&
      patient_name &&
      mothers_name &&
      gender &&
      dob &&
      height &&
      weight &&
      picture &&
      place &&
      city &&
      state &&
      pincode
    ) {
      const userToken = await AsyncStorage.getItem('userToken');
      const payload = {
        id,
        email,
        patient_name,
        mothers_name,
        gender,
        dob: moment(dob).format('ll'),
        birthday_millis: moment(dob).format('x'),
        height: `${retnum(height)}`,
        weight: `${retnum(weight)}`,
        picture,
        place,
        city,
        state,
        pincode,
        // health_ids :  (healthID.filter((item)=>item.value !== '')).map((item)=>item.value) || [],
        // default_health_id : healthID.length > 0 ? (healthID.filter((item)=>item.isDefault === true)).length  == 1 ?
        //  (healthID.filter((item)=>item.isDefault === true))[0].value: ''  : ''
      };
      console.log(payload);
      fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.code == 200) {
            Alert.alert(`${patient_name} is Updated successfully`);
            navigation.goBack();
          } else {
            Alert.alert(Alert_Title, data.response);
          }
        })
        .catch((err) => {
          Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
        });
      setTimeout(() => {
        setemail('');
        setpatient_name('');
        setmothername('');
        setgender('');
        setDOB('');
        setPicture('');
        setplace('');
        setcity('');
        setstate('');
        setpincode('');
      }, 1000);
    } else {
      Alert.alert(Alert_Title, 'Fill all fields to complete profile');
    }
  };

  const pickFromGallery = async () => {
    // const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (granted) {
    //   let data = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     //  aspect: [1, 1],
    //     quality: 0.5,
    //     base64: true,
    //   });
    //   // console.log(data.base64);
    //   if (!data.cancelled) {
    //     //  handleUpload(newfile);
    //     setPicture(`data:image/jpeg;base64,${data.base64}`);
    //   }
    // } else {
    //   Alert.alert("you need to give up permission to work");
    // }
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image);
      setPicture(`data:image/jpeg;base64,${image.data}`);
    });
  };
  const pickFromCamera = async () => {
    // const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    // if (granted) {
    //   let data = await ImagePicker.launchCameraAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.allFiles,
    //     allowsEditing: true,
    //     //  aspect: [1, 1],
    //     quality: 0.8,
    //     base64: true,
    //   });
    //   // console.log(data.base64);
    //   if (!data.cancelled) {
    //     //  handleUpload(newfile);
    //     setPicture(data.base64);
    //   }
    // } else {
    //   Alert.alert("you need to give up permission to work");
    // }
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image);
      setPicture(`data:image/jpeg;base64,${image.data}`);
    });
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'skyMedi');
    data.append('cloud_name', 'skycloud55');

    fetch('https://api.cloudinary.com/v1_1/skycloud55/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert('error while uploading');
      });
  };
  const addHealthID = () => {
    setHealthID((healthid) => {
      return [...healthid, IdData];
    });
  };
  const addAllergies = () => {
    setallergies((allergy) => {
      return [...allergy, IdData];
    });
  };
  const deleteHealthID = (item, index) => {
    setHealthID((tempArray) => {
      let tempData = [...tempArray];
      tempData.splice(index, 1);
      return tempData;
    });
  };
  const deleteAllergies = (item, index) => {
    setallergies((tempArray) => {
      let tempData = [...tempArray];
      tempData.splice(index, 1);
      return tempData;
    });
  };
  const selectDefaultID = (item, index) => {
    let tempArray = healthID;
    let updatedArray = tempArray.map((item, indexValue) => {
      if (indexValue === index) {
        return {...item, isDefault: !item.isDefault};
      } else {
        return {
          ...item,
          isDefault: false,
        };
      }
    });
    setHealthID(updatedArray);
  };
  const updateHealthID = (text, index) => {
    let tempArray = healthID;
    let updatedArray = tempArray.map((item, indexValue) => {
      if (indexValue === index) {
        return {...item, value: text};
      } else {
        return {
          ...item,
        };
      }
    });
    setHealthID(updatedArray);
  };
  const updateAllergies = (text, index) => {
    let tempArray = allergies;
    let updatedArray = tempArray.map((item, indexValue) => {
      if (indexValue === index) {
        return {...item, value: text};
      } else {
        return {
          ...item,
        };
      }
    });
    setallergies(updatedArray);
  };
  const _renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          marginRight: 8,
        }}>
        <RadioButton
          // value="first"
          status={item.isDefault ? 'checked' : 'unchecked'}
          onPress={() => selectDefaultID(item, index)}
        />
        <TextInput
          label="Patient Health ID"
          style={styles.idInputStyle}
          value={item.value}
          theme={theme}
          onFocus={() => setenableShift(false)}
          //keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => updateHealthID(text, index)}
        />
        {/* <Text style={{paddingHorizontal : 8, fontWeight : "bold", fontSize : 20}}>@ndhm</Text> */}
        <TouchableOpacity
          onPress={() => {
            deleteHealthID(item, index);
          }}>
          <AntDesign name="delete" color="#75756d" size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderallergiesItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          marginRight: 8,
        }}>
        <TextInput
          label="Allergy"
          style={{...styles.idInputStyle, width: '90%'}}
          value={item.value}
          theme={theme}
          onFocus={() => setenableShift(false)}
          //keyboardType="number-pad"
          // mode="outlined"
          onChangeText={(text) => updateAllergies(text, index)}
        />
        {/* <Text style={{paddingHorizontal : 8, fontWeight : "bold", fontSize : 20}}>@ndhm</Text> */}
        <TouchableOpacity
          onPress={() => {
            deleteAllergies(item, index);
          }}>
          <AntDesign name="delete" color="#75756d" size={20} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <AppHeader
        title={'Update Details'}
        leftIconOnPress={() => navigation.goBack()}
        rightIconOnPress={() => navigation.navigate('Hospital')}
      />
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          // style={styles.root}
          enabled={enableshift}>
          <View style={styles.formHeader}>
            <DateTimePickerModal
              isVisible={isDatePickerAvailable}
              mode="date"
              onConfirm={handleDatePicker}
              onCancel={() => setDatePickerAvailable(false)}
            />
            <TextInput
              label="First Name"
              style={styles.inputStyle}
              value={patient_name}
              onFocus={() => setenableShift(false)}
              theme={theme}
              // mode="outlined"
              onChangeText={(text) => setpatient_name(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Feather name={'user'} size={20} color={'#009387'} />
                  )}
                />
              }
            />
            {/* <TextInput
              label="Last Name"
              style={styles.inputStyle}
              value={patient_Lastname}
              onFocus={() => setenableShift(false)}
              theme={theme}
              mode="outlined"
              onChangeText={(text) => setpatient_Lastname(text)}
            /> */}
            <TextInput
              label="Email"
              style={styles.inputStyle}
              value={email}
              theme={theme}
              onFocus={() => setenableShift(false)}
              // mode="outlined"
              onChangeText={(text) => setemail(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Feather name={'mail'} size={20} color={'#009387'} />
                  )}
                />
              }
            />
            <TextInput
              label="Mother Maiden Name"
              style={styles.inputStyle}
              value={mothers_name}
              theme={theme}
              onFocus={() => setenableShift(false)}
              //keyboardType="number-pad"
              // mode="outlined"
              onChangeText={(text) => setmothername(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <FontAwesome5
                      name={'signature'}
                      size={20}
                      color={'#009387'}
                    />
                  )}
                />
              }
            />
            {/* ***************    add health id     ************* */}
            {/* <View style={{flex:1,  marginVertical :8, paddingVertical :10,
          paddingHorizontal :5, borderColor : "#75756d", 
          ...styles.hwInput
          }}>
            <View style={{flexDirection : "row", backgroundColor : '#009387', paddingVertical :10, justifyContent : "center"}}>
              <Text style={{fontSize :16}}>Add health ids</Text>
            <TouchableOpacity onPress={addHealthID}>
            <Feather name="plus-circle" color="#75756d" size={22} style={{paddingHorizontal : 8}}/>
            </TouchableOpacity>
            </View>
              
            <FlatList
            style={{marginVertical:8, 
            }}
            data={healthID}
            renderItem = {_renderItem}
            />
            </View> */}

            {/* **** add allergies ****** */}
            <View
              style={{
                flex: 1,
                marginVertical: 8,
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderColor: '#75756d',
                ...styles.addAllergiesView,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#009387',
                  paddingVertical: 10,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16}}>Add allergies</Text>
                <TouchableOpacity onPress={addAllergies}>
                  <Feather
                    name="plus-circle"
                    color="#75756d"
                    size={22}
                    style={{paddingHorizontal: 8}}
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                style={{marginVertical: 8}}
                data={allergies}
                renderItem={_renderallergiesItem}
              />
            </View>
            <View style={styles.Subtitle}>
              {/* <TextInput
                label="Date of Birth"
                style={styles.dobStyle}
                value={moment(dob).format("ll")}
                theme={theme}
                onFocus={() => setenableShift(false)}
                //keyboardType="number-pad"
                mode="outlined"
                onChangeText={(text) => setDOB(text)}
              /> */}

              <TouchableOpacity
                style={{
                  color: '#08211c',
                  marginLeft: 10,
                  flex: 1,
                  flexDirection: 'row',
                }}
                onPress={() => setDatePickerAvailable(true)}>
                <AntDesign name="calendar" size={20} color={'#009387'} />
                <Text style={{fontSize: 16, paddingHorizontal: 4}}>
                  {' '}
                  Birthday : {moment(dob).format('ll')}{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.selector}
              onPress={showGenderDialog}>
              <View style={styles.selectView}>
                <Foundation
                  name={'male-female'}
                  size={20}
                  color={'#009387'}
                  style={{marginHorizontal: 8}}
                />
                <Text style={gender == '' ? styles.text : styles.textSelected}>
                  {gender == '' ? 'Select gender' : gender}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selector}
              onPress={showHeightDialog}>
              <View style={styles.selectView}>
                <MaterialCommunityIcons
                  name="human-male-height"
                  size={20}
                  color="#009387"
                  style={{marginHorizontal: 8}}
                />
                <Text style={height === '' ? styles.text : styles.textSelected}>
                  {height === '' ? 'Select height' : height}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selector}
              onPress={showWeightDialog}>
              <View style={styles.selectView}>
                <FontAwesome5
                  name="weight"
                  size={20}
                  color="#009387"
                  style={{marginHorizontal: 8}}
                />
                <Text style={weight === '' ? styles.text : styles.textSelected}>
                  {weight === '' ? 'Select weight' : weight}
                </Text>
              </View>
            </TouchableOpacity>

            {/* <View style={styles.hwInput}>
              <Text style={{ fontSize: 16, marginBottom: 5 }} >Blood Group</Text>
              <RNPickerSelect
                placeholder={{}}
                items={bloodGroupItem}
                onValueChange={(value) => {
                  setbloodgroup(value);
                }}
                style={pickerSelectStyles}
                value={bloodgroup}
                useNativeAndroidPickerStyle={false}
              />
            </View>
            <View style={styles.hwInput}>
              <Text style={{ fontSize: 16, marginBottom: 5 }} >Marital status</Text>
              <RNPickerSelect
                placeholder={{}}
                items={maritalstatusItem}
                onValueChange={(value) => {
                  setmaritalStatus(value);
                }}
                style={pickerSelectStyles}
                value={maritalStatus}
                useNativeAndroidPickerStyle={false}
              />
            </View> */}
            <TextInput
              label="Address"
              style={styles.inputStyle}
              value={place}
              theme={theme}
              onFocus={() => setenableShift(true)}
              //keyboardType="number-pad"
              // mode="outlined"
              onChangeText={(text) => setplace(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Entypo name={'address'} size={20} color={'#009387'} />
                  )}
                />
              }
            />
            <TextInput
              label="City"
              style={styles.inputStyle}
              value={city}
              theme={theme}
              onFocus={() => setenableShift(true)}
              //keyboardType="number-pad"
              // mode="outlined"
              onChangeText={(text) => setcity(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <FontAwesome5 name={'city'} size={20} color={'#009387'} />
                  )}
                />
              }
            />
            <TextInput
              label="State"
              style={styles.inputStyle}
              value={state}
              theme={theme}
              onFocus={() => setenableShift(true)}
              //keyboardType="number-pad"
              // mode="outlined"
              onChangeText={(text) => setstate(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <FontAwesome name={'map-pin'} size={20} color={'#009387'} />
                  )}
                />
              }
            />
            <TextInput
              label="Pin Code"
              style={styles.inputStyle}
              value={pincode}
              theme={theme}
              onFocus={() => setenableShift(true)}
              keyboardType="number-pad"
              // mode="outlined"
              onChangeText={(text) => setpincode(text)}
              left={
                <TextInput.Icon
                  name={() => (
                    <Entypo name={'location-pin'} size={20} color={'#009387'} />
                  )}
                />
              }
            />
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Button
                style={styles.uploadImage}
                icon={picture == '' ? 'upload' : 'check'}
                mode="contained"
                theme={theme}
                onPress={() => setModal(true)}>
                Upload Image
              </Button>

              <Button
                style={styles.uploadImage}
                icon="content-save"
                mode="contained"
                theme={theme}
                onPress={() => submitData()}>
                save
              </Button>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modal}
              onRequestClose={() => {
                setModal(false);
              }}>
              <View style={styles.modalView}>
                <View style={styles.modalButtonView}>
                  <Button
                    icon="camera"
                    theme={theme}
                    mode="contained"
                    onPress={() => pickFromCamera()}>
                    camera
                  </Button>
                  <Button
                    icon="image-area"
                    mode="contained"
                    theme={theme}
                    onPress={() => pickFromGallery()}>
                    gallery
                  </Button>
                </View>
                <Button theme={theme} onPress={() => setModal(false)}>
                  cancel
                </Button>
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Dialog
        visible={showGenderDialogue}
        onDismiss={hideGenderDialog}
        style={{}}>
        <Dialog.Title>Gender</Dialog.Title>
        <Dialog.Content>
          <FlatList
            data={['Male', 'Female']}
            renderItem={_renderGenderListItem}
            ItemSeparatorComponent={separator}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideGenderDialog}>
            <Text style={{color: '#009387'}}>Done</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      {/* ********* */}
      <Dialog
        visible={showHeightDialogue}
        onDismiss={hideHeightDialog}
        style={{height: deviceHeight - 100, overflow: 'hidden'}}>
        <Dialog.Title>Height</Dialog.Title>
        <Dialog.ScrollArea>
          <FlatList
            data={heightItem()}
            renderItem={_renderHeightListItem}
            ItemSeparatorComponent={separator}
          />
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideHeightDialog}>
            <Text style={{color: '#009387'}}>Done</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      {/* ******** */}
      <Dialog
        visible={showWeightDialogue}
        onDismiss={hideWeightDialog}
        style={{height: deviceHeight - 100, overflow: 'hidden'}}>
        <Dialog.Title>Weight</Dialog.Title>
        <Dialog.ScrollArea>
          <FlatList
            data={weightItem()}
            renderItem={_renderWeightListItem}
            ItemSeparatorComponent={separator}
          />
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideWeightDialog}>
            <Text style={{color: '#009387'}}>Done</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const theme = {
  colors: {
    primary: '#009387',
  },
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 5,
    color: 'black',
    fontWeight: '500',
    // width: 90,
    // backgroundColor: "#fff",
  },

  inputAndroid: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 5,
    color: 'black',
    // backgroundColor: "#fff",
    // marginHorizontal: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
});

const styles = StyleSheet.create({
  selector: {
    borderBottomColor: 'grey',

    marginVertical: 7,

    borderBottomWidth: 0.8,

    height: 50,
    width: '90%',
  },
  selectView: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Subtitle: {
    borderBottomWidth: 1,
    borderColor: '#e1e8e3',
    borderBottomColor: 'grey',
    padding: 10,
    marginVertical: 3,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    borderRadius: 5,
  },
  droplist: {
    marginVertical: 10,
    flex: 2,
  },
  dobStyle: {
    margin: 2,
    flex: 2,
  },
  toptext: {
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  formHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: 10,
  },
  buttonNew: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonheader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginRight: 50,
  },

  container: {
    flex: 1,
  },

  inputStyle: {
    margin: 2,
    width: '90%',
    // height: HEIGHT_ROW,
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
  },
  idInputStyle: {
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
  },

  hwInput: {
    borderBottomWidth: 1,
    borderColor: '#e1e8e3',
    borderBottomColor: 'grey',
    padding: 10,
    marginVertical: 3,
    // marginHorizontal: 10,
    width: '90%',
    // flexDirection : "row"
    flexDirection: 'row',
    alignItems: 'center',
  },
  addAllergiesView: {
    borderBottomWidth: 1,
    borderColor: '#e1e8e3',
    borderBottomColor: 'grey',
    padding: 10,
    marginVertical: 3,
    // marginHorizontal: 10,
    width: '90%',
  },
  smallinput: {
    marginHorizontal: 20,
    marginVertical: 2,
    flex: 1,
    height: HEIGHT_ROW,
  },
  uploadImage: {
    margin: 5,
    padding: 5,
    // marginVertical: 10,
    width: '45%',
    backgroundColor: '#009387',
  },
  form: {
    width: '100%',
    marginLeft: 25,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  savebtn: {
    width: 100,
    backgroundColor: '#6564AD',
    color: '#6564AD',
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row',
    borderRadius: 5,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: ELEVATION,
    marginBottom: 20,
    marginLeft: 10,
    height: 50,
    marginRight: 15,
    paddingRight: 5,
    marginLeft: 5,
  },
  cancelbtn: {
    width: 100,
    backgroundColor: '#E71E4F',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row',
    borderRadius: 5,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: ELEVATION,
    marginBottom: 20,
    marginLeft: 10,
    height: 50,
    marginRight: 15,
    paddingRight: 5,
    marginLeft: 5,
  },
  btntext: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default PatientGeneralInfo;
