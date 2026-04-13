import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SearchService {

    constructor() { }

    buscar(termo: string): Observable<string[]> {
        const nomes = ['Maria', 'João', 'José'];
        const resultado = nomes.filter(nome => nome.toLowerCase().includes(termo.toLowerCase()));

        return of(resultado);
    }

}
