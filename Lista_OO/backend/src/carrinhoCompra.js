class carrinhoCompra{
    constructor(nome, preco, quantidade){
        this.itens = [{ nome, preco, quantidade }]
    }
    adicionarItem(nome, preco, quantidade){
        this.itens.push({ nome, preco, quantidade });
    }
    removerItem(nome){
        this.itens = this.itens.filter(item => item.nome !== nome);
    }
    calcularTotal(){
        let total = 0;
        for (let i = 0; i < this.itens.length; i++){
            total += this.itens[i].preco * this.itens[i].quantidade;
        }
        return total;
    }
    exibir(){
        console.log ("Itens no carrinho:");
        for (let i = 0; i < this.itens.length; i++){
            console.log (`${this.itens[i].quantidade}x ${this.itens[i].nome} - R$${this.itens[i].preco}`);
        }
        console.log (`Total: R$${this.calcularTotal().toFixed(2)}`);
    }

}
const carrinho = new carrinhoCompra("Notebook", 10000, 1);
carrinho.adicionarItem("Celular", 4000, 2);
carrinho.removerItem("Notebook");
carrinho.exibir();