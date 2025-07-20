/* eslint-disable react-hooks/exhaustive-deps */
"use client"; // <-- INI SANGAT PENTING untuk komponen interaktif di App Router

import { useState, useEffect, useRef } from 'react';
import type { FC, ReactNode, FormEvent } from 'react';

// Mendefinisikan tipe untuk data dan state
type Sender = 'user' | 'bot';

interface Message {
  id: number;
  text: ReactNode;
  sender: Sender;
}

interface FormData {
  name: string;
  phone: string;
  type: string;
  details: string;
}

const CHAT_STAGES = {
  START: 'START',
  ASKING_NAME: 'ASKING_NAME',
  ASKING_PHONE: 'ASKING_PHONE',
  ASKING_TYPE: 'ASKING_TYPE',
  ASKING_DETAILS: 'ASKING_DETAILS',
  CONFIRMATION: 'CONFIRMATION',
  COMPLETED: 'COMPLETED',
} as const;

type ChatStage = typeof CHAT_STAGES[keyof typeof CHAT_STAGES];

const Chatbot: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [stage, setStage] = useState<ChatStage>(CHAT_STAGES.START);
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', type: '', details: '' });
  const [isBotTyping, setIsBotTyping] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const addMessage = (text: ReactNode, sender: Sender) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), text, sender }]);
  };
  
  const botReply = (text: ReactNode, delay: number = 1000) => {
      setIsBotTyping(true);
      setTimeout(() => {
          addMessage(text, 'bot');
          setIsBotTyping(false);
      }, delay);
  };

  // Function to save pengaduan to database
  const savePengaduanToDatabase = async (ticketNumber: string) => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/pengaduan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ticketNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save pengaduan');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error saving pengaduan:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

// Saat chatbot pertama kali dimulai
useEffect(() => {
  if (stage === CHAT_STAGES.START && messages.length === 0) {
    botReply('Halo! Saya adalah bot layanan pengaduan. Saya akan membantu Anda membuat laporan. Siapakah nama Anda?');
    setStage(CHAT_STAGES.ASKING_NAME);
  }
}, [stage]);

// Saat user membalas
useEffect(() => {
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.sender !== 'user') return;

  const userResponse = lastMessage.text as string;

  switch (stage) {
    case CHAT_STAGES.ASKING_NAME:
      setFormData(prev => ({ ...prev, name: userResponse }));
      botReply(`Baik, ${userResponse}. Selanjutnya, berapa nomor HP Anda yang bisa dihubungi?`);
      setStage(CHAT_STAGES.ASKING_PHONE);
      break;

    case CHAT_STAGES.ASKING_PHONE:
      if (!/^\d{10,13}$/.test(userResponse.replace(/\s/g, ''))) {
        botReply("Nomor HP sepertinya tidak valid. Mohon masukkan 10-13 digit angka.");
      } else {
        setFormData(prev => ({ ...prev, phone: userResponse }));
        botReply('Terima kasih. Apa jenis pengaduan Anda? (Contoh: Pelayanan Publik, Infrastruktur, Kebersihan)');
        setStage(CHAT_STAGES.ASKING_TYPE);
      }
      break;

    case CHAT_STAGES.ASKING_TYPE:
      setFormData(prev => ({ ...prev, type: userResponse }));
      botReply('Oke. Sekarang, mohon jelaskan isi pengaduan Anda secara rinci.');
      setStage(CHAT_STAGES.ASKING_DETAILS);
      break;

    case CHAT_STAGES.ASKING_DETAILS:
      setFormData(prev => ({ ...prev, details: userResponse }));
      setStage(CHAT_STAGES.CONFIRMATION);
      break;

    case CHAT_STAGES.CONFIRMATION:
      if (userResponse.toLowerCase().includes('ya')) {
        const ticketNumber = `PGDN-${Date.now()}`;
        
        // Save to database
        savePengaduanToDatabase(ticketNumber)
          .then(() => {
            botReply(`Terima kasih! Pengaduan Anda telah berhasil dikirim dan disimpan. Nomor tiket Anda adalah: ${ticketNumber}. Tim kami akan segera menindaklanjuti.`);
          })
          .catch(() => {
            botReply(`Maaf, terjadi kesalahan saat menyimpan pengaduan. Silakan coba lagi atau hubungi admin. Nomor tiket Anda: ${ticketNumber}`);
          })
          .finally(() => {
            setStage(CHAT_STAGES.COMPLETED);
          });
      } else {
        botReply('Baik, mari kita ulangi dari awal. Siapakah nama Anda?');
        setFormData({ name: '', phone: '', type: '', details: '' });
        setStage(CHAT_STAGES.ASKING_NAME);
      }
      break;
  }
}, [messages]); // cukup tergantung pada perubahan pesan


  useEffect(() => {
      if(stage === CHAT_STAGES.CONFIRMATION && formData.details) {
          const confirmationText = (
              <div>
                  <p>Baik, mohon konfirmasi data pengaduan Anda:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 bg-blue-100 p-3 rounded-md">
                      <li><strong>Nama:</strong> {formData.name}</li>
                      <li><strong>No. HP:</strong> {formData.phone}</li>
                      <li><strong>Jenis:</strong> {formData.type}</li>
                      <li><strong>Detail:</strong> {formData.details}</li>
                  </ul>
                  <p className="mt-2">Apakah semua data di atas sudah benar? (Ketik <strong>Ya</strong> untuk konfirmasi)</p>
                  <p className="mt-2">Atau silahkan hubungi admin jika ada yang perlu diperbaiki. <a href="https://wa.me/1234567890" className="text-blue-500">wa.me/1234567890</a></p>
              </div>
          );
          botReply(confirmationText);
      }
  }, [stage, formData]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && !isBotTyping && stage !== CHAT_STAGES.COMPLETED && !isSaving) {
      addMessage(inputValue, 'user');
      setInputValue('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl flex flex-col h-[70vh]">
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">B</div>}
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl break-words ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {(isBotTyping || isSaving) && (
             <div className="flex items-end gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0">B</div>
                <div className="p-3 rounded-2xl bg-gray-200 rounded-bl-none">
                    <div className="flex items-center gap-1">
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                    {isSaving && <p className="text-xs text-gray-600 mt-1">Menyimpan ke database...</p>}
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 bg-gray-100 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
                isBotTyping || isSaving ? "Bot sedang mengetik..." : 
                stage === CHAT_STAGES.COMPLETED ? "Sesi selesai." : "Ketik jawaban Anda..."
            }
            className="w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={isBotTyping || isSaving || stage === CHAT_STAGES.COMPLETED}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-blue-500 flex-shrink-0"
            disabled={isBotTyping || isSaving || !inputValue.trim() || stage === CHAT_STAGES.COMPLETED}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chatbot;