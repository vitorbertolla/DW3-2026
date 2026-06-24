import {AppError} from '../../../src/errors/AppError.js'
export class TimeService {
    constructor(repository) {
        this.repository = repository
    }
    async buscarTodos(){
        const times = await this.repository.buscarTodos()
        return times
    }
    async buscarPorId(id){
        const time = await this.repository.buscarPorId(id)
        if (!time) {
            throw new AppError(`Time com id ${id} não encontrado`)
        }
        return time
    }
    async criar(time){
        if(!time.nome || !time.estado_id || !time.fundacao){
            throw new AppError('Todos os campos são obrigatórios')
        }
        const timesExistentes = await this.repository.buscarTodos()
        const nomeJaExiste = timesExistentes.some(t => t.nome.toLowerCase() === time.nome.toLowerCase().trim())
        if (nomeJaExiste) {
            throw new AppError('Já existe um time com esse nome')
        }
        const timeCriado = await this.repository.criar(time)
        return timeCriado
    }
    async atualizar(id, dadosAtualizados){
        if (!id){
            throw new AppError('O id do time é obrigatório')
        }
        const timeExistente = await this.repository.buscarPorId(id)
        if (!timeExistente) {
            throw new AppError(`Time com id ${id} não encontrado`)
        }
        if (!dadosAtualizados.nome && !dadosAtualizados.estado_id && !dadosAtualizados.fundacao){
            throw new AppError('Pelo menos um campo deve ser fornecido para atualização')
        }
        const timeAtualizado = await this.repository.atualizar(id, dadosAtualizados)
        return timeAtualizado
    }
    async deletar(id){
        if (!id){
            throw new AppError('O id do time é obrigatório')
        }
        const timeExistente = await this.repository.buscarPorId(id)
        if (!timeExistente) {
            throw new AppError(`Time com id ${id} não encontrado`)
        }
        const timeDeletado = await this.repository.deletar(id)
        return timeDeletado
    }

}

