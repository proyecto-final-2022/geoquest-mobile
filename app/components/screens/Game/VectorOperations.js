
Array.prototype.add = function( b ) {
    var res = [];
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        if( this.length !== b.length ) {
            throw "Array lengths do not match.";
        } else {
            for( var i = 0; i < this.length; i++ ) {
                res[i] = this[i] + b[i];
            }
        }
    } else if( typeof b === 'number' ) {
        res = this.map(x=>x+b)
    }
    return res;
};

Array.prototype.sub = function( b ) {
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        b = b.map(x=>-x)
    } else if( typeof b === 'number' ) {
        b=-b;
    }
    return this.add(b);
};

Array.prototype.mult = function( b ) {
    var res = [];
    if( typeof b === 'number' ) {
        res = this.map(x=>x*b)
    } else  {
        throw "Array Non Scalar Multiplication.";
    }
    return res;
};

Array.prototype.x = function(  ) { var res = this[0]; return res; };
Array.prototype.y = function(  ) { var res = this[1]; return res; };
Array.prototype.z = function(  ) { var res = this[2]; return res; };

//var a = [1,2,3];
//var b = [9,2,7];
//var c = a.add( b );  // [10,4,10]
//var d = a.add( 5 );  // [6,7,8]