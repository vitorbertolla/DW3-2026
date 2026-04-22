const tarefas = [
  { id: 1, descricao: "Fazer compras", concluido: false },
  { id: 2, descricao: "Lavar o carro", concluido: false },
  { id: 3, descricao: "Estudar Fastify", concluido: true }
]
export class TarefasModel {
    constructor(){
        this.tarefas = [
            { id: 1, descricao: "Fazer compras", concluido: false },
            { id: 2, descricao: "Lavar o carro", concluido: false },
            { id: 3, descricao: "Estudar Fastify", concluido: true }
            ]
    }
    async listarTarefa(busca, concluido) {
            if (busca !== undefined) {
                if (concluido !== undefined) {
                    const resultado = this.tarefas.filter(t => String(t.concluido) === String(concluido) &&
                    t.descricao.toLowerCase().includes(busca.toLowerCase()))
                    return (resultado)
            }   else {
                    const resultado = this.tarefas.filter(t => t.descricao.toLowerCase().includes(busca.toLowerCase()))
                    return (resultado)
            }
        }
        if (concluido !== undefined) {
            const resultado = this.tarefas.filter(t => String(t.concluido) === String(concluido))
            return (resultado)
        }
        return (this.tarefas)
    }
    async resumoTarefa() {
        const total = this.tarefas.length
        const concluidas = this.tarefas.filter(t => t.concluido).length
        const pendentes = total - concluidas

        return ({
        total,
        concluidas,
        pendentes
        })
    }
    async findById(id){
        const tarefa = this.tarefas.find(t => t.id === id)
        if (!tarefa) {
            throw new Error("Tarefa não encontrada")
        }
        return tarefa

    }
    async pendenteTarefa(){
        const resultado = this.tarefas.filter(t => !t.concluido)
        return (resultado)
    }
    async criarTarefa(novaTarefa) {
        if (!novaTarefa.descricao || novaTarefa.descricao.trim() === "") {
            throw new Error("descricao é obrigatório")
        }
        const pendentes = this.tarefas.filter(t => !t.concluido).length
        if (pendentes >= 10) {
            throw new Error("Limite de tarefas pendentes atingido. Conclua ou delete algumas tarefas antes de criar novas.")
        }
        const novoId = this.tarefas.length > 0 ? this.tarefas[this.tarefas.length - 1].id + 1 : 1
        novaTarefa.id = novoId
        novaTarefa.concluido = false
        this.tarefas.push(novaTarefa)
        return (novaTarefa)
    }
    async atualizarTarefa(id, descricao) {
        const index = this.tarefas.findIndex(t => t.id === id)
        if (index === -1) {
            throw new Error("Tarefa não encontrada")
        }
        if (descricao) {
            this.tarefas[index].descricao = descricao
        }else{
            throw new Error("descricao é obrigatório")
        }
        return (this.tarefas[index])
    }
    async concluirTarefa(id) {
        const index = this.tarefas.findIndex(t => t.id === id)
        if (index === -1) {
            throw new Error("Tarefa não encontrada")
        }
        this.tarefas[index].concluido = !this.tarefas[index].concluido
        return (this.tarefas[index])
    }
    async deletarTarefa(id) {
        const index = this.tarefas.findIndex(t => t.id === id)
        if (index === -1) {
            throw new Error("Tarefa não encontrada")
        }
        if (this.tarefas[index].concluido) {
            throw new Error("Não é possível deletar uma tarefa concluída")
        }
        this.tarefas.splice(index, 1)
        return ({message: "Tarefa deletada com sucesso"})
    }
}