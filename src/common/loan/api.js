import fetch from 'isomorphic-fetch';

const API_URL = 'https://js-developer-second-round.herokuapp.com/api/v1/';

export const getOffers = async (amount, term) => {
  try {
    const result = await fetch(`${API_URL}application/real-first-loan-offer?amount=${amount}&term=${term}`)
    const jsonResult = await result.json();
    return jsonResult;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getConstraints = async () => {
  try {
    const result = await fetch(`${API_URL}application/constraints `);
    const jsonResult = await result.json();
    return jsonResult;
  } catch (error) {
    console.error(error);
  }
  return null;
};
