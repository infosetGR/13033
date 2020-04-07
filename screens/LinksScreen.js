import React,{useCallback,useState,useEffect} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {useSelector} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import * as SMS from 'expo-sms';

const LinksScreen = props=> {
  const[reason,setReason]=useState();
  const userprofile =  useSelector(state=> state.userprofile.userProfiles[state.userprofile.activeuserid]);
  const activeuserid=useSelector(state=> state.userprofile.activeuserid);

  const checkprofile =useCallback( ()=>
  {
    if (userprofile.name==='')
    {
    Alert.alert('Δεν υπάρχουν αποθηκευμένα στοιχεία', 'Συμπληρώστε πρώτα τα στοιχεία του ατόμου που θα πραγματοποιήσει μετακίνηση ', [
      { text: 'Ενταξει', style: 'default', onPress: ()=>  props.navigation.navigate('Home')  } 
    ]);
    return false;
  }
  else
  return true;
  },[userprofile]);

  useEffect(() => {
    checkprofile();
     const willFocusSub = props.navigation.addListener('willFocus',checkprofile);
    // return ()=>{
    //   willFocusSub.remove();
    // }
  },[checkprofile]);

const proceed = async (v) => {
  if (checkprofile()){
      const isAvailable = await SMS.isAvailableAsync();
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync(
          ['13033'],
          v+' '+ userprofile.name.toUpperCase() +' '+userprofile.surname.toUpperCase()+' '+ userprofile.street.toUpperCase()+' '+userprofile.number.toUpperCase()+' '+userprofile.city.toUpperCase()+' '+userprofile.postcode.toUpperCase()
        );
        Alert.alert('SMS to 13033',result+(activeuserid>0?'. Αν δεν μετακινηθείτε εσείς πρωωθήστε το μύνημα που θα λάβατε απο το 13033 στο άτομο που θα μετακινηθεί':'. Μπορείτε να μετακινηθείτε όταν λάβετε το απαντητικό μύνημα απο το 13033'))
      } else {
        Alert.alert('Error', 'You cannot send sms from this device');
      }


    } 
  
    return;    

  };

  return (


    <ScrollView>
      
    <View style={{alignItems:'center',backgroundColor:'#FFF',  alignSelf:'center', flex:1, minHeight:1000, width:'98%', padding:20,justifyContent:'space-evenly'}}>
    <Text style={{fontFamily:'futura'}}>{userprofile.name.toUpperCase()} {userprofile.surname.toUpperCase()} {userprofile.street.toUpperCase()} {userprofile.number.toUpperCase()} {userprofile.city.toUpperCase()} {userprofile.postcode.toUpperCase()}</Text>
    <Button title={'1. Μετάβαση σε φαρμακείο ή επίσκεψη στον γιατρό, εφόσον αυτό συνιστάται μετά από σχετική επικοινωνία.'} 
    buttonStyle={{shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 6, elevation: 10, minWidth:150,backgroundColor:'#ff0066', justifyContent:'space-evenly', borderRadius: 10}} 
    titleStyle={{fontFamily:'futura',  }}
    onPress={()=>{setReason(1);proceed(1);}}/>        
    <Button title={'2. Μετάβαση σε εν λειτουργία κατάστημα προμηθειών αγαθών πρώτης ανάγκης (σούπερ μάρκετ, μίνι μάρκετ), όπου δεν είναι δυνατή η αποστολή τους.'} 
    buttonStyle={{shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 6, elevation: 10, minWidth:150,backgroundColor:'#00cc00', justifyContent:'space-evenly', borderRadius: 10}} 
    titleStyle={{fontFamily:'futura',  }}
    onPress={()=>{setReason(2);proceed(2);}}/>        
    <Button title={'3. Mετάβαση στην τράπεζα, στο μέτρο που δεν είναι δυνατή η ηλεκτρονική συναλλαγή.'} 
    buttonStyle={{shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 6, elevation: 10, minWidth:150,backgroundColor:'#bf00ff', justifyContent:'space-evenly', borderRadius: 10}} 
    titleStyle={{fontFamily:'futura',  }}
    onPress={()=>{setReason(3);proceed(3);}}/>        
    <Button title={'4. Κίνηση για παροχή βοήθειας σε ανθρώπους που βρίσκονται σε ανάγκη.'} 
    buttonStyle={{shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 6, elevation: 10, minWidth:150,backgroundColor:'#ff8000', justifyContent:'space-evenly', borderRadius: 10}} 
    titleStyle={{fontFamily:'futura',  }}
    onPress={()=>{setReason(4);proceed(4);}}/>   
    <Button title={'5. Μετάβαση σε τελετή (π.χ. κηδεία, γάμος, βάφτιση) υπό τους όρους που προβλέπει ο νόμος ή μετάβαση διαζευγμένων γονέων ή γονέων που τελούν σε διάσταση που είναι αναγκαία για τη διασφάλιση της επικοινωνίας γονέων και τέκνων, σύμφωνα με τις κείμενες διατάξεις.'} 
    buttonStyle={{shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 6, elevation: 10, minWidth:150,backgroundColor:'#cc9966', justifyContent:'space-evenly', borderRadius: 10}} 
    titleStyle={{fontFamily:'futura',  }}
    onPress={()=>{setReason(5);proceed(5);}}/>   
    <Button title={'6. Σωματική άσκηση σε εξωτερικό χώρο ή κίνηση με κατοικίδιο ζώο, ατομικά ή ανά δύο άτομα, τηρώντας στην τελευταία αυτή περίπτωση την αναγκαία απόσταση 1,5 μέτρου.'} 
    buttonStyle={{shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 6, elevation: 10, minWidth:150,backgroundColor:'#1a75ff', justifyContent:'space-evenly', borderRadius: 10}} 
    titleStyle={{fontFamily:'futura',  }}
    onPress={()=>{setReason(6);proceed(6);}}/> 
    
   </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, width:'90%',
    backgroundColor: '#fafafa', 
  },
  contentContainer: {
    paddingTop: 15, alignContent:'center', alignItems:'center',  alignSelf:'center'
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

export default LinksScreen;