import json
import asgiref
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumert(AsyncWebsocketConsumer):
    def connect(self):
        self.accept()


    def disconnect(self, code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({'message': message}))
