import {User} from "./User";
import {Address} from "./Address";
import {Bundle} from "./Bundle";
/**
 * Created by Nico on 15/05/2017.
 */


export class Order {
  constructor(
    public id? : number,
    public user_id? : number,
    public created_at? : Date,
    public bundles? : Bundle[],

    public shipping_firstname : string= '',
    public shipping_lastname : string= '',
    public shipping_country : string= '',
    public shipping_zipcode : string= '',
    public shipping_city : string= '',
    public shipping_province : string= '',
    public shipping_road : string = '',

    public billing_firstname? : string,
    public billing_lastname? : string,
    public billing_country? : string,
    public billing_zipcode? : string,
    public billing_city? : string,
    public billing_province? : string,
    public billing_road? : string,
  ){}
}
