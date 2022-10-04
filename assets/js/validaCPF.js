class ValidaCpf {
  constructor(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      enumerable: true,
      value: cpfEnviado.replace(/\D+/g, '')
    });
  }

  //Essa retorna se é valido ou não
  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== 'string') return false;
    if (this.cpfLimpo.length > 11) return false;
    if (this.sequencia()) return false;
    if(this.geraNovoCpf() === false) return false;

    return true
  }

  //Verifica se é uma sequencia
  sequencia() {
    return this.cpfLimpo.charAt(0).repeat(11) == this.cpfLimpo;
  }

  //Testa se os dois ultimos numeros são compativeis
  geraNovoCpf() {
    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const doisDigitos = this.cpfLimpo.slice(9, 11)
    const digito1 = this.geraDigito(cpfParcial);
    const digito2 = this.geraDigito(cpfParcial + digito1);
    const somaDigito = String(digito1) + String(digito2)
    if (somaDigito !== doisDigitos) return false;
    return true;
  }

  
  geraDigito(cpf) {
    let total = 0
    let reverso = cpf.length + 1

    for (let numero of cpf) {
      total += reverso * numero
      reverso--
    }
    total = 11 - (total % 11)
    if (total >= 10) return '0'
    return total
  }
}
