import Phaser from 'phaser'
export default class sonidogeneral extends Phaser.Scene

{
    //sonido colider
    private sonidocollider
    //sonido pesti
    private sonidopesti
    //SonidoClick
    private sonidoclick
    //Sonido Corazón
    private sonidocorazon
    
    private MusicaRepro;

    private MutearSonido = false;
    private MutearMusica = false;
    private Imagensonido;
    private Imagenmusica;
    private ImagenPausa;
    private PausaPhysics = false;
    private EscenaJuego;
    private Resumir = false

constructor()
{
super({key: 'SonidosGeneral', active: true})
}

preload ()
{
    this.load.tilemapTiledJSON('MusicaHUD', '/assets/Config HUD/HUD.json')
    //this.load.atlas();
    
    this.load.spritesheet('SonidoSprite', '/assets/Config HUD/sonidosprite.png', {frameWidth: 120, frameHeight: 120})
    this.load.spritesheet('MusicaSprite', '/assets/Config HUD/musicasprite.png', {frameWidth: 120, frameHeight: 120})
    this.load.spritesheet('PausaSprite', '/assets/Config HUD/pausasprite.png', {frameWidth: 95, frameHeight: 110})
}
create ()
{   
    const map = this.make.tilemap({ key: 'MusicaHUD' });
    const objectsLayer = map.getObjectLayer('objects')
     objectsLayer.objects.forEach(objData => {
     const { x = 0, y = 0, name, width = 0, height = 0 } = objData

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
    
                case 'PausaHUD':
                    {
                    this.ImagenPausa = (this.add.image(x, y, 'PausaSprite')) 
                        .setFrame(0)
                    this.ImagenPausa.setDisplaySize(width, height)
                    this.ImagenPausa.setVisible(true)
                    break
                }
                }            
    })
    
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
            this.SonidoFXMute(true)
        }
        else {
                this.Imagensonido.setFrame(0)
                this.SonidoFXMute(false)
        }
     })

     this.ImagenPausa.setInteractive()
     .on('pointerdown', () =>{
         if (this.ImagenPausa.frame.name == 0) {
             this.ImagenPausa.setFrame(1)  
             this.PausaPhysics = (true)
         }
         else {
             this.ImagenPausa.setFrame(0)
             this.PausaPhysics = (false)
             //this.ImagenPausa.setVisible(true)
         }
     })
   
}

PausaJuego(Escena)
{
    
    if (this.PausaPhysics)
    {
        this.Resumir = false
        Escena.scene.pause();
    }

}

AgregarEscena(Escena)
{
    this.EscenaJuego = Escena;
}

//PARA MÚSICA
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

//PARA FX
SonidoHearthON()
{
 if (!this.MutearSonido) {
    this.sonidocorazon = this.sound.add('healthfx', {volume:0.1, loop:false})
    this.sonidocorazon.play()
}
}
//clik
SonidoClick()
{
if (!this.MutearSonido){
    this.sonidoclick = this.sound.add('clic', {volume:0.1, loop:false})
    this.sonidoclick.play()
}
}


//pestisound
Sonidopesti()
{
    if (!this.MutearSonido) {
        this.sonidopesti = this.sound.add('pesticidafx', {volume:0.1, loop:false})
        this.sonidopesti.play()
    }
}
//colliderchoquesound
SonidoCollider()
{
    if(!this.MutearSonido) {
        this.sonidocollider = this.sound.add('choquecoll', {volume: 0.1, loop:false})
        this.sonidocollider.play()
    }
}

SonidoFXMute(pararsonido)
{
    if (pararsonido) {
        this.MutearSonido = true
    }
    else {
        this.MutearSonido = false
    }
}

update(){
     if (!this.PausaPhysics){
         if (!this.Resumir && this.EscenaJuego){
             this.Resumir = true
             this.EscenaJuego.scene.resume()
        }
     }
}

}