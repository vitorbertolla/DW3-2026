import { TarefasModel } from "../models/tarefas.model.js"
const model = new TarefasModel()
export class TarefasController {
    async listarTarefa(request, reply) {
        try{
            const busca = request.query.busca
            const concluido = request.query.concluido
            const resultado =  await model.listarTarefa(busca, concluido)
            return reply.send(resultado)
        }
        catch (error) {
            return reply.status(500).send({ error: error.message })
        }

    }
    async resumoTarefa(request, reply) {
        try {
            const resultado = await model.resumoTarefa()
            return reply.send(resultado)
        } catch (error) {
            return reply.status(500).send({ error: error.message })
        }
    }
    async pendenteTarefa(request, reply) {
        try {
            const resultado = await model.pendenteTarefa()
            return reply.send(resultado)
        } catch (error) {
            return reply.status(500).send({ error: error.message })
        }
    }
    async criarTarefa(request, reply) {
        try{
            const novaTarefa = request.body
            if (!novaTarefa.descricao || novaTarefa.descricao.trim() === ""){
                throw new Error("descricao é obrigatório")
            }
            const resultado = await model.criarTarefa(novaTarefa)
            return reply.send(resultado)
        }catch(error){
            return reply.status(500).send({ error: error.message })
        }

    }
    async atualizarTarefa(request, reply) {
        try{
            const id = Number(request.params.id)
            await model.findById(id)
            const { descricao } = request.body
            if (!descricao || descricao.trim() === "") {
                throw new Error("descricao é obrigatório")
            }
            const resultado = await model.atualizarTarefa(id, descricao)
            return reply.send(resultado)
        }catch(error){
            return reply.status(500).send({ error: error.message })
        }
    }
    async concluirTarefa(request, reply) {
        try{
            const id = Number(request.params.id)
            await model.findById(id)
            const resultado = await model.concluirTarefa(id)
            return reply.send(resultado)
        }catch(error){
            return reply.status(500).send({ error: error.message })}
    }
    async deletarTarefa(request, reply){
        try{
            const id = Number(request.params.id)
            await model.findById(id)
            const resultado = await model.deletarTarefa(id)
            return reply.send(resultado)
        }
        catch (error) {
            return reply.status(500).send({ error: error.message })
        }
    } 
}