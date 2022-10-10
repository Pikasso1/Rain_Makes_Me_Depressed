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
var GVsuggestionnavn = new Array(6);
  GVsuggestionnavn[0] = "Løbetur";
  GVsuggestionnavn[1] = "Gåtur";
  GVsuggestionnavn[2] = "Picnic";
  GVsuggestionnavn[3] = "FODBOLD!";
  GVsuggestionnavn[4] = "Basketball";
  GVsuggestionnavn[5] = "Strand/Sø";

var GVsuggestion = new Array(6);
  GVsuggestion[0] = "Vejret er perfect til at løbe en tur. 2km til en hurtig tur med god fart, 3 km for en lidt længere tur i et okay tempo eller en 5km tur i et roligt tempo";
  GVsuggestion[1] = "Hvis en løbetur ikke er noget for dig, kan en 30 minutters gåtur sørge for at holde ens krop aktiv";
  GVsuggestion[2] = "Hvis du har brug for lidt frisk luft, men også noget selvskab så tag med vennerne i parken";
  GVsuggestion[3] = "Kald på gutterne det er tid til en imprompto fodbold kamp, taberne gi'r frokost";
  GVsuggestion[4] = "Godt vejr massere af solskin? Lyder som perfekt vejr til noget basketball";
  GVsuggestion[5] = "Tag en tur på stranden, eller eventuelt den lokale sø, overvej også om du vil invitere venner med";

var DVsuggestionnavn = new Array(6);
  DVsuggestionnavn[0] = "Lyft vægte";
  DVsuggestionnavn[1] = "Biograf";
  DVsuggestionnavn[2] = "Gaming";
  DVsuggestionnavn[3] = "Brat eller kortspil";
  DVsuggestionnavn[4] = "Familie Hygge";
  DVsuggestionnavn[5] = "Slakkerdag";
  
var DVsuggestion = new Array(6);
  DVsuggestion[0] = "Hvis du har nogle vægte der hjemme ville det være en godt ide at få dem brugt. Lav eventuelt 3 øvelser og repeter 3 gange";
  DVsuggestion[1] = "Tag i biograffen for at se den nye marvel film med gutterne/guttinerne";
  DVsuggestion[2] = "Ring vennerne op på discord og få gang i et spil. P.S Mario Party er altid en banger";
  DVsuggestion[3] = "Tag et spil uno eller ludo med nogle venner, det kan både gøres online og irl. Hvis det ikke er interesant kunne det være der kunne startes en campaign DnD?";
  DVsuggestion[4] = "Kald familen sammen, det er tid til at starte et show up eller se en film. Et kortspil med hele familien kunne også være godt";
  DVsuggestion[5] = "Gå i køkkenet og lav dig selv en kop varm kakao, sæt dig med et tæppe og begynd og bingewatch en serie. Du har fortjent det";

var ActivityTitle = "Problem occured loading title"
var activityExplanation = "Problem occured loading explanation text"
var selectedActivity = 0;








