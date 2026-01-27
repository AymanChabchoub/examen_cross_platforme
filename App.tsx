import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppTemplate from './src/templates/AppTemplate';

import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import Tabs from './src/navigations/Tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductDetailScreen from './src/screens/ProductDetail';
import RegisterScreen from './src/screens/Register';
import { useState } from 'react';
import LoadingScreen from './src/screens/Loading';

const Stack = createNativeStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    // Affiche le loading screen avant de montrer l'app
    return <LoadingScreen onLoaded={() => setLoading(false)} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppTemplate>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          </Stack.Navigator>
        </AppTemplate>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;