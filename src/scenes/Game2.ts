import Phaser from 'phaser'
import ObstaclesController from './ObstaclesController'
import PlayerController from './PlayerController'
import sonidogeneral from './MusicManager'


export default class Game2 extends Phaser.Scene
{

 //cursos

 private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
 private bee?: Phaser.Physics.Matter.Sprite
 private playerController?: PlayerController
 private obstacles!: ObstaclesController
 sound: any;
 constructor()
	{
		super('gamelv2')
	}

    init()
 {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.obstacles = new ObstaclesController()
    //manejador del evento de 'apagado' de la escena
		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			this.destroy()
        })
 }

 preload()
{
//Preloads del personaje
    
this.load.atlas('BEE', 'assets/images/Gameplay Assets/Personajes/JSONTRY/BEE.png', 'assets/images/Gameplay Assets/Personajes/JSONTRY/BEE.json'); 

//preload de los objetos a usar
this.load.image('health', 'assets/images/Gameplay Assets/power up/PU vida1.png')
this.load.image('healthempty', 'assets/images/Gameplay Assets/power up/PU vidasin22.png')
//Preloads de los colliders
this.load.image('pesticorto', 'assets/images/Gameplay Assets/colliders/collider rojo pesticida corto.png')
//Obstaculos
this.load.image('obstaculos2', 'assets/images/Gameplay Assets/colliders/CollidersLV2.png')
this.load.image('Flor2', 'assets/images/Gameplay Assets/colliders/FlorNiv2.png')

//preload de el fondo del tile 
this.load.image('FondoSig2', 'assets/images/Menu/fondo ciudad.png')
//Preload Tilemaps
    
this.load.tilemapTiledJSON('BeeGame2', 'assets/Niv2/BeeGameTry.json')

this.load.audio('healthfx', '/assets/sounds/MUSICA/SFX/Powerup.mp3')
    this.load.audio('pesticidafx', '/assets/sounds/MUSICA/SFX/Pesticida.mp3')
}

create () 
{
    this.scene.launch('ui')
    this.sound = this.scene.get("SonidosGeneral");
    this.sound.Sonido('MusicaNiv2')
    this.sound.AgregarEscena(this)

    //Restart
    let ui:any = this.scene.get("ui");
    ui.Escenanombre(this.scene.key)
    
    //Tilemaps
    const map = this.make.tilemap({ key: 'BeeGame2' });
    this.cameras.main.setBounds(0, 0, 4800, 885)
    //Conjunto de Patrones/Aka Tileset
    const tileset1 = map.addTilesetImage('FondoLV2', 'FondoSig2'); //Primero el nombre del conjunto y luego como se definio en Visual
    const tileset2 = map.addTilesetImage('OBSTACULOS','obstaculos2');
    const tileset3 = map.addTilesetImage('SUELO', 'pesticorto' );
    const tileset4 = map.addTilesetImage('florcita2', 'Flor2')
    //Capas/Aka 'Layers'

    const layerfondo = map.createLayer('FONDO', tileset1);
    const layercollidersuelo = map.createLayer('SUELO', tileset3, 0, 0);

     //COLISIONES
        layerfondo.setCollisionByProperty({ collides: false})
        layercollidersuelo.setCollisionByProperty({ collides: true})

        map.createLayer('Obstaculos', tileset2)
        map.createLayer('Superado2', tileset4)

        const objectsLayer = map.getObjectLayer('objects')

        objectsLayer.objects.forEach(objData => {
           const { x = 0, y = 0, name, width = 0, height = 0 } = objData

           switch (name)
           {
               case 'Abejita-Spawn':
                   {
                       this.bee = this.matter.add.sprite(x + (width * 0.5), y, 'BEE')

                       .setFixedRotation()
                     
                       this.playerController = new PlayerController(
                           this,
                           this.bee,
                           this.cursors,
                           this.obstacles
                           )
                       this.cameras.main.startFollow(this.bee, true)
                       break
                   }

               case 'health':
               {
                   const health = this.matter.add.sprite(x, y, 'health', undefined, {
                       isStatic: true,
                       isSensor: true
                   })

                   health.setData('type', 'health')
                   health.setData('healthPoints', 1)
                   break
               }
               case 'FlorSup2':
                    {
                        const flor2 = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                            isStatic: true
                        })

                        this.obstacles.add('FlorSup2', flor2)
                        break
                    }
               case 'Choques':
               {
                   const choque = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                       isStatic: true
                   })
                   this.obstacles.add('Choques', choque)

                   break

               }

               case 'Pared':
                   {
                       const pared = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                           isStatic: true,
                       })
                       this.obstacles.add('Pared', pared)
                       break

                   }
       }
   })
   this.matter.world.convertTilemapLayer(layercollidersuelo)
}
//consejos 
destroy()
{
    this.scene.stop('ui')
}

update(t: number, dt: number)
{
    this.sound.PausaJuego(this)
  this.playerController?.update(dt)

}
}





