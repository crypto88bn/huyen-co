import { useState, useEffect, useRef } from 'react';
import { Magnetometer } from 'expo-sensors';

export default function useCompass() {
  const [angle, setAngle] = useState(0);
  const [available, setAvailable] = useState(false);
  const sub = useRef<ReturnType<typeof Magnetometer.addListener> | null>(null);

  useEffect(() => {
    Magnetometer.isAvailableAsync().then(ok => {
      setAvailable(ok);
      if (!ok) return;
      Magnetometer.setUpdateInterval(100);
      sub.current = Magnetometer.addListener(({ x, y }) => {
        let a = Math.atan2(y, x) * (180 / Math.PI);
        if (a < 0) a += 360;
        setAngle(Math.round(a));
      });
    });
    return () => { sub.current?.remove(); };
  }, []);

  const directionName = (a: number) => {
    const dirs = ['Bắc','Đông Bắc','Đông','Đông Nam','Nam','Tây Nam','Tây','Tây Bắc'];
    return dirs[Math.round(a / 45) % 8];
  };

  return { angle, available, directionName: directionName(angle) };
}
