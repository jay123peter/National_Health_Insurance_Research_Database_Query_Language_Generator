package impalaServer;

import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class ImpalaServer_Main extends WebSocketServer{
	
	public static final int LISTEN_PORT = 52001;
	public Executor executor = Executors.newFixedThreadPool(10);
	public Impala_Connect impala_connecting = null;
	
    public ImpalaServer_Main(int port) throws UnknownHostException {
    	super(new InetSocketAddress( port ) );
		// TODO Auto-generated constructor stub
	}
    @Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		// TODO Auto-generated method stub
    	System.out.println( conn.getRemoteSocketAddress().getAddress().getHostAddress() + " Connecting to impala Server!" );
	}
	@Override
	public void onClose(WebSocket conn, int arg1, String reason, boolean remote) {
		// TODO Auto-generated method stub
		System.out.println( conn + "[CLOSE]: " + reason );
	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		// TODO Auto-generated method stub
		ex.printStackTrace();
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		// TODO Auto-generated method stub
		System.out.println( conn + ": " + message );
    	impala_connecting = new Impala_Connect(conn,message);
		executor.execute(impala_connecting);
	}
	
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		
		try{
			ImpalaServer_Main websocketserver = new ImpalaServer_Main(LISTEN_PORT);
			System.out.println("Socket bind : Port-> "+LISTEN_PORT);
			websocketserver.start();
			while(true){
				Thread.sleep(5000);
				/*client = serversocket.accept();
				System.out.println("client connecting");
				impala_connecting = new Impala_Connect(client);
				executor.execute(impala_connecting);*/
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			System.out.println("Program end !");
		}
	}



}
