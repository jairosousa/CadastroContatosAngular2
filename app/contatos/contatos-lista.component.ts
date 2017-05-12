import { Component, OnInit } from '@angular/core';

import { Contato } from "./contato.model";
import { ContatoService } from "./contato.service";
import { DialogService } from "../dialog.service";

@Component({
    moduleId: module.id,
    selector:  'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit {

    contatos: Contato[];
    mensagem: {};
    classesCss: {};

    constructor(
        private contatosService: ContatoService,
        private dialogService: DialogService
        ) {}

    ngOnInit(): void {
        this.contatosService.getContatos()
            .then((contatos: Contato[]) => {
                this.contatos = contatos;
            }).catch(err => {
                this.mostrarMenssagem({
                    tipo: 'danger',
                    texto: ' Ocorreu um erro ao buscar a lista de contato!'
                });
            });
    }

    onDelete(contato: Contato): void {
        console.log(contato);
        this.dialogService.confirm('Deseja deletar o contato ' + contato.nome + "?")
            .then((canDelete: boolean) => {
                this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);
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
            });;
    }

    private mostrarMenssagem(mensagem: {tipo: string, texto: string}):void {
        this.mensagem = mensagem;
        this.montarClasse(mensagem.tipo);

        if(mensagem.tipo != 'danger') {
            setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
    }

    private montarClasse(tipo: string): void {
        this.classesCss = {
            'alert': true
        }

        this.classesCss['alert-' + tipo] = true //ex: alert-success;

        /**
         * 'alert': true,
         * 'alert-success': true,
         * 'alert-danger: false
         */
    }

}