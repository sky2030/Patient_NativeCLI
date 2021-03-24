import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Keyboard,
  // TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

import {Appbar, Button, TextInput, Dialog} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-timezone';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import AppHeader from '../components/AppHeader';

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

const FamilyDetail = ({navigation, route}) => {
  // const { name, _id, relation, birthdate, phone } = route.params.item;
  const [id, SetMemberID] = useState('');
  const [name, SetMemberName] = useState('');
  const [relation, setrelation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [birth_millis, setbirthdate] = useState(undefined);
  const [height, setheight] = useState('');
  const [weight, setweight] = useState('');
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
        key={item}
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
        key={item}
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
        key={item}
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
        key={item}
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
      birth_millis: moment(birth_millis).format('x'),
      height: `${retnum(height)}`,
      weight: `${retnum(weight)}`,
      gender,
      id,
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
          Alert.alert(`${name} is Update successfully`);
          navigation.navigate('Profile');
        } else {
          Alert.alert(Alert_Title, data.message);
        }
      })
      .catch(() => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Birthday Millies: ' + route.params.item.birth_millis);
      SetMemberName(route.params.item.name);
      setrelation(route.params.item.relation);
      setbirthdate(route.params.item.birth_millis);
      setAge(route.params.item.age);
      setheight(route.params.item.height + ' cm');
      setweight(route.params.item.weight + ' Kg');
      SetMemberID(route.params.item.id);
      setGender(route.params.item.gender);

      // console.log(route.params)
    });

    return unsubscribe;
  }, [route.params.item]);

  const DeleteMember = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let URL = `${BASE_URL}family-members/${route.params.item.id}`;
    console.log(URL);
    fetch(URL, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          navigation.navigate('Myfamily');
        }
        Alert.alert(Alert_Title, data.message);
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <AppHeader
          title={'Family Member Detail'}
          leftIconOnPress={() => navigation.goBack()}
          rightIconOnPress={() => navigation.navigate('Hospital')}
        />
        <ScrollView style={{padding: 20, backgroundColor: '#fff', flex: 1}}>
          <TextInput
            theme={theme}
            label="Enter Name"
            style={styles.input}
            value={name}
            onChangeText={(text) => SetMemberName(text)}
            left={
              <TextInput.Icon
                name={() => (
                  <FontAwesome5
                    name={'user-edit'}
                    size={20}
                    color={'#009387'}
                  />
                )}
              />
            }
          />
          <TouchableOpacity
            style={styles.hwInput}
            onPress={() => setDatePickerAvailable(true)}>
            <FontAwesome name="birthday-cake" size={18} color="#047858" />
            <Text style={styles.Inputs}>
              {moment(birth_millis).format('ll')}, {age}
            </Text>
          </TouchableOpacity>
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

          <DateTimePickerModal
            isVisible={isDatePickerAvailable}
            mode="date"
            onConfirm={handleDatePicker}
            onCancel={() => setDatePickerAvailable(false)}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: 10,
              marginTop: 10,
            }}>
            <Button
              icon="account-edit"
              mode="contained"
              theme={theme}
              onPress={() => submitData()}>
              Save
            </Button>
            <Button
              icon="delete"
              mode="contained"
              theme={theme}
              onPress={() => DeleteMember()}>
              Delete Member
            </Button>
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
};

const theme = {
  colors: {
    primary: '#009387',
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
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
  headTop: {
    backgroundColor: '#21ada2',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },
  Updatehead: {
    marginTop: 10,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#015952',
    fontSize: 25,
    fontWeight: '900',
  },
  Inputs: {
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
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
  back: {
    padding: 10,
    color: 'white',
  },

  titletext: {
    color: 'white',
    fontSize: 21,
    fontWeight: '500',
    textAlign: 'center',
    width: '80%',
  },
  Subtitle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 2,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'transparent',
  },
  inputlast: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 20,
    borderBottomColor: 'black',
  },
  mycard: {
    marginTop: 10,
    marginHorizontal: 2,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 5,
  },
  mytext: {
    fontSize: 22,
    marginTop: 3,
    marginHorizontal: 15,
  },
});
export default FamilyDetail;
