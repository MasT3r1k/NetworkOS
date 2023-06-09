import { Component } from '@angular/core';
import { NetworkLanguages } from '../../../locale';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css', '../Settings.css']
})
export class LanguageComponent {
  locale = NetworkLanguages;
}
