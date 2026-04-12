interface PaginaParams {
    pagina: number;
    tamanhoPagina: number;
}

interface Pagina<T> {
    itens: T[];
    total: number;
}

function filtrarEPaginar<T>(
    data: T[],
    filterFn: (item: T) => boolean,
    params: PaginaParams
): Pagina<T> {
    const itensFiltrados = data.filter(filterFn);

    const inicio = (params.pagina - 1) * params.tamanhoPagina;
    const fim = inicio + params.tamanhoPagina;

    const itensPagina = itensFiltrados.slice(inicio, fim);

    return {
        itens: itensPagina,
        total: itensFiltrados.length
    };
}

//array de usuarios

interface Usuario {
    id: number;
    nome: string;
    idade: number;
}

const usuarios: Usuario[] = [
    { id: 1, nome: "Teste1", idade: 30 },
    { id: 2, nome: "Teste2", idade: 25 },
];

const resultado = filtrarEPaginar(
    usuarios,
    (usuario) => usuario.nome === "Teste1",
    { pagina: 1, tamanhoPagina: 1 }
);