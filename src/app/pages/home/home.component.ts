import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tooltip } from 'bootstrap';
import { ColorId, OutputCardList } from 'src/app/models/OutputCardList';
import { SearchCardService } from 'src/app/services/search-card.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked, OnInit {
  errorSearchCard = false;
  cardsList: OutputCardList[] = [];
  nextPage: string = '';
  showButtonNextPage = false;
  private tooltipsInitialized = false;

  manaIcons: { [key: string]: string } = {
  G: '<i class="ms ms-g"></i>',
  R: '<i class="ms ms-r"></i>',
  U: '<i class="ms ms-u"></i>',
  B: '<i class="ms ms-b"></i>',
  W: '<i class="ms ms-w"></i>'
};


  form = new FormGroup({
    nameSearchCard: new FormControl('')
  });

  constructor(
    private searchCardService: SearchCardService,
    private elementRef: ElementRef
  ) { }


  ngOnInit(): void {
    this.errorSearchCard = false;
  }

  ngAfterViewChecked(): void {
    if (!this.tooltipsInitialized && this.cardsList?.length > 0) {
      const tooltipTriggerList = this.elementRef.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');

      tooltipTriggerList.forEach((el: HTMLElement) => {
        const title = el.getAttribute('data-bs-title');
        if (title) {
          new Tooltip(el);
        }
      });

      this.tooltipsInitialized = true;
    }
  }
  onClickSearch(): void {
    const name = this.form.get('nameSearchCard')?.value;
    if(name){
      this.searchCardService.searchCardsName(name).subscribe(
        (resp) => {
          const cards = resp.data;
          this.cardsList = cards.map((card: any) => {
            if(!card.card_faces){
            return {
              nameCard: this.tratarNomeCards(card.name),
              cardImage: card.image_uris,
              cardType: card.type_line.split('-')[0],
              cardColor: JSON.stringify(card.color_identity),
              cardKeywords: card.keywords
            };
          }else{
            return {
              nameCard: this.tratarNomeCards(card.name),
              cardImage: card.card_faces[0].image_uris,
              cardType: card.type_line.split('-')[0],
              cardColor: JSON.stringify(card.color_identity),
              cardKeywords: card.keywords
            };
          }
          });

          if(resp.has_more){
            this.nextPage = resp.next_page.toString();
            this.showButtonNextPage = true;
          }else{
            this.tooltipsInitialized = false;
            this.showButtonNextPage = false;
          }

          this.errorSearchCard = false;
        },
        error => {
          this.errorSearchCard = true;

        }
      );
    }else{
      this.errorSearchCard = true;
    }
  }

  searchNextPage(): void {
      this.searchCardService.searchNextPage(this.nextPage).subscribe(
              (resp) => {
                const has_morePage = resp.has_more;
                const next_morePage = resp.next_page.toString();
                const cards = resp.data;
                this.cardsList.push(...cards.map((card: any) => {
                  if(!card.card_faces){
                    return {
                      nameCard: this.tratarNomeCards(card.name),
                      cardImage: card.image_uris,
                      cardType: card.type_line.split('-')[0],
                      cardColor: JSON.stringify(card.color_identity),
                      cardKeywords: card.keywords
                    };
                  }else{
                    return {
                      nameCard: this.tratarNomeCards(card.name),
                      cardImage: card.card_faces[0].image_uris,
                      cardType: card.type_line.split('-')[0],
                      cardColor: JSON.stringify(card.color_identity),
                      cardKeywords: card.keywords
                    };
                  }
                }));
                if(has_morePage){
                  this.nextPage = next_morePage;
                  this.showButtonNextPage = true;
                }else{
                  this.tooltipsInitialized = false;
                  this.showButtonNextPage = false;
                  this.nextPage = '';
                }
              });

  }

  converterParaManaIcons(colorId: ColorId): string[] {
  return Object.values(colorId).map(color => this.manaIcons[color] || '');
  }

  tratarNomeCards(nome: string): string {
    const nomeTratado = nome.replace('-', ' ');
    return nomeTratado;
  }

}
