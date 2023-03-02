/*----------------------------------------------------------------------------Record Area------------------------------------------------------------------*/
/*	
	Global Variables :
			Main : 
					1.select_server : Maintains the "server" that have been chosen. - Pattern : z2202,dell8
					2.select_year :  Maintains the "year" that have been chosen. - Pattern : hi_2000
					3.table_array : Maintains the "tables" that have been chosen. - Pattern : ["cd","dd"]

					4.column_array : Maintains "all columns". - Pattern : ["blank","cd","id,birthday...","dd"."id,birthday"]
					  chosen_column_array : Maintains "columns" hat have been chosen. - Pattern : ["blank","cd","id,birthday...","dd"."id,birthday"]

					5.condition_array : Maintains the "condition" that have been chosen. - Pattern : ["blank,"cd_feeym = dd_feeym","cd_id = dd_id"]
					  conditionbar : Maintains the "id of condition bar" that generate in add condition step - Pattern : ["blank,"condition_1","condition_2"]
					  condition_group : Maintains the "id of condition group" that generate in choosing and/or step -  Pattern : ["blank,"condition_choosegroup_group1","condition_choosegroup_group2"]

					6.ordering_array : Maintains the "table_name + '_' + chosen_column_name" , using in ordering step -  Pattern : ["blank,"cd_id","cd_id_birthday"]
			Another:
					1.condition_SelectColumn : Maintains the "chosen column" that using in condition choosing step and generate limit condition 
					2.Load_ColumnName_textid : Maintains the "chosen column" that using in Load Column button
					3.condition_amount : use for create conditionbar id
					4.condition_count : count for remaining condition
					5.condition_groupbtn_create : detect if condition_group button have been created, 0 = not 1 = Yes
					6.client : use for ZeroClipboard (SQL Copy button)

	HTML ID :
			I Top text
				1.server_text : Show Server & Year chosen
				2.table_text : Show Table chosen
				3.column_text : Save Column chosen
				4.condition_text : Save Condition chosen

			II Choosing Server & Text
				1.server_row : Main choose server & year page
					1-1 z2202_button
					1-2 dell8_button
					1-3 hi_2000_button
					1-4 hi_2010_button
					1-5 hi_2013_button
				3.server_year_button : click to next page

			III Choosing Table
				1.table_row : Main choose table page 
					1-1	cd_button
					1-2	oo_button
					1-3	dd_button
					1-4 do_button
					1-5 id98_button
					1-6 id99_button
				2.table_button : Includes prev and next button

			IV Choosing Columns
				1.column_row : Main choose column page
					1-1 columnpage_tables : left side table name
						1-1-1 choose_column_cd (Dynamic ID):
								<JS> 
									var dynamic_tablebutton_start = "<button class='btn btn-primary' onclick='check_columnpage_tableclick(this.id)' id='choose_column_";
									var dynamic_tablebutton_end = "</button>";
								</JS>
					1-2 columnpage_columns : right side column name
						1-2-1 choose_column_cd_group (Dynamic ID) :
								<JS>
									var dynamic_group_start = "<div class='row' id='choose_column_";
									var dynamic_group_end = "_group' style ='display:none;'></div>";
								</JS>
								1-2-1-1 choose_column_cd_feeym (Dynamic ID) :
										<JS>
											var dynamic_columnbutton_start ="<button class='btn btn-primary col-xs-3' value='0' onclick='check_columnpage_columnclick(this.id)' id='choose_column_" ;
											var dynamic_columnbutton_end = "</button>"
										</JS>

				2.column_button : Includes prev and next button

			V Choosing Condition - Choose condition step
				1.condition_row : Main Choose condition step page
					1-1 condition_place : condition bar place
						1-1-1 condition_1 (Dynamic ID)  : Save in Global Variable "conditionbar"
								<JS> 
									var conditionLine_create = 
									"<li class='list-group-item row navbar navbar-default'>" +	
									"<div class = 'col-xs-2' >"+ condition_SelectColumn.slice(14) + "</div>" +
									"<nav class = 'col-xs-1' style=''><h1></h1></nav>" +
									"<select class = 'col-xs-2' style = 'height:100%;'>" +
										"<option value='='>=</option>"+
									"</select>" +
									"<nav class = 'col-xs-1' style=''><h1></h1></nav>" +
									"<button class = 'col-xs-2' id='LoadColumnName_" + condition_amount+"'>Load_Column</button>" +
									"<form class='col-xs-2'>" + "<input type='text' name='condition_value' value='" + text +"'></input>" + "</form>"+
									"<button class = 'col-xs-2 glyphicon glyphicon-minus' id='condition_" + condition_amount+"'  >"+ "</button>" +	
									"</li>";
								</JS>
					1-2 condition_plus : click to add condition bar
				2. condition_button : Includes prev and next button

			VI Choosing Condition - Choose and/or step
				<First Page>
				1.condition_remain_row : show remaining condition
				2.condition_classification_row : show condition group that have been chosen
					2-1 condition_group_add : condition group add place
						2-1-1 	condition_choosegroup_group1 (Dynamic ID) : different group of conditions
								<JS>
									var group_start = "<li class='list-group-item row' id='condition_choosegroup_group";
									var group_end = "'></li>";
								</JS>
					2-2 condition_group_plus : click to add condition group
				3.condition_andor_button : Includes prev and next button
				
				<Second Page>
				4.condition_choosegroup : choose group main page
				5.condition_choosegroup_button

			VII Choosing Condition - Choose group by / order by step
				1.condition_groupby : Group by Area 
					1-1 duplicate_yes : set group by on
					1-2 duplicate_no : set group by off
				2.condition_orderby : Order by Area
					2-1 ordering_ul : use ordering_array(Global Variable) to maintain ordering of select columns
						<JS>
								var li_begin = "<li class = 'list-group-item row' style='width:100%'>" +
									" <button class = 'btn btn-primary col-xs-8'>";
								var li_firstbuttonTextend = "</button>" + 
									"<button class = 'btn btn-primary col-xs-2 glyphicon glyphicon-chevron-up' onclick = 'column_button_updown(1,this.value)' style= 'display:block' value='";
								var li_secondbuttonTextend = "'></button>" + 
									"<button class = 'btn btn-primary col-xs-2 glyphicon glyphicon-chevron-down' onclick = 'column_button_updown(2,this.value)' style= 'display:block' value='";
								var li_end = "'></button></li>";
						</JS>
				3.condition_orderby_button : Includes prev and next button
			VIII Build SQL
				1.build_sql : Main page of build sql
					1-1 build_sql_show : clickboard copy place 
	Function :
	
		


/**---------------------------------------------------------------------------------------------------------------------------------------------------------------------**/

/*----------------------------------------------------------------------------Global Variables Area------------------------------------------------------------------*/
var select_server = null,select_year = null,select_database = null;

var table_array =[""]; // Pattern ["cd","dd"]

var column_array =[""],chosen_column_array=[""]; // Pattern ["cd","id,birthday...","dd","fee_ym,appl_date...."]

var condition_array = [""];
var conditionbar=[""]; // Pattern ["cd_feeym = dd_feeym","cd_id = dd_id"]
var condition_group=[""]; //Pattern ["condition_choosegorup_group1","condition_choosegorup_group2"]

var ordering_array=[""];

var condition_SelectColumn=""/*tmp for save column name*/,Load_ColumnName_textid="",condition_amount=0/*use for create conditionbar id*/, condition_count=0/*count for remaining condition*/, condition_groupbtn_create=0/*check choosegroup page create*/;
var client = new ZeroClipboard($("#clipboard")); //initial zeroclipboard

/**----------------------------------------------------------------------------------------------------------------------------------------------------------------**/
//function for server&year_choose
function check_server_click(server_id){
	$("#z2202_button").attr("value","0") ;
	$("#z2202_button").attr("style","color:white");
	$("#dell8_button").attr("value","0");
	$("#dell8_button").attr("style","color:white");
	
	

	$("#" + server_id).attr("value","1");
	$("#" + server_id).attr("style","color:orange");
	select_server = server_id.slice(0,5);
	
}
function check_year_click(year_id){
	$("#hi_2000_button").attr("value","0");
	$("#hi_2000_button").attr("style","color:white");
	$("#hi_2010_button").attr("value","0");
	$("#hi_2010_button").attr("style","color:white");
	$("#hi_2013_button").attr("value","0");
	$("#hi_2013_button").attr("style","color:white");
	$("#hi_2013all_button").attr("value","0");
	$("#hi_2013all_button").attr("style","color:white");

	$("#" + year_id).attr("value","1");
	$("#" + year_id).attr("style","color:orange");

	if(year_id == "hi_2013all_button"){
		select_database = year_id.slice(0,10);
		select_year = year_id.slice(3,7);
	}else{
		select_database = year_id.slice(0,7);
		select_year = year_id.slice(3,7);
	}
}

function choose_server_year_next(){
	if(select_server != null && select_year != null){
		$("#server_row").hide("slow");
		$("#year_row").hide("slow");
		$("#server_year_button").hide("slow");
		$("#table_row").show("slow");
		$("#table_button").show("slow");


		$("#server_text").html("Server : [" + select_server +"]\nYear : [" + $("#" +select_database + "_button").html() + "]");
	}else{
		alert("You must choose Server and Year");
	}


	//add choose_table showing chinese name
	$("#cd_button").on('mouseenter',function(){
		$(this).html("門診檔");
	});
	$("#cd_button").on('mouseout',function(){
		$(this).html("cd");
	});
	$("#dd_button").on('mouseenter',function(){
		$(this).html("住院檔");
	});
	$("#dd_button").on('mouseout',function(){
		$(this).html("dd");
	});
	$("#oo_button").on('mouseenter',function(){
		$(this).html("門診藥品檔");
	});
	$("#oo_button").on('mouseout',function(){
		$(this).html("oo");
	});
	$("#do_button").on('mouseenter',function(){
		$(this).html("住院藥品檔");
	});
	$("#do_button").on('mouseout',function(){
		$(this).html("do");
	});
	$("#id98_button").on('mouseenter',function(){
		$(this).html("98年以前承保資料檔");
	});
	$("#id98_button").on('mouseout',function(){
		$(this).html("id98");
	});
	$("#id99_button").on('mouseenter',function(){
		$(this).html("99年之後承保資料檔");
	});
	$("#id99_button").on('mouseout',function(){
		$(this).html("id99");
	});
}

/*

				function for table_choose

*/
function check_table_click(table_id){
	if($("#" + table_id).attr("value") == "0"){
		if(table_id == "cd_button"){
			$("#oo_button").show();
		}
		if(table_id == "dd_button"){
			$("#do_button").show();
		}
		document.getElementById(table_id).value = "1";
		document.getElementById(table_id).style = "color:orange;";
	}else{
		if(table_id == "cd_button"){
			$("#oo_button").attr("value","0");
			$("#oo_button").attr("style","color:white;");
			$("#oo_button").hide();
		}
		if(table_id == "dd_button"){
			$("#do_button").attr("value","0");
			$("#do_button").attr("style","color:white;");
			$("#do_button").hide();
		}
		document.getElementById(table_id).value = "0";
		document.getElementById(table_id).style = "color:white;";
	}
}
function choose_table_prev(){
	$("#table_row").hide("slow");
	$("#table_button").hide("slow");
	$("#server_row").show("slow");
	$("#year_row").show("slow");
	$("#server_year_button").show("slow");
	
	select_server = null;
	select_year = null;
	select_database = null;
	$("#server_text").html("&ltNothing Set&gt");
}
function choose_table_next(){
	var table_name=["cd_button","dd_button","oo_button","do_button","id98_button","id99_button"];
	//reset array
	table_array = [""];
	column_array = [""];
	//remove table,column element that already exist in column page
	$("#columnpage_tables").empty();
	$("#columnpage_columns").empty();
	

	for(var i=0;i<table_name.length;i++){
		if($("#"+table_name[i]).attr("value") == "1"){
			table_array.push($("#"+table_name[i]).html());
			$("#"+table_name[i]).attr("value","0");
			$("#"+table_name[i]).attr("style","color:white");
		}
	}	
	if(table_array.length > 1){
		$("#table_row").hide("slow");
		$("#table_button").hide("slow");
		$("#column_row").show("slow");
		$("#column_button").show("slow");
	

		table_array = table_array.slice(1,table_array.length);
		$("#table_text").html("" + table_array);

		var JsonMessage = JSON.stringify({
			ActionMode:"1",
			sql:document.getElementById("table_text").innerHTML ,
			selectServer:select_server,
			selectYear:select_year,
			selectDatabase : select_database,
			execpasswd:"0"
		});

		CreateWebSocket(JsonMessage,1);
		
		
		/*$.post("phpConnectServer.php",{
			ActionMode:"1",
			sql:document.getElementById("table_text").innerHTML ,
			selectServer:select_server,
			selectYear:select_year,
			execpasswd:"0"
		},
		function(data,status){
			if(data != ""){
				var json_obj = JSON.parse(data);
				
				var dynamic_tablebutton_start = "<button class='btn btn-primary' onclick='check_columnpage_tableclick(this.id)' id='choose_column_";
				var dynamic_tablebutton_end = "</button>";

				var dynamic_group_start = "<div class='row' id='choose_column_";
				var dynamic_group_end = "_group' style ='display:none;'></div>";

				var dynamic_columnbutton_start ="<button class='btn btn-primary col-xs-3' value='0' onclick='check_columnpage_columnclick(this.id)' id='choose_column_" ;
				var dynamic_columnbutton_end = "</button>"

				var split_column_data;

				for(var i=0;i<table_array.length;i++){
					//get table name && column name set
					column_array.push(table_array[i]);
					column_array.push(json_obj[table_array[i]]);
					split_column_data = column_array[(i+1)*2].split(",");

					//dynamic add button into column_choose_page ps. 
					//table id pattern = "choose_column_cd"
					$("#columnpage_tables").append(dynamic_tablebutton_start + column_array[1+(i*2)] +"'>" + column_array[1+(i*2)] + dynamic_tablebutton_end);

					//column group add , id pattern = "choose_column_cd_group"
					var group_name = "choose_column_"+column_array[1+(i*2)]+"_group";
					$("#columnpage_columns").append(dynamic_group_start + column_array[1+(i*2)] + dynamic_group_end);
					//column id pattern = "choose_column_cd_feeym"
					for(var j=0;j<split_column_data.length;j++){
						$("#"+ group_name).append(dynamic_columnbutton_start + column_array[1+(i*2)] +"_"+split_column_data[j]+"''>"+split_column_data[j] + dynamic_columnbutton_end);
						$("#choose_column_"+ column_array[1+(i*2)] +"_"+split_column_data[j]).on('mouseenter',function(){
							var slice_tmp = $(this).attr("id").slice(14);
							var table_tmp = slice_tmp.slice(0,slice_tmp.indexOf("_"));
							var column_tmp = slice_tmp.slice(slice_tmp.indexOf("_")+1);
							if(table_tmp == "do"){
								table_tmp = "ddo";
							}
							$(this).html(getChineseName(table_tmp,column_tmp));
							$("#test_div1").html(getChineseName(table_tmp,column_tmp));
						});
						$("#choose_column_"+ column_array[1+(i*2)] +"_"+split_column_data[j]).on('mouseout',function(){
							var slice_tmp = $(this).attr("id").slice(14);
							var column_tmp = slice_tmp.slice(slice_tmp.indexOf("_")+1);
							$(this).html(column_tmp);
							$("#test_div2").html(column_tmp);
						});
					}
				}

				//Auto choose first table columns
				$("#" + "choose_column_" +  column_array[1]).attr("style","background:orange;");
				$("#" + "choose_column_" +  column_array[1] +"_" + "group").show();



			}else{
				alert("[Error] : Connecting to Server faild");
				choose_column_prev();
			}
		});*/

	}else{
		alert("You have not choose any table !");
	}
}
function choose_table_next_websocket(data){

	var json_obj = JSON.parse(data);

	var dynamic_tablebutton_start = "<button class='btn btn-primary' onclick='check_columnpage_tableclick(this.id)' id='choose_column_";
	var dynamic_tablebutton_end = "</button>";

	var dynamic_group_start = "<div class='row' id='choose_column_";
	var dynamic_group_end = "_group' style ='display:none;'></div>";

	var dynamic_columnbutton_start ="<button class='btn btn-primary col-xs-3' value='0' onclick='check_columnpage_columnclick(this.id)' id='choose_column_" ;
	var dynamic_columnbutton_end = "</button>"

	var split_column_data;

	for(var i=0;i<table_array.length;i++){
			//get table name && column name set
			column_array.push(table_array[i]);
			column_array.push(json_obj[table_array[i]]);
			split_column_data = column_array[(i+1)*2].split(",");

			//dynamic add button into column_choose_page ps. 
			//table id pattern = "choose_column_cd"
			$("#columnpage_tables").append(dynamic_tablebutton_start + column_array[1+(i*2)] +"'>" + column_array[1+(i*2)] + dynamic_tablebutton_end);

			//column group add , id pattern = "choose_column_cd_group"
			var group_name = "choose_column_"+column_array[1+(i*2)]+"_group";
			$("#columnpage_columns").append(dynamic_group_start + column_array[1+(i*2)] + dynamic_group_end);
			//column id pattern = "choose_column_cd_feeym"
			for(var j=0;j<split_column_data.length;j++){
					$("#"+ group_name).append(dynamic_columnbutton_start + column_array[1+(i*2)] +"_"+split_column_data[j]+"''>"+split_column_data[j] + dynamic_columnbutton_end);
					$("#choose_column_"+ column_array[1+(i*2)] +"_"+split_column_data[j]).on('mouseenter',function(){
						var slice_tmp = $(this).attr("id").slice(14);
						var table_tmp = slice_tmp.slice(0,slice_tmp.indexOf("_"));
						var column_tmp = slice_tmp.slice(slice_tmp.indexOf("_")+1);
						if(table_tmp == "do"){
							table_tmp = "ddo";
						}
						$(this).html(getChineseName(table_tmp,column_tmp));
						$("#test_div1").html(getChineseName(table_tmp,column_tmp));
					});
					$("#choose_column_"+ column_array[1+(i*2)] +"_"+split_column_data[j]).on('mouseout',function(){
							var slice_tmp = $(this).attr("id").slice(14);
							var column_tmp = slice_tmp.slice(slice_tmp.indexOf("_")+1);
							$(this).html(column_tmp);
							$("#test_div2").html(column_tmp);
					});
			}
	}

	//Auto choose first table columns
	$("#" + "choose_column_" +  column_array[1]).attr("style","background:orange;");
	$("#" + "choose_column_" +  column_array[1] +"_" + "group").show();



}
/*

		function for column choose

*/
function check_columnpage_tableclick(table_id){
	for(var i=1;i<column_array.length;i=i+2){
		$("#" + "choose_column_" +  column_array[i]).attr("style","background:#2C699E");
		$("#" + "choose_column_" +  column_array[i] +"_" + "group").hide();
	}

	$("#"+table_id).attr("style","background:orange");
	$("#"+ table_id + "_group").show();
}
function check_columnpage_columnclick(column_id){
	if($("#" +  column_id).attr("value") == "1"){
		$("#" +  column_id).attr("value","0");
		$("#" +  column_id).attr("style","color:white");  
	}else{
		$("#" +  column_id).attr("value","1");
		$("#" +  column_id).attr("style","color:orange");  
	}
}

function choose_column_prev(){
	$("#column_row").hide("slow");
	$("#column_button").hide("slow");
	$("#table_row").show("slow");
	$("#table_button").show("slow");
	
	$("#table_text").html("&ltNothing Set&gt");
}

function choose_column_next(){

	var split_column_data,column_data_string = "";
	var been_chosen_column=[""];
	var check_same_column ;
	var all_message;
	chosen_column_array=[""];
	for(var i=0;i<table_array.length;i++){
		column_data_string ="";

		chosen_column_array.push(table_array[i]);

		split_column_data = column_array[(i+1)*2].split(",");
		
		for(var j=0;j<split_column_data.length;j++){
			if($("#choose_column_"+table_array[i]+"_"+split_column_data[j]).attr("value") == "1"){
				//reset button attributes
				$("#choose_column_"+table_array[i]+"_"+split_column_data[j]).attr("value","0");
				$("#choose_column_"+table_array[i]+"_"+split_column_data[j]).attr("style","color:white");
				if(i==0){
					been_chosen_column.push(split_column_data[j]);
					if(column_data_string == "" ){
						column_data_string = split_column_data[j];
					}else{
						column_data_string = column_data_string +","+split_column_data[j];
					}
				}else{
					check_same_column = 0;
					for(var k=0;k<been_chosen_column.length;k++){
						if(split_column_data[j] == been_chosen_column[k]){
							check_same_column = 1;
						}
					}
					if(check_same_column == 0){
						been_chosen_column.push(split_column_data[j]);
						if(column_data_string == "" ){
							column_data_string = split_column_data[j];
						}else{
							column_data_string = column_data_string +","+split_column_data[j];
						}
					}
				}
			}
		}
		chosen_column_array.push(column_data_string);
	}
	for(var j=0;j<table_array.length;j++){
		if(j==0){
			all_message = ""+chosen_column_array[1+(j*2)]+": ["+chosen_column_array[(j+1)*2]+"]";
		}else{
			all_message = all_message +" , "+chosen_column_array[1+(j*2)]+": ["+chosen_column_array[(j+1)*2]+"]";
		}
	}


	//clean button and Add limit condition
	for(var i=1;i<conditionbar.length;i++){
		$("#"+ conditionbar[i]).closest('li').remove();
	}
	condtionbar = [""];
	check_limit_condition();



	$("#column_text").html(all_message);
	$("#column_row").hide("slow");
	$("#column_button").hide("slow");

	$("#condition_row").show("slow");
	$("#condition_button").show("slow");

}
function check_limit_condition(){
	//Add limit condition
	conditionbar = [""]; //conditionbar renew
	//cd.id = dd.id
	if(table_array.includes("cd") && table_array.includes("dd") ){
		condition_SelectColumn = "choose_column_cd_id";
		Add_limit_conditions("dd_"+select_year+".id");
	}
	//fee_ym,hosp_id,appl_type,appl_date,case_type,seq_no
	if(table_array.includes("cd")&& table_array.includes("oo")){
		condition_SelectColumn = "choose_column_cd_fee_ym";
		Add_limit_conditions("oo_"+select_year+".fee_ym");

		condition_SelectColumn = "choose_column_cd_hosp_id";
		Add_limit_conditions("oo_"+select_year+".hosp_id");

		condition_SelectColumn = "choose_column_cd_appl_type";
		Add_limit_conditions("oo_"+select_year+".appl_type");

		condition_SelectColumn = "choose_column_cd_appl_date";
		Add_limit_conditions("oo_"+select_year+".appl_date");

		condition_SelectColumn = "choose_column_cd_case_type";
		Add_limit_conditions("oo_"+select_year+".case_type");

		condition_SelectColumn = "choose_column_cd_seq_no";
		Add_limit_conditions("oo_"+select_year+".seq_no");
	}
	//fee_ym,hosp_id,appl_type,appl_date,case_type,seq_no
	if(table_array.includes("dd")&& table_array.includes("do")){
		condition_SelectColumn = "choose_column_dd_fee_ym";
		Add_limit_conditions("do_"+select_year+".fee_ym");

		condition_SelectColumn = "choose_column_dd_hosp_id";
		Add_limit_conditions("do_"+select_year+".hosp_id");

		condition_SelectColumn = "choose_column_dd_appl_type";
		Add_limit_conditions("do_"+select_year+".appl_type");

		condition_SelectColumn = "choose_column_dd_appl_date";
		Add_limit_conditions("do_"+select_year+".appl_date");

		condition_SelectColumn = "choose_column_dd_case_type";
		Add_limit_conditions("do_"+select_year+".case_type");
		
		condition_SelectColumn = "choose_column_dd_seq_no";
		Add_limit_conditions("do_"+select_year+".seq_no");
	}
	//cd.id = id98.id
	if(table_array.includes("cd") && table_array.includes("id98") ){
		condition_SelectColumn = "choose_column_cd_id";
		Add_limit_conditions("id98_"+select_year+".id");
	}
	//cd.id = id99.id
	if(table_array.includes("cd")  && table_array.includes("id99")){
		condition_SelectColumn = "choose_column_cd_id";
		Add_limit_conditions("id99_"+select_year+".id");
	}
	//dd.id = id98.id
	if(table_array.includes("dd") && table_array.includes("id98") ){
		condition_SelectColumn = "choose_column_dd_id";
		Add_limit_conditions("id98_"+select_year+".id");
	}
	//dd.id = id99.id
	if(table_array.includes("dd")  && table_array.includes("id99") ){
		condition_SelectColumn = "choose_column_dd_id";
		Add_limit_conditions("id99_"+select_year+".id");
	}
}
function Add_limit_conditions(text){

	var conditionLine_create = 
	"<li class='list-group-item row navbar navbar-default'>" +	
		"<div class = 'col-xs-2' >"+ condition_SelectColumn.slice(14) + "</div>" +
		"<nav class = 'col-xs-1' style=''><h1></h1></nav>" +
		"<select class = 'col-xs-2' style = 'height:100%;'>" +
			"<option value='='>=</option>"+
		"</select>" +
		"<nav class = 'col-xs-1' style=''><h1></h1></nav>" +
		"<button class = 'col-xs-2' id='LoadColumnName_" + condition_amount+"'>Load_Column</button>" +
		"<form class='col-xs-2'>" + "<input type='text' name='condition_value' value='" + text +"'></input>" + "</form>"+
		"<button class = 'col-xs-2 glyphicon glyphicon-minus' id='condition_" + condition_amount+"'  >"+ "</button>" +	
	"</li>";
	conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
	condition_amount++;
	condition_count++;
	$("#condition_place").append(conditionLine_create);
}
/*

				funciotn for setting conditions

*/ 
function Add_conditions_transferpage(){
	var split_column_data;

	for(var i=0;i<table_array.length;i++){
		split_column_data = column_array[(i+1)*2].split(",");
		for(var j=0;j<split_column_data.length;j++){
			$("#choose_column_"+table_array[i]+"_"+split_column_data[j]).attr("onclick","Add_conditions_columnclick(this.id)");
		}
	}
	$("#condition_row").hide("slow");
	$("#condition_button").hide("slow");
	$("#column_row").show("slow");

}

function  Add_conditions_columnclick(column_id){
	condition_SelectColumn = $("#"+column_id).attr("id");

	$("#column_row").hide("slow");

	$("#condition_row").show("slow");
	$("#condition_button").show("slow");
	Add_conditions();

}
function Add_conditions(){
	var table_columnName = condition_SelectColumn.slice(14);
	var column_name = table_columnName.slice(table_columnName.indexOf("_")+1);
	/*if(column_name == "acode_icd9_1" || column_name == "acode_icd9_2" || column_name == "acode_icd9_3" ){
		var conditionLine_create_acd = 
		"<li class='list-group-item row navbar navbar-default'>" +	
		"<div class = 'col-xs-2' >"+ table_columnName.slice(0,13) + "</div>" +
		"<select class = 'col-xs-1' style = 'height:100%;'>" +
		"<option value='='>=</option>"+
		"<option value='like'>like</option>"+ 
		"</select>" +
		"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='acd9_1' name='acd_code'>acd_1</label>" + 
		"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='acd9_2' name='acd_code'>acd_2</label>" + 
		"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='acd9_3' name='acd_code'>acd_3</label>" + 
		"<form class='col-xs-2' style='height:100%;' >" +
		"<input class='form-control' type='file' name='condition_value' onchange='handleFile(this.files,this.id)' accept='.txt' id= 'uploadfile_" +condition_amount + "' value=''/>"  +
		"</form>"+
		"<form class='col-xs-2'>" + "<input type='text' name='condition_value' value='' placeholder = '"+"Click Left Button to Load"+"'></input>" + "</form>"+
		"<button class = 'col-xs-2 glyphicon glyphicon-minus' id='condition_" + condition_amount+"' onclick='delete_conditions(this.id)' >"+ "</button>" +	
		"</li>";
		conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
		condition_amount++;
		condition_count++;
		$("#condition_place").append(conditionLine_create_acd);
	}else{*/
		var placeholder =  returnPlaceHolder(table_columnName);	
		var conditionLine_create = 
		"<li class='list-group-item row navbar navbar-default'>" +	
		"<div class = 'col-xs-2' >"+ table_columnName + "</div>" +
		"<nav class = 'col-xs-1' style=''><h1></h1></nav>" +
		"<select class = 'col-xs-2' style = 'height:100%;'>" +
		"<option value='&lt'>&lt</option>"+ 
		"<option value='&gt'>&gt</option>"+
		"<option value='='>=</option>"+
		"<option value='like'>like</option>"+ 
		"</select>" +
		"<nav class = 'col-xs-1' style=''><h1></h1></nav>" +
		"<button class = 'col-xs-2' id='LoadColumnName_" + condition_amount+"' onclick='Load_ColumnName(this.id)'>Load_Column</button>" +
		"<form class='col-xs-2'>" + "<input type='text' name='condition_value' value='' placeholder = '"+placeholder+"'></input>" + "</form>"+
		"<button class = 'col-xs-2 glyphicon glyphicon-minus' id='condition_" + condition_amount+"' onclick='delete_conditions(this.id)' >"+ "</button>" +	
		"</li>";
		conditionbar.push("condition_"+condition_amount);//Save the conditionbar_name
		condition_amount++;
		condition_count++;
		$("#condition_place").append(conditionLine_create);
	/*}*/
}

function handleFile(file,id){
	var fileRead = file[0];
    //var path = require('path');

    var reader = new FileReader();

    reader.onload = (function(filename,text_id){
    	return function(e){
   		 // By lines
   			var lines = this.result.split('\n');
    		var text_str = "";
    		for(var i = 0; i < lines.length; i++){
    			if(i != lines.length -1)
      				text_str += lines[i].slice(0,lines[i].indexOf('\n'));
      			else
      				text_str += lines[i];
      			if((i+1) < lines.length){
      				text_str += ",";
      			}
     
  	 		}
  	 		alert(text_str + " " + text_id);
  	 		$("#"+ text_id).closest('li').find('form').eq(1).find('input').val(text_str);
    	}
    })(fileRead,id);
    reader.readAsText(fileRead); 
 	
}
function delete_conditions(condition_id){
	$("#"+condition_id).closest('li').remove(); //can also use $(this.id).closest('.li').remove() to climb up util find <li>
	conditionbar.splice(conditionbar.indexOf(condition_id),1);

	condition_count--;
}
function Load_ColumnName(condition_id){
	var split_column_data;

	for(var i=0;i<table_array.length;i++){
		split_column_data = column_array[(i+1)*2].split(",");
		for(var j=0;j<split_column_data.length;j++){
			$("#choose_column_"+table_array[i]+"_"+split_column_data[j]).attr("onclick","Load_ColumnName_columnclick(this.id)");
		}
	}

	Load_ColumnName_textid = condition_id;//save the condition bar id
	$("#condition_row").hide("slow");
	$("#condition_button").hide("slow");
	$("#column_row").show("slow");
}
function  Load_ColumnName_columnclick(column_id){
	condition_SelectColumn = $("#"+column_id).attr("id");

	$("#column_row").hide("slow");

	$("#condition_row").show("slow");
	$("#condition_button").show("slow");
	
	var columnname = condition_SelectColumn.slice(14);
	//$("#"+ Load_ColumnName_textid).closest('li').find('form').find('input').val(columnname.slice(0,column_name.indexOf("_")) + select_year + columnname.slice(columnname.indexOf("_")+1));
	$("#"+ Load_ColumnName_textid).closest('li').find('form').find('input').val(columnname.slice(0,columnname.indexOf("_")+1) + select_year + "." + columnname.slice(columnname.indexOf("_")+1));
}
function choose_condition_prev(){
	var split_column_data;
	//remove all condition that already set
	for(var i=0;i<=condition_amount;i++){
		$("#condition_"+i).closest('li').remove();
	}
	//recover onclick that had been changed before
	for(var i=0;i<table_array.length;i++){
		split_column_data = column_array[(i+1)*2].split(",");
		for(var j=0;j<split_column_data.length;j++){
			$("#choose_column_"+table_array[i]+"_"+split_column_data[j]).attr("onclick","check_columnpage_columnclick(this.id)");
		}
	}
	condition_amount = 0;
	condition_count = 0;


	$("#condition_row").hide("slow");
	$("#condition_button").hide("slow");

	$("#column_text").html("&ltNothing Set&gt");
	$("#column_row").show("slow");
	$("#column_button").show("slow");

	/*Auto choose first table columns*/
	$("#" + "choose_column_" +  column_array[1]).attr("style","background:orange;");
	$("#" + "choose_column_" +  column_array[1] +"_" + "group").show();
}
function choose_condition_next(){

	$("#condition_row").hide("slow");
	$("#condition_button").hide("slow");


	$("#condition_remain_row").show("slow");
	$("#condition_classification_row").show("slow");
	$("#condition_andor_button").show("slow");

	//store the condition information and remove condition bar
	condition_array = [""];
	var sql = "";

	for(var i=1;i<conditionbar.length;i++){
		//var button_parent = $("#condition_"+i).closest('li');
		var column_name = $("#"+ conditionbar[i]).closest('li').find('div').html();

		if(column_name == "cd_acode_icd9"){
			sql = "";
			var likeornot =  $("#"+ conditionbar[i]).closest('li').find('select').eq(0).find("option:selected").attr("value") == "like"?1:0;
			var acd_1 = $("#"+ conditionbar[i]).closest('li').find('label').eq(0).find('input').is(":checked") == true ? 1 : 0;
			var acd_2 = $("#"+ conditionbar[i]).closest('li').find('label').eq(1).find('input').is(":checked") == true ? 1 : 0;
			var acd_3 = $("#"+ conditionbar[i]).closest('li').find('label').eq(2).find('input').is(":checked") == true ? 1 : 0;

			if($("#"+ conditionbar[i]).closest('li').find('form').eq(1).find('input').val() == ''){
				$("#condition_remain_row").hide("slow");
				$("#condition_classification_row").hide("slow");
				$("#condition_andor_button").hide("slow");

				$("#condition_row").show("slow");
				$("#condition_button").show("slow");

				alert("Your icd9 Condition need icd9_Code");
				condition_array = [""];
			}else{
				//split acd9 text
				var split_acd9 = $("#"+ conditionbar[i]).closest('li').find('form').eq(1).find('input').val().split(',');
				for(var i=0;i<split_acd9.length;i++){
					var condition_string = "";
					if(acd_1 == 1){
						if(likeornot == 1){
							condition_string = condition_string + "cd_" + select_year + ".acode_icd9_1 like \"" + split_acd9[i]+"%\"";
						}else{
							condition_string = condition_string + "cd_" + select_year + ".acode_icd9_1 = \"" + split_acd9[i];
							for(var j=split_acd9[i].length;j<5;j++){
								condition_string = condition_string + " ";
							}
							condition_string = condition_string + "\"";
						}
					}
					if(acd_2 == 1){
						if(condition_string != ""){
							condition_string = condition_string + " or ";
						}
						if(likeornot == 1){
							condition_string = condition_string + "cd_" + select_year + ".acode_icd9_2 like \"" + split_acd9[i]+"%\"";
						}else{
							condition_string = condition_string + "cd_" + select_year + ".acode_icd9_2 = \"" + split_acd9[i];
							for(var j=split_acd9[i].length;j<5;j++){
								condition_string = condition_string + " ";
							}
							condition_string = condition_string + "\"";
						}
					}
					if(acd_3 == 1){
						if(condition_string != ""){
							condition_string = condition_string + " or ";
						}
						if(likeornot == 1){
							condition_string = condition_string + "cd_" + select_year + ".acode_icd9_3 like \"" + split_acd9[i]+"%\"";
						}else{
							condition_string = condition_string + "cd_" + select_year + ".acode_icd9_3 = \"" + split_acd9[i];
							for(var j=split_acd9[i].length;j<5;j++){
								condition_string = condition_string + " ";
							}
							condition_string = condition_string + "\"";
						}
					}
					if(sql != ""){
						sql = sql + " or\n" + condition_string;
					}else{
						sql = condition_string;
					}
				}

			}
		}else{
			var operator = $("#"+ conditionbar[i]).closest('li').find('select').eq(0).find("option:selected").attr("value");
			var operand = (operator == "like")? $("#"+ conditionbar[i]).closest('li').find('form').find('input').val()+"%":$("#"+ conditionbar[i]).closest('li').find('form').find('input').val();
			

			//Using HealthcareTable.js checking column type is string or num. if column type is string, then check and fill blank & 0 

			operand = checkColumnTypeString(column_name,operator,operand);

			sql = 
			column_name + " " +//get column name
			operator + " " + //get operator
			operand; //get last operand

		}
		//push into condition_array
		condition_array.push(sql);

		//$("#"+ conditionbar[i]).closest('li').remove();
	}

	for(var i=1;i<condition_array.length;i++){
		var button_start = "<button class='btn btn-default col-xs-12' style='background:#CCFF33' id='remainingBtn_";
		var button_end = "</button>";


		$("#condition_remaining").append(button_start + get_columnname(i) + "'>" + condition_array[i] + button_end);
	}

	//reset condition_groupchoose page 
	condition_groupbtn_create = 0;
	//reset condition_group set
	condition_group = [""];
	/*reset conditionbar
	conditionbar = [""];
	*/
	//reset condition_group name number
	//condition_amount = 0;

	condition_count = condition_array.length-1;

}

/*function for conditions group choosing*/
function get_columnname(i){
	var split_sign = [">","<","=","like"];

	for(var j=0;j<split_sign.length;j++){
		if(condition_array[i].indexOf(split_sign[j]) != -1){
			return condition_array[i].slice(0,condition_array[i].indexOf(split_sign[j])-1) + i ;
		}
	}
	return 0;
}
function condition_group_plus(){


	if(condition_count == 0){
		alert("You have set all conditions !");
		return;
	}else{
		$("#condition_remain_row").hide("slow");
		$("#condition_classification_row").hide("slow");
		$("#condition_andor_button").hide("slow");

		$("#condition_choosegroup").show("slow");
		$("#condition_choosegroup_button").show("slow");
	}
	if(condition_groupbtn_create == 0){
		for(var i=1;i<condition_array.length;i++){
			var button_start = "<button class='btn btn-primary col-xs-12' value = '0'  onclick = 'check_table_click(this.id)' id = '";
			var button_end = "</button>";

			$("#condition_choosegroup_addbtn").append(button_start + "btn_" +  get_columnname(i) + "'>" + condition_array[i] + button_end);

		}
		condition_groupbtn_create = 1;
	}
}

function condition_choosegroup_check(){

	var button_start = "<button class='btn btn-primary col-xs-12'>";
	var button_end = "</button>";

	var group_start = "<li class='list-group-item row' id='condition_choosegroup_group";
	var group_end = "'></li>";

	var select = "<select class = 'col-xs-12'>" +
					"<option value='&'>and</option>"+ 
					"<option value='|'>or</option>"+
				"</select>";


	var check_num = 0;
	var btn_id = [""];



	for(var i=1;i<condition_array.length;i++){
		if($("#btn_"+get_columnname(i)).attr("value") == "1"){
			btn_id.push("btn_" + get_columnname(i));
			condition_count--;
			check_num++;
		}
	}

	switch(check_num){
		case 0:
			alert("You have not choose any condition");
			break;
		case 1:
			//if group_num > 1 , then add select and/or option
			if(condition_group.length > 1){
				$("#condition_group_add").append(group_start + condition_group.length + group_end);
				$("#condition_choosegroup_group"+ condition_group.length).append(select);
				condition_group.push("condition_choosegroup_group" + condition_group.length);
			}

			// 1. append group 2. append chosen condition into the group 3.push group_name into condition_group array
			$("#condition_group_add").append(group_start + condition_group.length + group_end);
			$("#condition_choosegroup_group"+ condition_group.length).append(button_start + $("#"+btn_id[1]).html() + button_end);
			condition_group.push("condition_choosegroup_group" + condition_group.length);

			break;
		default:
			//same step as case 1
			if(condition_group.length > 1){
				$("#condition_group_add").append(group_start + condition_group.length + group_end);
				$("#condition_choosegroup_group"+ condition_group.length).append(select);
				condition_group.push("condition_choosegroup_group" + condition_group.length);
			}
			$("#condition_group_add").append(group_start + condition_group.length + group_end);
			for(var i=1;i<btn_id.length;i++){
				$("#condition_choosegroup_group"+ condition_group.length).append(button_start + $("#"+btn_id[i]).html() + button_end);
			
				//insert select and/or option between two conditions
				if(i != check_num){
					$("#condition_choosegroup_group"+ condition_group.length).append(select);
				}
			}
			condition_group.push("condition_choosegroup_group" + condition_group.length);
			break;
	}


	if(check_num != 0){
		$("#condition_choosegroup").hide("slow");
		$("#condition_choosegroup_button").hide("slow");

		//delete conditions that show in remaining page and choosegroup page
		for(var i=1;i<btn_id.length;i++){
			$("#remainingBtn_"+btn_id[i].slice(4)).remove();   //remaining page
			$("#"+btn_id[i]).remove();  // choosegroup page
		}

		$("#condition_remain_row").show("slow");
		$("#condition_classification_row").show("slow");
		$("#condition_andor_button").show("slow");

	}

}

function condition_andor_prev(){

	$("#condition_remain_row").hide("slow");
	$("#condition_classification_row").hide("slow");
	$("#condition_andor_button").hide("slow");

	$("#condition_row").show("slow");
	$("#condition_button").show("slow");

	//remove remaining condition that not set and conditionbar
	/*for(var i=1;i<conditionbar.length;i++){
		$("#"+ conditionbar[i]).closest('li').remove();
	}
	conditionbar = [""];
	*/
	for(var i=1;i<condition_array.length;i++){
		$("#btn_" + get_columnname(i)).remove();
		$("#remainingBtn_" + get_columnname(i)).remove();
	}
	for(var i=1;i<condition_group.length;i++){
		$("#condition_choosegroup_group"+i).remove();
	}


}

function condition_andor_next(){
	$("#condition_remain_row").hide("slow");
	$("#condition_classification_row").hide("slow");
	$("#condition_andor_button").hide("slow");


	$("#condition_groupby").show("slow");
	$("#condition_orderby").show("slow");
	$("#condition_orderby_button").show("slow");

	//Save the condition string into condition_text area
	var condition_string = "";

	for(var i=1;i<condition_group.length;i++){
		var element = document.getElementById(condition_group[i]);
	

		//get element in group[i]
		if((i%2)==1) condition_string += "("; // concat "("

		for(var child = element.firstChild;child;child = child.nextSibling){
			if(child.nodeName == "BUTTON"){
				condition_string = condition_string + child.innerHTML.slice(0, child.innerHTML.indexOf("_")) + "_" + select_year + "." + child.innerHTML.slice(child.innerHTML.indexOf("_")+1);
			}else if(child.nodeName == "SELECT"){
				condition_string = condition_string + " " + child.options[child.selectedIndex].text + " ";
			}
		}

		if((i%2)==1) condition_string += ") " ;// concat ") "
	}

	$("#condition_text").html(condition_string);



	//Generate column button and put them into 
	var li_begin = "<li class = 'list-group-item row' style='width:100%'>" +
					" <button class = 'btn btn-primary col-xs-8'>";
	var li_firstbuttonTextend = "</button>" + 
								"<button class = 'btn btn-primary col-xs-2 glyphicon glyphicon-chevron-up' onclick = 'column_button_updown(1,this.value)' style= 'display:block' value='";
	var li_secondbuttonTextend = "'></button>" + 
								"<button class = 'btn btn-primary col-xs-2 glyphicon glyphicon-chevron-down' onclick = 'column_button_updown(2,this.value)' style= 'display:block' value='";
	var li_end = "'></button></li>";

	var split_ChosenColumn;
	var column_num = 0;
	for(var i=0;i<table_array.length;i++){
		if(chosen_column_array[(i+1)*2] != ""){
			split_ChosenColumn = chosen_column_array[(i+1)*2].split(",");
			column_num = column_num + split_ChosenColumn.length;
			for(var j=0;j<split_ChosenColumn.length;j++){
				//add button pattern 1. button with columnname text 2.button up 3.button down
				var columnname = table_array[i] + "_" + split_ChosenColumn[j];
				ordering_array.push(columnname);
				$("#ordering_ul").append(li_begin + columnname + li_firstbuttonTextend + columnname +  li_secondbuttonTextend + columnname + li_end );
			}
		}
	}
	//check li order and controll vision of button_up and button_down 
	var element2 = document.getElementById("ordering_ul");
	var li_parent = element2.firstElementChild.nextSibling.nextSibling; // jump cross first title element
	for(var i=0;i<column_num;i++){
		var button_child = li_parent.getElementsByTagName("BUTTON");
		if(column_num == 1){
			button_child[1].setAttribute("style", "display:none");
			button_child[2].setAttribute("style", "display:none");
			break;
		}
		if(i == 0){
			button_child[1].setAttribute("style", "display:none");
			button_child[2].setAttribute("style", "display:block");
		}
		if(i == (column_num-1)){
			button_child[1].setAttribute("style", "display:block");
			button_child[2].setAttribute("style", "display:none");
		}
		
		li_parent = li_parent.nextSibling; 
		
	}
}

/*function for condition up & down*/
function column_button_updown(action,value){
	//Search order_array index
	var order_index = ordering_array.indexOf(value);
	var temp,element;
	if(action == 1){
		//change position of ordering_array
		temp = ordering_array[order_index];
		ordering_array[order_index] = ordering_array[order_index - 1];
	    ordering_array[order_index - 1] = temp;

	    //change position of two element
	    element = document.getElementById("ordering_ul").getElementsByTagName("LI");
	    element[order_index].parentNode.insertBefore(element[order_index],element[order_index - 1]);

	}else if(action == 2){
		//change position of ordering_array
		temp = ordering_array[order_index];
		ordering_array[order_index] = ordering_array[order_index + 1];
	    ordering_array[order_index + 1] = temp;

	    //change position of two element
	    element = document.getElementById("ordering_ul").getElementsByTagName("LI");
	    element[order_index].parentNode.insertBefore(element[order_index+1],element[order_index]);
	}


	//renew vision of button up down
	var element2 = document.getElementById("ordering_ul");
	var li_parent = element2.firstElementChild.nextSibling.nextSibling; // jump cross first title element
	
	for(var i=0;i<ordering_array.length-1;i++){
		var button_child = li_parent.getElementsByTagName("BUTTON");
		if(ordering_array.length == 2){
			button_child[1].setAttribute("style", "display:none");
			button_child[2].setAttribute("style", "display:none");
			break;
		}
		if(i == 0){
			button_child[1].setAttribute("style", "display:none");
			button_child[2].setAttribute("style", "display:block");
		}else if(i == (ordering_array.length-2)){
			button_child[1].setAttribute("style", "display:block");
			button_child[2].setAttribute("style", "display:none");
		}else{
			button_child[1].setAttribute("style", "display:block");
			button_child[2].setAttribute("style", "display:block");
		}
		
		li_parent = li_parent.nextSibling; 
		
	}
}
	
function check_groupby(choose_id){
	$("#duplicate_yes").attr("value","0") ;
	$("#duplicate_yes").attr("style","color:white");
	$("#duplicate_no").attr("value","0");
	$("#duplicate_no").attr("style","color:white");
	
	

	$("#" + choose_id).attr("value","1");
	$("#" + choose_id).attr("style","color:orange");
}

function condition_orderby_prev(){
	//remove exist condition
	for(var i=1;i<condition_array.length;i++){
		$("btn_" + get_columnname(i)).remove();
		$("#remainingBtn_" + get_columnname(i)).remove();
	}
	for(var i=1;i<condition_group.length;i++){
		$("#condition_choosegroup_group"+i).remove();
	}

	for(var i=1;i<condition_array.length;i++){
		var button_start = "<button class='btn btn-default col-xs-12' style='background:#CCFF33' id='remainingBtn_";
		var button_end = "</button>";

		$("#condition_remaining").append(button_start + get_columnname(i) + "'>" + condition_array[i] + button_end);
	}
	//remove element of ordering_ul
	var element2 = document.getElementById("ordering_ul");
	var li_parent = element2.firstElementChild.nextSibling.nextSibling; // jump cross first title element
	var li_remove;
	for(var i=0;i<ordering_array.length-1;i++){
		li_remove = li_parent;
		li_parent = li_parent.nextSibling; 
		li_remove.remove();
	}
	//reset condition_groupchoose page 
	condition_groupbtn_create = 0;
	//reset condition_group set
	condition_group = [""];
	//reset condition_group name number
	condition_amount = 0;
	//reset condition_count
	condition_count=condition_array.length-1;

	$("#condition_groupby").hide("slow");
	$("#condition_orderby").hide("slow");
	$("#condition_orderby_button").hide("slow");

	$("#condition_remain_row").show("slow");
	$("#condition_classification_row").show("slow");
	$("#condition_andor_button").show("slow");
}

function build_sql(){
	//check group by option
	if($("#duplicate_yes").attr("value") == "0" && $("#duplicate_no").attr("value") == "0"){
		alert("You have not choose group by option !");
		return;
	}

	$("#condition_groupby").hide("slow");
	$("#condition_orderby").hide("slow");
	$("#condition_orderby_button").hide("slow");

	$("#build_sql").show();
	$("#copy_sql").show();
	$("#direct_to_server").show();

	var completeSQL = "\nSELECT ";

	for(var i=1;i<ordering_array.length;i++){
		ordering_array[i] = ordering_array[i].slice(0,ordering_array[i].indexOf("_")+1) + select_year + "."+ ordering_array[i].slice(ordering_array[i].indexOf("_")+1) ;
	}
	//1. concat select column , pattern "select cd_2013.id,dd_2013.birthday"
	completeSQL += ordering_array[1]; //concat first column

	for(var i=2;i<ordering_array.length;i++){
		completeSQL = completeSQL + "," + ordering_array[i] ;
	}

	completeSQL += "\n"; //change line

	//2. concat from table , pattern "from hi_2000.cd_2013"

	if(table_array[0] != "id98" && table_array[0] != "id99"){
		if(select_database == "hi_2010"){
			completeSQL = completeSQL + "FROM default" + "." + table_array[0] + "_" + select_year;
		}else{
			completeSQL = completeSQL + "FROM " + select_database + "." + table_array[0] + "_" + select_year;
		}
	}else{
		completeSQL = completeSQL + "FROM " + select_database + "." +table_array[0];
	}//concat first table , check if table_name = id98 or id99 (their tablename have no select_year)

	for(var i=1;i<table_array.length;i++){
		if(table_array[i] != "id98" && table_array[i] != "id99"){
			if(select_year == "hi_2010"){
				completeSQL = completeSQL + ",default" + "." + table_array[i] + "_" + select_year;
			}else{
				completeSQL = completeSQL + "," + select_database + "." + table_array[i] + "_" + select_year;
			}
			
		}else{
			completeSQL = completeSQL + "," + select_database + "." +table_array[i];
		}
	}

	completeSQL += "\n"; //change line
	//3. concat condition line
	if($("#condition_text").html() != "")
		completeSQL = completeSQL + "WHERE " + $("#condition_text").html() + "\n";

	//4. concat group by
	if($("#duplicate_no").attr("value") == "1"){
		completeSQL += "GROUP BY ";

		completeSQL += ordering_array[1];

		for(var i=2;i<ordering_array.length;i++){
			completeSQL = completeSQL + "," + ordering_array[i];
		}
		completeSQL += "\n";
	}

	//5. concat order by
	completeSQL += "ORDER BY ";

	completeSQL += ordering_array[1];

	for(var i=2;i<ordering_array.length;i++){
		completeSQL = completeSQL + "," + ordering_array[i];
	}

	$("#build_sql_show").html(completeSQL);
	$("#copySQLArea").html(completeSQL);


	//direct to server 
	$("#direct_to_server_url").html(select_server);


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
function copy_sql(){
	$("#copySQLArea").show();
	var copyTextarea = document.getElementById('copySQLArea');
 	copyTextarea.select();

 	try {
  		var successful = document.execCommand('copy');
   		var msg = successful ? 'successful' : 'unsuccessful';
    	console.log('Copying text command was ' + msg);

  	} catch (err) {
    	console.log('Oops, unable to copy');
 	}


	$("#copySQLArea").hide();
	//window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
/*Just for test*/

function test(){
		var conditionLine_create_acd = 
		"<li class='list-group-item row navbar navbar-default'>" +	
		"<div class = 'col-xs-2' >"+ test + "</div>" +
		"<select class = 'col-xs-1' style = 'height:100%;'>" +
		"<option value='='>=</option>"+
		"<option value='like'>like</option>"+ 
		"</select>" +
		"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='acd9_1' name='acd_code'>acd_1</label>" + 
		"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='acd9_2' name='acd_code'>acd_2</label>" + 
		"<label class = 'col-xs-1 checkbox-inline'><input type='checkbox' value='acd9_3' name='acd_code'>acd_3</label>" + 
		"<form class='col-xs-2' style='height:100%;' >" +
		/*"<label for='uploadfile_" + condition_amount + "' style= 'height:100%;width:100%;pointer:cursor;display:block;' </label>" +  */
		"<input class='form-control' type='file' name='condition_value' onchange='handleFile(this.files,this.id)' accept='.txt' id= 'uploadfile_" +condition_amount + "' value=''/>"  +
		"</form>"+
		"<form class='col-xs-2'>" + "<input type='text' name='condition_value' value='' placeholder = '"+"Click Left Button to Load"+"'></input>" + "</form>"+
		"<button class = 'col-xs-2 glyphicon glyphicon-minus' id='condition_test"+"' onclick='delete_conditions(this.id)' >"+ "</button>" +	
		"</li>";

		$("#server_row").append(conditionLine_create_acd);

}


