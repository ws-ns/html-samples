//// jQueryなし
// あ


// ドキュメント読み終わったら実行
document.addEventListener('DOMContentLoaded', function() {

    // const styleElem = document.createElement('style');
    // document.head.appendChild(styleElem);
    // const sheet = styleElem.sheet;

    // for ( no = 0 ; no < 40 ; no++ ) {
    //     sheet.insertRule( '.ws-parapara > span:nth-child('+(no+1)+') { animation-delay: '+(0.20*no).toFixed(2)+'s !important; } ' );
    // }


    let elem, elems;

    // css-sample-appear-1
    elems = document.querySelectorAll('#css-sample-appear-1 span');
    if ( elems && elems.length > 0 ) {
        for ( let no = 0; no < elems.length; no++ ) {
            elems[no].style.animationDelay = ( 0.2*no ).toFixed(2) + 's';
        }
    }

    // css-sample-appear-2
    elems = document.querySelectorAll('#css-sample-appear-2 span');
    if ( elems && elems.length > 0 ) {
        for ( let no = 0; no < elems.length; no++ ) {
            elems[no].style.animationDelay = ( 0.2*no ).toFixed(2) + 's';
        }
    }

});
