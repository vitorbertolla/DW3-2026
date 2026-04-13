const tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true }
]
export class TarefasModel {
    async listarTarefa(busca, concluido) {
            if (busca !== undefined) {
                if (concluido !== undefined) {
                    const resultado = tarefas.filter(t => String(t.concluido) === String(concluido) &&
                    t.descricao.toLowerCase().includes(busca.toLowerCase()))
                    return (resultado)
            }   else {
                    const resultado = tarefas.filter(t => t.descricao.toLowerCase().includes(busca.toLowerCase()))
                    return (resultado)
            }
        }
        if (concluido !== undefined) {
            const resultado = tarefas.filter(t => String(t.concluido) === String(concluido))
            return (resultado)
        }
        return (tarefas)
    }
    async resumoTarefa() {
        const total = tarefas.length
        const concluidas = tarefas.filter(t => t.concluido).length
        const pendentes = total - concluidas

        return ({
        total,
        concluidas,
        pendentes
        })
    }
    async pendenteTarefa(){
        const resultado = tarefas.filter(t => !t.concluido)
        return (resultado)
    }
    async criarTarefa(novaTarefa) {
        if (!novaTarefa.descricao || novaTarefa.descricao.trim() === "") {
            throw new Error("descricao é obrigatório")
        }
        const novoId = tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1
        novaTarefa.id = novoId
        novaTarefa.concluido = false
        tarefas.push(novaTarefa)
        return (novaTarefa)
    }
    async atualizarTarefa(id, descricao) {
        const index = tarefas.findIndex(t => t.id === id)
        if (index === -1) {
            throw new Error("Tarefa não encontrada")
        }
        if (descricao) {
            tarefas[index].descricao = descricao
        }else{
            throw new Error("descricao é obrigatório")
        }
        return (tarefas[index])
    }
    async concluirTarefa(id) {
        const index = tarefas.findIndex(t => t.id === id)
        if (index === -1) {
            throw new Error("Tarefa não encontrada")
        }
        tarefas[index].concluido = !tarefas[index].concluido
        return (tarefas[index])
    }
    async deletarTarefa(id) {
        const index = tarefas.findIndex(t => t.id === id)
        if (index === -1) {
            throw new Error("Tarefa não encontrada")
        }
        tarefas.splice(index, 1)
        return ({message: "Tarefa deletada com sucesso"})
    }
}