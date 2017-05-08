import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChild('dynamic-favicon') el:ElementRef;

  constructor(private renderer: Renderer2, private authService : AuthService) { }

  ngOnInit(){

    this.authService.checkLogin();

    let favicons = [
      "favicon-1.gif",
      "favicon-2.gif",
      "favicon-3.gif",
      "favicon-4.gif",
    ];

    let randomFav = Math.floor(Math.random() * favicons.length);

    let path = "assets/favicon/"+favicons[randomFav];

    //create new link favicon
    let link = document.createElement("link");
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.setAttribute("href", path);

    //remove old one
    document.getElementsByTagName('head')[0].removeChild(document.getElementById("dynamic-favicon"));

    //append new link
    document.getElementsByTagName('head')[0].appendChild(link);

  }
}
