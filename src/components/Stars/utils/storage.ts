export interface Storage {
  get: (key: string) => any & undefined;
  save: (key: string, data: any, remeber?: boolean) => void;
  remove: (key: string) => void;
}

export default {
  get: (key) => {
    let data = localStorage.getItem(key);
    if (!data) data = sessionStorage.getItem(key);
    return data;
  },
  save: (key, data, remeber?) => {
    let saveData = data;
    if (typeof data === 'object') saveData = JSON.stringify(data);
    if (remeber) localStorage.setItem(key, saveData);
    else sessionStorage.setItem(key, saveData);
  },
  remove: (key) => {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  },
} as Storage;
