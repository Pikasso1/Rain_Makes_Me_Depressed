import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
var suggestionnavn = new Array(6);
  suggestionnavn[0] = "Løbetur";
  suggestionnavn[1] = "Gåtur";
  suggestionnavn[2] = "Picnic";
  suggestionnavn[3] = "";

var suggestion = new Array(6);
  suggestion[0] = "Vejret er perfect til at løbe en tur. 2km til en hurtig tur med god fart, 3 km for en lidt længere tur i et okay tempo eller en 5km tur i et roligt tempo";
  suggestion[1] = "Hvis en løbetur ikke er noget for dig, kan en 30 minutters gåtur sørge for at holde ens krop aktiv";
  suggestion[2] = "Hvis du har brug for lidt frisk luft, men også noget selvskab så tag med vennerne i parken";
  suggestion[3] = "";




var ActivityTitle = "Problem occured loading title"
var activityExplanation = "Problem occured loading explanation text"
var selectedActivity = 0;








