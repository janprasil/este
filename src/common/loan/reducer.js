import R from 'ramda';
import * as actions from './actions';

const LoanOffer = {
  nothing: true,
};

const SliderConfiguration = {
  amountInterval: {
    defaultValue: 1000,
    max: 10000,
    min: 0,
    step: 500,
  },
  termInterval: {
    defaultValue: 1000,
    max: 10000,
    min: 0,
    step: 1,
  },
};


const State = {
  offer: LoanOffer,
  sliderConfiguration: SliderConfiguration,
  term: 0,
  amount: 0,
  isFetching: false,
  results: {},
};

const LoanReducer = (state = State, action) => {
  switch (action.type) {
    case actions.FETCH_CONSTRAINTS_START: {
      return { ...state, isFetching: true };
    }
    case actions.FETCH_CONSTRAINTS_SUCCESS: {
      const { termInterval, amountInterval } = action.payload;
      return { ...state, isFetching: false, sliderConfiguration: action.payload, term: termInterval.defaultValue, amount: amountInterval.defaultValue };
    }
    case actions.CHANGE_AMOUNT: {
      return R.assocPath(['amount'], action.payload.amount, state);
    }
    case actions.CHANGE_TERM: {
      return R.assocPath(['term'], action.payload.term, state);
    }
    case actions.FETCH_OFFERS_SUCCESS: {
      const { totalPrincipal, term } = action.payload;
      return R.assocPath(['results', totalPrincipal, term], action.payload, state);
    }
    default:
      return state;
  }
};

export default LoanReducer;
