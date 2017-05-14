/**
 * Created by Nico on 25/10/2016.
 */
"use strict";
var Uint32ArrayBigEndian = (function () {
    function Uint32ArrayBigEndian(length) {
        this.POW_2_24 = Math.pow(2, 24);
        this.POW_2_32 = Math.pow(2, 32);
        this.bytes = new Uint8Array(length << 2);
    }
    Uint32ArrayBigEndian.prototype.get = function (index) {
        index <<= 2;
        return (this.bytes[index] * this.POW_2_24)
            + ((this.bytes[index + 1] << 16)
                | (this.bytes[index + 2] << 8)
                | this.bytes[index + 3]);
    };
    Uint32ArrayBigEndian.prototype.set = function (index, value) {
        var high = Math.floor(value / this.POW_2_24), rest = value - (high * this.POW_2_24);
        index <<= 2;
        this.bytes[index] = high;
        this.bytes[index + 1] = rest >> 16;
        this.bytes[index + 2] = (rest >> 8) & 0xFF;
        this.bytes[index + 3] = rest & 0xFF;
    };
    return Uint32ArrayBigEndian;
}());
exports.Uint32ArrayBigEndian = Uint32ArrayBigEndian;
//# sourceMappingURL=Uint32ArrayBigEndian.js.map