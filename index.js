const jsonKeyPathList = require('json-key-path-list');

const Utils = require('./utils.js');

module.exports = {
  jsonDeepDiffList
};

function jsonDeepDiffList(old, new_) {
  const oldKeyPathList = jsonKeyPathList(old);
  const newKeyPathList = jsonKeyPathList(new_);
  const intersectionKeyPathList = Utils.intersection(oldKeyPathList, newKeyPathList);
  const delKeyPathList = Utils.difference(oldKeyPathList, intersectionKeyPathList);
  const addKeyPathList = Utils.difference(newKeyPathList, intersectionKeyPathList);
  const diffList = [];

  intersectionKeyPathList.forEach(path => {
    const before = Utils.get(old, path);
    const after = Utils.get(new_, path);
    const op = 'replace'
    if(!Utils.isEqual(before, after)) {
      diffList.push({ op, path, before, after });
    }
  });

  delKeyPathList.forEach(path => {
    const before = Utils.get(old, path);
    const after = undefined;
    const op = 'del';
    diffList.push({ op, path, before, after });
  });

  addKeyPathList.forEach(path => {
    const before = undefined;
    const after = Utils.get(new_, path);
    const op = 'add';
    diffList.push({ op, path, before, after });
  });
  
  return diffList;
}
