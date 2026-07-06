export class EstadoController{
    constructor(service){
        this.service = service
    }
    async buscarTodos(request, reply){
        const estados = await this.service.buscarTodos()
        return reply.send(estados)
    }
    async buscarPorId(request, reply){
        const id = Number(request.params.id)
        const estado = await this.service.buscarPorId(id)
        return reply.send(estado)
    }
    async criar(request, reply){
        const estado = request.body
        const estadoCriado = await this.service.criar(estado)
        return reply.status(201).send(estadoCriado)
    }
    async atualizar(request, reply){
        const id = Number(request.params.id)
        const dadosAtualizados = request.body
        const estadoAtualizado = await this.service.atualizar(id, dadosAtualizados)
        return reply.send(estadoAtualizado)
    }
    async deletar(request, reply){
        const id = Number(request.params.id)
        const estadoDeletado = await this.service.deletar(id)
        return reply.send(estadoDeletado)
    }
}