const isEqual = require('util').isDeepStrictEqual;

function get(obj, path, defValue) {
  if (!path) {
    return undefined;
  }
  // Check if path is string or array.
  // Regex matches strings like `a[0].bar.c`
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Return if exists, otherwise return default value
  return (
    pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj) || defValue
  );
}

function difference(arr1, arr2) {
  return arr1.filter(x => !arr2.includes(x));
}

function intersection(arr, ...args) {
  return arr.filter(item => args.every(arr => arr.includes(item)));
}

module.exports = {
  difference,
  get,
  intersection,
  isEqual
};
