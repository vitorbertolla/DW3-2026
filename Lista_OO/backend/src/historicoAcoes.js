class acoes{
    constructor(titulo){
        this.titulo = titulo;
        this.conteudo = "";
        this._historico = [];
    }
    editar(conteudo){
        this._historico.push(this.conteudo);
        this.conteudo = conteudo;
    }
    desfazer(){
        if (this._historico.length > 0){
            this.conteudo = this._historico.pop();
        }
        else{
            console.log ("Não há nada no histórico para desfazer.");
        }
    }
    exibir(){
        console.log (`Título: ${this.titulo}, Conteúdo: ${this.conteudo}`);
    }
}
const acoes1 = new acoes("Ação 1");
acoes1.editar("Conteúdo inicial");
acoes1.exibir();
acoes1.editar("Conteúdo atualizado");
acoes1.exibir();
acoes1.desfazer();
acoes1.exibir();