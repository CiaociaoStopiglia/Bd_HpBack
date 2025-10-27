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

export const criar = async (req, res) => {
    try {
        const { nome, casa, idade, patrono, varinha } = req.body;

        const dado = { nome, casa, patrono, varinha, idade };

        // Validação 
        const camposObrigatorios = ['nome', 'casa', 'varinha', 'idade'];

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);

        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
            });
        }

        // Validar se a casa é valida
        const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        if (!casasValidas.includes(casa)) {
            return res.status(400).json({
                erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
                casasValidas
            });
        }

        // Eu crio o bruxo usando o Model
        const novoBruxo = await BruxoModel.criar(req.body)

        res.status(201).json({
            mensagem: 'Bruxo criado com sucesso!',
            bruxo: novoBruxo
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar bruxo',
            detalhes: error.message
        })
    }
}

export const deletar = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const bruxoExiste = await bruxoModel.encontreUm(id);

        if(!bruxoExiste) {
            return res.status(404).json({
                erro: "Bruxo não encontrado com esse ID",
                id: id 
            })
        }
        await bruxoModel.deletar(id);

        res.status(200).json({
            mensagem: "Bruxo deletado com sucesso",
            bruxoRemovido: BruxoExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar o bruxo',
            detalhes: error.message,
        })
    }
}
    
export const atualizar = async (req, res) => {
    try {

        const id = parseInt(req.params.id);
        const dados = req.body;

        const bruxoExiste = await BruxoModel.encontreUm(id);

        if (!bruxoExiste) {
            return res.status(404).json({
                erro: "Bruxo não encontrado com esse ID",
                id: id
            })
    }

    const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        if (!casasValidas.includes(dados.casa)) {
            return res.status(400).json({
                erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
                casasValidas
            });
        }

        const bruxoAtualizado = await BruxoModel.atualizar(id, dados);

        res.status(200).json({
            mensagem: "Bruxo atualizado com sucesso",
            bruxo: bruxoAtualizado
        })

} catch (error) {
    res.status(500).json({
            erro: 'Erro ao atualizar o bruxo',
            detalhes: error.message,
        })
    }
}