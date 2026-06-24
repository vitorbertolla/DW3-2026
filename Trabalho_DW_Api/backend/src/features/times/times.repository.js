import pool from '../../database/pool.js'

export class TimeRepository{
    async buscarTodos (){
        const resultado = await pool.query(`
        SELECT
            t.id,
            t.nome,
            t.estado_id,
            t.fundacao
        FROM times t
        ORDER BY t.id
        `)
        return resultado.rows
    }
    async buscarPorId(id){
        const resultado = await pool.query(`
        SELECT
            t.id,
            t.nome,
            t.estado_id,
            t.fundacao
        FROM times t
        WHERE t.id = $1
        `, [id])
        return resultado.rows[0]
    }
    async criar(time){
        const resultado = await pool.query(`
            INSERT INTO times
            (nome, estado_id, fundacao ) VALUES ($1, $2, $3)`,
            [time.nome, time.estado_id, time.fundacao])
        return resultado.rows[0]
    }
    async atualizar(id, dadosAtualizados){
        const time = await this.buscarPorId(id)
        if(!time){
            throw new Error(`Time com id ${id} não encontrado`)
        }
        const resultado = await pool.query(`
            UPDATE times
            SET nome = $1, estado_id = $2, fundacao = $3
            WHERE id = $4
        `, [dadosAtualizados.nome, dadosAtualizados.estado_id, dadosAtualizados.fundacao, id])
        return resultado.rows[0]
    }
    async deletar(id){
        const time = await pool.query(`
            DELETE FROM times
            WHERE id = $1
        `, [id])
        return time.rows[0]
    }
}