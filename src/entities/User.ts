import {Bundle} from "./Bundle";
import {Address} from "./Address";
import {Order} from "./Order";
/**
 * Created by Nico on 04/05/2017.
 */



export class User{

  constructor(
    public id? : number,
    public firstname? : string,
    public lastname? : string,
    public address : Address = new Address(),
    public orders? : Order[],
    public email? : string,
    public password? : string,
    public cart : Bundle[] = [],
    public wishlist? : Bundle[],
    public api_token? : string,
    public is_verified? : boolean,
    public role : string = "user",
    public isSubscriber : boolean = false
  ){}
}
