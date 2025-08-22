import { tokens } from './index';
const tokenizeArray = (arr, opts) =>
  new Set(arr.flatMap((s) => tokens(s, opts)));

export default tokenizeArray;
