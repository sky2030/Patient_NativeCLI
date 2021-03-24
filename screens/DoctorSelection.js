import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  ScrollView,
  FlatList,
  SafeAreaView,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from '../assets/images/Avatar-icon.png';
import FemaleDoctor from '../assets/images/FemaleDoctor.png';
import MaleDoctor from '../assets/images/MaleDoctor.png';
import {Searchbar} from 'react-native-paper';
import {AuthContext} from '../components/context';
import AppHeader from '../components/AppHeader';

export default function DoctorSelection({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [deptcode, setdeptcode] = useState('');
  const [hospitalcode, sethospitalcode] = useState('');
  const [hospitalName, sethospitalName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const {signOut} = React.useContext(AuthContext);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const fetchData = async () => {
    await setdeptcode(route.params.item.deptcode);
    await sethospitalName(route.params.hospitalName);
    await sethospitalcode(route.params.hospitalcode);
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log(userToken)
    fetch(
      `${BASE_URL}hospitals/departments/${route.params.item.deptcode}/doctors`,
      {
        method: 'GET',
        headers: {Authorization: userToken},
      },
    )
      .then((res) => res.json())
      .then((results) => {
        console.log(results, 'result======');

        setLoading(false);
        if (results.code == 200) {
          setData(results.data);
        } else if (results.code == 403) {
          Alert.alert(
            Alert_Title,
            results.message,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => signOut()},
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    fetchData();
  }, [route.params]);

  const renderList = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          navigation.navigate('DoctorBooking', {item, hospitalcode})
        }>
        <View style={styles.Doctorcard}>
          <View style={styles.headerNew}>
            <Text style={styles.headtextNew}>
              {' '}
              Dr. {item.first_name} {item.last_name}{' '}
            </Text>
          </View>
          <View style={styles.cardbody}>
            <View style={styles.drImage}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  aspectRatio: 1,
                  borderRadius: 50,
                  borderColor: 'gray',
                  borderWidth: 0.1,
                }}
                source={
                  item.picture
                    ? {uri: item.picture}
                    : item.gender === 'Female'
                    ? FemaleDoctor
                    : MaleDoctor
                }
                resizeMode={'cover'}
              />
              <Text style={styles.rating}> ***** </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.Subhead}>{item.department}</Text>
              {item.experience && (
                <Text style={styles.Subhead}>{`${item.experience} EXP.`}</Text>
              )}
              <Text style={styles.Subhead}>₹ {item.consultation}</Text>
              <Text style={styles.headtext2}>{item.degree}</Text>
              {/* <Text style={styles.headtext2}>{hospitalName}</Text> */}
              <Text style={styles.headtext2}>{item.email}</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DoctorBooking', {item, hospitalcode})
                }
                style={styles.bookingbtn}>
                <Text style={styles.headtext3}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.Slotbottom}>
            <Text style={styles.headtextNew}>AVAILABLE IN 20 MINS </Text>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={'Select a Doctor'}
        leftIconOnPress={() => navigation.goBack()}
        rightIconOnPress={() => navigation.navigate('Hospital')}
      />
      <Searchbar
        style={{margin: 10, marginTop: 20}}
        placeholder="Search Doctor"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        // data={data.filter((item)=> (item.is_approved == true && item.consultation ))}
        data={data.filter((item) => {
          if (
            item.is_approved === true &&
            item.consultation &&
            (item?.first_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
              item?.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
          ) {
            return item;
          }
        })}
        renderItem={({item}) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
        ListEmptyComponent={
          <NoDataView text={loading == true ? '' : NO_DATA_FOUND} />
        }
      />

      <TouchableOpacity
        style={styles.footer}
        onPress={() =>
          // navigation.navigate("PrivacyPolicy")
          Linking.openURL(
            'https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html',
          )
        }>
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  footer: {
    // backgroundColor: "#009387",
    padding: 20,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomtext: {
    color: '#009387',
    fontSize: 15,
  },

  headtext: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '500',
  },

  btnnew: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  headtextNew: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },

  Doctorcard: {
    flex: 1,
    borderRadius: 4,
    elevation: ELEVATION,
    backgroundColor: '#e6ffe6',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginBottom: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginVertical: 20,

    borderBottomLeftRadius: 25,
    borderBottomEndRadius: 25,
  },
  headerNew: {
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  Slotbottom: {
    backgroundColor: '#009387',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 5,
    borderBottomLeftRadius: 25,
    borderBottomEndRadius: 25,
  },
  bookingbtn: {
    backgroundColor: '#009387',
    elevation: ELEVATION,
    borderRadius: 4,
    marginTop: 7,
    marginRight: 40,
    alignSelf: 'flex-end',
  },
  headtext3: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: '500',

    // width: '100%',
    // marginBottom: 5
  },
  headtext2: {
    color: '#929695',
    fontSize: 15,
    fontWeight: '500',

    marginTop: 3,
  },

  rating: {
    color: '#009387',
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 10,
  },

  Subhead: {
    color: '#009387',
    fontSize: 18,
    fontWeight: '500',
    width: '100%',
    marginTop: 3,
    alignItems: 'flex-start',
  },
  cardbody: {
    // alignItems: "center",
    // justifyContent: "center",

    flexDirection: 'row',
    paddingBottom: 10,
    marginHorizontal: 10,
  },

  drImage: {
    // alignSelf: "flex-start",
    // backgroundColor: "#e11",
    justifyContent: 'center',
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: '#333',
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: ELEVATION
  },
  detail: {
    // alignItems: "center",
    // justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    width: '70%',
    // backgroundColor: "#1e1"
  },
});
