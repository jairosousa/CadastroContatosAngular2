import { Injectable } from "@angular/core";

import { CONTATOS } from './contatos-mock';
import { Contato } from "./contato.model";

@Injectable()
export class ContatoService {
    //Metodo chamado para pagina Lista de contatos
    getContatos(): Promise<Contato[]> {
        return Promise.resolve(CONTATOS);
    }

    //Metodo para buscar id contato para edição
    getContato(id: number): Promise<Contato> {
        return this.getContatos()
            .then((contatos: Contato[]) => contatos.find( contato => contato.id === id));
    }


    //Metodo para teste das Promisse e simular lentidão no sistema
    getContatosSlowLy(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        })//Encadeamento de promise
        .then(() => {
            console.log('primeiro then');
            return 'Curso de angular 2 Plinio Naves';
        })
        .then((param: string) => {
            console.log('segundo then');
            console.log(param);

            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('continuando depois de 4 segundos...');
                    resolve2();
                }, 4000);
            });
        })
        .then(() => {
            console.log('terceiro then');
            return this.getContatos()
        });
    }
}