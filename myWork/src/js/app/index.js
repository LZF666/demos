　　
require.config({
    baseUrl: "./src/js",
    　　　　paths: {

        　　　　　　
        "jquery": "lib/jquery/jquery-3.3.1.min"　　　　　　　　
    }

    　　
});　
require(['jquery', 'com/carousel', 'com/exposure', 'com/goTop'], function ($, Carousel, Exposure, GoTop) {

    　　　　
    Carousel.init($('.carousel'));
    new Exposure();
    GoTop.init($('.top'));　　
});
