import { ModalProvider } from '@/app/contexts/ModalContext'
import type { Metadata } from 'next'
import { Kode_Mono } from 'next/font/google'
import './globals.css'

const KodeMono = Kode_Mono({
	variable: '--font-kode-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Pomodoro',
	description: 'A simple pomodoro timer app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={`${KodeMono.variable} antialiased flex items-center justify-center`}
			>
				<ModalProvider>{children}</ModalProvider>
			</body>
		</html>
	)
}
