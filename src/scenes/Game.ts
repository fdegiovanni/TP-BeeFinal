import Phaser from 'phaser'
import ObstaclesController from './ObstaclesController'
import PlayerController from './PlayerController'


export default class Game extends Phaser.Scene
{

 //cursos

 private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
 private bee?: Phaser.Physics.Matter.Sprite
 private playerController?: PlayerController
 private obstacles!: ObstaclesController
 //private enemigo: EnemigoController [] = []¨

 

 constructor()
	{
		super('game')
	}

 init()
 {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.obstacles = new ObstaclesController()
    //this.enemigo = []
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
    this.load.image('Flor', 'assets/images/Gameplay Assets/colliders/FlorNiv1.png')

    //preload de el fondo del tile 
    this.load.image('fondolevel', 'assets/images/Menu/menufondo.png')
    
    //Preload Tilemaps
    
    this.load.tilemapTiledJSON('BeeGame1', 'assets/Niv1/Niv1.json')

 }

 create()
 {
    this.scene.launch('ui')

    //Tilemaps
    const map = this.make.tilemap({ key: 'BeeGame1' });
    this.cameras.main.setBounds(0, 0, 1920, 885)
    //Conjunto de Patrones/Aka Tileset

    const tileset1 = map.addTilesetImage('Fondo', 'fondolevel'); //Primero el nombre del conjunto y luego como se definio en Visual
    const tileset2 = map.addTilesetImage('OBSTACULOS','obstaculos');
    const tileset3 = map.addTilesetImage('SUELO', 'pesticorto' );
    const tileset4 = map.addTilesetImage('florcita', 'Flor')

    //Capas/Aka 'Layers'

    const layerfondo = map.createLayer('FONDO', tileset1);
    const layercollidersuelo = map.createLayer('SUELO', tileset3, 0, 0);

     //COLISIONES
        layerfondo.setCollisionByProperty({ collides: false})
        layercollidersuelo.setCollisionByProperty({ collides: true})

        map.createLayer('Obstaculos', tileset2)
        map.createLayer('Superado', tileset4)

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
                case 'FlorSup':
                    {
                        const flor = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                            isStatic: true
                        })

                        this.obstacles.add('FlorSup', flor)
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
        
      this.playerController?.update(dt)
    
    }
}
  


 
