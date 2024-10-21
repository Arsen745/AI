import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const Home = () => {
  const apiKey = 'AIzaSyDoIIz_ZZNXqNsqVAsQ9na0sdOCGQI0m-U';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Для управления состоянием загрузки
  const messagesEndRef = useRef(null);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleClick = () => {
    if (userInput.trim()) {
      setMessages([...messages, { type: 'user', text: userInput }]);
      setUserInput('');
      setIsLoading(true); // Включаем анимацию ожидания

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: userInput }
              ]
            }
          ]
        }),
      })
        .then(response => response.json())
        .then(data => {
          const aiMessage = data.candidates[0].content.parts[0].text;

          const splitMessages = aiMessage.split(/(?<=[.!?])\s+/);
          
          setMessages(prevMessages => [
            ...prevMessages, 
            ...splitMessages.map(text => ({ type: 'ai', text }))
          ]);
          setIsLoading(false); // Отключаем анимацию ожидания после получения ответа
        })
        .catch(error => {
          console.error('Ошибка:', error);
          setIsLoading(false); // Отключаем анимацию ожидания в случае ошибки
        });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
        {messages.map((message, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '10px'
          }}>
            <div style={{
              maxWidth: '80%',
              padding: '10px',
              backgroundColor: message.type === 'user' ? '#cfe2ff' : '#d1e7dd',
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
              <p style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: '500',
                color: '#333'
              }}>{message.text}</p>
            </div>
          </div>
        ))}
        {/* Анимация ожидания Skeleton */}
        {isLoading && (
          <Box sx={{ width: '80%', marginBottom: '10px' }}>
            <Skeleton height={50} animation="wave" />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        backgroundColor: '#007bff',
        padding: '15px 20px',
        borderRadius: '0 0 10px 10px',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <textarea
            value={userInput}
            onChange={handleChange}
            placeholder='Напишите сообщение...'
            style={{
              flex: 1,
              height: '50px',
              borderRadius: '10px',
              padding: '10px',
              border: '2px solid #007bff',
              resize: 'none',
              fontSize: '16px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'border-color 0.3s', // Плавный переход
              outline: 'none', // Убираем обводку
              '&:focus': {
                borderColor: '#0056b3', // Цвет границы при фокусе
              },
            }}
          />
          <p style={{ margin: 0, color: '#333', fontWeight: 'bold' }}>Kerezbekov Arsen</p> {/* Имя создателя */}
          <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick} style={{ backgroundColor: '#28a745', color: '#fff' }}>
            Отправить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
