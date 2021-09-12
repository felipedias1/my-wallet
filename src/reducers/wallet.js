// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FAILED_CURRENCY,
  GET_CURRENCY,
  REQUEST_CURRENCY,
  EXPENSE_NEW,
  EXPENSE_DELETE,
} from '../actions';

// Cria um estado inicial para o reducer 'wallet'
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
  expenseId: 0,
  totalExpenses: 0,
};

// Cria um reducer wallet
function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  // Esse caso troca o propriedade 'isFetching' para true
  case REQUEST_CURRENCY:
    return { ...state, isFetching: true };
  case GET_CURRENCY:
    return { ...state, currencies: Object.keys(action.payload), isFetching: false };
  case FAILED_CURRENCY:
    return { ...state, error: action.payload, isFetching: false };

  // feita com a ajuda do Vinícius Dionísio da turma 13-A pelo projeto de Buddies
  case EXPENSE_NEW:
    return {
      ...state,
      expenseId: state.expenseId + 1,
      expenses: state.expenses.concat({ ...action.payload, id: state.expenseId }),
    };
  case EXPENSE_DELETE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };

  default:
    return state;
  }
}

export default wallet;
