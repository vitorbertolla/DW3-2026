import pool from '../../database/pool.js'

export class EstadoRepository{
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
    async criar(estado){
        const resultado = await pool.query(`
            INSERT INTO estados
            (nome, sigla ) VALUES ($1, $2)
            RETURNING *`,
            [estado.nome, estado.sigla])
        return resultado.rows[0]
    }
    async atualizar(id, dadosAtualizados) {
        const estado = await this.buscarPorId(id);
        const resultado = await pool.query(`
            UPDATE estados
            SET
                nome = $1,
                sigla = $2
            WHERE id = $3
            RETURNING *
        `, [
            dadosAtualizados.nome ?? estado.nome,
            dadosAtualizados.sigla ?? estado.sigla,
            id
        ]);

        return resultado.rows[0];
    }
    async deletar(id){
        const estados = await pool.query(`
            DELETE FROM estados
            WHERE id = $1
        `, [id])
        return estados.rows[0]
    }
}