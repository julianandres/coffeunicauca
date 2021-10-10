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
function onChangeBranches(branches,element){
   if(JSON.parse(element.value)&&typeof JSON.parse(element.value) == "number"){
      var elementValue = JSON.parse(element.value);
      var rta = calculateSample(elementValue);
      $("#"+branches).text("Debes contar los nodos de  "+Math.trunc(rta)+"  Ramas");
   }
}
function onChangeNodes(branches,element){
   if(JSON.parse(element.value)&&typeof JSON.parse(element.value) == "number"){
      var elementValue = JSON.parse(element.value);
      var rta = calculateSample(elementValue);
      $("#"+branches).text("Debes contar los frutos de  "+Math.trunc(rta)+"  Nodos");
   }
}
function calculateSample(population){
      var valueZ=1.28;
      var error=0.08;
      var numerator = (valueZ*valueZ)*(0.5*0.5)*population;
      var denominator= ((error*error)*(population-1))+(valueZ*valueZ)*(0.5*0.5)
      var rta = numerator/denominator;
      return rta;
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
                var fPlant = json[json.length-1];
                if(fPlant){
                    openLeafletLayersODM(fPlant.project, fPlant.taskId, JSON.parse(fPlant.southBounds), JSON.parse(fPlant.northBounds), JSON.parse(fPlant.centro));
                }
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

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus);
            console.log("Error: " + errorThrown);
        }
    });
}
var layerGroupMarker = new L.LayerGroup();
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
        if(window.leafletmap){
            window.leafletmap.panTo(new L.LatLng(position.coords.latitude,position.coords.longitude));
            layerGroupMarker.addTo(window.leafletmap);
            var leafletMarker=L.geoJSON(geojsonFeature);
            if(layerGroupMarker.getLayers().length>0)
                layerGroupMarker.removeLayer(layerGroupMarker.getLayers()[0]);
            layerGroupMarker.addLayer(leafletMarker);
        }

    },window.leafletmap?100:1000);

}

setInterval(function(){
   if(!location.href.includes("localhost"))
        navigator.geolocation.getCurrentPosition(dibujarMarker);
},3000);


$( document ).ready(function() {
obtenerPlantasNoConfiguradas();
});