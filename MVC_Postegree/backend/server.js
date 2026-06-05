import Fastify from 'fastify'
import cors from '@fastify/cors'
import tarefaRoutes from './src/features/tarefas/tarefas.route.js'
import { AppError } from './src/errors/AppError.js'
import client from './src/database/client.js'

const server = Fastify({ logger: true })

await server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

server.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message
    })
  }

  console.error('🔥 ERRO INTERNO:', error)

  return reply.status(500).send({
    status: 'error',
    message: 'Internal Server Error'
  })
})

server.register(tarefaRoutes)
server.get('/laboratorio/tarefas-db', async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})
server.get('/laboratorio/tarefas-db/concluido', async (request, reply) => {
  const resultado = await client.query(`
    SELECT *
    from tarefas
    where concluido = true
    order by id
  `)

  return reply.send(resultado.rows)
})
server.post('/laboratorio/tarefas-db', async (request, reply) => {
  const { descricao, concluido } = request.body

  if (!descricao || descricao.trim() === '') {
    return reply.status(400).send({
      status: 'error',
      message: 'A descrição da tarefa é obrigatória'
    })
  }

  const resultado = await client.query(
    `
      INSERT INTO tarefas (descricao, concluido)
      VALUES ($1, $2)
      RETURNING id, descricao, concluido, criada_em
    `,
    [descricao.trim(), concluido]
  )

  return reply.status(201).send(resultado.rows[0])
})

const start = async () => {
  try {
      await client.connect()
      console.log('Conectado ao PostgreSQL com sucesso')
      await server.listen({ port: 3000 })
      console.log('Servidor rodando na porta 3000')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()