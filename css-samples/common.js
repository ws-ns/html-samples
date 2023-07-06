//// jQueryなし
// あ


// ドキュメント読み終わったら実行
document.addEventListener('DOMContentLoaded', function() {

    let elem, elems;

    // css-sample-1
    elem = document.querySelector('#css-sample-1');
    for ( let no = 0; no < elem.children.length; no++ ) {
        // setTimeout( function() {
        //     elem.children[no].classList.add('show');
        // }, 100*no );
        elem.children[no].style.animationDelay = ( 0.2*no ) + 's';
    }

    // css-sample-2
    elem = document.querySelector('#css-sample-2');
    for ( let no = 0; no < elem.children.length; no++ ) {
        // setTimeout( function() {
        //     elem.children[no].classList.add('show');
        // }, 100*no );
        elem.children[no].style.animationDelay = ( 0.2*no ) + 's';
    }

});
