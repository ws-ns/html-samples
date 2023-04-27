//// jQueryなしでアコーディオンアニメーション
// あ


// ドキュメント読み終わったら実行
document.addEventListener('DOMContentLoaded', function() {

    var buttons = document.querySelectorAll('.ws-tab-button');

    if ( buttons && buttons.length > 0 ) {
        for ( var i = 0 ; i < buttons.length ; i++ ) {

            buttons[i].addEventListener('click', function() {
                var tabid;
                if ( !this.classList.contains('active') ) {
                    for ( j = 0 ; j < this.parentNode.children.length ; j++ ) {
                        this.parentNode.children[j].classList.remove('active');
                    }
                    this.classList.add('active');

                    var tabid = this.dataset.tabid;

                    var contents = this.parentNode.nextElementSibling.children;
                    if ( contents && contents.length > 0 ) {
                        for ( var k = 0 ; k < contents.length ; k++ ) {
                            if ( contents[k].dataset.tabid == tabid ) {
                                contents[k].classList.add('active');
                            }
                            else {
                                contents[k].classList.remove('active');
                            }
                        }
                    }
                }
            });

        }
    }

});
