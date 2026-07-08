const TimeHasTituloSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', example: 1 },
        time_id: { type: 'integer', example: 3 },
        titulo_id: { type: 'integer', example: 2 },
        ano: { type: 'integer', example: 2023 }
    }
}

const ErrorSchema = {
    type: 'object',
    properties: {
        status: { type: 'string', example: 'error' },
        message: { type: 'string', example: 'Registro não encontrado' }
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
    tags: ['Time-Titulos'],
    summary: 'Lista todos os vínculos time/título',
    response: {
        200: { type: 'array', items: TimeHasTituloSchema },
        400: ErrorSchema
    }
}

export const buscarPorIdSchema = {
    tags: ['Time-Titulos'],
    summary: 'Busca um vínculo time/título pelo ID',
    params: ParamsId,
    response: {
        200: TimeHasTituloSchema,
        404: ErrorSchema
    }
}

export const criarSchema = {
    tags: ['Time-Titulos'],
    summary: 'Cria um novo vínculo entre time e título',
    body: {
        type: 'object',
        properties: {
            time_id: { type: 'integer', example: 3 },
            titulo_id: { type: 'integer', example: 2 },
            ano: { type: 'integer', example: 2023 }
        },
        required: ['time_id', 'titulo_id', 'ano']
    },
    response: {
        201: TimeHasTituloSchema,
        400: ErrorSchema
    }
}

export const atualizarSchema = {
    tags: ['Time-Titulos'],
    summary: 'Atualiza um vínculo time/título existente',
    params: ParamsId,
    body: {
        type: 'object',
        properties: {
            time_id: { type: 'integer', example: 3 },
            titulo_id: { type: 'integer', example: 2 },
            ano: { type: 'integer', example: 2023 }
        }
    },
    response: {
        200: TimeHasTituloSchema,
        404: ErrorSchema
    }
}

export const deletarSchema = {
    tags: ['Time-Titulos'],
    summary: 'Remove um vínculo time/título',
    params: ParamsId,
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'success' },
                message: { type: 'string', example: 'Registro removido com sucesso' }
            }
        },
        404: ErrorSchema
    }
}