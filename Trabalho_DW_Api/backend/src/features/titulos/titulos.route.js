import { TituloController } from "./titulos.controller.js";
import { TituloService } from "./titulos.service.js";
import { TituloRepository } from "./titulos.repository.js";

export default async function TituloRoutes(server) {
    const repository = new TituloRepository()
    const service = new TituloService(repository)
    const controller = new TituloController(service)

    server.get('/titulos', controller.buscarTodos.bind(controller))
    server.get('/titulos/:id', controller.buscarPorId.bind(controller))
    server.post('/titulos', controller.criar.bind(controller))
    server.patch('/titulos/:id', controller.atualizar.bind(controller))
    server.delete('/titulos/:id', controller.deletar.bind(controller))
}