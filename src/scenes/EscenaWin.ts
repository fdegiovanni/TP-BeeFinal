import Phaser from 'phaser'
import { getPhrase } from '~/services/translations'

export default class EscenaWin extends Phaser.Scene
{

    sound: any;

    constructor() {
      super('winscene');
    }
    
    preload () { 

        this.load.image('FondoWin', 'assets/images/Menu/win1.png');  
        this.load.image('casaico', 'assets/images/Menu/casa ico grande.png')
        this.load.image('creds',  'assets/images/Menu/creds.png')
        this.load.image('bee hexagonal', 'assets/images/Pantallas_Assets/Etapa Superada/bee hexagonal.png')

        this.load.image('Cuadro',  'assets/images/Pantallas_Assets/Etapa Superada/Rectángulo.png')

        this.load.audio('MusicaWin', 'assets/sounds/MUSICA/Musica_Final_Bueno.mp3')

    }

    create () {
        this.sound = this.scene.get("SonidosGeneral");
        this.sound.Sonido('MusicaWin')

        this.add.image(800, 450, 'FondoWin'); 

        this.add.image(800, 350, 'Cuadro') 
        .setScale(1.20)

        this.add.image(550, 320, 'bee hexagonal'); 

        const { width, height } = this.scale

        this.add.text(width * 0.5, height * 0.1, getPhrase('GANASTE'), {
			fontFamily: 'font1',
			fontSize: '52px',
			color: '#FFFB00'
		})
		.setOrigin(0.5)
        //DAtos
        this.add.text(width * 0.53, height * 0.30, getPhrase('Gracias a tu ayuda tendremos un ecosistema más sano y junto a ellas, a las abejas.'), {
            wordWrap: { width: 400 },
			fontFamily: 'font1',
			fontSize: '45px',
			color: '#FFFB00'
		})
		.setOrigin(0.3)


        	//PARA ESCENA WIN INTERACTIVOS
		var help = this.add.image(600, 650, 'casaico')
        help.setInteractive()
        help.on('pointerdown', () => {this.scene.start('inicio')
        this.sound.SonidoClick() 
		let sound: any = this.scene.get('SonidosGeneral')
		sound.SonidoStop();
		})
		var creds = this.add.image(790, 650, 'creds')
        creds.setInteractive()
        creds.on('pointerdown', () => {this.scene.start('creditos') 
        this.sound.SonidoClick()});
    }



}