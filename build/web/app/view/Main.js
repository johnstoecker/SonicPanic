Ext.define('SonicPanic.view.Main', {
    extend: 'Ext.Container',
    config: {
        centered: true,
        layout: 'vbox',
        items: [{
            xclass: 'SonicPanic.view.Menu'
        },{
            xclass: 'SonicPanic.view.Grid',
            isEvolving: false
        }
        ]
    }
});