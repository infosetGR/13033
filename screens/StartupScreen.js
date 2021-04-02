import React, { useEffect } from 'react';
import {
  View,
  StyleSheet, Text,TouchableOpacity,Linking, ImageBackground
} from 'react-native';
import { useDispatch } from 'react-redux';
import {Share } from "react-native";
import * as userProfileActions from '../store/actions/userprofile';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';


const StartupScreen = props => {
  const dispatch = useDispatch();


  useEffect(() => {
    const getProfile = async () => {
      let action;
      action = userProfileActions.fetchUserProfile();
      try {
       const getprofile= await dispatch(action);
       if (getprofile.type==='success') props.navigation.navigate('Links');
      } catch (err) {
      }
    };
    getProfile();
    
  },[dispatch]);

  return (
    <ScrollView style={{ backgroundColor:'#FFF'}} >
    <View style={{flex:1, margin:0,height:700 }}>
    <View style={{width:'90%', alignSelf:'center',margin:10, flex:1}}>
    <TouchableOpacity onPress={()=>{props.navigation.navigate('Home');}}>
      <View style={{backgroundColor:'#EEE', borderRadius:20, paddingHorizontal:10, margin:10, shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 8, elevation: 14,}}>
      <Text style={{fontSize:16, fontFamily:'futura'}}>Καλωσήρθατε. H εφαρμογή αυτή στέλνει εύκολα για εσάς και τους οικείους σας sms στο {"\n"} - 13032: Μετακίνηση σε κατάστημα {"\n"} - 13032: Άδεια εξόδου από το σπίτι {"\n"} {"\n"} Συμπληρώστε τα στοιχεία σας στην επόμενη οθόνη και επιλέξτε το λόγο
        που θέλετε να μετακινηθείτε. Τέλος αναμείνετε το απαντητικό sms απο την υπηρεσία.
        </Text>
        </View>
        </TouchableOpacity>
        <Button title={'ΞΕΚΙΝΗΣΤΕ'} buttonStyle={{shadowColor: "#000", shadowOffset: {width: 0,height: 4,},shadowOpacity: 0.41,shadowRadius: 8, elevation: 14,top:10, minWidth:150,backgroundColor:'#F6881F', justifyContent:'space-evenly', borderRadius: 10}} onPress={()=>{props.navigation.navigate('Home');}}/>        
      </View>
       

      <View style={{width:'100%', alignItems:'center',height:180}}>
      <TouchableOpacity style={{width:'100%', alignItems:'center',height:100}}  onPress={async () => {                     
        const lnk= 'https://onelink.to/13033'; 
        const result = await  Share.share(
         {
           title: 'Μένουμε Σπίτι',
           subject:'Μένουμε Σπίτι',
           message:'Κατέβασε την εφαρμογή για το 13033 και στείλε έυκολα sms για άδεια εξόδου απο το σπίτι! ' + lnk,
           url: lnk,
         }, {
           dialogTitle: 'Κοινοποίησε την εφαρμογή',
       
           tintColor: 'green',
        
           excludedActivityTypes: [
             // 'com.apple.UIKit.activity.PostToWeibo',
              'com.apple.UIKit.activity.Print',
             // 'com.apple.UIKit.activity.CopyToPasteboard',
             // 'com.apple.UIKit.activity.AssignToContact',
              'com.apple.UIKit.activity.SaveToCameraRoll',
              'com.apple.UIKit.activity.AddToReadingList',
             // 'com.apple.UIKit.activity.PostToFlickr',
              'com.apple.UIKit.activity.PostToVimeo',
             // 'com.apple.UIKit.activity.PostToTencentWeibo',
              'com.apple.UIKit.activity.AirDrop',
              'com.apple.UIKit.activity.OpenInIBooks',
             // 'com.apple.UIKit.activity.MarkupAsPDF',
              'com.apple.reminders.RemindersEditorExtension',
             // 'com.apple.mobilenotes.SharingExtension',
              'com.apple.mobileslideshow.StreamShareService',
             // 'com.linkedin.LinkedIn.ShareExtension',
             // 'pinterest.ShareExtension',
             // 'com.google.GooglePlus.ShareExtension',
             // 'com.tumblr.tumblr.Share-With-Tumblr',
             // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
           ],
         }
       );
       if (result.action === Share.sharedAction) {
         if (result.activityType) {
           console.log('shared with activity type of '+ result.activityType);
         } else {
           console.log('shared');
         }
             
       } else if (result.action === Share.dismissedAction) {
           Console.log('dismissed');
       }
       
   

 }} >
   <View style={{width:'100%',height:200, alignSelf:'center', alignItems:'center', alignContent:'center'}}>
   <ImageBackground   source={require("../assets/images/icon.png")}
         resizeMode='contain'
         style={{width:'100%',height:150}}>
           <View style={{width:'100%',height:150,top:-70}}>
      <Text style={{top:40,fontFamily:'futurabold', alignSelf:'center', color:'#527a42'}}>Μοιραστείτε την εφαρμογή με φίλους </Text>
      <Text style={{top:40,fontFamily:'futurabold', alignSelf:'center',color:'#527a42'}}> </Text>
      </View>

 </ImageBackground>
 </View>
    </TouchableOpacity>
    </View>

      {/* <View  style={{width:'100%', alignSelf:'center',margin:0, paddingTop:60, top:50, padding:10 }}>
      <Text style={{fontFamily:'futurabold', padding:10}}>Xρήσιμα links:</Text>
      
      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://coronavirus.jhu.edu/map.html')} style={{flexDirection:'row'}}>
      <Image source={{ uri:'https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/24/4a/b6/244ab661-8f38-8208-e13a-fa63c2cf27d9/source/256x256bb.jpg'}} style={{width:40, height:40, borderRadius:20}}></Image>
      <Text style={{fontSize:14,fontFamily:'futura'}}> Johns Hopkins Coronavirus Map</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://www.worldometers.info/coronavirus')} style={{flexDirection:'row'}}>
      <Image source={{ uri:'https://res-5.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1414411312/ms02em5dcr39vrqwwhyf.png'}} style={{width:40, height:40,borderRadius:20}}></Image>
      <Text style={{fontSize:14,fontFamily:'futura'}}> Worldometers Coronavirus Info</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://forma.gov.gr')} style={{flexDirection:'row'}}>
      <Image source={{ uri:'https://forma.gov.gr/gscp_logo_xoris_grammata_0.png'}} style={{width:40, height:40, borderRadius:20}}></Image>
      <Text style={{fontSize:14,fontFamily:'futura'}}> forma.gov.gr</Text>
      </TouchableOpacity>
     
    </View> */}

    <Text> </Text>
<TouchableOpacity  onPress={()=>Linking.openURL(`mailto:fotisss@gmail.com?subject=Επικοινωνία για την εφαρμογή Μένουμε Σπίτι`)} style={{padding:10, }}>

      <Text style={{fontFamily:'futurabold', color:'#527a42'}}>13033 2.0</Text>
      <Text  style={{fontFamily:'futurabold', color:'#527a42'}}>Προτάσεις/σχόλια: Φώτιος Σταθόπουλος (fotisss@gmail.com)</Text>
      
</TouchableOpacity>

<View style={{flexDirection:'row',padding:10,height:100 }}>
<TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://fotis16.wixsite.com/13033/terms-conditions')} >
      <Text style={{fontSize:14,fontFamily:'futura', color:'#527a42'}}> Όροι Χρήσης</Text>
      </TouchableOpacity>
      <Text> - </Text>
  <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://fotis16.wixsite.com/13033/privacy-policy')} >
      <Text style={{fontSize:14,fontFamily:'futura',color:'#527a42'}}> Πολιτική Απορρήτου </Text>
      </TouchableOpacity>
</View>





</View>
</ScrollView>
  );
};


const styles = StyleSheet.create({

  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    // backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    // borderColor: '#ededed',
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

export default StartupScreen;
