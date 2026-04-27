class produto{
    constructor(nome, preco, estoque){
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }
    disponivel(){
        if (this.estoque > 0){
            console.log (`O produto ${this.nome} está disponível para compra.`);
        }
    }
    exibir(){
        console.log (`Produto: ${this.nome}, Preço: R$${this.preco}, Estoque: ${this.estoque}`);
    }
}
produto1 = new produto("Notebook", 10000, 10);
produto2 = new produto("celular", 4000, 0);

produto1.exibir()
produto2.exibir()