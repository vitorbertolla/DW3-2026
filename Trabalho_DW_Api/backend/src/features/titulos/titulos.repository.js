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
    async buscarCampeoes(id){
        const resultado = await pool.query(`
            SELECT
                ti.nome AS titulo,
                json_agg(
                    json_build_object(
                        'time', t.nome,
                        'ano', tht.ano
                    )
                    ORDER BY tht.ano DESC
                ) AS campeoes
            FROM time_has_titulo tht
            INNER JOIN titulos ti
                ON ti.id = tht.titulo_id
            INNER JOIN times t
                ON t.id = tht.time_id
            WHERE ti.id = $1
            GROUP BY ti.nome
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