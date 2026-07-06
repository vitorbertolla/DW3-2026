export class TituloController{
    constructor(service){
        this.service = service
    }
    async buscarTodos(request, reply){
        const titulos = await this.service.buscarTodos()
        return reply.send(titulos)
    }
    async buscarPorId(request, reply){
        const id = Number(request.params.id)
        const titulo = await this.service.buscarPorId(id)
        return reply.send(titulo)
    }
    async criar(request, reply){
        const titulo = request.body
        const tituloCriado = await this.service.criar(titulo)
        return reply.status(201).send(tituloCriado)
    }
    async atualizar(request, reply){
        const id = Number(request.params.id)
        const dadosAtualizados = request.body
        const tituloAtualizado = await this.service.atualizar(id, dadosAtualizados)
        return reply.send(tituloAtualizado)
    }
    async deletar(request, reply){
        const id = Number(request.params.id)
        const tituloDeletado = await this.service.deletar(id)
        return reply.send(tituloDeletado)
    }
}