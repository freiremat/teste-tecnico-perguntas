interface IProduto {
    id: number;
    descricao: string;
    quantidadeEstoque: number;
}

class Produto implements IProduto {
    constructor(
        readonly id: number,
        readonly descricao: string,
        public quantidadeEstoque: number
    ) { }
}

interface IVerdureira {
    produtos: IProduto[];
    getDescricaoProduto(id: number): string;
    hasEstoqueProduto(id: number): boolean;
}

class Verdureira implements IVerdureira {
    constructor(
        readonly produtos: IProduto[]
    ) { }

    getDescricaoProduto(id: number): string {
        const produto = this.produtos.find(p => p.id === id);

        if (!produto) {
            throw new Error(`Produto ${id} não encontrado`);
        }

        return `${produto.id} - ${produto.descricao} (${produto.quantidadeEstoque}x)`;
    }

    hasEstoqueProduto(id: number): boolean {
        const produto = this.produtos.find(p => p.id === id);

        if (!produto) {
            throw new Error(`Produto ${id} não encontrado`);
        }

        return produto.quantidadeEstoque > 0;
    }
}

// ha repeticao do codigo de busca do produto, o que daria para ainda ser refatorado num metodo privado seguindo DRY