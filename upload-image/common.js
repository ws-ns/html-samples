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

    let dropZone = document.getElementById('drop-area');
    if ( dropZone && fileElem ) {
        dropZone.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.style.background = '#ff01';
            this.style.border = '4px dashed #f008';
        });
        dropZone.addEventListener('dragleave', function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.style.background = '#0001';
            this.style.border = '4px dashed #0002';
        });
        dropZone.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.style.background = '#0001';
            this.style.border = '4px dashed #0002';
            let files = e.dataTransfer.files;
            fileElem.files = files;
            if ( imgElem ) {
                let reader = new FileReader();
                reader.addEventListener('load', function(e) {
                    imgElem.src = e.target.result;
                });
                reader.readAsDataURL(e.target.files[0]);
            }
            if ( nameElem ) {
                nameElem.textContent = files[0].name;
            }
        });
    }

});
