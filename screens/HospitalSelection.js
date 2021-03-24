import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const screenWidth = Math.round(Dimensions.get('window').width);
import Hospital from './../assets/images/Hospital.gif';
import {Searchbar} from 'react-native-paper';
import {AuthContext} from '../components/context';

const HospitalSelection = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const {signOut} = React.useContext(AuthContext);

  const checkUserData = async () => {
    // const userData = await AsyncStorage.getItem("userData");
    // console.log(JSON.parse(userData), "JSON.parse(userData)")
    // let data = JSON.parse(userData);
    // if (
    //   data?.birthday_millis &&
    //   data?.dob &&
    //   data?.height &&
    //   data?.weight &&
    //   data?.place &&
    //   data?.state &&
    //   data?.pincode &&
    //   data?.city
    // ) {
    // } else {
    //   navigation.navigate("Profile");
    // }
    const userToken = await AsyncStorage.getItem('userToken');
    fetch(BASE_URL, {
      method: 'GET',
      headers: {Authorization: userToken},
    })
      .then((res) => res.json())
      .then(async (results) => {
        if (results.code == 200) {
          console.log(results, 'result=====GetProfile');
          await AsyncStorage.setItem('userData', JSON.stringify(results.data));
          if (
            results.data?.birthday_millis &&
            results.data?.dob &&
            results.data?.height &&
            results.data?.weight &&
            results.data?.place &&
            results.data?.state &&
            results.data?.pincode &&
            results.data?.city
          ) {
          } else {
            navigation.navigate('Profile');
          }
        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  useEffect(() => {
    checkUserData();
  }, []);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    fetch(`${BASE_URL}hospitals`, {
      method: 'GET',
      headers: {Authorization: userToken},
    })
      .then((res) => res.json())
      .then(async (results) => {
        console.log(results, 'results==hospitals===');
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
        setLoading(false);
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, []);

  const renderList = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={styles.HospitalCard}
        onPress={() => navigation.navigate('HospitalHome', {item})}>
        <View
          style={{
            height: 35,
            backgroundColor: '#009387',
            justifyContent: 'center',
          }}>
          <Text style={styles.heading}>
            {item.hospitalname === 'Clinic'
              ? `Book Doctor in Clinics`
              : item.hospitalname}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: screenWidth / 2.7,
              aspectRatio: 1.2,
              paddingVertical: 12,
              paddingLeft: 12,
              borderRadius: 5,
            }}>
            <Image
              style={styles.img}
              source={
                item.picture && item.picture !== ''
                  ? {uri: item.picture}
                  : Hospital
              }
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.detail}>
            {/* <Text style={styles.headtextNew}>{item.hospitalname} </Text> */}
            <Text style={styles.headtext2}>{item.place}</Text>
            <Text style={styles.headtext2}>
              {item.landmark}, {item.city}
            </Text>
            <Text style={styles.headtext2}>
              {item.state}, {item.pincode}
            </Text>
            <View style={styles.btnnew}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <Searchbar
        style={{marginHorizontal: 10, marginTop: 10}}
        placeholder="Search Hospital"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList
        style={{marginTop: 10}}
        // data={data}
        data={data.filter((item) => {
          if (
            item?.hospitalname.toLowerCase().includes(searchQuery.toLowerCase())
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 40,
    width: '100%',
  },
  head: {
    backgroundColor: '#58DCFC',
    padding: 20,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#493187',
    padding: 20,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  bottomtext: {
    color: '#fff',
    fontSize: 15,
  },
  header: {
    color: 'black',
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headtext: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },

  btnnew: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 80,
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 10,
  },

  headtextNew: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
    // marginLeft: 20,
  },

  HospitalCard: {
    // flexDirection: "row",
    borderRadius: 15,
    elevation: ELEVATION,
    backgroundColor: 'white',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // alignItems: "center",
    // justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  headerNew: {
    backgroundColor: '#07a9b8',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopLeftRadius: 20,
  },
  headerNew1: {
    backgroundColor: '#3385ff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 35,
    padding: 5,
    elevation: ELEVATION,
    borderRadius: 4,
  },
  headtext3: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    width: '100%',
    marginBottom: 5,
  },
  headtext2: {
    color: '#4E557C',
    fontSize: 16,
    marginTop: 5,
    flex: 1,
    marginRight: 10,
    // marginLeft: 30,
  },
  cardbody: {
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#1e1',
  },

  detail: {
    marginLeft: 20,
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    //marginLeft:10,
    // backgroundColor: "#1e1"
  },
  headtextTop: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 70,
    color: '#fff',
  },
  headTop: {
    backgroundColor: '#07a9b8',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  img: {
    height: 100,
    width: 100,
    // flex: 1,
    borderRadius: 5,
  },
});

export default HospitalSelection;
