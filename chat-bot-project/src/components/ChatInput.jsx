import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages([...newChatMessages,
    {
      message: "loading",
      sender: 'robot',
      id: crypto.randomUUID()
    }
    ]);
    setInputText('');

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    setIsLoading(false);
  }

  function checkKey(event) {
    event.key === "Enter" ? sendMessage() : event.key === "Escape" ? setInputText('') : null;
  }

  return (
    <div className="input-container">
      <input
        placeholder="Send a message"
        size='30'
        onChange={saveInputText}
        value={inputText}
        onKeyDown={checkKey}
        className="input-field"
      />
      <button onClick={sendMessage} className='send-button'>Send</button>
    </div>
  );
}