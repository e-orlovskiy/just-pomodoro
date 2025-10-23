import { ModalProvider } from '@/app/contexts/ModalContext'
import type { Metadata } from 'next'
import { Kode_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const KodeMono = Kode_Mono({
	variable: '--font-kode-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	metadataBase: new URL('https://just-pomodoro-sandy.vercel.app/'),
	title: {
		default: 'Just Pomodoro - productivity timer',
		template: '%s | Just Pomodoro'
	},
	description:
		'Boost your productivity with Just Pomodoro. A Pomodoro timer, problem solver, and statistics all in one app.',
	keywords:
		'pomodoro timer, timer, productivity, focus, time management, pomodoro technique, pomodoro',
	openGraph: {
		title: 'Just Pomodoro - Productivity Timer',
		description: 'Focus. Work. Repeat.',
		type: 'website',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Just Pomodoro - Focus. Work. Repeat.'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Just Pomodoro - Productivity Timer',
		description: 'Focus. Work. Repeat.',
		images: ['/og-image.png']
	}
}

export default function RootLayout({
	children,
	modal //@modal
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${KodeMono.variable} antialiased flex items-center justify-center`}
			>
				<ModalProvider>
					{children}
					{modal} {/* @modal (settings) content*/}
				</ModalProvider>
				<Analytics />
			</body>
		</html>
	)
}
