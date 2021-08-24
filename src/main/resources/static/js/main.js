function whenClicked(e) {
  $('#exampleModal').modal('show');
  e.target.setStyle({color:"red",opacity:0.7,fillOpacity:0.7});
  Object.keys(e.target._map._targets).forEach(function(item){
    var target=e.target._map._targets[item];
    if(target&&e.target._leaflet_id!==target._leaflet_id&&target.setStyle){
        target.setStyle({opacity:0.4,fillOpacity:0.4});
    }
  });
}
function onEachFeature(feature, layer) {
    if (feature.properties) {
        var textPopuP="<label> Volumen:"+feature.properties.volumen+"</label> </br>";
        textPopuP += "<label> Area:"+feature.properties.area+"</label> </br>";
        textPopuP += "<label> ID:"+feature.properties.id+"</label> </br>";
        textPopuP += "<label> Position L:"+feature.properties.l+"</label> </br>";
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
                                             "color":('#' + Math.floor(item.posicionAlgoritmo*2*16777215).toString(16))
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
                    if(window.leafletmap)
                        L.geoJSON(finalValue,{
                            style:function(feature){
                                return {color:feature&&feature.properties&&feature.properties.color?feature.properties.color:"red"};
                            },
                            onEachFeature:onEachFeature
                        }).addTo(window.leafletmap);
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
    L.geoJSON(geojsonFeature).addTo(window.leafletmap);
}
obtenerPlantasNoConfiguradas();


function formSubmit(e){
    e.preventDefault(); //This will prevent the default click action
    debugger;
    var frm = $('#register');

    $.ajax({
        type: "POST",
        url: 'enviarDatosPlanta',
        data: frm.serialize(),
        success: function (data) {
            console.log('Submission was successful.');
            console.log(data);
        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        }
    });
}