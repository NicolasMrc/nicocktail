import {Extra} from "./Extra";
import {Soft} from "./Soft";
import {Alcohol} from "./Alcohol";
/**
 * Created by Nico on 04/05/2017.
 */


export class Bundle{
  constructor(
    public id? : number,
    public name? : string,
    public size? : string,
    public priceSmall? : number,
    public priceMedium? : number,
    public priceLarge? : number,

    public alcohol? : Alcohol[],
    public softs? : Soft[],
    public extras? : Extra[],
  ){}
}
