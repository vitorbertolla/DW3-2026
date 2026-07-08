const EstadioSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Neo Química Arena' },
        capacidade: { type: 'integer', example: 49205 },
        time_id: { type: 'integer', example: 3 }
    }
}

const ErrorSchema = {
    type: 'object',
    properties: {
        status: { type: 'string', example: 'error' },
        message: { type: 'string', example: 'Estádio não encontrado' }
    }
}

const ParamsId = {
    type: 'object',
    properties: {
        id: { type: 'integer' }
    },
    required: ['id']
}

export const buscarTodosSchema = {
    tags: ['Estádios'],
    summary: 'Lista todos os estádios',
    response: {
        200: { type: 'array', items: EstadioSchema },
        400: ErrorSchema
    }
}

export const buscarPorIdSchema = {
    tags: ['Estádios'],
    summary: 'Busca um estádio pelo ID',
    params: ParamsId,
    response: {
        200: EstadioSchema,
        404: ErrorSchema
    }
}

export const criarSchema = {
    tags: ['Estádios'],
    summary: 'Cria um novo estádio',
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Neo Química Arena' },
            capacidade: { type: 'integer', example: 49205 },
            time_id: { type: 'integer', example: 3 }
        },
        required: ['nome', 'time_id']
    },
    response: {
        201: EstadioSchema,
        400: ErrorSchema
    }
}

export const atualizarSchema = {
    tags: ['Estádios'],
    summary: 'Atualiza um estádio existente',
    params: ParamsId,
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Neo Química Arena' },
            capacidade: { type: 'integer', example: 49205 },
            time_id: { type: 'integer', example: 3 }
        }
    },
    response: {
        200: EstadioSchema,
        404: ErrorSchema
    }
}

export const deletarSchema = {
    tags: ['Estádios'],
    summary: 'Remove um estádio',
    params: ParamsId,
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'success' },
                message: { type: 'string', example: 'Estádio removido com sucesso' }
            }
        },
        404: ErrorSchema
    }
}