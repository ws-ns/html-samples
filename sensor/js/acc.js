//////////////////////////////////////////////////////////////////////
//	acc.js
//		Last Change: Fri 24 February 2023  16:21:50
//////////////////////////////////////////////////////////////////////


var _acc_elem1_ = false;
var _acc_elem2_ = false;

function startACC(id1, id2) {
    _acc_elem1_ = document.getElementById(id1);
    _acc_elem2_ = document.getElementById(id2);
    
    window.addEventListener('devicemotion', accDeviceMotion, true);
    window.addEventListener('deviceorientation', accDeviceOrientation, true);

    return;
}

function accDeviceMotion(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
            
    _acc_elem1_.innerHTML = 'hoge';

    if ( _acc_elem1_ ) {
	_acc_elem1_.innerHTML = 
	    '<div> X：'+ Math.round(x * 10) / 10 +' </div>' +
	    '<div> Y：'+ Math.round(y * 10) / 10 +' </div>' + 
	    '<div> Z：'+ Math.round(z * 10) / 10 +' </div>';
    }

    return;
}

function accDeviceOrientation(event) {
    var alpha = event.alpha;
    var beta  = event.beta;
    var gamma = event.gamma;
            
    _acc_elem2_.innerHTML = 'fuga';

    if ( _acc_elem2_ ) {
	_acc_elem2_.innerHTML = 
	    '<div> alpha：'+ Math.round(alpha * 10) / 10 +' </div>' +
	    '<div> beta ：'+ Math.round(beta  * 10) / 10 +' </div>' + 
	    '<div> gamma：'+ Math.round(gamma * 10) / 10 +' </div>';
    }

    return;
}
