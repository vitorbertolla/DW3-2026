import { EstadioController } from "./estadios.controller.js";
import { EstadioService } from "./estadios.service.js";
import { EstadioRepository } from "./estadios.repository.js";
import { TimeRepository } from "../times/times.repository.js";
import {
    buscarTodosSchema,
    buscarPorIdSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./estadios.schema.js";

export default async function EstadioRoutes(server) {
    const repostitoryTimes = new TimeRepository()
    const repository = new EstadioRepository()
    const service = new EstadioService(repository, repostitoryTimes)
    const controller = new EstadioController(service)

    server.get('/estadios', { schema: buscarTodosSchema }, controller.buscarTodos.bind(controller))
    server.get('/estadios/:id', { schema: buscarPorIdSchema }, controller.buscarPorId.bind(controller))
    server.post('/estadios', { schema: criarSchema }, controller.criar.bind(controller))
    server.patch('/estadios/:id', { schema: atualizarSchema }, controller.atualizar.bind(controller))
    server.delete('/estadios/:id', { schema: deletarSchema }, controller.deletar.bind(controller))
}