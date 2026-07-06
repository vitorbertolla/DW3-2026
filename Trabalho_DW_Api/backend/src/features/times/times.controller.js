export class TimeController{
    constructor(service){
        this.service = service
    }
    async buscarTodos(request, reply){
        const times = await this.service.buscarTodos()
        return reply.send(times)
    }
    async buscarPorId(request, reply){
        const id = Number(request.params.id)
        const time = await this.service.buscarPorId(id)
        return reply.send(time)
    }
    async buscarTitulos(request, reply){
        const id = Number(request.params.id)
        const titulos = await this.service.buscarTitulos(id)
        return reply.send(titulos)
    }
    async buscarDetalhes(request, reply){
        const id = Number(request.params.id)
        const detalhes = await this.service.buscarDetalhes(id)
        return reply.send(detalhes)
    }
    async criar(request, reply){
        const time = request.body
        const timeCriado = await this.service.criar(time)
        return reply.status(201).send(timeCriado)
    }
    async atualizar(request, reply){
        const id = Number(request.params.id)
        const dadosAtualizados = request.body
        const timeAtualizado = await this.service.atualizar(id, dadosAtualizados)
        return reply.send(timeAtualizado)
    }
    async deletar(request, reply){
        const id = Number(request.params.id)
        const timeDeletado = await this.service.deletar(id)
        return reply.send(timeDeletado)
    }
}