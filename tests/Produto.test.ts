import { ProdutoBuilder } from "./utils/ProdutoBuilder";

describe("Classe Produto", ()=>{
    const nome = "Produto teste"
    const precoOriginal = 100
    const estoque = 5

    describe("Ao criar um produto", ()=>{
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

        test("Deve lançar um erro ao tentar criar produto sem nome", () => {
            const p = () => new ProdutoBuilder()
                .comEstoque(estoque)
                .comPrecoOriginal(precoOriginal)
                .build()

            expect(p).toThrow("Nome não pode ser vazio")
        })

        test("Deve lançar um erro ao tentar criar produto com nome menor que 3", () => {
            const p = () => new ProdutoBuilder()
                .comNome('ab')
                .comEstoque(estoque)
                .comPrecoOriginal(precoOriginal)
                .build()

            expect(p).toThrow("Nome deve ter no mínimo 3 caracteres")
        })
        test("Deve lançar um erro ao tentar criar produto sem preço", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comEstoque(estoque)
                .build()

            expect(p).toThrow("O preço não pode ser vazio")
        })
        test("Deve lançar um erro ao tentar criar produto sem estoque", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comPrecoOriginal(precoOriginal)
                .build()

            expect(p).toThrow("O estoque não pode ser vazio")
        })

        test("Deve lançar um erro ao tentar criar produto com estoque negativo", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comPrecoOriginal(precoOriginal)
                .comEstoque(-2)
                .build()

            expect(p).toThrow("Estoque deve ser positivo")
        })

        test("Deve lançar um erro ao tentar criar produto com estoque 0", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comPrecoOriginal(precoOriginal)
                .comEstoque(0)
                .build()

            expect(p).toThrow("Estoque deve ser positivo")
        })

        test("Deve lançar um erro ao tentar criar produto com precoOriginal negativo", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comPrecoOriginal(-5)
                .comEstoque(estoque)
                .build()

            expect(p).toThrow("Preço deve ser positivo")
        })
        test("Deve lançar um erro ao tentar criar produto com preço 0", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comPrecoOriginal(0)
                .comEstoque(estoque)
                .build()

            expect(p).toThrow("Preço deve ser positivo")
        })
        test("Deve lançar um erro ao tentar criar produto com desconto negativo", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comPrecoOriginal(precoOriginal)
                .comEstoque(estoque)
                .comDesconto(-3)
                .build()

            expect(p).toThrow("Desconto deve ser positivo")
        })

        test("Deve lançar um erro ao tentar criar produto com desconto 0", () => {
            const p = () => new ProdutoBuilder()
                .comNome(nome)
                .comPrecoOriginal(precoOriginal)
                .comEstoque(estoque)
                .comDesconto(0)
                .build()

            expect(p).toThrow("Desconto deve ser positivo")
        })
    });

    describe("Ao mudar o desconto", ()=>{
        test("Deve aplicar o desconto fixo corretamente", () => {
            const p = new ProdutoBuilder()
                .padrao()
                .comPrecoOriginal(precoOriginal)
                .comEstoque(10)
                .build()

            const desconto = 10
            p.desconto = desconto

            expect(p.precoOriginal).toBe(precoOriginal)
            expect(p.precoAtual).toBe(precoOriginal - desconto)
        })
        test("Deve aplicar o desconto percentual corretamente", () => {
            const p = new ProdutoBuilder()
                .padrao()
                .comPrecoOriginal(precoOriginal)
                .comEstoque(5)
                .build()

            const desconto = 0.5
            p.desconto = desconto

            expect(p.precoOriginal).toBe(precoOriginal)
            expect(p.precoAtual).toBe(precoOriginal * (1 - desconto))
        })
        test.todo("Deve lançar um erro ao tentar alterar o valor para negativo")
        test.todo("Deve lançar um erro ao tentar alterar o valor para 0")
    });

    describe("Ao reduzir o estoque", ()=>{
        test.todo("Deve reduzir o estoque corretamente")
        test.todo("Deve lançar um erro ao tentar retirar mais do que o estoque tem")
        test.todo("Deve permitir a retirada da mesma quantidade de itens presente no estoque")
        test.todo("Deve lançar um erro ao tentar retirar um valor negativo")
    });

    describe("Ao aumentar o estoque", ()=>{
        test.todo("Deve aumentar o estoque corretamente")
        test.todo("Deve lançar um erro ao tentar adicionar um valor negativo")
    });

    describe("Ao obter a descriçÃ£o", ()=>{
        test.todo("Deve retornar a descriçÃ£o de um produto com desconto fixo")
        test.todo("Deve retornar a descriçÃ£o de um produto com desconto percentual")
        test.todo("Deve retornar a descriçÃ£o de um produto sem desconto")

    });
});