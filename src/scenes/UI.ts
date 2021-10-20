import Phaser, { Scene } from 'phaser'
import { sharedInstance as events } from './EventCenter'

export default class UI extends Phaser.Scene
{
    private starsLabel!: Phaser.GameObjects.Text
    //private starsCollected = 0
	private graphics!: Phaser.GameObjects.Graphics

	private lastHealth = 3
	private hearts!: Phaser.GameObjects.Group

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
		//this.graphics = this.add.graphics()
		//this.setHealthBar(3)

        /*this.starsLabel = this.add.text(10, 35, 'Stars: 0', {
			fontSize: '32px'
		})*/

		//events.on('star-collected', this.handleStarCollected, this)

		//events.on('health-changed', this.handleHealthChanged, this)

		/*this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			events.off('star-collected', this.handleStarCollected, this)
		})*/

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
			if (idx <= health)
			{
				heart.setTexture('health')
			}
			else
			{
				heart.setTexture('healthempty')
			}
		})
	}

    /*private setHealthBar(value: number)
	{
		const width = 200
		const percent = Phaser.Math.Clamp(value, 0, 3) / 3

		this.graphics.clear()
		this.graphics.fillStyle(0x808080)
		this.graphics.fillRoundedRect(10, 10, width, 20, 5)
		if (percent > 0)
		{
			this.graphics.fillStyle(0x00ff00)
			this.graphics.fillRoundedRect(10, 10, width * percent, 20, 5)
		}
	}

	private handleHealthChanged(value: number)
	{
		this.tweens.addCounter({
			from: this.lastHealth,
			to: value,
			duration: 200,
			ease: Phaser.Math.Easing.Sine.InOut,
			onUpdate: tween => {
				const value = tween.getValue()
				this.setHealthBar(value)
			}
		})

		this.lastHealth = value
	}

    /*private handleStarCollected()
	{
		++this.starsCollected
		this.starsLabel.text = `Stars: ${this.starsCollected}`
	}*/
}