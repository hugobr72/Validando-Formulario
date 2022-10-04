class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario');
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }


  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposValidos();
    if (camposValidos){
      alert('Formulario enviado com sucesso');
    }
  }


  camposValidos() {
    var valid = true;
    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText;
      if (!campo.value) {
        this.criaErro(campo, `Campo ${label} não pode estar em branco.`);
        valid = false;
      }
      if (campo.classList.contains('cpf')) {
        if (!this.validaCpf(campo)) valid = false;
      }
      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false;
      }

      if (campo.classList.contains('senha')) {
        var senha = campo.value;
        if (!this.validaSenha(campo)) valid = false;
      }

      if (campo.classList.contains('repetir-senha')) {
        if (!this.validaSenha(campo)) valid = false;
      }

      if (campo.classList.contains('repetir-senha')) {
        if (!this.senhasIguais(campo, senha)) valid = false;
      }
    }
    return valid;
  }


  validaCpf(campo) {
    const cpf = new ValidaCpf(campo.value);
    if (!cpf.valida()) {
      this.criaErro(campo, 'Cpf inválido');
    }

    return true;
  }

  validaUsuario(campo) {
    const usuario = campo.value
    if (usuario.length > 12 || usuario.length < 3) {
      this.criaErro(campo, 'O usuário precisa ter entre 3 e 12 caracteres.');
      return false
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
      return false;
    }

    return true;
  }

  validaSenha(campo) {
    const senha = campo.value;
    if (senha.length < 6 || senha.length > 12) {
      this.criaErro(campo, 'A senha deve conter mais de 6 e menos de 12 caracteres.');
      return false;
    }

    return true;
  }

  senhasIguais(campo, senha) {

    if (campo.value !== senha) {
      this.criaErro(campo, 'A senha devem ser iguais.');
      return false;
    }
    return true;
  }

  criaErro(campo, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
}

const valida = new ValidaFormulario();