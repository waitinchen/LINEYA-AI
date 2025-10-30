// linkya-frontend/hooks/useChatkit.ts

import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatRoom, Persona } from '../lib/chatkit/chatkit-types';
import { ChatkitClient } from '../lib/chatkit/chatkit-client';
import { userManager } from '../lib/auth/user-manager';

interface UseChatkitResult {
  rooms: ChatRoom[];
  currentRoom: ChatRoom | null;
  messages: ChatMessage[];
  personas: Persona[];
  activePersona: Persona | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  selectRoom: (roomId: string) => void;
  selectPersona: (personaId: string) => void;
  refreshData: () => Promise<void>;
}

export const useChatkit = (): UseChatkitResult => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [activePersona, setActivePersona] = useState<Persona | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = userManager.getCurrentUser();
  const currentUserId = currentUser?.id;

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!currentUserId) {
        throw new Error("User not logged in.");
      }

      const fetchedRooms = await ChatkitClient.getRooms();
      setRooms(fetchedRooms);

      const fetchedPersonas = await ChatkitClient.getPersonas();
      setPersonas(fetchedPersonas);

      // ?身?豢? CoreLink-Framework 撠店摰文?鈭箸
      const coreLinkRoom = fetchedRooms.find(r => r.id === 'corelink-persona-room');
      if (coreLinkRoom) {
        setCurrentRoom(coreLinkRoom);
        const roomMessages = await ChatkitClient.getRoomMessages(coreLinkRoom.id);
        setMessages(roomMessages);
      }

      const coreLinkPersona = fetchedPersonas.find(p => p.id === 'corelink-framework-001');
      if (coreLinkPersona) {
        setActivePersona(coreLinkPersona);
        userManager.setActivePersona(coreLinkPersona.id);
      }

    } catch (err: any) {
      console.error("Failed to fetch initial Chatkit data:", err);
      setError(err.message || "Failed to load chat data.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId) {
      fetchInitialData();
    } else {
      setRooms([]);
      setCurrentRoom(null);
      setMessages([]);
      setPersonas([]);
      setActivePersona(null);
      setIsLoading(false);
    }
  }, [currentUserId, fetchInitialData]);

  const sendMessage = useCallback(async (text: string) => {
    if (!currentRoom || !currentUserId) {
      setError("?⊥??潮??荔??芷??憭拙恕??嗆?餃??);
      return;
    }
    try {
      const sentMessage = await ChatkitClient.sendMessage(currentRoom.id, currentUserId, text);
      if (sentMessage) {
        setMessages((prev) => [...prev, sentMessage]);
        if (currentRoom.id === 'corelink-persona-room' && sentMessage.userId !== activePersona?.id) {
          const updatedMessages = await ChatkitClient.getRoomMessages(currentRoom.id);
          setMessages(updatedMessages);
        }
      }
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setError(err.message || "閮?潮仃??);
    }
  }, [currentRoom, currentUserId, activePersona]);

  const selectRoom = useCallback(async (roomId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        setCurrentRoom(room);
        const roomMessages = await ChatkitClient.getRoomMessages(room.id);
        setMessages(roomMessages);
      } else {
        throw new Error(`Room ${roomId} not found.`);
      }
    } catch (err: any) {
      console.error("Failed to select room:", err);
      setError(err.message || "?豢??予摰文仃??);
    } finally {
      setIsLoading(false);
    }
  }, [rooms]);

  const selectPersona = useCallback((personaId: string) => {
    const persona = personas.find(p => p.id === personaId);
    if (persona) {
      setActivePersona(persona);
        userManager.setActivePersona(persona.id);
    } else {
      setError(`Persona ${personaId} not found.`);
    }
  }, [personas]);

  const refreshData = useCallback(async () => {
    await fetchInitialData();
  }, [fetchInitialData]);

  return {
    rooms,
    currentRoom,
    messages,
    personas,
    activePersona,
    isLoading,
    error,
    sendMessage,
    selectRoom,
    selectPersona,
    refreshData,
  };
};
