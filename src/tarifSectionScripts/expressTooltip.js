import $ from 'jquery';

export const expressTooltip = (htmlIdentifier) => {

    let htmlExpressTooltip = $(htmlIdentifier);

    htmlExpressTooltip.tooltip({
        html: true,
        container: 'body',
        trigger: 'hover focus',
        title: "<div>Nous mettons nos équipe immédiatement à pied d'oeuvre pour effectuer le transport dans : <br><br>- les 2 heures pour les trajet en Ile de France <br> - dans les 5 heures pour un départ en dehors de l'Ile de France. <br><br>30 % du prix de la course hors taxe pour ce service.</div>"
    });

};