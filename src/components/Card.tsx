import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '../constants/theme';

interface Props { children: React.ReactNode; style?: ViewStyle; onPress?: () => void; }
export default function Card({ children, style, onPress }: Props) {
  const content = <View style={[styles.card, style]}>{children}</View>;
  return onPress ? <TouchableOpacity onPress={onPress} activeOpacity={0.75}>{content}</TouchableOpacity> : content;
}
const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 16 },
});
