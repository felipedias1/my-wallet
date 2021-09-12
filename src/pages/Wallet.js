import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { fetchCurrency } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  /*  componentDidMount() {
    const { optionCurrency } = this.props;
    optionCurrency();
  } */

  totalExpenses() {
    const { expenses = 0 } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { value, exchangeRates, currency } = expense;
      total += (Number(value) * Number(exchangeRates[currency].ask));
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <div>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">
            { this.totalExpenses() }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
        <Form totalExpenses={ this.totalExpenses } />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  optionCurrency: () => dispatch(fetchCurrency()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
