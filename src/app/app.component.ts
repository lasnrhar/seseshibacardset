import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards: any[] = [];
  searchedCards: any[] = [];

  type = 'all';
  title = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<any[]>('assets/cards.json').subscribe((d) => {
      this.cards = d;
      this.cards = this.cards.sort((a, b) => this.compare(b.type, a.type));
      this.searchedCards = this.cards;
    });
  }

  compare(a: string, b: string) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  search() {
    if (this.type === 'all') {
      this.searchedCards = this.cards;
    } else {
      this.searchedCards = this.cards.filter((c) => c.type.includes(this.type));
    }
    this.searchedCards = this.searchedCards.filter((c) =>
      c.title.includes(this.title)
    );
  }

  openLink(card: any){
    window.open(card.url, '_blank');
  }
}
