/************************************* MAP CONTROLLER SECTION *******************************/
/*************************spiner ad loader section********************************/
var background_spiner = document.querySelector("#map_loader_container");
var loader = document.querySelector("#map_loader");

function display_loader(boolean) {
    var elements = document.querySelectorAll('body, html');
    if (boolean === true) {
        background_spiner.style.display = "block";
        loader.style.display = "block";
        //disable scroll on mobile
        document.getElementById('map_loader_container').addEventListener('touchmove scroll', function (e) {
            e.preventDefault();
        });
        //disable scroll on desktop
        elements.forEach(function(item){
            item.style.overflow = 'hidden';
        });
    } else {

        //re-enable scroll on mobile
        document.getElementById('map_loader_container').removeEventListener('touchmove scroll', function (e) {
            e.preventDefault();
        });
        //re-enable scroll on desktop
        elements.forEach(function (item) {
            item.style.overflow = "scroll"
        });

        background_spiner.style.display = "none";
        loader.style.display = "none";
    }

}
/*************************spiner ad loader section********************************/
/************************* displaying error alert map ********************************/