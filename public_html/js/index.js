var connToken="90932378|-31949271498309041|90955540";
var dbName="COLLEGE-DB";
var relName="PROJECT-TABLE";
var jpdbBaseUrl="http://api.login2explore.com:5577";
var jpdbIML="/api/iml";
var jpdbIRL="/api/irl";
$("#projid").focus();

function validateData() {
    var projid, projname, assignto, assigndate, deadline;
    projid = $("#projid").val();
    projname = $("#projname").val();
    assignto = $("#assignto").val();
    assigndate = $("#assigndate").val();
    deadline = $("#deadline").val();


    if (projid === "") {
        alert("Project ID is missing ");
        $("#projid").focus();
        return "";
    }

    if (projname === "") {
        alert("Project Name is missing");
        $("#projname").focus();
        return "";
    }

    if (assignto === "") {
        alert("AssignTo is required");
        $("#assignto").focus();
        return "";
    }
    if (assigndate === "") {
        alert("Assigndate is missing");
        $("#assigndate").focus();
        return "";
    }
    if (deadline === "") {
        alert("Deadline is missing");
        $("#deadline").focus();
        return "";
    }

    var jsonStrObj = {
        projectid: projid,
        projectname: projname,
        assignto: assignto,
        assigndate: assigndate,
        deadline: deadline
    };
    return JSON.stringify(jsonStrObj);

}

function resetForm() {
    $("#projid").val("");
    $("#projname").val("");
    $("#assignto").val("");
    $("#assigndate").val("");
    $("#deadline").val("");
    $("#projid").prop("disabled", false);
    $("#projname").prop("disabled", true);
    $("#assignto").prop("disabled", true);
    $("#assigndate").prop("disabled", true);
    $("#deadline").prop("disabled", true);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#projid").focus();
}

function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return;
    }

    var putReqStr = createPUTRequest(connToken,
            jsonStr, dbName,relName );
    //alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
       jpdbBaseUrl,jpdbIML );
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#projid").focus();
}

function getProjIdAsJsonObj() {
    var projid = $("#projid").val();
    var jsonStr = {
        projectid: projid
    };
    return JSON.stringify(jsonStr);
}

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#projname").val(record.projectname);
    $("#assignto").val(record.assignto);
    $("#assigndate").val(record.assigndate);
    $("#deadline").val(record.deadline);
}

function getProj() {
    var projidJsonObj = getProjIdAsJsonObj();
   // console.log(projidJsonObj);
    var getRequest = createGET_BY_KEYRequest(connToken,
            dbName, relName, projidJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultJsonObj = executeCommandAtGivenBaseUrl(getRequest,
           jpdbBaseUrl,jpdbIRL );
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    if (resultJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projname").focus();
    } else if (resultJsonObj.status === 200) {
        $("#projid").prop("disabled", true);

        fillData(resultJsonObj);

        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projname").focus();
    }
}
function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateReqStr = createUPDATERecordRequest(connToken,
            jsonChg, dbName, relName, localStorage.getItem("recno"));
    //alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultJsonObj = executeCommandAtGivenBaseUrl(updateReqStr,
            jpdbBaseUrl, jpdbIML);
    //alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    console.log(resultJsonObj);
    resetForm();
    $("#projid").focus();
}

function myFunction() {
   
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#projname").prop("disabled", false);
        $("#assignto").prop("disabled", false);
        $("#assigndate").prop("disabled", false);
        $("#deadline").prop("disabled", false);
        $("#projid").focus();
    }



