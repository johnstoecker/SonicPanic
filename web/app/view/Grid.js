Ext.define('SonicPanic.view.Grid', {
    extend: 'Ext.Container',
    requires: ['SonicPanic.view.Cell'],
    id: 'Grid',
    config: {
    },
    
    initialize: function () {
        this.callParent();
        var gridRows = [];        
        var soundPanel = Ext.create('Ext.Container', {
            id: 'soundPanel'
        });
        timeRow2 = Ext.create('Ext.Panel', {
            layout: {
                type: 'hbox',
                pack: 'center'
            }
        });
        for(m=0; m<BEATS; m++){
            var timeButton = Ext.create('Ext.Button',{
                id: 'time2'+m,
                ui: 'normal',
                width: '50px',
                height: '5px'
            });
            timeRow2.add(timeButton);
        }
        soundPanel.add(timeRow2);
        for(i=0; i<SOUNDS; i++){
            gridRows[i] = Ext.create('Ext.Panel', {
                layout: {
                    type: 'hbox',
                    pack: 'center'
                }
            });
            k = SOUNDS-i-1;
            console.log(k+' '+i);
            for(j=0; j<BEATS; j++){
                var cell = Ext.create('SonicPanic.view.Cell', {
                    id: 'grid'+k+''+j,
                    isOn: false,
                    listeners: {
                        tap: function() {
                            this.isOn = !this.isOn;
                            if(this.isOn)
                                this.setUi('action');
                            else
                                this.setUi('normal');
                        }
                    }
                });
                gridRows[i].add(cell);

            }
            soundPanel.add(gridRows[i]);
        }
        timeRow = Ext.create('Ext.Panel', {
            layout: {
                type: 'hbox',
                pack: 'center'
            }
        });
        for(m=0; m<BEATS; m++){
            var timeButton = Ext.create('Ext.Button',{
                id: 'time'+m,
                ui: 'normal',
                width: '50px',
                height: '5px'
            });
            timeRow.add(timeButton);
        }
        soundPanel.add(timeRow);
        this.add(soundPanel);
    }
});