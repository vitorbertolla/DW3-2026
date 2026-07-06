import {AppError} from '../../../src/errors/AppError.js'
export class TimeService {
    constructor(repository, estadosRepository) {
        this.repository = repository,
        this.estadosRepository = estadosRepository
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
    async buscarTitulos(id){
        const time = await this.repository.buscarPorId(id)
        if (!time) {
            throw new AppError(`Time com id ${id} não encontrado`)
        }
        const titulos = await this.repository.buscarTitulos(id)
        return titulos
    }
    async buscarDetalhes(id){
        const time = await this.repository.buscarPorId(id)
        if (!time) {
            throw new AppError(`Time com id ${id} não encontrado`)
        }
        const detalhes = await this.repository.buscarDetalhes(id)
        return detalhes
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
        const estado = await this.estadosRepository.buscarPorId(time.estado_id)
        if (!estado) {
            throw new AppError(`Estado com id ${time.estado_id} não encontrado`)
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
        if (dadosAtualizados.estado_id) {
            const estado = await this.estadosRepository.buscarPorId(dadosAtualizados.estado_id)
            if (!estado) {
                throw new AppError(`Estado com id ${dadosAtualizados.estado_id} não encontrado`)
            }
        }
        const nomeJaExiste = timesExistentes.some(t => t.nome.toLowerCase() === dadosAtualizados.nome.toLowerCase().trim() && t.id !== id)
        if (nomeJaExiste) {
            throw new AppError('Já existe um time com esse nome')
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

