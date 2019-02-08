$( document ).ready(function() {

    $(window).scroll(function(){

        var currentScroll = Math.round($(this).scrollTop() / 2);

        if(currentScroll < 80){

            $('#header_image_logo').css({
                'margin-left' : '-' + currentScroll.toString() / 2 + 'px',
                'bottom' : '-' + currentScroll.toString() / 2 + 'px',
                'width' : currentScroll
            })
        }


    });

    console.log( "ready!" );
});