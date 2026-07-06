import pool from '../../database/pool.js'

export class EstadioRepository{
    async buscarTodos (){
        const resultado = await pool.query(`
        SELECT
            e.id,
            e.nome,
            e.capacidade, 
            e.time_id
        FROM estadios e
        ORDER BY e.id
        `)
        return resultado.rows
    }
    async buscarPorId(id){
        const resultado = await pool.query(`
        SELECT
            e.id,
            e.nome,
            e.capacidade, 
            e.time_id
        FROM estadios e
        WHERE e.id = $1
        `, [id])
        return resultado.rows[0]
    }
    async criar(estadios){
        const resultado = await pool.query(`
            INSERT INTO estadios
            (nome, capacidade, time_id ) VALUES ($1, $2, $3)
            RETURNING *`,
            [estadios.nome, estadios.capacidade, estadios.time_id])
        return resultado.rows[0]
    }
    async atualizar(id, dadosAtualizados){
        const estadios = await this.buscarPorId(id)
        if(!estadios){
            throw new Error(`estadios com id ${id} não encontrado`)
        }
        const resultado = await pool.query(`
            UPDATE estadios
            SET nome = $1, capacidade = $2, time_id = $3
            WHERE id = $4
            RETURNING *
        `, [dadosAtualizados.nome, dadosAtualizados.capacidade, dadosAtualizados.time_id, id])
        return resultado.rows[0]
    }
    async deletar(id){
        const estadios = await pool.query(`
            DELETE FROM estadios
            WHERE id = $1
        `, [id])
        return estadios.rows[0]
    }
}