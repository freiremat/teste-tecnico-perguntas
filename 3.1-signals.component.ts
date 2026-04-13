import { Component, signal, computed, output } from '@angular/core';

interface ILista {
    id: number,
    nome: string,
    quantidade: number,
    preco: number
}

@Component({
    selector: 'app-signals',
    template: ``
})
export class SignalsComponent {

    itens = signal<ILista[]>([]);

    total = computed(() => this.itens().reduce((soma, item) => soma + item.quantidade * item.preco, 0));

    totalMudou = output<number>();

    constructor() {
        effect(() => {
            this.totalMudou.emit(this.total());
        });
    }

    adicionarItem(novoItem: ILista) {
        this.itens.update(lista => [...lista, novoItem]);
    }

    removerItem(id: number) {
        this.itens.update(lista => lista.filter(item => item.id !== id));
    }
}