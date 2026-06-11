export const THIEN_CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
export const DIA_CHI  = ['Tý','Sửu','Dần','Mão','Thìn','Tị','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
export const NGU_HANH_CAN = ['Mộc','Mộc','Hỏa','Hỏa','Thổ','Thổ','Kim','Kim','Thủy','Thủy'];
export const AM_DUONG_CAN = ['Dương','Âm','Dương','Âm','Dương','Âm','Dương','Âm','Dương','Âm'];
export const CUNG_MENH   = ['Khảm','Khôn','Chấn','Tốn','Cấn','Ly','Đoài','Càn','Ly','Khảm'];
export const CON_GIAP    = ['🐭','🐃','🐯','🐰','🐉','🐍','🐎','🐑','🐒','🐓','🐕','🐖'];
export type MenhCuc = { thienCan:string; diaChi:string; nguHanh:string; amDuong:string; cungMenh:string; conGiap:string; };
export function tinhMenhCuc(namSinh: number): MenhCuc {
  return {
    thienCan: THIEN_CAN[(namSinh - 4) % 10],
    diaChi:   DIA_CHI[(namSinh - 4) % 12],
    nguHanh:  NGU_HANH_CAN[(namSinh - 4) % 10],
    amDuong:  AM_DUONG_CAN[(namSinh - 4) % 10],
    cungMenh: CUNG_MENH[(namSinh - 4) % 10],
    conGiap:  CON_GIAP[(namSinh - 4) % 12],
  };
}
