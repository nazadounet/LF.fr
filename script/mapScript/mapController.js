$( document ).ready(function() {
    /********************************* google map var settings *******************************/
    /***** init here to avoid multiple instance of renderer, mutiple route, we only need 1 route at time *****/
    var directionsService; // object how will get route settings to be displayed
    var directionsDisplay; // object how will display route
    var map; //will containt maps
    /****************************************************************/

    function initMap() {

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


        /*** FIRST resize the map depend of screen height, width is always 100% ****/
        var screen_height = screen.height;

        if(screen_height > 1080){
            map_height = (screen_height * 50) / 100;
            console.log(map_height);
            document.getElementById("map").style.height = map_height + "px";
            google.maps.event.trigger(map, 'resize')
        }else if(screen_height <= 1080 && screen_height >= 800){
            map_height = (screen_height * 40) / 100;
            //console.log(map_height);
            document.getElementById("map").style.height = map_height + "px";
            google.maps.event.trigger(map, 'resize')
        }else if(screen_height < 800 && screen_height >= 600){
            map_height = (screen_height * 30) / 100;
            console.log(map_height);
            document.getElementById("map").style.height = map_height + "px";
            google.maps.event.trigger(map, 'resize')
        }else if(screen_height < 600){
            map_height = (screen_height * 50) / 100;
            console.log(map_height);
            document.getElementById("map").style.height = map_height + "px";
            google.maps.event.trigger(map, 'resize')
        }

        //get input map to apply google map auto completion
        var input_start = document.getElementById('start');
        var input_end = document.getElementById('end');

        //apply google map auto completion
        autocomplete_start = new google.maps.places.Autocomplete(input_start);
        autocomplete_end = new google.maps.places.Autocomplete(input_end);


        /*===============================
           display object initialisation
        ===========================*/
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();
    }


    /*==================================================================================

        Function to display route on map and
        get all route's info (poste code ...)

            #1 check if empty input then display error
            #2 Goecode start and end to know if is ile de france
            #3 display route
            #4 display array with price

    =================================================================================*/


    /******while dev******/
    var input_start = document.getElementById('start').value = "Paris, France";
    var input_end = document.getElementById('end').value = "Montpellier, France";
    document.getElementById("select_service").value = "convoyage";
    document.getElementById("select_car_type").value = "basic_car";

    /******while dev******/

    jQuery(document).ready(function( j$ ) {

        /*GETTING SCREEN SIZE | used for the smooth screen below*/
        var window_width = j$(window).width();


        document.getElementById("google_map_submit_button").addEventListener("click", function () {
            /*======================== Check empty input ========================================*/
            var google_map_input = document.querySelectorAll(".google_map_input");

            var empty_google_map_input = false;

            for (var i = 0; i < google_map_input.length; i++) {

                //check if empty input to display error under input map

                if (google_map_input[i].value === "") {

                    //if input empty, get the "span error" and display it

                    empty_google_map_input = true;


                    //if empty input, scroll to the input then display him
                    var empty_input = j$('#' + google_map_input[i].id);
                    var scroll_position =  empty_input.offset().top - 110;
                    j$('html, body').animate({scrollTop: scroll_position}, 1000);

                    var get_span = google_map_input[i].parentNode.parentNode.querySelector(".google_map_input_alert");
                    get_span.style.height = "20px";
                    get_span.style.padding = "5px";

                    //hidde the span error after 4.5sec
                    setTimeout(function () {
                        var get_span = document.querySelectorAll(".google_map_input_alert");
                        for (var i = 0; i < get_span.length; i++) {
                            get_span[i].style.height = "0";
                            get_span[i].style.padding = "0";
                        }
                    }, 4500);
                }
            }
            /*======================== Check empty input ========================================*/


            if (empty_google_map_input) {
                //if empty input, so errors are displayed and script stop here
                console.log("empty input error");
                return false;
            } else {
                //if input arent empty so lets run the script

                display_loader(true);

                console.log("input not empty, start getting route");


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
                    "service": "",
                    "car_type": "",
                    "distance": "",
                    "price": ""
                };


                /******while dev******/
                input_start = "Paris, France";
                input_end = "Montpellier, France";
                user_request.service = "Transport par camion";
                user_request.car_type = "Véhicule < 5t";
                /******while dev******/


                var start = document.getElementById('start').value;
                var end = document.getElementById('end').value;

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
                        console.error("geocoding error", status, results);
                        display_loader(false);
                        display_map_error(true);
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
                                console.error("geocoding error", {status, results});
                                display_loader(false);
                                display_map_error(true);
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

                                    console.log(directionsDisplay.setMap(map));

                                    console.log('init displaying route');

                                    directionsService.route(request, function (result, status) {
                                        if (status === 'OK') {

                                            console.log('route should be displayed with : ', result);

                                            //rendering the route on map
                                            directionsDisplay.setDirections(result);

                                            /*======================== Building pricing table ========================================*/

                                            //google maps return distance as meter
                                            //rounding and convert distance to KM
                                            user_request.distance = Math.ceil(result.routes[0].legs[0].distance.value / 1000);

                                            console.log({user_request});

                                            /*Check if km to low to apply charge*/
                                            /* DISABLED DURING DEV
                                            if(user_request.start_idf === false || user_request.end_idf === false){
                                                if(user_request.distance < 150){
                                                    console.log('km to low');
                                                    display_loader(false)
                                                }
                                                //return false;
                                            }
                                            */

                                            console.log("here");

                                            user_request.service = document.getElementById("select_service").value;

                                            user_request.car_type = document.getElementById("select_car_type").value;

                                            if (document.querySelector("#yes").checked) {
                                                user_request.is_express = true;
                                            }


                                            if (user_request.service === "convoyage") {

                                                if (user_request.car_type === "basic_car") {

                                                    if (user_request.start_idf === true && user_request.end_idf === true) {

                                                        switch (true) {

                                                            case(user_request.distance >= 1 && user_request.distance <= 30):
                                                                user_request.price = Math.ceil(user_request.distance * 4.35);
                                                                break;

                                                            case(user_request.distance >= 31 && user_request.distance <= 60):
                                                                user_request.price = Math.ceil(user_request.distance * 3.35);
                                                                break;

                                                            case(user_request.distance >= 61 && user_request.distance <= 100):
                                                                user_request.price = Math.ceil(user_request.distance * 2.35);
                                                                break;

                                                            case(user_request.distance > 100):
                                                                user_request.price = Math.ceil(user_request.distance * 1.35);
                                                        }

                                                        if (user_request.is_express === true) {
                                                            user_request.price = Math.ceil(user_request.price + (user_request.price * 30) / 100);
                                                            user_request.express_percent = 30;
                                                        }

                                                    } else {

                                                        user_request.price = user_request.distance * 1.80;
                                                        if (user_request.is_express === true) {
                                                            user_request.price = user_request.price + (user_request.price * 50) / 100;
                                                        }

                                                    }

                                                } else if (user_request.car_type === "big_truck") {

                                                    if (user_request.start_idf === true && user_request.end_idf === true) {

                                                    }
                                                }

                                            }

                                            /* After calcalting price, fixe decimal rules*/
                                            //2 decimal exepted for price value
                                            user_request.price = user_request.price.toFixed(2);

                                            //inser into the table pricing
                                            var service = document.querySelectorAll(".show_service");
                                            var vehicul = document.querySelectorAll(".show_vehicul");
                                            var urgence = document.querySelectorAll(".show_urgence");
                                            var km = document.querySelectorAll(".show_km");
                                            var express_percent = document.querySelectorAll(".show_express_percent");
                                            var total_price_ht = document.querySelectorAll(".show_total_price_ht");
                                            var total_price_ttc = document.querySelectorAll(".show_total_price_ttc");


                                            // insert service type
                                            if (user_request.service === "transport_camion") {
                                                service[0].innerHTML = "Transport par camion";
                                                service[1].innerHTML = "Transport par camion";
                                            } else {
                                                service[0].innerHTML = "Convoyage";
                                                service[1].innerHTML = "Convoyage";
                                            }

                                            //insert car type
                                            if (user_request.car_type === "basic_car") {
                                                vehicul[0].innerHTML = "Véhicule < 3.5t";
                                                vehicul[1].innerHTML = "Véhicule < 3.5t";
                                            } else {
                                                vehicul[0].innerHTML = "Poid lourd";
                                                vehicul[1].innerHTML = "Poid lourd";
                                            }

                                            //insert if express
                                            if (user_request.is_express === true) {
                                                urgence[0].innerHTML = "Oui";
                                                urgence[1].innerHTML = "Oui";
                                            } else {
                                                urgence[0].innerHTML = "Non";
                                                urgence[1].innerHTML = "Non";
                                            }


                                            //insert distance (km)
                                            km[0].innerHTML = user_request.distance + " km";
                                            km[1].innerHTML = user_request.distance + " km";

                                            //insert express percent

                                            if (user_request.is_express != false) {
                                                //temporaly solution while getting all tarifs
                                                user_request.express_percent = 30;

                                                express_percent[0].innerHTML = "+ " + user_request.express_percent + " % prix HT";
                                                express_percent[1].innerHTML = "+ " + user_request.express_percent + " % prix HT";
                                            } else {
                                                express_percent[0].innerHTML = "Aucun";
                                                express_percent[1].innerHTML = "Aucun";
                                            }

                                            //insert HT price
                                            total_price_ht[0].innerHTML = user_request.price + " €";
                                            total_price_ht[1].innerHTML = user_request.price + " €";

                                            //insert TTC price
                                            total_price_ttc[0].innerHTML = Math.ceil(user_request.price * 1.20) + " €";
                                            total_price_ttc[1].innerHTML = Math.ceil(user_request.price * 1.20) + " €";

                                            /*======================== Building pricing table ========================================*/

                                            /*======================== Display table ========================================*/
                                            if (window.innerWidth <= 480) {
                                                document.querySelector(".result_from_map_mobile").style.display = "flex";
                                            } else {
                                                document.querySelector(".result_from_map").style.display = "flex";
                                            }
                                            /*======================== Display table ========================================*/


                                            /*======================== Smooth scroll to the table ========================================*/
                                            /******** geting the scroll position of table and map **********/
                                            if(window_width <= 480){
                                                var table_result_scroll_position = j$('.mobile_table_header');
                                                var scroll_position =  table_result_scroll_position.offset().top - 90;
                                                j$('html, body').animate({scrollTop: scroll_position}, 1000);
                                            }else{
                                                var map_scroll_position = j$('#map_scroll_point');
                                                // - 80 to get a good position of the window
                                                var scroll_position =  map_scroll_position.offset().top - 90;
                                                j$('html, body').animate({scrollTop: scroll_position}, 1000);
                                                /******** geting the scroll position of table and map **********/
                                                /*======================== Smooth scroll to the table ========================================*/
                                            }

                                            directionsDisplay.setDirections(result, status, display_loader(false));

                                            /************ Send result to course manager**********/
                                            var xhttp = new XMLHttpRequest();
                                            xhttp.open("POST", "http://localhost:8888/Lab/Haouari_depanage_course_manager/controller/insert_new_course.php", true);
                                            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                            xhttp.onreadystatechange = function () {
                                                console.log(xhttp.responseText);
                                                console.log(xhttp.statusText);
                                            };
                                            xhttp.send("course=" + JSON.stringify(user_request));
                                            /************ Send result to course manager**********/

                                            console.log("line 405", {user_request});

                                        }else{
                                            console.log("direction service error :", result, status);
                                            display_loader(false);
                                            display_map_error(true);
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

        //function get_route() {}

        /*========================================================================================

            This part is the steps by steps process who active the input

        =========================================================================================*/

        /** input / select to direction controller **/

        var form_google_map = document.querySelector("#form_google_map");
        var select_service = document.querySelector("#select_service");
        var select_car_type = document.querySelector("#select_car_type");

        var select_car_type_parentNode = select_car_type.parentNode.parentNode;

        if (select_service.value !== "0") {
            select_car_type_parentNode.classList.remove("custom_disabled");
            select_car_type.removeAttribute("disabled");
        } else {
            select_car_type_parentNode.classList.add("custom_disabled");
            select_car_type.setAttribute("disabled", "");
            select_car_type.value = "0";
        }

        if (select_car_type.value !== "0") {
            form_google_map.classList.remove("custom_disabled");
            var input_google_map = document.querySelectorAll(".google_map_input");

            for (var i = 0; i < input_google_map.length; i++) {
                input_google_map[i].removeAttribute("disabled");
            }
        }

        select_service.addEventListener("change", function () {

            var select_car_type_parentNode = select_car_type.parentNode.parentNode;

            if (select_service.value !== "0") {
                select_car_type_parentNode.classList.remove("custom_disabled");
                select_car_type.removeAttribute("disabled");
            } else {
                select_car_type_parentNode.classList.add("custom_disabled");
                select_car_type.setAttribute("disabled", "");
                select_car_type.value = "0";

                form_google_map.classList.add("custom_disabled");
                var input_google_map = document.querySelectorAll(".google_map_input");

                for (var i = 0; i < input_google_map.length; i++) {
                    input_google_map[i].setAttribute("disabled", "");
                }
            }
        });


        select_car_type.addEventListener("change", function () {

            var input_google_map = document.querySelectorAll(".google_map_input");

            if (select_car_type.value !== "0") {
                form_google_map.classList.remove("custom_disabled");
                var input_google_map = document.querySelectorAll(".google_map_input");

                for (var i = 0; i < input_google_map.length; i++) {
                    input_google_map[i].removeAttribute("disabled");
                }
            } else {
                form_google_map.classList.add("custom_disabled");

                for (var i = 0; i < input_google_map.length; i++) {
                    input_google_map[i].setAttribute("disabled", "");
                }
            }
        });
        /** input / select to direction controller **/

        /************************************* MAP CONTROLLER SECTION *******************************/
    });


});