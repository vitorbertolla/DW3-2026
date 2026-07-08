const TituloSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Brasileirão' }
    }
}

const ErrorSchema = {
    type: 'object',
    properties: {
        status: { type: 'string', example: 'error' },
        message: { type: 'string', example: 'Título não encontrado' }
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
    tags: ['Títulos'],
    summary: 'Lista todos os títulos',
    response: {
        200: { type: 'array', items: TituloSchema },
        400: ErrorSchema
    }
}

export const buscarPorIdSchema = {
    tags: ['Títulos'],
    summary: 'Busca um título pelo ID',
    params: ParamsId,
    response: {
        200: TituloSchema,
        404: ErrorSchema
    }
}

export const buscarCampeoesSchema = {
    tags: ['Títulos'],
    summary: 'Busca os times campeões de um título, com os anos de conquista',
    params: ParamsId,
    response: {
        200: {
            type: 'object',
            properties: {
                titulo: { type: 'string', example: 'Brasileirão' },
                campeoes: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            time: { type: 'string', example: 'Corinthians' },
                            ano: { type: 'integer', example: 2023 }
                        }
                    }
                }
            }
        },
        404: ErrorSchema
    }
}

export const criarSchema = {
    tags: ['Títulos'],
    summary: 'Cria um novo título',
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Brasileirão' }
        },
        required: ['nome']
    },
    response: {
        201: TituloSchema,
        400: ErrorSchema
    }
}

export const atualizarSchema = {
    tags: ['Títulos'],
    summary: 'Atualiza um título existente',
    params: ParamsId,
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Brasileirão' }
        }
    },
    response: {
        200: TituloSchema,
        404: ErrorSchema
    }
}

export const deletarSchema = {
    tags: ['Títulos'],
    summary: 'Remove um título',
    params: ParamsId,
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'success' },
                message: { type: 'string', example: 'Título removido com sucesso' }
            }
        },
        404: ErrorSchema
    }
}