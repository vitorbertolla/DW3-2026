import { AppError } from '../../../src/errors/AppError.js'

export class TimeHasTituloService {

    constructor(repository) {
        this.repository = repository
    }

    async buscarTodos() {
        const registros = await this.repository.buscarTodos()
        return registros
    }

    async buscarPorId(id) {

        const registro = await this.repository.buscarPorId(id)

        if (!registro) {
            throw new AppError(`Relação com id ${id} não encontrada`)
        }

        return registro
    }

    async criar(timeHasTitulo) {

        if (!timeHasTitulo.time_id) {
            throw new AppError('time_id é obrigatório')
        }

        if (!timeHasTitulo.titulo_id) {
            throw new AppError('titulo_id é obrigatório')
        }

        if (!timeHasTitulo.ano) {
            throw new AppError('ano é obrigatório')
        }

        const registros = await this.repository.buscarTodos()

        const registroExistente = registros.some(r =>
            r.time_id === timeHasTitulo.time_id &&
            r.titulo_id === timeHasTitulo.titulo_id &&
            r.ano === timeHasTitulo.ano
        )

        if (registroExistente) {
            throw new AppError('Esse título já foi cadastrado para esse time nesse ano')
        }

        return await this.repository.criar(timeHasTitulo)
    }

    async atualizar(id, dadosAtualizados) {

        if (!id) {
            throw new AppError('O id é obrigatório')
        }

        const registro = await this.repository.buscarPorId(id)

        if (!registro) {
            throw new AppError(`Relação com id ${id} não encontrada`)
        }

        const time_id = dadosAtualizados.time_id ?? registro.time_id
        const titulo_id = dadosAtualizados.titulo_id ?? registro.titulo_id
        const ano = dadosAtualizados.ano ?? registro.ano

        const registros = await this.repository.buscarTodos()

        const registroExistente = registros.some(r =>
            r.id !== id &&
            r.time_id === time_id &&
            r.titulo_id === titulo_id &&
            r.ano === ano
        )

        if (registroExistente) {
            throw new AppError('Esse título já foi cadastrado para esse time nesse ano')
        }

        return await this.repository.atualizar(id, dadosAtualizados)
    }

    async deletar(id) {

        if (!id) {
            throw new AppError('O id é obrigatório')
        }

        const registro = await this.repository.buscarPorId(id)

        if (!registro) {
            throw new AppError(`Relação com id ${id} não encontrada`)
        }

        return await this.repository.deletar(id)
    }

}