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
    async buscarDetalhes(id){
        const resultado = await pool.query(`
            SELECT
                t.nome, 
                t.fundacao, 
                e.nome as estado, 
                et.nome as estadio,
                et.capacidade,
                COUNT(tht.id) AS total_titulos
                FROM times t 
                INNER JOIN estados e
                    ON t.estado_id = e.id 
                INNER JOIN estadios et
                    ON t.id = et.time_id
                LEFT JOIN time_has_titulo tht
                    ON t.id = tht.time_id
                WHERE t.id = $1
                GROUP BY
                    t.id,
                    t.nome,
                    t.fundacao,
                    e.nome,
                    et.nome,
                    et.capacidade`, [id])
        return resultado.rows[0]
    }
    async buscarTitulos(id){
        const resultado = await pool.query(`
            SELECT
                t.id,
                t.nome,
                e.nome AS estado,
                json_agg(
                    json_build_object(
                        'titulo', ti.nome,
                        'ano', tht.ano
                    )
                    ORDER BY tht.ano DESC
                ) AS titulos
            FROM times t
            INNER JOIN estados e
                ON e.id = t.estado_id
            INNER JOIN time_has_titulo tht
                ON tht.time_id = t.id
            INNER JOIN titulos ti
                ON ti.id = tht.titulo_id
            WHERE t.id = $1
            GROUP BY
                t.id,
                t.nome,
                e.nome;`, [id])
        return resultado.rows
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