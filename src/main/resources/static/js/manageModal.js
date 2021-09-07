var me = this;
function mostrarModal(element){
    var data=element.dataFeature.manualValues?JSON.parse(element.dataFeature.manualValues):null;

    var modal= $('#exampleModal');
    modal[0].dataElement=element.dataFeature;

    if(data){
        modal.find("#plantHeight").val(data.altura);
        modal.find("#numBranches").val(data.numRamas);
        modal.find("#diametro").val(data.diametro);
        modal.find("#status").val(data.status);
        //modal.find("#plantHeight").val(data.plantHeight);
        //modal.find("#plantHeight").val(data.plantHeight);
    }else{
        modal.find("#plantHeight").val("");
        modal.find("#numBranches").val("");
        modal.find("#diametro").val("");
        modal.find("#status").val("");
    }
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

