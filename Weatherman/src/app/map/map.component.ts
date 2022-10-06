import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mouseX: number;
  mouseY: number;

  lat: number;
  long: number;

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.lat = 0;
    this.long = 0;
  }

  ngOnInit(): void {
    //var element = document.createElement("dot");
    //element.setAttribute("id", "dot")
    //element.setAttribute("class", "dot");

    document.addEventListener('mousedown', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });
  }

  clickedMap() {
    const dot = document.getElementById("dot") as HTMLElement || null
    dot.style.opacity = "1"; 
    dot.style.left = this.mouseX.toString() + "px";
    dot.style.top = this.mouseY.toString() + "px";


    console.log("Mouse X: " + this.mouseX + ", Mouse Y: " + this.mouseY)

    //height from window.innerheight * 1/5 to window.innerheight
    //this.lat = this.mapping(this.mouseX, (window.innerHeight * 1/5), window.innerHeight, min lat for map, max lat for card)

    //with from 0 to window.innerWidth * 2/5
    //this.long = this.mapping(this.mouseY, 0, (window.innerWidth * 2/5), min long for map, max long for map)
  }

  mapping(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
}
