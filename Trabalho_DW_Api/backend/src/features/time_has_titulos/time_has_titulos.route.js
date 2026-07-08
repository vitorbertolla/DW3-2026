import { TimeHasTituloController } from "./time_has_titulos.controller.js";
import { TimeHasTituloService } from "./time_has_titulos.service.js";
import { TimeHasTituloRepository } from "./time_has_titulos.repository.js";
import {
    buscarTodosSchema,
    buscarPorIdSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./time_has_titulos.schema.js";

export default async function TimeHasTituloRoutes(server) {
    const repository = new TimeHasTituloRepository()
    const service = new TimeHasTituloService(repository)
    const controller = new TimeHasTituloController(service)

    server.get('/time-has-titulos', { schema: buscarTodosSchema }, controller.buscarTodos.bind(controller))
    server.get('/time-has-titulos/:id', { schema: buscarPorIdSchema }, controller.buscarPorId.bind(controller))
    server.post('/time-has-titulos', { schema: criarSchema }, controller.criar.bind(controller))
    server.patch('/time-has-titulos/:id', { schema: atualizarSchema }, controller.atualizar.bind(controller))
    server.delete('/time-has-titulos/:id', { schema: deletarSchema }, controller.deletar.bind(controller))
}