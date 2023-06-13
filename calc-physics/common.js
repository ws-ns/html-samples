////////////////////////////////////////////////////////////
//  物理計算javascript
//  最終更新日時 : 2023年 6月13日(火) 13時49分53秒
//  あ


////////// 定義
// 小数点以下の桁数
const _g_ws_decimal_point = 5;


////////// 計算処理
function runCalc() {
    let elem;
    let val_a = 0.0;
    let val_time = 0.0;
    let val_dist = 0.0;
    let val_v_first_ms = 0.0 ;
    let val_v_first_kmh = 0.0;
    let val_v_final_ms = 0.0 ;
    let val_v_final_kmh = 0.0;

    // 加速度を取得
    elem = document.getElementById('val-a');
    if ( elem ) {
        val_a = parseFloat(elem.value);
        document.getElementById('ws-result-val-a').innerHTML = '加速度 : ' + val_a.toFixed(_g_ws_decimal_point) + ' m/s<sup>2</sup>';
    }

    // 初速を取得
    elem = document.getElementById('val-velocity-first-ms');
    if ( elem && parseFloat(elem.value) !== 0.0 ) {
        val_v_first_ms = parseFloat(elem.value);
        val_v_first_kmh = val_v_first_ms * 3.6;
    }
    else {
        elem = document.getElementById('val-velocity-first-kmh');
        if ( elem ) {
            val_v_first_kmh = parseFloat(elem.value);
            val_v_first_ms = val_v_first_kmh / 3.6;
        }
    }
    document.getElementById('ws-result-val-v0').innerHTML = '初速 : ' + val_v_first_ms.toFixed(_g_ws_decimal_point) + ' m/s (' + (val_v_first_ms*3.6).toFixed(1)+'km/h)';

    // 経過時間が入力されていたら
    elem = document.getElementById('val-time');
    if ( elem && elem.value != '' && parseFloat(elem.value) > 0.0 ) {
        val_time = parseFloat(elem.value);

        val_dist        = val_v_first_ms * val_time + 0.5 * val_a * val_time * val_time;
        val_v_final_ms  = val_v_first_ms + val_a * val_time;
        val_v_final_kmh = val_v_final_ms * 3.6;

        document.getElementById('ws-result-val-t').innerHTML = '時間 : ' + val_time.toFixed(_g_ws_decimal_point) + ' sec';
        document.getElementById('ws-result-val-v').innerHTML = '最終速度 : ' + val_v_final_ms.toFixed(_g_ws_decimal_point) + ' m/s (' + (val_v_final_ms*3.6).toFixed(1)+'km/h)';
        document.getElementById('ws-result-val-d').innerHTML = '距離 : ' + val_dist.toFixed(_g_ws_decimal_point) + ' m';

        elem = document.getElementById('val-distance');
        if ( elem ) {
            elem.value = val_dist.toFixed(_g_ws_decimal_point);
        }
        elem = document.getElementById('val-velocity-final-ms');
        if ( elem ) {
            elem.value = val_v_final_ms.toFixed(_g_ws_decimal_point);
        }
        elem = document.getElementById('val-velocity-final-kmh');
        if ( elem ) {
            elem.value = val_v_final_kmh.toFixed(_g_ws_decimal_point);
        }

        return;
    }

    // 距離が入力されていたら
    elem = document.getElementById('val-distance');
    if ( elem && elem.value != '' && parseFloat(elem.value) > 0.0 ) {
        val_dist = parseFloat(elem.value);

        val_v_final_ms  = Math.sqrt( val_v_first_ms * val_v_first_ms + 2.0 * val_a * val_dist );
        val_v_final_kmh = val_v_final_ms * 3.6;
        val_time        = ( val_v_final_ms - val_v_first_ms ) / val_a;

        document.getElementById('ws-result-val-t').innerHTML = '時間 : ' + val_time.toFixed(_g_ws_decimal_point) + ' sec';
        document.getElementById('ws-result-val-v').innerHTML = '最終速度 : ' + val_v_final_ms.toFixed(_g_ws_decimal_point) + ' m/s (' + (val_v_final_ms*3.6).toFixed(1)+'km/h)';
        document.getElementById('ws-result-val-d').innerHTML = '距離 : ' + val_dist.toFixed(_g_ws_decimal_point) + ' m';

        elem = document.getElementById('val-time');
        if ( elem ) {
            elem.value = val_time.toFixed(_g_ws_decimal_point);
        }
        elem = document.getElementById('val-velocity-final-ms');
        if ( elem ) {
            elem.value = val_v_final_ms.toFixed(_g_ws_decimal_point);
        }
        elem = document.getElementById('val-velocity-final-kmh');
        if ( elem ) {
            elem.value = val_v_final_kmh.toFixed(_g_ws_decimal_point);
        }

        return;
    }

    // 最終速度が入力されていたら
    elem = document.getElementById('val-velocity-final-ms');
    if ( elem && elem.value != '' && parseFloat(elem.value) > 0.0 ) {
        val_v_final_ms = parseFloat(elem.value);
        val_v_final_kmh = val_v_final_ms * 3.6;

        val_time = ( val_v_final_ms - val_v_first_ms ) / val_a;
        val_dist = val_v_first_ms * val_time + 0.5 * val_a * val_time * val_time;

        document.getElementById('ws-result-val-t').innerHTML = '時間 : ' + val_time.toFixed(_g_ws_decimal_point) + ' sec';
        document.getElementById('ws-result-val-v').innerHTML = '最終速度 : ' + val_v_final_ms.toFixed(_g_ws_decimal_point) + ' m/s (' + (val_v_final_ms*3.6).toFixed(1)+'km/h)';
        document.getElementById('ws-result-val-d').innerHTML = '距離 : ' + val_dist.toFixed(_g_ws_decimal_point) + ' m';

        elem = document.getElementById('val-time');
        if ( elem ) {
            elem.value = val_time.toFixed(_g_ws_decimal_point);
        }
        elem = document.getElementById('val-distance');
        if ( elem ) {
            elem.value = val_dist.toFixed(_g_ws_decimal_point);
        }

        return;
    }

    return;
}


////////// 入力欄を初期化
function runReset() {
    let elem;

    // 初速
    elem = document.getElementById('val-velocity-first-ms');
    if ( elem ) {
        elem.value = '0.0';
    }

    // 経過時間
    elem = document.getElementById('val-time');
    if ( elem ) {
        elem.value = '';
    }

    // 距離
    elem = document.getElementById('val-distance');
    if ( elem ) {
        elem.value = '';
    }

    // 最終速度
    elem = document.getElementById('val-velocity-final-ms');
    if ( elem ) {
        elem.value = '';
    }
    elem = document.getElementById('val-velocity-final-kmh');
    if ( elem ) {
        elem.value = '';
    }

    return;
}


////////// DOM読み込み後
document.addEventListener('DOMContentLoaded', function() {

    let first_ms  = document.getElementById('val-velocity-first-ms');
    let first_kmh = document.getElementById('val-velocity-first-kmh');
    if ( first_ms && first_kmh ) {
        first_ms.addEventListener('input', function() {
            if ( this.value != '' ) {
                let ms  = parseFloat(this.value);
                let kmh = ms * 3.6;
                first_kmh.value = kmh.toFixed(_g_ws_decimal_point);
            }
        });
        first_kmh.addEventListener('input', function() {
            if ( this.value != '' ) {
                let kmh = parseFloat(this.value);
                let ms  = kmh / 3.6;
                first_ms.value = ms.toFixed(_g_ws_decimal_point);
            }
        });
    }

    let final_ms  = document.getElementById('val-velocity-final-ms');
    let final_kmh = document.getElementById('val-velocity-final-kmh');
    if ( final_ms && final_kmh ) {
        final_ms.addEventListener('input', function() {
            if ( this.value != '' ) {
                let ms  = parseFloat(this.value);
                let kmh = ms * 3.6;
                final_kmh.value = kmh.toFixed(_g_ws_decimal_point);
            }
        });
        final_kmh.addEventListener('input', function() {
            if ( this.value != '' ) {
                let kmh = parseFloat(this.value);
                let ms  = kmh / 3.6;
                final_ms.value = ms.toFixed(_g_ws_decimal_point);
            }
        });
    }
    
    let elems = document.querySelectorAll('input[type="number"]');
    if ( elems && elems.length > 0 ) {
        for ( let i = 0; i < elems.length; i++ ) {
            elems[i].addEventListener('keydown', function(e) {
                // エンターキー
                if ( e.keyCode == 13 ) {
                    runCalc();
                }
                // ESCキー
                if ( e.keyCode == 27 ) {
                    runReset();
                }
            });
        }
    }

});
