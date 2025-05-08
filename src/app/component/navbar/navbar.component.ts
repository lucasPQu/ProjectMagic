import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() themeExterno = new EventEmitter<string>();


  themes = [{
    icon: "bi bi-brightness-high",
    temaBody: 'light',
    temaHeader: '#6E8B3D',
    title: 'Modo Claro'
  }, {
    icon: "bi bi-moon-stars",
    temaBody: 'dark',
    temaHeader: "#fd7a00",
    title: 'Modo Escuro'
  },];

  temaAtual = this.themes[0];
  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.onThemeClick(this.themes[0])
  }

  onThemeClick(theme: any) {
    this.temaAtual = theme;
    this.themeExterno.emit(theme.temaBody);
    this.renderer.setAttribute(document.body, 'data-bs-theme', theme.temaBody);
    this.renderer.setAttribute(document.documentElement, 'data-bs-theme', theme.temaBody);

    const navbar = document.querySelector('.navbar');
    if (navbar) {
      this.renderer.setStyle(navbar, 'background-color', theme.temaHeader || '');
    }
  }

}
