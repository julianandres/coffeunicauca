
   function openLeafletLayersODM(project, task, boundsNorth,boundsSouth,center){
    var jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiSnVsaWFuIiwiZXhwIjoxNjI4NTUwODQ4fQ.mCYKGBbjINR05wod4fycAK5lSTY88sMuC58JQpOiBvI";

           var southWest = L.latLng([2.394703853406243, -76.73893726213578]),
           center=L.latLng([center[1],center[0]]);
           northEast = L.latLng([2.3955428881953593, -76.73763781096866]);
           southWest = L.latLng(boundsSouth);
           northEast = L.latLng(boundsNorth);
           var mymap =window.leafletmap?window.leafletmap:L.map('mapid').setView(center, 21);
                      window.leafletmap = mymap;

           bounds = L.latLngBounds([southWest, northEast]);
           if(navigator.onLine&&false){
               var googleTraffic = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
                   maxZoom: 25,
                   minZoom: 0,
                   subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
               }).addTo(mymap);
           }
           $.ajax({
                   url: "http://"+location.hostname + ":8000/api/token-auth/",
                   cache: false,
                   type: "POST",
                   contentType: "application/json",
                   data: '{"username": "Julian","password": "940925jabort"}',
                   dataType: 'json',
                   success: function (json) {
                       console.log(json);
                       L.tileLayer("http://"+ location.hostname+':8000/api/projects/'+project+'/tasks/'+task+'/orthophoto/tiles/{z}/{x}/{y}.png?jwt='+json.token, {
                           bounds:bounds,
                           minZoom: 0,
                           maxZoom: 124,
                           maxNativeZoom: 24,
                           tms:false,
                           detectRetina: true
                       }).addTo(mymap);
                   },
                   error: function (XMLHttpRequest, textStatus, errorThrown) {
                       console.log("Status: " + textStatus);
                       console.log("Error: " + errorThrown);
                   }
               });
   }