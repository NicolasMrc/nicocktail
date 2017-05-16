import {User} from "./User";
import {Address} from "./Address";
import {Bundle} from "./Bundle";
/**
 * Created by Nico on 15/05/2017.
 */


export class Order {
  constructor(
    public id : number = null,
    public shipping_address? : Address,
    public billing_address? : Address,
    public bundles? : Bundle[],
    public created_at? : Date,
    public user_id? : number,
  ){}
}
