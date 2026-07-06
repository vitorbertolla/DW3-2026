import {AppError} from '../../../src/errors/AppError.js'
export class EstadioService {
    constructor(repository, repositoryTimes) {
        this.repository = repository
        this.repositoryTimes = repositoryTimes
    }
    async buscarTodos(){
        const estadios = await this.repository.buscarTodos()
        return estadios
    }
    async buscarPorId(id){
        const estadio = await this.repository.buscarPorId(id)
        if (!estadio) {
            throw new AppError(`estadio com id ${id} não encontrado`)
        }
        return estadio
    }
    async criar(estadio){
        if(!estadio.nome || !estadio.time_id){
            throw new AppError('Preencha todos os campos são obrigatórios')
        }
        const estadiosExistentes = await this.repository.buscarTodos()
        const nomeJaExiste = estadiosExistentes.some(t => t.nome.toLowerCase() === estadio.nome.toLowerCase().trim())
        if (nomeJaExiste) {
            throw new AppError('Já existe um estadios com esse nome')
        }
        const timeExistente = await this.repositoryTimes.buscarPorId(estadio.time_id)
        if (!timeExistente) {
            throw new AppError(`Time com id ${estadio.time_id} não encontrado`)
        }
        const estadioCriado = await this.repository.criar(estadio)
        return estadioCriado
    }
    async atualizar(id, dadosAtualizados){
        if (!id){
            throw new AppError('O id do estadios é obrigatório')
        }
        const estadioExistente = await this.repository.buscarPorId(id)
        if (!estadioExistente) {
            throw new AppError(`estadio com id ${id} não encontrado`)
        }
        if (!dadosAtualizados.nome && !dadosAtualizados.time_id && !dadosAtualizados.capacidade){
            throw new AppError('Pelo menos um campo deve ser fornecido para atualização')
        }
        if (dadosAtualizados.time_id){
            const timeExistente = await this.repositoryTimes.buscarPorId(dadosAtualizados.time_id)
                if (!timeExistente) {
                    throw new AppError(`Time com id ${dadosAtualizados.time_id} não encontrado`)
                }
        }
        const estadiosExistentes = await this.repository.buscarTodos()
        const nomeJaExiste = estadiosExistentes.some(t => t.nome.toLowerCase() === dadosAtualizados.nome.toLowerCase().trim() && t.id !== id)
        if (nomeJaExiste) {
            throw new AppError('Já existe um estadios com esse nome')
        }
        const estadioAtualizado = await this.repository.atualizar(id, dadosAtualizados)
        return estadioAtualizado
    }
    async deletar(id){
        if (!id){
            throw new AppError('O id do estadios é obrigatório')
        }
        const estadioExistente = await this.repository.buscarPorId(id)
        if (!estadioExistente) {
            throw new AppError(`estadio com id ${id} não encontrado`)
        }
        const estadioDeletado = await this.repository.deletar(id)
        return estadioDeletado
    }

}

