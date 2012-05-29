Ext.define('SonicPanic.view.Menu', {
    extend: 'Ext.Container',
    config: {
        layout: 'hbox',
        items: [{
            xtype: 'button',
            text: 'Normal',
            id: 'evolveButton',
            width: 150
        },{
            xtype: 'button',
            text: 'Clear All',
            id: 'clearAllButton',
            ui: 'decline-round',
            width: 150,
            listeners: {
                tap: function(){
                    for(i=0; i<SOUNDS; i++){
                        for(j=0; j<BEATS; j++){
                            Ext.getCmp('grid'+i+''+j).isOn = false;
                            Ext.getCmp('grid'+i+''+j).setUi('normal');
                        }
                    }
                }
            }
        },{
            xtype: 'button',
            text: 'Minor',
            id: 'scaleButton',
            width: 150
        },{
            xtype: 'sliderfield',
            label: 'Speed',
            id: 'speed',
            minValue: 0,
            maxValue: 80,
            increment: 5,
            value: 40,
            width: 250
        }]
    }
});