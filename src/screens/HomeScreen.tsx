import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { tinhMenhCuc } from '../constants/canChi';
import Card from '../components/Card';

const nguHanh = [
  { name:'Kim', color:'#D4AF37', emoji:'⚙️', dir:'Tây' },
  { name:'Mộc', color:'#4FCF8A', emoji:'🌿', dir:'Đông' },
  { name:'Thủy', color:'#4F9FCF', emoji:'💧', dir:'Bắc' },
  { name:'Hỏa', color:'#CF4F4F', emoji:'🔥', dir:'Nam' },
  { name:'Thổ', color:'#C9912A', emoji:'🏔️', dir:'Trung' },
];

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const yr = time.getFullYear();
  const mc = tinhMenhCuc(yr);
  const h = time.getHours().toString().padStart(2,'0');
  const m = time.getMinutes().toString().padStart(2,'0');

  const cards = [
    { icon:'🧭', label:'La Bàn', sub:'Phong Thủy', screen:'PhongThuy' },
    { icon:'👁', label:'Nhân Tướng', sub:'Xem Tướng Mặt', screen:'NhanTuong' },
    { icon:'📖', label:'Tra Cứu', sub:'Kinh Dịch & Bát Quái', screen:'TraCuu' },
    { icon:'🎯', label:'Trắc Nghiệm', sub:'Kiểm Tra Kiến Thức', screen:'Quiz' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.bg }} contentContainerStyle={{ paddingBottom: 20 }}>
      <LinearGradient colors={['#1C0B35','#0B0910','#1A100A']} style={[styles.hero, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.heroSymbol}>☯</Text>
        <Text style={styles.heroTitle}>HUYỀN CƠ</Text>
        <Text style={styles.heroSub}>PHONG THỦY & NHÂN TƯỚNG HỌC</Text>
        <View style={styles.heroInfo}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.infoVal}>{mc.thienCan} {mc.diaChi}</Text>
            <Text style={styles.infoLabel}>Năm {yr}</Text>
          </View>
          <View style={{ width: 1, backgroundColor: COLORS.border }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.infoVal, { color: COLORS.goldS }]}>{h}:{m}</Text>
            <Text style={styles.infoLabel}>Giờ hiện tại</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ padding: 16 }}>
        <Card style={{ flexDirection:'row', gap:12, alignItems:'flex-start', marginBottom:20, backgroundColor: COLORS.card, borderColor: COLORS.gold+'44' }}>
          <Text style={{ fontSize: 24 }}>✨</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.tipLabel}>ĐIỀM LÀNH HÔM NAY</Text>
            <Text style={styles.tipText}>Hướng Đông Nam tốt cho tài lộc ngày hôm nay. Đặt vật kim loại ở góc Tây để tăng vận khí.</Text>
          </View>
        </Card>

        <Text style={styles.secTitle}>✦ Chức Năng Chính</Text>
        <View style={{ flexDirection:'row', flexWrap:'wrap', gap:10, marginBottom:20 }}>
          {cards.map(c => (
            <TouchableOpacity key={c.screen} onPress={() => navigation.navigate(c.screen)}
              style={[styles.funcCard, { width:'47%' }]}>
              <Text style={{ fontSize: 30, marginBottom: 8 }}>{c.icon}</Text>
              <Text style={[styles.funcLabel, { color: COLORS.goldL }]}>{c.label}</Text>
              <Text style={styles.funcSub}>{c.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.secTitle}>☯ Ngũ Hành</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {nguHanh.map(h => (
            <View key={h.name} style={[styles.elementCard, { borderColor: h.color+'44' }]}>
              <Text style={{ fontSize: 22 }}>{h.emoji}</Text>
              <Text style={[styles.elementName, { color: h.color }]}>{h.name}</Text>
              <Text style={styles.elementDir}>{h.dir}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { padding: 20, paddingTop: 48, alignItems:'center', borderBottomWidth: 1, borderBottomColor: COLORS.border },
  heroSymbol: { fontSize: 52, marginBottom: 4 },
  heroTitle: { color: COLORS.goldL, fontSize: 26, fontFamily:'Georgia', fontWeight:'bold', letterSpacing: 3 },
  heroSub: { color: COLORS.muted, fontSize: 12, marginTop: 4, letterSpacing: 2 },
  heroInfo: { flexDirection:'row', gap:24, marginTop: 20, alignItems:'center' },
  infoVal: { color: COLORS.gold, fontSize: 20, fontWeight:'bold', fontFamily:'Georgia' },
  infoLabel: { color: COLORS.muted, fontSize: 10, marginTop: 2 },
  tipLabel: { color: COLORS.goldS, fontSize: 11, marginBottom: 4, letterSpacing: 1 },
  tipText: { color: COLORS.text, fontSize: 13, lineHeight: 20 },
  secTitle: { color: COLORS.goldL, fontSize: 15, fontFamily:'Georgia', fontWeight:'bold', letterSpacing:1, marginBottom: 12 },
  funcCard: { backgroundColor: COLORS.card, borderWidth:1, borderColor: COLORS.border, borderRadius:16, padding:18, alignItems:'center' },
  funcLabel: { fontSize:14, fontWeight:'bold', marginBottom:2, fontFamily:'Georgia' },
  funcSub: { color: COLORS.muted, fontSize: 11, textAlign:'center' },
  elementCard: { backgroundColor: COLORS.card, borderWidth:1, borderRadius:12, padding:12, alignItems:'center', marginRight:8, width:80 },
  elementName: { fontSize: 13, fontWeight:'bold', marginTop:4 },
  elementDir: { color: COLORS.muted, fontSize: 10, marginTop: 2 },
});
