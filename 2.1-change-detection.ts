//Quando se usa ChangeDetectionStrategy.OnPush, é necessario se importar no constructor o ChangeDetectionRef para que atualize o dado
// No caso eu faria assim:
//Decidi add um destroy$ p evitar memory leak após o uso do subscribe

import { ChangeDetectionStrategy, Component, Injectable, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { of, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

@Injectable()
class PessoaService {
 /** @description Mock de uma busca em API com retorno em 0.5 segundos */
 buscarPorId(id: number) {
   return of({ id, nome: 'João' }).pipe(delay(500));
 }
}

@Component({
    selector: 'app-root',
    providers: [PessoaService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<h1>{{ texto }}</h1>`,
})
export class AppComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<void> = new Subject();

    texto: string;
    contador = 0;

    constructor(
        private readonly pessoaService: PessoaService,
        private readonly cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.pessoaService.buscarPorId(1)
        .pipe(takeUntil(this.destroy$))
        .subscribe((pessoa) => {
            this.texto = `Nome: ${pessoa.nome}`;
            // para que o dado fosse atualizado e informasse ao angular
            this.cdr.markForCheck();
        });

        setInterval(() => this.contador++, 1000);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}