import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import Transaction from "./TransactionScreen";
import HospitalSelection from "./HospitalSelection";
import HomeScreen from "./HomeScreen";
import AppointmentScreen from "./AppointmentScreen";
import ProfileScreen from "./ProfileScreen";
// import { FontAwesome5 } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import ReportRepo from "./Reports";
import { StyleSheet } from "react-native";
import SearchScreen from "./SearchScreen";

const ReportStack = createStackNavigator();
const FindSpecialityStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AppointmentStack = createStackNavigator();
const TransactionStack = createStackNavigator();
const SearchStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#E94F37',
  },
  buttonIcon: {
    fontSize: 16,
    color: '#F6F7EB'
  }
});

export const TabBg = ({
  color = 'red',
  ...props
}) => {
  return (
    <Svg
      width={75}
      height={61}
      viewBox="0 0 75 61"
      {...props}
    >
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  )
};
export const TabBarAdvancedButton = ({
  bgColor,
  ...props
}) => (
  <View
    style={styles.container}
    pointerEvents="box-none"
  >
    <TabBg
      color={bgColor}
      style={styles.background}
    />
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
    >
      <Icon
        name="rocket"
        style={styles.buttonIcon}
      />
    </TouchableOpacity>
  </View>
);

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Hospital" activeColor="#fff">
    <Tab.Screen
      name="Hospital"
      //component={HomeStackScreen}
      component={FindSpecialityStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Reports"
      // component={FindSpecialityStackScreen}
      component={ReportStackScreen}
      options={{
        tabBarLabel: "Reports",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="notes-medical" size={26} color={color} />

          // <Icon name="ios-search" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Search"
      component={SearchStackScreen}
      options={{
        tabBarLabel: "Search",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          // <FontAwesome5 name="notes-medical" size={26} color={color} />

          <Icon name="ios-search" color={color} size={26} />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Appointment"
      component={AppointmentStackScreen}
      options={{
        tabBarLabel: "Appointment",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-calendar" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "My Account",
        tabBarColor: "#009387",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const FindSpecialityStackScreen = ({ navigation }) => (
  <FindSpecialityStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <FindSpecialityStack.Screen
      name="Hospital"
      component={HospitalSelection}
      options={{
        title: "Welcome to VRCure",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </FindSpecialityStack.Navigator>
);

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "VRCure",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "Profile",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const AppointmentStackScreen = ({ navigation }) => (
  <AppointmentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AppointmentStack.Screen
      name="Appointment"
      component={AppointmentScreen}
      options={{
        title: "Appointment",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AppointmentStack.Navigator>
);
const ReportStackScreen = ({ navigation }) => (
  <ReportStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ReportStack.Screen
      name="Reports"
      component={ReportRepo}
      options={{
        title: "Medical Records",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ReportStack.Navigator>
);
const SearchStackScreen = ({ navigation }) => (
  <SearchStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#009387",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
      options={{
        title: "Doctor Search",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#009387"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </SearchStack.Navigator>
);
