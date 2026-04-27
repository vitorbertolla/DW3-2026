class estoque{
    constructor(){
        this.produto = [];
    }
    cadastrarProduto(nome, quanatidade){
        if (this.produto.some(produto => produto.nome === nome)){
            console.log (`O produto ${nome} já está cadastrado no estoque.`);
        }
        else{
            this.produto.push({ nome, quanatidade });
        }
    }
    entradaProduto(nome, quantidade){
        const index = this.produto.findIndex(produto => produto.nome === nome);
        if (index === -1){
            console.log("produto não encontrado");
        }
        else{
            this.produto[index].quanatidade += quantidade;
        }
    }
    saidaPoduto(nome, quantidade){
        if (quantidade > this.produto.quanatidade){
            console.log (`Não há quantidade suficiente do produto ${nome} em estoque.`);
        }
        const index = this.produto.findIndex(produto => produto.nome === nome);
        if (index === -1){
            console.log("produto não encontrado");
        }
        else{
            this.produto[index].quanatidade -= quantidade; 
        }
    }
    exibir(){
        console.log ("Produtos em estoque:");
        for (let i = 0; i < this.produto.length; i++){
            console.log (`${this.produto[i].nome} - Quantidade: ${this.produto[i].quanatidade}`);
        }
    }
}
const estoque1 = new estoque();
estoque1.cadastrarProduto("Notebook", 10);
estoque1.cadastrarProduto("Celular", 20);
estoque1.entradaProduto("Notebook", 5);
estoque1.saidaPoduto("Celular", 10);
estoque1.exibir();