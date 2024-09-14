import React from 'react'
import { Button, Card, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import theme from '../../theme/theme'
import { useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'

interface HomeProps {
    file: File | null,
    setFile: (file: File) => void
}

function Home({ file, setFile }: HomeProps) {
    const [fileName, setFileName] = React.useState('ファイルを選択')
    const currentTheme = useTheme()
    const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'))
    const router = useNavigate()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            toast.error('ファイルが選択されていません。');
        }
        setFileName(event.target.files![0].name)
        setFile(event.target.files![0])
    }

    const handleFileUpload = async () => {
        if (!file) {
            toast.error('ファイルが選択されていません。');
            return;
        }
        router('/chat')
    }

    return (
        <div style={{ backgroundColor: theme.palette.background.default }}>
            {/* title */}
            <Typography
                variant={isMobile ? 'h3' : 'h1'}
                style={{ color: theme.palette.text.primary }}
                sx={{ margin: isMobile ? '0.5rem' : '1rem' }}>Chat Reader</Typography >
            <Typography
                variant={isMobile ? 'h6' : 'h5'}
                style={{ color: theme.palette.text.primary }}>あの時の楽しい会話をもう一度</Typography>

            {/* description */}
            <Card sx={{ margin: isMobile ? '0.5rem' : '1rem', padding: isMobile ? '0.5rem' : '1rem' }}>
                <Typography variant='body1'
                    style={{ color: theme.palette.text.secondary }}>このアプリは、チャットのログを読み返すためのアプリです。</Typography>
                <Typography variant='body1'
                    style={{ color: theme.palette.text.secondary }}>チャットのログを読み返すことで、楽しかった会話をもう一度楽しむことができます。</Typography>
            </Card>

            {/* file input */}
            <input
                type="file"
                accept='.txt'
                id='file-input'
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <label htmlFor='file-input'>
                <Button
                    variant='contained'
                    component='span'
                    style={{
                        margin: isMobile ? '0.5rem' : '1rem',
                        background: theme.palette.secondary.main,
                        color: theme.palette.text.primary,
                    }}>{fileName}</Button>
            </label>

            {/* button */}
            <Button
                variant='contained'
                onClick={() => handleFileUpload()}
                style={{
                    margin: isMobile ? '0.5rem' : '1rem',
                    background: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                }}>チャットを読む</Button>

            {/* Toaster */}
            <Toaster />
        </div>
    )
}

export default Home