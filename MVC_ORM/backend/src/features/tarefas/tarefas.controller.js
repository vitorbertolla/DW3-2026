export class TarefaController {
  constructor(service) {
    this.service = service
  }

  async listar(request, reply) {
    const { busca, status } = request.query
    const tarefas = await this.service.listarTarefas({ busca, status })
    return reply.send(tarefas)
  }

  async buscar(request, reply) {
    const id  = Number(request.params.id)
    // Se não encontrar, o Service lança o erro e o código para aqui.
    // Se passar para a linha de baixo, temos garantia que a tarefa existe.
    const tarefa = await this.service.buscarPorId(id)
    return reply.send(tarefa)
  }
    async obterResumo(request, reply) {
    console.log("Controller: obterResumo chamado")
    const resumo = await this.service.obterResumo()
    return reply.send(resumo)
  }

  async criar(request, reply) {
    const {descricao, projetoId} = request.body
    const tarefa = await this.service.criarTarefa({ descricao, projetoId })
    return reply.status(201).send(tarefa)
  }

  async atualizar(request, reply) {
    const id  = Number(request.params.id)
    const tarefa = await this.service.atualizarTarefa(id, request.body)
    return reply.send(tarefa)
  }

  async concluir(request, reply) {
    const id  = Number(request.params.id)
    const tarefa = await this.service.concluirTarefa(id)
    return reply.send(tarefa)
  }

  async remover(request, reply) {
    const id  = Number(request.params.id)
    await this.service.removerTarefa(id)
    return reply.status(204).send()
  }
}