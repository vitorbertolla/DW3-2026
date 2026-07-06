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
            (nome, estado_id, fundacao ) VALUES ($1, $2, $3)
            RETURNING *`,
            [time.nome, time.estado_id, time.fundacao])
        return resultado.rows[0]
    }
    async atualizar(id, dadosAtualizados) {
        const time = await this.buscarPorId(id);
        const resultado = await pool.query(`
            UPDATE times
            SET
                nome = $1,
                fundacao = $2,
                estado_id = $3
            WHERE id = $4
            RETURNING *
        `, [
            dadosAtualizados.nome ?? time.nome,
            dadosAtualizados.fundacao ?? time.fundacao,
            dadosAtualizados.estado_id ?? time.estado_id,
            id
        ]);

        return resultado.rows[0];
    }
    async deletar(id){
        const time = await pool.query(`
            DELETE FROM times
            WHERE id = $1
        `, [id])
        return time.rows[0]
    }
}