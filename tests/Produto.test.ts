import { ProdutoBuilder } from "./utils/ProdutoBuilder";

describe("Classe Produto", ()=>{
    describe("Ao criar um produto", ()=>{
        const nome = "Produto teste"
        const precoOriginal = 100
        const estoque = 5
        test("Deve criar um produto válido com todas as propriedades e desconto fixo", () => {
            const desconto = 10
            const p = new ProdutoBuilder()
                .comNome(nome)
                .comEstoque(estoque)
                .comDesconto(desconto)
                .comPrecoOriginal(precoOriginal)
                .build()
            expect(p).toBeDefined()
            expect(p).toMatchObject({nome, estoque, precoOriginal, desconto, precoAtual: precoOriginal - desconto})
        })

        test("Deve criar um produto válido com todas as propriedades e desconto percentual", () => {
            const desconto = 0.5
            const p = new ProdutoBuilder()
                .comNome(nome)
                .comEstoque(estoque)
                .comDesconto(desconto)
                .comPrecoOriginal(precoOriginal)
                .build()
            expect(p).toBeDefined()
            expect(p).toMatchObject({nome, estoque, precoOriginal, desconto, precoAtual: precoOriginal * (1 - desconto)})
        })

        test("Deve criar um produto válido sem desconto", () => {
            const p = new ProdutoBuilder()
                .comNome(nome)
                .comEstoque(estoque)
                .comPrecoOriginal(precoOriginal)
                .build()
            expect(p).toBeDefined()
            expect(p).toMatchObject({nome, estoque, precoOriginal, precoAtual: precoOriginal})
        })

        test.todo("Deve lanÃ§ar um erro ao tentar criar produto sem nome")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto com nome menor que 3")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto sem preÃ§o")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto sem estoque")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto com estoque negativo")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto com estoque 0")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto com precoOriginal negativo")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto com preÃ§o 0")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto com desconto negativo")
        test.todo("Deve lanÃ§ar um erro ao tentar criar produto com desconto 0")
    });

    describe("Ao mudar o desconto", ()=>{
        test.todo("Deve aplicar o desconto fixo corretamente")
        test.todo("Deve aplicar o desconto percentual corretamente")
        test.todo("Deve lanÃ§ar um erro ao tentar alterar o valor para negativo")
        test.todo("Deve lanÃ§ar um erro ao tentar alterar o valor para 0")
    });

    describe("Ao reduzir o estoque", ()=>{
        test.todo("Deve reduzir o estoque corretamente")
        test.todo("Deve lanÃ§ar um erro ao tentar retirar mais do que o estoque tem")
        test.todo("Deve permitir a retirada da mesma quantidade de itens presente no estoque")
        test.todo("Deve lanÃ§ar um erro ao tentar retirar um valor negativo")
    });

    describe("Ao aumentar o estoque", ()=>{
        test.todo("Deve aumentar o estoque corretamente")
        test.todo("Deve lanÃ§ar um erro ao tentar adicionar um valor negativo")
    });

    describe("Ao obter a descriÃ§Ã£o", ()=>{
        test.todo("Deve retornar a descriÃ§Ã£o de um produto com desconto fixo")
        test.todo("Deve retornar a descriÃ§Ã£o de um produto com desconto percentual")
        test.todo("Deve retornar a descriÃ§Ã£o de um produto sem desconto")

    });
});