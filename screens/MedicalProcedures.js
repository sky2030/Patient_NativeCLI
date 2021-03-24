import * as React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import logo from '../assets/images/no-food.jpg';
// import logo1 from "../assets/images/virtual.png";
// import logo5 from "../assets/images/medicalappointment1.png";
// import logo2 from "../assets/images/microphone.png";
// import logo3 from "../assets/images/noise.jpg";
// import logo6 from "../assets/images/tie.png";
// import logo7 from "../assets/images/distraction.jpg";
// import logo8 from "../assets/images/keyboard.jpg";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHeader from '../components/AppHeader';

export default function MedicalProcedures({navigation}) {
  return (
    <View style={styles.container}>
      <AppHeader
        title={'Consultation Procedure'}
        leftIconOnPress={() => navigation.goBack()}
        rightIconOnPress={() => navigation.navigate('Hospital')}
      />
      <View style={styles.headerTop}>
        <Text style={styles.headtext1}>
          Online Consultation Booking Procedure{' '}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 1 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Select Hospital from Available Option as per your Choice
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 2 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Now Click on Book Doctor button available at center of the
                Screen
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 3</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Select the Speciality for which you are looking for consultation
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 4 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Select Doctor from Available option in selected speciality
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 5 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Now you will be seeing available slot for the day if you wanted
                to book appointment for future date then select Date by clicking
                on calendar icon as per your convenience
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 6 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                By default Consultation will be booked for you but if you wish
                to book Consultation for your family member then Select added
                family member from the list populated at Consultation type
                option.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 7 </Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Now just select the available slot as per your convenience and
                click ok to proceed for payment.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 8</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Click on Proceed to Pay , you will be redirected to your
                available option for payment, Complete the payment within 5 min
                to book the desired slot{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 9</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Once Payment done, Now click on second tab from right where you
                will see your upcoming Appointment for the day, if your
                Appointment is booked for future date then select the date and
                confirm if that populated for you on that date else you may
                contact to Support.{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 10</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                Now you will be having 3 option's Report , Join Consultation and
                Prescription. You can add your previous report for your future
                consultation on Report screeen by just adding Name of report and
                Image of Report from both option either from Camera or Gallery.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 11</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                {' '}
                On the date of Consultation you will receive notification before
                15 min of session and once doctor started the Consultation ,
                then you may click on join Consultation.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>Step 12</Text>
          </View>
          <View style={styles.title1}>
            <View style={styles.title9}>
              <Text style={styles.headtext2}>
                {' '}
                Once Consultation finish you can preview your prescription
                submitted by doctor. take a screenshot and printout to procure
                medicines from stores.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  collapseheader: {
    marginBottom: 20,
  },
  footer: {
    backgroundColor: '#077464',
    padding: 20,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  bottomtext: {
    color: '#fff',
    fontSize: 15,
  },
  headtext1: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },

  headtext2: {
    color: '#4E557C',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    marginLeft: 2,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#077464',
    backgroundColor: '#077464',
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 30,
  },
  headerTop: {
    color: 'white',
    backgroundColor: '#AB0631',
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 30,
    marginTop: 5,
  },

  card: {
    borderRadius: 4,
    elevation: ELEVATION,
    backgroundColor: '#E5F0ED',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    marginTop: 10,
    width: 400,
  },
  title1: {
    flexDirection: 'row',
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 80,
  },
  title9: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  img1: {
    marginBottom: 5,
    padding: 30,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  collapseview: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
