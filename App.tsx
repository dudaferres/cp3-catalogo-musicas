import { useEffect, useState, type JSX } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { getSession } from './storage';
import { COLORS } from './theme';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';

// o stack nasce ligado ao tipo das rotas
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  // extra: se já existe sessão guardada, o app abre direto na Home
  // null = ainda lendo o AsyncStorage
  const [firstRoute, setFirstRoute] = useState<'Login' | 'Home' | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const session: string | null = await getSession();
      setFirstRoute(session !== null ? 'Home' : 'Login');
    };
    load();
  }, []);

  // enquanto lê a sessão, mostra um carregando (o stack só monta quando sabe por onde começar)
  if (firstRoute === null) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center' }}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName={firstRoute}
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.header },
          headerTintColor: COLORS.text,
          headerTitleStyle: { fontSize: 15, fontWeight: '600' },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'Músicas' }} />
        {/* o header do Detalhe mostra o nome da música que ele recebeu */}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ title: route.params.music.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
