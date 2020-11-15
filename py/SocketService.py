from threading import Thread
from websocket import WebSocket
import time

import websocket


# def getAuthKey():
#     with open('/etc/nginx/.htpasswd','r') as f:
#         return f.read()
authenticationKey = f"Authorization: Basic YWRtaW46MTIzYWRtaW4x"
    
    

class SocketService:
    ws: WebSocket = None
    def __init__(self):
        websocket.enableTrace(True)
        # Generate authentication header
        ws = websocket.WebSocketApp("wss://bebee.teocns.com/socket.io/?EIO=3&transport=websocket",
            header=[authenticationKey],
            on_message = self.on_message,
            on_error = self.on_error,
            on_close = self.on_close)
        ws.on_open = self.on_open
        ws.run_forever()

    def on_message(ws, message):
        print(message)

    def on_error(ws, error):
        print (error)

    def on_close(ws):
        print ("### closed ###")

    def on_open(ws):
        print('Connected')


if __name__ == "__main__":
    SocketService()