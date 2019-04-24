import $ from 'jquery';

const tarifSectionInputs = $('.tarifInput');
const tarifSubmitButton = $('#tarifSubmitButton');

tarifSectionInputs.on('input propertychange', (event) => {
    if(event.target.value !== ""){
        tarifSubmitButton.removeClass('disabled')
    }else{
        tarifSubmitButton.addClass('disabled')
    }
});

export {tarifSectionInputs};