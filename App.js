import React, {useState,useEffect,useRef} from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as SplashScreen  from 'expo-splash-screen';
import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import userProfileReducer from './store/reducers/userprofile'

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const { getInitialState } = useLinking(containerRef);


  const rootReducer = combineReducers({
    userprofile:userProfileReducer,
 
  });

  const store = createStore(rootReducer,applyMiddleware(ReduxThunk));


  const fetchFonts = async () => {
    return await Font.loadAsync({
      'futura': require('./assets/fonts/OpenSans-Regular.ttf'),
      'futurabold': require('./assets/fonts/OpenSans-Bold.ttf'),
     // 'futurabold': require('./assets/fonts/futurabold.ttf'),
     'comic': require('./assets/fonts/comic-sans-ms-regular.ttf'),
      'comicbold': require('./assets/fonts/comic-sans-ms-bold.ttf'),
    

     // 'futura': require('./assets/fonts/futura.ttf'),
    
    });
  };

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        await fetchFonts();
        // Load fonts
        // await Font.loadAsync({
        //   ...Ionicons.font,
        //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        // });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="13033" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
