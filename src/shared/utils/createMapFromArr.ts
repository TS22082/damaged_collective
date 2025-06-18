/**
 * Creates a Map from an array of objects, using the specified key as the map key.
 *
 * @template T - The type of objects in the array.
 * @template K - The key type, which must be a key of T.
 * @param {T[]} arr - The array of objects to convert to a Map.
 * @param {K} key - The key to use as the map key.
 * @returns {Map<T[K], T>} A Map where each key is the value of the specified key in the original array objects, and each value is the corresponding object.
 */

export const createMapFromArr = <T, K extends keyof T>(arr: T[], key: K) => {
  const map = new Map();
  for (const item of arr) {
    map.set(item[key], item);
  }
  return map;
};

export default createMapFromArr;
