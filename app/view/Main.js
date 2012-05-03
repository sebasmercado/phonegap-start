/**
 * @author sebas
 */
Ext.define('Pic.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
	config: {
    	layout: {
            type: 'card',
            animation: {
                type: 'flip',
                direction: 'left',
                duration: 250
            }
        },          
        items: [
        	{
        		xtype: 'container',
        		html: '<div class="header"><div class="himg"></div></div>',
        		docked:'top'
        	},
        	{
        		xtype: 'currentLocation',
        		docked: 'bottom'
        	},
        	{
        		xtype: 'navitems',
        		docked:'left',
        		detailCard: true,
        		width : 350
        	}
        ]
    }
});