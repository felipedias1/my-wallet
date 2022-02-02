import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, newExpense } from '../actions';
import Currency from './Currency';
import PaymentTag from './PaymentTag';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'Alimentação',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitExpenses = this.submitExpenses.bind(this);
  }

  componentDidMount() {
    const { optionCurrency } = this.props;
    optionCurrency();
  }

  handleChange({ target }) {
    const { expense } = this.state;
    const { name, value } = target;
    this.setState({ expense: {
      ...expense,
      [name]: value,
    } });
  }

  submitExpenses() {
    const { addExpense } = this.props;
    const { expense } = this.state;
    addExpense(expense);
  }

  render() {
    const { currencies, totalExpenses } = this.props;
    const filterCurrencies = currencies.filter((curr) => curr !== 'USDT');
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            id="value"
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <Currency
          filterCurrencies={ filterCurrencies }
          handleChange={ this.handleChange }
        />
        <PaymentTag
          handleChange={ this.handleChange }
        />
        <button
          onClick={ () => {
            this.submitExpenses();
            totalExpenses();
          } }
          type="submit"
          data-testid="product-add-to-cart"
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

Form.propTypes = {
  optionCurrency: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  optionCurrency: () => dispatch(fetchCurrency()),
  addExpense: (expense) => dispatch(newExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
