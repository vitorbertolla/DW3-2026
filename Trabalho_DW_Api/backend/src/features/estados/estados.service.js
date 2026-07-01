import {AppError} from '../../../src/errors/AppError.js'
export class EstadosService {
    constructor(repository) {
        this.repository = repository
    }
    async buscarTodos(){
        const estados = await this.repository.buscarTodos()
        return estados
    }
    async buscarPorId(id){
        const estado = await this.repository.buscarPorId(id)
        if (!estado) {
            throw new AppError(`estado com id ${id} não encontrado`)
        }
        return estado
    }
    async criar(estado){
        if(!estado.nome || !estado.sigla){
            throw new AppError('Todos os campos são obrigatórios')
        }
        const estadosExistentes = await this.repository.buscarTodos()
        const nomeJaExiste = estadosExistentes.some(t => t.nome.toLowerCase() === estado.nome.toLowerCase().trim())
        if (nomeJaExiste) {
            throw new AppError('Já existe um estados com esse nome')
        }
        const siglaJaExiste = estadosExistentes.some(t => t.sigla.toLowerCase() === estado.sigla.toLowerCase().trim())
        if (siglaJaExiste) {
            throw new AppError('Já existe um estados com essa sigla')
        }
        const estadoCriado = await this.repository.criar(estado)
        return estadoCriado
    }
    async atualizar(id, dadosAtualizados){
        if (!id){
            throw new AppError('O id do estados é obrigatório')
        }
        const estadoExistente = await this.repository.buscarPorId(id)
        if (!estadoExistente) {
            throw new AppError(`estados com id ${id} não encontrado`)
        }
        if (!dadosAtualizados.nome && !dadosAtualizados.sigla){
            throw new AppError('Pelo menos um campo deve ser fornecido para atualização')
        }
        const estadoAtualizado = await this.repository.atualizar(id, dadosAtualizados)
        return estadoAtualizado
    }
    async deletar(id){
        if (!id){
            throw new AppError('O id do estados é obrigatório')
        }
        const estadoExistente = await this.repository.buscarPorId(id)
        if (!estadoExistente) {
            throw new AppError(`estados com id ${id} não encontrado`)
        }
        const estadoDeletado = await this.repository.deletar(id)
        return estadoDeletado
    }

}

