import React, { useState } from "react";
import axios from "axios";
import AnimatedCursor from 'react-animated-cursor';
import { GoArrowUpRight } from "react-icons/go";
import { FaUserGraduate } from "react-icons/fa";
import './index.css';
import "../public/bgs.mp4";
import { TbMarquee } from "react-icons/tb";

const App = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default behavior like form submission
            handleSend(); // Call the send function
        }
    };
    const handleSend = async () => {
        if (!userInput.trim()) return;

        const userMessage = { sender: "user", text: userInput };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://localhost:5000/chat", {
                prompt: userInput,
            });
            const botMessage = { sender: "bot", text: response.data.response };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }

        setUserInput("");
    };

    return (
        
        

        <div className="chat-container">
          
          <nav className="navbar">
            <h1 className="log">అ</h1>
            <h1 className="heading">అడుగు.<span className="span">ai</span></h1>
            <div className="logoDiv">
            <FaUserGraduate className="ice" />
              <p className="name">Sai Charan</p>
              
            </div>
          
          </nav>
          
            
            {messages.length!==0?(<div className="chat-box">
                {messages.map((message, index) => (
                    <div className={message.sender === "user"?"you":"bot"} ma  key={index}>
                        <strong className="reply">{message.sender === "user" ? "You"  : "అడుగు.ai"} :</strong> {message.text}
                    </div>
                ))}
            </div>):<div className="aniDiv"><img src="../public/ani.gif" className="ani" /></div>}

            <div className="inputDiv">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="input"
                />
                <button onClick={handleSend} className="btn">
                <GoArrowUpRight className="arr" />
                </button>
            </div>
            <footer className="footer">
              <marquee><p className="copy">Copyright © 2025 అడుగు.ai All rights reserved.</p></marquee>
            </footer>
        </div>
    );
};

export default App;
