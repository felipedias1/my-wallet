import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { fetchCurrency } from '../actions';
import Table from '../components/Table';
import walletImg from '../wallet.png';

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
    console.log(email);
    return (
      <div className="wallet-container">
        <div className="wallet-nav">
          <div className="wallet-title">
            <img src={ walletImg } alt="wallet" />
            <h3> TrybeWallet </h3>
          </div>
          <div className="wallet-user">
            <p data-testid="email-field">{ email }</p>
            <p data-testid="total-field">
              { this.totalExpenses() }
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
        <div className="wallet-form">
          <Form totalExpenses={ this.totalExpenses } />
        </div>
        <div className="wallet-table">
          <Table />
        </div>
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
