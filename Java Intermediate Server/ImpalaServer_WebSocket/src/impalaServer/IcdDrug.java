package impalaServer;

import java.util.ArrayList;

public class IcdDrug {
	public int recordNum;
	public String name;
	public int all_people = 0;
	public int age[] = new int[15];
	public int age_sex[][] = new int[15][3];// (Age) and (Male/Female/Undefined)
											// Classification
	public int firstday[] = new int[24]; //1990 - 2013
	public int firstday_sex[][] = new int[24][3];// (firstday) and
													// (Male/Female/Undefined)
													// Classification
	public int firstday_age[][] = new int[24][3];// (firstday) and
													// (0~18/19~64/65+)
													// Classification
	private int relationListSize;
	public relation[] relationList;

	public IcdDrug(String name, int recordNum) {
		this.name = name;
		this.recordNum = recordNum;
	}

	public void IcdDrug_BuildList(String split_data[], ArrayList<IcdDrug> IcdDrugList) {
		relationListSize = IcdDrugList.size() - 1;
		System.out.println("relationListsize : " + relationListSize);

		if (relationListSize >= 1){
			relationList = new relation[relationListSize];
			for(int i=0;i<relationList.length;i++){
				relationList[i] = new relation();
			}
		}

		int count = 0;
		for (IcdDrug i : IcdDrugList) {
			if (i.recordNum != recordNum) {
				relationList[count].name = i.name;
				relationList[count].recordNum = i.recordNum;
				relationList[count].before = 0;
				relationList[count].after = 0;
				System.out.println("RelationList [" + count + "].name :" + relationList[count].name + " in recordNum : " +relationList[count].recordNum );
				count++;
			}
			
		}
	}

	public void do_record(String split_data[]) {
		// patient age based on 2000 year
		int age_2010 = 2010 - Integer.parseInt(split_data[1].substring(0, 4));
		// this Icd9 or Drug firstday
		int fd = Integer.parseInt(split_data[recordNum + 1]);

		// record all_people, use for basic classification
		if (split_data[recordNum].equals("1")) {
			all_people++;
		}

		// record age[], use for all classification
		if (split_data[recordNum].equals("1")) {
			age[(age_2010 / 10)]++;
		}

		// record age_sex[][], use for sex classification
		if (split_data[recordNum].equals("1")) {
			if (split_data[2].equals("M") || split_data[2].equals("m")) {
				age_sex[(age_2010 / 10)][0]++;
			} else if (split_data[2].equals("F") || split_data[2].equals("f")) {
				age_sex[(age_2010 / 10)][1]++;
			} else {
				age_sex[(age_2010 / 10)][2]++;
			}
		}

		// record firstday, use for all classification
		if (split_data[recordNum].equals("1")) {
			firstday[fd - 1990]++;
		}

		// record firstday_sex, use for sex classification
		if (split_data[recordNum].equals("1")) {
			if (split_data[2].equals("M") || split_data[2].equals("m")) {
				firstday_sex[fd - 1990][0]++;
			} else if (split_data[2].equals("F") || split_data[2].equals("f")) {
				firstday_sex[fd - 1990][1]++;
			} else {
				firstday_sex[fd - 1990][2]++;
			}
		}

		// record firstday_age, use for age classification
		if (split_data[recordNum].equals("1")) {
			if (age_2010 >= 0 && age_2010 <= 18) {
				firstday_age[fd - 1990][0]++;
			} else if (age_2010 >= 19 && age_2010 <= 64) {
				firstday_age[fd - 1990][1]++;
			} else {
				firstday_age[fd - 1990][2]++;
			}
		}

		// record relation
		if (relationListSize >= 1) {
			if (split_data[recordNum].equals("1")) {
				int relation_fd;
				for (relation r : relationList) {
					if (split_data[r.recordNum].equals("1")) {
						relation_fd = Integer.parseInt(split_data[r.recordNum + 1]);
						if (fd < relation_fd) {
							r.before++;
							r.all++;
							//System.out.println(r.name + "(before) : " + fd + " < " + relation_fd);
						}
						if (fd > relation_fd) {
							r.after++;
							r.all++;
							//System.out.println(r.name + "(after) : " + fd + " >= " + relation_fd);
						}
						if(fd == relation_fd){
							r.equals++;
							r.all++;
						}
					}
				}
			}
		}
	}
	
	public class relation {
		public String name;
		public int recordNum;
		public int before;
		public int after;
		public int equals;
		public int all;
	}
}
