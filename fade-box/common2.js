//// jQueryなしでアコーディオンアニメーション
// あ


//// アコーディオンクラスを定義
class wsAccordion {

    target  = null;
    button  = null;
    nowH    = 0;
    startH  = 0;
    finalH  = 0;
    preTime = 0;

    // コンストラクタ
    constructor( button ) {
        this.setButton(button);
    }

    // ボタンのDOMを設定
    setButton( button ) {
        let $this = this;
        $this.button = button;

        $this.button.addEventListener( 'click', (e) => {

            // アコーディオンするターゲット
            $this.target = $this.button.parentNode;

            // 隠れているテキストを含めた高さを取得
            var tmpDiv = document.createElement('div');
            tmpDiv.classList.add('ws-fade-box');
            tmpDiv.setAttribute('style', 'visibility: hidden');
            tmpDiv.innerHTML = $this.target.innerHTML;

            // $this.target.parentNode.insertBefore(tmpDiv, $this.target);
            $this.target.parentNode.appendChild(tmpDiv);
            var w = tmpDiv.offsetWidth;
            var h = tmpDiv.offsetHeight;
            // $this.target.parentNode.removeChild(tmpDiv);
            $this.target.parentNode.removeChild(tmpDiv);

            // フェードボックスを開くアニメーションを開始
            $this.startH  = $this.target.offsetHeight;
            $this.finalH  = h;
            $this.preTime = performance.now();
            $this.openBox( $this ); // 開始
        });
    }

    // ボックスを開く
    openBox( $this ) {
        var nowTime = performance.now();
        var diffTime = nowTime - $this.preTime;

        $this.preTime = nowTime;

        // 開始〜終了のうち現在位置 Start=0.0, Final=1.0
        // 0.5秒で実行
        var rate = diffTime / 1000.0 / 0.5;

        // フェードボックスの高さを計算
        $this.nowH   = $this.target.offsetHeight;
        $this.nowH   += ( $this.finalH - $this.startH ) * rate;
        if ( $this.nowH > $this.finalH ) $this.nowH = $this.finalH;

        // フェードボックスの高さ設定
        $this.target.style.height = $this.nowH+'px';

        // ボタンをぼやっと消す
        $this.button.style.opacity = ( 1.0 - rate < 0.0 ? 1.0 - rate : 0.0 );

        // 終了判定
        if ( $this.nowH < $this.finalH ) {
            // まだアニメーション中
            window.requestAnimationFrame( function(){ $this.openBox($this) } );
        }
        else {
            // 終了したのでクラスを消す（cssでボタンとグラデーションが消える）
            $this.target.classList.remove('ws-fade');
            $this.target.style.height = 'auto';
        }
    }

}



// ドキュメント読み終わったら実行
document.addEventListener('DOMContentLoaded', function() {
    var accordion = new wsAccordion( document.getElementById('ws-more-button-1') );
});
