import { getConstraints, getOffers } from './api';

export const FETCH_CONSTRAINTS = 'FETCH_CONSTRAINTS';
export const FETCH_CONSTRAINTS_START = 'FETCH_CONSTRAINTS_START';
export const FETCH_CONSTRAINTS_SUCCESS = 'FETCH_CONSTRAINTS_SUCCESS';

export const FETCH_OFFERS = 'FETCH_OFFERS';
export const FETCH_OFFERS_START = 'FETCH_OFFERS_START';
export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const FETCH_OFFERS_CACHED = 'FETCH_OFFERS_CACHED';

export const CHANGE_AMOUNT = 'CHANGE_AMOUNT';
export const CHANGE_TERM = 'CHANGE_TERM';

export const fetchConstraints = () => {
  const promise = getConstraints();
  return {
    type: 'FETCH_CONSTRAINTS',
    payload: promise,
  };
};

export const fetchOffers = (amount, term) => {
  const promise = getOffers(amount, term);
  return {
    type: 'FETCH_OFFERS',
    payload: promise,
  };
};

export const changeAmount = amount => ({ getState, dispatch }) => {
  dispatch({
    type: 'CHANGE_AMOUNT',
    payload: {
      amount,
    },
  });
  const { term, results } = getState().loan;
  if (results && results[amount] !== undefined && results[amount][term] !== undefined) {
    return {
      type: 'FETCH_RESULT_CACHED',
      payload: results[amount][term],
    };
  }
  return fetchOffers(amount, term);
};

export const changeTerm = term => ({ getState, dispatch }) => {
  dispatch({
    type: 'CHANGE_TERM',
    payload: {
      term,
    },
  });
  const { amount, results } = getState().loan;
  if (results && results[amount] !== undefined && results[amount][term] !== undefined) {
    return {
      type: 'FETCH_RESULT_CACHED',
      payload: results[amount][term],
    };
  }
  return fetchOffers(amount, term);
};
