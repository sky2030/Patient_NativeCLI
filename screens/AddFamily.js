import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  // Button,
  // TextInput,
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import {TextInput, Dialog, Button} from 'react-native-paper';

import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-timezone';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AppHeader from '../components/AppHeader';
const deviceHeight = Dimensions.get('window').height;

let NA = 'N/A';

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
const relationItem = [
  'Son',
  'Daughter',
  'Father',
  'Mother',
  'Grand Father',
  'Grand Mother',
  'Wife',
  'Husband',
  'Other',
];

const retnum = (str) => {
  var num = str.replace(/[^0-9]/g, '');
  return parseInt(num, 10);
};

export default function AddFamily({navigation, route}) {
  const [name, SetMemberName] = useState('');
  const [relation, setrelation] = useState('');
  const [birth_millis, setbirthdate] = useState(undefined);
  const [height, setheight] = useState('');
  const [weight, setweight] = useState('');
  const [gender, setGender] = useState('');
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);
  const [showGenderDialogue, setshowGenderDialogue] = useState(false);
  const [showHeightDialogue, setshowHeightDialogue] = useState(false);
  const [showWeightDialogue, setshowWeightDialogue] = useState(false);
  const [showRelationDialogue, setshowRelationDialogue] = useState(false);

  const showGenderDialog = () => setshowGenderDialogue(true);
  const hideGenderDialog = () => setshowGenderDialogue(false);
  const showHeightDialog = () => setshowHeightDialogue(true);
  const hideHeightDialog = () => setshowHeightDialogue(false);
  const showWeightDialog = () => setshowWeightDialogue(true);
  const hideWeightDialog = () => setshowWeightDialogue(false);
  const showRelationDialog = () => setshowRelationDialogue(true);
  const hideRelationDialog = () => setshowRelationDialogue(false);

  const separator = () => {
    return <View style={{height: 0.8, backgroundColor: '#009387'}}></View>;
  };

  const _renderGenderListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{height: 40, justifyContent: 'center'}}
        onPress={() => {
          setGender(item);
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
  const _renderRelationListItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{height: 40, justifyContent: 'center'}}
        onPress={() => {
          setrelation(item);
          setshowRelationDialogue(false);
        }}>
        <Text
          style={{fontSize: 18, color: item == gender ? '#009387' : 'black'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  const handleDatePicker = (date) => {
    console.log(moment(date).format('x'));
    setbirthdate(date);
    setDatePickerAvailable(false);
  };
  const submitData = async () => {
    // await setpatientId(route.params.patientId);
    const userToken = await AsyncStorage.getItem('userToken');
    let payload = {
      name,
      relation,
      gender,
      birth_millis: moment(birth_millis).format('x'),
      height: `${retnum(height)}`,
      weight: `${retnum(weight)}`,
    };
    console.log(JSON.stringify(payload));
    let URL = `${BASE_URL}family-members/add`;
    console.log(URL);
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          Alert.alert(`${name} is saved successfully`);
          navigation.navigate('Myfamily');
        } else {
          Alert.alert(Alert_Title, data.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setGender('');
      SetMemberName('');
      setrelation('');
      setbirthdate(undefined);
      setheight('');
      setweight('');

      // console.log(route.params)
    });

    return unsubscribe;
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <AppHeader
          title={'Add Family Member'}
          leftIconOnPress={() => navigation.goBack()}
          rightIconOnPress={() => navigation.navigate('Hospital')}
        />
        <ScrollView style={{paddingHorizontal: 20}}>
          <TextInput
            theme={theme}
            label="Enter Name"
            style={styles.input}
            value={name}
            onChangeText={(text) => SetMemberName(text)}
            left={
              <TextInput.Icon
                name={() => (
                  <Feather name={'user'} size={20} color={'#009387'} />
                )}
              />
            }
          />
          {/* <TextInput
              style={styles.input}
              placeholder="Birthdate of Family Member"
              value={birth_millis != undefined ? moment(birth_millis).format("ll") : ""}
              mode="outlined"
              onChangeText={(text) => setbirthdate(text)}
            />  */}

          <TouchableOpacity
            style={styles.hwInput}
            onPress={() => setDatePickerAvailable(true)}>
            <AntDesign name="calendar" size={20} color="#009387" />
            <Text style={styles.Inputs}>
              {' '}
              Date of Birth :{' '}
              {birth_millis != undefined
                ? moment(birth_millis).format('ll')
                : ''}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerAvailable}
            mode="date"
            maximumDate={new Date()}
            onConfirm={handleDatePicker}
            onCancel={() => setDatePickerAvailable(false)}
          />
          <TouchableOpacity style={styles.selector} onPress={showGenderDialog}>
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
          <TouchableOpacity style={styles.selector} onPress={showHeightDialog}>
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
          <TouchableOpacity style={styles.selector} onPress={showWeightDialog}>
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
          <TouchableOpacity
            style={styles.selector}
            onPress={showRelationDialog}>
            <View style={styles.selectView}>
              <MaterialIcons
                name="family-restroom"
                size={20}
                color="#009387"
                style={{marginHorizontal: 8}}
              />
              <Text style={relation === '' ? styles.text : styles.textSelected}>
                {relation === '' ? 'Select Relation' : relation}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{marginVertical: 20}}>
            <Button
              style={{backgroundColor: '#047858'}}
              color="#fff"
              onPress={() => submitData()}>
              Submit
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: "center",
              marginHorizontal: 8,
            }}>
            <MaterialCommunityIcons
              name="information"
              size={20}
              color="#047858"
              style={{marginVertical: 2}}
              onPress={() => navigation.navigate('Hospital')}
            />
            <Text style={styles.note}>
              Guardian should be there while taking online consultation if the
              member you are adding is a minor (below 18 years).
            </Text>
          </View>
        </ScrollView>
        {/* ********* */}
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
        {/* ********* */}
        <Dialog
          visible={showRelationDialogue}
          onDismiss={hideRelationDialog}
          // style={{height: deviceHeight - 100, overflow: 'hidden'}}
        >
          <Dialog.Title>Relation</Dialog.Title>
          <Dialog.ScrollArea>
            <FlatList
              data={relationItem}
              renderItem={_renderRelationListItem}
              ItemSeparatorComponent={separator}
            />
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideRelationDialog}>
              <Text style={{color: '#009387'}}>Done</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    </TouchableWithoutFeedback>
  );
}
const theme = {
  colors: {
    primary: '#009387',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  Inputs: {
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  note: {
    color: '#009387',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 10,
    // textAlign : "center"
    // marginVertical: 10
  },
  header: {
    width: '100%',
    backgroundColor: '#E5F0ED',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  btntext: {
    color: '#4E557C',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Subtitle: {
    borderWidth: 1,
    borderBottomWidth: 3,
    borderBottomColor: 'grey',
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  selector: {
    borderBottomColor: 'grey',
    marginVertical: 7,
    borderBottomWidth: 0.8,
    height: 50,
  },
  selectView: {
    height: 40,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
  },
  hwInput: {
    // borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 10,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 10,
  },

  inputlast: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    height: 38,
    marginHorizontal: 10,
    marginVertical: 10,
    borderBottomColor: 'black',
    height: HEIGHT_ROW,
  },
});

export const images = {
  ratings: {
    1: require('../assets/rating-1.png'),
    2: require('../assets/rating-2.png'),
    3: require('../assets/rating-3.png'),
    4: require('../assets/rating-4.png'),
    5: require('../assets/rating-5.png'),
  },
};
