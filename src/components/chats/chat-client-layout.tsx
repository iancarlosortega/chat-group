'use client';

import { useEffect } from 'react';
import { socket } from '@/api/websockets';
import { useChatStore } from '@/stores';
import { Chat } from '@/interfaces';

interface Props {
	chat: Chat;
	children: React.ReactNode;
}

export const ChatClientLayout = ({ chat, children }: Props) => {
	const setCurrentChat = useChatStore(state => state.setCurrentChat);

	useEffect(() => {
		setCurrentChat(chat);

		socket.on('connect', () => {
			socket.emit('join_room', chat.id);
		});

		socket.on('disconnect', () => {
			socket.emit('leave_room', chat.id);
		});

		return () => {
			socket.off('connect');
			socket.off('disconnect');
		};
	}, [chat, setCurrentChat]);

	return <>{children}</>;
};
