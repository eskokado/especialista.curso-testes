import { Produto } from "./Produto";
import { Pedido } from "./Pedido";
import { terminal } from "terminal-kit";

const produtos: Produto[] = [
    new Produto("Camiseta", 45.0, 10, 5),
    new Produto("CalÃ§a", 59.99, 5),
    new Produto("TÃªnis", 99.99, 12),
    new Produto("BonÃ©", 19.5, 3, 0.1),
    new Produto("Meia", 8.0, 8, 19.45),
];

const pedidos: Pedido[] = [];

const p1 = new Pedido(pedidos.length);
p1.adicionarProduto(produtos[0], 2);
p1.adicionarProduto(produtos[1], 1);
p1.finalizarPedido();
pedidos.push(p1);

const p2 = new Pedido(pedidos.length);
p2.adicionarProduto(produtos[2], 1);
p2.adicionarProduto(produtos[3], 1);
p2.finalizarPedido();
pedidos.push(p2);

let pedidoAtual = new Pedido(pedidos.length);

async function aguardarEnter(): Promise<void> {
    await terminal.inputField().promise;
}

async function adicionarProduto() {
    const response = await terminal.singleColumnMenu(
        produtos.map((p) => `${p.nome} - R$${p.precoAtual} - Estoque:${p.estoque}`)
    ).promise;
    const produto = produtos[response.selectedIndex];
    terminal.blue(`Produto selecionado: ${produto.nome}\nQuantidade:`);
    const quantidade = parseInt((await terminal.inputField().promise) ?? "");
    pedidoAtual.adicionarProduto(produto, quantidade);
}

async function deletarProduto() {
    const response = await terminal.singleColumnMenu(
        pedidoAtual.produtos.map(
            ({ produto, quantidade }) =>
                `${produto.nome} - R$${produto.precoAtual} - ${quantidade}`
        )
    ).promise;
    const item = pedidoAtual.produtos[response.selectedIndex];
    terminal.blue(`Produto selecionado: ${item.produto.nome}\nQuantidade:`);
    const quantidade = parseInt((await terminal.inputField().promise) ?? "");
    pedidoAtual.deletarProduto(item.produto, quantidade);
}

async function main() {
    while (true) {
        const response = await terminal.singleColumnMenu([
            "Adicionar produtos",
            "Remover produtos",
            "Finalizar pedido",
            "Ver pedido atual",
            "Ver histÃ³rico de pedidos",
            "Sair",
        ]).promise;

        terminal.clear();
        try {
            switch (response.selectedIndex) {
                case 0:
                    await adicionarProduto();
                    break;
                case 1:
                    await deletarProduto();
                    break;
                case 2:
                    pedidoAtual.finalizarPedido();
                    pedidos.push(pedidoAtual);
                    pedidoAtual = new Pedido(pedidos.length);
                    terminal.green("Pedido finalizado com sucesso!\n");
                    await aguardarEnter();
                    break;
                case 3:
                    terminal.blue("Produtos disponÃ­veis:\n");
                    terminal.white(pedidoAtual.getResumo());
                    await aguardarEnter();
                    break;
                case 4:
                    pedidos.forEach((pedido) => {
                        terminal.blue(`\nPedido ${pedido.id} :\n`);
                        terminal.white(pedido.getResumo() + "\n");
                    });
                    await aguardarEnter();
                    break;
                case 5:
                    terminal.processExit(1);
            }
            terminal.clear();
        } catch (error: any) {
            terminal.red(`\nErro: ${error.message}\n`);
            await aguardarEnter();
            terminal.clear();
        }
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});