# json-deep-diff-list
get json deep diff list

# Usage

```js
  const { jsonDeepDiffList } = require('json-deep-diff-list');

  const json_old = {
    name: 'Larry',
    age: 18,
    addr: {
      code: 7705,
      name: 'CN'
    },
    lists: [{
      type: 'TV',
      name: 'AAA'
    }, {
      type: 'SP',
      name: 'AS1'
    }],
    others: {
      aa: 'aa',
      bb: 'bb'
    }
  };

  const json_new = {
    name: 'Xiaolei',
    age: 16,
    addr: {
      code: 8809,
      name: 'US'
    },
    lists: [{
      type: 'SP',
      name: 'AS1'
    }],
    todos: [{
      name: 't1',
      type: 'T1'
    }]
  };

  const diffList = jsonDeepDiffList(json_old, json_new);

  console.log(diffList);

  // [
  //   { op: 'replace', path: 'name', before: 'Larry', after: 'Xiaolei' },
  //   { op: 'replace', path: 'age', before: 18, after: 16 },
  //   { op: 'replace', path: 'addr.code', before: 7705, after: 8809 },
  //   { op: 'replace', path: 'addr.name', before: 'CN', after: 'US' },
  //   { op: 'replace', path: 'lists.0.type', before: 'TV', after: 'SP' },
  //   { op: 'replace', path: 'lists.0.name', before: 'AAA', after: 'AS1' },
  //   { op: 'del', path: 'lists.1.type', before: 'SP', after: undefined },
  //   { op: 'del', path: 'lists.1.name', before: 'AS1', after: undefined },
  //   { op: 'del', path: 'others.aa', before: 'aa', after: undefined },
  //   { op: 'del', path: 'others.bb', before: 'bb', after: undefined },
  //   { op: 'add', path: 'todos.0.name', before: undefined, after: 't1' },
  //   { op: 'add', path: 'todos.0.type', before: undefined, after: 'T1' }
  // ]

```

