import { Component, Injectable, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weatherman';
  lat = ""
  long = ""
  weather = 0;

  onClick(){
    console.log(this.lat + this.long);
  }
}

