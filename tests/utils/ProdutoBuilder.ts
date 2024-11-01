import {Produto} from "../../src/Produto";

export class ProdutoBuilder {
    private nome!: string
    private precoOriginal!: number
    private estoque!: number
    private desconto?: number

    constructor() {
        return this
    }

    public comNome(nome: string) {
        this.nome = nome
        return this
    }

    public comPrecoOriginal(precoOriginal: number) {
        this.precoOriginal = precoOriginal
        return this
    }

    public comEstoque(estoque: number) {
        this.estoque = estoque
        return this
    }

    public comDesconto(desconto: number) {
        this.desconto = desconto
        return this
    }

    public padrao() {
        this.nome = "Produto teste"
        this.precoOriginal = 100
        this.estoque = 0
        return this
    }

    public build() {
        return new Produto(this.nome, this.precoOriginal, this.estoque, this.desconto)
    }
}