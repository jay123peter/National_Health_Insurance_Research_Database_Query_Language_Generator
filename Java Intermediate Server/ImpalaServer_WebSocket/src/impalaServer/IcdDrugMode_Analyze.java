package impalaServer;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import impalaServer.IcdDrug.relation;

public class IcdDrugMode_Analyze {
	private int firsttime = 0;
	public int age[] = new int[15];
	public int sex_age[][] = new int[15][3];
	public int sex[] = new int[3];
	public ArrayList<IcdDrug> IcdDrugList = new ArrayList<IcdDrug>();
	public ArrayList<Integer> IcdDrugPosition = new ArrayList<Integer>();
	
	public void add_IcdDrug(String column_name[]){
		//checking the column name for icd and drug name 
		for(int i=3;i<column_name.length;i++){
			if( !(column_name[i].equals("area")) && !(column_name[i].equals("ins_amt"))){
				if(column_name[i].length() > 6){
					if(!(column_name[i].substring(0,6).equals("fdyear")) && !(column_name[i].substring(0,5).equals("fdmon")) &&
						!(column_name[i].substring(0,6).equals("ldyear")) && !(column_name[i].substring(0,5).equals("ldmon"))){
						this.IcdDrugList.add(new IcdDrug(column_name[i],i));
						this.IcdDrugPosition.add(i);
					}
				}else{
					this.IcdDrugList.add(new IcdDrug(column_name[i],i));
					this.IcdDrugPosition.add(i);
				}
			}
		}
		
	}
	public void do_record(String split_data[]){
		if(firsttime == 0){
			for(IcdDrug s:IcdDrugList){
				s.IcdDrug_BuildList(split_data,this.IcdDrugList);
			}
			firsttime++;
		}
		try{
			if(Integer.parseInt(split_data[1].substring(0,4)) > 2010){
				return;
			}
			add_sex(split_data[1],split_data[2]); // record into sex & sex_age
			add_age(split_data[1]);//record into age
			
			//record icd Drug information
			for(IcdDrug s:IcdDrugList){
				s.do_record(split_data);
			}
		}
		catch(Exception e){
			System.out.println("IcdDrugMode do_record - " + e + " : " + split_data[1] );
			return;
		}
		

	}
	public void add_age(String birthday){
		
		int age_2010 = 2010 - Integer.parseInt(birthday.substring(0,4));
		age[(age_2010/10)]++;
		
	}
	
	public void show_age(){
		System.out.println("--------------- Age List : -------------");
		for(int i=0;i<10;i++){System.out.println("");
			System.out.println("age " + (i*10) + " ~ " + (i*10+9) + " : " + age[i]);
		}
		System.out.println("---------------------------------------");
	}
	
	public void add_sex(String birthday,String sex){

		int age_2010 = 2010 - Integer.parseInt(birthday.substring(0,4));
		if(sex.equals("F")|| sex.equals("f")){
			this.sex[1]++;
			this.sex_age[(age_2010/10)][1]++;
		}else if(sex.equals("M")|| sex.equals("m")){
			this.sex[0]++;
			this.sex_age[(age_2010/10)][0]++;
		}else{
			this.sex[2]++;
			this.sex_age[(age_2010/10)][2]++;
		}
	}
	public void show_sex(){
		System.out.println("--------------- Sex List : -------------");
		for(int i=0;i<10;i++){System.out.println("");
			System.out.println("age " + (i*10)+" : ");
			System.out.print("Male : " + sex_age[i][0]+" ");
			System.out.print("Female : " + sex_age[i][1]+" ");
			System.out.println("undefined :" + sex_age[i][2]);
		}

		System.out.println("---------------------------------------");
	}
	
	public JSONObject json_Create(){
		/*
		 * json: 
		 * {
		 *   "basic" : {
		 *   	"age" : [13,14,15,16,17],
		 *   	"sex" : [12,13,14],
		 *   	"IcdDrug" : [
		 *   		{"sick1":123},{"sick2":456}
		 *   	]
		 *   }
		 *   
		 *   "all" : {
		 *   	
		 *   }
		 *   
		 *   "sex" : {
		 *   }
		 *   
		 *   "age" : {
		 *   }
		 *   
		 *   "relation" : {
		 *   }
		 *
		 * }
		 * */
		JSONObject jsonCreate = new JSONObject();
		
		//generate "basic" json
		JSONObject basic = json_basic();
		JSONObject all = json_all();
		JSONObject sex = json_sex();
		JSONObject age = json_age();
		JSONObject relation = json_relation();
		try {
			jsonCreate.put("basic", basic);
			jsonCreate.put("all", all);
			jsonCreate.put("sex", sex);
			jsonCreate.put("age", age);
			jsonCreate.put("relation", relation);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return jsonCreate;
	}
	public JSONObject json_basic(){
		/*"basic" : {
		 *   	"age" : [13,14,15,16,17],
		 *   	"sex" : [12,13,14],
		 *   	"IcdDrug" : {
		 *   		"sick1":123,"sick2":456
		 *   	}
		 *   }
		 */
		JSONObject basic = new JSONObject();
		JSONObject icddrug = new JSONObject();
		JSONArray age = new JSONArray();
		JSONArray sex = new JSONArray();
		
		//age object
		for(int i=0;i<10;i++){
			age.put(this.age[i]);
		}
		//sex object
		for(int i=0;i<3;i++){
			sex.put(this.sex[i]);
		}
		
		//icddrug object
		for(IcdDrug s:IcdDrugList){
			try {
				icddrug.put(s.name, s.all_people);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		try {
			basic.put("age",age);
			basic.put("sex",sex);
			basic.put("IcdDrug",icddrug);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return basic;
	}
	public JSONObject json_all(){
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
		JSONObject all = new JSONObject();
		
		JSONObject allpeople = new JSONObject();
		
		JSONObject age = new JSONObject();
		JSONArray age_inside;
		
		JSONObject firstday = new JSONObject();
		JSONArray firstday_inside;
		
		
		
		for(IcdDrug s:IcdDrugList){
			try {
				//age object
				age_inside = new JSONArray();
				for(int i=0;i<10;i++){
					age_inside.put(s.age[i]);
				}
				age.put(s.name, age_inside);
				
				//firstday object
				firstday_inside = new JSONArray();
				for(int i=0;i<24;i++){
					firstday_inside.put(s.firstday[i]);
				}
				firstday.put(s.name, firstday_inside);
				//allpeople object
				allpeople.put(s.name, s.all_people);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		
		//put into all object
		try {
			all.put("age",age);
			all.put("firstday",firstday);
			all.put("allpeople",allpeople);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return all;
	}
	public JSONObject json_sex(){
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
		 *    		"0~9":[233,122,1]},"10~19":[111,222,1]
		 *    	}
		 *    	"sick2" : {
		 *    		"0~9":[233,122,1],"10~19":[111,222,1]
		 *    	}
		 *    }
		 *    "allpeople" : {
		 *   		"sick1":123,"sick2":456
		 *   	}
		 * }
		 * */ 
		JSONObject sex = new JSONObject();
		JSONObject allpeople = new JSONObject();
		
		JSONObject age_sex = new JSONObject();
		JSONObject age_sex_object;
		JSONArray age_sex_obeject_inside;
		
		JSONObject firstday_sex = new JSONObject();
		JSONObject firstday_sex_object;
		JSONArray firstday_sex_obeject_inside;
		
		for(IcdDrug s:IcdDrugList){
			try {
				//age_sex object
				age_sex_object = new JSONObject();
				for(int i=0;i<10;i++){
					age_sex_obeject_inside = new JSONArray();
					for(int j=0;j<3;j++){
						age_sex_obeject_inside.put(s.age_sex[i][j]);
						
					}
					age_sex_object.put((i*10)+" ~ "+((i*10)+9), age_sex_obeject_inside);
				}
				age_sex.put(s.name, age_sex_object);
				
				//firstday_sex object
				firstday_sex_object = new JSONObject();
				for(int i=0;i<24;i++){
					firstday_sex_obeject_inside = new JSONArray();
					for(int j=0;j<3;j++){
						firstday_sex_obeject_inside.put(s.firstday_sex[i][j]);
					}
					firstday_sex_object.put(""+(1990+i), firstday_sex_obeject_inside);
				}
				firstday_sex.put(s.name,firstday_sex_object);
				//allpeople object
				allpeople.put(s.name, s.all_people);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		//put into sex object
		try {
			sex.put("age_sex",age_sex);
			sex.put("firstday_sex",firstday_sex);
			sex.put("allpeople",allpeople);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sex;
	}
	public JSONObject json_age(){
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
		JSONObject age = new JSONObject();
		JSONObject allpeople = new JSONObject();
		
		JSONObject firstday_age = new JSONObject();
		JSONObject firstday_age_object;
		JSONArray firstday_age_obeject_inside;
		
		for(IcdDrug s:IcdDrugList){
			try {

				//firstday_age object
				firstday_age_object = new JSONObject();
				for(int i=0;i<24;i++){
					firstday_age_obeject_inside = new JSONArray();
					for(int j=0;j<3;j++){
						firstday_age_obeject_inside.put(s.firstday_age[i][j]);
					}
					firstday_age_object.put(""+(1990+i), firstday_age_obeject_inside);
				}
				firstday_age.put(s.name,firstday_age_object);
				//allpeople object
				allpeople.put(s.name, s.all_people);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		try {
			age.put("firstday_age",firstday_age);
			age.put("allpeople",allpeople);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return age;
	}
	public JSONObject json_relation(){
		/*
		 * json: sex
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
		JSONObject relation = new JSONObject();
		
		JSONObject relationList = new JSONObject();
		JSONObject relationList_object;
		JSONArray relationList_object_inside;		
		if(IcdDrugList.size()==1){
			return relation;
			
		}
		for(IcdDrug s:IcdDrugList){
			try {
				//relationList object
				relationList_object = new JSONObject();
				for(relation r:s.relationList){
					relationList_object_inside = new JSONArray();
					relationList_object_inside.put(r.before);
					relationList_object_inside.put(r.after);
					relationList_object_inside.put(r.equals);
					relationList_object_inside.put(r.all);
					relationList_object.put(r.name,relationList_object_inside);
				}
				relationList.put(s.name, relationList_object);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		try {
			relation.put("relationList",relationList);

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return relation;
	}
	public void json_sexCount(JSONArray sex_count){
		/*
		 * json: sex
		 * {
		 *    "sex_count":[{"0~9":[233,122,1]},{"10~19":[111,222,1]}]
		 *
		 * }
		 * */ 
		JSONObject age_sex;
		JSONArray  number;
		for(int i=0;i<10;i++){
			age_sex = new JSONObject();
			number = new JSONArray();
			for(int j=0;j<3;j++){
				number.put(sex_age[i][j]);
			}
			try {
				age_sex.put((i*10)+" ~ "+((i*10)+9), number);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			sex_count.put(age_sex);
		}
		
	}
}
