import { Component } from '@angular/core';
import { SharedModule } from "../../../shared/shared.module";

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  searchByCapital(term: string): void {
    console.log('Desde ByCapitalPage')
    console.log({term})
  }
}
