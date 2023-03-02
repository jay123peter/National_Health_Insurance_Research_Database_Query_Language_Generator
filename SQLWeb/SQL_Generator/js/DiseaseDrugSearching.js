/*----------Global Variables-----------*/
//save conditionbar name
var conditionbar = [""];
//use for conditionbar id
var condition_amount = 0;
//use for counting existing how many conditionbar
var condition_count = 0;
//use for icd9_code or drug_code condition name
var amount = 0;

//save the disease or drug name that need to add into select & group by
var insideToOutside = [];
//if user choose cci_standarddisease option, save the standarddisease name 
var standarddisease = [];
//use for SQL section name , like t2 or t3
var tNum=2;



//var client = new ZeroClipboard($("#clipboard")); //initial zeroclipboard

/*-------------------------------------*/
function copy_sql(){
	$("#build_sql").show();
	var copyTextarea = document.getElementById('build_sql');
 	copyTextarea.select();

 	try {
  		var successful = document.execCommand('copy');
   		var msg = successful ? 'successful' : 'unsuccessful';
    	console.log('Copying text command was ' + msg);

  	} catch (err) {
    	console.log('Oops, unable to copy');
 	}


	$("#build_sql").hide();
	//window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function Add_conditionbar(action){
	switch(action){
		case 1: //CD Sick
			var icd9_create = 
			"<li class='list-group-item col-xs-12 nav navbar-custom'  style ='background: #FFFF77' value = 0>" +
				"<div class = 'row' style ='background: #FFAA33;'>"+
					"<div class = 'col-xs-12'>"+ "CD_icd9_Code" + "</div>" +
					"<button class = 'col-xs-1 glyphicon glyphicon-minus' id='delete_" + condition_amount+"' onclick='delete_conditions(this.id)' >"+ "</button>" +
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;margin:0px 0px 10px 0px'>"+
						"<form class='col-xs-2'>" + 
							"<input type='text' value='' placeholder = 'Enter Name ex. Head_injury'></input>" + 
						"</form>"+
						"<form class='col-xs-3' >" +
							"<input class='form-control' type='file' name='condition_value' onchange='handleFile(this.files,\"hiddenGroup_" + condition_amount + "\",1)' accept='.txt' id= 'uploadfile_" +condition_amount + "' value=''/>"  +
						"</form>"+
						"<label class = 'col-xs-1'>firstday :</label>" +  
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_Y' name='day' checked onchange='alert_firstday()'>Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_M' name='day'>Month</label>" +
						"<label class = 'col-xs-1'>lastday : </label>" +   
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_Y' name='day' checked >Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_M' name='day'>Month</label>" +
 				"</div>"+
				"<div class = 'row' style ='background: #FFFF77;'>" +
						"<label class = 'col-xs-3 checkbox-inline'>Having at least : <input type='number' value='1' min=1 require='required' style='text-align:center'></label>" +
						"<label class = 'col-xs-4 checkbox-inline'>Year Limitation : <input type='number' value='1990' min=1990 max =2013 require='required' style='text-align:center'> -  <input type='number' value='2013' min=1990 max =2013 require='required' style='text-align:center'></label>" + 
						
				"</div>"+
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hidden_" + condition_amount + "'>" +
					"<ul class = 'list-group col-xs-12' id='hiddenGroup_"+condition_amount+"'>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<div class = 'col-xs-2'>like</div>"+
							"<div class = 'col-xs-2'>icd1</div>"+
							"<div class = 'col-xs-2'>icd2</div>"+
							"<div class = 'col-xs-2'>icd3</div>"+
						"</li>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<input class = 'col-xs-2' type='checkbox' value='like_all' onchange='likeicd_all(0,\"hiddenGroup_" + condition_amount + "\")' ></input>"+
							"<input class = 'col-xs-2' type='checkbox' value='icd1_all' onchange='likeicd_all(1,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-2' type='checkbox' value='icd2_all' onchange='likeicd_all(2,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-2' type='checkbox' value='icd3_all' onchange='likeicd_all(3,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
						"</li>"+
					"</ul>"+
				"</div>" +
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hiddenbtn_" + condition_amount + "'>" +
						"<button class = 'btn col-xs-12 glyphicon glyphicon-plus' onclick='add_code(0,\"hiddenGroup_" +condition_amount+ "\",0)' style ='background:#DDDDDD;'></button>"+
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<button type = 'button' class = 'col-xs-12 glyphicon glyphicon-chevron-down' value='0' id ='controllbtn_"+ condition_amount + "' onclick = 'showhide_icd(\"hidden_" + condition_amount + "\",\"hiddenbtn_"+condition_amount+ "\",\"controllbtn_"+condition_amount+"\")'>"+ "</button>" + 
				"</div>" +
			"</li>";
			conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
			condition_amount++;
			condition_count++;
			$("#condition_place").append(icd9_create); 
			break;
		case 2://OO drug
			var drug_create = 
			"<li class='list-group-item col-xs-12 nav navbar-custom'  style ='background: #FFFF77' value = 1>" +
				"<div class = 'row' style ='background: #FFAA33;'>"+
					"<div class = 'col-xs-12'>"+ "OO_Drug_Code" + "</div>" +
					"<button class = 'col-xs-1 glyphicon glyphicon-minus' id='delete_" + condition_amount+"' onclick='delete_conditions(this.id)' >"+ "</button>" +
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<form class='col-xs-2'>" + 
							"<input type='text' value='' placeholder = 'Enter Name ex. aspirin'></input>" + 
						"</form>"+
						"<form class='col-xs-3' >" +
							"<input class='form-control' type='file' name='condition_value' onchange='handleFile(this.files,\"hiddenGroup_" + condition_amount + "\",3)' accept='.txt' id= 'uploadfile_" +condition_amount + "' value=''/>"  +
						"</form>"+
						"<label class = 'col-xs-1'>firstday :</label>" +  
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_Y' name='day' checked onchange='alert_firstday()'>Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_M' name='day'>Month</label>" +
						"<label class = 'col-xs-1'>lastday : </label>" +   
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_Y' name='day' checked >Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_M' name='day'>Month</label>" +
 				"</div>"+
				"<div class = 'row' style ='background: #FFFF77;'>" +
						"<label class = 'col-xs-3 checkbox-inline'>Having at least : <input type='number' value='1' min=1 require='required' style='text-align:center'></label>" +
						"<label class = 'col-xs-4 checkbox-inline'>Year Limitation : <input type='number' value='1990' min=1990 max =2013 require='required' style='text-align:center'> -  <input type='number' value='2013' min=1990 max =2013 require='required' style='text-align:center'></label>" + 
						
				"</div>"+
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hidden_" + condition_amount + "'>" +
					"<ul class = 'list-group col-xs-12' id='hiddenGroup_"+condition_amount+"'>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<div class = 'col-xs-2'>like</div>"+
						"</li>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<input class = 'col-xs-2' type='checkbox' value='like_all' onchange='likeicd_all(0,\"hiddenGroup_" + condition_amount + "\")' ></input>"+
						"</li>"+
					"</ul>"+
				"</div>" +
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hiddenbtn_" + condition_amount + "'>" +
						"<button class = 'btn col-xs-12 glyphicon glyphicon-plus' onclick='add_code(2,\"hiddenGroup_" +condition_amount+ "\",0)' style ='background:#DDDDDD;'></button>"+
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<button type = 'button' class = 'col-xs-12 glyphicon glyphicon-chevron-down' value='0' id ='controllbtn_"+ condition_amount + "' onclick = 'showhide_icd(\"hidden_" + condition_amount + "\",\"hiddenbtn_"+condition_amount+ "\",\"controllbtn_"+condition_amount+"\")'>"+ "</button>" + 
				"</div>" +
			"</li>";
			conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
			condition_amount++;
			condition_count++;
			$("#condition_place").append(drug_create); 
			break;
		case 3://DD Sick
			var icd9_create = 
			"<li class='list-group-item col-xs-12 nav navbar-custom'  style ='background: #FFFF77' value = 2>" +
				"<div class = 'row' style ='background: #FFAA33;'>"+
					"<div class = 'col-xs-12'>"+ "DD_icd9_Code" + "</div>" +
					"<button class = 'col-xs-1 glyphicon glyphicon-minus' id='delete_" + condition_amount+"' onclick='delete_conditions(this.id)' >"+ "</button>" +
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<form class='col-xs-2'>" + 
							"<input type='text' value='' placeholder = 'Enter Name ex. Head_injury'></input>" + 
						"</form>"+
						"<form class='col-xs-3' >" +
							"<input class='form-control' type='file' name='condition_value' onchange='handleFile(this.files,\"hiddenGroup_" + condition_amount + "\",5)' accept='.txt' id= 'uploadfile_" +condition_amount + "' value=''/>"  +
						"</form>"+
						"<label class = 'col-xs-1'>firstday :</label>" +  
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_Y' name='day' checked onchange='alert_firstday()'>Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_M' name='day'>Month</label>" +
						"<label class = 'col-xs-1'>lastday : </label>" +   
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_Y' name='day' checked >Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_M' name='day'>Month</label>" +
 				"</div>"+
				"<div class = 'row' style ='background: #FFFF77;'>" +
						"<label class = 'col-xs-3 checkbox-inline'>Having at least : <input type='number' value='1' min=1 require='required' style='text-align:center'></label>" +
						"<label class = 'col-xs-4 checkbox-inline'>Year Limitation : <input type='number' value='1990' min=1990 max =2013 require='required' style='text-align:center'> -  <input type='number' value='2013' min=1990 max =2013 require='required' style='text-align:center'></label>" + 
						
				"</div>"+
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hidden_" + condition_amount + "'>" +
					"<ul class = 'list-group col-xs-12' id='hiddenGroup_"+condition_amount+"'>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<div class = 'col-xs-2'>like</div>"+
							"<div class = 'col-xs-1' checked>icd</div>"+
							"<div class = 'col-xs-1' checked>icd1</div>"+
							"<div class = 'col-xs-1' checked>icd2</div>"+
							"<div class = 'col-xs-1' checked>icd3</div>"+
							"<div class = 'col-xs-1' checked>icd4</div>"+
						"</li>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<input class = 'col-xs-2' type='checkbox' value='like_all' onchange='likeicd_all(0,\"hiddenGroup_" + condition_amount + "\")' ></input>"+
							"<input class = 'col-xs-1' type='checkbox' value='icd1_all' onchange='likeicd_all(1,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-1' type='checkbox' value='icd2_all' onchange='likeicd_all(2,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-1' type='checkbox' value='icd3_all' onchange='likeicd_all(3,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-1' type='checkbox' value='icd2_all' onchange='likeicd_all(4,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-1' type='checkbox' value='icd3_all' onchange='likeicd_all(5,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
						"</li>"+
					"</ul>"+
				"</div>" +
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hiddenbtn_" + condition_amount + "'>" +
						"<button class = 'btn col-xs-12 glyphicon glyphicon-plus' onclick='add_code(4,\"hiddenGroup_" +condition_amount+ "\",0)' style ='background:#DDDDDD;'></button>"+
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<button type = 'button' class = 'col-xs-12 glyphicon glyphicon-chevron-down' value='0' id ='controllbtn_"+ condition_amount + "' onclick = 'showhide_icd(\"hidden_" + condition_amount + "\",\"hiddenbtn_"+condition_amount+ "\",\"controllbtn_"+condition_amount+"\")'>"+ "</button>" + 
				"</div>" +
			"</li>";
			conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
			condition_amount++;
			condition_count++;
			$("#condition_place").append(icd9_create); 
			break;
		case 4://DO drug
			var drug_create = 
			"<li class='list-group-item col-xs-12 nav navbar-custom'  style ='background: #FFFF77' value = 3>" +
				"<div class = 'row' style ='background: #FFAA33;'>"+
					"<div class = 'col-xs-12'>"+ "DO_Drug_Code" + "</div>" +
					"<button class = 'col-xs-1 glyphicon glyphicon-minus' id='delete_" + condition_amount+"' onclick='delete_conditions(this.id)' >"+ "</button>" +
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<form class='col-xs-2'>" + 
							"<input type='text' value='' placeholder = 'Enter Name ex. aspirin'></input>" + 
						"</form>"+
						"<form class='col-xs-3' >" +
							"<input class='form-control' type='file' name='condition_value' onchange='handleFile(this.files,\"hiddenGroup_" + condition_amount + "\",7)' accept='.txt' id= 'uploadfile_" +condition_amount + "' value=''/>"  +
						"</form>"+
						"<label class = 'col-xs-1'>firstday :</label>" +  
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_Y' name='day' checked onchange='alert_firstday()'>Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_M' name='day'>Month</label>" +
						"<label class = 'col-xs-1'>lastday : </label>" +   
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_Y' name='day' checked >Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_M' name='day'>Month</label>" +
 				"</div>"+
				"<div class = 'row' style ='background: #FFFF77;'>" +
						"<label class = 'col-xs-3 checkbox-inline'>Having at least : <input type='number' value='1' min=1 require='required' style='text-align:center'></label>" +
						"<label class = 'col-xs-4 checkbox-inline'>Year Limitation : <input type='number' value='1990' min=1990 max =2013 require='required' style='text-align:center'> -  <input type='number' value='2013' min=1990 max =2013 require='required' style='text-align:center'></label>" + 
						
				"</div>"+
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hidden_" + condition_amount + "'>" +
					"<ul class = 'list-group col-xs-12' id='hiddenGroup_"+condition_amount+"'>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<div class = 'col-xs-2'>like</div>"+
						"</li>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<input class = 'col-xs-2' type='checkbox' value='like_all' onchange='likeicd_all(0,\"hiddenGroup_" + condition_amount + "\")' ></input>"+
						"</li>"+
					"</ul>"+
				"</div>" +
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hiddenbtn_" + condition_amount + "'>" +
						"<button class = 'btn col-xs-12 glyphicon glyphicon-plus' onclick='add_code(6,\"hiddenGroup_" +condition_amount+ "\",0)' style ='background:#DDDDDD;'></button>"+
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<button type = 'button' class = 'col-xs-12 glyphicon glyphicon-chevron-down' value='0' id ='controllbtn_"+ condition_amount + "' onclick = 'showhide_icd(\"hidden_" + condition_amount + "\",\"hiddenbtn_"+condition_amount+ "\",\"controllbtn_"+condition_amount+"\")'>"+ "</button>" + 
				"</div>" +
			"</li>";
			conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
			condition_amount++;
			condition_count++;
			$("#condition_place").append(drug_create); 
			break;
		default:
			alert("Error Create conditionbar");
			break;
		}
}
function alert_firstday(){
	alert("Cancel the Firstday-Year Option may cause the Anaysis Function not working !");
}
function Add_StandardDiseaseBar(DiseaseName){
	if($('#selectMainCondition').find('label').eq(2).find('input').is(":checked")){
		alert("You have choose 16_StandardDisease option .This action would cause a problem if you add single standardDisease");
		return;
	}
	var icd9_create = 
			"<li class='list-group-item col-xs-12 nav navbar-custom'  style ='background: #FFFF77' value = 0>" +
				"<div class = 'row' style ='background: #FFAA33;'>"+
					"<div class = 'col-xs-12'>"+ "CD_icd9_Code" + "</div>" +
					"<button class = 'col-xs-1 glyphicon glyphicon-minus' id='delete_" + condition_amount+"' onclick='delete_conditions(this.id)' >"+ "</button>" +
				"</div>" +
								"<div class = 'row' style ='background: #FFFF77;margin:0px 0px 10px 0px'>"+
						"<form class='col-xs-2'>" + 
							"<input type='text' value='" + DiseaseName + "' placeholder = 'Enter Name ex. Head_injury'></input>" + 
						"</form>"+
						"<form class='col-xs-3' >" +
							"<input class='form-control' type='file' name='condition_value' onchange='handleFile(this.files,\"hiddenGroup_" + condition_amount + "\",1)' accept='.txt' id= 'uploadfile_" +condition_amount + "' value=''/>"  +
						"</form>"+
						"<label class = 'col-xs-1'>firstday :</label>" +  
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_Y' name='day' checked >Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='fd_M' name='day'>Month</label>" +
						"<label class = 'col-xs-1'>lastday : </label>" +   
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_Y' name='day' checked >Year</label>" +
						"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='ld_M' name='day'>Month</label>" +
 				"</div>"+
				"<div class = 'row' style ='background: #FFFF77;'>" +
						"<label class = 'col-xs-3 checkbox-inline'>Having at least : <input type='number' value='1' min=1 require='required' style='text-align:center'></label>" +
						"<label class = 'col-xs-4 checkbox-inline'>Year Limitation : <input type='number' value='1990' min=1990 max =2013 require='required' style='text-align:center'> -  <input type='number' value='2013' min=1990 max =2013 require='required' style='text-align:center'></label>" + 
						
				"</div>"+
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hidden_" + condition_amount + "'>" +
					"<ul class = 'list-group col-xs-12' id='hiddenGroup_"+condition_amount+"'>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<div class = 'col-xs-2'>like</div>"+
							"<div class = 'col-xs-2'>icd1</div>"+
							"<div class = 'col-xs-2'>icd2</div>"+
							"<div class = 'col-xs-2'>icd3</div>"+
						"</li>"+
						"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
							"<div class = 'col-xs-4'></div>"+
							"<input class = 'col-xs-2' type='checkbox' value='like_all' onchange='likeicd_all(0,\"hiddenGroup_" + condition_amount + "\")' ></input>"+
							"<input class = 'col-xs-2' type='checkbox' value='icd1_all' onchange='likeicd_all(1,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-2' type='checkbox' value='icd2_all' onchange='likeicd_all(2,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
							"<input class = 'col-xs-2' type='checkbox' value='icd3_all' onchange='likeicd_all(3,\"hiddenGroup_" + condition_amount + "\")' checked></input>"+
						"</li>"+
					"</ul>"+
				"</div>" +
				"<div class = 'row' style ='background:#DDDDDD;display:none;' id='hiddenbtn_" + condition_amount + "'>" +
						"<button class = 'btn col-xs-12 glyphicon glyphicon-plus' onclick='add_code(0,\"hiddenGroup_" +condition_amount+ "\",0)' style ='background:#DDDDDD;'></button>"+
				"</div>" +
				"<div class = 'row' style ='background: #FFFF77;'>"+
						"<button type = 'button' class = 'col-xs-12 glyphicon glyphicon-chevron-down' value='0' id ='controllbtn_"+ condition_amount + "' onclick = 'showhide_icd(\"hidden_" + condition_amount + "\",\"hiddenbtn_"+condition_amount+ "\",\"controllbtn_"+condition_amount+"\")'>"+ "</button>" + 
				"</div>" +
			"</li>";
	conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
	condition_amount++;
	condition_count++;
	$("#condition_place").append(icd9_create); 
	var DiseaseCode =  getDiseaseCode(DiseaseName);
	for(var i=0;i< DiseaseCode.length;i++){
		add_code(1,"hiddenGroup_"+ (condition_amount-1), DiseaseCode[i]);
	}

}
/*Load .txt into condition setting bar*/
function handleFile(file,group_id,icdordrug){
	var fileRead = file[0];
    //var path = require('path');

    var reader = new FileReader();

    reader.onload = (function(filename,group_id,icdordrug){
    	return function(e){
   		 // By lines
   			var lines = this.result.split('\n');
    		for(var i = 0; i < lines.length; i++){
    			if(i != lines.length -1){
    				if(lines[i].slice(-2,-1) == "%" && checkVal(lines[i].slice(0,-2)) == true){
    					add_code(icdordrug,group_id,lines[i].slice(0,lines[i].indexOf('\n')));
    				}else if(checkVal(lines[i].slice(0,lines[i].indexOf('\n'))) == true){
      					add_code(icdordrug,group_id,lines[i].slice(0,lines[i].indexOf('\n')));
    				}else{
    					alert(lines[i] + " - " + lines[i].slice(-2,-1)+ "-" + lines[i].slice(0,-2) +" : this input is not a valid code");
    				}

    			}
      			else{
      				if(lines[i].slice(-2,-1) == "%" && checkVal(lines[i].slice(0,-2)) == true){
      					add_code(icdordrug,group_id,lines[i]);
      				}else if(checkVal(lines[i].slice(0,lines[i].indexOf('\n'))) == true){
      					add_code(icdordrug,group_id,lines[i]);
      				}else{
      					alert(lines[i] +" : this input is not a valid code");
      				}
      			}
     
  	 		}
    	}
    })(fileRead,group_id,icdordrug);
    reader.readAsText(fileRead); 

}
/*check disease or drug code*/
function checkVal(str) {
    var regExp = /^[\d|a-zA-Z]+$/;
    if (regExp.test(str)){
        return true;
    }
    else{
        return false;
    }
}
/*check name*/
function checkName(str) {
    var regExp = /^[\d|a-zA-Z_]+$/;
    if (regExp.test(str)){
        return true;
    }
    else{
        return false;
    }
}
/*Add code_line into Hidden_group*/
function add_code(action_mode,group_id,code){

	switch(action_mode){
		case 0://CD_Sick blank icd9_code
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='' placeholder = 'Enter icd9_Code'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)'></input>"+
				"<input class = 'col-xs-2' type='checkbox' value='icd1_all' checked></input>"+
				"<input class = 'col-xs-2' type='checkbox' value='icd2_all' checked></input>"+
				"<input class = 'col-xs-2' type='checkbox' value='icd3_all' checked></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;
		case 1://CD_Sick load icd9_code
			var likeornot = (code.slice(-1) == "%"? "checked":"");
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='"+ code +"' placeholder = 'Enter icd9_Code'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)' "+ likeornot +"></input>"+
				"<input class = 'col-xs-2' type='checkbox' value='icd1_all' checked></input>"+
				"<input class = 'col-xs-2' type='checkbox' value='icd2_all' checked></input>"+
				"<input class = 'col-xs-2' type='checkbox' value='icd3_all' checked></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;
		case 2://OO_Drug blank Drug_code
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='' placeholder = 'Enter Drug_No'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)'></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;
		case 3://OO_Drug load Drug_code
			var likeornot = (code.slice(-1) == "%"? "checked":"");
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='"+ code +"' placeholder = 'Enter Drug_No'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)' "+ likeornot +"></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;
		case 4://DD_Sick blank icd9_code
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='' placeholder = 'Enter icd9_Code'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)'></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd1_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd2_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd3_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd4_all' checked></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;
		case 5://DD_Sick load icd9_code
			var likeornot = (code.slice(-1) == "%"? "checked":"");
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='"+ code +"' placeholder = 'Enter icd9_Code'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)' "+ likeornot +"></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd1_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd2_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd3_all' checked></input>"+
				"<input class = 'col-xs-1' type='checkbox' value='icd4_all' checked></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;
		case 6://DO_Drug blank order_code
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='' placeholder = 'Enter Order_code'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)'></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;
		case 7://DO_Drug load order_code
			var likeornot = (code.slice(-1) == "%"? "checked":"");
			var group_item = 
			"<li class = 'list-group-item row' style = 'background:none;height:100%;'>"+
				"<form class='col-xs-4'>" + "<input type='text' value='"+ code +"' placeholder = 'Enter Order_code'></input>" + "</form>"+
				"<input class = 'col-xs-2' type='checkbox' value='like_all' id = 'Tempicd9_" + amount +"' onchange='like_plus_percent(this.id)' "+ likeornot +"></input>"+
			"</li>";
			$("#"+group_id).append(group_item);
			amount++;
			break;

	}

}
function likeicd_all(action_mode,group_id){

	switch(action_mode){
		case 0://like option
			if($("#"+group_id).find('li').eq(1).find('input').eq(0).is(":checked")  == true){
				var element = $("#"+group_id);
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					if(child.find('input').eq(1).is(":checked") == false){
						child.find('input').eq(1).prop("checked",true);
						like_plus_percent(child.find('input').eq(1).attr("id"));	
					}	
				}
			}else{
				var element = $("#"+group_id);
				//var long = element.children().length - 1;
				//for(var child = element.find('li').eq(2);child;child = child.next()){ 
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){ 
					if(child.find('input').eq(1).is(":checked") == true){ //if use child , will occur bug
						child.find('input').eq(1).prop("checked",false);
						like_plus_percent(child.find('input').eq(1).attr("id"));

					}
					//long--;
				}
			}
			break;
		case 1://icd
			if($("#"+group_id).find('li').eq(1).find('input').eq(1).is(":checked")  == true){
				var element = $("#"+group_id);
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(2).prop("checked",true);	
				}
			}else{
				var element = $("#"+group_id);
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(2).prop("checked",false);
				}
			}
			break;
		case 2://icd1
			if($("#"+group_id).find('li').eq(1).find('input').eq(2).is(":checked")  == true){
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(3).prop("checked",true);	
				}
			}else{
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(3).prop("checked",false);	
				}				
			}
			break;
		case 3://icd2
			if($("#"+group_id).find('li').eq(1).find('input').eq(3).is(":checked")  == true){
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(4).prop("checked",true);	
				}				
			}else{
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(4).prop("checked",false);	
				}					
			}
			break;
		case 4://icd3
			if($("#"+group_id).find('li').eq(1).find('input').eq(4).is(":checked")  == true){
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(5).prop("checked",true);	
				}				
			}else{
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(5).prop("checked",false);	
				}					
			}
			break;
		case 5://icd4
			if($("#"+group_id).find('li').eq(1).find('input').eq(5).is(":checked")  == true){
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(6).prop("checked",true);	
				}				
			}else{
				var element = $("#"+group_id);
				var long = element.children().length;
				for(var child = element.find('li').eq(2);child.is('li') == true ;child = child.next()){
					child.find('input').eq(6).prop("checked",false);	
				}					
			}
			break;			
	}
}
function like_plus_percent(id){
	var string = $("#"+id).closest('li').find('form').eq(0).find('input').val();
	if($("#"+id).is(":checked")  == true){
		$("#"+id).closest('li').find('form').eq(0).find('input').val(string +"\%");
	}else{
		$("#"+id).closest('li').find('form').eq(0).find('input').val(string.slice(0,-1));
	}
}
function showhide_icd(show_id,btn_id,controllbtn_id){
	switch($("#"+controllbtn_id).attr("value")){
		case "0":
			$("#"+controllbtn_id).attr("value","1");
			$("#"+controllbtn_id).attr("class","col-xs-12 glyphicon glyphicon-chevron-up");
			$("#"+show_id).show("toggle");
			$("#"+btn_id).show("toggle");
			break;
		case "1":
			$("#"+controllbtn_id).attr("value","0");
			$("#"+controllbtn_id).attr("class","col-xs-12 glyphicon glyphicon-chevron-down");
			$("#"+show_id).hide("toggle");
			$("#"+btn_id).hide("toggle");
			break;
	}

}
function delete_conditions(condition_id){
	$("#"+condition_id).closest('li').remove(); //can also use $(this.id).closest('.li').remove() to climb up util find <li>
	conditionbar.splice(conditionbar.indexOf(condition_id),1);

	condition_count--;
}



function buildSQL(){
	/*
	select t2.id,sex,birthday, area, ins_amt,first_icd9,firstday,lastday
    from (
  
    select t1.id,sex,birthday, area, ins_amt , "1" as first_icd9, min(func_date) as firstday, max(func_date) as lastday
    from (
	    select id, func_date
	    from hi_2013.cd_2013
	    where acode_icd9_1 like "314%" or acode_icd9_2 like "314%" or acode_icd9_3 like "314%"	
        group by id, func_date
        having count(id) >= 1 
  
        union 
    
        select id, in_date as func_date
	    from dd_2010
	    where icd9cm_code like "314%" or  icd9cm_code_1 like "314%" or icd9cm_code_2  like "314%" or icd9cm_code_3 like "314%" or icd9cm_code_4 like "314%" 
        group by id, in_date
	    having count(id) >= 1
  
	)   t1, hi_2013.res_allpeopleinfo
	where (t1.id = res_allpeopleinfo.id)
	group by t1.id,sex,birthday, area, ins_amt

	union

	select id,sex,birthday, area, ins_amt, "0" as first_icd9, "0" as firstday, "0" as lastday
	from  hi_2013.res_allpeopleinfo
	where id not in (
	  select t1.id
	  from (
		select id
		from hi_2013.cd_2013
		where acode_icd9_1 like "314%" or acode_icd9_2 like "314%" or acode_icd9_3 like "314%"	
 	    group by id
 	    having count(id) >= 1 
    
 	    union 
    
    	select id
		from dd_2010
		where icd9cm_code like "314%" or  icd9cm_code_1 like "314%" or icd9cm_code_2  like "314%" or icd9cm_code_3 like "314%" or icd9cm_code_4 like "314%" 
	    group by id, in_date
		having count(id) >= 1
    
	  )t1, hi_2013.res_allpeopleinfo
	  where (t1.id = res_allpeopleinfo.id)
	  group by t1.id,sex,birthday, area, ins_amt
  
	)
	)t2
	order by id;

	*/

	
 
	/*--------------- 1. Build SQL-----------------*/

	//reset global variable
	insideToOutside = [];
	standarddisease = [];
	tNum=2;


	var selectServer = $('input[name="server"]:checked', '#selectServer').val(); // get Server
	var selectTable = $('input[name="year"]:checked', '#selectYear').val(); // get Table
	//get Year
	var selectYear; 

	
	if(selectTable == "hi_2010"){
		selectYear = "2010";
		selectTable = "default";
	}else if (selectTable == "hi_2013all"){
		selectYear = "2013";
	}else{
		selectYear = selectTable.slice(3);
	}

	/*if(selectServer == "z2202"){
		if(selectTable == "hi_2013"){
			selectTable = "hi_2013all";
		}
	}*/

	//get MainConditions
	var selectMainCondition=[];

	//optional conditions
	for(var i=0;i<2;i++){
		if($('#selectMainCondition').find('label').eq(i).find('input').is(":checked")){
			selectMainCondition.push($('#selectMainCondition').find('label').eq(i).find('input').val());
		}
	}	


	/* get Outside_SQL & inside_SQL 
		select t0.id,sex,birthday, area, ins_amt,first_icd9,firstday,lastday
   		from (
    		..........
    	}t0
    	order by t0.id;
	*/ 

	//seperate plus stddisease and not
	var inside_SQL = getinsideSQL(selectTable,selectYear);
	var inside_SQL_plus_standarddisease = inside_SQL;

	//if there is an error, return
	if(inside_SQL == "" ){
		return;
	}

	//check CCI_standardDisease option , if yes then plus it
	var flag_standarddisease = 0;
	if($('#selectMainCondition').find('label').eq(2).find('input').is(":checked")){
		flag_standarddisease = 1;
		if(tNum > 2) {
			inside_SQL_plus_standarddisease = inside_SQL_plus_standarddisease + ","+ getstddiseaseSQL(selectTable,selectYear);
		}
		else {
			inside_SQL_plus_standarddisease = inside_SQL_plus_standarddisease +  getstddiseaseSQL(selectTable,selectYear);
		}
	}
	//Error detection, if cci_standarddisease is been chosen but still use standard diseaase name
	for(var i=0;i<standarddisease.length;i++){
		for(var j=0;j<insideToOutside.length;j++){
			if(standarddisease[i] == insideToOutside[j].toLowerCase()){
				alert("Error - [CCI_standard Duplicate Name] : ["+ standarddisease[i] + "] is a standard disease. If you choose CCI_standard option, you cannot use this name");
				return;
			}
		}
	}

	var outside_SQL = "\nselect t2.id";
	var outside_SQL_plus_standarddisease = "\nselect t2.id";
	//Add Main condition ex. sex,birthday,area,ins_amt
	//essential conditions birthday(year) & sex 
	outside_SQL = outside_SQL + ",substr(t2.birthday,1,4) as birthday";
	outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + ",substr(t2.birthday,1,4) as birthday";

	outside_SQL = outside_SQL + ",t2.sex";
	outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + ",t2.sex";

	for(var i=0;i<selectMainCondition.length;i++){
		outside_SQL = outside_SQL + ",t2." + selectMainCondition[i];
		outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + ",t2." + selectMainCondition[i];
	}
	for(var i=0;i<insideToOutside.length;i++){
		outside_SQL = outside_SQL + "," + insideToOutside[i];
		outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "," + insideToOutside[i];
	}

	//if cci_standard disease get checked , plus standard disease column name into outside_SQL_plus_standarddisease 'select' part
	for(var i=0;i<standarddisease.length;i++){
		outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "," + standarddisease[i];
	}

	outside_SQL = outside_SQL + "\n" + "from " + inside_SQL + "\n";
	outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "\n" + "from " + inside_SQL_plus_standarddisease + "\n";

	//where (t2.id = t3.id) and (t2.id = t4.id)
	/*for(var i=3;i<tNum;i++){
		if(i == 3){
			outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "where (t2.id = t" + i + ".id)"; 
		}else{
			outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "and (t2.id = t" + i + ".id)";
		}

		if((tNum-1) == i){
			outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "\n";
		}
	}

	if(flag_standarddisease == 1){
		for(var i=3;i<tNum-1;i++){
			if(i == 3){
				outside_SQL = outside_SQL + "where (t2.id = t" + i + ".id)";
			}else{
				outside_SQL = outside_SQL + "and (t2.id = t" + i + ".id)";
			}
			if((tNum-1) == i){
				outside_SQL = outside_SQL + "\n";
			}
		}
	}else{
		for(var i=3;i<tNum;i++){
			if(i == 3){
				outside_SQL = outside_SQL + "where (t2.id = t" + i + ".id)";
			}else{
				outside_SQL = outside_SQL + "and (t2.id = t" + i + ".id)";
			}

			if((tNum-1) == i){
				outside_SQL = outside_SQL + "\n";
			}
		}
	}*/


	//group by t2.id,sex,birthday, area, ins_amt,first_icd9,firstday,lastday,sec_icd9,firstday_sec,lastday_sec,third_drug,firstday_third,lastday_third 
	//order by id;
	outside_SQL = outside_SQL + "group by t2.id";
	outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease  + "group by t2.id";
    outside_SQL = outside_SQL + ",birthday";
    outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease  + ",birthday";
	outside_SQL = outside_SQL + ",sex";
	outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease  + ",sex";

	for(var i=0;i<selectMainCondition.length;i++){
		outside_SQL = outside_SQL + "," + selectMainCondition[i];
		outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease  + "," + selectMainCondition[i];
	}
	for(var i=0;i<insideToOutside.length;i++){
		outside_SQL = outside_SQL + "," + insideToOutside[i];
		outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease  + "," + insideToOutside[i];
	}

	//if cci_standard disease get checked , plus standard disease column name into outside_SQL_plus_standarddisease 'select' part
	for(var i=0;i<standarddisease.length;i++){
		outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "," + standarddisease[i];
	}

	outside_SQL = outside_SQL + "\norder by id;" 
	outside_SQL_plus_standarddisease = outside_SQL_plus_standarddisease + "\norder by id;" ;

	//copy SQL into copying place and showing place
	if(flag_standarddisease == 1){
		$("#build_sql").html(outside_SQL_plus_standarddisease);
		$("#build_sql_show").html(outside_SQL_plus_standarddisease);
	}else{
		$("#build_sql").html(outside_SQL);
		$("#build_sql_show").html(outside_SQL);
	}
	//save sql into Analysis_Function.js , without standarddisease
	saveVariable(outside_SQL,selectServer,selectTable);
	


	/*--------------- 2. change to SQL page ----------*/
	$("#top_page").hide("slow");
	$("#main_page").hide("slow");
	$("#buildSQL_btn").hide("slow");

	$("#SQL_page").show("slow");
	$("#AnalysisCheck_page").show("slow");
	$("#ShowSQLModal").modal("show");


	/*change the url that guild user to z2202 or dell8*/
	if(selectServer == "z2202"){
		//$("#directurl_url").attr("href","140.117.171.77:8888");
		$("#directurl_url").html("z2202");
	}else{
		//$("#directurl_url").attr("href","140.117.170.29:8888");
		$("#directurl_url").html("dell8");
	}
	
}

function guildtohue(html){
	if(html == "z2202"){
		//var win = window.open("140.117.171.77:8888",'_blank');
		var win = window.open("http://140.117.171.77:8888",'_blank');
		//win.focus();
	}else{
		var win = window.open("http://140.117.170.29:8888",'_blank');
		//win.focus();
	}

}

/* select t1.id,sex,birthday, area, ins_amt , "1" as first_icd9, min(func_date) as firstday, max(func_date) as lastday
    from (
	    select id, func_date
	    from hi_2013.cd_2013
	    where acode_icd9_1 like "314%" or acode_icd9_2 like "314%" or acode_icd9_3 like "314%"	
        group by id, func_date
        having count(id) >= 1 
	)   t1, hi_2013.res_allpeopleinfo
	where (t1.id = res_allpeopleinfo.id)
	group by t1.id,sex,birthday, area, ins_amt

	union

	select id,sex,birthday, area, ins_amt, "0" as first_icd9, "0" as firstday, "0" as lastday
	from  hi_2013.res_allpeopleinfo
	where id not in (
	  select t1.id
	  from (
		select id
		from hi_2013.cd_2013
		where acode_icd9_1 like "314%" or acode_icd9_2 like "314%" or acode_icd9_3 like "314%"	
 	    group by id
 	    having count(id) >= 1 
	  )t1, hi_2013.res_allpeopleinfo
	  where (t1.id = res_allpeopleinfo.id)
	  group by t1.id,sex,birthday, area, ins_amt
	 )
	*/
function getCDicdSQL(Name,firstday_year,firstday_month,lastday_year,lastday_month,icd9Part,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear){
	//Reduce Version
	var icdSQL = 
	"\n(\n\nselect allpeople.id,sex,birthday,area,ins_amt,case when fd_min is null  then \"0\" else \"1\" end as " + Name + 
	(firstday_year == 1? ",isnull(substr(fd_min,1,4),\"0\") as fdYear_" + Name : "") + (firstday_month == 1? ",isnull(substr(fd_min,5,2),\"0\") as fdMon_" + Name : "") + 
	(lastday_year == 1? ",isnull(substr(fd_max,1,4),\"0\") as ldYear_" + Name: "" ) +  (lastday_month == 1? ",isnull(substr(fd_max,5,2),\"0\") as ldMon_" + Name: "" )+"\n" +
	"from (\n" +
	"    select t1.id,min(func_date) as fd_min,max(func_date) as fd_max\n"+
	"    from(\n" +
	"        select id,func_date\n" +
	"        from "+ selectTable + ".cd_" + selectYear + "\n" +
	"        where "+ icd9Part + "\n" +
	"        group by id,func_date" + "\n" +
	"    )t1\n" +
	"    where t1.func_date between \"" + YearLimit_prev + "0101\" and  \"" + YearLimit_next + "1231\"\n" +  
	"    group by id\n" +
	"    having count(id) >= " + havingCount + "\n" +
	")t1\n" +
	"right outer join " + selectTable + ".res_allpeopleinfo as allpeople using (id)\n" +
	"group by allpeople.id,sex,birthday,area,ins_amt," + Name + 
	(firstday_year == 1? ",fdYear_" + Name : "") + (firstday_month == 1? ",fdMon_" + Name : "") + 
	(lastday_year == 1? ",ldYear_" + Name: "" ) +  (lastday_month == 1? ",ldMon_" + Name : "" )+ "\n\n" + 
	")t" + tNum;	

	//Original Version
	/*var icdSQL = 
		"\n(\n\nselect t1.id,sex,birthday,area,ins_amt,\"1\" as " + Name + 
		(firstday_year == 1? ",substr(min(func_date),1,4) as fdYear_" + Name : "") + (firstday_month == 1? ",substr(min(func_date),5,2) as fdMon_" + Name : "") + 
		(lastday_year == 1? ",substr(max(func_date),1,4) as ldYear_" + Name: "" ) +  (lastday_month == 1? ",substr(max(func_date),5,2) as ldMon_" + Name: "" )+"\n" +
		"from (\n" + 
		"    select id,func_date\n" +
		"    from "+ selectTable + ".cd_" + selectYear + "\n" +
		"    where "+ icd9Part + "\n" +
		"    group by id,func_date" + "\n" +
		")t1," + selectTable + ".res_allpeopleinfo\n" +
		"where (t1.id = res_allpeopleinfo.id) and t1.func_date >= \"" + YearLimit_prev + "0101\" and t1.func_date <= \"" + YearLimit_next + "1231\"\n" +  
		"group by t1.id,sex,birthday, area, ins_amt\n" +
		"having count(id) >= " + havingCount + "\n" +
		"\n" + 
		"union\n"+
		"\n"+
		"select id,sex,birthday,area,ins_amt,\"0\" as " + Name + 
		(firstday_year == 1? ",\"0\" as fdYear_" + Name : "") + (firstday_month == 1? ",\"0\" as fdMon_" + Name: "" ) +
		(lastday_year == 1? ",\"0\" as ldYear_" + Name : "") + (lastday_month == 1? ",\"0\" as ldMon_" + Name: "" )+"\n" +
		"from " + selectTable + ".res_allpeopleinfo\n" + 
		"where id not in (\n" +
		"    select t1.id\n" +
		"    from (\n" + 
		"        select id,func_date\n" +
		"        from "+ selectTable + ".cd_" + selectYear + "\n" +
		"        where "+ icd9Part + "\n" +
		"        group by id,func_date" + "\n" +
		"    )t1," + selectTable + ".res_allpeopleinfo\n" +
		"    where (t1.id = res_allpeopleinfo.id) and t1.func_date >= \"" + YearLimit_prev + "0101\" and t1.func_date <= \"" + YearLimit_next + "1231\"\n" +
		"    group by t1.id,sex,birthday, area, ins_amt\n" +
		"    having count(id) >= " + havingCount + "\n" +
		")\n\n"+
		")t" + tNum;*/

	tNum++;
	insideToOutside.push(Name);
	if(firstday_year == 1) insideToOutside.push("fdYear_" + Name);
	if(firstday_month == 1) insideToOutside.push("fdMon_" + Name);
	if(lastday_year == 1) insideToOutside.push("ldYear_" + Name);
	if(lastday_month == 1) insideToOutside.push("ldMon_" + Name);
	return icdSQL;
}

/*select cd.id,sex,birthday, area, ins_amt, "1" as third_drug, min(cd.func_date) as firstday_third, max(cd.func_date) as lastday_third
  from hi_2013.cd_2013 as cd, (
    select fee_ym, hosp_id, appl_type, appl_date, case_type, seq_no
    from hi_2013.oo_2013
    where drug_no = "AC57986245  "  
) as oo,res_allpeopleinfo 
  where cd.fee_ym = oo.fee_ym
    and cd.hosp_id = oo.hosp_id
    and cd.appl_type = oo.appl_type
    and cd.appl_date = oo.appl_date
    and cd.case_type = oo.case_type
    and cd.seq_no = oo.seq_no
    and cd.id = res_allpeopleinfo.id
  group by id,sex,birthday, area, ins_amt
  order by id

  union

  select id,sex,birthday, area, ins_amt, "0" as third_drug, "0" as firstday_third, "0" as lastday_third
  from  hi_2013.res_allpeopleinfo
  where id not in (
    select cd.id
    from hi_2013.cd_2013 as cd, (
      select fee_ym, hosp_id, appl_type, appl_date, case_type, seq_no
      from hi_2013.oo_2013
      where drug_no = "AC57986245  "
    ) as oo,res_allpeopleinfo 
    where cd.fee_ym = oo.fee_ym
      and cd.hosp_id = oo.hosp_id
      and cd.appl_type = oo.appl_type
      and cd.appl_date = oo.appl_date
      and cd.case_type = oo.case_type
      and cd.seq_no = oo.seq_no
      and cd.id = res_allpeopleinfo.id
    group by id,sex,birthday, area, ins_amt
    order by id
  )
)t4
*/
function getOODrugSQL(Name,firstday_year,firstday_month,lastday_year,lastday_month,DrugPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear){
	//Reduce Version
	var drugSQL = 
		"\n(\n\nselect allpeople.id,sex,birthday,area,ins_amt,case when fd_min is null  then \"0\" else \"1\" end as " + Name + 
	    (firstday_year == 1? ",isnull(substr(fd_min,1,4),\"0\") as fdYear_" + Name : "") + (firstday_month == 1? ",isnull(substr(fd_min,5,2),\"0\") as fdMon_" + Name : "") + 
	    (lastday_year == 1? ",isnull(substr(fd_max,1,4),\"0\") as ldYear_" + Name: "" ) +  (lastday_month == 1? ",isnull(substr(fd_max,5,2),\"0\") as ldMon_" + Name: "" )+"\n" +
	    "from (\n" +
		"    select t1.id,min(func_date) as fd_min,max(func_date) as fd_max\n"+
		"    from(\n" +
		"        select id,func_date\n" +
		"        from " + selectTable + ".cd_" + selectYear + " as cd\n" +
		"        join " + selectTable + ".oo_" + selectYear + " as oo using (fee_ym,hosp_id,appl_type,appl_date,case_type,seq_no)\n" +
		"        where " + DrugPart + "\n" +
		"        group by id,func_date\n" +
		"    )t1\n" +
		"    where t1.func_date between \"" + YearLimit_prev + "0101\" and  \"" + YearLimit_next + "1231\"\n" +  
		"    group by id\n" +
		"    having count(id) >= " + havingCount + "\n" +
		")t1\n" +
		"right outer join " + selectTable + ".res_allpeopleinfo as allpeople using (id)\n" +
		"group by allpeople.id,sex,birthday,area,ins_amt," + Name + 
		(firstday_year == 1? ",fdYear_" + Name : "") + (firstday_month == 1? ",fdMon_" + Name : "") + 
		(lastday_year == 1? ",ldYear_" + Name: "" ) +  (lastday_month == 1? ",ldMon_" + Name : "" )+ "\n\n" + 
		")t" + tNum;
	//Original Version
	/* 
	var drugSQL = 
		"\n(\n\nselect cd.id,sex,birthday,area,ins_amt,\"1\" as " + Name + 
		(firstday_year == 1? ",substr(min(func_date),1,4) as fdYear_" + Name : "") + (firstday_month == 1? ",substr(min(func_date),5,2) as fdMon_" + Name : "") + 
		(lastday_year == 1? ",substr(max(func_date),1,4) as ldYear_" + Name: "" ) +  (lastday_month == 1? ",substr(max(func_date),5,2) as ldMon_" + Name: "" )+"\n" +
		"from " + selectTable + ".cd_" + selectYear +  " as cd, (\n" + 
		"    select fee_ym, hosp_id ,appl_type, appl_date, case_type,seq_no\n" +
		"    from " + selectTable + ".oo_" + selectYear + "\n" +
		"    where " + DrugPart + "\n" +
		")as oo, " + selectTable + ".res_allpeopleinfo\n" +
		"where cd.fee_ym = oo.fee_ym\n" + 
		"  and cd.hosp_id = oo.hosp_id\n" + 
		"  and cd.appl_type = oo.appl_type\n" +
		"  and cd.appl_date = oo.appl_date\n" +
		"  and cd.case_type = oo.case_type\n" +
		"  and cd.seq_no = oo.seq_no\n" +
		"  and cd.id = res_allpeopleinfo.id\n" +
		"  and cd.func_date >= \"" + YearLimit_prev + "0101\" and cd.func_date <= \"" + YearLimit_next + "1231\"\n" +
		"group by cd.id,sex,birthday, area, ins_amt\n" +
		"having count(id) >= " + havingCount + "\n" +  
		"\n" +
		"union\n" +
		"\n" +
		"select id,sex,birthday,area,ins_amt,\"0\" as " + Name + 
		(firstday_year == 1? ",\"0\" as fdYear_" + Name : "") + (firstday_month == 1? ",\"0\" as fdMon_" + Name: "" ) +
		(lastday_year == 1? ",\"0\" as ldYear_" + Name : "") + (lastday_month == 1? ",\"0\" as ldMon_" + Name: "" )+"\n" +
		"from " + selectTable + ".res_allpeopleinfo\n" +
		"where id not in (\n" +
		"    select cd.id" +
		"    from " + selectTable + ".cd_" + selectYear +  " as cd, (\n" + 
		"        select fee_ym, hosp_id ,appl_type, appl_date, case_type,seq_no\n" +
		"        from " + selectTable + ".oo_" + selectYear + "\n" +
		"        where " + DrugPart + "\n" +
		"    )as oo, " + selectTable + ".res_allpeopleinfo\n" +
		"    where cd.fee_ym = oo.fee_ym\n" + 
		"      and cd.hosp_id = oo.hosp_id\n" + 
		"      and cd.appl_type = oo.appl_type\n" +
		"      and cd.appl_date = oo.appl_date\n" +
		"      and cd.case_type = oo.case_type\n" +
		"      and cd.seq_no = oo.seq_no\n" +
		"      and cd.id = res_allpeopleinfo.id\n" +
		"      and cd.func_date >= \"" + YearLimit_prev + "0101\" and cd.func_date <= \"" + YearLimit_next + "1231\"\n" +
		"    group by cd.id,sex,birthday, area, ins_amt\n" +
		"    having count(id) >= " + havingCount + "\n" +  
		")\n\n"+
		")t"+ tNum;
	*/
	tNum++;
	insideToOutside.push(Name);
	if(firstday_year == 1) insideToOutside.push("fdYear_" + Name);
	if(firstday_month == 1) insideToOutside.push("fdMon_" + Name);
	if(lastday_year == 1) insideToOutside.push("ldYear_" + Name);
	if(lastday_month == 1) insideToOutside.push("ldMon_" + Name);
	return drugSQL;
}


function getDDicdSQL(Name,firstday_year,firstday_month,lastday_year,lastday_month,icd9Part,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear){
	//Reduce Version
	var icdSQL = 
	"\n(\n\nselect allpeople.id,sex,birthday,area,ins_amt,case when fd_min is null  then \"0\" else \"1\" end as " + Name + 
	(firstday_year == 1? ",isnull(substr(fd_min,1,4),\"0\") as fdYear_" + Name : "") + (firstday_month == 1? ",isnull(substr(fd_min,5,2),\"0\") as fdMon_" + Name : "") + 
	(lastday_year == 1? ",isnull(substr(fd_max,1,4),\"0\") as ldYear_" + Name: "" ) +  (lastday_month == 1? ",isnull(substr(fd_max,5,2),\"0\") as ldMon_" + Name: "" )+"\n" +
	"from (\n" +
	"    select t1.id,min(in_date) as fd_min,max(in_date) as fd_max\n"+
	"    from(\n" +
	"        select id,in_date\n" +
	"        from "+ selectTable + ".dd_" + selectYear + "\n" +
	"        where "+ icd9Part + "\n" +
	"        group by id,in_date" + "\n" +
	"    )t1\n" +
	"    where t1.in_date between \"" + YearLimit_prev + "0101\" and  \"" + YearLimit_next + "1231\"\n" +
	"    group by id\n" +
	"    having count(id) >= " + havingCount + "\n" +
	")t1\n" +
	"right outer join " + selectTable + ".res_allpeopleinfo as allpeople using (id)\n" +
	"group by allpeople.id,sex,birthday,area,ins_amt," + Name + 
	(firstday_year == 1? ",fdYear_" + Name : "") + (firstday_month == 1? ",fdMon_" + Name : "") + 
	(lastday_year == 1? ",ldYear_" + Name: "" ) +  (lastday_month == 1? ",ldMon_" + Name : "" )+ "\n\n" + 
	")t" + tNum;
	//Original Version
	/*var icdSQL = 
		"\n(\n\nselect t1.id,sex,birthday,area,ins_amt,\"1\" as " + Name + 
		(firstday_year == 1? ",substr(min(func_date),1,4) as fdYear_" + Name : "") + (firstday_month == 1? ",substr(min(func_date),5,2) as fdMon_" + Name : "") + 
		(lastday_year == 1? ",substr(max(func_date),1,4) as ldYear_" + Name: "" ) +  (lastday_month == 1? ",substr(max(func_date),5,2) as ldMon_" + Name: "" )+"\n" +
		"from (\n" + 
		"    select id,in_date\n" +
		"    from "+ selectTable + ".dd_" + selectYear + "\n" +
		"    where "+ icd9Part + "\n" +
		"    group by id,in_date" + "\n" +
		")t1," + selectTable + ".res_allpeopleinfo\n" +
		"where (t1.id = res_allpeopleinfo.id) and t1.in_date >= \"" + YearLimit_prev + "0101\" and t1.in_date <= \"" + YearLimit_next + "1231\"\n" +
		"group by t1.id,sex,birthday, area, ins_amt\n" +
		"having count(id) >= " + havingCount + "\n" +
		"\n" + 
		"union\n"+
		"\n"+
		"select id,sex,birthday,area,ins_amt,\"0\" as " + Name + 
		(firstday_year == 1? ",\"0\" as fdYear_" + Name : "") + (firstday_month == 1? ",\"0\" as fdMon_" + Name: "" ) +
		(lastday_year == 1? ",\"0\" as ldYear_" + Name : "") + (lastday_month == 1? ",\"0\" as ldMon_" + Name: "" )+"\n" +
		"from " + selectTable + ".res_allpeopleinfo\n" + 
		"where id not in (\n" +
		"    select t1.id\n" +
		"    from (\n" + 
		"        select id,in_date\n" +
		"        from "+ selectTable + ".dd_" + selectYear + "\n" +
		"        where "+ icd9Part + "\n" +
		"        group by id,in_date" + "\n" +
		"    )t1," + selectTable + ".res_allpeopleinfo\n" +
		"    where (t1.id = res_allpeopleinfo.id) and t1.in_date >= \"" + YearLimit_prev + "0101\" and t1.in_date <= \"" + YearLimit_next + "1231\"\n" +
		"    group by t1.id,sex,birthday, area, ins_amt\n" +
		"    having count(id) >= " + havingCount + "\n" +
		")\n\n"+
		")t" + tNum;
		*/
	tNum++;
	insideToOutside.push(Name);
	if(firstday_year == 1) insideToOutside.push("fdYear_" + Name);
	if(firstday_month == 1) insideToOutside.push("fdMon_" + Name);
	if(lastday_year == 1) insideToOutside.push("ldYear_" + Name);
	if(lastday_month == 1) insideToOutside.push("ldMon_" + Name);
	return icdSQL;
}
function getDODrugSQL(Name,firstday_year,firstday_month,lastday_year,lastday_month,DrugPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear){
	//Reduce Version
	var drugSQL = 
		"\n(\n\nselect allpeople.id,sex,birthday,area,ins_amt,case when fd_min is null  then \"0\" else \"1\" end as " + Name + 
	    (firstday_year == 1? ",isnull(substr(fd_min,1,4),\"0\") as fdYear_" + Name : "") + (firstday_month == 1? ",isnull(substr(fd_min,5,2),\"0\") as fdMon_" + Name : "") + 
	    (lastday_year == 1? ",isnull(substr(fd_max,1,4),\"0\") as ldYear_" + Name: "" ) +  (lastday_month == 1? ",isnull(substr(fd_max,5,2),\"0\") as ldMon_" + Name: "" )+"\n" +
	    "from (\n" +
		"    select t1.id,min(in_date) as fd_min,max(in_date) as fd_max\n"+
		"    from(\n" +
		"        select id,in_date\n" +
		"        from " + selectTable + ".dd_" + selectYear + " as dd\n" +
		"        join " + selectTable + ".do_" + selectYear + " as do using (fee_ym,hosp_id,appl_type,appl_date,case_type,seq_no)\n" +
		"        where " + DrugPart + "\n" +
		"        group by id,in_date\n" +
		"    )t1\n" +
		"    where t1.in_date between \"" + YearLimit_prev + "0101\" and  \"" + YearLimit_next + "1231\"\n" +  
		"    group by id\n" +
		"    having count(id) >= " + havingCount + "\n" +
		")t1\n" +
		"right outer join " + selectTable + ".res_allpeopleinfo as allpeople using (id)\n" +
		"group by allpeople.id,sex,birthday,area,ins_amt," + Name + 
		(firstday_year == 1? ",fdYear_" + Name : "") + (firstday_month == 1? ",fdMon_" + Name : "") + 
		(lastday_year == 1? ",ldYear_" + Name: "" ) +  (lastday_month == 1? ",ldMon_" + Name : "" )+ "\n\n" + 
		")t" + tNum;	
	//Original Version
	/*var drugSQL = 
		"\n(\n\nselect dd.id,sex,birthday,area,ins_amt,\"1\" as " + Name + 
		(firstday_year == 1? ",substr(min(func_date),1,4) as fdYear_" + Name : "") + (firstday_month == 1? ",substr(min(func_date),5,2) as fdMon_" + Name : "") + 
		(lastday_year == 1? ",substr(max(func_date),1,4) as ldYear_" + Name: "" ) +  (lastday_month == 1? ",substr(max(func_date),5,2) as ldMon_" + Name: "" )+"\n" +
		"from " + selectTable + ".dd_" + selectYear +  " as dd, (\n" + 
		"    select fee_ym, hosp_id ,appl_type, appl_date, case_type,seq_no\n" +
		"    from " + selectTable + ".do_" + selectYear + "\n" +
		"    where " + DrugPart + "\n" +
		")as do, " + selectTable + ".res_allpeopleinfo\n" +
		"where dd.fee_ym = do.fee_ym\n" + 
		"  and dd.hosp_id = do.hosp_id\n" + 
		"  and dd.appl_type = do.appl_type\n" +
		"  and dd.appl_date = do.appl_date\n" +
		"  and dd.case_type = do.case_type\n" +
		"  and dd.seq_no = do.seq_no\n" +
		"  and dd.id = res_allpeopleinfo.id\n" +
		"  and dd.in_date >= \"" + YearLimit_prev + "0101\" and dd.in_date <= \"" + YearLimit_next + "1231\"\n" +
		"group by dd.id,sex,birthday, area, ins_amt\n" +
		"having count(id) >= " + havingCount + "\n" +  
		"\n" +
		"union\n" +
		"\n" +
		"select id,sex,birthday,area,ins_amt,\"0\" as " + Name + 
		(firstday_year == 1? ",\"0\" as fdYear_" + Name : "") + (firstday_month == 1? ",\"0\" as fdMon_" + Name: "" ) +
		(lastday_year == 1? ",\"0\" as ldYear_" + Name : "") + (lastday_month == 1? ",\"0\" as ldMon_" + Name: "" )+"\n" +
		"from " + selectTable + ".res_allpeopleinfo\n" +
		"where id not in (\n" +
		"    select dd.id" +
		"    from " + selectTable + ".dd_" + selectYear +  " as dd, (\n" + 
		"        select fee_ym, hosp_id ,appl_type, appl_date, case_type,seq_no\n" +
		"        from " + selectTable + ".do_" + selectYear + "\n" +
		"        where " + DrugPart + "\n" +
		"    )as do, " + selectTable + ".res_allpeopleinfo\n" +
		"    where dd.fee_ym = do.fee_ym\n" + 
		"      and dd.hosp_id = do.hosp_id\n" + 
		"      and dd.appl_type = do.appl_type\n" +
		"      and dd.appl_date = do.appl_date\n" +
		"      and dd.case_type = do.case_type\n" +
		"      and dd.seq_no = do.seq_no\n" +
		"      and dd.id = res_allpeopleinfo.id\n" +
		"      and dd.in_date >= \"" + YearLimit_prev + "0101\" and dd.in_date <= \"" + YearLimit_next + "1231\"\n" + 
		"    group by dd.id,sex,birthday, area, ins_amt\n" +
		"    having count(id) >= " + havingCount + "\n" +  
		")\n\n"+
		")t"+ tNum;
		*/
	tNum++;
	insideToOutside.push(Name);
	if(firstday_year == 1) insideToOutside.push("fdYear_" + Name);
	if(firstday_month == 1) insideToOutside.push("fdMon_" + Name);
	if(lastday_year == 1) insideToOutside.push("ldYear_" + Name);
	if(lastday_month == 1) insideToOutside.push("ldMon_" + Name);
	return drugSQL;
}

function getstddiseaseSQL(selectTable,selectYear){
	var stdDiseaseSQL =
		"\n(\n\nselect *\n" +
		"from "  + selectTable + ".res_standarddisease\n" +
	    "\n\n"+
		")t"+ tNum;
		tNum++;
	standarddisease.push(
		"cci_score",
		"myocardial_infarct",
		"fd_myocardial_infarct",
		"congestive_heart_failure",
		"fd_congestive_heart_failure",
		"peripheral_vascular_disease",
		"fd_peripheral_vascular_disease",
		"dementia",
		"fd_dementia",
		"chronic_pulmonary_disease",
		"fd_chronic_pulmonary_disease",
		"connective_tissue_disease",
		"fd_connective_tissue_disease",
		"ulcer_disease",
		"fd_ulcer_disease",
		"mild_liver_disease",
		"fd_mild_liver_disease",
		"diabetes",
		"fd_diabetes",
		"diabetes_with_endorgandamage",
		"fd_diabetes_with_endorgandamage",
		"moderate_or_severerenal_disease",
		"fd_moderate_or_severerenal_disease",
		"nonmetastatic_solid_tumor",
		"fd_nonmetastatic_solid_tumor",
		"leukemia",
		"fd_leukemia",
		"lymphoma_multiple_myeloma",
		"fd_lymphoma_multiple_myeloma",
		"metastatic_tumor",
		"fd_metastatic_tumor",
		"aids",
		"fd_aids"
	);
	return stdDiseaseSQL;

}
function getinsideSQL(selectTable,selectYear){
	var inside_SQL = "";
	var first = 0;
	var parent = $("#condition_place");

	for(var child = parent.find('li').eq(0);child.is('li') == true ; child = child.next()){
		var name = child.find('div').eq(2).find('input').eq(0).val();

		//Error detection, if use not fill the name, return ""
		if(name == ""){
			alert("Error - [Blank Name] : Please check the name sections");
			return "";
		}
		//Error detection, if name has invalid valid, return ""
		if(!checkName(name)){
			alert("Error - [Name] : Name should not have blank or spcial charactors like *,/,)");
			return "";
		}

		//Error detection, if there is the same name
		for(var i=0;i<insideToOutside.length;i++){
			if(name == insideToOutside[i]){
				alert("Error - [Duplicate Name] : ["+ name + "] is duplicate, please check the name sections to avoid the same name");
				return "";
			}
		}

		var firstday_year = child.find('div').eq(2).find('input').eq(2).is(":checked") == true? 1 : 0;
		var firstday_month = child.find('div').eq(2).find('input').eq(3).is(":checked") == true? 1 : 0;
		var lastday_year = child.find('div').eq(2).find('input').eq(4).is(":checked") == true? 1 : 0;
		var lastday_month = child.find('div').eq(2).find('input').eq(5).is(":checked") == true? 1 : 0;
		var havingCount = child.find('div').eq(3).find('input').eq(0).val();
		var YearLimit_prev = child.find('div').eq(3).find('input').eq(1).val();
		var YearLimit_next = child.find('div').eq(3).find('input').eq(2).val();
		var hidden = child.find('div').eq(4).find('ul');
		var icdPart = "";
		var drugPart = "";
		var count = 0,firstcondition = 0;

		if(child.val() == 0){

			for(var child_hidden = hidden.find('li').eq(2);child_hidden.is('li') == true;child_hidden = child_hidden.next()){
				var likeOption = child_hidden.find('input').eq(1).is(":checked") == true ? 1 : 0;
				var icd9_code = child_hidden.find('input').eq(0).val();
				//Error detection, if icd9_code is longer than 5
				if(icd9_code.length > 5){
					alert("Error - [Icd9_code length over] : "+ name + "'s code - (" + icd9_code +") length longer than 5");
					return "";
				}
				if(likeOption == 0){
					for(var i = icd9_code.length; i < 5 ;i++){
						icd9_code = icd9_code + " "; 
					}
				}

				if(child_hidden.find('input').eq(2).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "acode_icd9_1 "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";


					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
				if(child_hidden.find('input').eq(3).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "acode_icd9_2 "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";

					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
				if(child_hidden.find('input').eq(4).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "acode_icd9_3 "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";

					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
			}
			if(icdPart == ""){
				alert("Error - [Blank Icd9_code/Drug_no] : " + name + " has no Icd9_code/Drug_no");
				return icdPart;
			}
			//alert("Name : " + name + "\nfirstday_year : " + firstday_year + "\nfirstday_month" + firstday_month +"\nlastday_year : " + lastday_year +"\nlastday_month : " + lastday_month +"\nhavingCount : " + havingCount + "\nhidden :" + icdPart);
			if(first == 0){
				first++;
				inside_SQL = inside_SQL + getCDicdSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,icdPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear);
			}else{
				inside_SQL = inside_SQL + "\njoin" + getCDicdSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,icdPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear) + " using (id)\n";
			}
		}else if(child.val() == 1){

			for(var child_hidden = hidden.find('li').eq(2);child_hidden.is('li') == true;child_hidden = child_hidden.next()){
				var likeOption = child_hidden.find('input').eq(1).is(":checked") == true ? 1 : 0;
				var drug_code = child_hidden.find('input').eq(0).val();
				if(drug_code.length > 12){
					//Error detection, if Drug_code is longer than 12
					alert("Error - [Drug_code length over] : "+ name + "'s code - (" + drug_code +") length longer than 12");
					return "";
				}
				if(likeOption == 0){
					for(var i = drug_code.length; i < 12 ;i++){
						drug_code = drug_code + " "; 
					}
				}

				if(firstcondition == 0) firstcondition++;
					else drugPart += "or ";

			    drugPart = drugPart + "drug_no "+ (likeOption == 1 ? "like \"" : "= \"") + drug_code + "\" ";

			    if(count == 5){
					count=0;
					drugPart += "\n";
				}else count ++ ;
				
			}
			if(drugPart == ""){
				alert("Error - [Blank Icd9_code/Drug_no] : " + name + " has no Icd9_code/Drug_no");
				return drugPart;
			}
			//alert("Name : " + name + "\nfirstday : " + firstday + "\nlastday : " + lastday + "\nhavingCount : " + havingCount + "\nhidden :" + drugPart);
			if(first == 0){
				first++;
				inside_SQL = inside_SQL + getOODrugSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,drugPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear);
			}else{
				inside_SQL = inside_SQL + "\njoin" + getOODrugSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,drugPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear) + " using (id)";
			}
		}else if(child.val() ==2){
			for(var child_hidden = hidden.find('li').eq(2);child_hidden.is('li') == true;child_hidden = child_hidden.next()){
				var likeOption = child_hidden.find('input').eq(1).is(":checked") == true ? 1 : 0;
				var icd9_code = child_hidden.find('input').eq(0).val();
				//Error detection, if icd9_code is longer than 5
				if(icd9_code.length > 5){
					alert("Error - [Icd9_code length over] : "+ name + "'s code - (" + icd9_code +") length longer than 5");
					return "";
				}
				if(likeOption == 0){
					for(var i = icd9_code.length; i < 5 ;i++){
						icd9_code = icd9_code + " "; 
					}
				}

				if(child_hidden.find('input').eq(2).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "icd9cm_code "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";


					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
				if(child_hidden.find('input').eq(3).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "icd9cm_code_1 "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";

					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
				if(child_hidden.find('input').eq(4).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "icd9cm_code_2 "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";

					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
				if(child_hidden.find('input').eq(5).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "icd9cm_code_3 "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";

					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
				if(child_hidden.find('input').eq(6).is(":checked") == true){
					if(firstcondition == 0) firstcondition++;
					else icdPart += "or ";

					icdPart = icdPart + "icd9cm_code_4 "+ (likeOption == 1 ? "like \"" : "= \"") + icd9_code + "\" ";

					if(count == 5){
						count=0;
						icdPart += "\n";
					}
					else count ++ ;
				}
			}
			if(icdPart == ""){
				alert("Error - [Blank Icd9_code/Drug_no] : " + name + " has no Icd9_code/Drug_no");
				return icdPart;
			}

			//alert("Name : " + name + "\nfirstday : " + firstday + "\nlastday : " + lastday + "\nhavingCount : " + havingCount + "\nhidden :" + icdPart);
			if(first == 0){
				first++;
				inside_SQL = inside_SQL + getDDicdSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,icdPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear);
			}else{
				inside_SQL = inside_SQL + "\njoin" + getDDicdSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,icdPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear) + " using (id)";
			}
		}else if(child.val() == 3){

			for(var child_hidden = hidden.find('li').eq(2);child_hidden.is('li') == true;child_hidden = child_hidden.next()){
				var likeOption = child_hidden.find('input').eq(1).is(":checked") == true ? 1 : 0;
				var drug_code = child_hidden.find('input').eq(0).val();
				//Error detection, if Drug_code is longer than 12
				if(drug_code.length > 12){
					alert("Error - [Drug_code length over] : "+ name + "'s code - (" + drug_code +") length longer than 12");
					return "";
				}
				if(likeOption == 0){
					for(var i = drug_code.length; i < 12 ;i++){
						drug_code = drug_code + " "; 
					}
				}

				if(firstcondition == 0) firstcondition++;
					else drugPart += "or ";

			    drugPart = drugPart + "order_code "+ (likeOption == 1 ? "like \"" : "= \"") + drug_code + "\" ";

			    if(count == 5){
					count=0;
					drugPart += "\n";
				}else count ++ ;
				
			}
			if(drugPart == ""){
				alert("Error - [Blank Icd9_code/Drug_no] : " + name + " has no Icd9_code/Drug_no");
				return drugPart;
			}
			//alert("Name : " + name + "\nfirstday : " + firstday + "\nlastday : " + lastday + "\nhavingCount : " + havingCount + "\nhidden :" + drugPart);
			if(first == 0){
				first++;
				inside_SQL = inside_SQL + getDODrugSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,drugPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear);
			}else{
				inside_SQL = inside_SQL + "\njoin" + getDODrugSQL(name,firstday_year,firstday_month,lastday_year,lastday_month,drugPart,havingCount,YearLimit_prev,YearLimit_next,selectTable,selectYear) + " using (id)";
			}
		}
	}
	if(inside_SQL == ""){
		alert("You have not add any Disease/Drug condition !");
	}
	return inside_SQL;
}





/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------------------   Analysis Function ---------------------------------------------------------------------------------------------*/

function analysis_functionbtn(id,option){
	$("#analysis_Basic").hide("slow");
	$("#analysis_All").hide("slow");
	$("#analysis_Sex").hide("slow");
	$("#analysis_Age").hide("slow");
	$("#analysis_Relation").hide("slow");
	$("#Basic_btn").css("background","#00DDDD");
	$("#All_btn").css("background","#00DDDD");
	$("#Sex_btn").css("background","#00DDDD");
	$("#Age_btn").css("background","#00DDDD");
	$("#Relation_btn").css("background","#00DDDD");


	$("#analysis_" +option).show("slow");
	$("#" + id).css("background","#FF8800");
}



/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/