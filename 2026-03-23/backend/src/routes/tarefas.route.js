import { TarefasController } from "../controllers/tarefas.controller.js"
const controller = new TarefasController()

export function tarefasRoutes(server){

    server.get("/", async (request, reply) => await controller.listarTarefa(request, reply))
    server.get("/resumo", async (request, reply) => await controller.resumoTarefa(request, reply))
    server.get("/pendente", async (request, reply) => await controller.pendenteTarefa(request, reply))
    server.post("/", async (request, reply) => await controller.criarTarefa(request, reply))
    server.patch("/:id", async (request, reply) => await controller.atualizarTarefa(request, reply))
    server.patch("/:id/concluir", async (request, reply) => await controller.concluirTarefa(request, reply))
    server.delete("/:id", async (request, reply) => await controller.deletarTarefa(request, reply))
}
