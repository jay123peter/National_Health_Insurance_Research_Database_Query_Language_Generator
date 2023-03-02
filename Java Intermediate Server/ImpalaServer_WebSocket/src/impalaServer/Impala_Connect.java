package impalaServer;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

import org.java_websocket.WebSocket;
import org.json.JSONArray;
import org.json.JSONObject;

public class Impala_Connect implements Runnable {
	private static final String IMPALAD_JDBC_PORT = "21050";
	private static final String IMPALAD_HOST_Z2202 = "jdbc:hive2://" + /*"z2202.net.nsysu.edu.tw"*/"140.117.171.77" + ':'
			+ IMPALAD_JDBC_PORT + "/;auth=noSasl";
	private static final String IMPALAD_HOST_DELL8 = "jdbc:hive2://" + /*"dell8.cse.nsysu.edu.tw"*/"140.117.170.29" + ':'
			+ IMPALAD_JDBC_PORT + "/;auth=noSasl";
	private static final String JDBC_DRIVER_NAME = "org.apache.hive.jdbc.HiveDriver";

	private WebSocket client;
	private BufferedReader br,readFile;
	private BufferedWriter bw;
	private String query;

	public Impala_Connect(WebSocket client,String query) {
		this.client = client;
		this.query = query;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		Connection conn = null;
		try {
			//get json and check which server would use
			System.out.println(this.query);
			JSONObject json_qerry = new JSONObject(this.query);
			JSONObject json_send = new JSONObject();
			String select_server = (String) (json_qerry.getString("selectServer"));
			
			conn = JDBC_connect(select_server);
			Statement stat = conn.createStatement();
			ResultSet result;
			ResultSetMetaData result_metadata;
			System.out.println("--------Connecting to Impala Server - " + select_server + "--------");
			if (stat == null) {
				System.out.println("--------[Error]:Connect faild-------");
			} else {
				// read line from php page and split json



				int actionmode = Integer.parseInt((json_qerry.getString("ActionMode")));
				String sql = (json_qerry.getString("sql"));
				String select_year = (String) (json_qerry.getString("selectYear"));
				String select_database = (String)(json_qerry.getString("selectDatabase"));
				String year = "";
				
				//only using on General Searching
				if(actionmode == 1){
					//year = select_year.substring(select_year.indexOf("_"), select_year.length());
					//if select server set hi_2010 , change to default
					if(select_database.equals("hi_2010")){
						select_database = "default";
					}
					
				}
				
				
				
			
				String execpasswd = (String) (json_qerry.getString("execpasswd"));
			
				//use for case 2,3
				JSONObject jsonCreate;
				IcdDrugMode_Analyze analyze_data;


				switch (actionmode) {
				case 1:// asking for table name&type
					String tablename_split[] = sql.split(",");
					String columnname_get = "";
					for (int i = 0; i < tablename_split.length; i++) {
						if (tablename_split[i].equals("id98") || tablename_split[i].equals("id99")) {
							System.out.println("Starting execute qerry : " + "describe " + select_database + "."
									+ tablename_split[i]);
							result = stat.executeQuery("describe " + select_database + "." + tablename_split[i]);
						} else {
							System.out.println("Starting execute qerry : " + "describe " + select_database + "."
									+ tablename_split[i] + "_" + select_year);
							result = stat.executeQuery("describe " + select_database + "." + tablename_split[i]+ "_" + select_year);
						}
						
						
						// get first column name
						if (result.next()) {
							columnname_get = result.getString("name");
						}
						// get another column name
						while (result.next()) {
							columnname_get += "," + result.getString("name");
						}

						// put column name set into JSON object
						json_send.put(tablename_split[i], columnname_get);
						System.out.println("ending execute qerry : " + "describe " + select_database + "."
								+ tablename_split[i] + year);
					}
					System.out.println("Send to Js Page :" + json_send.toString());
					client.send(json_send.toString() + "\n");
					//bw.write(json_send.toString() + "\n");
					//bw.flush();

					break;
				case 2:				
					jsonCreate = new JSONObject();
					analyze_data = new IcdDrugMode_Analyze();
					// asking for sql result;
					System.out.println("Starting execute qerry : \n" + sql);
					result = stat.executeQuery(sql);
					result_metadata = result.getMetaData();
					
					//get column length
					int column_count = result_metadata.getColumnCount();
					String column_name[] = new String[column_count];
					
					//fill column_name array and record it in IcdDrugMode Class
					for(int i=0;i<column_count;i++){
						column_name[i] = result_metadata.getColumnName(i+1);
						System.out.print(column_name[i]+",");
					}
					
					System.out.println("");
					analyze_data.add_IcdDrug(column_name);
					
					String split_data[] = new String[column_count];
					while (result.next()) {
						for(int i=0;i<column_count;i++){
							split_data[i] = result.getString(i+1);
							//System.out.print(split_data[i]+",");
						}
						//System.out.println("");
						//System.out.println(split_data);
						analyze_data.do_record(split_data);
					}
					jsonCreate = analyze_data.json_Create();
					System.out.println(jsonCreate.toString().length()+" : "+jsonCreate);
					client.send(jsonCreate.toString()+"\n");
					break;
				case 3:
				
					jsonCreate = new JSONObject();
				
					JSONObject temp;
					readFile = new BufferedReader(new FileReader("C:\\Users\\Leo\\Desktop\\SQLWeb\\Record\\AF_DM_Relation\\af_dm_stroke_insulin_oha.csv"));
					analyze_data = new IcdDrugMode_Analyze();
					
					//get column name
					if (readFile.ready()) {
						String split_data2[] = readFile.readLine().split(",");
						analyze_data.add_IcdDrug(split_data2);
					}
					// get another column name
					while (readFile.ready()) {
						String split_data2[] = readFile.readLine().split(",");
						analyze_data.do_record(split_data2);
					}
					
					//analyze_data.show_age();
					jsonCreate = analyze_data.json_Create();
					System.out.println(jsonCreate.toString().length()+" : "+jsonCreate);
					bw.write(jsonCreate.toString()+"\n");
					bw.flush();
					//analyze_data.show_sex();
					break;
				default:
					System.out.println("---------[Error]:Wrong Action Mode Number------");
					break;

				}
				Thread.sleep(100);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			client.send("");
		} finally {
			try {
				System.out.println("--------Disconnect from Impala Server------");
				conn.close();
				client.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	private Connection JDBC_connect(String select_server) {
		Connection conn = null;
		try {
			Class.forName(JDBC_DRIVER_NAME);
			if(select_server.equals("z2202")){
				conn = DriverManager.getConnection(IMPALAD_HOST_Z2202);
			}else{
				conn = DriverManager.getConnection(IMPALAD_HOST_DELL8);
			}
			return conn;
		} catch (Exception ex) {
			// ex.printStackTrace();
			System.out.println(ex);
		}
		return null;
	}

}
