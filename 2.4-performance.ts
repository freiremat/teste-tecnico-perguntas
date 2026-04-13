// O OnPush ajudaria o angular a verificar apenas os comps que sofreram mudança..
// o impacto de usar o Default neste caso, seria que o angular verificaria todos os itens a cada evento ocorrendo uma sobrecarregamento
// Referente ao trackBy, ele facilita porque supondo ao percorrer uma lista com @ngFor, ele ainda percorre a lista por completo, 
// ele vai renderizar apenas o que mudou..
// e para implementa-lo o certo, e se usar -> trackById
// Exemplo:  <li *ngFor="let usuario of usuarios; trackBy: trackByUsuarioId">
