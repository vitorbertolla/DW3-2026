import { TimeController } from "./times.controller.js";
import { TimeService } from "./times.service.js";
import { TimeRepository } from "./times.repository.js";
import { EstadoRepository } from "../estados/estados.repository.js";
import {
    buscarTodosSchema,
    buscarPorIdSchema,
    buscarDetalhesSchema,
    buscarTitulosSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./time.schema.js";

export default async function TimeRoutes(server) {
    const repository = new TimeRepository()
    const estadosRepository = new EstadoRepository()
    const service = new TimeService(repository, estadosRepository)
    const controller = new TimeController(service)

    server.get('/times', { schema: buscarTodosSchema }, controller.buscarTodos.bind(controller))
    server.get('/times/:id', { schema: buscarPorIdSchema }, controller.buscarPorId.bind(controller))
    server.get('/times/:id/detalhes', { schema: buscarDetalhesSchema }, controller.buscarDetalhes.bind(controller))
    server.get('/times/:id/titulos', { schema: buscarTitulosSchema }, controller.buscarTitulos.bind(controller))
    server.post('/times', { schema: criarSchema }, controller.criar.bind(controller))
    server.patch('/times/:id', { schema: atualizarSchema }, controller.atualizar.bind(controller))
    server.delete('/times/:id', { schema: deletarSchema }, controller.deletar.bind(controller))
}