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
    public description? : string,
    public image : string = "",
    //public size? : string,
    public price? : number,
    public discount? : number,
    public alcohols? : Alcohol[],
    public softs? : Soft[],
    public extras? : Extra[],
    public quantity : number = 1,
    public isWished : boolean = false,
    public is_custom : boolean = false
  ){}
}
