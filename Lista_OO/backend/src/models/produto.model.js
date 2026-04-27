export default class ProdutoModel {
    constructor(){
        this._produtos = [
            { id: 1, nome: 'Produto A', preco: 10.0 },
            { id: 2, nome: 'Produto B', preco: 20.0 },
            { id: 3, nome: 'Produto C', preco: 30.0 }
        ];
        this._proximoId = 4;
    }
    async findAll(){
        return this._produtos;
    }
    async findById(id){
        return this._produtos.find(p => p.id === id);
    }
    async create(nome, preco){
        const produto = { id: this._proximoId, nome: nome, preco: preco };
        this._produtos.push(produto);
        this._proximoId++;
        return produto;
    }
    async delete(id){
        const index = this._produtos.findIndex(p => p.id === id);
        if (index === -1) return false;
        this._produtos.splice(index, 1);
        return true;
    }
    static validar(dados){
        if (!dados.nome || dados.nome.trim() === '') {
            return { valido: false, erros: ['O nome é obrigatório.'] };
        }
        if (dados.preco === undefined || dados.preco < 0 ){
            return { valido: false, erros: ['O preço deve ser um número positivo.'] };
        }
        else{
            return { valido: true, erros: [] };
        }
    }
}