var me = this;
function mostrarModal(element){
    var data=element.dataFeature.manualValues?JSON.parse(element.dataFeature.manualValues):null;

    var modal= $('#exampleModal');
    modal[0].dataElement=element.dataFeature;
    modal.find("#messageNodesHeader").text("");
    modal.find("#messageBeansHeader").text("");
    modal.find("#messageNodesFooter").text("");
    modal.find("#messageBeansFooter").text("");

    modal.find("#plantHeight").val(data?data.altura:"");
    modal.find("#numBranches").val(data?data.numRamas:"");
    modal.find("#diametro").val(data?data.diametro:"");
    modal.find("#status").val(data?data.status:"");
    modal.find("#numRamasHeader").val(data?data.numRamasHeader:"");
    modal.find("#numNodesHeader").val(data?data.numNodesHeader:"");
    modal.find("#numBeansHeader").val(data?data.numBeansHeader:"");
    modal.find("#numRamasFooter").val(data?data.numRamasFooter:"");
    modal.find("#numNodesFooter").val(data?data.numNodesFooter:"");
    modal.find("#numBeansFooter").val(data?data.numBeansFooter:"");
        //modal.find("#plantHeight").val(data.plantHeight);
        //modal.find("#plantHeight").val(data.plantHeight);

    $('#exampleModal').modal('show');
}
function objectifyForm(formArray) {
    //serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

function formSubmit(e){
    e.preventDefault(); //This will prevent the default click action

    var frm = $('#register');
    var dataElement= $('#exampleModal')[0].dataElement;
    var data = objectifyForm(frm.serializeArray());
    $.ajax({
        type: "POST",
        url: 'enviarDatosPlanta?id='+dataElement.id,
        data: JSON.stringify(data),
        processData: false,
        contentType: "application/json; charset=UTF-8",
        success: function (rta) {
            console.log('Submission was successful.');
            console.log(me);
            me.layerGroup.removeLayer(me.layerGroup.getLayers()[0]);
            me.obtenerPlantasNoConfiguradas();
            $('#exampleModal').modal('hide');
        },
        error: function (rta) {
            console.log('An error occurred.');
            console.log(rta);
        }
    });
}

