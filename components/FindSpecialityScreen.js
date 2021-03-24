import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import AppHeader from './AppHeader';

const FindSpecialityScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hospitalcode, sethospitalcode] = useState('');
  const [hospitalName, sethospitalName] = useState('');
  const [hospital, sethospital] = useState({});

  const fetchData = async () => {
    await sethospitalcode(route.params.item.hospitalcode);
    await sethospitalName(route.params.item.hospitalname);
    await sethospital(route.params.item);
    const userToken = await AsyncStorage.getItem('userToken');
    console.log(route.params);
    fetch(
      `http://mconnecthealth.com:2000/v1/patient/hospitals/${route.params.item.hospitalcode}/departments`,
      {method: 'GET', headers: {Authorization: userToken}},
    )
      .then((res) => res.json())
      .then((results) => {
        // console.log(results)
        setData(results.data);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert('Something Went Wrong' + err);
      });
    //  console.log(hospitalName)
    console.log(` Hospital Data from DB ${data}`);
  };

  useEffect(() => {
    fetchData();
  }, [route.params.item]);

  const renderList = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Doctors', {item, hospitalName, hospitalcode})
        }
        style={styles.card}>
        <View>
          <Image source={{uri: item.picture}} style={styles.img} />
        </View>
        <View style={styles.dept}>
          <Text style={styles.headtext}>{item.departmentname}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.header}>Select a Department</Text>
      </View>
      {/* <AppHeader
        title={'Select a Department'}
        leftIconOnPress={() => navigation.goBack()}
        // rightIconOnPress={() => navigation.navigate('Hospital')}
      /> */}
      <View style={styles.hospitaltitle}>
        <Text style={styles.hospitaltext}>{hospitalName}</Text>
      </View>

      <View style={styles.Deptbody}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return renderList(item);
          }}
          keyExtractor={(item) => item._id}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />
      </View>
    </View>
  );
};

export default FindSpecialityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  Deptbody: {
    flex: 1,
  },
  dept: {
    paddingLeft: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    backgroundColor: '#21ada2',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    alignItems: 'center',
  },

  hospitaltitle: {
    backgroundColor: '#0e4a75',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  hospitaltext: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  back: {
    padding: 10,
    color: 'white',
  },
  header: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 50,
  },
  headtext: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#07a9b8',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  img: {
    margin: 10,
    width: 60,
    borderRadius: 60 / 2,
    height: 60,
  },
});
