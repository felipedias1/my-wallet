// Coloque aqui suas actions
export const LOGIN_VALID = 'LOGIN_VALID';
export const GET_CURRENCY = 'GET_CURRENCY';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const FAILED_CURRENCY = 'FAILED_CURRENCY';
export const EXPENSE_NEW = 'EXPENSE_NEW';
export const EXPENSE_DELETE = 'EXPENSE_DELETE';

export const emailValid = (email) => ({
  type: LOGIN_VALID,
  email,
});

function getCurrency(json) {
  return { type: GET_CURRENCY, payload: json };
}

function requestCurrency() {
  return { type: REQUEST_CURRENCY };
}

function failedCurrency(error) {
  return { type: FAILED_CURRENCY, payload: error };
}

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getCurrency(json)),
          (error) => dispatch(failedCurrency(error)),
        ));
  };
}

function expenseOk(expense) {
  return { type: EXPENSE_NEW,
    payload: expense };
}

export function newExpense(expense) {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((r) => r.json()
        .then(
          (json) => {
            const oneExpense = {
              ...expense,
              exchangeRates: json,
            };
            dispatch(expenseOk(oneExpense));
          },
        ));
  };
}

export const deleteExpense = (id) => ({
  type: EXPENSE_DELETE,
  id,
});
