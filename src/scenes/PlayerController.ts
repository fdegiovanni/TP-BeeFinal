import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import { sharedInstance as events } from './EventCenter'
import ObstaclesController from './ObstaclesController'
import sonidogeneral from './MusicManager'

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys

export default class PlayerController
{
    private scene: Phaser.Scene
	private sprite: Phaser.Physics.Matter.Sprite
	private cursors: CursorKeys
	private obstacles: ObstaclesController

	private pointer: any

	private stateMachine: StateMachine

	private health = 3
	private sound: any;

    //private lastSnowman?: Phaser.Physics.Matter.Sprite ///cambiar config a un Boss

    constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Matter.Sprite, cursors: CursorKeys, obstacles: ObstaclesController)
	{
		this.scene = scene
		this.sprite = sprite
		this.cursors = cursors
		this.obstacles = obstacles
		this.pointer = scene.input.activePointer;

		this.createAnimations()

		this.stateMachine = new StateMachine(this, 'player')

        this.stateMachine.addState('idle', {
			onEnter: this.idleOnEnter,
			onUpdate: this.idleOnUpdate
		})
		.addState('walk', {
			onEnter: this.walkOnEnter,
			onUpdate: this.walkOnUpdate,
			//onExit: this.walkOnExit
		})
		.addState('Choquehit', {
        	onEnter: this.ChoqueCollOnEnter		
		})
        .addState('jump', {
			onEnter: this.jumpOnEnter,
			onUpdate: this.jumpOnUpdate
		})
            .addState('dead', {
                onEnter: this.deadOnEnter
            })
		.addState('SupLvl', {
			onEnter: this.SupLevelOnEnter,
			onUpdate: this.SupLevelOnUpdate
		})
		.addState('SupLvl2', {
			onEnter: this.SupLevel2OnEnter,
			onUpdate: this.SupLevel2OnUpdate
		})
		.addState('SupLvl3', {
			onEnter: this.SupLevel3OnEnter,
			onUpdate: this.SupLevel3OnUpdate
		})
        .setState('idle')

		
        this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
			const body = data.bodyB as MatterJS.BodyType
			
            if (this.obstacles.is('Choques', body))
			{
				this.stateMachine.setState('Choquehit')
				return
			}
            
			if (this.obstacles.is('FlorSup',body))
			{
				this.stateMachine.setState('SupLvl')
				return
			}

			if (this.obstacles.is('FlorSup2', body))
			{
				this.stateMachine.setState('SupLvl2')
				return
			}
			if (this.obstacles.is('FlorSup3', body))
			{
				this.stateMachine.setState('SupLvl3')
				return
			}

			const gameObject = body.gameObject

			if (!gameObject)
			{
				return
			}

			if (gameObject instanceof Phaser.Physics.Matter.TileBody)
			{
				if (this.stateMachine.isCurrentState('jump'))
				{
					this.stateMachine.setState('idle')
				}
				return
			}

            const sprite = gameObject as Phaser.Physics.Matter.Sprite
			const type = sprite.getData('type')

            //CODIGO PARA MODIFICAR CON PU Y VIDA
           switch (type)
			{
				case 'health':
				{
					
					const value = sprite.getData('healthPoints') ?? 1 
					this.health = Phaser.Math.Clamp(this.health + value, 0, 3)
					events.emit('health-changed', this.health)
					sprite.destroy()
					break
				}

				case 'Poison':
				{
					events.emit('health-changed', this.health)
					sprite.destroy()
					break
				}
			}

  })
 }

 update(dt: number)
	{
		
		this.stateMachine.update(dt)

		
		if (this.health  <= 0)

		{
			this.stateMachine.setState('dead')
		}
	
	}

    private setHealth(value: number)
	{
		this.health = Phaser.Math.Clamp(value, 0, 3)

		events.emit('health-changed', this.health)

		
	}

    private idleOnEnter()
	{
		this.sprite.play('player-idle')
	}

    private idleOnUpdate()
    {
		 const speed = 7
		if (this.pointer.isDown)
		{
			this.sprite.setVelocityX(speed)
			this.stateMachine.setState('jump')
		}
    }

	private walkOnEnter()
	{
		this.sprite.play('player-walk')
	}

	private walkOnUpdate()
	{
		const speed = 7

		if (this.cursors.left.isDown)
		{
			this.sprite.flipX = true
			this.sprite.setVelocityX(-speed)
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.flipX = false
			this.sprite.setVelocityX(speed)
		}
		else
		{
			this.sprite.setVelocityX(0)
			this.stateMachine.setState('idle')
		}

		
		if (this.pointer.isDown)
		{
			this.stateMachine.setState('jump')
		}
	}

	//jumpOnEnter para saltar sin tocar plataforma

 private jumpOnEnter()
	{
		this.sprite.setVelocityY(-5)
		this.sprite.play('jump')
	}
    
	private jumpOnUpdate()
	{
		const speed = 7

        if (this.pointer.isDown)
		{
			this.sprite.setVelocityX(speed)
			this.stateMachine.setState('jump')
		}
		this.stateMachine.setState('idle')
	}

	private ChoqueCollOnEnter()
	{
		this.sprite.setVelocityY(-12)
		
		const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
		const endColor = Phaser.Display.Color.ValueToColor(0xff0000)

		this.scene.tweens.addCounter({
			from: 0,
			to: 100,
			duration: 100,
			repeat: 2,
			yoyo: true,
			ease: Phaser.Math.Easing.Sine.InOut,
			onUpdate: tween => {
				const value = tween.getValue()
				const colorObject = Phaser.Display.Color.Interpolate.ColorWithColor(
					startColor,
					endColor,
					100,
					value
				)

				const color = Phaser.Display.Color.GetColor(
					colorObject.r,
					colorObject.g,
					colorObject.b
				)

				this.sprite.setTint(color)
			}
		})

		this.stateMachine.setState('idle')

		

		this.setHealth(this.health - 1)
		
	}

	

	//AGREGAR WALKON UPDATE
	//JUMPO ON ENTER AGREGAR
	//AGREGAR EN EL IDLE ON UPDATE

    private deadOnEnter()
	{
		this.sprite.play('player-death')

		this.sprite.setOnCollide(() => {})

		this.scene.time.delayedCall(1500, () => {
			this.scene.scene.start('game-over')
		
		})
	}

	private  SupLevelOnEnter()
	{
		this.sprite.setOnCollide(() => {})

		this.scene.time.delayedCall(100, () => {
			let sound: any = this.scene.scene.get('SonidosGeneral')
			//sound.SonidoStop()
			this.scene.scene.start('gamelv2')
		})

	}

	private SupLevelOnUpdate()
	{
		this.stateMachine.setState('idle')
	}

	private  SupLevel2OnEnter()
	{
		this.sprite.setOnCollide(() => {})

		this.scene.time.delayedCall(100, () => {
			let sound: any = this.scene.scene.get('SonidosGeneral')
			//sound.SonidoStop()
			this.scene.scene.start('gamelv3')
		})

	}

	private SupLevel2OnUpdate()
	{
		this.stateMachine.setState('idle')
	}

	private  SupLevel3OnEnter()
	{
		this.sprite.setOnCollide(() => {})

		this.scene.time.delayedCall(100, () => {
			this.scene.scene.start('gamelvBOSS')
		})

	}

	private SupLevel3OnUpdate()
	{
		this.stateMachine.setState('idle')
	}

	
 	private createAnimations()
	{
        this.sprite.anims.create({
			key: 'player-idle',
			frames: [{ key: 'BEE', frame: 'BEE1.png' }]
		})


        this.sprite.anims.create({
			key: 'player-walk',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('BEE', {
				start: 0,
				end: 3,
				prefix: 'BEE',
				suffix: '.png'
			}),
			repeat: -1
		})

        this.sprite.anims.create({
			key: 'jump',
			frameRate: 10,
			frames: this.sprite.anims.generateFrameNames('BEE', {
                start: 0, 
                end: 3,
                prefix: 'BEE',
                suffix: '.png'
            }),
            repeat: -1
        })
		
        //CONFIGURAR UN SPRITE DE ABEJITA X.X
        this.sprite.anims.create({
			key: 'player-death',
			frames: this.sprite.anims.generateFrameNames('BEE', {
				start: 4,
				end: 5,
				prefix: 'BEE',
				suffix: '.png'
			}),
			frameRate: 10
		})

	}
}

