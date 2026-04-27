class filaAtendimento{
    constructor(){
        this._fila = [];  
        this.contador = 1;
    }
    entrada(nome){
        this._fila.push({ senha: this.contador, nome });
        console.log (`${nome} entrou na fila com a senha ${this.contador}.`);
        this.contador++;
    }
    chamarProximo(){
        if (this._fila.length === 0){
            console.log ("Não há clientes na fila.");
        }
        else{
            console.log (`Chamando o próximo cliente: ${this._fila[0].nome} com a senha ${this._fila[0].senha}.`);
            this._fila.shift();
        }
    }
    tamanho(){
        console.log (`Há ${this._fila.length} clientes na fila.`);
    }
}
const fila = new filaAtendimento();
fila.entrada("Bruno");
fila.entrada("Maria");
fila.entrada("João");
fila.tamanho();
fila.chamarProximo();
fila.tamanho();