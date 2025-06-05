export const createMapFromArr = <T, K extends keyof T>(arr: T[], key: K) => {
  const map = new Map();
  for (const item of arr) {
    map.set(item[key], item);
  }
  return map;
};

export default createMapFromArr;
