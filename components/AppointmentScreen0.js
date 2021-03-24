import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
   ScrollView  } from 'react-native';
  import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
 
  import {MaterialCommunityIcons} from '@expo/vector-icons';

const AppointmentScreen = ({navigation}) => {
  return (
     
    <View style={styles.container}> 
       <ScrollView>
       <View style={styles.input1}>
       <Text style={styles.baseText1}>Your have 1 Upcoming Appointments</Text>
       </View>
              
        <Collapse>
               <CollapseHeader>
               <View style={styles.card}>
        <View style={styles.title1}>
        <View style={styles.title2}>
        
            <MaterialCommunityIcons name="calendar-clock" size={50} color="#0b635c" />
        </View>
        <View style={styles.title9}>
           <Text style={styles.headtext2}>Doctor- Dr. Neha Bansal</Text>
            <Text style={styles.headtext2}>Appointment Date- 18/08/20 </Text>
            <Text style={styles.headtext2}>Appointment Time- 03:30PM </Text>
           
            </View>
            </View>
           
        </View>
               </CollapseHeader>
               <CollapseBody>

               <View style={styles.card2}>
                   <View style={styles.collapseview}>
                   
                   <View style={styles.title4}>
                       <View style={styles.title7}>
                       <Text style={styles.headtext2}>Follow Up</Text>
                       <Text style={styles.headtext2}>20/08/20 </Text>
                       </View>
                       <View style={styles.title8}>
                       <Text style={styles.headtext2}>Appointment date</Text>
                       <Text style={styles.headtext2}>20/08/20 </Text>
                       </View>
                       <View style={styles.title6}>
                       <Text style={styles.headtext2}>Fees -</Text>
                       <Text style={styles.headtext2}>Rs. 1500/- </Text>
                       </View>
                       </View>
                       <View style={styles.title4}>
                           <TouchableOpacity activeOpacity={0.95} style={styles.btn} >
                               <Text style={styles.btntext}>Uploads Reports</Text>
                           </TouchableOpacity>
                           <TouchableOpacity activeOpacity={0.95} style={styles.btn} >
                               <Text style={styles.btntext}>View Prescription</Text>
                           </TouchableOpacity>
                       </View>
                       <TouchableOpacity activeOpacity={0.95} style={styles.btnjoin} >
                               <Text style={styles.btntext}>Join Consultation</Text>
                           </TouchableOpacity>

                       </View>
           
        </View>

               </CollapseBody>
           </Collapse>

        <View style={styles.input1}>
       <Text style={styles.baseText1}>Your have Recent Appointments</Text>
       </View>

       <View style={styles.card1}>
        
       <View style={styles.header}>
        <Text style={styles.headtext1}>Dr. Ram Kumar </Text>
        </View>
        <View style={styles.title4}>
            <View style={styles.title7}>
            <Text style={styles.headtext2}>Follow Up</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title8}>
            <Text style={styles.headtext2}>Appointment date</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title6}>
            <Text style={styles.headtext2}>Fees -</Text>
            <Text style={styles.headtext2}>Rs. 1000/- </Text>
            </View>
            </View>
           
        </View>

        <View style={styles.card1}>
        
       <View style={styles.header}>
        <Text style={styles.headtext1}>Dr. Radhakrishna </Text>
        </View>
        <View style={styles.title4}>
            <View style={styles.title7}>
            <Text style={styles.headtext2}>Follow Up</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title8}>
            <Text style={styles.headtext2}>Appointment date</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title6}>
            <Text style={styles.headtext2}>Fees -</Text>
            <Text style={styles.headtext2}>Rs. 1000/- </Text>
            </View>
            </View>
           
        </View>

        <View style={styles.card1}>
        
       <View style={styles.header}>
        <Text style={styles.headtext1}>Dr. Shiva Kumar </Text>
        </View>
        <View style={styles.title4}>
            <View style={styles.title7}>
            <Text style={styles.headtext2}>Follow Up</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title8}>
            <Text style={styles.headtext2}>Appointment date</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title6}>
            <Text style={styles.headtext2}>Fees -</Text>
            <Text style={styles.headtext2}>Rs. 1500/- </Text>
            </View>
            </View>
           
        </View>
        <View style={styles.card1}>
        
       <View style={styles.header}>
        <Text style={styles.headtext1}>Dr. Asif Raza </Text>
        </View>
        <View style={styles.title4}>
            <View style={styles.title7}>
            <Text style={styles.headtext2}>Follow Up</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title8}>
            <Text style={styles.headtext2}>Appointment date</Text>
            <Text style={styles.headtext2}>20/08/20 </Text>
            </View>
            <View style={styles.title6}>
            <Text style={styles.headtext2}>Fees -</Text>
            <Text style={styles.headtext2}>Rs. 1000/- </Text>
            </View>
            </View>
           
        </View>

       
        </ScrollView>
    </View>
  );
};

export default AppointmentScreen;

const styles= StyleSheet.create({
  container: {
      flex: 1,
      width: "100%"
    },
    head:{
        backgroundColor:"white",
        padding:20,
        height: 60,
        width: "100%"
    },
    headtext:{
        color:'#2E76B6',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:20,
        borderColor:"#2E76B6",
         textShadowOffset:{width: 2, height: 2},
         textShadowRadius:10,
    },
    headtext1:{
     color:'white',
     fontSize: 15,
     fontWeight: 'bold'
 },
 btntext:{
     color:'white',
     fontSize: 15,
     padding:10
 },
 headtext2:{
     color:'#4E557C',
     fontSize: 14,
     fontWeight: 'bold',
     marginBottom:2,
     marginTop:8,
     marginLeft:2

 },
 headtext3:{
     color:'#4E557C',
     fontSize: 15,
     fontWeight: 'bold',
     alignItems:"center",
     justifyContent:"center",
     marginRight:70,
     marginTop:20

 },
 headtext4:{
     color:'#4E557C',
     fontSize: 15,
     fontWeight: 'bold',
     alignItems:"center",
     justifyContent:"center",
     marginRight:70

 },
 header:{
     color:'white',
     backgroundColor:"#192161",
     fontSize: 15,
     fontWeight: 'bold',
     alignItems:"center",
     justifyContent:"center",
     width:'100%'

 },
    card: {
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#E5F0ED',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom:10
    },
    card1: {
     borderRadius: 4,
     elevation: 3,
     backgroundColor: '#E5F0ED',
     shadowOffset: { width: 1, height: 1 },
     shadowColor: '#333',
     shadowOpacity: 0.3,
     shadowRadius: 2,
     marginHorizontal: 20,
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom:20
   },
   card2: {
     borderRadius: 4,
     elevation: 3,
     backgroundColor: '#CED2DC',
     shadowOffset: { width: 1, height: 1 },
     shadowColor: '#333',
     shadowOpacity: 0.3,
     shadowRadius: 2,
     alignItems: 'center',
     justifyContent: 'center',
     width:'90%',
     marginHorizontal:20,
     paddingBottom:10
   },
   card3: {
     borderRadius: 4,
     elevation: 3,
     backgroundColor: '#7B6DA3',
     shadowOffset: { width: 1, height: 1 },
     shadowColor: '#333',
     shadowOpacity: 0.3,
     shadowRadius: 2,
     marginHorizontal: 10,
     marginVertical: 5,
     alignItems: 'center',
     justifyContent: 'center'
   },
    cardContent: {
      marginHorizontal: 20,
      marginVertical: 10,
    },
    input3:{
     marginBottom: 15,
     marginTop: 15
 },
 input1:{
     alignContent:"center",
     justifyContent:"center",
     fontSize:15,
     fontWeight:"bold",
     marginLeft:15
 },
 baseText1:{
     marginBottom: 15,
     marginTop: 15,
     alignContent:"center",
     justifyContent:"center",
     fontSize:15,
     fontWeight:"bold"
 },
 title1:{
     flexDirection:"row",
     marginRight:20
 },
 title2:{
     alignItems:"center",
     justifyContent:"center",
     marginTop:15
 },
 title3:{
     alignItems:"flex-start",
     justifyContent:"flex-start",
     marginTop:10,
     marginLeft:10,
     marginRight:170,
     flexDirection:"row"
 },
 title4:{
     alignItems:"flex-start",
     justifyContent:"flex-start",
     flexDirection:"row"
 },
 title5:{
     alignItems:"flex-start",
     justifyContent:"flex-start",
     marginLeft:25,
     marginRight:10,
     flexDirection:"column"
 },
 title6:{
     alignItems:"center",
     justifyContent:"center",
     marginLeft:30,
     flexDirection:"column"
 },
 title7:{
     alignItems:"center",
     justifyContent:"center",
     marginRight:30,
     flexDirection:"column"
 },
 title8:{
     alignItems:"center",
     justifyContent:"center",
     marginLeft:20,
     flexDirection:"column",
 },
 title9:{
     alignItems:"center",
     justifyContent:"center",
     marginLeft:60,
     flexDirection:"column",
     marginRight:10
 },
 title10:{
     color:'white',
     backgroundColor:"#192161",
     fontSize: 15,
     fontWeight: 'bold',
     alignItems:"center",
     justifyContent:"center",
     width:'90%',
     marginHorizontal:20
 },
 title11:{
     alignItems:"flex-start",
     justifyContent:"flex-start",
     marginTop:20,
     marginLeft:10,
     marginRight:20,
     flexDirection:"column"
 },
 header2:{
     color:'#4E557C',
     fontSize: 15,
     fontWeight: 'bold',
     marginBottom:10,
     marginRight:10,
     alignItems:"flex-start",
     justifyContent:'flex-start'

 },
 header3:{
     color:'#4E557C',
     fontSize: 15,
     fontWeight: 'bold',
     marginBottom:2,
     marginTop:10

 },
 header4:{
     color:'#4E557C',
     fontSize: 15,
     fontWeight: 'bold',
     marginRight:70,
     marginTop:10

 },
 header5:{
     color:'green',
     fontSize: 15,
     fontWeight: 'bold',
     marginBottom:2,
     marginTop:10
 },
 headtext6:{
     color:'blue',
     fontSize: 15,
     fontWeight: 'bold',
     marginBottom:2,
     marginTop:10

 },
 detail:{
     flexDirection:"row"
 },
 img:{
     marginBottom: 5,
     padding: 30,
     width: 60, height: 60, borderRadius: 60/ 2
 },
 collapseview:{
    flexDirection:"column"

 },
 btn:{
     width: 150,
     backgroundColor:'#707379',
     padding: 5,
     color:'#fff',
     fontSize: 22,
     fontWeight: 'bold',
     flexDirection: 'row', 
     borderRadius: 5,
     height: 25, 
     alignItems: 'center',
     justifyContent: 'center',
     marginTop: 20,
     elevation:3,
     marginBottom: 20,
     marginLeft:20
 },

 btnjoin:{
    width: 350,
    backgroundColor:'#2b93b5',
    padding: 5,
    color:'#fff',
    fontSize: 22,
    fontWeight: 'bold',
    flexDirection: 'row', 
    borderRadius: 5,
    height: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    elevation:3,
    marginBottom: 20,
    
 },
 img1:{
     marginBottom: 10,
     width: 90,
     padding: 15,
     marginTop:10,
     width: 60, height: 60, borderRadius: 60/ 2
 }
})
