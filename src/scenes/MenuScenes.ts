import Phaser from 'phaser'
import { DE_DE, EN_US, ES_AR, PT_BR } from '~/enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '~/enums/status'
import { getTranslations, getPhrase } from '~/services/translations'

export default class MenuScene extends Phaser.Scene{
    private textSpanish
    private textGerman
    private textEnglish
    private textPortuguese
    


    private updatedTextInScene
    private updatedString = 'Siguiente'
    private wasChangedLanguage = TODO

    constructor () {
        super('menu');
    }

    preload(){
        this.load.image('Alemán', 'assets/images/Menu/Banderas/alemania.png')
        this.load.image('Inglés', 'assets/images/Menu/Banderas/yankeel.png')
        this.load.image('Brasil', 'assets/images/Menu/Banderas/brazil.png')
        this.load.image('Argentina', 'assets/images/Menu/Banderas/argentina.png')
    }

    create() {
        const { width, height } = this.scale

        this.add.image(800, 450, 'menufondo'); 

//Aca empieza el botón de Español 

		const buttonSpanish = this.add.image(width * 0.35, height * 0.30, 'Argentina')
            .setScale(1.75)
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
				this.getTranslations(ES_AR)
			})
		.setOrigin(0.5)

//Aca empieza el botón de Aleman 
                                    //image(800, 570, 'Alemán')
        const buttonGerman = this.add.image(width * 0.42, height * 0.65, 'Alemán')
            .setScale(1.75)
			.setInteractive()
            
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
				this.getTranslations(DE_DE)
			})
		.setOrigin(1)

//Aca empieza el botón de Ingles

        const buttonEnglish = this.add.image(width * 0.73, height * 0.65, 'Inglés')
            .setScale(1.75)
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
				this.getTranslations(EN_US)
			})
		.setOrigin(1)

//Aca empieza el botón de Portugues

        const buttonPortuguese = this.add.image(width * 0.73, height * 0.38, 'Brasil')
            .setScale(1.75)
            .setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
				this.getTranslations(PT_BR)
			})
		.setOrigin(1)

//Este botón que se ve aca es un botón que ya da ejemplo a ver cómo se usa la api. La explicación está en el word como "Explicación botón trads"


//Primera parte
        const buttonUpdate = this.add.rectangle(width * 0.5, height * 0.75, 150, 75, 0x44d27e)
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
				this.scene.start('dyk')
			})

//Segunda parte
        
        this.updatedTextInScene = this.add.text(buttonUpdate.x,buttonUpdate.y, getPhrase(this.updatedString), {
			color: '#000000'
		})
		.setOrigin(0.5)
    }

//Aca no entiendo bien que pasa pero creo q esto es lo q hace q las cosas cambien si se cambia el idioma ahre

    update(){

        if(this.wasChangedLanguage === FETCHED){
            this.wasChangedLanguage = READY;
            this.updatedTextInScene.setText(getPhrase(this.updatedString));
        }
    }

    async getTranslations(language){
        this.wasChangedLanguage = FETCHING
        await getTranslations(language)
        this.wasChangedLanguage = FETCHED
        // si solo se tiene un menu para elegir las opciones de idiomas conviene cargar aca la misma
        //this.scene.start('game')
    }

}