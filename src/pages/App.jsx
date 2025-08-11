import React, { useState, useEffect } from "react";
import axios from "axios";
import echo from "../utils/echo";
import { apiUrl } from "../config/url";

function App() {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [token,] = useState(localStorage.getItem("token") || "");


    // Fetch message history
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${apiUrl}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Fetch messages failed:", error);
        }
    };

    // Send a message
    const sendMessage = async () => {
        try {
            await axios.post(
                `${apiUrl}/messages`,
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setContent("");
        } catch (error) {
            console.error("Send message failed:", error);
        }
    };

    // Listen for new messages via WebSocket
    useEffect(() => {
        if (token) {
            fetchMessages();
            // Listen to a channel
            const channel = echo.channel("chat");

            channel.listen("MessageSent", (event) => {
                console.log("New message:", event);
                setMessages((prev) => [...prev, event.message]);
            });

            // Connection status
            echo.connector.pusher.connection.bind("connected", () => {
                console.log("WebSocket connected!");
            });

            echo.connector.pusher.connection.bind("disconnected", () => {
                console.log("WebSocket disconnected!");
            });

            echo.connector.pusher.connection.bind("error", (error) => {
                console.error("WebSocket error:", error);
            });

            // Cleanup on unmount
            return () => {
                echo.leaveChannel("chat");
            };
        }
        return () => echo.leave("chat");
    }, [token]);
    return (
        <div>
            <h1>Chat App</h1>
            {!token && <button onClick={login}>Login</button>}
            {token && (
                <>
                    <div>
                        {messages.map((msg, index) => (
                            <p key={index}>
                                User {msg?.user_id}: {msg?.content} (
                                {msg?.created_at})
                            </p>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button onClick={sendMessage}>Send</button>
                </>
            )}
        </div>
    );
}

export default App;
