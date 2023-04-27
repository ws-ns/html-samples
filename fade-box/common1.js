//// jQueryなしでアコーディオンアニメーション
// あ


// ドキュメント読み終わったら実行
document.addEventListener('DOMContentLoaded', function() {
    var elem = document.getElementById('more-button');
    elem.addEventListener('click', function(e) {
        let $this = this;
        let $parent = $this.parentNode;

        // 隠れているテキストを含めた高さを取得
        var test = document.createElement('div');
        test.classList.add('fade-box');
        test.setAttribute('style', 'visibility: hidden');
        test.innerHTML = document.getElementById('test').innerHTML;
        document.body.appendChild(test);
        var w = test.offsetWidth;
        var h = test.offsetHeight;
        document.body.removeChild(test);

        // フェードボックスを開くアニメーションを開始
        _target  = $parent;
        _button  = $parent.querySelectorAll('.more-button')[0];
        _startH  = $parent.offsetHeight;
        _finalH  = h;
        _preTime = performance.now();
        _step    = ( _finalH - _nowH ) / 60.0 / 0.5;
        openBox(); // 開始
    });
});

// フェードボックスをアニメーションで拡大表示しつつ，ボタンを消す
var _target  = null;
var _button  = null;
var _nowH    = 0;
var _startH  = 0;
var _finalH  = 0;
var _step    = 0;
var _preTime = 0;
function openBox() {
    var nowTime = performance.now(),
        diffTime = nowTime - _preTime;

    _preTime = nowTime;

    var rate = diffTime / 1000.0 / 0.5; // 開始〜終了のうち現在位置 Start=0.0, Final=1.0

    // フェードボックスの高さを計算
    _nowH   = _target.offsetHeight;
    _nowH   += ( _finalH - _startH ) * rate;
    if ( _nowH > _finalH ) _nowH = _finalH;

    // フェードボックスの高さ設定
    _target.style.height = _nowH+'px';

    // ボタンをぼやっと消す
    _button.style.opacity = Math.min( 0.0, 1.0 - rate );

    // 終了判定
    if ( _nowH < _finalH ) {
        // まだアニメーション中
        window.requestAnimationFrame(openBox);
    }
    else {
        // 終了したのでクラスを消す（cssでボタンとグラデーションが消える）
        _target.classList.remove('fade');
        _target.style.height = 'auto';
    }
}
