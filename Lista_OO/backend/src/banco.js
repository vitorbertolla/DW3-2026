class contaBancaria{
    constructor (titular, saldo){
        this.titular = titular;
        this.saldo = saldo;
    }
    depositar(valor){
        this.saldo += valor;
        console.log (`Depósito de R$${valor} realizado. Saldo atual: R$${this.saldo}`);
    }
    sacar(valor){
        if (valor > this.saldo){
            console.log ("Saldo insuficiente para saque.");
        }
        else{this.saldo -= valor}
    }
    exibir(){
        console.log (`Titular: ${this.titular}, Saldo: R$${this.saldo}`);
    }

}

const conta1 = new contaBancaria("Ana", 150);
const conta2 = new contaBancaria("Carlos", 80);

conta1.depositar(75);
conta2.sacar(150);

conta1.exibir();
conta2.exibir();