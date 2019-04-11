import $ from 'jquery';
            /*===============================
                    TARIF SECTION
            ===========================*/

               /*setting up clean input script*/
    import {cleanInput} from './tarifSectionScripts/cleanInput';
    cleanInput();

              /*setting up express tooltip*/
    import {expressTooltip} from './tarifSectionScripts/expressTooltip';
    /**
     * @htmlIdetifier string : html element to get by jquery to display tooltip one mouse over
     */
    expressTooltip("[data-toggle='tooltip']");
            /*===============================
                    TARIF SECTION
            ===========================*/
