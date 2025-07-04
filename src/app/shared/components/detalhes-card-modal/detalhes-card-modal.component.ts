import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Modal } from 'bootstrap';
import { ImageUris, OutputCardList } from 'src/app/models/OutputCardList';
import { SearchCardService } from 'src/app/services/search-card.service';
import { finalize } from 'rxjs/operators';
import { ScryfallApiCard, ScryfallApiResponse } from 'src/app/models/OutputApiResponseSearchCard';

@Component({
  selector: 'app-detalhes-card-modal',
  templateUrl: './detalhes-card-modal.component.html',
  styleUrls: ['./detalhes-card-modal.component.css']
})
export class DetalhesCardModalComponent implements AfterViewInit {

  // variável para receber a carta selecionada do componente pai
  @Input() cartaSelecionada: OutputCardList | null = null;
  oracleTextFormatted: SafeHtml | undefined;

  carroselImagesCard: string[] = [];

  @ViewChild('detalhesCard') detalhesCardModalElement!: ElementRef;

  private modalBs!: Modal;

magicSimbols: { [key: string]: string } = {
  G: '<i class="ms ms-g"></i>&nbsp;',
  R: '<i class="ms ms-r"></i>&nbsp;',
  U: '<i class="ms ms-u"></i>&nbsp;',
  B: '<i class="ms ms-b"></i>&nbsp;',
  W: '<i class="ms ms-w"></i>&nbsp;',
  C: '<i class="ms ms-c"></i>&nbsp;', // Adicionando o ícone de cor incolor

    '0': '<i class="ms ms-0"></i>',
    '1': '<i class="ms ms-1"></i>',
    '2': '<i class="ms ms-2"></i>',
    '3': '<i class="ms ms-3"></i>',
    '4': '<i class="ms ms-4"></i>',
    '5': '<i class="ms ms-5"></i>',
    '6': '<i class="ms ms-6"></i>',
    '7': '<i class="ms ms-7"></i>',
    '8': '<i class="ms ms-8"></i>',
    '9': '<i class="ms ms-9"></i>',
    '10': '<i class="ms ms-10"></i>',
    '11': '<i class="ms ms-11"></i>',
    '12': '<i class="ms ms-12"></i>',
    'X': '<i class="ms ms-x"></i>',
    'T': '<i class="ms ms-tap"></i>', // Símbolo de virar
    'S': '<i class="ms ms-s"></i>'
};

  constructor(private sanitizer: DomSanitizer, private searchCardService: SearchCardService,) {}

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
    this.carroselImagesCard = [];

    const mainImage = this.cartaSelecionada?.cardImage?.normal || this.cartaSelecionada?.cardImage?.large || this.cartaSelecionada?.cardImage?.png;
    if (mainImage) {
      this.carroselImagesCard.push(mainImage);
    }

    this.receberImagensCarrossel();

     if (carta.cardText) {
    this.tratamentoTextoCarta(carta.cardText);
    }
    if (this.modalBs) {
      this.modalBs.show();
    }
  }

   receberImagensCarrossel(): void {
    if (this.cartaSelecionada?.nameCard) {
      this.searchCardService.searchVersionCard(this.cartaSelecionada.nameCard)
        .pipe(
          finalize(() => {})
        )
        .subscribe({
          next: (resp: ScryfallApiResponse) => {
            if (resp && resp.data && resp.data.length > 0) {
              const newImages: string[] = [];
              resp.data.forEach((card: ScryfallApiCard) => {
                let imageUrl: string | undefined;
                if (card.card_faces && card.card_faces.length > 0) {
                  imageUrl = card.card_faces[0].image_uris?.normal || card.card_faces[0].image_uris?.large || card.card_faces[0].image_uris?.png;
                } else {
                  imageUrl = card.image_uris?.normal || card.image_uris?.large || card.image_uris?.png;
                }

                if (imageUrl && !this.carroselImagesCard.includes(imageUrl)) {
                  newImages.push(imageUrl);
                }
              });
              this.carroselImagesCard.push(...newImages);
            }
          },
          error: (error) => {
            console.error('Erro ao buscar versões da carta:', error);
          }
        });
    }
  }


  tratamentoTextoCarta(texto: string): void {
    let cartaTextoTratado = texto;
    cartaTextoTratado = cartaTextoTratado.trim();
    cartaTextoTratado = cartaTextoTratado.replace(/\{([^{}]+)\}/g, (match, symbol) => {
     const icon = this.magicSimbols[symbol.toUpperCase()] ;
     return icon || match;
    });
    cartaTextoTratado = cartaTextoTratado.replace(/\s*\n\s*/g, '<br>');
    this.oracleTextFormatted = this.sanitizer.bypassSecurityTrustHtml(cartaTextoTratado);
  }

  fecharModal(): void {
    if (this.modalBs) {
      this.modalBs.hide();
    }
    this.cartaSelecionada = null;
    this.carroselImagesCard = [];
  }


  converterParaManaIcons(colors: string[] | undefined | null): string[] {
    if (!colors || colors.length === 0) {
      return [this.magicSimbols['C'] || ''];
    }
    return colors.map(color => this.magicSimbols[color] || '');
  }


}
