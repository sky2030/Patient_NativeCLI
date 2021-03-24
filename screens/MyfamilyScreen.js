import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  StatusBar,
  Alert,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Addfamily from '../assets/images/Addfamily.png';
import AsyncStorage from '@react-native-community/async-storage';
// import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment-timezone';
import AppHeader from '../components/AppHeader';

const MyfamilyScreen = ({navigation}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, Setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientId, setpatientId] = useState('');

  const GetFamily = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // let URL = `${BASE_URL}family-members`;
    // console.log(URL);
    fetch(`${BASE_URL}family-members`, {
      method: 'GET',
      headers: {Authorization: userToken},
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (results.code == 200) {
          Setdata(results.data.members);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
    //  console.log("New Data is going to show")
    //  console.log(data.mobile)
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetFamily();
    });
    return unsubscribe;
  }, []);

  const renderList = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={styles.Familycard}
        onPress={() => navigation.navigate('familydetail', {item})}>
        <View style={styles.header}>
          <Text style={styles.headtext1}>{item.name}</Text>
        </View>
        <View style={styles.familybody}>
          <View style={styles.subcard}>
            <Text style={styles.headtext2}>Relation</Text>
            <Text style={styles.headtext2}>{item.relation.toUpperCase()} </Text>
          </View>
          {item.gender == 'Male' ? (
            <FontAwesome5 name="male" size={30} color={PRIMARY_COLOR} />
          ) : (
            <FontAwesome5 name="female" size={30} color={PRIMARY_COLOR} />
          )}
          <View style={styles.subcard}>
            <Text style={styles.headtext2}>Age</Text>
            <Text style={styles.headtext2}>{item.age} </Text>
          </View>
        </View>
        {Number(item.age.replace(' years', '')) < 18 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 40,
              marginVertical: 10,
            }}>
            <MaterialCommunityIcons
              name="information"
              size={18}
              color="#047858"
              style={{marginVertical: 2}}
              onPress={() => navigation.navigate('Hospital')}
            />
            <Text style={styles.Inputs}>
              Guardian should be there while taking online consultation as
              member is a minor.
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <AppHeader
        title={'My Family'}
        leftIconOnPress={() => navigation.goBack()}
        rightIconOnPress={() => navigation.navigate('Hospital')}
      />
      {/* <Text style={styles.Inputs}>
          Guardian should be there with minor while taking online consultation.
        </Text> */}
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item.id}
        onRefresh={() => GetFamily()}
        refreshing={loading}
        ListEmptyComponent={
          <NoDataView text={loading == true ? '' : NO_DATA_FOUND} />
        }
      />

      <TouchableOpacity
        activeOpacity={0.95}
        style={styles.btn}
        onPress={() => navigation.navigate('AddFamily')}>
        <Text style={styles.btntext}>Add Family Member's </Text>
        <Image source={Addfamily} style={styles.addicon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyfamilyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Inputs: {
    fontSize: 13,
    fontWeight: '300',
    color: '#009387',
    textAlign: 'center',
  },
  headtext1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Familycard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#E5F0ED',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginVertical: 10,
  },
  header: {
    backgroundColor: '#192161',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headtext2: {
    color: '#4E557C',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  familybody: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  subcard: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'column',
  },
  deletecard: {
    width: '10%',
  },
  title6: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    flexDirection: 'column',
  },

  btntext: {
    color: '#4E557C',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addicon: {
    width: 35,
    height: 35,
    marginLeft: 20,
  },
  btn: {
    width: 300,
    backgroundColor: '#E5F0ED',
    padding: 25,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flexDirection: 'row',
    borderRadius: 5,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    elevation: 3,
    marginBottom: 35,
    marginLeft: 25,
    flexDirection: 'row',
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
