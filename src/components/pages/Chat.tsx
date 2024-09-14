import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import ChatMessage from '../ChatMessage';
import { Box, MenuItem, Paper, Select, Typography } from '@mui/material';
import { ChatData } from '../types';
import theme from '../../theme/theme';

interface ChatProps {
    file: File | null,
}


function Chat({ file }: ChatProps) {
    const [chats, setChats] = React.useState<string[]>([])
    const [users, setUsers] = React.useState<string[]>([])
    const [currentUser, setCurrentUser] = React.useState<string>('')
    useEffect(() => {
        const reader = new FileReader()
        if (file) {
            reader.readAsText(file)
            reader.onload = () => {
                const text = reader.result!.toString().split('\n')
                setChats(text)
                setUsers(serchUser(text))
                setCurrentUser(serchUser(text)[0])
            }
        }
    }, [file]);

    function serchUser(chats: string[]) {
        const userSet = new Set<string>()
        chats.forEach((chat) => {
            if (!isDateFormatted(chat)) {
                const user = parsechat(chat).sender
                if (user) {
                    userSet.add(user)
                }
            }
        })
        return Array.from(userSet)
    }

    function isDateFormatted(date: string) {
        const dateRegex = /^(\d{4}\.\d{2}\.\d{2}).*$/;
        return dateRegex.test(date)
    }

    function parsechat(chat: string): ChatData {
        const timeMatch = chat.match(/^(\d{2}:\d{2})\s(.+)$/);
        if (!timeMatch) {
            return { sender: '', message: chat, time: '' };
        }

        const [, time, rest] = timeMatch;

        // 残りの部分から名前とコンテンツを分離
        // 最後のスペースを見つけて、それを境界として使用
        const lastSpaceIndex = rest.lastIndexOf(' ');
        if (lastSpaceIndex === -1) {
            return { sender: '', message: chat, time: '' };
        }

        const name = rest.substring(0, lastSpaceIndex).trim();
        const content = rest.substring(lastSpaceIndex + 1).trim();

        return {
            sender: name,
            message: content,
            time: time
        }
    }

    return (
        <Box sx={{ maxWidth: '100%', margin: 'auto', bgcolor: 'background.default', height: '100%' }}>
            <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                {/* header */}
                <Box sx={{
                    p: 2,
                    bgcolor: theme.palette.background.default,
                    color: 'primary.contrastText',
                    display: 'flex', justifyContent: 'center'
                }}>
                    <Typography variant="h6" >LINEチャット</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Select
                        value={currentUser}
                        onChange={(e) => setCurrentUser(e.target.value)}
                        size="small"

                        sx={{ color: 'Black', minWidth: 120, bgcolor: 'primary.light' }}
                    >
                        {users.map(user => (
                            <MenuItem sx={{ color: 'black' }} key={user} value={user}>{user}</MenuItem>
                        ))}
                    </Select>
                    <Link to='/'>
                        <button>戻る</button>
                    </Link>
                </Box>

                {/* chat */}
                <Box sx={{ p: 2, bgcolor: 'lightGray', color: 'primary.contrastText', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                        {chats.map((message, index) => (
                            isDateFormatted(message) ?
                                <ChatMessage
                                    key={index}
                                    chat={{ sender: '', message: '', time: '' }}
                                    date={message}
                                    isCurrentUser={false}
                                />
                                :
                                <ChatMessage
                                    key={index}
                                    chat={parsechat(message)}
                                    date={null}
                                    isCurrentUser={parsechat(message).sender === currentUser}
                                />
                        ))}
                    </Box>
                </Box>
            </Paper >
        </Box >
    )
}

export default Chat