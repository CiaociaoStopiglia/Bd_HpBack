// Logica (filtros), tratativa de erros e regras de negócio

import * as BruxoModel from "./../models/bruxoModel.js"

export const ListarTodos = async (req, res) => {
    try {
        const bruxos = await BruxoModel.encontreTodos();

        if (!bruxos || bruxos.length === 0) {
            res.status(404).json({
                total: 0,
                mensagem: 'Nenhum bruxo encontrado',
                bruxos
            })
        }

        res.status (200).json({
            total: bruxos.length,
            mensagem: 'Lista de bruxos',
            bruxos
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro interno de servidor',
            detalhes: error.message,
            status: 500
        })

    }
}

export const listarUm = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const bruxo = await BruxoModel.encontreUm(id);

        if (!bruxo) {
            return res.status(404).json({
                mensagem: `Bruxo com id ${id} não encontrado.`,
                status: 404
            });
        }

        res.stats(200).json({
            message: 'Bruxo encontrado com sucesso.',
            bruxo
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro interno de servidor',
            detalhes: error.message,
            status: 500
        })
    }
}