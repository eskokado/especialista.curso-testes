describe("Classe Pedido", ()=>{
    describe("Ao criar pedido",()=>{
        test.todo("Deve criar um pedido vÃ¡lido")
        test.todo("NÃ£o deve criar um pedido com id negativo")
    });
    describe("Ao adicionar produtos ao pedido",()=>{
        test.todo("Deve adicionar um produto vÃ¡lido ao pedido")
        test.todo("Deve lanÃ§ar um erro ao adicionar um produto com estoque insuficiente")
        test.todo("Deve reduzir o estoque do pedido")
        test.todo("Deve lanÃ§ar um erro ao tentar adicionar produto em um pedido finalizado")
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