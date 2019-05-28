
    /*===============================

          Mobile side menu script

    ===========================*/

    var screen_width = $(window).width();
    var mobile_menu_overlay = $('#mobile_menu_overlay');
    var mobile_menu_content = $('#mobile_menu_content');
    var mobile_menu_close_icon = $('#mobile_close_menu_icon_container');
    $('.mobile_menu_icon').each(function(item){
        $(this).on('click', function (event) {
            //disable scroll on mobile
            $('#mobile_menu_overlay, #mobile_menu_content').on('touchmove scroll', function (e) {
                e.preventDefault();
            });
            //disable scroll on desktop
            $('body', 'html').css('overflow', 'hidden');
            if(screen_width <= 350){
                mobile_menu_overlay.css('width', screen_width);
                mobile_menu_content.css('width', '100%');
                console.log(mobile_menu_overlay.css('width'));
            }else{
                mobile_menu_overlay.css('width', screen_width);
                mobile_menu_content.css('width', '350px');
            }

        })
    });
    mobile_menu_close_icon.on('click', function () {
        //re-enable scroll on mobile
        $('#mobile_menu_overlay, #mobile_menu_content').off('touchmove', function (e) {
            e.preventDefault();
        });
        //re-enable scroll on desktop
        document.documentElement.style.overflow = "scroll";
        $('body', 'html').css('overflow', 'scroll');

        $('body').css('position', 'static');
        mobile_menu_overlay.css('width', 0);
        mobile_menu_content.css('width', 0);
    });
    mobile_menu_overlay.on('click', function () {
        //re-enable scroll on mobile
        $('#mobile_menu_overlay, #mobile_menu_content').off('touchmove', function (e) {
            e.preventDefault();
        });
        //re-enable scroll on desktop
        document.documentElement.style.overflow = "scroll";
        $('body', 'html').css('overflow', 'scroll');
        $('body').css('position', 'static');
        mobile_menu_overlay.css('width', 0);
        mobile_menu_content.css('width', 0);
    });

    /** mobile menu go to **/
    var event_for_all_menu_item = $('.mobile_menu_item');
    event_for_all_menu_item.each(function(item){
        $(this).on('click', function (event) {

            var event_id_clicked = event.currentTarget.id;
            var cleaned_id = event_id_clicked.substring(event_id_clicked.indexOf("_") + 1);
            var element_ofset_top = $("#" + cleaned_id).offset().top - 90;
            $('html, body').animate({scrollTop: element_ofset_top}, 1000);
            mobile_menu_overlay.css('width', 0);
            mobile_menu_content.css('width', 0);
        })
    });


    /*===============================

          Tarfis section tooltip script

    ===========================*/

    $('#express_info_button').tooltip({
        html: true,
        container: 'body',
        trigger: 'hover focus',
        title: "<div>Nous mettons nos équipe immédiatement à pied d'oeuvre pour effectuer le transport dans : <br><br>- les 2 heures pour les trajet en Ile de France <br> - dans les 5 heures pour un départ en dehors de l'Ile de France. <br><br>30 % du prix de la course hors taxe pour ce service.</div>"
    });




    /*===============================

          Script to enable or disable map submit button
             - disable when input are empty
             - enable when input have been checked

        ===========================*/


        var tarifSectionInputs = $('.tarifInput');
        var tarifSubmitButton = $('#tarifSubmitButton');

        // will check if input are empty
        function checkTarifInput(){

            var inputData = [];
            tarifSectionInputs.each( function(index, item) {
                if($(item).val().trim() !== ""){
                    inputData.push(true);
                }
            });

            if (inputData.length === 2) {
                if(tarifSubmitButton.hasClass('disabled') === true){
                    tarifSubmitButton.removeClass('disabled');
                }
            } else {
                if(tarifSubmitButton.hasClass('disabled') === false){
                    tarifSubmitButton.addClass('disabled');
                }
            }

        }

        //checking input when page is loaded in case browser saved some data inside
        checkTarifInput();

        //checking input on inut event
        tarifSectionInputs.on('input propertychange', function() {
            checkTarifInput();
        });


        tarifSubmitButton.click(function() {
            if (tarifSubmitButton.hasClass('disabled') === false) {

                tarifSectionInputs.each( function( index, item ) {
                    if( $.trim(item.value )  === '' ) {

                        var inputEmptyError = $(item).parent().parent()[0].querySelector('.inputEmptyError');
                        inputEmptyError.style.height = "30px";

                        //hidde the span error after 4.5sec
                        setTimeout(function () {
                            $('.inputEmptyError').each( function(index, item) {
                                item.style.height = "0";
                            })
                        }, 4500);
                    }else{


                    }
                });
            }

        });


        /*===============================

          Call back function who display the map and initialize
          some settings :
             - init google autocompletion
             - init variable to display route

        ===========================*/


/********************************* google map var settings *******************************/
/***** init here to avoid multiple instance of renderer, mutiple route, we only need 1 route at time *****/
var directionsService; // object how will get route settings to be displayed
var directionsDisplay; // object how will display route
var map; //will containt maps
/****************************************************************/

function initMap() {

    var screen_height = screen.height;

    if (screen_height > 1080) {
        var map_height = (screen_height * 50) / 100;
        console.log(map_height);
        document.getElementById("map").style.height = map_height + "px";
        google.maps.event.trigger(map, 'resize')
    } else if (screen_height <= 1080 && screen_height >= 800) {
        var map_height = (screen_height * 40) / 100;
        //console.log(map_height);
        document.getElementById("map").style.height = map_height + "px";
        google.maps.event.trigger(map, 'resize')
    } else if (screen_height < 800 && screen_height >= 600) {
        var map_height = (screen_height * 30) / 100;
        console.log(map_height);
        document.getElementById("map").style.height = map_height + "px";
        google.maps.event.trigger(map, 'resize')
    } else if (screen_height < 600) {
        var map_height = (screen_height * 50) / 100;
        console.log(map_height);
        document.getElementById("map").style.height = map_height + "px";
        google.maps.event.trigger(map, 'resize')
    }

    /*===============================

        Call back function who display the map and initialize
        some settings :
           - init google autocompletion
           - init variable to display route

    ===========================*/

    //create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.85661400000001, lng: 2.3522219000000177},
        zoom: 10,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8ec3b9"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1a3646"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#64779e"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#334e87"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6f9ba5"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3C7680"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#304a7d"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2c6675"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#255763"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#b0d5ce"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#023e58"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#283d6a"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3a4762"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0e1626"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#4e6d70"
                    }
                ]
            }
        ]

    });


    //get input map to apply google map auto completion
    var input_start = document.getElementById('inputStart');
    var input_end = document.getElementById('inputEnd');

    //apply google map auto completion
    autocomplete_start = new google.maps.places.Autocomplete(input_start);
    autocomplete_end = new google.maps.places.Autocomplete(input_end);


    /*===============================
       display object initialisation
    ===========================*/
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();

}



        /******while dev******/
        //get input map to apply google map auto completion
        document.getElementById('inputStart').value = "Paris, France";
        document.getElementById('inputEnd').value = "Montpellier, France";
        /******while dev******/



    /*==================================================================================

       Displaying route on map and
       get all route's info (poste code ...)

           #1 check if empty input then display error
           #2 Goecode start and end to know if is ile de france
           #3 display route
           #4 display array with price

   =================================================================================*/


    /** MAP LOADER **/

    function display_loader(boolean) {

        var loader = $("#loader");
        var noLoader = $("#noLoader");

        if(boolean === true){
            noLoader.css('display', 'none');
            loader.css('display', 'flex');
        }else{
            noLoader.css('display', 'flex')
            loader.css('display', 'none')
        }
    }

tarifSubmitButton.on('click', function(){
    if(tarifSubmitButton.hasClass('disabled') === false){

        display_loader(true);

        /*======================== Geocoding to know if IDF or not ========================================*/

        /* init an object who will store the status of user request
            each status below will be updated during the script and used to construct
            the table with pricing data and allow the display of the route
         * Pricing are different in case of start or and are outside of IDF */


        let user_request = {
            "start_status": false,
            "end_status": false,
            "start_idf": false,
            "end_idf": false,
            "start_address": "",
            "end_address": "",
            "km_to_low": "",
            "is_express": false,
            "express_percent": "",
            "car_type": "",
            "distance": "",
            "price": "",
            "price_per_km": ""
        };

        var start = document.getElementById('inputStart').value;
        var end = document.getElementById('inputEnd').value;

        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };

        //init geocoder object
        var geocoder = new google.maps.Geocoder();


        //here we check if start and end adresse are in IDF or not because the
        //price of the route will not be the same.
        geocoder.geocode({'address': start}, function (results, status) {

            console.log("starting geocode with start variable");

            if (status !== 'OK') {
                console.log("start gecode error service error :", results, status);
                display_loader(false);

                var alertMapRouteError = $('#alertMapRouteError').css('display', 'inherit');

                return false;
            } else {

                console.log("geocoding start successfull with : ", results);

                user_request.start_status = true;


                for (var i = 0; i < results[0].address_components.length; i++) {

                    if (results[0].address_components[i].long_name === "Île-de-France") {
                        user_request.start_idf = true;
                        user_request.start_address = results[0].formatted_address;
                    }
                }


                geocoder.geocode({'address': end}, function (results, status) {

                    console.log("starting geocode with end variable");

                    if (status !== 'OK') {
                        console.log("end geocode service error :", results, status);
                        display_loader(false);
                        $('#alertMapRouteError').css('display', 'inherit');
                        return false;
                    } else {

                        user_request.end_status = true;

                        console.log("geocoding end successfull with : ", {results});

                        for (var i = 0; i < results[0].address_components.length; i++) {
                            if (results[0].address_components[i].long_name === "Île-de-France") {
                                user_request.end_idf = true;
                                user_request.end_address = results[0].formatted_address;
                            }
                        }

                        if (user_request.start_status === true && user_request.end_status === true) {

                            /*======================== Geocoding to know if IDF or not ========================================*/

                            console.log('init displaying route');

                            directionsService.route(request, function (result, status) {
                                if (status === 'OK') {

                                    console.log('route should be displayed with : ', result);

                                    $( "#map" ).toggle( "scale" );

                                    //rendering the route on map
                                    directionsDisplay.setDirections(result);

                                    display_loader(false);

                                    /*======================== Building pricing table ========================================*/

                                    //google maps return distance as meter
                                    //rounding and convert distance to KM
                                    user_request.distance = Math.ceil(result.routes[0].legs[0].distance.value / 1000);

                                    /*Check if km to low to apply charge*/
                                    if(user_request.start_idf === false || user_request.end_idf === false){
                                        if(user_request.distance < 150){
                                            console.log('km to low');
                                            display_loader(false)
                                        }
                                        //return false;
                                    }

                                    user_request.car_type = document.getElementById("select_car_type").value;

                                    if (document.querySelector("#yes").checked) {
                                        user_request.is_express = true;
                                    }

                                    if (user_request.car_type === "basic_car") {

                                        //checking if trip is inside IDF
                                        if (user_request.start_idf === true && user_request.end_idf === true) {

                                            user_request.price = 120;


                                        } else {

                                            //if not apply distance pricing
                                            var priceFromDistance = user_request.distance * 1.05;

                                            user_request.price_per_km = 1.05;

                                            /*minimum price is 120 for basic car, so if priceFromDistance si lower than 120
                                            we keep the default pricing (120E)*/
                                            if(priceFromDistance > user_request.price){
                                                user_request.price = priceFromDistance;
                                            }

                                        }

                                    } else if (user_request.car_type === "big_truck") {

                                        //checking if trip is inside IDF
                                        if (user_request.start_idf === true && user_request.end_idf === true) {

                                            user_request.price = 180;


                                        } else {
                                            //if not apply distance pricing
                                            var priceFromDistance = user_request.distance * 1.55;

                                            user_request.price_per_km = 1.55;

                                            /*minimum price is 180 for basic car, so if priceFromDistance si lower than 180
                                            we keep the default pricing (120E)*/
                                            if(priceFromDistance > user_request.price){
                                                user_request.price = priceFromDistance;
                                            }

                                        }
                                    }

                                    if (user_request.is_express === true) {
                                        user_request.price = user_request.price + (user_request.price * 30) / 100;
                                    }

                                    console.log({user_request});


                                    /* After calcalting price, fixe decimal rules*/
                                    //2 decimal exepted for price value
                                    user_request.price = user_request.price.toFixed(2);

                                    //inser into the table pricing
                                    var vehicul = document.querySelectorAll(".show_vehicul");
                                    var urgence = document.querySelectorAll(".show_urgence");
                                    var km = document.querySelectorAll(".show_km");
                                    var total_price_ht = document.querySelectorAll(".show_total_price_ht");
                                    var total_price_ttc = document.querySelectorAll(".show_total_price_ttc");


                                    //insert car type
                                    if (user_request.car_type === "basic_car") {
                                        vehicul[0].innerHTML = "Véhicule léger";
                                        vehicul[1].innerHTML = "Véhicule léger";
                                    } else {
                                        vehicul[0].innerHTML = "Poid lourd";
                                        vehicul[1].innerHTML = "Poid lourd";
                                    }

                                    //insert express percent
                                    if (user_request.is_express !== false) {
                                        //temporaly solution while getting all tarifs
                                        user_request.express_percent = 30;

                                        urgence[0].innerHTML = "+ " + user_request.express_percent + " % prix HT";
                                        urgence[1].innerHTML = "+ " + user_request.express_percent + " % prix HT";
                                    } else {
                                        urgence[0].innerHTML = "Aucun";
                                        urgence[1].innerHTML = "Aucun";
                                    }


                                    //insert distance (km)
                                    km[0].innerHTML = user_request.distance + " km";
                                    km[1].innerHTML = user_request.distance + " km";


                                    //insert HT price
                                    total_price_ht[0].innerHTML = user_request.price + " €";
                                    total_price_ht[1].innerHTML = user_request.price + " €";

                                    //insert TTC price
                                    total_price_ttc[0].innerHTML = Math.ceil(user_request.price * 1.20) + ".00 €";
                                    total_price_ttc[1].innerHTML = Math.ceil(user_request.price * 1.20) + ".00 €";

                                    /*======================== Building pricing table ========================================*/

                                    /*======================== Display table ========================================*/
                                    if (window.innerWidth <= 480) {

                                        document.querySelector(".result_from_map_mobile").style.display = "flex";

                                        //scroll to table price
                                        var scrollPostion = $('#result_from_map_mobile').offset().top - 50;
                                        $("html, body").animate({ scrollTop : scrollPostion }, 1000);


                                    } else {

                                        document.querySelector(".result_from_map").style.display = "flex";

                                        //scroll to table price
                                        var scrollPostion = $('#result_from_map').offset().top - 70;
                                        $("html, body").animate({ scrollTop : scrollPostion }, 1000);

                                    }
                                    /*======================== Display table ========================================*/


                                    /*======================== Smooth scroll to the table ========================================*/
                                    /******** geting the scroll position of table and map **********/

                                    /** TO DEBUG
                                     /*GETTING SCREEN SIZE | used for the smooth screen below
                                     var window_width = $(window).width();
                                     if(window_width <= 480){
                                    var table_result_scroll_position = $('.mobile_table_header');
                                    var scroll_position =  table_result_scroll_position.offset().top - 90;
                                    $('html, body').animate({scrollTop: scroll_position}, 1000);
                                }else{
                                    var map_scroll_position = $('#map_scroll_point');
                                    // - 80 to get a good position of the window
                                    var scroll_position =  map_scroll_position.offset().top - 90;
                                    $('html, body').animate({scrollTop: scroll_position}, 1000);
                                }
                                     /******** geting the scroll position of table and map **********/
                                    /*======================== Smooth scroll to the table ========================================*/


                                    console.log("line 405", {user_request});

                                }else{
                                    console.log("direction service error :", result, status);
                                    display_loader(false);
                                    $('#alertMapRouteError').css('display', 'inherit');
                                    return false;
                                }
                            });
                        }
                    }
                });
            }

        });
    }
});
