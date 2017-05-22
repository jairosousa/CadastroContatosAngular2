import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { CONTATOS } from './contatos-mock';
import { Contato } from "./contato.model";
import { Observable } from "rxjs";
import { ServiceInterface } from "../interfaces/service.interface";

@Injectable()
export class ContatoService implements ServiceInterface<Contato>{
        
    private contatosURL: string = 'api/contatos';

    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ) {}

    //Metodo chamado para pagina Lista de contatos
    findAll(): Promise<Contato[]> {
        return this.http.get(this.contatosURL)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
    }

    //Metodo para buscar id contato para edição
    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => contatos.find( contato => contato.id === id));
    }

    create(contato: Contato): Promise<Contato> {
        return this.http
            .post(this.contatosURL, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Contato)
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato> {
        const url = `${this.contatosURL}/${contato.id}`;//app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato> {
        const url = `${this.contatosURL}/${contato.id}`;//app/contatos/:id
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
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
            return this.findAll()
        });
    }

    search(term: string): Observable<Contato[]> {
        return this.http
            .get(`${this.contatosURL}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[])
    }
}