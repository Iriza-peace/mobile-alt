import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import Register from "../screens/auth/register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screens/auth/login";
import Home from "../screens/app/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

export default function Navigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function getAuthToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      }
    }
    getAuthToken();
  }, []);

  if (!isLoggedIn) return <AuthNavigation />;
  return <AppNavigation />;
}

export function AuthNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// export function AppNavigation() {
//   const Tab = createBottomTabNavigator();
//   const Stack = createNativeStackNavigator();


//   return (

//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'blue',
//         tabBarInactiveTintColor: 'gray',
//         tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
//         tabBarStyle: { padding: 10, height: 70 },
//       })}
//     >
//       <Tab.Screen name="Home" component={Home} />

//       {/* Placeholder for Settings screen. Implement Settings component similarly to Home */}
//       <Tab.Screen name="Settings"component={() => null} ></Tab.Screen> 
//     </Tab.Navigator>

    
//   );
// }

export function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
            <Stack.Screen
        name="Auth"
        component={AuthNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
