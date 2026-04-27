class livro {
    constructor(titulo, autor){
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = true;
    }
    emprestar(){
        if (this.disponivel){
            this.disponivel = false;
            console.log(`Livro "${this.titulo}" emprestado com sucesso!`);
        }
        else{
            console.log(`Livro "${this.titulo}" não está disponível para empréstimo.`);
        }
    }
    devolver(){
        this.disponivel = true;
        console.log(`Livro "${this.titulo}" devolvido com sucesso!`);
    }
    exibir(){
        console.log(`Título: ${this.titulo} - Autor: ${this.autor} - Disponível: ${this.disponivel ? "Disponível" : "Indisponível"}`);
    }   
}
class biblioteca {
    constructor(nome){
        this.nome = nome;
        this.acervo = [];   
    }
    adiconarLivro(livro){
        this.acervo.push(livro);
        console.log(`Livro "${livro.titulo}" adicionado à biblioteca "${this.nome}".`);
    }
    buscarLivro(titulo){
        const livro = this.acervo.find(l => l.titulo === titulo);
        if (livro){
            console.log(`Livro encontrado:`);
            livro.exibir();
        }
        else{
            console.log(`Livro "${titulo}" não encontrado na biblioteca "${this.nome}".`);
        }
    }
    emprestarLivro(titulo){
        const livro = this.acervo.find(l => l.titulo === titulo);
        if (livro){
            livro.emprestar();
        }
        else{
            console.log(`Livro "${titulo}" não encontrado na biblioteca "${this.nome}".`);
        }
    }
    devolverLivro(titulo){
        const livro = this.acervo.find(l => l.titulo === titulo);
        if (livro){
            livro.devolver();
        }
    }
    exibirAcervo(){
        console.log(`Acervo da biblioteca "${this.nome}":`);
        for (let i = 0; i < this.acervo.length; i++){
            this.acervo[i].exibir();
        }
    }
}
const biblioteca1 = new biblioteca("Biblioteca Central");
const livro1 = new livro("O Senhor dos Anéis", "J.R.R. Tolkien");
const livro2 = new livro("1984", "George Orwell");
const livro3 = new livro("Dom Casmurro", "Machado de Assis");
biblioteca1.adiconarLivro(livro1);
biblioteca1.adiconarLivro(livro2);
biblioteca1.adiconarLivro(livro3);
biblioteca1.emprestarLivro("1984");
biblioteca1.emprestarLivro("Dom Casmurro");
biblioteca1.devolverLivro("1984");
biblioteca1.exibirAcervo();