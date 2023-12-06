/**
 * jQueryなしでアコーディオンアニメーション
 */


/**
 * アコーディオンクラスを定義
 *
 * @class WsAccordion
 */
class WsAccordion {

    target  = null;
    button  = null;
    speed   = 1000; // ミリ秒単位
    nowH    = 0;
    startH  = 0;
    finalH  = 0;
    preTime = 0;

    // コンストラクタ
    constructor( buttonID = null, targetID = null, speed = null ) {
        if ( speed ) this.setSpeed(speed);
        if ( targetID ) this.setTarget(targetID);
        if ( buttonID ) this.setButton(buttonID);
    }

    // 開閉スピード
    setSpeed( speed ) {
        let $this = this;
        $this.speed = speed;
    }

    // 開閉対象
    setTarget( targetID ) {
        let $this = this;
        $this.target = document.getElementById(targetID);
    }

    // ボタンのDOMを設定
    setButton( buttonID ) {
        let $this = this;
        $this.button = document.getElementById(buttonID);

        if ( !$this.button ) return;
        if ( !$this.target ) return;

        $this.button.addEventListener( 'click', (e) => {

            // アコーディオンするターゲット
            // $this.target = $this.button.parentNode;

            // 隠れているターゲットの本来の高さを取得
            let tmpDiv = document.createElement('div');
            tmpDiv.classList.add('ws-fade-box');
            tmpDiv.setAttribute('style', 'visibility: hidden');
            tmpDiv.innerHTML = $this.target.innerHTML;

            // $this.target.parentNode.insertBefore(tmpDiv, $this.target);
            $this.target.parentNode.appendChild(tmpDiv);
            let w = tmpDiv.offsetWidth;
            let h = tmpDiv.offsetHeight;
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
        let nowTime = performance.now();
        let diffTime = nowTime - $this.preTime;

        $this.preTime = nowTime;

        // 開始〜終了のうち現在位置 Start=0.0, Final=1.0
        // speedミリ秒で実行
        var rate = diffTime / $this.speed;

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
    var accordion = new WsAccordion( 'ws-more-button-1', 'ws-fade-box-1', 5000 );
});
