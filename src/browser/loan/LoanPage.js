import React, { PureComponent as Component } from 'react';
import './style.css';
import { fetchConstraints, changeAmount, changeTerm } from '../../common/loan/actions';
import { connect } from 'react-redux';
import ReactSlider from 'react-slider';

@connect(state => ({ sliderConfiguration: state.loan.sliderConfiguration, results: state.loan.results, isFetching: state.loan.isFetching, term: state.loan.term, amount: state.loan.amount }), { fetchConstraints, changeAmount, changeTerm })
export default class LoanPage extends Component {
  static propTypes = {
    fetchConstraints: React.PropTypes.func,
    sliderConfiguration: React.PropTypes.object,
    changeAmount: React.PropTypes.any,
    changeTerm: React.PropTypes.any,
    isFetching: React.PropTypes.bool,
  }
  componentWillMount() {
    const { fetchConstraints } = this.props;
    fetchConstraints();
  }
  render() {
    const { isFetching, sliderConfiguration, changeAmount, changeTerm, term, amount, results } = this.props;
    // if (isFetching === true) return <div>Loading</div>;
    const { amountInterval, termInterval } = sliderConfiguration;
    const hasResult = results && results[amount] && results[amount][term];
    const result = hasResult ? results[amount][term] : null;
    return (
      <span>
        <h3>Loan Calculator</h3>
        <h4>Amount</h4>
        <ReactSlider
          defaultValue={amountInterval.defaultValue}
          max={amountInterval.max}
          min={amountInterval.min}
          step={amountInterval.step}
          className="custom-slider"
          onChange={(val) => changeAmount(val)}
        />
        <h4>Term</h4>
        <ReactSlider
          defaultValue={termInterval.defaultValue}
          max={termInterval.max}
          min={termInterval.min}
          step={termInterval.step}
          className="custom-slider"
          onChange={(val) => changeTerm(val)}
        />
        {hasResult &&
          <div>
            <p>Monthly Payment: { result.monthlyPayment }</p>
            <p>Total CostOf Credit: { result.totalCostOfCredit }</p>
            <p>Total Repayable Amount: { result.totalRepayableAmount }</p>
          </div>
        }
      </span>
    );
  }
}
