import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class TableLines extends Component {
  render() {
    const { expense, expenseDelete } = this.props;
    const { id, description, tag, method, value, currency, exchangeRates } = expense;
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ value }</td>
        <td>{ currency }</td>
        <td>{ exchangeRates[currency].name.split('/')[0]}</td>
        <td>{ parseFloat(exchangeRates[currency].ask.split('/')[0]).toFixed(2)}</td>
        <td>{ Number(exchangeRates[currency].ask.split('/')[0] * value).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            onClick={ () => expenseDelete(id) }
            data-testid="delete-btn"
            type="button"
          >
            Apagar
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expenseDelete: (expense) => dispatch(deleteExpense(expense)),
});

TableLines.propTypes = {
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(null, mapDispatchToProps)(TableLines);
