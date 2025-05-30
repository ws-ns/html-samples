/**
 * 定義
 */
var _g_ws_map_pos = [
    [ '栄',   36.4, 41.7, 42.3, 47.9 ],
    [ '今池', 52.3, 42.4, 59.2, 47.7 ],
];


/**
 * DOM読み込み後に実行
 */
document.addEventListener('DOMContentLoaded', function() {

    let nowpos    = document.getElementById('nowpos');
    let result    = document.getElementById('result');
    let mark      = document.getElementById('map-mark');
    let highlight = document.getElementById('map-highlight');
    let map       = document.getElementById('map');

    if ( nowpos && result && mark && highlight && map ) {

        map.addEventListener('mousemove', function(e) {
            const mapW = map.offsetWidth;
            const mapH = map.offsetHeight;
            const x = e.offsetX;
            const y = e.offsetY;
            const xPos = (100.0*x/mapW);
            const yPos = (100.0*y/mapH);
            nowpos.textContent = 'x='+x+'('+xPos.toFixed(1)+'%), y='+y+'('+yPos.toFixed(1)+'%)';

            let flag = false;
            _g_ws_map_pos.forEach( (arr) => {
                if ( xPos >= arr[1] && yPos >= arr[2] && xPos <= arr[3] && yPos <= arr[4] ) {
                    flag = true;
                    highlight.style.left = arr[1]+'%';
                    highlight.style.top  = arr[2]+'%';
                    highlight.style.width  = (arr[3]-arr[1])+'%';
                    highlight.style.height = (arr[4]-arr[2])+'%';
                    return;
                }
            });
            document.body.style.cursor = ( flag ? 'pointer' : 'auto' );
            if ( !flag ) {
                highlight.style.left = '0';
                highlight.style.top  = '0';
                highlight.style.width  = '0';
                highlight.style.height = '0';
            }
        });

        map.addEventListener('mouseleave', function(e) {
            nowpos.textContent = '';
        });

        map.addEventListener('click', function(e) {
            const mapW = map.offsetWidth;
            const mapH = map.offsetHeight;
            const x = e.offsetX;
            const y = e.offsetY;
            const xPos = (100.0*x/mapW);
            const yPos = (100.0*y/mapH);

            _g_ws_map_pos.forEach( (arr) => {
                if ( xPos >= arr[1] && yPos >= arr[2] && xPos <= arr[3] && yPos <= arr[4] ) {
                    result.textContent = arr[0];

                    mark.style.left = arr[1]+'%';
                    mark.style.top  = arr[2]+'%';
                    mark.style.width  = (arr[3]-arr[1])+'%';
                    mark.style.height = (arr[4]-arr[2])+'%';
                }
            });
        });

        mark.addEventListener('click', function() {
            result.textContent = '';
            mark.style.left = '0';
            mark.style.top  = '0';
            mark.style.width  = '0';
            mark.style.height = '0';
        });
    }

});
