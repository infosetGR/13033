//import PRODUCTS from '../../data/dummy-data';
import {
  SET_USERPROFILE,SET_ACTIVEUSERID,DELETE_ALL
} from '../actions/userprofile';

const initialState = {
  userProfiles:[{userid:0, name:'', surname:'', street:'',number:'',city:'', postcode:'' }],
  activeuserid:0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERPROFILE:
      return {
        ...state, 
        userProfiles:action.data,
        activeuserid:action.activeuserid
      };
    case SET_ACTIVEUSERID:
      return {
        ...state, 
        activeuserid:action.activeuserid
      };

      case DELETE_ALL:
        return {
          userProfiles:[{userid:0, name:'', surname:'', street:'',number:'',city:'', postcode:'' }],
        activeuserid:0
          
        };
      }
      
  return state;
};
