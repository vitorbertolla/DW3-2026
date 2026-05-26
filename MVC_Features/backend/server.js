import Fastify from 'fastify'
import cors from '@fastify/cors'

import tarefaRoutes from './src/features/tarefas/tarefas.route.js'
import { AppError } from './src/errors/AppError.js'

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

const start = async () => {
  try {
    await server.listen({ port: 3000 })
    console.log('Servidor rodando na porta 3000')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()