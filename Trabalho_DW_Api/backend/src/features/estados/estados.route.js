import { EstadoController } from "./estados.controller.js";
import { EstadoService } from "./estados.service.js";
import { EstadoRepository } from "./estados.repository.js";

export default async function EstadoRoutes(server) {
    const repository = new EstadoRepository()
    const service = new EstadoService(repository)
    const controller = new EstadoController(service)

    server.get('/estados', controller.buscarTodos.bind(controller))
    server.get('/estados/:id', controller.buscarPorId.bind(controller))
    server.post('/estados', controller.criar.bind(controller))
    server.patch('/estados/:id', controller.atualizar.bind(controller))
    server.delete('/estados/:id', controller.deletar.bind(controller))
}