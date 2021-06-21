const { expect } = require('chai');
const { jsonDeepDiffList } = require('../index');

describe('json deep diff list', () => {
  it('should be able to deep compare json and return diff list', () => {
    const jsonOld = {
      name: 'Larry',
      age: 18,
      addr: {
        code: 7705,
        name: 'CN',
      },
      lists: [{
        type: 'TV',
        name: 'AAA',
      }, {
        type: 'SP',
        name: 'AS1',
      }],
      others: {
        aa: 'aa',
        bb: 'bb',
      },
    };
    const jsonNew = {
      name: 'Xiaolei',
      age: 16,
      addr: {
        code: 8809,
        name: 'US',
      },
      lists: [{
        type: 'SP',
        name: 'AS1',
      }],
      todos: [{
        name: 't1',
        type: 'T1',
      }],
    };

    const diffList = jsonDeepDiffList(jsonOld, jsonNew);

    expect(diffList).to.deep.equal([
      {
        op: 'replace', path: 'name', before: 'Larry', after: 'Xiaolei',
      },
      {
        op: 'replace', path: 'age', before: 18, after: 16,
      },
      {
        op: 'replace', path: 'addr.code', before: 7705, after: 8809,
      },
      {
        op: 'replace', path: 'addr.name', before: 'CN', after: 'US',
      },
      {
        op: 'replace', path: 'lists.0.type', before: 'TV', after: 'SP',
      },
      {
        op: 'replace', path: 'lists.0.name', before: 'AAA', after: 'AS1',
      },
      {
        op: 'del', path: 'lists.1.type', before: 'SP', after: undefined,
      },
      {
        op: 'del', path: 'lists.1.name', before: 'AS1', after: undefined,
      },
      {
        op: 'del', path: 'others.aa', before: 'aa', after: undefined,
      },
      {
        op: 'del', path: 'others.bb', before: 'bb', after: undefined,
      },
      {
        op: 'add', path: 'todos.0.name', before: undefined, after: 't1',
      },
      {
        op: 'add', path: 'todos.0.type', before: undefined, after: 'T1',
      },
    ]);
  });

  it('should be no error when params is null', () => {
    const jsonOld = null;
    const jsonNew = null;

    const diffList = jsonDeepDiffList(jsonOld, jsonNew);

    expect(diffList).to.deep.equal([]);
  });

  it('should be no error when params is undefined', () => {
    const jsonOld = undefined;
    const jsonNew = undefined;

    const diffList = jsonDeepDiffList(jsonOld, jsonNew);

    expect(diffList).to.deep.equal([]);
  });

  it('should be no error when params is string', () => {
    const jsonOld = 'str1';
    const jsonNew = 'str2';

    const diffList = jsonDeepDiffList(jsonOld, jsonNew);

    expect(diffList).to.deep.equal([]);
  });

  it('should be no error when params is number', () => {
    const jsonOld = 1;
    const jsonNew = 2;

    const diffList = jsonDeepDiffList(jsonOld, jsonNew);

    expect(diffList).to.deep.equal([]);
  });

  it('should be no error when params is function', () => {
    const jsonOld = function f1() {};
    const jsonNew = function f2() {};

    const diffList = jsonDeepDiffList(jsonOld, jsonNew);

    expect(diffList).to.deep.equal([]);
  });

  it('should be no error when params is boolean', () => {
    const jsonOld = true;
    const jsonNew = false;

    const diffList = jsonDeepDiffList(jsonOld, jsonNew);

    expect(diffList).to.deep.equal([]);
  });
});
