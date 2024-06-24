import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/src/api/screens/HomeScreen';
import PostScreen from '../app/src/api/screens/PostScreen';
import CreatePostScreen from '../app/src/api/screens/CreateScreen';

const Stack = createStackNavigator();

const App = () => {
  return (

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      </Stack.Navigator>

  );
};

export default App;
