import React, { useState,useEffect,useCallback} from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {  StyleSheet, Text, View,TextInput, Alert,FlatList, KeyboardAvoidingView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button,Icon } from 'react-native-elements';
import * as userProfileActions from '../store/actions/userprofile';


const HomeScreen = props=> {
  const userprofiles =  useSelector(state=> state.userprofile.userProfiles);
  const activeuserid=useSelector(state=> state.userprofile.activeuserid);
  const userprofile =  useSelector(state=> state.userprofile.userProfiles[activeuserid]);
  
 
 const [userid, setUserid]=useState(userprofile.userid);
 const [name, setName]=useState(userprofile.name);
 const [surname, setSurname]=useState(userprofile.surname)
 const [street, setStreet]=useState(userprofile.street)
 const [number, setNumber]=useState(userprofile.number)
 const [city, setCity]=useState(userprofile.city)
 const [postcode, setPostCode]=useState(userprofile.postcode)
 const [edit,setEdit]=useState(false)

 const dispatch = useDispatch();


 const saveProfileHandler = useCallback(async () => {
  let action;
  let msg='';
  if (name.length===0) msg=msg+'ONOMA,';
  if (surname.length===0) msg=msg+'ΕΠΙΘΕΤΟ,';
  if (street.length===0) msg=msg+'ΟΔΟΣ,';
  if (number.length===0) msg=msg+'ΑΡΙΘΜΟΣ,';
  if (city.length===0) msg=msg+'ΠΟΛΗ,';
  if (postcode.length===0) msg=msg+'ΤΚ,';
  if (msg.length>0)
  Alert.alert('Πρέπει να συμπληρώσεται τα στοιχεία: '+msg);
  else
  {
  action = userProfileActions.saveUserProfile(userid,name,surname,street,number,city,postcode);
  try {
    await dispatch(action);
    setEdit(false);
    Alert.alert('Επιτυχία', 'Τα στοιχεία σας αποθηκεύτηκαν, μπορείτε τώρα να αιτηθείτε μετακίνηση στο 13033',[
      { text: 'Ωραια!', style: 'default', onPress: ()=> props.navigation.navigate('Links')  },   
      { text: 'Όχι τωρα', style: 'default', onPress: ()=> {}  }   ])
  } catch (err) {
    console.log(err);
  }
  }
 },[dispatch,name,surname,street,number,city,postcode] );
 
 

  return (
    
      <ScrollView style={{ backgroundColor: '#FFF',}}>
 
  <FlatList  ListFooterComponent={
    <View style={{padding:8}}>
 
 <Icon
   name="add"
   size={45}
   color="#527a42" onPress={()=>{
    Alert.alert('Νεο προφίλ?', 'Θέλετε να δημιουργήσετε επιπλέον προφίλ? Μπορείτε να επιλέγετε για ποιό προφίλ θα αιτήστε άδεια εξόδου.',[
      { text: 'Ναι!', style: 'default', onPress: async ()=> {await dispatch(userProfileActions.saveUserProfile(-1,'','','','','',''));
       setUserid(userprofiles.length);
      setName('');
      // setSurname('');
      // setStreet('');
      // setNumber('');
      // setCity('');
      // setPostCode('');
      setEdit(true)}  
    
    },   
      { text: 'Ακύρωση', style: 'default', onPress: ()=> {}  }   ])
   }}/>

{userprofiles.length>1 && <Icon style={{'padding':20}}
   name="clear" type='material'
   size={25}
   color="#527a42" onPress={()=>{
    Alert.alert('Διαγραφή ?', 'Θέλετε να διαγράψετε όλα τα προφιλ που έχετε δημιουργήσει?',[
      { text: 'Ναι!', style: 'default', onPress: async ()=> {await dispatch(userProfileActions.deleteAllProfiles());      
         setUserid(0);
      setName('');
      setSurname('');
      setStreet('');
      setNumber('');
      setCity('');
      setPostCode('');
      setEdit(false)  }},   
      { text: 'Ακύρωση', style: 'default', onPress: ()=> {}  }   ])
   }}
   
 />}
</View>

  } horizontal  data={userprofiles} style={{width:'100%', flex:1, padding:20 }}
        keyExtractor={item => item.userid.toString()}
        renderItem={itemData => (  
          <View style={{width:80,paddingHorizontal:10, alignItems:'center'}}>
            <Icon
             type="font-awesome"
              name="user-circle"
              size={55}
              color={activeuserid===itemData.item.userid?"#F6881F":"#527a42"} onPress={ ()=> { dispatch(userProfileActions.setActiveUserid( itemData.item.userid)); 
                setUserid(userprofiles[itemData.item.userid].userid);
                setName(userprofiles[itemData.item.userid].name);
                setSurname(userprofiles[itemData.item.userid].surname);
                setStreet(userprofiles[itemData.item.userid].street);
                setNumber(userprofiles[itemData.item.userid].number);
                setCity(userprofiles[itemData.item.userid].city);
                setPostCode(userprofiles[itemData.item.userid].postcode);
                setEdit(false)
              }}
                
               
            />
            <Text style={{fontFamily:'futura', flex:1, alignSelf:'center'}}>{itemData.item.name}</Text>
            </View>
        )}></FlatList>
        
  <KeyboardAvoidingView
      behavior={"padding"}
      style={{flex:1}} keyboardVerticalOffset={0}
    > 
  <View style={{width:'100%', alignItems:'center', height:330}}>
      <TextInput autoCapitalize='characters' onChangeText={(v)=>setName(v)} placeholder={'ONOMA'} value={name} onChange={()=>setEdit(true)}
        spacing={10}  style={{ letterSpacing:2, fontSize:20, margin:'5%', width:'80%',paddingHorizontal:10, height:40, backgroundColor:'#f4f3ef',  borderWidth:1,borderColor:'black', borderRadius:15}} >
        </TextInput>

      <TextInput autoCapitalize='characters' onChangeText={(v)=>setSurname(v)} placeholder={'ΕΠΙΘΕΤΟ'} value={surname} onChange={()=>setEdit(true)}
       spacing={10}  style={{ letterSpacing:2,fontSize:20,margin:'5%', width:'80%',paddingHorizontal:20, height:40, backgroundColor:'#f4f3ef',  borderWidth:1,borderColor:'black', borderRadius:15}} >
        </TextInput>
<View style={{flexDirection:'row',margin:'5%'}}>
      <TextInput autoCapitalize='characters' onChangeText={(v)=>setStreet(v)} placeholder={'ΟΔΟΣ'} value={street} onChange={()=>setEdit(true)}
       spacing={10}  style={{ letterSpacing:2,fontSize:20, width:'60%',paddingHorizontal:20, height:40, backgroundColor:'#f4f3ef',  borderWidth:1,borderColor:'black', borderRadius:15}} >
        </TextInput>
        <TextInput autoCapitalize='characters' onChangeText={(v)=>setNumber(v)} placeholder={'ΑΡ.'} value={number} onChange={()=>setEdit(true)} maxLength={4}
       spacing={10}  style={{ letterSpacing:2,fontSize:20,left:15, width:'30%',paddingHorizontal:5, height:40, backgroundColor:'#f4f3ef',  borderWidth:1,borderColor:'black', borderRadius:15}} >
        </TextInput>
</View>
<View  style={{flexDirection:'row',marginHorizontal:'5%'}}>
<TextInput autoCapitalize='characters' onChangeText={(v)=>setCity(v)} placeholder={'ΠΟΛΗ'} value={city} onChange={()=>setEdit(true)}
       spacing={10}  style={{ letterSpacing:2,fontSize:20, width:'60%',paddingHorizontal:20, height:40, backgroundColor:'#f4f3ef',  borderWidth:1,borderColor:'black', borderRadius:15}} >
        </TextInput>
        <TextInput autoCapitalize='characters' onChangeText={(v)=>setPostCode(v)} placeholder={'ΤΚ'} value={postcode} onChange={()=>setEdit(true)} maxLength={5}
       spacing={10}  style={{ letterSpacing:2,fontSize:20,left:15, width:'30%',paddingHorizontal:5, height:40, backgroundColor:'#f4f3ef',  borderWidth:1,borderColor:'black', borderRadius:15}} >
        </TextInput>
</View>

  </View>
  <View style={{width:'90%', alignSelf:'center', flex:1,height:100 }}>
      <Button title={'ΑΠΟΘΗΚΕΥΣΗ'} disabled={!edit} buttonStyle={{shadowColor: "#000", height:50, shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 8, elevation: 14, minWidth:150,backgroundColor:'#F6881F', justifyContent:'space-evenly', borderRadius: 10}} onPress={()=>saveProfileHandler()}/>              
     </View>
     {/* <View style={{backgroundColor:'#EEE', borderRadius:20, paddingHorizontal:20, margin:10, shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 8, elevation: 14,}}>
        <Text style={styles.getStartedText}>Μένω Σπίτι</Text>
      <Text style={styles.getStartedText}>Μένω Υγιής</Text>
      <Text style={styles.getStartedText}>Προστατεύω τους συνανθρώπους μου</Text>
      
      </View> */}
  </KeyboardAvoidingView>
      
      
 
      </ScrollView>
      
    
  );
}

//  HomeScreen.navigationOptions  = navData => { 
// return {
//   headerRight:(
//          <Image
//          source={require("../assets/images/icon.png")}
//          resizeMode="contain"
//          style={{width:80, padding:10, left:20}}/>
//        ),
//   }
//  };

// function DevelopmentModeNotice() {
//   if (__DEV__) {
//     const learnMoreButton = (
//       <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
//         Learn more
//       </Text>
//     );

//     return (
//       <Text style={styles.developmentModeText}>
//         Development mode is enabled: your app will be slower but you can use useful development
//         tools. {learnMoreButton}
//       </Text>
//     );
//   } else {
//     return (
//       <Text style={styles.developmentModeText}>
//         You are not in development mode: your app will run at full speed.
//       </Text>
//     );
//   }
// }

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  
  
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  
});

export default HomeScreen