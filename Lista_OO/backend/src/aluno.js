class aluno{
    constructor(nome, nota){
        this.nome = nome;
        this.nota = [nota];
    }
    adicionarNota(nota){
        this.nota.push(nota);
    }
    calcularMedia(){
        let soma = 0
        for (let i = 0; i < this.nota.length; i++){
            soma += this.nota[i]
        }
        return soma / this.nota.length;
    }
    situacao(){
        const media = this.calcularMedia();
        if (media<=6){
            console.log("reprovado")
        }
        else{
            console.log("aprovado")
        }
    }
    exibir(){
        console.log (`Aluno: ${this.nome}, Média: ${this.calcularMedia().toFixed(2)}`), this.situacao();
    }
}
const aluno1 = new aluno("Bruno", 7);
aluno1.adicionarNota(4);
aluno1.adicionarNota(6);
aluno1.exibir();