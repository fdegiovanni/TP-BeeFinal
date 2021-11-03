import Phaser from 'phaser'

export default class GameOver extends Phaser.Scene
{
	constructor()
	{
		super('game-over')
	}

	preload()
	{
		this.load.image('fondoGO',  'assets/images/Menu/gameover1.png')
		this.load.image('play', 'assets/images/Menu/play ico.png')
        this.load.image('reintentar', 'assets/images/Menu/reintentar grande.png')
		this.load.image('casaico', 'assets/images/Menu/casa ico grande.png')
	}
	create()
	{
		this.add.image(800, 450, 'fondoGO'); 

		const { width, height } = this.scale

		this.add.text(width * 0.5, height * 0.3, 'Game Over', {
			fontSize: '52px',
			color: '#ff0000'
		})
		.setOrigin(0.5)

		var help = this.add.image(1000, 550, 'play')
        help.setInteractive()
        help.on('pointerdown', () => this.scene.start('game') );

		var help = this.add.image(800, 570, 'reintentar')
        help.setInteractive()
        help.on('pointerdown', () => this.scene.start('gamelv3') );

		var help = this.add.image(600, 550, 'casaico')
        help.setInteractive()
        help.on('pointerdown', () => this.scene.start('inicio') );
		
	}
}
