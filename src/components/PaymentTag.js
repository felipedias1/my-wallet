import React from 'react';
import PropTypes from 'prop-types';

class PaymentTag extends React.Component {
  render() {
    const { handleChange } = this.props;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <>
        <label htmlFor="method">
          Método de pagamento:
          <select name="method" id="method" onChange={ handleChange }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" onChange={ handleChange }>
            { tags.map((tag, key) => <option key={ key }>{ tag }</option>)}
          </select>
        </label>
      </>
    );
  }
}

PaymentTag.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  handleExpense: PropTypes.func,
}.isRequired;

export default PaymentTag;
