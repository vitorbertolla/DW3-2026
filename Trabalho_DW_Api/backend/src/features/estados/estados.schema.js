const EstadoSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'São Paulo' },
        sigla: { type: 'string', example: 'SP' }
    }
}

const ErrorSchema = {
    type: 'object',
    properties: {
        status: { type: 'string', example: 'error' },
        message: { type: 'string', example: 'Estado não encontrado' }
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
    tags: ['Estados'],
    summary: 'Lista todos os estados',
    response: {
        200: { type: 'array', items: EstadoSchema },
        400: ErrorSchema
    }
}

export const buscarPorIdSchema = {
    tags: ['Estados'],
    summary: 'Busca um estado pelo ID',
    params: ParamsId,
    response: {
        200: EstadoSchema,
        404: ErrorSchema
    }
}

export const criarSchema = {
    tags: ['Estados'],
    summary: 'Cria um novo estado',
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'São Paulo' },
            sigla: { type: 'string', example: 'SP', minLength: 2, maxLength: 2 }
        },
        required: ['nome', 'sigla']
    },
    response: {
        201: EstadoSchema,
        400: ErrorSchema
    }
}

export const atualizarSchema = {
    tags: ['Estados'],
    summary: 'Atualiza um estado existente',
    params: ParamsId,
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'São Paulo' },
            sigla: { type: 'string', example: 'SP', minLength: 2, maxLength: 2 }
        }
    },
    response: {
        200: EstadoSchema,
        404: ErrorSchema
    }
}

export const deletarSchema = {
    tags: ['Estados'],
    summary: 'Remove um estado',
    params: ParamsId,
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'success' },
                message: { type: 'string', example: 'Estado removido com sucesso' }
            }
        },
        404: ErrorSchema
    }
}