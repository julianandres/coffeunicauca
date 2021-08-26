function whenClicked(e) {
if(e&&e.target.feature.properties&&e.target.feature.properties){
var btn=$("#"+e.target.feature.properties.id);
if(btn&&btn[0])
    btn[0].dataFeature=e.target.feature.properties;
}
e.target.setStyle({color:"red",opacity:0.7,fillOpacity:0.7});
Object.keys(e.target._map._targets).forEach(function(item){
var target=e.target._map._targets[item];
if(target&&e.target._leaflet_id!==target._leaflet_id&&target.setStyle){
    target.setStyle({opacity:0.4,fillOpacity:0.4});
}
});
}
var layerGroup = new L.LayerGroup();
function onEachFeature(feature, layer) {
if (feature.properties) {
    var textPopuP="<label> Volumen:"+feature.properties.volumen+"</label> </br>";
    textPopuP += "<label> Area:"+feature.properties.area+"</label> </br>";
    textPopuP += "<label> ID:"+feature.properties.id+"</label> </br>";
    textPopuP += "<label> Position L:"+feature.properties.l+"</label> </br>";
    textPopuP += '<button id="'+feature.properties.id+'" type="button" onclick=mostrarModal(this) class="btn btn-primary">Completar Datos</button> </br>';
    layer.bindPopup(textPopuP);

    layer.on({
            click: whenClicked
     });
}


}

function obtenerPlantasNoConfiguradas(){
 $.ajax({
        url: location.origin + "/getPlantsToComplete",
        cache: false,
        type: "GET",
        success: function (json) {
            var features=[];
            if(json){
                console.log(json);
                json.forEach(function(item,index){
                     var value = {
                                     "type": "Feature",
                                     "properties": {
                                         "volumen": item.volumen,
                                         "area": item.area,
                                         "id":item.id,
                                         "l":item.posicionAlgoritmo,
                                         "manualValues":item.valoresManuales,
                                         "color":item.valoresManuales?"green":('blue')
                                     },
                                     "geometry": {
                                         "type": "Polygon",
                                         "coordinates": [
                                             JSON.parse(item.contorno)
                                         ]
                                     }
                                 }
                     features.push(value);
                });
                console.log(features);
                finalValue = {
                    "type": "FeatureCollection",
                    "features": features
                };
                if(window.leafletmap){
                    layerGroup.addTo(window.leafletmap);
                     var leafletFile=L.geoJSON(finalValue,{
                                                style:function(feature){
                                                    return {color:feature&&feature.properties&&feature.properties.color?feature.properties.color:"red"};
                                                },
                                                onEachFeature:onEachFeature
                                            });
                     layerGroup.addLayer(leafletFile);
                }

                    console.log(leafletFile);
                    navigator.geolocation.getCurrentPosition(dibujarMarker);

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}
function dibujarMarker(position){
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Mi Posicion",
        "amenity": "Actual",
        "popupContent": "Mi Posición"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [ position.coords.longitude,position.coords.latitude]
    }
};
setTimeout(function(){
    if(window.leafletmap)
        L.geoJSON(geojsonFeature).addTo(window.leafletmap);
},window.leafletmap?100:1000);

}


$( document ).ready(function() {
obtenerPlantasNoConfiguradas();
});