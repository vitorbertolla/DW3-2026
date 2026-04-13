import { TarefasController } from "../controllers/tarefas.controller.js"
const controller = new TarefasController()

export function tarefasRoutes(server){

    server.get("/", controller.listarTarefa)
    server.get("/resumo", controller.resumoTarefa)
    server.get("/pendente", controller.pendenteTarefa)
    server.post("/", controller.criarTarefa)
    server.patch("/:id", controller.atualizarTarefa)
    server.patch("/:id/concluir", controller.concluirTarefa)
    server.delete("/:id", controller.deletarTarefa)
}
