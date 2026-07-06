import { TimeController } from "./times.controller.js";
import { TimeService } from "./times.service.js";
import { TimeRepository } from "./times.repository.js";
import { EstadoRepository } from "../estados/estados.repository.js";

export default async function TimeRoutes(server) {
    const repository = new TimeRepository()
    const estadosRepository = new EstadoRepository()
    const service = new TimeService(repository, estadosRepository)
    const controller = new TimeController(service)

    server.get('/times', controller.buscarTodos.bind(controller))
    server.get('/times/:id', controller.buscarPorId.bind(controller))
    server.post('/times', controller.criar.bind(controller))
    server.patch('/times/:id', controller.atualizar.bind(controller))
    server.delete('/times/:id', controller.deletar.bind(controller))
}