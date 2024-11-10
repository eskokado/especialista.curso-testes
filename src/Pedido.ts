import { Produto } from "./Produto";

export class Pedido {
    public produtos: { produto: Produto; quantidade: number }[] = [];
    private _finalizado: boolean = false;

    constructor(public id: number) {
        if (id <= 0) throw new Error("O id deve ser maior que 0")
    }

    get finalizado() {
        return this._finalizado
    }

    set finalizado(finalizado: boolean) {
        if(this._finalizado && !finalizado) throw new Error("Pedido finalizado não pode ser alterado")
        this._finalizado = finalizado
    }

    adicionarProduto(produto: Produto, quantidade: number): void {
        if (this.finalizado) throw new Error('Pedido já finalizado!')
        try {
            produto.reduzirEstoque(quantidade);
        } catch (error) {
            throw new Error(`Estoque insuficiente para ${produto.nome}`);
        }
        this.produtos.push({ produto, quantidade });
    }

    removerProduto(produto: Produto, quantidade: number): void {
        if (this.finalizado) throw new Error('Pedido já finalizado!')
        const produtoPedido = this.produtos.find((p) => p.produto === produto);
        if (!produtoPedido) {
            return;
        }
        if (quantidade > produtoPedido.quantidade) {
            produtoPedido.produto.aumentarEstoque(produtoPedido.quantidade);
            produtoPedido.quantidade = 0;
        } else {
            produtoPedido.produto.aumentarEstoque(quantidade);
            produtoPedido.quantidade -= quantidade;
        }
        this.produtos = this.produtos.filter((p) => p.quantidade > 0);
    }

    finalizarPedido(): void {
        if(this.produtos.length === 0) throw new Error("Pedido sem produto não pode ser finalizado!")
        this.finalizado = true;
    }

    get total() {
        return this.produtos.reduce(
            (acc, p) => acc + p.produto.precoAtual * p.quantidade,
            0
        );
    }

    getResumo(): string {
        const produtosDescritos = this.produtos
            .map(
                (p) =>
                    `${p.produto.getDescricao()}, Quantidade: ${
                        p.quantidade > 0 ? p.quantidade : "não encontrada"
                    }`
            )
            .join("\n");

        return `Pedido ID: ${this.id}\nProdutos:\n${this.produtos.length > 0 ? produtosDescritos : "Nenhum produto encontrado"}\nTotal: R$${this.total.toFixed(2) ?? 0}\nFinalizado: ${this.finalizado ? "Sim" : "Não"}`;
    }
}