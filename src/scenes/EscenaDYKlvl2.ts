import Phaser from 'phaser'
import sonidogeneral from './MusicManager'
import { getPhrase } from '~/services/translations'

export default class EscenaDYK2 extends Phaser.Scene{

    sound: any;

    constructor () {
        super('dyklv2');
    }

    preload ()
    {
        //assets\images\Pantallas_Assets\Etapa Superada
        this.load.image('FondoDYK',  'assets/images/Pantallas_Assets/Etapa Superada/pantalladyk.png')
        this.load.image('bee hexagonal', 'assets/images/Pantallas_Assets/Etapa Superada/bee hexagonal.png')
        this.load.image('play', 'assets/images/Menu/play ico.png')
        this.load.audio('MusicaDYK', 'assets/sounds/MUSICA/mini-cancion-sabias-que.mp3')
    }

    create ()
    {
        this.scene.launch('ui')
        this.sound = this.scene.get("SonidosGeneral");
        this.sound.Sonido('MusicaDYK')

        this.add.image(800, 450, 'FondoDYK');
        this.add.image(550, 450, 'bee hexagonal')
        //Const Text
        const { width, height } = this.scale

        this.add.text(width * 0.5, height * 0.3, getPhrase('dyk'), {
			fontFamily: 'font1',
			fontSize: '52px',
			color: '#FFFB00'
		})
		.setOrigin(0.5)
        //DAtos
        this.add.text(width * 0.53, height * 0.45, getPhrase('dato1'), {
            wordWrap: { width: 400 },
			fontFamily: 'font1',
			fontSize: '45px',
			color: '#FFFB00'
		})
		.setOrigin(0.3)

        var SIG = this.add.image(1300, 750, 'play')
        SIG.setInteractive()
       
        SIG.on('pointerdown', () => this.scene.start('gamelv2') );

    }
    
    
} 