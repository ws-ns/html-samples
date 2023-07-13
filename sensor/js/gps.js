//////////////////////////////////////////////////////////////////////
//	gps.js
//		GPSを取得できるデバイスで取得して表示
//		Last Change: Sat 25 February 2023  14:01:10
//////////////////////////////////////////////////////////////////////


var _gps_elem_ = false;

function startGPS(id) {
    _gps_elem_ = document.getElementById(id);
    if ( !_gps_elem_ ) return;

    if ( !navigator.geolocation ) {
	_gps_elem_.innerHTML = 'Geolocation 使用不可';
	return;
    }

    var option = {
	timeout : 10000
    }

    // GPSを自動更新
    navigator.geolocation.watchPosition( gpsHandler, gpsFault, option );

    // GPSを一回だけ取得
    // navigator.geolocation.getCurrentPosition( gpsHandler );

    return;
}

function gpsHandler(position) {
    if ( !_gps_elem_ ) return;
    
    var pos_list = [
        {
            lat:  35.184814536102465,
            lng:  136.89988448268775,
            name: '名古屋城',
        },
        {
            lat:  35.188965080343614,
            lng:  136.90168089784711,
            name: '名城公園',
        },
        {
            lat:  34.68729101706762, 
            lng:  135.5258693327305,
            name: '大阪城',
        },
        {
            lat:  41.79692108812837,
            lng:  140.75677986646812,
            name: '五稜郭',
        },
    ];

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var html = '';
    html += '<div> 《現在地》 </div>';
    html += '<div> 緯度 : ' + latitude + ' </div>';
    html += '<div> 経度 : ' + longitude + ' </div>';
    html += '<div><a href="https://maps.google.com/maps?ll='+latitude+','+longitude+'&z=16&q='+latitude+','+longitude+'" target="_blank">Google Map</a></div>'
    html += '<hr/>';

    var result_arr = new Array();
    for ( const arr of pos_list ) {
        var ret = calcDistanceAndDirection( latitude, longitude, arr.lat, arr.lng );
        result_arr.push( { distance: ret[0], degree: ret[1], name: arr.name } );
        // html += '<div> ' + arr.name + ' : 距離 = ' + ret[0].toFixed(2) + 'km, 方角 = ' + ret[1].toFixed(2) + 'deg </div>';
        // html += '<div class="compass"><div class="ns"></div><div class="we"></div><img class="needle" src="./images/needle.svg" style="transform: rotate('+ret[1]+'deg);" /></div>';
    }

    // 遠い順
    // result_arr.sort( (a, b) => {
    //     return a.distance > b.distance ? -1 : 1;
    // });

    // 近い順
    result_arr.sort( (a, b) => {
        return a.distance < b.distance ? -1 : 1;
    });

    for ( const arr of result_arr ) {
        html += '<div> ' + arr.name + ' : 距離 = ' + ( arr.distance >= 1.0 ? arr.distance.toFixed(2) + 'km' : (arr.distance*1000.0).toFixed(2) + 'm' ) + ', 方角 = ' + arr.degree.toFixed(2) + 'deg </div>';
        html += '<div class="compass"><div class="ns"></div><div class="we"></div><img class="needle" src="./images/needle.svg" style="transform: rotate('+arr.degree+'deg);" /></div>';
    }

    _gps_elem_.innerHTML = html;

    return;
}

function calcDistanceAndDirection( lat1, lng1, lat2, lng2 ) {
    var earth_r = 6378.137; // 地球半径km

    var distance, degree;
    
    distance = earth_r
        * Math.acos(
            Math.sin(Math.PI*lng1/180.0)*Math.sin(Math.PI*lng2/180.0)
                +Math.cos(Math.PI*lng1/180.0)*Math.cos(Math.PI*lng2/180.0)*Math.cos(Math.PI*(lat2-lat1)/180.0)
        );

    degree = -90.0
        + 180.0*
        Math.atan2(
            Math.sin(Math.PI*(lat2-lat1)/180.0),
            Math.cos(Math.PI*lng1/180.0)*Math.tan(Math.PI*lng2/180.0)
                -Math.sin(Math.PI*lng1/180.0)*Math.cos(Math.PI*(lat2-lat1)/180.0)
        )/Math.PI;
    while ( degree < 0 ) {
        degree += 360.0;
    }
    // if ( degree > 180.0 ) {
    //     degree -= 360.0;
    // }

    return [ distance, degree ];
}

function gpsFault(error) {
    if ( !_gps_elem_ ) return;
    _gps_elem_.innerHTML = 'Error: ' + error.code;
    return;
}
