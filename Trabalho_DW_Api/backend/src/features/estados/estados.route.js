import { EstadoController } from "./estados.controller.js";
import { EstadoService } from "./estados.service.js";
import { EstadoRepository } from "./estados.repository.js";
import {
    buscarTodosSchema,
    buscarPorIdSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./estados.schema.js";

export default async function EstadoRoutes(server) {
    const repository = new EstadoRepository()
    const service = new EstadoService(repository)
    const controller = new EstadoController(service)

    server.get('/estados', { schema: buscarTodosSchema }, controller.buscarTodos.bind(controller))
    server.get('/estados/:id', { schema: buscarPorIdSchema }, controller.buscarPorId.bind(controller))
    server.post('/estados', { schema: criarSchema }, controller.criar.bind(controller))
    server.patch('/estados/:id', { schema: atualizarSchema }, controller.atualizar.bind(controller))
    server.delete('/estados/:id', { schema: deletarSchema }, controller.deletar.bind(controller))
}