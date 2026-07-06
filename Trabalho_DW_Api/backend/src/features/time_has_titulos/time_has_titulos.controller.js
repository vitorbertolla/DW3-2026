export class TimeHasTituloController{
    constructor(service){
        this.service = service
    }
    async buscarTodos(request, reply){
        const registros = await this.service.buscarTodos()
        return reply.send(registros)
    }
    async buscarPorId(request, reply){
        const id = Number(request.params.id)
        const registro = await this.service.buscarPorId(id)
        return reply.send(registro)
    }
    async criar(request, reply){
        const registro = request.body
        const registroCriado = await this.service.criar(registro)
        return reply.status(201).send(registroCriado)
    }
    async atualizar(request, reply){
        const id = Number(request.params.id)
        const dadosAtualizados = request.body
        const registroAtualizado = await this.service.atualizar(id, dadosAtualizados)
        return reply.send(registroAtualizado)
    }
    async deletar(request, reply){
        const id = Number(request.params.id)
        const registroDeletado = await this.service.deletar(id)
        return reply.send(registroDeletado)
    }
}