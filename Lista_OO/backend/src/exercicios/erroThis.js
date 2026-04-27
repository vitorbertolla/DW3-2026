class Timer {
  constructor(nome) {
    this.nome = nome
    this.segundos = 0
  }

  iniciar() {
    // 2) correção com arrow function
    setInterval(() => {
      this.segundos++
      console.log(`${this.nome}: ${this.segundos}s`)
    }, 1000)
  }
}

const t = new Timer('Cronômetro')
t.iniciar()

// 1) O erro do this era pelo uso da função regular dentro do setInterval, dessa forma o this perde a referência do objeto timer
// 3) Para corrigir o erro foi necessário usar a arrow function, ela não cria seu próprio this, então o this dentro dela herda o valor do this do contexto onde ela foi criada, dessa forma ela conhece o objeto timer