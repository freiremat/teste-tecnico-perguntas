//optei por usar o switchMap para juntar os 2 observables em um só, e o takeUntil para evitar memory leaks


private readonly destroy$: Subject<void> = new Subject();

ngOnInit(): void {
    const pessoaId = 1;


    this.pessoaService.buscarPorId(pessoaId)
        .pipe(
            switchMap(pessoa =>
                this.pessoaService.buscarQuantidadeFamiliares(pessoaId).pipe(
                    map(qtd => ({ pessoa, qtd }))
                )
            ),
            takeUntil(this.destroy$)
        )
        .subscribe(({ pessoa, qtd }) => {
            this.texto = `Nome: ${pessoa.nome} | familiares: ${qtd}`;
        });
}

ngOnDestroy() : void {
    this.destroy$.next();
    this.destroy$.complete();
}