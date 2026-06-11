import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export function useStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  useEffect(() => {
    AsyncStorage.getItem(key).then(v => { if (v !== null) setValue(JSON.parse(v)); });
  }, [key]);
  const save = async (v: T) => {
    setValue(v);
    await AsyncStorage.setItem(key, JSON.stringify(v));
  };
  return [value, save] as const;
}
