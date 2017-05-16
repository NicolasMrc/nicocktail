import {User} from "./User";
import {Address} from "./Address";
/**
 * Created by Nico on 15/05/2017.
 */


export class Order {
  constructor(
    public id? : number,
    public shipping_address? : Address,
    public billing_address? : Address,
    public created_at? : Date,
  ){}
}
