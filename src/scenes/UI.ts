import Phaser, { Scene } from 'phaser'
import { sharedInstance as events } from './EventCenter'

export default class UI extends Phaser.Scene
{
	sound:any
	private graphics!: Phaser.GameObjects.Graphics

	private hearts!: Phaser.GameObjects.Group

	private Escena;

	constructor()
	{
		super({
			key: 'ui'
		})
	}
    init()
	{
		//this.starsCollected = 0
	}
	
    create()
	{

		//INTENTO CONFIG DE VIDA EN CORAZÓN

		this.hearts = this.add.group({
			classType: Phaser.GameObjects.Image
		})

		this.hearts.createMultiple({
			key: 'health',
			setXY: {
				x:70,
				y:50,
				stepX: 80
			}, 
			
			quantity: 3
		})

		events.on('health-changed', this.setHealth, this)

		this.events.on(Phaser.Scenes.Events.SHUTDOWN,() => 
		{
	
			events.off('health-changed', this.setHealth)
		})

    }

	private setHealth(health: number)
	{
		this.hearts.children.each((go, idx) => {
			const heart = go as Phaser.GameObjects.Image
			if (idx < health)
			{
				
				heart.setTexture('health')
			}
			else
			{
			
				heart.setTexture('healthempty')
			}
		})
	}

	Escenanombre(nombre){
		this.Escena = nombre;
	}

}