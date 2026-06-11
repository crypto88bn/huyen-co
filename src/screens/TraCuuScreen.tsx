import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import Card from '../components/Card';
import HeaderBanner from '../components/HeaderBanner';
import { THIEN_CAN, DIA_CHI } from '../constants/canChi';

const QUA_LIST = [
  { qua:'☰ Thuần Càn', so:1, nghia:'Trời, mạnh mẽ, sáng tạo', luan:'Tốt lành, thời vận hanh thông. Nên tiến về phía trước, không ngại khó khăn.' },
  { qua:'☷ Thuần Khôn', so:2, nghia:'Đất, nhu thuận, nuôi dưỡng', luan:'Thuận theo tự nhiên, hợp tác sẽ thành công. Tránh độc đoán.' },
  { qua:'☳ Thuần Chấn', so:51, nghia:'Sấm, chấn động, thức tỉnh', luan:'Có biến động bất ngờ nhưng kết cục tốt. Cần bình tĩnh đối phó.' },
  { qua:'☶ Thuần Cấn', so:52, nghia:'Núi, dừng lại, tĩnh tại', luan:'Biết dừng đúng lúc là khôn ngoan. Giữ vững lập trường.' },
  { qua:'☵ Thuần Khảm', so:29, nghia:'Nước, hiểm trở, trí tuệ', luan:'Thời kỳ nhiều thử thách. Cần kiên nhẫn và trí tuệ vượt qua.' },
  { qua:'☲ Thuần Ly', so:30, nghia:'Lửa, sáng sủa, vẻ đẹp', luan:'Ánh sáng chiếu rọi mọi nơi. Tài năng được phát huy, danh tiếng nổi.' },
  { qua:'☴ Thuần Tốn', so:57, nghia:'Gió, xâm nhập, nhu mì', luan:'Kiên trì nỗ lực nhỏ sẽ đạt kết quả lớn. Không nên cứng nhắc.' },
  { qua:'☱ Thuần Đoài', so:58, nghia:'Hồ, vui mừng, ngôn luận', luan:'Giao tiếp thuận lợi, hợp tác vui vẻ. Đây là thời của sự thư thái.' },
];

export default function TraCuuScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<number|null>(null);
  const [tab, setTab] = useState<'kinhDich'|'canChi'>('kinhDich');

  const filtered = query ? QUA_LIST.filter(d => d.qua.includes(query)||d.nghia.includes(query)||d.luan.includes(query)) : QUA_LIST;

  return (
    <ScrollView style={{ flex:1, backgroundColor:COLORS.bg }} contentContainerStyle={{ paddingBottom:20, paddingTop: insets.top }}>
      <HeaderBanner title="Tra Cứu" sub="Kinh Dịch · Bát Quái · Can Chi" icon="📖"/>
      <View style={{ padding:16 }}>
        <View style={s.searchWrap}>
          <Text style={{ position:'absolute', left:12, zIndex:1, fontSize:16 }}>🔍</Text>
          <TextInput value={query} onChangeText={setQuery} placeholder="Tìm kiếm quẻ, ý nghĩa..."
            placeholderTextColor={COLORS.dim} style={s.searchInput}/>
        </View>
        <View style={{ flexDirection:'row', gap:8, marginBottom:16 }}>
          {(['kinhDich','canChi'] as const).map(t => (
            <TouchableOpacity key={t} onPress={() => setTab(t)}
              style={[s.tabBtn, { backgroundColor: tab===t ? COLORS.purple : COLORS.card, borderColor: tab===t ? COLORS.purple : COLORS.border }]}>
              <Text style={{ color: tab===t ? '#fff' : COLORS.muted, fontSize:13, fontFamily:'Georgia' }}>
                {t==='kinhDich' ? 'Kinh Dịch' : 'Can Chi'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 'kinhDich' && filtered.map(d => (
          <Card key={d.so} style={{ marginBottom:8 }} onPress={() => setOpenId(openId===d.so ? null : d.so)}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
              <View style={{ flexDirection:'row', gap:12, alignItems:'center' }}>
                <Text style={{ fontSize:24 }}>{d.qua.split(' ')[0]}</Text>
                <View>
                  <Text style={{ color:COLORS.goldL, fontSize:14, fontWeight:'bold' }}>Quẻ {d.so} - {d.qua.split(' ').slice(1).join(' ')}</Text>
                  <Text style={{ color:COLORS.muted, fontSize:12 }}>{d.nghia}</Text>
                </View>
              </View>
              <Text style={{ color:COLORS.dim, fontSize:18 }}>{openId===d.so ? '∨' : '›'}</Text>
            </View>
            {openId===d.so && (
              <View style={{ marginTop:12, paddingTop:12, borderTopWidth:1, borderTopColor:COLORS.border }}>
                <Text style={{ color:COLORS.gold, fontSize:12, marginBottom:4 }}>Luận giải:</Text>
                <Text style={{ color:COLORS.text, fontSize:13, lineHeight:22 }}>{d.luan}</Text>
              </View>
            )}
          </Card>
        ))}

        {tab === 'canChi' && (
          <View>
            <Text style={s.secTitle}>Thập Thiên Can</Text>
            <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8, marginBottom:20 }}>
              {THIEN_CAN.map(c => (
                <View key={c} style={s.badge}><Text style={{ color:COLORS.text, fontSize:14 }}>{c}</Text></View>
              ))}
            </View>
            <Text style={s.secTitle}>Thập Nhị Địa Chi</Text>
            <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8 }}>
              {DIA_CHI.map((c,i) => (
                <View key={c} style={s.badge}><Text style={{ color:COLORS.text, fontSize:14 }}>{c}</Text></View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  searchWrap: { position:'relative', marginBottom:16 },
  searchInput: { backgroundColor:COLORS.card, borderWidth:1, borderColor:COLORS.border, borderRadius:12, padding:10, paddingLeft:40, color:COLORS.text, fontSize:14, fontFamily:'Georgia' },
  tabBtn: { borderWidth:1, borderRadius:20, paddingHorizontal:16, paddingVertical:6 },
  secTitle: { color:COLORS.goldL, fontSize:15, fontFamily:'Georgia', fontWeight:'bold', marginBottom:10 },
  badge: { backgroundColor:COLORS.card, borderWidth:1, borderColor:COLORS.border, borderRadius:8, paddingHorizontal:10, paddingVertical:4 },
});
