//Add your tests here

const { describe, it } = require('mocha');
const {
  getDataAsArray,
  checkIfReturnJourney,
} = require('./auxillaryFunctions');
const assert = require('assert');

describe('Unit test for getDataAsArray', function () {
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
describe('Unit tests for checkIfReturnJourney', () => {
  it('Should return false for this input', () => {
    const expenses = [
      {
        card_no: 'MC1',
        cost: 100,
        discount: 0,
        passenger_type: 'ADULT',
        destination: 'CENTRAL',
      },
      {
        card_no: 'MC2',
        cost: 25,
        discount: 0,
        passenger_type: 'KID',
        destination: 'AIRPORT',
      },
    ];
    const cardNo = 'MC3';
    const isReturnJourney = checkIfReturnJourney(expenses, cardNo);
    assert(!isReturnJourney);
  });
  it('should return true for this input', () => {
    const expenses = [
      {
        card_no: 'MC1',
        cost: 50,
        discount: 0,
        passenger_type: 'SENIOR_CITIZEN',
        destination: 'AIRPORT',
      },
      {
        card_no: 'MC2',
        cost: 100,
        discount: 0,
        passenger_type: 'ADULT',
        destination: 'CENTRAL',
      },
    ];
    const cardNo = 'MC1';
    const isReturnJourney = checkIfReturnJourney(expenses, cardNo);
    assert(isReturnJourney);
  });
});
