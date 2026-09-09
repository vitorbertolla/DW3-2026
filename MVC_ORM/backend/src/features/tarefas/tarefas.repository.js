import pool from "../../database/pool.js"
export class TarefaRepository {

    async buscarTodos() {
    const resultado = await pool.query(`
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome
      FROM tarefas t
      LEFT JOIN projetos p
        ON p.id = t.projeto_id
      ORDER BY t.id
    `)

    return resultado.rows
  }
  async buscarPorId(id) {
    const resultado = await pool.query(
      `
      SELECT
        t.id,
        t.descricao,
        t.concluido,
        t.criada_em,
        t.projeto_id,
        p.nome AS projeto_nome,
        tg.id AS tag_id,
        tg.nome AS tag_nome
      FROM tarefas t
      LEFT JOIN projetos p
        ON p.id = t.projeto_id
      LEFT JOIN tarefas_tags tt
        ON tt.tarefa_id = t.id
      LEFT JOIN tags tg
        ON tg.id = tt.tag_id
      WHERE t.id = $1
      `,
      [id]
    )

    return resultado.rows
  }
  async salvar(tarefa) {
    const resultado = await pool.query(
      `
        INSERT INTO tarefas (descricao, concluido, projeto_id)
        VALUES ($1, $2, $3)
        RETURNING id, descricao, concluido, criada_em, projeto_id
      `,
      [tarefa.descricao, tarefa.concluido, tarefa.projetoId]
    )

    return resultado.rows[0]
  }

  async atualizar(id, dadosAtualizados) {
  const tarefaAtual = await this.buscarPorId(id)

  if (!tarefaAtual) return null

  const tarefaFinal = {
    ...tarefaAtual,
    ...dadosAtualizados,
    id: tarefaAtual.id
  }

  const resultado = await pool.query(
    `
      UPDATE tarefas
      SET descricao = $1,
          concluido = $2
      WHERE id = $3
      RETURNING id, descricao, concluido, criada_em
    `,
    [tarefaFinal.descricao, tarefaFinal.concluido, id]
  )

  return resultado.rows[0] ?? null
}

  async remover(id) {
    const resultado = await pool.query(
      `
        DELETE FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    return resultado.rowCount > 0
  }
}