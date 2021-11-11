import Phaser from 'phaser'
import sonidogeneral from './MusicManager'
import { getPhrase } from '~/services/translations'

export default class EscenaDYK extends Phaser.Scene{

    sound: any;

    constructor () {
        super('dyk');
    }

    preload ()
    {
        //assets\images\Pantallas_Assets\Etapa Superada
        this.load.image('FondoDYK',  'assets/images/Pantallas_Assets/Opciones/Fondo Azul.png')
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
        this.add.image(800, 820, 'bee hexagonal')
        //Const Text
        const { width, height } = this.scale

        this.add.text(width * 0.5, height * 0.1, getPhrase("dyk"), {
			fontFamily: 'Pixel',
			fontSize: '52px',
			color: '#FFFB00'
		})
		.setOrigin(0.5)
        //DAtos
        this.add.text(width * 0.43, height * 0.42, getPhrase(`dato2`), {
            align: 'center',
            wordWrap: { width: 600 },
			fontFamily: 'Pixel',
			fontSize: '45px',
			color: '#FFFB00'
		})
		.setOrigin(0.3)

        var SIG = this.add.image(1300, 750, 'play')
        SIG.setInteractive()
       
        SIG.on('pointerdown', () => this.scene.start('game') );

    }
    
    
} 