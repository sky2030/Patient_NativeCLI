import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {FlatList} from 'react-native-gesture-handler';

export default function HealthIdsList({navigation, route}) {
  const [healthIDList, setHealthIDList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setHealthIDList(route.params.data.health_ids);
    });
    return unsubscribe;
  }, [route.params.data]);
  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.optionCards}>
        {item.is_verified && (
          <MaterialIcons
            name="verified-user"
            color={'green'}
            size={20}
            style={{paddingHorizontal: 10}}
          />
        )}
        <Text style={{paddingHorizontal: 10}}>{item.id}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={"Health Id's"}
        leftIconOnPress={() => navigation.goBack()}
        rightIconOnPress={() => navigation.navigate('Hospital')}
      />
      <FlatList data={healthIDList} renderItem={_renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  optionCards: {
    elevation: ELEVATION,
    backgroundColor: '#B4E2C7',
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 6,
    alignItems: 'center',
    // justifyContent: "center",
    // padding: 20,
    width: '95%',
    height: 50,
    flexDirection: 'row',
    //  borderRadius:13,
    borderBottomEndRadius: 15,
    borderTopLeftRadius: 15,
  },
});
