var sounds = [];
var currentBeat = 0;
var BEATS = 16;
var SOUNDS = 8;
var mainLoop;
//ms to wait for each loop -- make it smaller,faster tempo
var INTERVAL = 180;
//how crazy the evolution is, with 0 no changes, 10 everything changes (controlled by buttons)
var CRAZINESS = 0;

Ext.define('SonicPanic.controller.Session', {
    extend: 'Ext.app.Controller',
    config: {
        
        refs: {
            evolveButton: '#evolveButton',
            clearAllButton: '#clearAllButton',
            scaleButton: '#scaleButton',
            speed: '#speed'
        },

        control: {
            speed: {
                change: function(){
                    INTERVAL = 240-Ext.getCmp('speed').getValue()[0];
                    console.log(INTERVAL);
                    window.clearInterval(mainLoop);
                    mainLoop = window.setInterval(this.gameLoop, INTERVAL)
                }
            },
            startButton: {
                tap: 'startPlaying'
            },
            evolveButton: {
                tap: function(){
                    if(CRAZINESS===0){
                        CRAZINESS=2;
                        Ext.getCmp('Grid').isEvolving = true;
                        Ext.getCmp('evolveButton').setUi('action');
                        Ext.getCmp('evolveButton').setText('Evolve');
                    }
                    else if(CRAZINESS===2){
                        CRAZINESS=4;
                        Ext.getCmp('evolveButton').setText('Mutate');
                    }
                    else if(CRAZINESS===4){
                        CRAZINESS=10;
                        Ext.getCmp('evolveButton').setText('CHAOS!');                        
                    }
                    else{
                        CRAZINESS=0;
                        Ext.getCmp('Grid').isEvolving = false;
                        Ext.getCmp('evolveButton').setUi('normal');
                        Ext.getCmp('evolveButton').setText('Normal');
                    }
                }
            },
            scaleButton: {
                tap: function(){
                    window.clearInterval(mainLoop);
                    var str;
                    if(Ext.getCmp('scaleButton').getText() === 'Minor'){
                        str = 'maj';
                        Ext.getCmp('scaleButton').setText('Major');
                    }
                    else{
                        str = 'min';
                        Ext.getCmp('scaleButton').setText('Minor');
                    }
                    for(i=0;i<SOUNDS;i++){
                        sounds[i] = document.createElement('audio');
                        sounds[i].setAttribute('src', 'resources/sounds/'+i+str+'.wav');
                        sounds[i].load();
                    }
                    mainLoop = window.setInterval(this.gameLoop,INTERVAL);

                }
            }
        }
    },
    
    startPlaying: function() {
        Ext.getCmp('mainView').setActiveItem(1);
    },

    gameLoop: function() {
        //var diff = timestamp - 
        for(i=0; i<SOUNDS; i++){
            if(Ext.getCmp('grid'+i+''+currentBeat).isOn){
                sounds[i].play();
            }
        } 
        Ext.getCmp('time'+''+currentBeat).setUi('decline');
        Ext.getCmp('time2'+''+currentBeat).setUi('decline');
        lastBeat = (currentBeat+15);
        if(lastBeat>=BEATS)lastBeat = lastBeat-16;
        console.log(lastBeat);
        Ext.getCmp('time'+''+lastBeat).setUi('normal');
        Ext.getCmp('time2'+''+lastBeat).setUi('normal');
        currentBeat++;
        xsToChange = [];
        ysToChange = [];
        newXs = [];
        xsToChange = [];
        newYs = [];
        if(currentBeat >= BEATS){
            //grow notes if evolve is on
            if(Ext.getCmp('Grid').isEvolving){
                for(i=0; i<SOUNDS; i++){
                    for(j=0; j<BEATS; j++){
                        if(Ext.getCmp('grid'+i+''+j).isOn){
                            if(Math.random()*10<CRAZINESS){
                                Ext.getCmp('grid'+i+''+j).fireAction('tap');
                                x = Math.floor(Math.random()*3)+i-1;
                                y = Math.floor(Math.random()*3)+j-1;
                                if(x>=0&&x<SOUNDS&&y>=0&&y<BEATS){
                                    newXs[newXs.length]=x;
                                    newYs[newYs.length]=y;
                                }
                                if(Math.random()*4<1){
                                    x = Math.floor(Math.random()*3)+i-1;
                                    y = Math.floor(Math.random()*3)+j-1;
                                    if(x>=0&&x<SOUNDS&&y>=0&&y<BEATS){
                                        newXs[newXs.length]=x;
                                        newYs[newYs.length]=y;
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(xsToChange.length);
                for(m=0;m<newXs.length;m++){
                    console.log('grid'+newXs[m]+''+newYs[m]);
                    Ext.getCmp('grid'+newXs[m]+''+newYs[m]).fireAction('tap');
                }
            }
            currentBeat = 0;
        }
    },

launch: function () {
    Ext.create('Ext.Container', {
        id: 'mainView',
        fullscreen: true,
        layout: 'card',
        items: [{
                xclass: 'SonicPanic.view.Main'
            }]
    });
    for(i=0;i<SOUNDS;i++){
        sounds[i] = document.createElement('audio');
        sounds[i].setAttribute('src', 'resources/sounds/'+i+'min.wav');
        sounds[i].load();
    }
    requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
    });
    Ext.getCmp('mainView').setActiveItem(0);
    mainLoop = window.setInterval(this.gameLoop, INTERVAL);
}
});
