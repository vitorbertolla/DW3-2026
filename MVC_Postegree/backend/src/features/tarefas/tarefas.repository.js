import client from "../../database/client.js"
export class TarefaRepository {
  async buscarTodos(busca, status) {
    let query = `Select * from tarefas order by id`
    let params = []

    if (status !== undefined) {
      if(busca){
        query = `Select * from tarefas where busca ILIKE $1 and concluido = $2 order by id`
        params = [`%${busca}%`, status]
      } else {
        query = `Select * from tarefas where concluido = $1 order by id`
        params.push(status)
      }
    } else if (busca) {
      query = `Select * from tarefas where busca ILIKE $1 order by id`
      params.push(`%${busca}%`)
    }

    const resultado = await client.query(query, params)
    return resultado.rows
  }

  async buscarPorId(id) {
    const resultado = await client.query(
      `
        SELECT id, descricao, concluido, criada_em
        FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    return resultado.rows[0] ?? null
  }
  async salvar(tarefa) {
    const resultado = await client.query(
      `
        INSERT INTO tarefas (descricao, concluido)
        VALUES ($1, $2)
        RETURNING id, descricao, concluido, criada_em
      `,
      [tarefa.descricao, tarefa.concluido]
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

  const resultado = await client.query(
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
    const resultado = await client.query(
      `
        DELETE FROM tarefas
        WHERE id = $1
      `,
      [id]
    )

    return resultado.rowCount > 0
  }
}