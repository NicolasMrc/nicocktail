import { Component, OnInit } from '@angular/core';
import {User} from "../../entities/User";
import {UserService} from "../../services/UserService";
import {Hasher} from "../../services/auth/hasher.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newUser : User = new User();

  confirmationPassword : string = "nicolas";

  constructor(private userService : UserService, private hasher : Hasher) { }

  ngOnInit() {
    this.newUser.firstname = "Nicolas";
    this.newUser.lastname = "Mercier";
    this.newUser.email = "nyckoo@live.fr";
    this.newUser.password = "nicolas";
    this.newUser.birthdate = new Date("05-10-1995");
    this.newUser.civility = "M";
  }

  onSubmit(){
    this.newUser.password = this.hasher.hash(this.newUser.password)
    this.userService.addUser(this.newUser).subscribe(user=>{
      console.log(user);
    })
  }
}
