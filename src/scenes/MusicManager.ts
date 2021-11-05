import Phaser from 'phaser'
export default class sonidogeneral extends Phaser.Scene

{
private MusicaRepro;
private MutearSonido = false;
private MutearMusica = false;
private Imagensonido;
private Imagenmusica;
private ImagenPausa;


constructor()
{
super({key: 'SonidosGeneral', active: true})
}
preload ()
{
    this.load.tilemapTiledJSON('MusicaHUD', '/assets/Config HUD/HUD.json')
    //this.load.atlas();
    this.load.image('PausaButton', '/assets/Config HUD/pausa.png')
    this.load.spritesheet('SonidoSprite', '/assets/Config HUD/sonidosprite.png', {frameWidth: 120, frameHeight: 120})
    this.load.spritesheet('MusicaSprite', '/assets/Config HUD/musicasprite.png', {frameWidth: 120, frameHeight: 120})
}
create ()
{   //let image = (this.add.image(120, 120, 'SonidoSprite')) 
//     .setFrame(0)
//     console.log(image[0])

    const map = this.make.tilemap({ key: 'MusicaHUD' });
    const objectsLayer = map.getObjectLayer('objects')
     objectsLayer.objects.forEach(objData => {
     const { x = 0, y = 0, name, width = 0, height = 0 } = objData
        console.log(objData)
        switch (name)
			{
				case 'SonidoHUD':
                    {
                        this.Imagensonido = (this.add.image(x, y, 'SonidoSprite')) 
                             .setFrame(0)
                             this.Imagensonido.setDisplaySize(width, height)

                             break
                             
                    }
                case 'MusicaHUD':
                    {
                        this.Imagenmusica = (this.add.image(x, y, 'MusicaSprite')) 
                             .setFrame(0)
                             this.Imagenmusica.setDisplaySize(width, height)

                             break
                             
                    }
    
                case 'Pausaboton':{
                    this.ImagenPausa = (this.add.image(x, y, 'PausaButton')) 
                    this.ImagenPausa.setDisplaySize(width, height)
                    this.ImagenPausa.setVisible(false)
                    break
                }
                }            
    })
    console.log(this.Imagenmusica.frame)
    this.Imagenmusica.setInteractive()
    .on('pointerdown', () =>{
        if (this.Imagenmusica.frame.name == 0) {
            this.Imagenmusica.setFrame(1)
            this.Mute_Music(true)
        }
        else {
                this.Imagenmusica.setFrame(0)
                this.Mute_Music(false)
        }
     })

     this.Imagensonido.setInteractive()
    .on('pointerdown', () =>{
        if (this.Imagensonido.frame.name == 0) {
            this.Imagensonido.setFrame(1)
            this.SonidoMute(true)
        }
        else {
                this.Imagensonido.setFrame(0)
                this.SonidoMute(false)
        }
     })
   
}

Sonido(MusicaGral)
{
    if(this.MusicaRepro){
        this.MusicaRepro.stop();
    }
    this.MusicaRepro = this.sound.add(MusicaGral, {volume: 0.1, loop: true});
    if(this.MutearMusica){
        this.MusicaRepro.pause();
    }
    else{
        this.MusicaRepro.play();
    }
}

Mute_Music(booleano)
{
    if(booleano){
        this.MutearMusica = true;
        if(this.MusicaRepro){
            this.MusicaRepro.pause();
        }
    }
    else{
        this.MutearMusica = false;
        if(this.MusicaRepro){
            if(this.MusicaRepro.isPaused){
                this.MusicaRepro.resume();
            }
            else{
                this.MusicaRepro.play();
            }
        }
        }
    }



SonidoStop()
{
this.MusicaRepro.stop()
}

SonidoON()
{

}
SonidoMute(pararsonido)
{
    if (pararsonido) {
        this.MutearSonido = true
    }
    else {
        this.MutearSonido = false
    }
}

}