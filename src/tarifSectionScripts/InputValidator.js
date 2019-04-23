import $ from 'jquery';

const InputValidator = () => {

    $('.inputToValidate').each( ( index, item ) => {
        if( $.trim(item.value )  === '' ) {

            /*
            const elementToScroll = $(item).parent()[0].id;
            const scrollPosition = $('#' + elementToScroll).offset().top + 100;

            console.log(scrollPosition);
            $('html, body').animate({scrollTop: scrollPosition}, 1000);

            //if empty input, scroll to the input then display him
            var empty_input = j$('#' + google_map_input[i].id);
            var scroll_position =  empty_input.offset().top - 110;
            j$('html, body').animate({scrollTop: scroll_position}, 1000);*/

            const inputEmptyError = $(item).parent().parent()[0].querySelector('.inputEmptyError');;
            inputEmptyError.style.height = "30px";

            //hidde the span error after 4.5sec
            setTimeout(function () {
                $('.inputEmptyError').each( (index, item) => {
                    item.style.height = "0";
                })
            }, 4500);
        }
    });

};

export {InputValidator};