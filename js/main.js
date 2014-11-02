
var cssTransform = (function () {
    var prefixes = 'transform webkitTransform mozTransform oTransform msTransform'.split(' '),
        el = document.createElement('div'),
        cssTransform, i = 0
    while (cssTransform === undefined) {
        cssTransform = document.createElement('div').style[prefixes[i]] != undefined ? prefixes[i] : undefined
        i++
    }
    return cssTransform
})();

var $window = $(window),
    $header = $('.header-container'),
    $main = $('.sonic-main'),
    $actions = $('.sonic-actions');

if ($actions.length) {
    var actions_top = $actions.offset().top;
    $actions.length && $window.on('scroll', scrollHandler);
}

var lastScrollTop = 0;

function scrollHandler(e) {
    var scroll_top = $window.scrollTop(),
        squeeze = 24,
        the_height = $actions.outerHeight(),
        down = scroll_top > lastScrollTop ? true : false;
    
    var setSqueeze = function (n) {
        $actions.removeClass('cleared paused');
        $actions[0].style[cssTransform] = 'scale3d(1, ' + n + ', 1) translate3d(0,0,0)';
    }
    
    var clearSqueeze = function () {
        if (!$actions.is('.cleared')) {
            $actions.addClass('cleared');
            $actions[0].style[cssTransform] = 'scale3d(1, 1, 1) translate3d(0,0,0)';
        }
    }
    
    if (scroll_top > actions_top - squeeze && scroll_top < actions_top + squeeze) {
        $actions.removeClass('animate');
        var t = 1;
        if (scroll_top > lastScrollTop) t = (the_height - scroll_top + actions_top) / the_height;
        else t = (the_height + actions_top - scroll_top) / the_height;
        
        if ((down && t < 1.0) || (!down && t > 1.0)) setSqueeze(t);
    } else {
        clearSqueeze();
        $actions.addClass('animate');
    }
    
    if (scroll_top > actions_top) {
        $actions.addClass('sticky');
        $actions.removeClass('transform-down');
    } else {
        $actions.removeClass('sticky');
        $actions.addClass('transform-down');
    }
    
    lastScrollTop = scroll_top;
}
scrollHandler();