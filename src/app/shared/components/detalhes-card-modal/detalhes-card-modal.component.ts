import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { OutputCardList } from 'src/app/models/OutputCardList';

@Component({
  selector: 'app-detalhes-card-modal',
  templateUrl: './detalhes-card-modal.component.html',
  styleUrls: ['./detalhes-card-modal.component.css']
})
export class DetalhesCardModalComponent implements AfterViewInit {

  // variável para receber a carta selecionada do componente pai
  @Input() cartaSelecionada: OutputCardList | null = null;

  @ViewChild('detalhesCard') detalhesCardModalElement!: ElementRef;

  private modalBs!: Modal;

manaIcons: { [key: string]: string } = {
  G: '<i class="ms ms-g"></i>',
  R: '<i class="ms ms-r"></i>',
  U: '<i class="ms ms-u"></i>',
  B: '<i class="ms ms-b"></i>',
  W: '<i class="ms ms-w"></i>',
  C: '<i class="ms ms-c"></i>' // Adicionando o ícone de cor incolor
};

  constructor() { }

  ngAfterViewInit(): void {
    if(this.detalhesCardModalElement){
      this.modalBs = new Modal(this.detalhesCardModalElement.nativeElement, {
        backdrop: 'static',
        keyboard: true
      });
    }
  }

  abrirModal(carta: OutputCardList): void {
    this.cartaSelecionada = carta;
    if (this.modalBs) {
      this.modalBs.show();
    }
  }

  fecharModal(): void {
    if (this.modalBs) {
      this.modalBs.hide();
    }
    this.cartaSelecionada = null;
  }


  converterParaManaIcons(colors: string[] | undefined | null): string[] {
    if (!colors || colors.length === 0) {
      return [this.manaIcons['C'] || ''];
    }
    return colors.map(color => this.manaIcons[color] || '');
  }

}
