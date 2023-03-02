
/*
	type : decide type of the Column
		1 = string
		2 = int or float
		3 = DATE(YYYYMM)
		4 = DATE(YYYYMMDD) 
		5 = DATE(YYYYMMDDHH:MM:SS)
	length : length of the column
	fill : whether the column add blank at the right side or add zero at the left side
		0 = no
		1 = 左靠不足補空白
		2 = 右靠不足補0

	Condition :
		if(fill == 0 && data.length != length){
			--> ERROR !
		}else if (fill == 1 &&  data.length <= length){
			--> EX : length = 5 , data = "1785" , then  output "1785 "
		}else if(fill == 2 && data.length <= length){
			--> EX : length = 5 , data = "1785" , then  output "01785"
		}
*/
var cd = {
	fee_ym : {name : "費用年月",type : 3,length : 6,fill : 0},
	appl_type : {name : "申報類別",type : 1,length : 1,fill : 0},
	hosp_id : {name : "醫事機構代號",type : 1,length : 34,fill : 0},
	appl_date : {name : "申報日期",type : 4,length : 8,fill : 0},
	case_type : {name : "案件分類",type : 1,length : 2,fill : 0},
	seq_no : {name : "流水號",type : 1,length : 6,fill : 2},
	cure_item_no1 : {name : "特定治療項目代號（一）",type : 1,length : 2,fill : 0},
	cure_item_no2 : {name : "特定治療項目代號（二）",type : 1,length : 2,fill : 0},
	cure_item_no3 : {name : "特定治療項目代號（三）",type : 1,length : 2,fill : 0},
	cure_item_no4 : {name : "特定治療項目代號（四）",type : 1,length : 2,fill : 0},
	func_type : {name : "就醫科別",type : 1,length : 2,fill : 0},
	func_date : {name : "就醫日期",type : 4,length : 8,fill : 0},
	treat_end_date : {name : "治療結束日期",type : 4,length : 8,fill : 0},
	id_birthday : {name : "出生年月",type : 4,length : 8,fill : 1},
	id : {name : "身份證統一編號",type : 1,length : 32,fill : 0},
	card_seq_no : {name : "健保卡就醫序號",type : 1,length : 2,fill : 0},
	gave_kind : {name : "給付類別",type : 1,length : 1,fill : 0},
	part_no : {name : "部分負擔代號",type : 1,length : 3,fill : 0},
	acode_icd9_1 : {name : "國際疾病分類號一",type : 1,length : 5,fill : 1},
	acode_icd9_2 : {name : "國際疾病分類號二",type : 1,length : 5,fill : 1},
	acode_icd9_3 : {name : "國際疾病分類號三",type : 1,length : 5,fill : 1},
	icd_op_code : {name : "主手術代碼",type : 1,length : 4,fill : 0},
	drug_day : {name : "給藥日份",type : 2,length : 2,fill : 0},
	med_type : {name : "處方調劑方式",type : 1,length : 1,fill : 0},
	prsn_id : {name : "醫師代號",type : 1,length : 32,fill : 1},
	phar_id : {name : "藥師代號",type : 1,length : 32,fill : 1},
	drug_amt : {name : "用藥明細點數小計",type : 2,length : 8,fill : 0},
	treat_amt : {name : "診療明細點數小計",type : 2,length : 8,fill : 0},
	treat_code : {name : "診察費項目代號",type : 1,length : 12,fill : 1},
	diag_amt : {name : "診察費",type : 2,length : 8,fill : 0},
	dsvc_no : {name : "藥事服務費項目代號",type : 1,length : 12,fill : 0},
	dsvc_amt : {name : "藥事服務費",type : 2,length : 8,fill : 0},
	by_pass_code : {name : "DRG參考碼",type : 1,length : 2,fill : 0},
	t_amt : {name : "合計點數",type : 2,length : 8,fill : 0},
	part_amt : {name : "部分負擔點數",type : 2,length : 8,fill : 0},
	t_appl_amt : {name : "申請點數",type :2 ,length : 8,fill :0 },
	id_sex : {name : "性別",type : 1,length : 1,fill : 0},
	tran_in_hosp_id : {name : "轉入院所代碼",type : 1,length :34 ,fill : 0},
	pat_tran_out : {name : "病患是否轉出",type : 1,length : 1,fill : 0},
    appl_cause_mark : {name : "補報原因註記",type : 1,length : 1,fill : 0}
}
var oo = {
	fee_ym : {name: "費用年月",type : 3,length : 6,fill : 0},
	appl_type : {name: "申報類別",type : 1,length :1 ,fill : 0},
	hosp_id : {name: "醫事機構代號",type : 1,length : 34,fill : 0},
	appl_date : {name: "申報日期",type : 1,length : 8,fill : 0},
	case_type : {name: "案件分類",type : 1,length : 2,fill : 0},
	seq_no : {name: "流水號",type : 1,length : 6,fill : 2},
	order_type : {name: "醫令類別",type : 1,length :1 ,fill : 0},
	drug_no : {name: "藥品(項目)代號",type : 1,length : 12,fill : 1},
	drug_use : {name: "藥品用量(診療部位)",type : 1 ,length : 6,fill : 2},
	drug_fre : {name: "藥品使用頻率(支付成數)",type : 1,length : 18,fill : 1},
	unit_price : {name: "單價",type : 2,length : 10,fill : 0},
	total_qty : {name: "總量",type : 2,length : 7,fill : 0},
	total_amt : {name: "點數",type : 2,length : 8,fill : 0},
	order_seq_no : {name: "醫令序號",type : 2,length : 5,fill : 0},
	rel_mode : {name: "調劑方式",type : 1,length :1 ,fill : 0},
	exe_s_date : {name: "執行時間-起",type : 5,length : 16,fill : 0},
	exe_e_date : {name: "執行時間-迄",type : 5,length : 16,fill : 0},
	pay_rate : {name: "支付成數",type : 2,length : 10,fill : 0},
	cure_path : {name: "診療之部位",type : 1,length : 30,fill : 1}
}

var dd = {
	fee_ym : {name: "費用年月",type : 3,length : 6,fill : 0},
	appl_type : {name: "申報類別",type : 1,length :1 ,fill : 0},
	hosp_id : {name: "醫事機構代號",type : 1,length : 34,fill : 0},
	appl_date : {name: "申報日期",type : 1,length : 8,fill : 0},
	case_type : {name: "案件分類",type : 1,length : 2,fill : 0},
	seq_no : {name: "流水號",type : 1,length : 6,fill : 2},
	id : {name: "身分證統一編號",type : 1,length : 32,fill : 0},
	id_birthday : {name: "出生年月",type : 4,length : 8,fill : 1},
	gave_kind : {name: "給付類別",type : 1,length : 1,fill : 0},
	trac_even : {name: "汽車交通事故",type : 1,length : 1,fill : 0},
	card_seq_no : {name: "就醫序號",type : 1,length : 2,fill :0 },
	func_type : {name: "就醫科別",type : 1,length : 2,fill : 0},
	in_date : {name: "入院年月日",type : 4,length : 8,fill : 0},
	out_date : {name: "出院年月日",type : 4,length : 8,fill : 0},
	appl_beg_date : {name: "申報期間-起",type : 4,length : 8,fill : 0},
	appl_end_date : {name: "申報期間-迄",type : 4,length :8 ,fill : 0},
	e_bed_day : {name: "急性病床天數",type : 2,length : 3,fill : 0},
	s_bed_day : {name: "慢性病床天數",type : 2,length : 3,fill : 0},
	prsn_id : {name: "主治醫師代碼",type : 1,length : 32,fill : 0},
	drg_code : {name: "DRG參考碼",type : 1,length : 5,fill : 0},
	ext_code_1 : {name: "外因分類一",type : 1,length : 5,fill : 0},
	ext_code_2 : {name: "外因分類二",type : 1,length : 5,fill : 0},
	tran_code : {name: "轉歸代碼",type : 1,length : 1,fill : 0},
	icd9cm_code : {name: "主診斷代碼",type : 0,length : 5,fill : 0},
	icd9cm_code_1 : {name: "次診斷代碼一",type : 1,length : 5,fill : 1},
	icd9cm_code_2 : {name: "次診斷代碼二",type : 1,length : 5,fill : 1},
	icd9cm_code_3 : {name: "次診斷代碼三",type : 1,length : 5,fill : 1},
	icd9cm_code_4 : {name: "次診斷代碼四",type : 1,length : 5,fill : 1},
	icd_op_code : {name: "主手術（處置",type : 1,length : 4,fill : 1},
	icd_op_code_1 : {name: "主手術（處置）一",type : 1,length : 4,fill : 1},
	icd_op_code_2 : {name: "主手術（處置）二",type : 1,length : 4,fill : 1},
	icd_op_code_3 : {name: "主手術（處置）三",type : 1,length : 4,fill : 1},
	icd_op_code_4 : {name: "主手術（處置）四",type : 1,length : 4,fill : 1},
	diag_amt : {name: "診察費",type : 2,length :7 ,fill :0 },
	room_amt : {name: "病房費",type : 2,length : 7,fill :0},
	meal_amt : {name: "管灌膳食費",type : 2,length : 7,fill : 0},
	amin_amt : {name: "檢查費",type : 2,length : 7,fill : 0},
	rado_amt : {name: "放射線診療費",type : 2,length : 7,fill : 0},
	thrp_amt : {name: "治療處置費",type : 2,length : 7,fill : 0},
	sgry_amt : {name: "手術費",type : 2,length : 7,fill : 0},
	phsc_amt : {name: "復健治療費",type : 2,length : 7,fill : 0},
	blod_amt : {name: "血液血漿費",type : 2,length : 7,fill : 0},
	hd_amt : {name: "血液透析費",type : 2,length : 7,fill : 0},
	ane_amt : {name: "麻醉費",type : 2,length : 7,fill : 0},
	metr_amt : {name: "特殊材料費",type : 2,length : 7,fill : 0},
	drug_amt : {name: "藥費",type : 2,length : 7,fill : 0},
	dsvc_amt : {name: "藥事服務費",type : 2,length : 7,fill : 0},
	nrtp_amt : {name: "精神科治療費",type : 2,length : 7,fill : 0},
	injt_amt : {name: "注射技術費",type : 2,length : 7,fill : 0},
	baby_amt : {name: "嬰兒費",type : 2,length : 7,fill : 0},
	charg_amt : {name: "代辦費",type : 2,length : 7,fill : 0},
	med_amt : {name: "醫療費用",type : 2,length : 8,fill : 0},
	part_amt : {name: "部份負擔點數",type : 2,length : 7,fill : 0},
	appl_amt : {name: "申請費用點數",type : 2,length : 8,fill : 0},
	eb_appl30_amt : {name: "醫療費用點數(急性病床 1至30天)",type : 2,length : 8,fill : 0},
	eb_part30_amt : {name: "部份負擔點數(急性病床 1至30天)",type : 2,length : 7,fill : 0},
	eb_appl60_amt : {name: "醫療費用點數(急性病床31至60天)",type : 2,length : 8,fill : 0},
	eb_part60_amt : {name: "部份負擔點數(急性病床31至60天)",type : 2,length : 7,fill : 0},
	eb_appl61_amt : {name: "醫療費用點數(急性病床61天以上)",type : 2,length : 8,fill : 0},
	eb_part61_amt : {name: "部份負擔點數(急性病床61天以上)",type : 2,length : 7,fill : 0},
	sb_appl30_amt : {name: "醫療費用點數(慢性病床 1至30天)",type : 2,length : 8,fill : 0},
	sb_part30_amt : {name: "部份負擔點數(慢性病床 1至30天)",type : 2,length : 7,fill : 0},
	sb_appl90_amt : {name: "醫療費用點數(慢性病床31至90天)",type : 2,length : 8,fill : 0},
	sb_part90_amt : {name: "部份負擔點數(慢性病床31至90天)",type : 2,length : 7,fill : 0},
	sb_appl180_amt : {name: "醫療費用點數(慢性病床91至180天)",type : 2,length : 8,fill : 0},
	sb_part180_amt : {name: "部份負擔點數(慢性病床91至180天)",type : 2,length : 7,fill : 0},
	sb_appl181_amt : {name: "醫療費用點數(慢性病床181天以上)",type : 2,length : 8,fill : 0},
	sb_part181_amt : {name: "部份負擔點數(慢性病床181天以上)",type : 2,length : 7,fill : 0},
	part_mark : {name: "部份負擔註記",type : 1,length : 3,fill : 0},
	id_sex : {name: "性別",type : 1,length : 1,fill : 0},
	exm_result_drg_1 : {name: "審核結果DRG",type : 1,length : 5,fill : 0},
	exm_result_mdc_1 : {name: "審核結果MDC",type : 1,length : 2,fill : 0},
	tw_drgs : {name: "TW_DRGS碼",type : 1,length : 5,fill : 0},
	appl_cause_mark : {name: "補報原因註記",type : 1,length : 1,fill : 0},
	tw_drgs_suit_mark : {name: "不適用Tw-DRGs案特殊註記",type : 1,length : 1,fill : 0}
}

var ddo = {
	fee_ym : {name: "費用年月",type : 3,length : 6,fill : 0},
	appl_type : {name: "申報類別",type : 1,length :1 ,fill : 0},
	hosp_id : {name: "醫事機構代號",type : 1,length : 34,fill : 0},
	appl_date : {name: "申報日期",type : 1,length : 8,fill : 0},
	case_type : {name: "案件分類",type : 1,length : 2,fill : 0},
	seq_no : {name: "流水號",type : 1,length : 6,fill : 2},
	order_seq_no : {name: "醫令序號",type : 1,length : 5,fill : 2},
	order_type : {name: "醫令類別",type : 1,length : 1,fill : 0},
	order_code : {name: "醫令代碼",type : 1,length : 12,fill : 1},
	rate_type : {name: "支付成數",type : 2,length : 4,fill : 0},
	order_qty : {name: "醫令數量",type : 2,length : 7,fill : 0},
	order_price : {name: "醫令單價",type :2 ,length : 10,fill : 0},
	order_amt : {name: "醫令點數",type : 2,length : 8,fill : 0},
	exe_s_date : {name: "執行起日",type : 5,length : 16,fill : 0},
	exe_e_date : {name: "執行迄日",type : 5,length : 16,fill : 0},
	drug_fre : {name: "藥品使用頻率",type : 1,length : 4,fill : 1}, // STAT,TID,ASORDER 
	drug_path : {name: "給藥途徑/作用部位",type : 1,length : 4,fill : 1},
	tw_drgs_calcu : {name: "Tw-DRGs 計算",type : 2,length : 18,fill : 0},
	cure_path : {name: "診療之部位",type : 1,length : 47,fill : 1}

}

var id98 = {
	id : {name: "個人身份證號",type : 1,length : 32,fill : 0},
	ins_id : {name: "被保險人身份證號",type : 1,length : 32,fill : 0},
	ins_id_type : {name: "身份別",type : 1,length : 1,fill : 0},
	ins_amt : {name: "投保點數",type : 2,length : 6,fill : 0},
	id_birthday : {name: "出生年月",type : 4,length : 8,fill : 1},
	id_sex : {name: "性別",type : 1,length : 1,fill :0},
	ins_relation : {name: "稱謂代號",type : 1,length : 1,fill : 0},
	unit_ins_type : {name: "單位保險類別",type : 1,length : 3,fill : 0},
	area_no_i : {name: "單位區域代碼",type : 2,length : 4,fill : 0},
	id_in_type : {name: "加保別",type : 1,length : 1,fill : 0},
	id_in_date : {name: "加保日期",type : 4,length : 8,fill : 0},
	id_out_type : {name: "退保別",type : 1,length : 1,fill : 0},
	id_out_date : {name: "退保日期",type : 4,length : 8,fill : 0}

}
var id99 = {
	id : {name: "個人身份證號",type : 1,length : 32,fill : 0},
	ins_id : {name: "被保險人身份證號",type : 1,length : 32,fill : 0},
	ins_id_type : {name: "身份別",type : 1,length : 1,fill : 0},
	ins_amt : {name: "投保點數",type : 2,length : 6,fill : 0},
	id_birthday : {name: "出生年月",type : 4,length : 8,fill : 1},
	id_sex : {name: "性別",type : 1,length : 1,fill :0},
	ins_relation : {name: "稱謂代號",type : 1,length : 1,fill : 0},
	unit_ins_type : {name: "單位屬性",type : 1,length : 3,fill : 0},
	reg_zip_code : {name: "郵遞區號",type : 1,length : 4,fill : 0},
	tx_code : {name: "異動別",type : 1,length : 2,fill : 0},
	id_in_date : {name: "加保日期",type : 4,length : 8,fill : 0},
	id_out_date : {name: "退保日期",type : 4,length : 8,fill : 0}

}


function getChineseName(table_name,column_name){
	return window[table_name][column_name]["name"];
}

function checkColumnTypeString(table_columnName,operator,operand){
	var table_name = table_columnName.slice(0,table_columnName.indexOf("_"));
	var column_name = table_columnName.slice(table_columnName.indexOf("_")+1);

	//return if operand is column name
	if(operand.indexOf("_") > 0 ){
		var operand_front = operand.slice(0,operand.indexOf("_"));
		var operand_end = operand.slice(operand.indexOf("_")+1);

		if(operand_front == "cd" || operand_front == "dd" || operand_front == "oo" || operand_front== "do" || operand_front == "id98" || operand_front == "id99"){
			return operand;
		}
	}



	//check fill property, than fill 0 or blank
	if(window[table_name][column_name]["type"] != 2){
		var length = window[table_name][column_name]["length"];
		//check operator is "like" or not
		/*if(operator == "like"){
			return "\"" + operand + "\"";
		}*/
		//check length of operand
		if(operand.length > length && window[table_name][column_name]["type"] == 1){
			alert("Your operand [" + operand + "] may have Wrong length, Please check again and use prev button !");
		}
		switch(window[table_name][column_name]["type"]){
			case 3 : 
				if(operand.length != length){ 
					alert("Your operand [" + operand + "] may cause some problem, Please use prev button and Set it to \"YYYYMM\" type !");
				}
				break;
			case 4 :
				if(operand.length != length){ 
					alert("Your operand [" + operand + "] may cause some problem, Please use prev button and Set it to \"YYYYMMDD\" type !");
				}
				break;
			case 5 :
				if(operand.length != length){ 
					alert("Your operand [" + operand + "] may cause some problem, Please use prev button and Set it to \"YYYYMMDDHH:MM:SS\" type !");
				}
				break;
		}


		switch(window[table_name][column_name]["fill"]){
			case 0:
				if(operand.length < length && window[table_name][column_name]["type"] == 1 ){
					alert("Your operand [" + operand + "] should be an " + length +" length string, Please use prev button and reset it !");
				}
				return "\"" + operand + "\""; //return "operand"
				break;
			case 1:
				for(var i = operand.length;i < length;i++){
					operand = operand + " ";	
				}
				return "\"" + operand + "\""; //fill blank and return "operand   "
				break;
			case 2:
				for(var i = operand.length;i < length;i++){
					operand = "0"+operand;	
				}
				return "\"" + operand + "\""; //fill blank and return "operand   "
				break;
		}
	}else{
		return operand;//return if operand is Num
	}

}

function returnPlaceHolder(table_columnName){
	var table_name = table_columnName.slice(0,table_columnName.indexOf("_"));
	var column_name = table_columnName.slice(table_columnName.indexOf("_")+1);

	/*type : decide type of the Column
		1 = string
		2 = int or float
		3 = DATE(YYYYMM)
		4 = DATE(YYYYMMDD) 
		5 = DATE(YYYYMMDDHH:MM:SS)
	*/
	switch(window[table_name][column_name]["type"]){
		case 1:
			return window[table_name][column_name]["length"] + " length String";
			break;
		case 2:
			return window[table_name][column_name]["length"] + " length Number";
			break;
		case 3:
			return "YYYYMM(194001)";
			break;
		case 4:
			return "YYYYMMDD(19400101)";
			break;
		case 5:
			return "YYYYMMDDHH:MM:SS(1940010112:00:00)";
			break;
		default:
			return "Wrong type";
			break;
	}
}


