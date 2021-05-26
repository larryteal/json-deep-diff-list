const _ = require('lodash');
const jsonKeyPathList = require('json-key-path-list');

module.exports = {
  jsonDeepDiffList
};

function jsonDeepDiffList(old, new_) {
  const oldKeyPathList = jsonKeyPathList(old);
  const newKeyPathList = jsonKeyPathList(new_);
  const intersectionKeyPathList = _.intersection(oldKeyPathList, newKeyPathList);
  const delKeyPathList = _.difference(oldKeyPathList, intersectionKeyPathList);
  const addKeyPathList = _.difference(newKeyPathList, intersectionKeyPathList);
  const diffList = [];

  intersectionKeyPathList.forEach(path => {
    const before = _.get(old, path);
    const after = _.get(new_, path);
    const op = 'replace'
    if(!_.isEqual(before, after)) {
      diffList.push({ op, path, before, after });
    }
  });

  delKeyPathList.forEach(path => {
    const before = _.get(old, path);
    const after = undefined;
    const op = 'del';
    diffList.push({ op, path, before, after });
  });

  addKeyPathList.forEach(path => {
    const before = undefined;
    const after = _.get(new_, path);
    const op = 'add';
    diffList.push({ op, path, before, after });
  });
  
  return diffList;
}
