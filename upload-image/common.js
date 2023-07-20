//// あ ドキュメント読み終わったら実行
document.addEventListener('DOMContentLoaded', function() {

    let imgElem  = document.getElementById('upload-img');
    let fileElem = document.getElementById('file-form');
    let nameElem = document.getElementById('file-name');

    if ( imgElem && fileElem ) {
        fileElem.addEventListener('change', function(event) {
            let reader = new FileReader();
            reader.addEventListener('load', function(e) {
                imgElem.src = e.target.result;
            });
            reader.readAsDataURL(event.target.files[0]);
            if ( nameElem ) {
                nameElem.textContent = event.target.files[0].name;
            }
        });
    }

    let btnElem = document.getElementById('clear-btn');
    if ( imgElem && btnElem ) {
        btnElem.addEventListener('click', function() {
            imgElem.src = './blank.png';
        });
    }

});
