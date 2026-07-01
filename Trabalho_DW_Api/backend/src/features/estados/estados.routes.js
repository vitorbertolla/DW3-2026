import { EstadosController } from "./estados.controller.js";
import { EstadosService } from "./estados.service.js";
import { EstadosRepository } from "./estados.repository.js";

export default async function EstadosRoutes(server) {
    const repository = new EstadosRepository()
    const service = new EstadosService(repository)
    const controller = new EstadosController(service)

    server.get('/estados', controller.buscarTodos.bind(controller))
    server.get('/estados/:id', controller.buscarPorId.bind(controller))
    server.post('/estados', controller.criar.bind(controller))
    server.patch('/estados/:id', controller.atualizar.bind(controller))
    server.delete('/estados/:id', controller.deletar.bind(controller))
}