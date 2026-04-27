class cliente{
    constructor(nome, email){
        this.nome = nome;
        this.email = email;
    }
    exibir(){
        console.log(`this.nome, this.email`);
    }
}
class pedido{
    constructor(id, cliente){
        this.id = id;
        this.cliente = { nome: cliente.nome, email: cliente.email };
        this.itens = [];
        this.status = "aberto";
    }
    adicionarItem(descricao, valor){
        this.itens.push({ descricao, valor });
    }
    total(){
        let total = 0;
        for (let i = 0; i < this.itens.length; i++){
            total += this.itens[i].valor;
        }
        console.log (`Total do pedido: R$ ${total.toFixed(2)}`);
    }
    fechar(){
        this.status = "fechado";
    }
    exibir(){
        console.log (`Pedido ID: ${this.id} - Status: ${this.status}`);
        console.log (`Cliente: ${this.cliente.nome} - ${this.cliente.email}`);
        console.log ("Itens:");
        for (let i = 0; i < this.itens.length; i++){
            console.log (`- ${this.itens[i].descricao}: R$ ${this.itens[i].valor.toFixed(2)}`);
        }
    }
}
const cliente1 = new cliente("Bruno", "bruno@gmail.com");
const pedido1 = new pedido(1, cliente1);
pedido1.adicionarItem("Notebook", 10000);
pedido1.adicionarItem("Mouse", 200);
pedido1.exibir();
pedido1.total();
pedido1.fechar();
pedido1.exibir();