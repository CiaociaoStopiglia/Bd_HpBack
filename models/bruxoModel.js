// é no model que fazemos a consulta para o banco de dados
//ex: SELECT * FROM bruxos; porém no prisma vamos usar comandos
// que abstrai a query -> mas ainda sim é query para o BD

//importar o prismaClient
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Criar exportando a variavel -> FindAll que vai ser o SELECT * FROM bruxos;
export const encontreTodos = async () => {
    // SELECT * FROM bruxos;
    return await prisma.bruxo.findMany({
        orderBy: { nome : 'asc' }
    });
}

export const encontreUm = async (id) => {
    // SELECT * FROM bruxos WHERE id = 1;
    return await prisma.bruxo.findUnique({
        where : { id: Number(id) }
});
}

export const criar = async (dado) => {
    return await prisma.bruxo.create({
        dado: {
            nome: dado.nome, 
            casa: dado.casa,
            idade: dado.idade,
            patrono: dado.patrono,
            varinha: dado.varinha,
        }
    })
}

export const deletar = async (id) => {
    return await Prisma.bruxo.delete({
        where: { id: Number(id) }
    })
}

export const atualizar = async (id, dado) => {
    return await prisma.bruxo.update({
        where: { id: Number(id) },
        data: {
            ...(dado.nome && { nome: dado.nome }),
            ...(dado.casa && { casa: dado.casa }),
            ...(dado.idade && { idade: dado.idade }),
            ...(dado.patrono && { patrono: dado.patrono }),
            ...(dado.varinha && { varinha: dado.varinha }),
        }
    })
}