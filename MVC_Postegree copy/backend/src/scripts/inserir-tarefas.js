import db from "../database/drizzle.js";
import pool from "../database/pool.js";
import {tarefas} from "../database/schema.js";

async function inserirTarefasORM(descricao, concluido, projetoId) {
    await db.insert(tarefas).values({
        descricao: descricao,
        concluido: concluido,
        projetoId: projetoId
    })
}
async function inserirTarefasSQL(descricao, concluido, projetoId) {
    await pool.query('INSERT INTO tarefas (descricao, concluido, projeto_id) VALUES ($1, $2, $3)', [descricao, concluido, projetoId])
}  