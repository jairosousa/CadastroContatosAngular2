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
const contato_service_1 = require("./contato.service");
const dialog_service_1 = require("../dialog.service");
let ContatosListaComponent = class ContatosListaComponent {
    constructor(contatosService, dialogService) {
        this.contatosService = contatosService;
        this.dialogService = dialogService;
    }
    ngOnInit() {
        this.contatosService.getContatos()
            .then((contatos) => {
            this.contatos = contatos;
        }).catch(err => {
            this.mostrarMenssagem({
                tipo: 'danger',
                texto: ' Ocorreu um erro ao buscar a lista de contato!'
            });
        });
    }
    onDelete(contato) {
        console.log(contato);
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome + "?")
            .then((canDelete) => {
            this.contatos = this.contatos.filter((c) => c.id != contato.id);
            this.mostrarMenssagem({
                tipo: 'success',
                texto: ' Contato deletado!'
            });
        })
            .catch(err => {
            console.log(err);
            this.mostrarMenssagem({
                tipo: 'danger',
                texto: ' Ocorreu um erro ao deletar o Contato!'
            });
        });
        ;
    }
    mostrarMenssagem(mensagem) {
        this.mensagem = mensagem;
        this.montarClasse(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }
    montarClasse(tipo) {
        this.classesCss = {
            'alert': true
        };
        this.classesCss['alert-' + tipo] = true; //ex: alert-success;
        /**
         * 'alert': true,
         * 'alert-success': true,
         * 'alert-danger: false
         */
    }
};
ContatosListaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contatos-lista',
        templateUrl: 'contatos-lista.component.html'
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        dialog_service_1.DialogService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
//# sourceMappingURL=contatos-lista.component.js.map