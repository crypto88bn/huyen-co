import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import { tinhMenhCuc } from '../constants/canChi';
import Card from '../components/Card';
import GoldDivider from '../components/GoldDivider';
import HeaderBanner from '../components/HeaderBanner';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [namSinh, setNamSinh] = useState('1990');
  const [result, setResult] = useState<ReturnType<typeof tinhMenhCuc>|null>(null);

  const calc = () => {
    const y = parseInt(namSinh);
    if (!y||y<1900||y>2100) return;
    setResult(tinhMenhCuc(y));
  };

  const settings = [
    { icon:'🌙', label:'Chế Độ Tối', sub:'Đang bật' },
    { icon:'🔔', label:'Thông Báo', sub:'Nhắc nhở hàng ngày' },
    { icon:'📱', label:'Ngôn Ngữ', sub:'Tiếng Việt' },
    { icon:'ℹ️', label:'Về Ứng Dụng', sub:'Huyền Cơ v1.0' },
  ];

  return (
    <ScrollView style={{ flex:1, backgroundColor:COLORS.bg }} contentContainerStyle={{ paddingBottom:20, paddingTop:insets.top }}>
      <HeaderBanner title="Hồ Sơ" sub="Mệnh cục · Cung số · Thiết lập" icon="👤"/>
      <View style={{ padding:16 }}>
        <Card style={{ marginBottom:16 }}>
          <Text style={s.cardTitle}>Tính Mệnh Cục</Text>
          <TextInput value={namSinh} onChangeText={setNamSinh} placeholder="Năm sinh (VD: 1990)"
            placeholderTextColor={COLORS.dim} keyboardType="numeric"
            style={s.input}/>
          <TouchableOpacity onPress={calc} style={s.btn}>
            <Text style={{ color:'#fff', fontSize:14, fontFamily:'Georgia' }}>✨ Tính Ngay</Text>
          </TouchableOpacity>
        </Card>

        {result && (
          <Card style={{ borderColor:COLORS.gold+'55', marginBottom:20 }}>
            <View style={{ alignItems:'center', marginBottom:12 }}>
              <Text style={{ fontSize:48 }}>{result.conGiap}</Text>
              <Text style={{ color:COLORS.goldL, fontSize:20, fontWeight:'bold', fontFamily:'Georgia', marginTop:6 }}>
                {result.thienCan} {result.diaChi}
              </Text>
              <Text style={{ color:COLORS.muted, fontSize:13, marginTop:2 }}>{result.amDuong} {result.nguHanh}</Text>
            </View>
            <GoldDivider/>
            <View style={{ flexDirection:'row', flexWrap:'wrap' }}>
              {[
                ['Thiên Can',result.thienCan],['Địa Chi',result.diaChi],
                ['Ngũ Hành',result.nguHanh],['Âm Dương',result.amDuong],
                ['Cung Mệnh',result.cungMenh],['Con Giáp',result.conGiap],
              ].map(([lbl,val]) => (
                <View key={lbl} style={s.resultItem}>
                  <Text style={{ color:COLORS.muted, fontSize:11 }}>{lbl}</Text>
                  <Text style={{ color:COLORS.goldS, fontSize:16, fontWeight:'bold' }}>{val}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        <Text style={s.secTitle}>⚙️ Cài Đặt</Text>
        {settings.map((s2,i) => (
          <Card key={i} style={{ marginBottom:8, flexDirection:'row', alignItems:'center', gap:14 }}>
            <Text style={{ fontSize:20 }}>{s2.icon}</Text>
            <View style={{ flex:1 }}>
              <Text style={{ color:COLORS.text, fontSize:14 }}>{s2.label}</Text>
              <Text style={{ color:COLORS.muted, fontSize:12 }}>{s2.sub}</Text>
            </View>
            <Text style={{ color:COLORS.dim, fontSize:18 }}>›</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cardTitle: { color:COLORS.goldL, fontSize:14, fontWeight:'bold', marginBottom:10 },
  input: { backgroundColor:COLORS.bg, borderWidth:1, borderColor:COLORS.border, borderRadius:8, padding:10, color:COLORS.text, fontSize:14, marginBottom:10, fontFamily:'Georgia' },
  btn: { backgroundColor:COLORS.purple, borderRadius:10, padding:10, alignItems:'center' },
  secTitle: { color:COLORS.goldL, fontSize:15, fontFamily:'Georgia', fontWeight:'bold', marginBottom:12 },
  resultItem: { width:'50%', alignItems:'center', padding:8, borderBottomWidth:1, borderBottomColor:COLORS.border },
});
