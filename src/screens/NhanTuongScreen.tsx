import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import Card from '../components/Card';
import HeaderBanner from '../components/HeaderBanner';

const TOPICS = [
  { id:'mat', icon:'👁', label:'Xem Mắt', sub:'Tinh anh, thần sắc, vận mệnh', color:COLORS.purple },
  { id:'mui', icon:'👃', label:'Xem Mũi', sub:'Tài lộc, sức khỏe, tuổi thọ', color:COLORS.gold },
  { id:'mieng', icon:'👄', label:'Xem Miệng', sub:'Ngôn từ, quan hệ, ẩm thực', color:COLORS.red },
  { id:'tai', icon:'👂', label:'Xem Tai', sub:'Thọ mạng, trí tuệ bẩm sinh', color:COLORS.purpleL },
  { id:'tran', icon:'🧠', label:'Xem Trán', sub:'Vận trình, tiền tài, quan lộ', color:COLORS.goldL },
  { id:'cam', icon:'🌟', label:'Xem Cằm', sub:'Vãn niên, con cái, phúc đức', color:COLORS.green },
];

const DETAIL: Record<string,{ title:string; items:{sub:string;icon:string;text:string}[] }> = {
  mat: { title:'Nhân Tướng - Xem Mắt', items:[
    { sub:'Mắt Phụng', icon:'👁', text:'Đuôi mắt dài, hơi cong lên. Người có mắt phụng thường được quý nhân phù trợ, giỏi giao tiếp và thăng tiến trong sự nghiệp.' },
    { sub:'Mắt Rồng', icon:'🔵', text:'Mắt to, tròn đen láy. Biểu tượng của người tài trí, đa cảm. Thường có năng lực lãnh đạo và khả năng thu phục lòng người.' },
    { sub:'Mắt Hổ (Tam Bạch Nhãn)', icon:'🟡', text:'Tròng trắng xuất hiện ở 3 phía. Người có mắt hổ mang tính cương quyết, dũng mãnh nhưng cần kiểm soát nóng nảy.' },
  ]},
  tran: { title:'Nhân Tướng - Xem Trán', items:[
    { sub:'Trán Rộng, Cao', icon:'🏆', text:'Biểu tượng của trí tuệ, tư duy rộng mở. Người có trán cao thường thành công trong học vấn và sự nghiệp tri thức.' },
    { sub:'Tam Đài Vạn', icon:'🐉', text:'Ba nếp nhăn song song thẳng - tướng đại quý. Người xưa gọi là Tam đài vạn, chủ về phú quý và công danh hiển đạt.' },
  ]},
  mui: { title:'Nhân Tướng - Xem Mũi', items:[
    { sub:'Mũi Sư Tử (Sư Tử Tị)', icon:'🦁', text:'Mũi to, đầu mũi tròn và đầy. Tướng đại phú, chủ về tiền tài dồi dào và cuộc sống sung túc ở trung niên.' },
    { sub:'Mũi Cong Như Mỏ Ưng', icon:'🦅', text:'Sống mũi cao, đầu cong xuống. Người có ý chí mạnh mẽ, quyết đoán trong công việc và kinh doanh.' },
  ]},
  tai: { title:'Nhân Tướng - Xem Tai', items:[
    { sub:'Tai Cánh Tiên (Luân Quách Phân Minh)', icon:'✨', text:'Vành tai và gờ tai rõ ràng. Người thông minh từ nhỏ, dễ tiếp thu kiến thức và có trí nhớ tốt.' },
    { sub:'Tai Cao Hơn Lông Mày', icon:'👂', text:'Tai đặt cao, vị trí vượt qua lông mày. Tướng thông tuệ bẩm sinh, thường thành đạt sớm trong cuộc đời.' },
  ]},
  mieng: { title:'Nhân Tướng - Xem Miệng', items:[
    { sub:'Miệng Chim Phượng', icon:'🐦', text:'Môi trên cong như cánh chim, gọn và đều. Người có tài ăn nói, giỏi ngoại giao và thường được người khác yêu quý.' },
    { sub:'Môi Dày Đều Nhau', icon:'💋', text:'Cả hai môi đều dày vừa phải. Biểu tượng của người chân thành, giàu tình cảm và cuộc hôn nhân hạnh phúc bền lâu.' },
  ]},
  cam: { title:'Nhân Tướng - Xem Cằm', items:[
    { sub:'Cằm Vuông Chữ Điền', icon:'🟦', text:'Cằm vuông, chắc chắn. Người có cằm vuông thường có cuộc sống ổn định ở tuổi già, con cái hiếu thảo.' },
    { sub:'Cằm Tròn Đầy', icon:'🌕', text:'Cằm tròn và đầy thịt. Tướng phúc hậu, vãn niên an nhàn, thường được con cháu kính trọng và phụng dưỡng.' },
  ]},
};

export default function NhanTuongScreen() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string|null>(null);

  if (selected && DETAIL[selected]) {
    const d = DETAIL[selected];
    return (
      <ScrollView style={{ flex:1, backgroundColor:COLORS.bg }} contentContainerStyle={{ paddingBottom:20, paddingTop: insets.top }}>
        <View style={{ flexDirection:'row', alignItems:'center', gap:12, padding:16, borderBottomWidth:1, borderBottomColor:COLORS.border }}>
          <TouchableOpacity onPress={() => setSelected(null)}>
            <Text style={{ color:COLORS.goldL, fontSize:18 }}>‹</Text>
          </TouchableOpacity>
          <Text style={{ color:COLORS.goldL, fontSize:17, fontWeight:'bold', fontFamily:'Georgia' }}>{d.title}</Text>
        </View>
        <View style={{ padding:16 }}>
          {d.items.map((it,i) => (
            <Card key={i} style={{ marginBottom:12 }}>
              <View style={{ flexDirection:'row', gap:12, alignItems:'flex-start' }}>
                <Text style={{ fontSize:24 }}>{it.icon}</Text>
                <View style={{ flex:1 }}>
                  <Text style={{ color:COLORS.goldS, fontSize:14, fontWeight:'bold', marginBottom:6 }}>{it.sub}</Text>
                  <Text style={{ color:COLORS.text, fontSize:13, lineHeight:22 }}>{it.text}</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex:1, backgroundColor:COLORS.bg }} contentContainerStyle={{ paddingBottom:20, paddingTop: insets.top }}>
      <HeaderBanner title="Nhân Tướng Học" sub="Quan sát · Luận giải · Vận mệnh" icon="👁"/>
      <View style={{ padding:16 }}>
        <Card style={{ backgroundColor:COLORS.gold+'11', borderColor:COLORS.gold+'33', marginBottom:20 }}>
          <Text style={{ color:COLORS.muted, fontSize:13, lineHeight:22 }}>
            Nhân tướng học là bộ môn nghiên cứu tướng mạo con người để đoán định tính cách, vận mệnh và phúc họa dựa trên quan niệm "tâm sinh tướng" của người xưa.
          </Text>
        </Card>
        <Text style={s.secTitle}>👁 Các Bộ Vị</Text>
        <View style={{ flexDirection:'row', flexWrap:'wrap', gap:10 }}>
          {TOPICS.map(t => (
            <TouchableOpacity key={t.id} onPress={() => setSelected(t.id)} style={[s.topicCard, { borderColor:t.color+'44', width:'47%' }]}>
              <Text style={{ fontSize:28, marginBottom:8 }}>{t.icon}</Text>
              <Text style={{ color:t.color, fontSize:13, fontWeight:'bold', marginBottom:4 }}>{t.label}</Text>
              <Text style={{ color:COLORS.muted, fontSize:11, textAlign:'center', lineHeight:16 }}>{t.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  secTitle: { color:COLORS.goldL, fontSize:15, fontFamily:'Georgia', fontWeight:'bold', letterSpacing:1, marginBottom:12 },
  topicCard: { backgroundColor:COLORS.card, borderWidth:1, borderRadius:16, padding:16, alignItems:'center' },
});
