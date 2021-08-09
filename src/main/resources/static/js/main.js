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
                                             "Volumen": item.volumen,
                                             "Area": item.area
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
                    JSON.stringify(finalValue);
                    if(window.leafletmap)
                        L.geoJSON(finalValue).addTo(window.leafletmap);

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            }
        });
}
obtenerPlantasNoConfiguradas();