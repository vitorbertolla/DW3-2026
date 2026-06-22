import Fastify from 'fastify'
import cors from '@fastify/cors'
// import { AppError } from './src/errors/AppError.js'
import pool from './src/database/pool.js'

const server = Fastify({ logger: true })

await server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// server.setErrorHandler((error, request, reply) => {
//   if (error instanceof AppError) {
//     return reply.status(error.statusCode).send({
//       status: 'error',
//       message: error.message
//     })
//   }

//   console.error('🔥 ERRO INTERNO:', error)

//   return reply.status(500).send({
//     status: 'error',
//     message: 'Internal Server Error'
//   })
// })

const start = async () => {
  try {
      await pool.connect()
      console.log('Conectado ao PostgreSQL com sucesso')
      await server.listen({ port: 3000 })
      console.log('Servidor rodando na porta 3000')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()