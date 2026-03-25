import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const { userProfile } = useAuth();
  const role = userProfile?.role || 'student';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: role === 'hr' ? Colors.indigo : Colors.teal,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors.bg2,
          borderTopColor: Colors.border,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: role === 'hr' ? 'Overview' : 'Resume',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: role === 'hr' ? 'Interviews' : 'Mock',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="mic.fill" color={color} />,
        }}
      />
      {role === 'student' && (
        <Tabs.Screen
          name="tests"
          options={{
            title: 'Tests',
            tabBarIcon: ({ color }) => <IconSymbol size={24} name="beaker.fill" color={color} />,
          }}
        />
      )}
    </Tabs>
  );
}
