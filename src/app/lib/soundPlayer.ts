class SoundPlayer {
	private audio: HTMLAudioElement | null = null

	play(soundName: string, volume: number = 1) {
		if (typeof window === 'undefined') return

		if (this.audio) {
			this.audio.pause()
			this.audio.currentTime = 0
		}

		try {
			this.audio = new Audio(`/sounds/${soundName}.mp3`)
			this.audio.volume = Math.max(0, Math.min(1, volume))
			this.audio.play().catch(error => {
				console.warn('Audio playback failed:', error)
			})
		} catch (error) {
			console.warn('Audio creation failed:', error)
		}
	}

	stop() {
		if (this.audio) {
			this.audio.pause()
			this.audio.currentTime = 0
		}
	}
}

export const soundPlayer = new SoundPlayer()
