import Phaser from 'phaser'
import sonidogeneral from './MusicManager'

export default class EscenaMenu extends Phaser.Scene{

    sound: any;

    constructor () {
        super('inicio');
    }

    preload ()
    {
        this.load.image('creds',  'assets/images/Menu/creds.png')
        this.load.image('casaico', 'assets/images/Menu/casa ico grande.png')
        this.load.image('menufondo', 'assets/images/Menu/menufondo.png')
        this.load.image('music', 'assets/images/Menu/music.png')
        this.load.image('play', 'assets/images/Menu/play ico.png')
        this.load.image('reintentar', 'assets/images/Menu/reintentar grande.png')
        this.load.image('sound', 'assets/images/Menu/sound.png')
        this.load.image('titulo', 'assets/images/Menu/title.png')
        //this.load.image('options', 'assets/images/Menu/ajuste.png')

        //Preloads de los colliders
        this.load.image('pesticorto', 'assets/images/Gameplay Assets/colliders/collider rojo pesticida corto.png')
        this.load.image('pestilargo', 'assets/images/Gameplay Assets/colliders/collider rojo pesticida.png')
        this.load.image('pestimedio', 'assets/images/Gameplay Assets/colliders/collider rojo pesticida medio.png')
        this.load.image('matamosca', 'assets/images/Gameplay Assets/colliders/matamoscas grande.png')

        this.load.audio('MusicaNiv1', 'assets/sounds/MUSICA/Musica_Nivel_01_Gameplay.mp3')
        this.load.audio('MusicaNiv2', 'assets/sounds/MUSICA/Musica_Nivel_02_Gameplay.mp3')
        this.load.audio('MusicaNiv3', 'assets/sounds/MUSICA/Musica_Nivel_03_Gameplay.mp3')
        this.load.audio('MusicaLose', 'assets/sounds/MUSICA/Musica_Derrota.mp3')
        this.load.audio('MusicaMenu', 'assets/sounds/MUSICA/Musica_Menu.mp3')
    }

    create() {
        this.sound = this.scene.get("SonidosGeneral");
        this.sound.Sonido('MusicaMenu')

        this.add.image(800, 450, 'menufondo'); 
  
        this.add.image(800, 350, 'titulo'); 
  
        /*var start = this.add.image(1000, 550, 'options')
        start.setInteractive()
        start.on('pointerdown', () => this.scene.start('options') );*/
  
        var creds = this.add.image(600, 550, 'creds')
        creds.setInteractive()
        creds.on('pointerdown', () => this.scene.start('creditos') );
  
        var help = this.add.image(800, 570, 'play')
        help.setInteractive()
        help.on('pointerdown', () => this.scene.start('game') );
  
        /*var sound = this.add.image(1350, 120, 'sound')
        sound.setInteractive()
        //sound.on('pointerdown', () => );
  
        var music = this.add.image(1450, 120, 'music')
        music.setInteractive()
        //music.on('pointerdown', () => );*/
      }

}