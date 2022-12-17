const fs = require('fs');

const filename = process.argv[2];
const {
  getDataAsArray,
  checkIfReturnJourney,
  returnNewCardBalances,
  createResultObject,
} = require('./auxillaryFunctions');
const {
  SingleJourneyBalance,
  ReturnJourneyBalance,
} = require('./expenseCalculation');
const printResult = require('./printHelper');

fs.readFile(filename, 'utf8', (err, data) => {
  if (err) throw err;
  var inputLines = data.toString().split('\n');
  // Add your code here to process input commands

  let { inputCardBalance, inputPassengerCardsAndDestinations } =
    getDataAsArray(inputLines);

  // array to track expenses
  const expenses = [];
  //loop through the array of destinations and passengers
  inputPassengerCardsAndDestinations.forEach((input) => {
    //destructure input parameters

    const { card_no, passenger_type, destination } = input;
    //get card no and current balance of cards
    const card = inputCardBalance.filter(
      (cardBalance) => cardBalance.card_no === card_no
    );
    const balance = card[0].card_balance;
    const cardNo = card[0].card_no;
    //to check return journey
    const isReturnJourney = checkIfReturnJourney(expenses, card_no);

    let expense = {
      card_no,
      cost: 0,
      discount: 0,
      passenger_type,
      destination,
    };

    if (isReturnJourney) {
      const { cost, discount } = ReturnJourneyBalance(passenger_type, balance);
      expense.cost = cost;
      expense.discount = discount;
    } else {
      const cost = SingleJourneyBalance(passenger_type, balance);
      expense.cost = cost;
    }
    // update new balances
    inputCardBalance = returnNewCardBalances(inputCardBalance, expense, cardNo);

    //push the current journey info into an array
    expenses.push(expense);
  });
  //result object for printing
  const result = createResultObject(expenses);

  printResult(result);
});
