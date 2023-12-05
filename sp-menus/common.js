"use strict";

/**
 * メニューの名称
 */
let _g_menu_list = [
    '上から下に降りるメニュー',
    '右から左にスライドするメニュー',
    '右からひょっこり現れるメニュー',
    '右から左に拡大するメニュー',
    '左下に伸びて現れるメニュー',
    '左右に開いて現れるメニュー',
    'ぼやっと現れるメニュー',
    'くるくるっと現れるメニュー',
    'ちょっと立体的に現れるメニュー',
    '立体的に上下にくるくる現れるメニュー',
    '立体的に左右ににくるくる現れるメニュー',
    'なぜか下から現れるメニュー',
    '下から広がりながら現れるメニュー',
    'なぜか左から現れるメニュー',
    '右から全画面で現れるメニュー',
    '上から全画面で現れるメニュー',
    '中央から全画面で現れるメニュー',
    '右上から全画面でスライドするメニュー',
];


/**
 * ドキュメント読み込み完了後に実行
 */
document.addEventListener('DOMContentLoaded', function() {

    // メニューを表示する欄を生成
    let spArea = document.getElementById('sp-area');
    if ( spArea ) {
        for ( let no = 1 ; no <= _g_menu_list.length ; no++ ) {
            let spView = document.createElement('div');
            spView.setAttribute('class', 'sp-view');
            spView.setAttribute('id', `sp${no}`);
            let html =
                '<header>' +
                '<input type="checkbox" id="sp'+no+'-btn" class="sp-menu-check" />' +
                '<nav class="sp-menu-btn">' +
                '<label for="sp'+no+'-btn" class="sp-menu-btn-label">' +
                '<div class="sp-menu-btn-icon"></div>' +
                '</label>' +
                '</nav>' +
                '<nav class="sp-menu">' +
                '<a href="#">メニュー1</a>' +
                '<a href="#">メニュー2</a>' +
                '<a href="#">メニュー3</a>' +
                '<a href="#">メニュー4</a>' +
                '<a href="#">メニュー5</a>' +
                '</nav>'+
                '</header>';
            if ( _g_menu_list[no-1] ) {
                html += '<div class="sp-desc">'+_g_menu_list[no-1]+'</div>';
            }
            spView.innerHTML = html;
            spArea.appendChild(spView);
        }
    }

    // 速さ
    let radioBtns = document.querySelectorAll('input[name="ws-speed"]');
    if ( radioBtns && radioBtns.length > 0 ) {
        for ( let radioBtn of radioBtns ) {
            radioBtn.addEventListener('click', function() {
                let speed = this.value;
                document.documentElement.style.setProperty('--speed', speed);
            });
        }
    }
});
