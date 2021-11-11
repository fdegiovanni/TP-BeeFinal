import Phaser from 'phaser'
import sonidogeneral from './MusicManager'
import { getPhrase } from '~/services/translations'

export default class GameOver extends Phaser.Scene
{
	sound: any;

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
		this.sound = this.scene.get("SonidosGeneral");
    	this.sound.Sonido('MusicaLose')

		this.add.image(800, 450, 'fondoGO'); 

		const { width, height } = this.scale

		this.add.text(width * 0.5, height * 0.3, getPhrase`gover`, {
			fontFamily: 'Pixel',
			fontSize: '52px',
			color: '#FFFB00'
		})
		.setOrigin(0.5)

		let ui:any = this.scene.get("ui");


		var help = this.add.image(1000, 550, 'play')
        help.setInteractive()
        help.on('pointerdown', () => this.scene.start('game') );

		var help = this.add.image(800, 570, 'reintentar')
        help.setInteractive()
        help.on('pointerdown', () => this.scene.start(ui.Escena) );

		var help = this.add.image(600, 550, 'casaico')
        help.setInteractive()
        help.on('pointerdown', () => {this.scene.start('inicio') 
		let sound: any = this.scene.get('SonidosGeneral')
		sound.SonidoStop();
		})
		

	
		
	}

}
