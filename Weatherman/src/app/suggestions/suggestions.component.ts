import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  current_suggestionnavn: Array<string>
  current_suggestion: Array<string>
  index: number

  constructor() {
    this.current_suggestionnavn = new Array(6);
    this.current_suggestion = new Array(6);
    this.index = 1;
   }

   ngOnInit(): void {
    this.current_suggestionnavn[0] = "Løbetur";
    this.current_suggestionnavn[1] = "Gåtur";
    this.current_suggestionnavn[2] = "Picnic";
    this.current_suggestionnavn[3] = "FODBOLD!";
    this.current_suggestionnavn[4] = "Basketball";
    this.current_suggestionnavn[5] = "Strand/Sø";

    this.current_suggestion[0] = "Vejret er perfect til at løbe en tur. 2km til en hurtig tur med god fart, 3 km for en lidt længere tur i et okay tempo eller en 5km tur i et roligt tempo";
    this.current_suggestion[1] = "Hvis en løbetur ikke er noget for dig, kan en 30 minutters gåtur sørge for at holde ens krop aktiv";
    this.current_suggestion[2] = "Hvis du har brug for lidt frisk luft, men også noget selvskab så tag med vennerne i parken";
    this.current_suggestion[3] = "Kald på gutterne det er tid til en imprompto fodbold kamp, taberne gi'r frokost";
    this.current_suggestion[4] = "Godt vejr massere af solskin? Lyder som perfekt vejr til noget basketball";
    this.current_suggestion[5] = "Tag en tur på stranden, eller eventuelt den lokale sø, overvej også om du vil invitere venner med";
   }

  buttonClicked(isRight: boolean){
    if(isRight){
      this.index++
    } 
    else 
    {
      this.index--
    }
    
    //make sure index always is between 0-5

    console.log(this.index)

    var temp = document.getElementById("#hiddenTemp")?.innerText


    //Doesnt change the current_whatever array
    if(temp != null){
    if(parseFloat(temp) > 15){
      console.log("good")
      this.current_suggestionnavn[0] = "Løbetur";
      this.current_suggestionnavn[1] = "Gåtur";
      this.current_suggestionnavn[2] = "Picnic";
      this.current_suggestionnavn[3] = "FODBOLD!";
      this.current_suggestionnavn[4] = "Basketball";
      this.current_suggestionnavn[5] = "Strand/Sø";

      this.current_suggestion[0] = "Vejret er perfect til at løbe en tur. 2km til en hurtig tur med god fart, 3 km for en lidt længere tur i et okay tempo eller en 5km tur i et roligt tempo";
      this.current_suggestion[1] = "Hvis en løbetur ikke er noget for dig, kan en 30 minutters gåtur sørge for at holde ens krop aktiv";
      this.current_suggestion[2] = "Hvis du har brug for lidt frisk luft, men også noget selvskab så tag med vennerne i parken";
      this.current_suggestion[3] = "Kald på gutterne det er tid til en imprompto fodbold kamp, taberne gi'r frokost";
      this.current_suggestion[4] = "Godt vejr massere af solskin? Lyder som perfekt vejr til noget basketball";
      this.current_suggestion[5] = "Tag en tur på stranden, eller eventuelt den lokale sø, overvej også om du vil invitere venner med";
    } 
    else
    {
      console.log("bad")
      this.current_suggestionnavn[0] = "Lyft vægte";
      this.current_suggestionnavn[1] = "Biograf";
      this.current_suggestionnavn[2] = "Gaming";
      this.current_suggestionnavn[3] = "Brat eller kortspil";
      this.current_suggestionnavn[4] = "Familie Hygge";
      this.current_suggestionnavn[5] = "Slakkerdag";
  
      this.current_suggestion[0] = "Hvis du har nogle vægte der hjemme ville det være en godt ide at få dem brugt. Lav eventuelt 3 øvelser og repeter 3 gange";
      this.current_suggestion[1] = "Tag i biograffen for at se den nye marvel film med gutterne/guttinerne";
      this.current_suggestion[2] = "Ring vennerne op på discord og få gang i et spil. P.S Mario Party er altid en banger";
      this.current_suggestion[3] = "Tag et spil uno eller ludo med nogle venner, det kan både gøres online og irl. Hvis det ikke er interesant kunne det være der kunne startes en campaign DnD?";
      this.current_suggestion[4] = "Kald familen sammen, det er tid til at starte et show up eller se en film. Et kortspil med hele familien kunne også være godt";
      this.current_suggestion[5] = "Gå i køkkenet og lav dig selv en kop varm kakao, sæt dig med et tæppe og begynd og bingewatch en serie. Du har fortjent det";
    }

  }
}

} 








