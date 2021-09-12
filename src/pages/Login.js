import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailValid } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
    };
    this.clickButton = this.clickButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validLogin = this.validLogin.bind(this);
  }

  // função para validar o email usando regex
  validEmail(email) {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(email);
  }

  // função para validar a senha
  validPassword(password) {
    const MIN_LENGHT = 6;
    return password.length >= MIN_LENGHT;
  }

  // Essa função ira desabilitar(ou não) o botão de Login
  validLogin() {
    const { email, password } = this.state;
    if (this.validEmail(email) && this.validPassword(password)) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  // Dispatch o email digitado pelo usuário e direciona o usuario para a carteira
  clickButton(event) {
    event.preventDefault();
    const { email } = this.state;
    const { history, user } = this.props;
    user(email);
    history.push('/carteira');
  }

  // handleChange que atualiza o estado a cada mundança para todos os campos do input
  // Depois executa a função para validar o login e desabilitar(ou não) o botão
  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validLogin();
    });
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <input
          type="email"
          placeholder="Insira seu email"
          name="email"
          onChange={ this.handleChange }
          data-testid="email-input"
        />
        <input
          type="text"
          placeholder="Insira sua senha"
          name="password"
          onChange={ this.handleChange }
          data-testid="password-input"
        />

        <button
          onClick={ this.clickButton }
          type="button"
          data-testid="product-add-to-cart"
          disabled={ buttonDisabled }
        >
          entrar
        </button>
      </div>
    );
  }
}

// Essa função 'Dispatch' o email do usuário para o estado global
const mapDispatchToProps = (dispatch) => ({
  user: (email) => dispatch(emailValid(email)),
});

Login.propTypes = {
  user: PropTypes.func,
  history: PropTypes.object,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
