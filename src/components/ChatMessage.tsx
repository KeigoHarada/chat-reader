import { Box, Paper, styled, Typography } from "@mui/material";
import { ChatData } from "./types"
import { useEffect } from "react";

interface ChatMessageProps {
    chat: ChatData,
    date: string | null,
    isCurrentUser: boolean
}

const ChatMessage = ({ chat, date, isCurrentUser }: ChatMessageProps) => {

    const ChatBubble = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1, 2),
        marginBottom: theme.spacing(1),
        maxWidth: '70%',
        borderRadius: 20,
        backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.background.paper,
        color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.primary.contrastText,
    }));
    useEffect(() => {
        console.log(chat)
    }
    )

    return (
        <>
            {date !== null ?
                // chat date
                <Typography variant='h6' className='chat-date'>{date}</Typography> :

                // chat message
                <Box display="flex" flexDirection="column" alignItems={isCurrentUser ? 'flex-end' : 'flex-start'}
                    sx={{ paddingBottom: "0.5rem" }}>
                    {!isCurrentUser && (
                        <Typography variant="caption" color="textSecondary">
                            {chat.sender}
                        </Typography>
                    )}
                    <ChatBubble  >
                        <Typography variant="body2" color={isCurrentUser ? "white" : "black"}>{chat.message}</Typography>
                    </ChatBubble>
                    <Typography variant="caption" color={isCurrentUser ? "inherit" : "textSecondary"}>
                        {chat.time}
                    </Typography>
                </Box>

            }
        </>

    )
}
export default ChatMessage
