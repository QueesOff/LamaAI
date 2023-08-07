import { Box, Container } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';


interface MessageData {
  message: string;
  direction: 'incoming' | 'outgoing';
  sentTime: string;
  sender: string;
  position: 0 | 1 | 2 | 3 | 'single' | 'first' | 'normal' | 'last';
}

const Chat = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData();
  }, []);

 

  const fetchData = async () => {
    const initialMessage = 'Приветствую, есть вопросы?';
    const initialChatMessage: MessageData = {
      message: initialMessage,
      direction: 'incoming',
      sentTime: 'just now',
      sender: 'ChatGPT',
      position: 'single',
    };

    setMessages([initialChatMessage]);
  };

  const handleSend = async (message: string) => {
    // Update chat with the user message
    const newMessage: MessageData = {
      message,
      direction: 'outgoing',
      sentTime: 'just now',
      sender: 'user',
      position: 'last',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  
    // Make API call
    setIsTyping(true);
    const response = await makeAPICall(message);
  
    // Update chat with the response message
    const responseMessage: MessageData = {
      message: response,
      direction: 'incoming',
      sentTime: 'just now',
      sender: 'ChatGPT',
      position: 'last',
    };
    setMessages((prevMessages) => [...prevMessages, responseMessage]);
  
    setIsTyping(false); // Hide typing indicator
  };
  
  async function makeAPICall(question: string): Promise<string> {
    const response = await axios.post(`http://35.192.15.184/answer-question?question=${ question }`);
    return response.data.answer;
  }
  
  

  return (
    <Container h={"100vh"}>
      <Box justifyContent="center" height="100%" pt={'15px'}>
        <ChatContainer
        style={{backgroundColor: 'transparent'}}
        >
          <MessageList
            scrollBehavior="smooth"
            style={{backgroundColor: 'transparent', maxHeight:'73vh'}}
            typingIndicator={isTyping ? <TypingIndicator content="LamaAI is typing" 
            style={{backgroundColor: 'transparent'}}
            /> : null}
          >
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
        </ChatContainer>
        <Box position={'fixed'} bottom={'0px'} bgColor={'opacity'} p={'5px'} pb={'15px'} w={'95%'} maxWidth={500}>
          <MessageInput attachButton={false} placeholder={t('gpt.mp')} onSend={handleSend} 
              style={{backgroundColor: 'transparent'}}
                  />
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;