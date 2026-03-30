import fastify from "fastify";

const server = fastify({})

server.get("/",  async (request, reply) => {
   reply.send("Nova")
});
// rota que devolve um JSON
server.get("/json",  async (request, reply) => {
   reply.send({nome: "João"})
});
// exemplo de uma rota retornando uma paágina HTML, o type define o tipo de conteúdo da resposta
server.get("/html",  async (request, reply) => {
   reply.type("text/html").send("<h1>Nova rota HTML</h1>")
});

// crud básico por meio de rotas

const tarefas = [
    {id: 1, nome: "Comprar carne", "concluido": "false"},
]
let resumo = {
    "total" : 0,
    "concluido" : 0, 
    "pendentes": 0 
}

server.get("/tarefas", async (request, reply) => {
    const busca = request.query.busca
    const concluido = request.query.concluido

    if (busca !== undefined) {
        if (concluido !== undefined) {
            const resultado = tarefas.filter(t => t.concluido === "concluido" &&
                t.nome.toLowerCase().includes(busca.toLowerCase()))
            return reply.send(resultado)
        } else {
            const resultado = tarefas.filter(t => t.nome.toLowerCase().includes(busca.toLowerCase()))
            return reply.send(resultado)
        }
    }

    if (concluido !== undefined) {
        const resultado = tarefas.filter(t => t.concluido === "concluido")
        return reply.send(resultado)
    }

    return reply.send(tarefas)
})

server.get("/tarefas/resumo", async (request, reply ) => {
    const size = tarefas.length
    const done = tarefas.filter(t => t.concluido === true).length
    const notDone = tarefas.filter(t => t.concluido === false).length
    resumo = {
        "total" : size,
        "concluido" : done, 
        "pendentes": notDone 
    }
    reply.send(resumo)



})

server.post("/tarefas", async (request, reply ) => {
    const novaTarefa = request.body
    novaTarefa.id = tarefas.length + 1
    if(novaTarefa.nome.trim() === ""){
        throw new Error("nome é obrigatório")
    }
    tarefas.push(novaTarefa)
    reply.send(novaTarefa)
})
server.patch("/tarefas/:id", async (request, reply ) => {
    const id =  Number(request.params.id)
    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) {
        reply.status(404).send({error: "Tarefa não encontrada"})
        return
    }
    const { nome } = request.body
    if (nome) {
        tarefa.nome = nome
    }
    reply.send(tarefa)
})
server.patch("/tarefas/:id/concluido", async (request, reply ) => {
    const id =  Number(request.params.id)
    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) {
        reply.status(404).send({error: "Tarefa não encontrada"})
        return
    }
    tarefa.concluido = !tarefa.concluido
    reply.send(tarefa)
})
server.delete("/tarefas/:id", async (request, reply ) => {
    const id =  Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)
    if (index === -1) {
        reply.status(404).send({error: "Tarefa não encontrada"})
        return
    }
    tarefas.splice(index, 1)
    reply.send({message: "Tarefa deletada"})
})

try {
    console.log("Servidor rodando na porta 3000")
    await server.listen({ port: 3000 })
}catch (err){
    server.log.error(err)
    process.exit(1)
}
