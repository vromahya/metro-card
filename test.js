//Add your tests here

const { describe, it } = require('mocha');
const { getDataAsArray } = require('./auxillaryFunctions');
const { assert } = require('console');
const inputLines = [
  'BALANCE MC1 600',
  'BALANCE MC2 500 ',
  'BALANCE MC3 50 ',
  'BALANCE MC4 50 ',
  'BALANCE MC5 200 ',
  'CHECK_IN MC1 ADULT CENTRAL ',
  'CHECK_IN MC2 SENIOR_CITIZEN CENTRAL ',
  'CHECK_IN MC1 ADULT AIRPORT ',
  'CHECK_IN MC3 KID AIRPORT ',
  'CHECK_IN MC4 ADULT AIRPORT ',
  'CHECK_IN MC5 KID AIRPORT ',
  'PRINT_SUMMARY ',
];
describe('Unit tests', function () {
  it('first output of getArray as data should be array', function () {
    const { inputCardBalance, _ } = getDataAsArray(inputLines);
    assert(Array.isArray(inputCardBalance));
  });
  it('second output of getArray as data should be array', function () {
    const { _, inputPassengerCardsAndDestinations } =
      getDataAsArray(inputLines);
    assert(Array.isArray(inputPassengerCardsAndDestinations));
  });
});
