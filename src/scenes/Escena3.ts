import Phaser from 'phaser'

export default class Escena3 extends Phaser.Scene
{
  sound: any;

    constructor() {
      super('options');
    }

    preload () { 
      this.load.image('fondo', 'assets/images/Pantallas_Assets/Opciones/Fondo Azul.png');  
      this.load.image('opts', 'assets/images/Pantallas_Assets/Opciones/opciones.png');  
      this.load.image('vol', 'assets/images/Pantallas_Assets/Opciones/volumen.png');  
      this.load.image('sel', 'assets/images/Pantallas_Assets/Opciones/seleccion.png');
      this.load.image('fone', 'assets/images/Pantallas_Assets/Opciones/flechita izquierrda.png');
      this.load.image('ftwo', 'assets/images/Pantallas_Assets/Opciones/flechita derecha.png');
      this.load.image('abselect', 'assets/images/Pantallas_Assets/Opciones/abejita seleccion.png');
      this.load.image('sound', 'assets/images/Pantallas_Assets/Opciones/sound.png'); 
      this.load.image('soundmute', 'assets/images/Pantallas_Assets/Opciones/soundmute.png'); 
      this.load.image('music', 'assets/images/Pantallas_Assets/Opciones/music.png');
      this.load.image('musicmute', 'assets/images/Pantallas_Assets/Opciones/musicmute.png');
      this.load.image('bac', 'assets/images/Pantallas_Assets/Opciones/VOLVER.png');
    }
    create() {

      this.add.image(800, 450, 'fondo');

      this.add.image(800, 100, 'opts');

      this.add.image(500, 350, 'vol');

      this.add.image(500, 550, 'sel');

      this.add.image(750, 550, 'fone');

      this.add.image(1150, 550, 'ftwo');

      this.add.image(950, 550, 'abselect');

      // var musicmute = this.add.image(950, 400, 'musicmute');
      // musicmute.setInteractive()
      // musicmute.setVisible(false)

      // var soundmute = this.add.image(950, 300, 'soundmute');
      // soundmute.setInteractive()
      // soundmute.setVisible(false)
      // let sound2: any = this.scene.get('SonidosGeneral')
			

      // var sound = this.add.image(950, 300, 'sound');
      // sound.setScale(0.7)
      // sound.setInteractive()
      // sound.on('pointerdown', ()=>{
      //   sound.setVisible(false)
      //   soundmute.setVisible(true)
      // })

      // var music = this.add.image(950, 400, 'music');
      // music.setInteractive()
      // music.setScale(0.7)
      // music.on('pointerdown', ()=> {
      // music.setVisible(false)
      // musicmute.setVisible(true)
      // sound2.SonidoMute(true)
      // })
      
      // soundmute.on('pointerdown', ()=>{
      // soundmute.setVisible(false)
      // sound.setVisible(true)
      // })

      // musicmute.on('pointerdown', ()=> {
      //   musicmute.setVisible(false)
      //   music.setVisible(true)
      //   sound2.SonidoMute(false)
      //   })

      var volver = this.add.image(800, 800, 'bac')
      volver.setInteractive()
      volver.on('pointerdown', () => this.scene.start('inicio') );

  }

    
}