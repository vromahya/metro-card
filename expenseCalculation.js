const { cost, returnJourneyDiscounts } = require('./helperObjects');

const serviceFee = 0.02; //2% of total

const SingleJourneyBalance = (passenger_type, balance) => {
  let ticketAmount = 0;
  switch (passenger_type) {
    case 'ADULT':
      if (balance < cost.adult)
        ticketAmount = cost.adult + (cost.adult - balance) * serviceFee;
      else ticketAmount = cost.adult;
      break;
    case 'KID':
      if (balance < cost.kid)
        ticketAmount = cost.kid + (cost.kid - balance) * serviceFee;
      else ticketAmount = cost.kid;
      break;
    case 'SENIOR_CITIZEN':
      if (balance < cost.seniorCitizen)
        ticketAmount =
          cost.seniorCitizen + (cost.seniorCitizen - balance) * serviceFee;
      else ticketAmount = cost.seniorCitizen;
      break;
  }
  return ticketAmount;
};
const ReturnJourneyBalance = (passenger_type, balance) => {
  switch (passenger_type) {
    case 'ADULT':
      if (balance < cost.adultReturn)
        return {
          cost: cost.adultReturn + (cost.adultReturn - balance) * serviceFee,
          discount: returnJourneyDiscounts.adult,
        };
      else
        return {
          cost: cost.adultReturn,
          discount: returnJourneyDiscounts.adult,
        };
    case 'KID':
      if (balance < cost.kidReturn)
        return {
          cost: cost.kidReturn + (cost.kidReturn - balance) * serviceFee,
          discount: returnJourneyDiscounts.kid,
        };
      else
        return { cost: cost.kidReturn, discount: returnJourneyDiscounts.kid };
    default:
      if (balance < cost.seniorCitizenReturn)
        return {
          cost:
            cost.seniorCitizenReturn +
            (cost.seniorCitizenReturn - balance) * serviceFee,
          discount: returnJourneyDiscounts.seniorCitizen,
        };
      else
        return {
          cost: cost.seniorCitizenReturn,
          discount: returnJourneyDiscounts.seniorCitizen,
        };
  }
};

module.exports = { SingleJourneyBalance, ReturnJourneyBalance };
