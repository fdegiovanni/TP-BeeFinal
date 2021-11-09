import Phaser from 'phaser'
import PlayerController from './PlayerController'
import ObstaclesController from './ObstaclesController'
//import AvispaController from './AvispaController'

export default class EscenaBOSS extends Phaser.Scene
{
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private bee?: Phaser.Physics.Matter.Sprite
    private playerController?: PlayerController
    private obstacles!: ObstaclesController
    sound: any;

    private aguijon;

    constructor()
    {
        super('GameBoss')
    }

    init(){
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
    this.load.image('obstaculos', 'assets/images/Gameplay Assets/colliders/tilemap1 prueba.png')
    this.load.image('FlorBoss', 'assets/images/Gameplay Assets/colliders/girasol.png')

    this.load.image('Avispa', '/assets/images/Gameplay Assets/Personajes/BOSS/avispa.png')
    this.load.image('Pium', '/assets/images/Gameplay Assets/Personajes/BOSS/pium.png')

    //preload de el fondo del tile 
    this.load.image('FondoNiv', 'assets/images/Menu/fondo attarrdecer.png')
    

    //preloads musica
    this.load.audio('MusicaBOSS', 'assets/sounds/MUSICA/Musica_Nivel_02_Boss.mp3')
    this.load.audio('healthfx', '/assets/sounds/MUSICA/SFX/Powerup.mp3')
    this.load.audio('pesticidafx', '/assets/sounds/MUSICA/SFX/Pesticida.mp3')

    //Preload Tilemaps
    
    this.load.tilemapTiledJSON('BossLevel', 'assets/NivBOSS/JEFECITO.json')

 }

 create()
 {
    this.scene.launch('ui')

    this.sound = this.scene.get("SonidosGeneral");

    this.sound.Sonido('MusicaBOSS')
    this.sound.AgregarEscena(this)

    let ui:any = this.scene.get("ui");
    ui.Escenanombre(this.scene.key)

    const map = this.make.tilemap({ key: 'BossLevel' });
    this.cameras.main.setBounds(0, 0, 4800, 896)
    //Conjunto de Patrones/Aka Tileset

    const tileset1 = map.addTilesetImage('Fondo', 'FondoNiv'); //Primero el nombre del conjunto y luego como se definio en Visual
    //const tileset2 = map.addTilesetImage('OBSTACULOS','obstaculos');
    const tileset3 = map.addTilesetImage('SUELO', 'pesticorto' );
    const tileset4 = map.addTilesetImage('Girasolcito', 'FlorBoss')
    
    //Capas/Aka 'Layers'

    const layerfondo = map.createLayer('FONDO', tileset1);
    const layercollidersuelo = map.createLayer('SUELO', tileset3, 0, 0);

     //COLISIONES
        layerfondo.setCollisionByProperty({ collides: false})
        layercollidersuelo.setCollisionByProperty({ collides: true})

        //map.createLayer('Obstaculos', tileset2)
        map.createLayer('Superado4', tileset4)

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
                case 'Pium':
                {
                    const health = this.matter.add.sprite(x, y, 'Pium', undefined, {
                        //isStatic: true,
                        isSensor: true
                    })
                    health.setData('type', 'health')
                    health.setData('healthPoints', -1)
                    //const piumvelocity = this.matter.add.('Pium'){}
                    break
                }
                case 'SupLVLWIN':
                    {
                        const flor = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                            isStatic: true
                        })

                        this.obstacles.add('SupLVLWIN', flor)
                        
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

        //Config Avispa.
        let Avispa = this.add.image(1400, 200, 'Avispa')
        .setScale(0.7)
         let AvispaT = this.tweens.add({

             targets: Avispa,

             y: 140,

           paused: false,

            yoyo: true,

            repeat: -1
        })

         Avispa.scrollFactorX = 0

         Avispa.scrollFactorY = 0

         //aguijones

        // let aguijon = this.matter.add.group({
        //     key : 'Pium',
        //     repeat: 7,
        //     setXY: {x :20, y: 20, stepX: 20  }
        // })

        // this.aguijon = this.physics.add.group({
		// 	classType: Phaser.GameObjects.Image
		// })

		// this.aguijon.createMultiple({
		// 	key: 'Pium',
		// 	setXY: {
		// 		x:500,
		// 		y:300,
		// 		stepX: 200
		// 	}, 
			
		// 	quantity: 7
		// })
////otro codigo de aguijones
    //     this.aguijon = this.physics.add.group({
	// 		key: 'Pium',
    //         repeat: 7,
	// 		setXY: {
	// 			x:500,
	// 			y:300,
	// 			stepX: 200},
    //     allowGravity: true,
    //     gravityY: 350,

    // })

    }

    
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