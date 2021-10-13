import Phaser from 'phaser'

export default class Escena4 extends Phaser.Scene
{
    constructor() {
      super('creditos');
    }
    
    preload () { 

        this.load.image('fondo', 'assets/images/Pantallas_Assets/Opciones/Fondo Azul.png');  
        this.load.image('credits', 'assets/images/Pantallas_Assets/Opciones/Creditos.png'); 
        this.load.image('bee', 'assets/images/Pantallas_Assets/Opciones/Abejita.png');
        this.load.image('nombres', 'assets/images/Pantallas_Assets/Opciones/nombres.png');
        this.load.image('back', 'assets/images/Pantallas_Assets/Opciones/VOLVER.png');
    }
    
    create() {
    
        this.add.image(800, 450, 'fondo'); 
    
        this.add.image(800, 500, 'nombres'); 
    
        this.add.image(800, 150, 'credits'); 
        
        var volver = this.add.image(800, 800, 'back')
        volver.setInteractive()
        volver.on('pointerdown', () => this.scene.start('inicio') );
    }
    }