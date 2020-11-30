import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import LOGO from '../assests/images/logo.svg';
import InteriorFeatures from '../screens/Features/InteriorFeatures';
import ExteriorFeatures from '../screens/Features/ExteriorFeatures';
import Media from '../screens/Features/Media';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'XRM',
          headerStyle: {
            backgroundColor: '#b9b9b9',
            elevation: 0,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 25,
            paddingLeft: 50,
          },
          headerLeft: () => (
            <LOGO height={100} width={100} style={{paddingLeft: 20}} />
          ),
        }}
      />
      <Stack.Screen
        name="InteriorFeatures"
        component={InteriorFeatures}
        options={{
          title: 'Interior Features',
          headerStyle: {
            backgroundColor: 'crimson',
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="ExteriorFeatures"
        component={ExteriorFeatures}
        options={{
          title: 'Exterior Features',
          headerStyle: {
            backgroundColor: 'crimson',
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="Media"
        component={Media}
        options={{
          title: 'Media',
          headerStyle: {
            backgroundColor: 'crimson',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
