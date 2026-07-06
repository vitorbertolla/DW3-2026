import pool from '../../database/pool.js'

export class TituloRepository{
    async buscarTodos (){
        const resultado = await pool.query(`
        SELECT
            t.id,
            t.nome
        FROM titulos t
        ORDER BY t.id
        `)
        return resultado.rows
    }
    async buscarPorId(id){
        const resultado = await pool.query(`
        SELECT
            t.id,
            t.nome
        FROM titulos t
        WHERE t.id = $1
        `, [id])
        return resultado.rows[0]
    }
    async criar(titulo){
        const resultado = await pool.query(`
            INSERT INTO titulos
            (nome ) VALUES ($1)
            RETURNING *`,
            [titulo.nome])
        return resultado.rows[0]
    }
    async atualizar(id, dadosAtualizados) {
        const titulo = await this.buscarPorId(id);
        const resultado = await pool.query(`
            UPDATE titulos
            SET
                nome = $1
            WHERE id = $2
            RETURNING *
        `, [
            dadosAtualizados.nome ?? titulo.nome,
            id
        ]);

        return resultado.rows[0];
    }
    async deletar(id){
        const titulo = await pool.query(`
            DELETE FROM titulos
            WHERE id = $1
        `, [id])
        return titulo.rows[0]
    }
}