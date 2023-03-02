package impalaServer;


import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.*;

public class WebSocketConnection extends WebSocketServer{
	Executor executor = Executors.newFixedThreadPool(10);
	Impala_Connect impala_connecting = null;

	public WebSocketConnection(int port) throws UnknownHostException {
		super(new InetSocketAddress( port ) );
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void onOpen(WebSocket conn, ClientHandshake arg1) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void onClose(WebSocket conn, int arg1, String reason, boolean remote) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onError(WebSocket conn, Exception arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		// TODO Auto-generated method stub
		
	}


	

	


}
