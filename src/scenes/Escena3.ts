import Phaser from 'phaser'
import { getPhrase } from '~/services/translations'

export default class Escena3 extends Phaser.Scene
{
    constructor() {
      super('creditos');
    }
    
    preload () { 

        this.load.image('fondo', 'assets/images/Pantallas_Assets/Opciones/Fondo Azul.png');  
        this.load.image('bee', 'assets/images/Pantallas_Assets/Opciones/Abejita.png');
        this.load.image('nombres', 'assets/images/Pantallas_Assets/Opciones/nombres.png');
        this.load.image('back', 'assets/images/Pantallas_Assets/Opciones/VOLVER.png');
    }
    
    create() {
    
        this.add.image(800, 450, 'fondo'); 
    
        this.add.image(800, 500, 'nombres'); 
    
       const { width, height } = this.scale

       this.add.text(width * 0.5, height * 0.1, getPhrase('CRÉDITOS'), {
           fontFamily: 'Pixel',
           fontSize: '52px',
           color: '#FFFB00'
       })
       .setOrigin(0.5)
       
        var volver = this.add.image(800, 800, 'back')
        volver.setInteractive()
        volver.on('pointerdown', () => this.scene.start('inicio') );
    }
    }