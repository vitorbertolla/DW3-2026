import fastify from "fastify";
import cors from "@fastify/cors"
import { tarefasRoutes } from "./src/routes/tarefas.route.js";

const server = fastify({})
    
server.register(cors, {
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
})

// aqui registramos as rotas do nosso servidor, passando o prefixo "/tarefas" para todas as rotas definidas em tarefasRoutes, assim não precisamos repetir em cada rota
server.register(tarefasRoutes, {prefix: "/tarefas"})

server.setNotFoundHandler((request, reply) => {
    reply.status(404).send({error: "Rota não encontrada"})
})
try {
    console.log("Servidor rodando na porta 3000")
    await server.listen({ port: 3000 })
}catch (err){
    server.log.error(err)
    process.exit(1)
}
