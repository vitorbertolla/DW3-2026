// Schema base de retorno de um Time
const TimeSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Corinthians' },
        fundacao: { type: 'string', format: 'date', example: '1910-09-01' },
        estado_id: { type: 'integer', example: 3 }
    }
}

const ErrorSchema = {
    type: 'object',
    properties: {
        status: { type: 'string', example: 'error' },
        message: { type: 'string', example: 'Time não encontrado' }
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
    tags: ['Times'],
    summary: 'Lista todos os times',
    response: {
        200: { type: 'array', items: TimeSchema },
        400: ErrorSchema
    }
}

export const buscarPorIdSchema = {
    tags: ['Times'],
    summary: 'Busca um time pelo ID',
    params: ParamsId,
    response: {
        200: TimeSchema,
        404: ErrorSchema
    }
}

export const buscarDetalhesSchema = {
    tags: ['Times'],
    summary: 'Busca detalhes de um time (com estado, estádio e total de títulos)',
    params: ParamsId,
    response: {
        200: {
            type: 'object',
            properties: {
                nome: { type: 'string', example: 'Corinthians' },
                fundacao: { type: 'string', format: 'date', example: '1910-09-01' },
                estado: { type: 'string', example: 'São Paulo' },
                estadio: { type: 'string', example: 'Neo Química Arena' },
                capacidade: { type: 'integer', example: 49205 },
                total_titulos: { type: 'string', example: '5' }
            }
        },
        404: ErrorSchema
    }
}

export const buscarTitulosSchema = {
    tags: ['Times'],
    summary: 'Busca os títulos conquistados por um time',
    params: ParamsId,
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 1 },
                    nome: { type: 'string', example: 'Corinthians' },
                    estado: { type: 'string', example: 'São Paulo' },
                    titulos: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                titulo: { type: 'string', example: 'Brasileirão' },
                                ano: { type: 'integer', example: 2023 }
                            }
                        }
                    }
                }
            }
        },
        404: ErrorSchema
    }
}
export const criarSchema = {
    tags: ['Times'],
    summary: 'Cria um novo time',
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Corinthians' },
            fundacao: { type: 'string', format: 'date', example: '1910-09-01' },
            estado_id: { type: 'integer', example: 3 }
        },
        required: ['nome', 'estado_id']
    },
    response: {
        201: TimeSchema,
        400: ErrorSchema
    }
}

export const atualizarSchema = {
    tags: ['Times'],
    summary: 'Atualiza um time existente',
    params: ParamsId,
    body: {
        type: 'object',
        properties: {
            nome: { type: 'string', example: 'Corinthians' },
            fundacao: { type: 'string', format: 'date', example: '1910-09-01' },
            estado_id: { type: 'integer', example: 3 }
        }
    },
    response: {
        200: TimeSchema,
        404: ErrorSchema
    }
}

export const deletarSchema = {
    tags: ['Times'],
    summary: 'Remove um time',
    params: ParamsId,
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'success' },
                message: { type: 'string', example: 'Time removido com sucesso' }
            }
        },
        404: ErrorSchema
    }
}