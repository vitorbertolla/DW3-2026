// @file: src/features/tarefas/tarefa.service.js
import { AppError } from '../../errors/AppError.js'

export class TarefaService {
  constructor(repository) {
    this.repository = repository
  }

  async listarTarefas({ busca, status } = {}) {
    let tarefas = await this.repository.buscarTodos(busca, status)
    return tarefas
  }

  async buscarPorId(id) {
    const linhas = await this.repository.buscarPorId(id)

    if (!linhas || linhas.length === 0) {
      throw new AppError('Tarefa não encontrada', 404)
    }

    const tarefa = {
      id: linhas[0].id,
      descricao: linhas[0].descricao,
      concluido: linhas[0].concluido,
      criada_em: linhas[0].criada_em,
      projeto: {
        id: linhas[0].projeto_id,
        nome: linhas[0].projeto_nome
      },
      tags: []
    }

    linhas.forEach(linha => {
      if (linha.tag_nome) {
        tarefa.tags.push(linha.tag_nome)
      }
    })

    return tarefa
  }
  async obterResumo() {
    console.log("Service: obterResumo chamado")
    const todas = await this.repository.buscarTodos()
    const total = todas.length
    const concluidas = todas.filter(t => t.status === true).length
    const pendentes = total - concluidas
    return { total, concluidas, pendentes }
  }

  async criarTarefa(dados) {
    const { descricao, projetoId } = dados
    if (!descricao || descricao.trim() === '') {
      throw new AppError('A descrição é obrigatória', 400)
    }
    if (!projetoId) {
      throw new AppError('O projeto é obrigatório', 400)
    } 

    const tarefas = await this.repository.buscarTodos()
    const descricaoJaExiste = tarefas.some(t => t.descricao.toLowerCase() === descricao.toLowerCase().trim())

    if (descricaoJaExiste) {
      throw new AppError('Já existe uma tarefa com essa descrição', 400)
    }

    return this.repository.salvar({ descricao, projetoId, concluido: false })
  }

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id) // Se não achar, o método acima já lança o AppError 404

    if (tarefa.concluido === true) {
      throw new AppError('Não é possível atualizar uma tarefa já concluída', 400)
    }

    return this.repository.atualizar(id, dados)
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    const novoStatus = !tarefa.concluido 
    return this.repository.atualizar(id, { concluido: novoStatus })
  }

  async removerTarefa(id) {
    const tarefa = await this.buscarPorId(id)

    if (tarefa.status === true) {
      throw new AppError('Não é possível remover uma tarefa já concluída', 400)
    }

    return this.repository.remover(id)
  }
}