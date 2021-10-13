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
    //this.load.spritesheet('bee', 'assets/images/Gameplay Assets/Personajes/beesprite.png', { frameWidth: 108, frameHeight: 120}); 
    this.load.atlas('BEE', 'assets/images/Gameplay Assets/Personajes/JSONTRY/BEE.png', 'assets/images/Gameplay Assets/Personajes/JSONTRY/BEE.json'); 

    //preload de los objetos a usar
    this.load.image('health', 'assets/images/Gameplay Assets/power up/PU vida1.png')
    //Preloads de los colliders
    this.load.image('pesticorto', 'assets/images/Gameplay Assets/colliders/collider rojo pesticida corto.png')
    this.load.image('pestilargo', 'assets/images/Gameplay Assets/colliders/collider rojo pesticida.png')
    this.load.image('pestimedio', 'assets/images/Gameplay Assets/colliders/collider rojo pesticida medio.png')
    this.load.image('matamosca', 'assets/images/Gameplay Assets/colliders/matamoscas grande.png')

    //preload de el fondo del tile 
    this.load.image('menufondo', 'assets/images/Menu/menufondo.png')
    
    //Preload Tilemaps
    this.load.tilemapTiledJSON('Beejuego', 'assets/BeeJuegoMASLARGO.json')
 }

 create()
 {
    this.scene.launch('ui')

    //Tilemaps
    const map = this.make.tilemap({ key: 'Beejuego' });
    this.cameras.main.setBounds(0, 0, 4800, 885)
    //Conjunto de Patrones/Aka Tileset

    const tileset1 = map.addTilesetImage('Fondo', 'menufondo'); //Primero el nombre del conjunto y luego como se definio en Visual
    const tileset2 = map.addTilesetImage('MATASMOSCAS','matamosca');
    const tileset3 = map.addTilesetImage('COLLIDERPESTI', 'pestilargo' );
    
    //tileset de prueba para el 'suelo'
    const tileset4 = map.addTilesetImage('SUELO', 'pesticorto' );

    //Capas/Aka 'Layers'

    const layerfondo = map.createLayer('FONDO', tileset1);
    const layercollider = map.createLayer('COLLIDER', tileset2, 0, 0);
    const layercolliderpesti = map.createLayer('COLLIDERPESTI', tileset3, 0, 0);
    const layercollidersuelo = map.createLayer('SUELO', tileset4, 0, 0);

     //COLISIONES
        layerfondo.setCollisionByProperty({ collides: false})
        //layercollider.setCollisionByProperty({ collides: false})
        //layercolliderpesti.setCollisionByProperty({ collides: false})
        layercollidersuelo.setCollisionByProperty({ collides: true})

        //map.createLayer('obstacles', tileset2)
        //map.createLayer('obstacles', tileset3)

		const objectsLayer = map.getObjectLayer('objects')

		 objectsLayer.objects.forEach(objData => {
			const { x = 0, y = 0, name, width = 0, height = 0 } = objData

			switch (name)
			{
				case 'Abejita-Spawn':
                    {
                        this.bee = this.matter.add.sprite(x + (width * 0.5), y, 'BEE')
                        //shall we put fixedRotation(?)
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
					health.setData('healthPoints', 10)
					break
				}

                case 'Choques':
                    {
                        const Choque = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                            isStatic: true,
                            //isSensor: true
                        })
                        this.obstacles.add('Choques', Choque)
                        break

                    }

                /*case 'ChoqueMata':
                    {
                        const ChoqueMata = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                            isStatic: true,
                            //IsSensor no sé si lo usamos, pero lo pongo como prueba para ver como se puede configurar
                            //, si no se toma la config del spikes
                            
                        })
                        this.obstacles.add('ChoqueMata', ChoqueMata)
                        break

                    }*/
                    case 'Pared':
                        {
                            const layercolliderpesti = this.matter.add.rectangle(x + (width *0.5), y + (height * 0.5), width, height, {
                                isStatic: true,
                            })
                            this.obstacles.add('Pared', layercolliderpesti)
                            break
    
                        }
            }
        })
        //this.matter.world.convertTilemapLayer(layercollider)
        //this.matter.world.convertTilemapLayer(layercolliderpesti)
        this.matter.world.convertTilemapLayer(layercollidersuelo)
    }
//consejos 
    destroy()
	{
		this.scene.stop('ui')
		//this.snowmen.forEach(snowman => snowman.destroy())
	}

    update(t: number, dt: number)
    {
        
      this.playerController?.update(dt)
    
    }
}
  


 
