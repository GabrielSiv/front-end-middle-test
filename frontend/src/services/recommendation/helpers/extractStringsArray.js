const extractStringsArray = (obj = {}, key = '') => {
  if (!obj || !key) return [];
  const val = obj[key];

  if (Array.isArray(val)) return val.map((v) => String(v));
  if (typeof val === 'string' && val.trim() !== '') return [val];

  return [];
};
export default extractStringsArray;
