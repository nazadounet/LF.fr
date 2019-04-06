function display_map_error(boolean){
    var map_alert = document.getElementById("map_alert");
    map_alert.style.display = "block";
    map_alert.addEventListener("click", function () {
        map_alert.style.display = "none";
        map_alert.removeEventListener("click", function () {
            map_alert.style.display = "none";
        })
    });
}
/************************* displaying error alert map ********************************/
