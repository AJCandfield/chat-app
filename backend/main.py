import pika
import json
import asyncio

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from custom_logger import get_custom_logger

app =FastAPI()
logger = get_custom_logger()

class WebSocketManager():
    """
    This is a class that stores an array of websocket connections
    and defines functions for adding and removing them from the
    array.
    """
    def __init__(self) -> None:
        self.active_connections = []
        self.rabbitmq_connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
        self.rabbitmq_channel = self.rabbitmq_connection.channel()

    async def connect(self, websocket: WebSocket, user_id: str) -> None:
        logger.debug(f"Connecting user with ID: {user_id}")
        await websocket.accept()
        self.active_connections.append(websocket)
        self.rabbitmq_channel.queue_declare(queue=user_id)
        asyncio.create_task(self.consume_messages(user_id))
        logger.debug(f"Connected user with ID: {user_id}")

    async def disconnect(self, websocket: WebSocket, user_id: str) -> None:
        logger.debug(f"Disconnecting user with ID: {user_id}")
        self.active_connections.remove(websocket)
        logger.debug(f"Disconnected user with ID: {user_id}")

    async def send_message(self, message: str, recipient_id: str) -> None:
        logger.debug(f"Sending message to user with ID: {recipient_id}")
        for connection in self.active_connections:
            await connection.send_text(message)
        self.rabbitmq_channel.basic_publish(exchange="", routing_key=recipient_id, body=message)
        logger.debug(f"Sent message to user with ID: {recipient_id}")

    async def consume_messages(self, user_id: str) -> None:
        def callback(ch, method, properties, body):
            logger.debug(f"Received message from user with ID: {user_id}")
            for connection in self.active_connections:
                if user_id in connection.scope.get("user", {}).get("user_id", ""):
                    connection.send_text(body)

            ch.basic_ack(delivery_tag=method.delivery_tag)

        self.rabbitmq_channel.basic_consume(queue=user_id, on_message_callback=callback)
        self.rabbitmq_channel.start_consuming()

manager = WebSocketManager()

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str) -> None:
    await manager.connect(websocket, user_id)

    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)
            logger.debug(f"Received message from user with ID {user_id}: {data}")
            recipient_id = parsed_data.get("recipient_id")
            message = parsed_data.get("message")
            await manager.send_message(message, recipient_id)
    except WebSocketDisconnect:
        await manager.disconnect(websocket, user_id)

