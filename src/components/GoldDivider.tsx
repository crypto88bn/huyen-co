import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
export default function GoldDivider() {
  return (
    <View style={styles.row}>
      <View style={[styles.line, { opacity: 0.4 }]} />
      <Text style={styles.gem}>✦</Text>
      <View style={[styles.line, { opacity: 0.4 }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 16 },
  line: { flex: 1, height: 1, backgroundColor: COLORS.gold },
  gem: { color: COLORS.gold, fontSize: 10, marginHorizontal: 8 },
});
