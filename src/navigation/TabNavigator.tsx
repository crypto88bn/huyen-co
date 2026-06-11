import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { COLORS } from '../constants/theme';
import HomeScreen      from '../screens/HomeScreen';
import PhongThuyScreen from '../screens/PhongThuyScreen';
import NhanTuongScreen from '../screens/NhanTuongScreen';
import TraCuuScreen    from '../screens/TraCuuScreen';
import QuizScreen      from '../screens/QuizScreen';
import ProfileScreen   from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const ICONS: Record<string,string> = { Home:'🏠', PhongThuy:'🧭', NhanTuong:'👁', TraCuu:'📖', Quiz:'🎯', Profile:'👤' };
const LABELS: Record<string,string> = { Home:'Trang Chủ', PhongThuy:'Phong Thủy', NhanTuong:'Nhân Tướng', TraCuu:'Tra Cứu', Quiz:'Quiz', Profile:'Hồ Sơ' };

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border, paddingBottom: 6, height: 60 },
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? COLORS.goldL : COLORS.dim, fontSize: 9, fontFamily: 'Georgia' }}>
            {LABELS[route.name]}
          </Text>
        ),
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>{ICONS[route.name]}</Text>
            {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.goldL, marginTop: 2 }} />}
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home"       component={HomeScreen} />
      <Tab.Screen name="PhongThuy"  component={PhongThuyScreen} />
      <Tab.Screen name="NhanTuong"  component={NhanTuongScreen} />
      <Tab.Screen name="TraCuu"     component={TraCuuScreen} />
      <Tab.Screen name="Quiz"       component={QuizScreen} />
      <Tab.Screen name="Profile"    component={ProfileScreen} />
    </Tab.Navigator>
  );
}
