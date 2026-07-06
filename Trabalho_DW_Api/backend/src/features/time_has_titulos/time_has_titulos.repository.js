import pool from '../../database/pool.js'

export class TimeHasTituloRepository {

    async buscarTodos() {
        const resultado = await pool.query(`
            SELECT
                id,
                time_id,
                titulo_id,
                ano
            FROM time_has_titulo
            ORDER BY id
        `)

        return resultado.rows
    }

    async buscarPorId(id) {
        const resultado = await pool.query(`
            SELECT
                id,
                time_id,
                titulo_id,
                ano
            FROM time_has_titulo
            WHERE id = $1
        `, [id])

        return resultado.rows[0]
    }

    async criar(timeHasTitulo) {
        const resultado = await pool.query(`
            INSERT INTO time_has_titulo
                (time_id, titulo_id, ano)
            VALUES
                ($1, $2, $3)
            RETURNING *
        `, [
            timeHasTitulo.time_id,
            timeHasTitulo.titulo_id,
            timeHasTitulo.ano
        ])

        return resultado.rows[0]
    }

    async atualizar(id, dadosAtualizados) {

        const registro = await this.buscarPorId(id)

        const resultado = await pool.query(`
            UPDATE time_has_titulo
            SET
                time_id = $1,
                titulo_id = $2,
                ano = $3
            WHERE id = $4
            RETURNING *
        `, [
            dadosAtualizados.time_id ?? registro.time_id,
            dadosAtualizados.titulo_id ?? registro.titulo_id,
            dadosAtualizados.ano ?? registro.ano,
            id
        ])

        return resultado.rows[0]
    }

    async deletar(id) {
        const resultado = await pool.query(`
            DELETE FROM time_has_titulo
            WHERE id = $1
            RETURNING *
        `, [id])

        return resultado.rows[0]
    }

}