import { EstadioController } from "./estadios.controller.js";
import { EstadioService } from "./estadios.service.js";
import { EstadioRepository } from "./estadios.repository.js";
import { TimeRepository } from "../times/times.repository.js";

export default async function EstadioRoutes(server) {
    const repostitoryTimes = new TimeRepository()
    const repository = new EstadioRepository()
    const service = new EstadioService(repository, repostitoryTimes)
    const controller = new EstadioController(service)

    server.get('/estadios', controller.buscarTodos.bind(controller))
    server.get('/estadios/:id', controller.buscarPorId.bind(controller))
    server.post('/estadios', controller.criar.bind(controller))
    server.patch('/estadios/:id', controller.atualizar.bind(controller))
    server.delete('/estadios/:id', controller.deletar.bind(controller))
}