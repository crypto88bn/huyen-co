import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Svg, Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import useCompass from '../hooks/useCompass';
import Card from '../components/Card';
import HeaderBanner from '../components/HeaderBanner';

const DIRS = [
  { d:'Bắc', deg:0, chi:'Tý', hanh:'Thủy', y:'Sự nghiệp, công danh' },
  { d:'Đông Bắc', deg:45, chi:'Sửu Dần', hanh:'Thổ', y:'Tri thức, học vấn' },
  { d:'Đông', deg:90, chi:'Mão', hanh:'Mộc', y:'Gia đình, sức khỏe' },
  { d:'Đông Nam', deg:135, chi:'Thìn Tị', hanh:'Mộc', y:'Tài lộc, phồn thịnh' },
  { d:'Nam', deg:180, chi:'Ngọ', hanh:'Hỏa', y:'Danh tiếng, văn chương' },
  { d:'Tây Nam', deg:225, chi:'Mùi Thân', hanh:'Thổ', y:'Tình yêu, hôn nhân' },
  { d:'Tây', deg:270, chi:'Dậu', hanh:'Kim', y:'Con cái, sáng tạo' },
  { d:'Tây Bắc', deg:315, chi:'Tuất Hợi', hanh:'Kim', y:'Quý nhân, du lịch' },
];

function CompassRose({ angle }: { angle: number }) {
  const size = 220; const r = size / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={r} cy={r} r={r-4} fill="none" stroke={COLORS.border} strokeWidth="2" />
      <Circle cx={r} cy={r} r={r*0.55} fill="none" stroke={COLORS.gold+'22'} strokeWidth="1" />
      {[0,45,90,135,180,225,270,315].map(a => {
        const rad = (a-90)*Math.PI/180;
        const x1 = r+Math.cos(rad)*(r-20), y1 = r+Math.sin(rad)*(r-20);
        const x2 = r+Math.cos(rad)*(r-4), y2 = r+Math.sin(rad)*(r-4);
        return <Line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={a%90===0?COLORS.gold:COLORS.dim} strokeWidth={a%90===0?2:1}/>;
      })}
      {[{t:'B',a:0,c:COLORS.red},{t:'Đ',a:90,c:COLORS.goldL},{t:'N',a:180,c:COLORS.goldL},{t:'T',a:270,c:COLORS.goldL}].map(({t,a,c})=>{
        const rad=(a-90)*Math.PI/180;
        return <SvgText key={t} x={r+Math.cos(rad)*r*0.72} y={r+Math.sin(rad)*r*0.72} fill={c} fontSize={14} textAnchor="middle" fontFamily="Georgia" dy="4">{t}</SvgText>;
      })}
      <Polygon points={`${r},${r*0.12} ${r-6},${r+10} ${r},${r+5} ${r+6},${r+10}`} fill={COLORS.red} transform={`rotate(${angle},${r},${r})`}/>
      <Polygon points={`${r},${r*1.88} ${r-6},${r-10} ${r},${r-5} ${r+6},${r-10}`} fill={COLORS.text} opacity={0.5} transform={`rotate(${angle},${r},${r})`}/>
      <Circle cx={r} cy={r} r={4} fill={COLORS.gold}/>
    </Svg>
  );
}

export default function PhongThuyScreen() {
  const insets = useSafeAreaInsets();
  const { angle, available, directionName } = useCompass();
  const [simAngle, setSimAngle] = useState(0);

  useEffect(() => {
    if (available) return;
    const t = setInterval(() => setSimAngle(a => (a+0.5)%360), 32);
    return () => clearInterval(t);
  }, [available]);

  const displayAngle = available ? angle : simAngle;
  const curDir = DIRS.reduce((b,d) => {
    const diff = Math.abs(((displayAngle-d.deg+540)%360)-180);
    const bd   = Math.abs(((displayAngle-b.deg+540)%360)-180);
    return diff < bd ? d : b;
  });

  return (
    <ScrollView style={{ flex:1, backgroundColor:COLORS.bg }} contentContainerStyle={{ paddingBottom:20, paddingTop: insets.top }}>
      <HeaderBanner title="Phong Thủy Học" sub="La bàn · Bát quái · Ngũ hành" icon="🧭"/>
      <View style={{ padding:16, alignItems:'center' }}>
        <CompassRose angle={displayAngle}/>
        {!available && <Text style={{ color:COLORS.dim, fontSize:11, marginTop:4 }}>* Mô phỏng – kết nối thiết bị thật để dùng cảm biến</Text>}
        <View style={{ marginTop:12, alignItems:'center' }}>
          <Text style={{ color:COLORS.muted, fontSize:11, letterSpacing:1 }}>HƯỚNG ĐANG CHỈ</Text>
          <Text style={{ color:COLORS.goldL, fontSize:28, fontWeight:'bold', fontFamily:'Georgia', marginTop:4 }}>{curDir.d}</Text>
          <Text style={{ color:COLORS.muted, fontSize:13 }}>Chi: {curDir.chi} · Hành: {curDir.hanh}</Text>
          <Text style={{ color:COLORS.text, fontSize:13, marginTop:4, textAlign:'center' }}>{curDir.y}</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal:16 }}>
        <Text style={s.secTitle}>☯ Tám Cung Phương Vị</Text>
        {DIRS.map(d => (
          <Card key={d.d} style={{ marginBottom:8, borderColor: d.d===curDir.d ? COLORS.gold+'66' : COLORS.border }}>
            <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
              <View>
                <Text style={{ color: d.d===curDir.d ? COLORS.goldL : COLORS.text, fontSize:14, fontWeight:'bold' }}>{d.d}</Text>
                <Text style={{ color:COLORS.muted, fontSize:12 }}>{d.chi} · {d.hanh}</Text>
              </View>
              <Text style={{ color:COLORS.dim, fontSize:12, maxWidth:120, textAlign:'right' }}>{d.y}</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  secTitle: { color:COLORS.goldL, fontSize:15, fontFamily:'Georgia', fontWeight:'bold', letterSpacing:1, marginBottom:12 },
});
