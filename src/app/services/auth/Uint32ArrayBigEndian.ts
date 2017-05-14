/**
 * Created by Nico on 25/10/2016.
 */

export class Uint32ArrayBigEndian
{

    POW_2_24 = Math.pow(2, 24);

    POW_2_32 = Math.pow(2, 32);

    bytes: Uint8Array;
    constructor(length: number)
    {
        this.bytes = new Uint8Array(length << 2);
    }
    get(index: number): number
    {
        index <<= 2;
        return (this.bytes[index] * this.POW_2_24)
            + ((this.bytes[index + 1] << 16)
            | (this.bytes[index + 2] << 8)
            | this.bytes[index + 3]);
    }
    set(index: number, value: number)
    {
        var high = Math.floor(value / this.POW_2_24),
            rest = value - (high * this.POW_2_24);
        index <<= 2;
        this.bytes[index] = high;
        this.bytes[index + 1] = rest >> 16;
        this.bytes[index + 2] = (rest >> 8) & 0xFF;
        this.bytes[index + 3] = rest & 0xFF;
    }
}