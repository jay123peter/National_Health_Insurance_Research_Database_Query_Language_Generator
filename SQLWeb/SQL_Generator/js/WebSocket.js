
var wsUrl = "ws://140.117.171.158:52001";


function CreateWebSocket(JsonMessage,ActionMode){
    if ("WebSocket" in window) {
        //alert("WebSocket Init Now");
        window.addEventListener("load", InitialWebSocket(JsonMessage,ActionMode) , false);
    }
}

function InitialWebSocket(JsonMessage,ActionMode) {
    websocket = new WebSocket(wsUrl);
    websocket.onopen = function(evt) { 
        onOpen(evt,JsonMessage);
    };
    websocket.onclose = function(evt) {
        onClose(evt);
    };
    websocket.onmessage = function(evt) {
        onMessage(evt,ActionMode);
    };
    websocket.onerror = function(evt) {
        onError(evt);
    };
}
function onOpen(evt,JsonMessage) {
    //alert("WebSocket onOpen Now");
    //writeToScreen(""); 
    doSend(JsonMessage);
}  
function onClose(evt) { 
    //alert("WebSocket onClose Now");
    //writeToScreen("DISCONNECTED"); 
}  
function onMessage(evt,ActionMode) { 
    switch(ActionMode){
        case 1:
            if(evt.data != ""){
                choose_table_next_websocket(evt.data);
            }else{
                alert("[Error] : Connecting to Server faild");
            }
            websocket.close(); 
            break;
        case 2:
            if(evt.data != ""){
                $("#AnalysisCheck_page").hide("slow");
                $("#Analysis_page").show("slow");
                var json_obj = JSON.parse(evt.data);
                alert("success ! ");
                sava_json(json_obj);
                insert_target();
                basic_chart();
            }else{
                alert("Server Error, Please try again later !");
                $("#AnalysisCheck_text").find('h3').eq(0).html("Analysis Function has some problems, Please try again later !");
                $("#AnalysisCheck_btn_start").show();
                $("#AnalysisCheck_btn_wait").hide();
            }
            websocket.close(); 
            break;
    }
}  
function onError(evt) { 
    alert("[Error] : Connecting to Server faild");
    $("#AnalysisCheck_text").find('h3').eq(0).html("Analysis Function has some problems, Please try again later !");
    $("#AnalysisCheck_btn_start").show();
    $("#AnalysisCheck_btn_wait").hide();
   
}  
function doSend(message) { 
    //alert("WebSocket onSendNow");
    //writeToScreen("SENT: " + message);
    websocket.send(message); 
}  
function writeToScreen(message) { 
    alert(message); 
}  