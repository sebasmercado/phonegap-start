/**
 * @author sebas
 */
Ext.define('Pic.view.phone.Main', {
        extend: 'Ext.Container',
    xtype: 'mainview',
    config: {
    	fullscreen: true,
    	layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },  
        items: [        	
        	{
        		xtype: 'navitems'
        	}
        ]
    }
});