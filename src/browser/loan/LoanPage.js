import LoanSlider from './LoanSlider';
import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { changeAmount, changeTerm, fetchConstraints } from '../../common/loan/actions';

@connect(state => ({ sliderConfiguration: state.loan.sliderConfiguration, results: state.loan.results, isFetching: state.loan.isFetching, term: state.loan.term, amount: state.loan.amount }), { fetchConstraints, changeAmount, changeTerm })
export default class LoanPage extends Component {
  static propTypes = {
    fetchConstraints: React.PropTypes.func,
    sliderConfiguration: React.PropTypes.object,
    changeAmount: React.PropTypes.any,
    changeTerm: React.PropTypes.any,
    isFetching: React.PropTypes.bool,
    term: React.PropTypes.number,
    amount: React.PropTypes.number,
    results: React.PropTypes.object,
  }
  componentWillMount() {
    const { fetchConstraints } = this.props;
    fetchConstraints();
  }
  render() {
    const { isFetching, sliderConfiguration, changeAmount, changeTerm, term, amount, results } = this.props;
    const { amountInterval, termInterval } = sliderConfiguration;
    if (isFetching) return <div>Loading whole component</div>;
    const hasResult = results && results[amount] && results[amount][term];
    const result = hasResult ? results[amount][term] : null;

    return (
      <span>
        <h3>Loan Calculator</h3>
        <h4>Amount</h4>
        <LoanSlider
          value={amount}
          interval={amountInterval}
          className="custom-slider"
          onChange={val => changeAmount(val)}
        />
        <h4>Term</h4>
        <LoanSlider
          value={term}
          interval={termInterval}
          className="custom-slider"
          onChange={val => changeTerm(val)}
        />
        <h4>Result</h4>
        {!hasResult &&
          <div>
            <p>Counting result...</p>
          </div>
        }
        {hasResult &&
          <div>
            <p>Monthly Payment: { result.monthlyPayment }</p>
            <p>Total CostOf Credit: { result.totalCostOfCredit }</p>
            <p>Total Repayable Amount: { result.totalRepayableAmount }</p>
          </div>
        }

        <h4>End</h4>
      </span>
    );
  }
}
