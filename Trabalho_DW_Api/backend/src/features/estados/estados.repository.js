import pool from '../../database/pool.js'

export class EstadosRepository{
    async buscarTodos (){
        const resultado = await pool.query(`
        SELECT
            e.id,
            e.nome,
            e.sigla
        FROM estados e
        ORDER BY e.id
        `)
        return resultado.rows
    }
    async buscarPorId(id){
        const resultado = await pool.query(`
        SELECT
            e.id,
            e.nome,
            e.sigla
        FROM estados e
        WHERE e.id = $1
        `, [id])
        return resultado.rows[0]
    }
    async criar(estados){
        const resultado = await pool.query(`
            INSERT INTO estados
            (nome, sigla ) VALUES ($1, $2)
            RETURNING *`,
            [estados.nome, estados.sigla])
        return resultado.rows[0]
    }
    async atualizar(id, dadosAtualizados){
        const estados = await this.buscarPorId(id)
        if(!estados){
            throw new Error(`estados com id ${id} não encontrado`)
        }
        const resultado = await pool.query(`
            UPDATE estados
            SET nome = $1, sigla = $2
            WHERE id = $3
            RETURNING *
        `, [dadosAtualizados.nome, dadosAtualizados.sigla, id])
        return resultado.rows[0]
    }
    async deletar(id){
        const estados = await pool.query(`
            DELETE FROM estados
            WHERE id = $1
        `, [id])
        return estados.rows[0]
    }
}