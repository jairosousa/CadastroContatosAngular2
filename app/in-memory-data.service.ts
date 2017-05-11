
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contato } from "./contatos/contato.model";

export class InMemoryDataService implements InMemoryDbService {
    createDb():{} {
        let contatos: Contato[] = [
            {id: 1, nome: 'Fulano de tal', email: 'fulano@email.com', telefone: '(00) 0000-0000'},
            {id: 2, nome: 'Ciclano', email: 'ciclano@email.com', telefone: '(00) 0000-0000'},
            {id: 3, nome: 'Estanaquio', email: 'estaquio@email.com', telefone: '(00) 0000-0000'},
            {id: 4, nome: 'Seu Madruga', email: 'madruga@email.com', telefone: '(00) 0000-0000'},
            {id: 5, nome: 'Bob Esponja', email: 'esponja@email.com', telefone: '(00) 0000-0000'},
        ];
        return {'contatos': contatos};
    } 


}