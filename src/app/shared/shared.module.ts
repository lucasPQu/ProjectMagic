import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { DetalhesCardModalComponent } from './components/detalhes-card-modal/detalhes-card-modal.component';
@NgModule({
      declarations: [
        SafeHtmlPipe,
        DetalhesCardModalComponent
      ],
      imports: [
        CommonModule
      ],
      exports: [
        SafeHtmlPipe,
        DetalhesCardModalComponent
      ]
    })
    export class SharedModule { }
