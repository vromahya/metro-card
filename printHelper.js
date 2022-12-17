const printPassengerSummary = (result) => {
  const { adult, kid, seniorCitizen } = result;

  let passenger_array = [
    { name: 'ADULT', value: adult },
    { name: 'KID', value: kid },
    { name: 'SENIOR_CITIZEN', value: seniorCitizen },
  ];

  passenger_array = passenger_array.sort((a, b) => b.value - a.value);

  passenger_array.map(({ name, value }) => {
    if (value) console.log(`${name}  ${value}`);
  });
};
const printResult = (result) => {
  const secondResultHeading = 'PASSENGER_TYPE_SUMMARY';
  console.log(
    `TOTAL_COLLECTION CENTRAL ${result.central.collection} ${result.central.discount}`
  );
  console.log(secondResultHeading);
  printPassengerSummary(result.central);
  console.log(
    `TOTAL_COLLECTION AIRPORT ${result.airport.collection} ${result.airport.discount}`
  );
  console.log(secondResultHeading);
  printPassengerSummary(result.airport);
};

module.exports = printResult;
