import Phaser from 'phaser'

import EscenaMenu from './scenes/EscenaMenu'
import Escena3 from './scenes/Escena3'
import Escena4 from './scenes/Escena4'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import UI from './scenes/UI'
import Game2 from './scenes/Game2'
import Game3 from './scenes/Game3'
import sonidogeneral from './scenes/MusicManager'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.NO_CENTER,
        width: 1600,
        height: 900,
    },
    
    
    physics: {
        default: 'matter',
        matter: {
            //gravity: { y: 2 },
            debug: false
        }
    },
	scene: [EscenaMenu, Escena3, Escena4, Game, Game2, Game3, GameOver, UI, sonidogeneral]
} 

export default new Phaser.Game(config)
