export class EstadioController{
    constructor(service){
        this.service = service
    }
    async buscarTodos(request, reply){
        const estadios = await this.service.buscarTodos()
        return reply.send(estadios)
    }
    async buscarPorId(request, reply){
        const id = Number(request.params.id)
        const estadio = await this.service.buscarPorId(id)
        return reply.send(estadio)
    }
    async criar(request, reply){
        const estadio = request.body
        const estadioCriado = await this.service.criar(estadio)
        return reply.status(201).send(estadioCriado)
    }
    async atualizar(request, reply){
        const id = Number(request.params.id)
        const dadosAtualizados = request.body
        const estadioAtualizado = await this.service.atualizar(id, dadosAtualizados)
        return reply.send(estadioAtualizado)
    }
    async deletar(request, reply){
        const id = Number(request.params.id)
        const estadioDeletado = await this.service.deletar(id)
        return reply.send(estadioDeletado)
    }
}