//////////////////////////////////////////////////
//  DOM読み込み後に実行
document.addEventListener('DOMContentLoaded', function() {
    
    // const wsInertialScroll = new MomentumScroll('#inertial-scroll', 0.05);

    const wsInertialScroll = new WsInertialScroll('ws-inertial-scroll');

});





// 以下はオリジナルのコード
// https://qiita.com/nishinoshake/items/f6cbe1cc81d1c179cf0d
// 
class MomentumScroll {
    constructor(selector, speed = 0.1) {
        this.container = document.querySelector(selector)
        this.scrollY = 0
        this.translateY = 0
        this.speed = speed
        this.rafId = null
        this.isActive = false

        this.scrollHandler = this.scroll.bind(this)
        this.resizeHandler = this.resize.bind(this)

        this.run()
    }

    run() {
        if (this.isActive) {
            return
        }

        this.isActive = true

        this.on()
        this.setStyles()
    }

    destroy() {
        if (!this.isActive) {
            return
        }

        this.isActive = false

        this.off()
        this.clearStyles()

        if (this.rafId) {
            cancelAnimationFrame(this.rafId)
        }

        this.rafId = null
    }

    resize() {
        document.body.style.height = `${this.container.clientHeight}px`
    }

    scroll() {
        this.scrollY = window.scrollY || window.pageYOffset

        if (!this.rafId) {
            this.container.style.willChange = 'transform'
            this.rafId = requestAnimationFrame(() => this.render())
        }
    }

    on() {
        this.resize()
        this.scroll()
        window.addEventListener('scroll', this.scrollHandler, { passive: true })
        window.addEventListener('resize', this.resizeHandler)
        window.addEventListener('load', this.resizeHandler)
    }

    off() {
        window.removeEventListener('scroll', this.scrollHandler)
        window.removeEventListener('resize', this.resizeHandler)
        window.removeEventListener('load', this.resizeHandler)
    }

    setStyles() {
        this.container.style.position = 'fixed'
        this.container.style.width = '100%'
        this.container.style.top = 0
        this.container.style.left = 0
    }

    clearStyles() {
        document.body.style.height = ''
        this.container.style.position = ''
        this.container.style.width = ''
        this.container.style.top = ''
        this.container.style.left = ''
        this.container.style.transform = ''
        this.container.style.willChange = ''
    }

    render() {
        const nextY = this.translateY + (this.scrollY - this.translateY) * this.speed    
        const isNear = Math.abs(this.scrollY - nextY) <= 0.1

        this.translateY = isNear ? this.scrollY : nextY

        const roundedY = Math.round(this.translateY * 100) / 100

        this.container.style.transform = `translate3d(0, -${roundedY}px, 0)`

        if (isNear) {
            this.rafId = null
            this.container.style.willChange = ''
        } else {
            this.rafId = requestAnimationFrame(() => this.render())
        }
    }
}





////////////////////////////////////////////////////////////
//  class WsInertialScroll
//  慣性スクロールのためのクラス
//  new WsInertialScroll(id) により完成スクロールを設定
class WsInertialScroll {

    //// コンストラクタ
    constructor( domID, speed = 0.1 ) {
        // パラメータ設定
        this.setID(domID);
        this.setSpeed(speed);
        // this.target     = document.getElementById(domID);
        // this.speed      = speed;

        // 初期値設定
        this.scrollY    = 0;
        this.translateY = 0;
        this.refreshID  = null;
        this.isRunning  = false;

        // イベント（スクロールとリサイズ）処理をクラス関数に割り当て
        this.scrollEvent = this.scrollFunc.bind(this);
        this.resizeEvent = this.resizeFunc.bind(this);

        // 慣性スクロール開始
        this.start();
    }

    //// 対象の要素を設定
    setID(domID) {
        this.target = document.getElementById(domID);
    }

    //// 慣性の速度を設定
    //   1以下の値とする：大きいときびきび，小さいともっさり
    setSpeed(speed) {
        this.speed = speed;
    }

    //// 慣性スクロールの開始
    start() {
        // 実行中ならやめる
        if ( this.isRunning ) {
            return;
        }

        // 対象がなければやめる
        if ( !this.target ) {
            return;
        }

        // 実行中フラグをたてる
        this.isRunning = true;

        // 初回の実行とイベント設定
        this.setStart();

        // 慣性スクロール用にスタイル設定
        this.setStyle();
    }

    //// デストラクタ
    destroy() {
        // 実行していないならやめておく
        if ( !this.isRunning ) {
            return;
        }

        // 実行中フラグをおろす
        this.isRunning = false;

        // イベントを削除
        this.setFinish();

        // スタイルを戻す
        this.clearStyle();

        // 描画リフレッシュ処理を停止
        if ( this.refreshID ) {
            cancelAnimationFrame(this.refreshID);
        }
        this.refreshID = null;
    }

    // 画面リサイズイベント
    resizeFunc() {
        // 対象DOMの高さとbodyの高さを等しく設定
        document.body.style.height = this.target.clientHeight + 'px';
    }

    // スクロールイベント
    scrollFunc() {
        this.scrollY = window.scrollY; // || window.pageYOffset

        if ( !this.refreshID ) {
            // ブラウザに変化する項目を教えてあげる
            this.target.style.willChange = 'transform';
            // ウィンドウ再描画処理を設定
            this.refreshID = requestAnimationFrame( function() {
                this.runScroll();
            }.bind(this) );
        }
    }

    // 開始処理
    setStart() {
        // イベント処理を初回だけ実行
        this.resizeFunc();
        this.scrollFunc();
        // イベント処理を設定
        window.addEventListener('scroll', this.scrollEvent);
        window.addEventListener('resize', this.resizeEvent);
        window.addEventListener('load',   this.resizeEvent);
    }

    // 終了処理
    setFinish() {
        // イベント処理を削除
        window.removeEventListener('scroll', this.scrollEvent);
        window.removeEventListener('resize', this.resizeEvent);
        window.removeEventListener('load',   this.resizeEvent);
    }

    // 慣性スクロール用にスタイルを設定
    setStyle() {
        this.target.style.position = 'fixed';
        this.target.style.width    = '100%';
        this.target.style.top      = 0;
        this.target.style.left     = 0;
    }

    // スタイルを戻す
    clearStyle() {
        document.body.style.height   = '';
        this.target.style.position   = '';
        this.target.style.width      = '';
        this.target.style.top        = '';
        this.target.style.left       = '';
        this.target.style.transform  = '';
        this.target.style.willChange = '';
    }

    // ずりずりっとスクロールさせる
    runScroll() {
        // スピード設定をもとに，実際のスクロールと現在の位置を参照しつつ，次の位置を計算
        const nextPosY = this.translateY + ( this.scrollY - this.translateY ) * this.speed;
        // 一定範囲に入ったら終了させる
        const isFinish = ( Math.abs( this.scrollY - nextPosY ) <= this.speed );

        // 位置を計算する：終了しているならスクロール位置を一致させる
        this.translateY = ( isFinish ? this.scrollY : nextPosY );

        // const roundedY = Math.round(this.translateY * 100) / 100;
        // this.target.style.transform = `translate3d(0, -${roundedY}px, 0)`;

        this.target.style.transform = 'translateY( -' + this.translateY + 'px )';

        if ( isFinish ) {
            // 終了処理
            this.refreshID = null;
            this.target.style.willChange = '';
        }
        else {
            // 再描画処理
            this.refreshID = requestAnimationFrame( function() {
                this.runScroll();
            }.bind(this) );
        }
    }
}
