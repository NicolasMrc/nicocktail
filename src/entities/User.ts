import {Bundle} from "./Bundle";
/**
 * Created by Nico on 04/05/2017.
 */



export class User{


  constructor(
    public firstname? : string,
    public lastname? : string,
    public zipCode? : string,
    public address? : string,
    public city? : string,
    public country? : string,
    public email? : string,
    public password? : string,
    public cart? : Bundle[],
    public wishlist? : Bundle[],
    public role : string = "user",
    public isSubscriber : boolean = false
  ){}
}
