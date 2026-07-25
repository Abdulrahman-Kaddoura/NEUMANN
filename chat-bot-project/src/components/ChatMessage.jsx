import Robotpfp from '../assets/robot.png';
import Userpfp from '../assets/user.png';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {

  return (
    <div className={sender === "user" ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === "robot" && (
        <img src={Robotpfp} className="chat-message-profile" alt="pfp" />
      )}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === "user" && (
        <img src={Userpfp} className="chat-message-profile" alt="pfp" />
      )}
    </div>
  );
}