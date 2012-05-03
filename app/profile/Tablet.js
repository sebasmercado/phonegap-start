/**
 * @author sebas
 */
Ext.define('Pic.profile.Tablet', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Tablet',
        controllers: ['Main'],
        views: ['Detailcontainer', 'Main']
    },

    isActive: function() {    	
        return Ext.os.is.Tablet; 
    }, 
    
    launch: function() {	
        Ext.create('Pic.view.tablet.Main');
    }
});