import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import InteriorFeatures from '../screens/Features/InteriorFeatures';
import ExteriorFeatures from '../screens/Features/ExteriorFeatures';
import Media from '../screens/Features/Media';
import {Image, View} from 'react-native';
import InteriorImages from '../screens/Images/InteriorImages';
import ExteriorImages from '../screens/Images/ExteriorImages';

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
            marginLeft: 100,
          },
          headerLeft: () => (
            <View>
              <Image
                source={require('../assests/images/logo.png')}
                style={{width: 120, height: 40, marginLeft: 20}}
              />
            </View>
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

      <Stack.Screen
        name="InteriorImages"
        component={InteriorImages}
        options={{
          title: 'Interior Images',
          headerStyle: {
            backgroundColor: 'crimson',
          },
          headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="ExteriorImages"
        component={ExteriorImages}
        options={{
          title: 'Exterior Images',
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
