"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        this.contatosURL = 'api/contatos';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    //Metodo chamado para pagina Lista de contatos
    getContatos() {
        return this.http.get(this.contatosURL)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    //Metodo para buscar id contato para edição
    getContato(id) {
        return this.getContatos()
            .then((contatos) => contatos.find(contato => contato.id === id));
    }
    create(contato) {
        return this.http
            .post(this.contatosURL, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response) => response.json().data)
            .catch(this.handleError);
    }
    update(contato) {
        const url = `${this.contatosURL}/${contato.id}`; //app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => contato)
            .catch(this.handleError);
    }
    handleError(err) {
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
    }
    //Metodo para teste das Promisse e simular lentidão no sistema
    getContatosSlowLy() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
        }) //Encadeamento de promise
            .then(() => {
            console.log('primeiro then');
            return 'Curso de angular 2 Plinio Naves';
        })
            .then((param) => {
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
            return this.getContatos();
        });
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map