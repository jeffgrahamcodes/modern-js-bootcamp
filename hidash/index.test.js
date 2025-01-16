const { forEach, map } = require('./index');

const test = (desc, fn) => {
  console.log('----', desc);
  try {
    fn();
  } catch (error) {
    console.log(error.message);
  }
};

test('forEach', () => {
  let sum = 0;
  forEach([1, 2, 3], (value) => {
    sum += value;
  });

  if (sum !== 6) {
    throw new Error(`Expected: 6; Actual: ${sum}`);
  }
});

test('map', () => {
  const result = map([1, 2, 3], (value) => {
    return value * 2;
  });

  if (result[0] !== 2) {
    throw new Error(`Expected: 2; Actual: ${result[0]}`);
  }

  if (result[1] !== 4) {
    throw new Error(`Expected: 4; Actual: ${result[0]}`);
  }

  if (result[2] !== 6) {
    throw new Error(`Expected: 6; Actual: ${result[0]}`);
  }
});