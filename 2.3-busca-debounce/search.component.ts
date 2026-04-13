import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, switchMap, tap, takeUntil } from 'rxjs/operators';
import { SearchService } from './search.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-search',
    template: `
    <input [formControl]="searchControl" />
        <div *ngIf="loading">Carregando...</div>
            <ul *ngIf="resultados$ |  async as resultados">
                <li *ngFor="let resultado of resultados">{{ resultado }}</li>
            </ul>
    `
})
export class AppComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<void> = new Subject();

    searchControl = new FormControl('');

    resultados$: Observable<string[]>;
    loading = false;

    constructor(
        private readonly searchService: SearchService,
    ) { }

    ngOnInit(): void {
        this.resultados$ = this.searchControl.valueChanges.pipe(
            takeUntil(this.destroy$),
            debounceTime(500),
            tap(() => this.loading = true),
            switchMap(termo => this.searchService.buscar(termo)),
            tap(() => this.loading = false),
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}