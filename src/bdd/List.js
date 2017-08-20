'use strict';

const flatten = list => list.reduce((acc, elem) => acc.concat(elem));

const List = {
  flatten,
};

export default List;
