/**
 * Nhân Tướng Học Data
 */

export type BoVi = {
  id: string;
  ten: string;
  emoji: string;
  moTa: string;
  tuongTot: TuongMao[];
  tuongXau: TuongMao[];
};

export type TuongMao = {
  ten: string;
  dacDiem: string;
  yNghia: string;
};

export const BO_VI_LIST: BoVi[] = [
  {
    id: 'mat',
    ten: 'Mắt (Nhãn)',
    emoji: '👁',
    moTa: 'Mắt là cửa sổ tâm hồn, phản ánh tinh thần và vận mệnh của người.',
    tuongTot: [
      { ten:'Mắt Phụng', dacDiem:'Dài, đuôi cong nhẹ lên', yNghia:'Được quý nhân phù trợ, thăng tiến thuận lợi' },
      { ten:'Mắt Rồng', dacDiem:'To tròn, đen láy, sáng', yNghia:'Tài trí, lãnh đạo, thu phục lòng người' },
      { ten:'Mắt Phượng', dacDiem:'Dài vừa, mí mắt đôi rõ', yNghia:'Tài sắc song toàn, hôn nhân tốt đẹp' },
    ],
    tuongXau: [
      { ten:'Mắt Lươn', dacDiem:'Dài, mí một, ánh mắt lạnh', yNghia:'Hay đa nghi, khó tin tưởng người khác' },
      { ten:'Mắt Tứ Bạch', dacDiem:'Tròng trắng lộ bốn phía', yNghia:'Dễ gặp tai họa bất ngờ, cần cẩn thận' },
    ],
  },
  {
    id: 'mui',
    ten: 'Mũi (Tị)',
    emoji: '👃',
    moTa: 'Mũi chủ về tiền tài, trung niên vận và sức khỏe tổng thể.',
    tuongTot: [
      { ten:'Mũi Sư Tử', dacDiem:'Đầu mũi tròn đầy, cánh mũi rộng', yNghia:'Đại phú, tiền tài dồi dào, ăn nên làm ra' },
      { ten:'Mũi Thẳng Cao', dacDiem:'Sống mũi thẳng, đầu mũi tù', yNghia:'Chính trực, uy tín cao, được tôn trọng' },
    ],
    tuongXau: [
      { ten:'Mũi Hếch', dacDiem:'Lỗ mũi lộ, đầu mũi hếch lên', yNghia:'Khó giữ tiền của, chi tiêu bốc đồng' },
      { ten:'Mũi Gù', dacDiem:'Sống mũi có u gù ở giữa', yNghia:'Cuộc đời nhiều trắc trở, hay gặp phản bội' },
    ],
  },
  {
    id: 'tai',
    ten: 'Tai (Nhĩ)',
    emoji: '👂',
    moTa: 'Tai liên quan đến thọ mạng, trí tuệ bẩm sinh và phúc lộc tổ tiên.',
    tuongTot: [
      { ten:'Tai Luân Quách Rõ', dacDiem:'Vành tai và gờ trong rõ ràng', yNghia:'Thông minh từ nhỏ, trí nhớ tốt, học giỏi' },
      { ten:'Tai Cao Hơn Lông Mày', dacDiem:'Vị trí tai đặt rất cao', yNghia:'Đại quý, thành đạt sớm, tiền đồ rạng rỡ' },
      { ten:'Tai Dày Dái Tai Dài', dacDiem:'Tai dày, dái tai to dài', yNghia:'Trường thọ, phúc hậu, tiền bạc sung túc' },
    ],
    tuongXau: [
      { ten:'Tai Mỏng Không Dái', dacDiem:'Vành tai mỏng, không có dái tai', yNghia:'Thọ mạng ngắn, sức khỏe kém, hay lo lắng' },
    ],
  },
];
