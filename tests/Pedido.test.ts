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

    describe("Ao deletar produtos do pedido",()=>{
        test.todo("Deve deletar um produto vÃ¡lido")
        test.todo("Deve retirar o produto do carrinho se tentar deletar uma quantidade maior do que o adicionado")
        test.todo("NÃ£o deve gerar erros ao tentar deletar um produto que nÃ£o esteja no pedido")
        test.todo("Deve atualizar o estoque do produto ao deletar produto do pedido")
        test.todo("Deve atualizar o estoque do produto ao deletar uma quantidade mais de produto do pedido")
        test.todo("Deve deletar apenas a quantidade indicada")
        test.todo("Deve lanÃ§ar um erro ao tentar remover produto em um pedido finalizado")
    });

    describe("Ao exibir o valor total",()=>{
        test.todo("Deve exibir o valor total dos pedidos")
        test.todo("Deve exibir o valor total do pedido quanto o pedido nÃ£o tiver nenhum item")
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