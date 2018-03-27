define(['jquery'],function($){
    function Exposure() {
        this.curPage = 1
        this.perPageCount = 12
        this.colSumHeight = []
        this.nodeWidth = $('.item').outerWidth(true)
    
        this.$load = $('#load')
        this.$picCt = $('#pic-ct')
        // console.log(this.$picCt.offset().top)
        this.colNum = parseInt(this.$picCt.width() / this.nodeWidth) //获取列数
        
        for (var i = 0; i < this.colNum; i++) {
            this.colSumHeight[i] = 0
        } //初始化数组
        this.isDataArrive = true
        this.start()
        this.bind()

    }
    Exposure.prototype.start = function () {
        var _this = this
        
        this.getData(function (newsList) {
            _this.isDataArrive = true
            $.each(newsList, function (idx, news) {
                var $node = _this.getNode(news) //获取每个节点
                // console.log(idx)
                $node.find('img').on('load', function () {
                    _this.$picCt.append($node) //先放上去
                    _this.waterFallPlace($node) //再去瀑布流
                })
            })
        })
        _this.isDataArrive = false
    }
    Exposure.prototype.bind = function () {
        var clock;
        var _this = this;
        this.$load.on('click', function () {
            // console.log("111")
            _this.start()

        })
    }

    Exposure.prototype.getData = function (callback) {
        var _this = this
        $.ajax({
            url: '//platform.sina.com.cn/slide/album_tech',
            //这里使用； 新浪新闻的jsonp接口，如：
            //http://platform.sina.com.cn/slide/album_tech?jsoncallback=func&app_key=1271687855&num=3&page=4

            dataType: 'jsonp',
            jsonp: "jsoncallback",
            data: {
                app_key: '1271687855',
                num: _this.perPageCount, //一页要多少数据
                page: _this.curPage //页数
            }
        }).done(function (ret) {
            if (ret && ret.status && ret.status.code === "0") {
                callback(ret.data); //如果数据没问题，那么生成节点并摆放好位置
                _this.curPage++
            } else {
                console.log('get error data');
            }
        })
    }
    Exposure.prototype.getNode = function (item) {
        var tpl = ''
        tpl += '<li class="item">';
        tpl += ' <a href="' + item.url + '" class="link"><img src="' + item.img_url + '" alt=""></a>';
        tpl += ' <h4 class="header">' + item.short_name + '</h4>';
        tpl += '<p class="desp">' + item.short_intro + '</p>';
        tpl += '</li>';
        return $(tpl)
    }

    Exposure.prototype.waterFallPlace = function ($node) {
        var idx = 0,
            minSumHeight = this.colSumHeight[0];
            // console.log(minSumHeight)

        minSumHeight = Math.min.apply(null, this.colSumHeight) //获取数组的最小值
        idx = this.colSumHeight.indexOf(minSumHeight) //获取最小值的下标


        $node.css({
            left: this.nodeWidth * idx,
            top: minSumHeight,
            opacity: 1
        });

        this.colSumHeight[idx] = $node.outerHeight(true) + this.colSumHeight[idx];
        this.$picCt.height(Math.max.apply(null, this.colSumHeight)); 
    }
    
    return Exposure;
})
