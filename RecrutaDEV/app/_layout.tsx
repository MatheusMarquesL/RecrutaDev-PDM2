import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CandidatesProvider } from '../context/CandidatesContext';
export default function TabLayout() {

  ficar atrás deles)
  const insets = useSafeAreaInsets();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CandidatesProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#7C3AED',
            tabBarInactiveTintColor: '#9CA3AF',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E5E7EB',
              height: 60 + insets.bottom,
              paddingBottom: 8 + insets.bottom,
              paddingTop: 8,
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Seleção',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="albums-outline" size={size}
                  color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="candidatos"
            options={{
              title: 'Gerente',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="briefcase-outline" size={size}
                  color={color} />
              ),
            }}
          />
        </Tabs>
      </CandidatesProvider>
    </GestureHandlerRootView>
  );
}