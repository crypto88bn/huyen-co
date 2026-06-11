import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import Card from '../components/Card';
import HeaderBanner from '../components/HeaderBanner';

const QUESTIONS = [
  { q:'Trong ngũ hành, nguyên tố nào tương sinh với Kim?', opts:['Mộc','Thủy','Hỏa','Thổ'], ans:3, explain:'Thổ sinh Kim: lòng đất chứa đựng và sinh ra kim loại.' },
  { q:'Quẻ ☰ (ba vạch liền) trong Bát Quái tượng trưng cho?', opts:['Đất (Khôn)','Nước (Khảm)','Trời (Càn)','Sấm (Chấn)'], ans:2, explain:'☰ là quẻ Càn, tượng trưng cho Trời, có ý nghĩa mạnh mẽ và sáng tạo.' },
  { q:'Hướng nào trong phong thủy được coi là hướng tài lộc chính?', opts:['Chính Bắc','Chính Tây','Đông Nam','Tây Bắc'], ans:2, explain:'Hướng Đông Nam thuộc cung Tốn, chủ về tiền tài và phồn thịnh.' },
  { q:'"Nhân trung" trong nhân tướng học là bộ vị nào?', opts:['Vùng giữa hai mắt','Rãnh giữa mũi và môi trên','Phần cằm','Vùng thái dương'], ans:1, explain:'Nhân trung là rãnh dọc giữa mũi và môi, liên quan đến thọ mạng.' },
  { q:'Thập thiên can bắt đầu bằng hai can nào?', opts:['Bính - Đinh','Mậu - Kỷ','Giáp - Ất','Canh - Tân'], ans:2, explain:'Thứ tự thập thiên can: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý.' },
];

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);

  const q = QUESTIONS[idx];

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const ok = i === q.ans;
    if (ok) setScore(s => s+1);
    setHistory(h => [...h, ok]);
  };

  const next = () => {
    if (idx+1 >= QUESTIONS.length) { setDone(true); return; }
    setIdx(i => i+1); setSelected(null);
  };

  const reset = () => { setIdx(0); setSelected(null); setScore(0); setDone(false); setHistory([]); };

  if (done) return (
    <View style={{ flex:1, backgroundColor:COLORS.bg, paddingTop:insets.top }}>
      <HeaderBanner title="Kết Quả" sub="Trắc nghiệm hoàn thành" icon="🎯"/>
      <View style={{ flex:1, padding:24, alignItems:'center', justifyContent:'center' }}>
        <Text style={{ fontSize:64 }}>{score>=4?'🏆':score>=3?'⭐':'📚'}</Text>
        <Text style={{ color:COLORS.goldL, fontSize:32, fontWeight:'bold', marginTop:12 }}>{score}/{QUESTIONS.length}</Text>
        <Text style={{ color:COLORS.muted, fontSize:16, marginTop:8, textAlign:'center' }}>
          {score>=4?'Xuất sắc! Bạn hiểu sâu về Huyền học':score>=3?'Tốt! Tiếp tục học hỏi thêm':'Cần ôn luyện thêm kiến thức'}
        </Text>
        <View style={{ flexDirection:'row', gap:8, marginVertical:24 }}>
          {QUESTIONS.map((_,i) => (
            <View key={i} style={{ width:36, height:36, borderRadius:18,
              backgroundColor: history[i] ? COLORS.green+'33' : COLORS.red+'33',
              borderWidth:2, borderColor: history[i] ? COLORS.green : COLORS.red,
              alignItems:'center', justifyContent:'center' }}>
              <Text style={{ color: history[i] ? COLORS.green : COLORS.red, fontSize:14 }}>{history[i]?'✓':'✗'}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={reset} style={s.btn}>
          <Text style={{ color:'#fff', fontSize:16, fontFamily:'Georgia' }}>Làm Lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex:1, backgroundColor:COLORS.bg }} contentContainerStyle={{ paddingBottom:20, paddingTop: insets.top }}>
      <HeaderBanner title="Trắc Nghiệm" sub="Kiểm tra kiến thức huyền học" icon="🎯"/>
      <View style={{ padding:20 }}>
        <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:12 }}>
          <Text style={{ color:COLORS.muted, fontSize:13 }}>Câu {idx+1} / {QUESTIONS.length}</Text>
          <Text style={{ color:COLORS.goldL, fontSize:13 }}>Điểm: {score}</Text>
        </View>
        <View style={{ backgroundColor:COLORS.border, borderRadius:4, height:4, marginBottom:24 }}>
          <View style={{ backgroundColor:COLORS.purple, height:4, borderRadius:4, width:`${(idx/QUESTIONS.length)*100}%` }}/>
        </View>
        <Card style={{ marginBottom:20, padding:20 }}>
          <Text style={{ color:COLORS.text, fontSize:16, textAlign:'center', lineHeight:26, fontFamily:'Georgia' }}>{q.q}</Text>
        </Card>
        {q.opts.map((opt,i) => {
          let bc = COLORS.border, bgc = COLORS.card, tc = COLORS.text;
          if (selected !== null) {
            if (i===q.ans) { bc=COLORS.green; bgc=COLORS.green+'22'; tc=COLORS.green; }
            else if (i===selected) { bc=COLORS.red; bgc=COLORS.red+'22'; tc=COLORS.red; }
          }
          return (
            <TouchableOpacity key={i} onPress={() => choose(i)}
              style={[s.option, { borderColor:bc, backgroundColor:bgc }]}>
              <View style={[s.optBubble, { borderColor:bc }]}>
                <Text style={{ color:bc, fontSize:12 }}>{String.fromCharCode(65+i)}</Text>
              </View>
              <Text style={{ color:tc, fontSize:14, fontFamily:'Georgia', flex:1 }}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        {selected !== null && (
          <View>
            <Card style={{ backgroundColor:COLORS.gold+'11', borderColor:COLORS.gold+'44', marginBottom:16 }}>
              <Text style={{ color:COLORS.goldS, fontSize:12, marginBottom:6 }}>✨ GIẢI THÍCH</Text>
              <Text style={{ color:COLORS.text, fontSize:13, lineHeight:22 }}>{q.explain}</Text>
            </Card>
            <TouchableOpacity onPress={next} style={s.btn}>
              <Text style={{ color:'#fff', fontSize:15, fontFamily:'Georgia' }}>
                {idx+1>=QUESTIONS.length?'Xem Kết Quả':'Câu Tiếp →'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  option: { flexDirection:'row', alignItems:'center', gap:12, borderWidth:1, borderRadius:12, padding:12, marginBottom:10 },
  optBubble: { width:28, height:28, borderRadius:14, borderWidth:1, alignItems:'center', justifyContent:'center' },
  btn: { borderRadius:12, padding:14, alignItems:'center', backgroundColor:COLORS.purple },
});
