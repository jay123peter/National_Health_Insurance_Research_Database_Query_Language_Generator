var json_obj;
var sql_string;
var selectServer,selectTable;

function chartrender(chart){
	chart.render();
}
function sava_json(json_save){
	json_obj = json_save;
}
function saveVariable(sql,select_Server,select_Table){
	sql_string = sql;
	selectServer = select_Server;
	selectTable = select_Table;
}
function change_Xaxis(select_id){
	var html_age = 
	"<option value='0'>0-9</option> "+
	"<option value='1'>10-19</option>" +
	"<option value='2'>20-29</option>" +
	"<option value='3'>30-39</option>" +
	"<option value='4'>40-49</option>" +
	"<option value='5'>50-59</option>" +
	"<option value='6'>60-69</option>" +
	"<option value='7'>70-79</option>" +
	"<option value='8'>80-89</option>" +
	"<option value='9'>90-99</option>";
	var html_year = 
	"<option value='1996'>1996</option> "+
	"<option value='1997'>1997</option>" +
	"<option value='1998'>1998</option>" +
	"<option value='1999'>1999</option>" +
	"<option value='2000'>2000</option>" +
	"<option value='2001'>2001</option>" +
	"<option value='2002'>2002</option>" +
	"<option value='2003'>2003</option>" +
	"<option value='2004'>2004</option>" +
	"<option value='2005'>2005</option>" +
	"<option value='2006'>2006</option> "+
	"<option value='2007'>2007</option>" +
	"<option value='2008'>2008</option>" +
	"<option value='2009'>2009</option>" +
	"<option value='2010'>2010</option>" +
	"<option value='2011'>2011</option>" +
	"<option value='2012'>2012</option>" +
	"<option value='2013'>2013</option>";

	$("#"+select_id).closest('ul').find('form').eq(1).find('select').eq(0).empty();
	$("#"+select_id).closest('ul').find('form').eq(2).find('select').eq(0).empty();

	if($("#"+select_id).val() == "Age"){
		$("#"+select_id).closest('ul').find('form').eq(1).find('select').eq(0).append(html_age);
		$("#"+select_id).closest('ul').find('form').eq(2).find('select').eq(0).append(html_age);
		$("#"+select_id).closest('ul').find('form').eq(2).find('select').eq(0).val(9);
	}else{
		$("#"+select_id).closest('ul').find('form').eq(1).find('select').eq(0).append(html_year);
		$("#"+select_id).closest('ul').find('form').eq(2).find('select').eq(0).append(html_year);
		$("#"+select_id).closest('ul').find('form').eq(2).find('select').eq(0).val(2013);
	}

}

function analysis_start(){

	$("#AnalysisCheck_text").find('h3').eq(0).html("Analysis Function has started, Please waiting for a moment !");
	$("#AnalysisCheck_btn_start").hide();
	$("#AnalysisCheck_btn_wait").show();

	//WebSocket Version
	var JsonMessage = JSON.stringify({
		ActionMode:"2",
		sql:sql_string ,
		selectServer:selectServer,
		selectYear:selectTable,
		selectDatabase:selectTable,
		execpasswd:"0"
	});

	var data = "";
	data = CreateWebSocket(JsonMessage,2);
	
	/*$.ajax({
		type : 'POST',
		url : "phpConnectServer.php",
		data : {
			ActionMode:"2",
			sql:sql_string ,
			selectServer:selectServer,
			selectYear:selectTable,
			execpasswd:"0"
		},
		async : true,
	}).done(function(data,status){
		if(data != ""){
			//var json_obj = JSON.parse(data);
			//alert(data);
			$("#AnalysisCheck_page").hide("slow");
			$("#Analysis_page").show("slow");
			var json_obj = JSON.parse(data);
			alert("success ! ");
			sava_json(json_obj);
			insert_target();
			basic_chart();
		}else{
			alert("[Error] : Connecting to Server faild");
			$("#AnalysisCheck_text").find('h3').eq(0).html("Analysis Function has some problems, Please try again later !");
			$("#AnalysisCheck_btn_start").show();
			$("#AnalysisCheck_btn_wait").hide();
		}
	}).fail(function (jqXHR, exception) {
		var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        alert(msg);
        $("#AnalysisCheck_text").find('h3').eq(0).html("Analysis Function has some problems, Please try again later !");
		$("#AnalysisCheck_btn_start").show();
		$("#AnalysisCheck_btn_wait").hide();
	});*/


}
function CreatePieChart(text,dataPoints,chartContainer){
	/*dataPoints: [
			{  y: 83.24, legendText:"Google", label: "Google" },
			{  y: 8.16, legendText:"Yahoo!", label: "Yahoo!" },
			{  y: 4.67, legendText:"Bing", label: "Bing" },
			{  y: 1.67, legendText:"Baidu" , label: "Baidu"},       
			{  y: 0.98, legendText:"Others" , label: "Others"}
	]*/
	$(chartContainer).empty();
	var chart = new CanvasJS.Chart(chartContainer,
	{
		title:{
			text: text
		},
		animationEnabled: true,
		legend:{
			verticalAlign: "center",
			horizontalAlign: "left",
			fontSize: 20,
			fontFamily: "Helvetica"        
		},
		theme: "theme2",
		data: [
		{        
			type: "pie",       
			indexLabelFontFamily: "Garamond",       
			indexLabelFontSize: 20,
			indexLabel: "{label} : {y}",
			startAngle:-20,      
			showInLegend: true,
			toolTipContent:"{legendText} : {y}",
			dataPoints: dataPoints
		}
		]

	});
	chart.render();
	setTimeout(function() { chartrender(chart); }, 500);
}
function CreateOneColumnChart(text,indexLabel,YxisText,dataPoints,chartContainer){

	var chart = new CanvasJS.Chart(chartContainer,
	{
		theme: "theme3",
		animationEnabled: true,
		title:{
			text: text,
			fontSize: 30
		},			
		axisY: {
			title: YxisText,
			minimum: 0
		},				
		data: [ 
		{
			type: "column",
			indexLabel: indexLabel,
			dataPoints:dataPoints
		}
		]
	});

	chart.render();
	setTimeout(function() { chartrender(chart); }, 500);
}

function CreateOneColumnChart_relation(text,indexLabel,YxisText,dataPoints,chartContainer){

	var chart = new CanvasJS.Chart(chartContainer,
	{
		theme: "theme3",
		animationEnabled: true,
		title:{
			text: text,
			fontSize: 30
		},			
		axisY: {
			title: YxisText,
			minimum: 0
		},				
		data: [ 
		{
			type: "column",
			click:onClick,
			indexLabel: indexLabel,
			dataPoints:dataPoints
		}
		]
	});
	function onClick(e,target) {

		//if click, Create pieChart
		var object;
		var dataPoints_inside = [];
		object = { y: json_obj.relation.relationList[e.dataPoint.legendText][e.dataPoint.label][0],legendText : e.dataPoint.label + " Before " + e.dataPoint.legendText ,label : e.dataPoint.label + " Before " + e.dataPoint.legendText };
		dataPoints_inside.push(object);
		object = { y: json_obj.relation.relationList[e.dataPoint.legendText][e.dataPoint.label][1],legendText : e.dataPoint.label + " After " + e.dataPoint.legendText ,label : e.dataPoint.label + " After " + e.dataPoint.legendText };
		dataPoints_inside.push(object);
		object = { y: json_obj.relation.relationList[e.dataPoint.legendText][e.dataPoint.label][2],legendText : e.dataPoint.label + " equal " + e.dataPoint.legendText ,label : e.dataPoint.label + " equal " + e.dataPoint.legendText };
		dataPoints_inside.push(object);

		CreatePieChart(e.dataPoint.legendText + " - Time Comparison Chart",dataPoints_inside,chartContainer_relation_right);

	}
	chart.render();
	setTimeout(function() { chartrender(chart); }, 500);
}

function CreateStackColumnChart(text,YxisText,toolTipContent,dataPoints_1,dataPoints_2,dataPoints_3,name_1,name_2,name_3,chartContainer){
	//Column Chart Using sex classification  
	/*var datapoint_male=[],datapoint_female=[],datapoint_undefined=[];
	for(var i=0;i<10;i++){
		var age_string = (i*10) + " ~ " + ((i*10)+9);
		var object;
		object =  {label : age_string , y : json_obj.sex_count[i][age_string][0]};
		datapoint_male.push (object);
		object =  {label : age_string , y : json_obj.sex_count[i][age_string][1]};
		datapoint_female.push(object);
		object =  {label : age_string , y : json_obj.sex_count[i][age_string][2]};
		datapoint_undefined.push(object);		
	}*/
	var chart = new CanvasJS.Chart(chartContainer,
	{
		theme: "theme3",
		animationEnabled: true,
		title:{
			text: text,
			fontSize: 30
		},			
		axisY: {
			title: YxisText,
			minimum: 0
		},				
		data: [ 
		{
			type: "stackedColumn",	
			name: name_1,
			legendText: name_1,
			showInLegend: true,
			toolTipContent: toolTipContent,
			dataPoints:dataPoints_1
		},
		{
			type: "stackedColumn",	
			name: name_2,
			legendText: name_2,
			showInLegend: true,
			toolTipContent: toolTipContent,
			dataPoints:dataPoints_2

		},
		{
			type: "stackedColumn",	
			name: name_3,
			legendText: name_3,
			showInLegend: true,
			toolTipContent: toolTipContent,
			dataPoints:dataPoints_3

		}
		],
		legend:{
			cursor:"pointer",
			itemclick: function(e){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				}
				else {
					e.dataSeries.visible = true;
				}
				chart.render();
			}
		},
	});

	chart.render();
	setTimeout(function() { chartrender(chart); }, 500);
}

function CreatelineColumnChart(text,YxisText,dataPoints_1,dataPoints_2,name_1,name_2,chartContainer){
	var chart = new CanvasJS.Chart(chartContainer,
	{
		theme: "theme2",
		animationEnabled: true,
		title:{
			text: text,
			fontSize: 30
		},			
		axisY: {
			title: YxisText,
			minimum: 0
		},				
		data: [ 
		{
			type: "line",	
			name: name_1,
			legendText: name_1,
			lineThickness: 2,
			markerType: "square",
			showInLegend: true,

			dataPoints:dataPoints_1
		},
		{
			type: "line",	
			name: name_2,
			legendText: name_2,
			lineThickness: 2,
			showInLegend: true,

			dataPoints:dataPoints_2
		}
		],
		legend:{
			cursor:"pointer",
			itemclick: function(e){
				if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
					e.dataSeries.visible = false;
				}
				else {
					e.dataSeries.visible = true;
				}
				chart.render();
			}
		},
	});

	chart.render();
	setTimeout(function() { chartrender(chart); }, 500);
}
function insert_target(){
	var option_begin = "<option value='";
	var option_end = "</option>";
	var count = Object.keys(json_obj.basic.IcdDrug).length; //get json object length
	var IcdDrug_name = Object.keys(json_obj.basic.IcdDrug);


	//empty target 
	$("#All_target").empty();
	$("#Sex_target").empty();
	$("#Age_target").empty();
	$("#Relation_target").empty();
	//all & sex & age options
	for(var i=0;i<count;i++){
		$("#All_target").append(option_begin + IcdDrug_name[i] + "'>" + IcdDrug_name[i] + option_end);
		$("#Sex_target").append(option_begin + IcdDrug_name[i] + "'>" + IcdDrug_name[i] + option_end);	
		$("#Age_target").append(option_begin + IcdDrug_name[i] + "'>" + IcdDrug_name[i] + option_end);

	}
	//relation option
	if(count == 1){
		return;
	}
	for(var i=0;i<count;i++){
		$("#Relation_target").append(option_begin + IcdDrug_name[i] + "'>" + IcdDrug_name[i] + option_end);
		for(var j=0;j<count;j++){
			if(j != i){
				$("#Relation_target").append(option_begin + IcdDrug_name[i] +"&" + IcdDrug_name[j] + "'>" + IcdDrug_name[i] + " & " +  IcdDrug_name[j] + option_end);
			}
		}
	}
}
function basic_chart(){
	/*"basic" : {
	*   	"age" : [13,14,15,16,17],
	*   	"sex" : [12,13,14],
	*   	"IcdDrug" : {
	*  		"sick1":123,"sick2":456
	*   	}
	*   }
	*/
	$("#chartContainer_basic").empty();
	var option = $("#basic_select").val();

	switch(option){
		case "age":
			var dataPoints = [];
			var age_string,object;
			for(var i=0;i<10;i++){
				age_string = (i*10) + " ~ " + ((i*10)+9);
				object = { y: json_obj.basic.age[i],legendText : age_string,label : age_string};
				dataPoints.push(object);
			}
			CreatePieChart("Age Distribution",dataPoints,"chartContainer_basic");
			break;
		case "sex":
			var dataPoints = [];
			var sex_string=["Male","Female","Undefined"],object;
			for(var i=0;i<3;i++){
				object = { y: json_obj.basic.sex[i],legendText : sex_string[i],label : sex_string[i]};
				dataPoints.push(object);
			}
			CreatePieChart("Age Distribution",dataPoints,"chartContainer_basic");
			break;
		case "icddrug":
			var dataPoints = [];
			var object;
			var count = Object.keys(json_obj.basic.IcdDrug).length; //get json object length
			var IcdDrug_name = Object.keys(json_obj.basic.IcdDrug);
			
			for(var i=0;i<count;i++){
				object = { label : IcdDrug_name[i],y: json_obj.basic.IcdDrug[IcdDrug_name[i]]};
				dataPoints.push(object);
			}
			CreateOneColumnChart("Disease & Drug","{y}","Number of People",dataPoints,chartContainer_basic);
			break;
		default:
			alert("basic_chart error");
			break;

	}
}

function all_chart(){
	/*"all" : {
	*   	"age" : { 
	*   		"sick1":[13,14,15,16,17],
	*   		"sick2":[13,14,15,16,17]
	*   	}
	*   	"firstday" : { 
	*   		"sick1":[13,14,15,16,17],
	*   		"sick2":[13,14,15,16,17]
	*   	}
	*   	"allpeople" : {
	*   		"sick1":123,
	*   		"sick2":456
	*   	}
	*   }
	 */
	$("#chartContainer_all").empty();

	var dataPoints = [];
	var option = $("#All_xasixSelect").val();
	var target = $("#All_target").val();
	switch(option){
		case "Age":
			//get age limitation
			var ageLimit_prev = parseInt($("#All_limitPrev").val());
			var ageLimit_next =  parseInt($("#All_limitNext").val());
			var age_string,object;

			if($("#All_yasixSelect").val() == "real"){
				for(var i=ageLimit_prev;i<=ageLimit_next;i++){
					age_string = (i*10) + " ~ " + ((i*10)+9);
					object = { y: json_obj.all.age[target][i],legendText : age_string,label : age_string};
					dataPoints.push(object);
				}
				CreateOneColumnChart(target + " - Age Chart","{y}","Number of People",dataPoints,chartContainer_all);
			}else{
				for(var i=ageLimit_prev;i<=ageLimit_next;i++){
					var y = (json_obj.all.age[target][i] / json_obj.all.allpeople[target])*100;
					age_string = (i*10) + " ~ " + ((i*10)+9);
					object = { y: Math.round(y*100)/100,legendText : age_string,label : age_string};
					dataPoints.push(object);
				}
				CreateOneColumnChart(target + " - Age Chart","{y}%","Percent of All People (%)",dataPoints,chartContainer_all);
			}

			break
		case "Year":
			//get year limitation
			var yearLimit_prev = parseInt($("#All_limitPrev").val()) - 1990;
			var yearLimit_next = parseInt($("#All_limitNext").val()) - 1990;
			var age_string,object;

			if($("#All_yasixSelect").val() == "real"){
				for(var i=yearLimit_prev;i<=yearLimit_next;i++){
					year_string = "" + (1990+i);
					object = { y: json_obj.all.firstday[target][i],legendText : year_string,label : year_string};
					dataPoints.push(object);
				}
				CreateOneColumnChart(target + " - firstday Chart","{y}","Number of People",dataPoints,chartContainer_all);
			}else{
				for(var i=yearLimit_prev;i<=yearLimit_next;i++){
					var y = (json_obj.all.firstday[target][i] / json_obj.all.allpeople[target])*100;
					year_string = "" + (1990+i);
					object = { y: Math.round(y*100)/100,legendText : year_string,label : year_string};
					dataPoints.push(object);
				}
				CreateOneColumnChart(target + " - firstday Chart","{y}%","Percent of All People (%)",dataPoints,chartContainer_all);
			}
			break;
	}

}

function sex_chart(){
	/*
	* json: sex
	* {
	*    "age_sex":{
	*    	"sick1" : {
	*    		"0~9":[233,122,1]},"10~19":[111,222,1]
	*    	}
	*    	"sick2" : {
	*    		"0~9":[233,122,1],"10~19":[111,222,1]
	*    	}
	*    }
	*    "firstday_sex":{
	*    	"sick1" : {
	*    		"1996":[233,122,1]},"1998":[111,222,1]
	*    	}
	*    	"sick2" : {
	*    		"1997":[233,122,1],"1999":[111,222,1]
	*    	}
	*	    }
	*    "allpeople" : {
	*   		"sick1":123,"sick2":456
	*   	}
	* }
	* */

	$("#chartContainer_sex").empty();

	var dataPoints_male = [];
	var dataPoints_female = [];
	var dataPoints_undefined = [];
	//var datapoint = new Array(3);
	var option = $("#Sex_xasixSelect").val();
	var target = $("#Sex_target").val();
	var y;
	switch(option){
		case "Age":
			//get age limitation
			var ageLimit_prev = parseInt($("#Sex_limitPrev").val());
			var ageLimit_next =  parseInt($("#Sex_limitNext").val());
			var age_string,object;
			/*for(var i=0;i<3;i++){
				dataPoints[i] = [];
			}*/

			if($("#Sex_yasixSelect").val() == "real"){
				for(var i=ageLimit_prev;i<=ageLimit_next;i++){
					age_string = (i*10) + " ~ " + ((i*10)+9);
					//get male people
					object = { y: json_obj.sex.age_sex[target][age_string][0],legendText : age_string,label : age_string};
					dataPoints_male.push(object);
					//get female people
					object = { y: json_obj.sex.age_sex[target][age_string][1],legendText : age_string,label : age_string};
					dataPoints_female.push(object);
					//get undefined people
					object = { y: json_obj.sex.age_sex[target][age_string][2],legendText : age_string,label : age_string};
					dataPoints_undefined.push(object);
				}
				CreateStackColumnChart(target + " - Age_Sex Chart","Number of People","{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: {y}",dataPoints_male,dataPoints_female,dataPoints_undefined,"Male","Female","Undefined",chartContainer_sex);
			}else{
				for(var i=ageLimit_prev;i<=ageLimit_next;i++){
					age_string = (i*10) + " ~ " + ((i*10)+9);
					//get male people
					y = (json_obj.sex.age_sex[target][age_string][0] / json_obj.sex.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : age_string,label : age_string};
					dataPoints_male.push(object);
					//get female people
					y = (json_obj.sex.age_sex[target][age_string][1] / json_obj.sex.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : age_string,label : age_string};
					dataPoints_female.push(object);
					//get undefined people
					y = (json_obj.sex.age_sex[target][age_string][2] / json_obj.sex.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : age_string,label : age_string};
					dataPoints_undefined.push(object);
				}
				CreateStackColumnChart(target + " - Age_Sex Chart","Percent of All People (%)","{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: {y} %",dataPoints_male,dataPoints_female,dataPoints_undefined,"Male","Female","Undefined",chartContainer_sex);
			}

			break
		case "Year":
			//get year limitation
			var yearLimit_prev = parseInt($("#Sex_limitPrev").val()) - 1990;
			var yearLimit_next = parseInt($("#Sex_limitNext").val()) - 1990;
			var year_string,object;

			if($("#Sex_yasixSelect").val() == "real"){
				for(var i=yearLimit_prev;i<=yearLimit_next;i++){
					year_string = "" + (1990+i);
					//get male people
					object = { y: json_obj.sex.firstday_sex[target][year_string][0],legendText : year_string,label : year_string};
					dataPoints_male.push(object);
					//get female people
					object = { y: json_obj.sex.firstday_sex[target][year_string][1],legendText : year_string,label : year_string};
					dataPoints_female.push(object);
					//get undefined people
					object = { y: json_obj.sex.firstday_sex[target][year_string][2],legendText : year_string,label : year_string};
					dataPoints_undefined.push(object);
				}
				CreateStackColumnChart(target + " - Firstday_Sex Chart","Number of People","{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: {y}",dataPoints_male,dataPoints_female,dataPoints_undefined,"Male","Female","Undefined",chartContainer_sex);
			}else{
				for(var i=yearLimit_prev;i<=yearLimit_next;i++){
					year_string = "" + (1990+i);
					//get male people
					y = (json_obj.sex.firstday_sex[target][year_string][0] / json_obj.sex.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : year_string,label : year_string};
					dataPoints_male.push(object);
					//get female people
					y = (json_obj.sex.firstday_sex[target][year_string][1] / json_obj.sex.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : year_string,label : year_string};
					dataPoints_female.push(object);
					//get undefined people
					y = (json_obj.sex.firstday_sex[target][year_string][2] / json_obj.sex.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : year_string,label : year_string};
					dataPoints_undefined.push(object);
				}
				CreateStackColumnChart(target + " - Firstday_Sex Chart","Percent of All People (%)","{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: {y} %",dataPoints_male,dataPoints_female,dataPoints_undefined,"Male","Female","Undefined",chartContainer_sex);
			}
			break;
	}
}

function age_chart(){
	/*
	* json:
	* {
	*    "firstday_age":{
	*    	"sick1" : {
	*    		"1991":[233,122,1]},"1996":[111,222,1]
	*    	}
	*    	"sick2" : {
	*    		"1994":[233,122,1],"1997":[111,222,1]
	*   
	*    	}
	*    }
	*    "allpeople" : {
	*   		"sick1":123,"sick2":456
	*   	}
	* }
	* */ 
	$("#chartContainer_age").empty();

	var dataPoints_child = [];
	var dataPoints_adult = [];
	var dataPoints_elderly = [];
	//var datapoint = new Array(3);
	var option = $("#Age_xasixSelect").val();
	var target = $("#Age_target").val();
	var y;
	switch(option){
		case "Year":
			//get year limitation
			var yearLimit_prev = parseInt($("#Age_limitPrev").val()) - 1990;
			var yearLimit_next = parseInt($("#Age_limitNext").val()) - 1990;
			var year_string,object;

			if($("#Age_yasixSelect").val() == "real"){
				for(var i=yearLimit_prev;i<=yearLimit_next;i++){
					year_string = "" + (1990+i);
					//get male people
					object = { y: json_obj.age.firstday_age[target][year_string][0],legendText : year_string,label : year_string};
					dataPoints_child.push(object);
					//get female people
					object = { y: json_obj.age.firstday_age[target][year_string][1],legendText : year_string,label : year_string};
					dataPoints_adult.push(object);
					//get undefined people
					object = { y: json_obj.age.firstday_age[target][year_string][2],legendText : year_string,label : year_string};
					dataPoints_elderly.push(object);
				}
				CreateStackColumnChart(target + " - Firstday_Age Chart","Number of People","{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: {y}",dataPoints_child,dataPoints_adult,dataPoints_elderly,"Child(0~18)","Adult(19~64)","elder(65~)",chartContainer_age);
			}else{
				for(var i=yearLimit_prev;i<=yearLimit_next;i++){
					year_string = "" + (1990+i);
					//get male people
					y = (json_obj.age.firstday_age[target][year_string][0] / json_obj.age.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : year_string,label : year_string};
					dataPoints_child.push(object);
					//get female people
					y = (json_obj.age.firstday_age[target][year_string][1] / json_obj.age.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : year_string,label : year_string};
					dataPoints_adult.push(object);
					//get undefined people
					y = (json_obj.age.firstday_age[target][year_string][2] / json_obj.age.allpeople[target])*100;
					object = { y:  Math.round(y*100)/100,legendText : year_string,label : year_string};
					dataPoints_elderly.push(object);
				}
				CreateStackColumnChart(target + " - Firstday_Age Chart","Percent of All People (%)","{label}<br/><span style='\"'color: {color};'\"'><strong>{name}</strong></span>: {y} %",dataPoints_child,dataPoints_adult,dataPoints_elderly,"Child(0~18)","Adult(19~64)","elder(65~)",chartContainer_age);
			}
			break;
	}
}

function relation_chart(){
	/*
	* json: 
	* {
	*    "relationList":{
	*    	"sick1" : {
	*    		"Head_injury":[before,after,all],"stroke":[111,222,1]
	*    	}
	*    	"sick2" : {
	*    		"Head_injury":[before,after,all],"stroke":[111,222,1]
	*    	}
	*    }
	* }
	* */ 

	$("#chartContainer_relation_left").empty();
	$("#chartContainer_relation_right").empty();

	var check_relation = Object.keys(json_obj.basic.IcdDrug).length; //get json object length
	if( check_relation <= 1){
		alert("You have only 1 Icd9/Drug , relation is not support");
	}

	var target = $("#Relation_target").val();

	//check target is one or two
	if(target.indexOf("&") == -1){
		var dataPoints = [];
		var object;
		var count = Object.keys(json_obj.relation.relationList).length; //get json object length
		var IcdDrug_name = Object.keys(json_obj.relation.relationList);

		for(var i=0;i<count;i++){
			if(IcdDrug_name[i] != target){
				object = { y: json_obj.relation.relationList[target][IcdDrug_name[i]][3],legendText : target,label : IcdDrug_name[i]};
				dataPoints.push(object);
			}
		}
		CreateOneColumnChart_relation(target + " - Comorbidity Chart","{y}","Number Of People",dataPoints,chartContainer_relation_left);
	}else{
		var split_target = target.split("&");
		var dataPoints_target = [];
		var dataPoints_relation = [];
		var age_string;
		var object;
		//var count = Object.keys(json_obj.relation.relationList).length; //get json object length
		//var IcdDrug_name = Object.keys(json_obj.relation.relationList);

		//get age chart
		for(var i=0;i<=9;i++){
			age_string = (i*10) + " ~ " + ((i*10)+9);
			object = { y: json_obj.all.age[split_target[0]][i],legendText : age_string,label : age_string};
			dataPoints_target.push(object);
		}

		for(var i=0;i<=9;i++){
			age_string = (i*10) + " ~ " + ((i*10)+9);
			object = { y: json_obj.all.age[split_target[1]][i],legendText : age_string,label : age_string};
			dataPoints_relation.push(object);
		}
		CreatelineColumnChart(split_target[0] + " & " + split_target[1]  + " - Age line Chart","Number of People",dataPoints_target,dataPoints_relation,split_target[0],split_target[1],chartContainer_relation_left);
	
		//get firstday chart
		dataPoints_target = [];
		dataPoints_relation = [];

		for(var i=6;i<24;i++){
			year_string = "" + (1990+i);
			object = { y: json_obj.all.firstday[split_target[0]][i],legendText : year_string,label : year_string};
			dataPoints_target.push(object);
		}

		for(var i=6;i<24;i++){
			year_string = "" + (1990+i);
			object = { y: json_obj.all.firstday[split_target[1]][i],legendText : year_string,label : year_string};
			dataPoints_relation.push(object);
			CreatelineColumnChart(split_target[0] + " & " + split_target[1]  + " - firstday line Chart","Number of People",dataPoints_target,dataPoints_relation,split_target[0],split_target[1],chartContainer_relation_right);
		}
	}
}

