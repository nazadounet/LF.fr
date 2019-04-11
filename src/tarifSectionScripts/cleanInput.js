import $ from 'jquery';

const cleanInput = () =>
    {
        //if there are input with enableClear class
        if($('input.enableClear').length > 0)
        {
            //get all input with enableClear class
            let allInputWithEnableClearOption = $('input.enableClear');

            //getting all button clearInput on the page and attach event to clean input value on click
            let allInputClearButton= $('.inputClearButton');
            allInputClearButton.each((index, htmlElement) => {

                //find throught the parent element the input to clean
                let currentInputClearButton = $(htmlElement).parent().find('input');
                $(htmlElement).click(() => {
                    currentInputClearButton.val('');
                    $(htmlElement).css('display', 'none');
                });
            });

            //add event on each input.
            // first, if on page load there still some data inside input, then imidiatly display inputclearButton
            allInputWithEnableClearOption.each((index, htmlElement) => {
                let currentInputClearButton = $(htmlElement).parent().find('span.inputClearButton');
                if(htmlElement.value !== ""){
                    currentInputClearButton.css('display', 'inherit');
                }

                // On change, the clear button will apear
                $(htmlElement).on('input', () => {
                    if (htmlElement.value !== "") {
                        currentInputClearButton.css('display', 'initial')
                    } else {
                        currentInputClearButton.css('display', 'none')
                    }
                })
            });
        }


    };

export {cleanInput};