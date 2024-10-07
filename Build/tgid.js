import React, { useEffect } from 'react';

const UnitySender = ({ userId }) => {
    useEffect(() => {
        console.log('Unity instance:', window.unityInstance);
        console.log("UserId: ", userId)
        // Функция для отправки userId в Unity
        const sendUserIdToUnity = (userId) => {
            const unityInstance = window.unityInstance; // Получите ссылку на ваш экземпляр Unity
            
            if (unityInstance && unityInstance.SendMessage) {
                unityInstance.SendMessage('TextChanger', 'ChangeText', userId);
            } else {
                console.error('Unity instance not found or method not available.');
            }
        };
        
        const user = TelegramWebApp.initDataUnsafe.user;
        
        if (user) {
            const userId = user.id; // Получаем userId
            console.log('User ID:', userId);
            // Здесь вы можете использовать userId по своему усмотрению
          } else {
            console.error('User data not available');}


        // Отправляем userId в Unity при изменении
        if (userId) {
            sendUserIdToUnity(userId);
        }
    }, [userId]); // Зависимость от userId

    return (
        <div>
            <h1>Отправка User ID в Unity</h1>
            <button onClick={() => sendUserIdToUnity(userId)}>
                Отправить User ID
            </button>
        </div>
    );
};

export default {
    init: function() {
      return {
        sendUserIdToUnity: function(userId) {
          window.unityInstance.SendMessage('TextChanger', 'ChangeText', userId);
        },
        getUserId: function() {
          return TelegramWebApp.initDataUnsafe.user.id;
        }
      };
    }
  };
