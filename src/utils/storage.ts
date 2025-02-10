import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const STORAGE_KEYS = {
  AUTH_STATE: 'auth_state',
  USER: 'user',
} as const;

export const persistAuthState = (authState: string | null) => {
  if (authState) {
    storage.set(STORAGE_KEYS.AUTH_STATE, authState);
  } else {
    storage.delete(STORAGE_KEYS.AUTH_STATE);
  }
};

export const persistUser = (user: any | null) => {
  if (user) {
    storage.set(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    storage.delete(STORAGE_KEYS.USER);
  }
};

export const getPersistedAuthState = (): string | null => {
  console.log('getPersistedAuthState', storage.getString(STORAGE_KEYS.AUTH_STATE));
  return storage.getString(STORAGE_KEYS.AUTH_STATE) || null;
};

export const getPersistedUser = (): any | null => {
  const userString = storage.getString(STORAGE_KEYS.USER);
  console.log('getPersistedUser', userString);
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};
