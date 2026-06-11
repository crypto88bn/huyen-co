/**
 * Phong Thủy Utility Functions
 */

export type HuongPhongThuy = {
  ten: string;
  goc: number;
  cuaQua: string;
  nguHanh: string;
  yNghia: string;
  mauSac: string;
  vatPham: string;
};

export const HUONG_LIST: HuongPhongThuy[] = [
  { ten:'Bắc',     goc:0,   cuaQua:'Khảm', nguHanh:'Thủy', mauSac:'Đen, Xanh đậm',  vatPham:'Đài phun nước, cá cảnh',    yNghia:'Sự nghiệp, công danh, thăng tiến' },
  { ten:'Đông Bắc',goc:45,  cuaQua:'Cấn',  nguHanh:'Thổ',  mauSac:'Vàng đất, Be',   vatPham:'Tinh thể, đá quý',           yNghia:'Tri thức, học vấn, sự thông minh' },
  { ten:'Đông',    goc:90,  cuaQua:'Chấn', nguHanh:'Mộc',  mauSac:'Xanh lá',        vatPham:'Cây xanh, cây tre',          yNghia:'Gia đình, sức khỏe, sinh khí' },
  { ten:'Đông Nam',goc:135, cuaQua:'Tốn',  nguHanh:'Mộc',  mauSac:'Xanh lam, Tím',  vatPham:'Cây phong thủy, hoa tươi',   yNghia:'Tài lộc, phồn thịnh, may mắn' },
  { ten:'Nam',     goc:180, cuaQua:'Ly',   nguHanh:'Hỏa',  mauSac:'Đỏ, Cam',        vatPham:'Đèn, nến, tượng phụng',      yNghia:'Danh tiếng, văn chương, nghệ thuật' },
  { ten:'Tây Nam', goc:225, cuaQua:'Khôn', nguHanh:'Thổ',  mauSac:'Vàng, Hồng',     vatPham:'Cặp đôi, pha lê hồng',       yNghia:'Tình yêu, hôn nhân, quan hệ' },
  { ten:'Tây',     goc:270, cuaQua:'Đoài', nguHanh:'Kim',  mauSac:'Trắng, Bạc',     vatPham:'Kim loại, chuông gió',       yNghia:'Con cái, sáng tạo, vui vẻ' },
  { ten:'Tây Bắc', goc:315, cuaQua:'Càn',  nguHanh:'Kim',  mauSac:'Vàng kim, Bạch', vatPham:'Địa cầu kim loại, tượng mã', yNghia:'Quý nhân, du lịch, người đỡ đầu' },
];

export function getHuong(angle: number): HuongPhongThuy {
  const normalized = ((angle % 360) + 360) % 360;
  return HUONG_LIST.reduce((best, h) => {
    const diff = Math.abs(((normalized - h.goc + 540) % 360) - 180);
    const bestDiff = Math.abs(((normalized - best.goc + 540) % 360) - 180);
    return diff < bestDiff ? h : best;
  });
}

export type NguHanh = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export const TUONG_SINH: Record<NguHanh, NguHanh> = {
  Kim: 'Thủy', Thủy: 'Mộc', Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim',
};
export const TUONG_KHAC: Record<NguHanh, NguHanh> = {
  Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim',
};
