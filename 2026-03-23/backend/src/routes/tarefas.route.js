export function tarefasRoutes(server){

    const tarefas = [
        {id: 1, descricao: "Comprar carne", "concluido": "false"},
    ]
    let resumo = {
        "total" : 0,
        "concluido" : 0, 
        "pendentes": 0 
    }
    server.get("/", async (request, reply) => {
        const busca = request.query.busca
        const concluido = request.query.concluido

        if (busca !== undefined) {
            if (concluido !== undefined) {
                const resultado = tarefas.filter(t => String(t.concluido) === String(concluido) &&
                    t.descricao.toLowerCase().includes(busca.toLowerCase()))
                return reply.send(resultado)
            } else {
                const resultado = tarefas.filter(t => t.descricao.toLowerCase().includes(busca.toLowerCase()))
                return reply.send(resultado)
            }
        }

        if (concluido !== undefined) {
            const resultado = tarefas.filter(t => String(t.concluido) === String(concluido))
            return reply.send(resultado)
        }

        return reply.send(tarefas)
    })

    server.get("/resumo", async (request, reply ) => {
        const size = tarefas.length
        const done = tarefas.filter(t => t.concluido === true).length
        const notDone = tarefas.filter(t => t.concluido === false).length
        resumo = {
            "total" : size,
            "concluidas" : done, 
            "pendentes": notDone 
        }
        reply.send(resumo)



    })

    server.post("/", async (request, reply ) => {
        const novaTarefa = request.body
        novaTarefa.id = tarefas.length + 1
        novaTarefa.concluido = false
        if(novaTarefa.descricao.trim() === ""){
            throw new Error("descricao é obrigatório")
        }
        tarefas.push(novaTarefa)
        reply.send(novaTarefa)
    })
    server.patch("/:id", async (request, reply ) => {
        const id =  Number(request.params.id)
        const tarefa = tarefas.find(t => t.id === id)
        if (!tarefa) {
            reply.status(404).send({error: "Tarefa não encontrada"})
            return
        }
        const { descricao } = request.body
        if (descricao) {
            tarefa.descricao = descricao
        }
        reply.send(tarefa)
    })
    server.patch("/:id/concluir", async (request, reply ) => {
        const id =  Number(request.params.id)
        const tarefa = tarefas.find(t => t.id === id)
        if (!tarefa) {
            reply.status(404).send({error: "Tarefa não encontrada"})
            return
        }
        tarefa.concluido = !tarefa.concluido
        reply.send(tarefa)
    })
    server.delete("/:id", async (request, reply ) => {
        const id =  Number(request.params.id)
        const index = tarefas.findIndex(t => t.id === id)
        if (index === -1) {
            reply.status(404).send({error: "Tarefa não encontrada"})
            return
        }
        tarefas.splice(index, 1)
        reply.send({message: "Tarefa deletada"})
    })

}