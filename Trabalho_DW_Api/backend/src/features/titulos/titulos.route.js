import { TituloController } from "./titulos.controller.js";
import { TituloService } from "./titulos.service.js";
import { TituloRepository } from "./titulos.repository.js";
import {
    buscarTodosSchema,
    buscarPorIdSchema,
    buscarCampeoesSchema,
    criarSchema,
    atualizarSchema,
    deletarSchema
} from "./titulos.schema.js";

export default async function TituloRoutes(server) {
    const repository = new TituloRepository()
    const service = new TituloService(repository)
    const controller = new TituloController(service)

    server.get('/titulos', { schema: buscarTodosSchema }, controller.buscarTodos.bind(controller))
    server.get('/titulos/:id', { schema: buscarPorIdSchema }, controller.buscarPorId.bind(controller))
    server.get('/titulos/:id/campeoes', { schema: buscarCampeoesSchema }, controller.buscarCampeoes.bind(controller))
    server.post('/titulos', { schema: criarSchema }, controller.criar.bind(controller))
    server.patch('/titulos/:id', { schema: atualizarSchema }, controller.atualizar.bind(controller))
    server.delete('/titulos/:id', { schema: deletarSchema }, controller.deletar.bind(controller))
}