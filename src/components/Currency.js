import React from 'react';
import PropTypes from 'prop-types';

class Currency extends React.Component {
  render() {
    const { filterCurrencies, handleChange } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select name="currency" id="currency" onChange={ handleChange }>
          { filterCurrencies
            ? filterCurrencies
              .map((currency, key) => <option key={ key }>{ currency }</option>)
            : null }
        </select>
      </label>
    );
  }
}

Currency.propTypes = {
  filterCurrencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default Currency;
