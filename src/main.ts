import Phaser from 'phaser'

import UNRaf from './scenes/UNRaf'
import EscenaMenu from './scenes/EscenaMenu'
import Escena3 from './scenes/Escena3'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import UI from './scenes/UI'
import Game2 from './scenes/Game2'
import Game3 from './scenes/Game3'
import sonidogeneral from './scenes/MusicManager'
import EscenaDYK from './scenes/EscenaDYK'
import EscenaBOSS from './scenes/EscenaBOSS'
import MenuScene from './scenes/MenuScenes'
import EscenaDYK3 from './scenes/EscenaDYKlvl3'
import EscenaDYKBoss from './scenes/EscenaDYKlvlBoss'
import EscenaWin from './scenes/EscenaWin'
import EscenaDYK2 from './scenes/EscenaDYKlvl2'
import 'regenerator-runtime/runtime'
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
            debug: false
        }
    },
	scene: [ UNRaf, EscenaMenu, Escena3, Game, Game2, Game3, EscenaBOSS, GameOver, UI, sonidogeneral, EscenaDYK, EscenaDYK2, EscenaDYK3, EscenaDYKBoss, EscenaWin, MenuScene]
} 

export default new Phaser.Game(config)
