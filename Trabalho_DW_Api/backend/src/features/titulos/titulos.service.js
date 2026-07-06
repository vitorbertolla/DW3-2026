import {AppError} from '../../../src/errors/AppError.js'
export class TituloService {
    constructor(repository) {
        this.repository = repository
    }
    async buscarTodos(){
        const titulos = await this.repository.buscarTodos()
        return titulos
    }
    async buscarPorId(id){
        const titulo = await this.repository.buscarPorId(id)
        if (!titulo) {
            throw new AppError(`titulo com id ${id} não encontrado`)
        }
        return titulo
    }
    async criar(titulo){
        if(!titulo.nome){
            throw new AppError('Nome é obrigatórios')
        }
        const titulosExistentes = await this.repository.buscarTodos()
        const nomeJaExiste = titulosExistentes.some(t => t.nome.toLowerCase() === titulo.nome.toLowerCase().trim())
        if (nomeJaExiste) {
            throw new AppError('Já existe um titulo com esse nome')
        }
        const tituloCriado = await this.repository.criar(titulo)
        return tituloCriado
    }
    async atualizar(id, dadosAtualizados){
        if (!id){
            throw new AppError('O id do titulo é obrigatório')
        }
        const tituloExistente = await this.repository.buscarPorId(id)
        if (!tituloExistente) {
            throw new AppError(`titulo com id ${id} não encontrado`)
        }
        if (!dadosAtualizados.nome){
            throw new AppError('Nome é obrigatório para atualização')
        }
        const titulosExistentes = await this.repository.buscarTodos()
        const nomeJaExiste = titulosExistentes.some(t => t.nome.toLowerCase() === dadosAtualizados.nome.toLowerCase().trim() && t.id !== id)
        if (nomeJaExiste) {
            throw new AppError('Já existe um titulo com esse nome')
        }
        const tituloAtualizado = await this.repository.atualizar(id, dadosAtualizados)
        return tituloAtualizado
    }
    async deletar(id){
        if (!id){
            throw new AppError('O id do titulo é obrigatório')
        }
        const tituloExistente = await this.repository.buscarPorId(id)
        if (!tituloExistente) {
            throw new AppError(`titulo com id ${id} não encontrado`)
        }
        const tituloDeletado = await this.repository.deletar(id)
        return tituloDeletado
    }

}

