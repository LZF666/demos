define(['jquery'], function($) {
   var GoTop = (function(){
    function goTop($target) {
        this.$target = $target;
        this.init();
        this.bind();
    }
    goTop.prototype = {

        bind: function () {
            var _this = this;
            this.$target.on('click', function () {
                $(window).scrollTop(0);
            })
        },

        init: function () {
            var _this = this
            $(window).on('scroll', function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > $(window).height()) {
                    _this.$target.show();
                } else {
                    _this.$target.hide();
                }
            })

        }
    }
    return {
        init:function($target){
            new goTop($target)
        }
    }
   })()
    return GoTop
    
});
