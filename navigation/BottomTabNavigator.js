import * as React from 'react';
import Image from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import StartupScreen from '../screens/StartupScreen';

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Home: AppTabNavigator,
//   Auth: AuthNavigator,
//   //Shop: ShopNavigator
  
// });


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Startup';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
 // navigation.setOptions({ headerTitle: getHeaderTitle(route), });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
    tabBarOptions={{showLabel: false} }
    >
      <BottomTab.Screen
        name="Startup"
        component={StartupScreen}
        options={{
          tabBarIcon: ({ focused}) => <TabBarIcon size={45} focused={focused} size={40}  name="md-information-circle" />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused}) => <TabBarIcon size={45} focused={focused} size={40}  name="md-person" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        
        options={{
          tabBarIcon: ({ focused}) => <TabBarIcon focused={focused} size={40} name="md-walk" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return ' ';//'Τα στοιχεία μου';
    case 'Links':
      return ' ';//'Θέλω να πάω..';
    
  }
}
