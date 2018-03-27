define(['jquery'],function($){
    var Carousel = (function () {
        function _Carousel($ct) {
            this.$ct = $ct;
            this.init();
            this.bind();
            this.autoPlay();
        }

        _Carousel.prototype.init = function () {
            var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
                $preBtn = this.$preBtn = this.$ct.find('.pre'),
                $nextBtn = this.$nextBtn = this.$ct.find('.next'),
                $bullet = this.$bullet = this.$ct.find('.bullet'),
                $bulletLi = this.$bulletLi=this.$ct.find('.bullet>li')
              

            var $firstImg = $imgCt.find('li').first(),
                $lastImg = $imgCt.find('li').last()

            this.curPageIndex = 0
            this.imgLength = $imgCt.children().length
            this.imgWidth = this.$ct.find('.img-ct>li').width()
            this.isAnimate = false
            this.$firstImg = $firstImg

            $imgCt.prepend($lastImg.clone())
            $imgCt.append($firstImg.clone())

            $imgCt.width($firstImg.width() * $imgCt.children().length)
            $imgCt.css({
                'left': '-1920px'
            })

        }

        _Carousel.prototype.bind = function () {
            var _this = this;
            this.$preBtn.on('click', function (e) {
                e.preventDefault();
                _this.playPre(1);
            })

            this.$nextBtn.on('click', function (e) {
                e.preventDefault();
                _this.playNext(1);
            })
            this.$bulletLi.on('click', function () {
                var index = $(this).index();
                console.log("index:"+index)
                if (index > _this.curPageIndex) {
                    _this.playNext(index - _this.curPageIndex);
                    _this.setBullet();
                } else if(index < _this.curPageIndex){
                    _this.playPre(_this.curPageIndex - index);
                    _this.setBullet();
                }
            })

        }

        _Carousel.prototype.playPre = function (len) {
            var _this = this;
            if (this.isAnimate) return;
            this.isAnimate = true;
            this.$imgCt.animate({
                left: '+=' + len * _this.imgWidth
            }, function () {
                _this.curPageIndex -= len;
                if (_this.curPageIndex < 0) {
                    _this.curPageIndex = _this.imgLength - 1
                    _this.$imgCt.css({
                        left: -_this.imgWidth * _this.imgLength
                    });

                }
                _this.isAnimate = false;
                _this.setBullet()
            })
        }
        _Carousel.prototype.playNext = function (len) {
            var _this = this;
            if (this.isAnimate) return;
            this.isAnimate = true;
            this.$imgCt.animate({
                left: '-=' + len * _this.imgWidth
            }, function () {
                _this.curPageIndex += len;
                // console.log("-:" + _this.curPageIndex)
                if (_this.curPageIndex === _this.imgLength) {
                    _this.curPageIndex = 0
                    _this.$imgCt.css({
                        'left': -_this.imgWidth
                    })
                }
                _this.isAnimate = false;
                _this.setBullet();
            })

        }
        _Carousel.prototype.setBullet = function () {
            var _this = this
            // console.log("bullet" + _this.curPageIndex)
            this.$bullet.children()
                .removeClass('active')
                .eq(_this.curPageIndex)
                .addClass('active')
        }
        _Carousel.prototype.autoPlay=function(){
            var _this = this
            clock = setInterval(function(){
            _this.playNext(1);
        },3000);
        }
        _Carousel.prototype.stopAuto=function(){
            clearInterval(clock);
        }

        return {
            init: function ($ct) {
                $ct.each(function (index, node) {
                    new _Carousel($(node));
                })

            }
        }
    })()
    return Carousel;
})
