import { AsyncStorage} from 'react-native';
export const SET_USERPROFILE = 'SET_USERPROFILE';
export const SET_ACTIVEUSERID='SET_ACTIVEUSERID';
export const DELETE_ALL='DELETE_ALL';

export const fetchUserProfile = () => {
  return async (dispatch) => {
     try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const transformedData = JSON.parse(userData);      
        // for (var i=0;i<transformedData.length;i++) {
        //   console.log(transformedData[i]);
          dispatch({ type: SET_USERPROFILE, data: transformedData,activeuserid:0});
        //}
      return Promise.resolve({type: 'success'});
      }
     }catch(err){
       console.log(err);
    }
    return Promise.resolve({type: 'failure'});
    }
  }

  export const saveUserProfile =  (userid,name, surname,street, number,city,postcode) => {
    return async (dispatch,getState) => {

      let updateduserprofiles=getState().userprofile.userProfiles;
      if (userid>=0)
      {
      const pindex= getState().userprofile.userProfiles.findIndex(p => p.userid === userid);
      updateduserprofiles[pindex] = {userid:userid,name:name, surname:surname,street:street, number:number,city:city,postcode:postcode}
      }
      else
      updateduserprofiles=getState().userprofile.userProfiles.concat({userid:getState().userprofile.userProfiles.length,name:name, surname:surname,street:street, number:number,city:city,postcode:postcode})
      
      await AsyncStorage.setItem(
        'userData', JSON.stringify(updateduserprofiles)
      );
      await  dispatch({ type: SET_USERPROFILE, data: updateduserprofiles, activeuserid:(userid>=0?userid:getState().userprofile.userProfiles.length)});
      
      
  }
}

export const deleteAllProfiles =  ()=>{
  return async (dispatch) => {
    await AsyncStorage.clear();
      dispatch({ type: DELETE_ALL});
      
  }
}



export const setActiveUserid = (userid)=>{
  return  (dispatch,getState) => {
      dispatch({ type: SET_ACTIVEUSERID, activeuserid:userid});
      
  }
}
  