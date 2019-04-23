import $ from 'jquery';
import {InputValidator} from './tarifSectionScripts/InputValidator';
            /*===============================
                    TARIF SECTION
            ===========================*/
    $('#tarifSubmitButton').click(() => {
                   /*setting up inputValidator script*/
        InputValidator();
    });

              /*setting up express tooltip*/
    import {expressTooltip} from './tarifSectionScripts/expressTooltip';
    /**
     * @htmlIdetifier string : html element to get by jquery to display tooltip one mouse over
     */
    expressTooltip("[data-toggle='tooltip']");
            /*===============================
                    TARIF SECTION
            ===========================*/
