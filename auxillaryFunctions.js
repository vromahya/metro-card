const zero = 0;
const getDataAsArray = (inputLines) => {
  const inputCardBalance = [];
  const inputPassengerCardsAndDestinations = [];
  inputLines.forEach((line) => {
    let entries = line.toString().split(' ');
    //making cards object
    if (entries[zero] === 'BALANCE') {
      let cardObject = {
        card_no: entries[1],
        card_balance: Number(entries[2].replace(/\r|\n/g, '')),
      };
      inputCardBalance.push(cardObject);
    }
    // making passenger objects
    if (entries[zero] === 'CHECK_IN') {
      let passengerObject = {
        card_no: entries[1],
        passenger_type: entries[2],
        destination: entries[3].replace(/\r|\n/g, ''),
      };
      inputPassengerCardsAndDestinations.push(passengerObject);
    }
  });
  return { inputCardBalance, inputPassengerCardsAndDestinations };
};
const checkIfReturnJourney = (expenses, card_no) => {
  const previosJourneys = expenses.filter(
    (expense) => expense.card_no === card_no
  );
  if (previosJourneys.length % 2 === zero) return false;
  return true;
};
const returnNewCardBalances = (inputCardBalance, expense, cardNo) => {
  const newInputCardBalances = inputCardBalance.map((cardBalances) => {
    if (cardBalances.card_no === cardNo) {
      if (cardBalances.card_balance <= expense.cost)
        cardBalances.card_balance = zero;
      else cardBalances.card_balance = cardBalances.card_balance - expense.cost;
    }
    return cardBalances;
  });
  return newInputCardBalances;
};
const createResultObject = (expenses) => {
  const result = {
    central: {
      collection: zero,
      discount: zero,
      adult: zero,
      kid: zero,
      seniorCitizen: zero,
    },
    airport: {
      collection: zero,
      discount: zero,
      adult: zero,
      kid: zero,
      seniorCitizen: zero,
    },
  };
  expenses.forEach((expense) => {
    if (expense.destination === 'CENTRAL') {
      result.central.collection += expense.cost;
      result.central.discount += expense.discount;
      if (expense.passenger_type === 'ADULT') result.central.adult++;
      if (expense.passenger_type === 'SENIOR_CITIZEN')
        result.central.seniorCitizen++;
      if (expense.passenger_type === 'KID') result.central.kid++;
    } else {
      result.airport.collection += expense.cost;
      result.airport.discount += expense.discount;
      if (expense.passenger_type === 'ADULT') result.airport.adult++;
      if (expense.passenger_type === 'SENIOR_CITIZEN')
        result.airport.seniorCitizen++;
      if (expense.passenger_type === 'KID') result.airport.kid++;
    }
  });
  return result;
};

module.exports = {
  getDataAsArray,
  checkIfReturnJourney,
  returnNewCardBalances,
  createResultObject,
};