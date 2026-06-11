import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';
interface Props { title: string; sub?: string; icon?: string; }
export default function HeaderBanner({ title, sub, icon }: Props) {
  return (
    <LinearGradient colors={['#1A0D2E','#0E0A1A','#1A0D2E']} style={styles.wrap}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
      {sub && <Text style={styles.sub}>{sub}</Text>}
      <View style={styles.dots}>
        {[0,1,2,3,4].map(i => (
          <View key={i} style={[styles.dot, { backgroundColor: i===2 ? COLORS.gold : COLORS.gold+'44' }]} />
        ))}
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  wrap: { padding: 28, paddingTop: 48, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  icon: { fontSize: 36, marginBottom: 6 },
  title: { color: COLORS.goldL, fontSize: 22, fontFamily: 'Georgia', fontWeight: 'bold', letterSpacing: 2 },
  sub: { color: COLORS.muted, fontSize: 13, marginTop: 6, letterSpacing: 0.5 },
  dots: { flexDirection: 'row', gap: 6, marginTop: 12 },
  dot: { width: 4, height: 4, borderRadius: 2 },
});
