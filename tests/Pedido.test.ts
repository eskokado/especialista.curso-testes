import {Pedido} from "../src/Pedido";
import {ProdutoBuilder} from "./utils/ProdutoBuilder";

describe("Classe Pedido", ()=>{
    const id = 1
    const estoque = 10
    describe("Ao criar pedido",()=>{
        test("Deve criar um pedido válido", () => {
            const pedido = new Pedido(id)
            expect(pedido).toMatchObject({id, finalizado: false, produtos: []})
        })
        test("Não deve criar um pedido com id negativo", () => {
            const criacao = () => new Pedido(-200)
            expect(criacao).toThrow("O id deve ser maior que 0");
        })
    });
    describe("Ao adicionar produtos ao pedido",()=>{
        test("Deve adicionar um produto válido ao pedido", () => {
            const produto = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            const pedido = new Pedido(id)
            const quantidade = 2
            pedido.adicionarProduto(produto, quantidade)

            expect(pedido.produtos).toEqual([{produto, quantidade}])
        })

        test("Deve lançar um erro ao adicionar um produto com estoque insuficiente", () => {
            const produto = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            const pedido = new Pedido(id)
            const quantidade = 15
            const criacao = () => pedido.adicionarProduto(produto, quantidade)

            expect(criacao).toThrow(`Estoque insuficiente para ${produto.nome}`)
        })

        test("Deve reduzir o estoque do pedido", () => {
            const produto = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            const pedido = new Pedido(id)
            const quantidade = 5
            pedido.adicionarProduto(produto, quantidade)

            expect(produto.estoque).toBe(5)
        })

        test("Deve lançar um erro ao tentar adicionar produto em um pedido finalizado", () => {
            const produto = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            const pedido = new Pedido(id)
            const quantidade = 5
            pedido.finalizarPedido()
            const criação = () => pedido.adicionarProduto(produto, quantidade)

            expect(criação).toThrow('Pedido já finalizado!')

        })
    });

    describe("Ao executar remover produtos do pedido",()=>{
        let pedido: Pedido
        beforeEach(() => {
            pedido = new Pedido(id)
        })

        test("Deve deletar um produto válido", () => {
            const qtde = 5
            const p = new ProdutoBuilder().padrao().comEstoque(qtde).build()
            pedido.adicionarProduto(p, qtde)
            pedido.removerProduto(p, qtde)
            expect(pedido.produtos).toEqual([])
        })

        test("Deve retirar o produto do carrinho se tentar deletar uma quantidade maior do que o adicionado", () => {
            const qtde = 5
            const p = new ProdutoBuilder().padrao().comEstoque(qtde).build()
            pedido.adicionarProduto(p, qtde)
            pedido.removerProduto(p, qtde + 2)
            expect(pedido.produtos).toEqual([])
        })

        test("Não deve gerar erros ao tentar deletar um produto que não esteja no pedido", () => {
            const qtde = 5
            const p = new ProdutoBuilder().padrao().comEstoque(qtde).build()
            const result = () => pedido.removerProduto(p, qtde)
            expect(result).not.toThrow()
        })

        test("Deve atualizar o estoque do produto ao remover produto do pedido", () => {
            const estoque = 5
            const qtde = 2
            const p = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            pedido.adicionarProduto(p, qtde)
            pedido.removerProduto(p, qtde)
            expect(p.estoque).toEqual(estoque)
        })

        test("Deve atualizar o estoque do produto ao deletar uma quantidade mais de produto do pedido", () => {
            const estoque = 5
            const qtde = 2
            const p = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            pedido.adicionarProduto(p, qtde)
            pedido.removerProduto(p, qtde + 1)
            expect(p.estoque).toEqual(estoque)
        })

        test("Deve remover apenas a quantidade indicada", () => {
            const estoque = 5
            const qtde = 2
            const p = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            pedido.adicionarProduto(p, qtde)
            pedido.removerProduto(p, qtde)
            expect(p.estoque).toEqual(estoque)
        })

        test("Deve lançar um erro ao tentar remover produto em um pedido finalizado", () => {
            const estoque = 5
            const qtde = 2
            const p = new ProdutoBuilder().padrao().comEstoque(estoque).build()
            pedido.finalizarPedido()
            const result = () => pedido.removerProduto(p, qtde)
            expect(result).toThrow('Pedido já finalizado!')

        })
    });

    describe("Ao exibir o valor total",()=>{
        test("Deve exibir o valor total do pedido", () => {
            const pedido = new Pedido(id)
            const p1 = new ProdutoBuilder().padrao().comEstoque(5).build()
            const p2 = new ProdutoBuilder().padrao().comEstoque(5).comDesconto(0.1).build()
            const qtde = 2
            pedido.adicionarProduto(p1, qtde)
            pedido.adicionarProduto(p2, qtde)
            const total = qtde*p1.precoAtual + qtde*p2.precoAtual
            expect(pedido.total).toBe(total)
        })

        test("Deve exibir o valor total do pedido quanto o pedido não tiver nenhum item", () => {
            const pedido = new Pedido(id)
            expect(pedido.total).toBe(0)
        })
    })

    describe("Ao finalizar o pedido", ()=>{
        test.todo("Deve finalizar o pedido com produtos")
        test.todo("Deve lanÃ§ar um erro ao tentar finalizar um pedido sem produtos")
        test.todo("NÃ£o deve permitir que um pedido finalizado volte a ficar nÃ£o finalizado")
        test.todo("NÃ£o deve causar nenhum problema ao tentar finalizar um teste jÃ¡ finalizado")
    });

    describe("Ao exibir o resumo", ()=>{
        test.todo("Deve exibir o resumo de um pedido finalizado")
        test.todo("Deve exibir o resumo de um pedido em andamento")
        test.todo("Deve exibir o resumo de um pedido em andamento com o carrinho vazio")
    });
});