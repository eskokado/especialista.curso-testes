export class Produto {
    public precoAtual: number;
    constructor(
        public nome: string,
        public precoOriginal: number,
        public estoque: number,
        private _desconto?: number | undefined
    ) {
        if (nome.length < 3) {
            throw new Error("Nome deve ter no mÃ­nimo 3 caracteres");
        }

        if (precoOriginal <= 0) {
            throw new Error("PreÃ§o deve ser positivo");
        }

        if (estoque <= 0) {
            throw new Error("Estoque deve ser positivo");
        }

        this.precoAtual = this.aplicarDesconto(precoOriginal, _desconto);
    }

    aplicarDesconto(preco: number, desconto: number | undefined): number {
        if (desconto !== 0 && !desconto) {
            return preco;
        }
        if (desconto > 0 && desconto < 1) { //0.8 = 80%, 80 = - R$80
            return preco * (1 - desconto);
        } else {
            return preco - desconto > 0 ? preco - desconto : 0;
        }
    }

    set desconto(novoDesconto: number) {
        this.precoAtual = this.aplicarDesconto(this.precoOriginal, novoDesconto);
    }

    get desconto(): number | undefined {
        return this._desconto;
    }

    reduzirEstoque(quantidade: number): void {
        if (quantidade > this.estoque) {
            throw new Error("Estoque insuficiente");
        }
        this.estoque -= quantidade;
    }

    aumentarEstoque(quantidade: number): void {
        this.estoque += quantidade;
    }

    getDescricao(): string {
        const zero = Number(0).toFixed(2);
        const precoAtualFormatado = this.precoAtual
            ? this.precoAtual.toFixed(2)
            : zero;
        const textoBase = `Produto: ${
            this.nome ?? "Produto Teste"
        }, PreÃ§o: R$${precoAtualFormatado}`;
        if (this._desconto) {
            let textoDesconto = "";
            if (this._desconto > 1) {
                textoDesconto = `Desconto: R$${this._desconto.toFixed(2) ?? zero}`;
            } else {
                // @ts-ignore
                textoDesconto = `Desconto: ${this._desconto * 100 ?? 0}%`;
            }
            return `${textoBase}, ${textoDesconto}, PreÃ§o Original: R$${this.precoOriginal.toFixed(
                2
            )}`;
        }

        return textoBase;
    }
}