/**
 * @author sebas
 */
Ext.define('Pic.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        name: 'Phone',
        controllers: ['Main'],
        views: ['Main']
    },

    isActive: function() {
        return Ext.os.is.Phone || Ext.os.is.Desktop;        
    }, 
    
    launch: function() {
        Ext.create('Pic.view.phone.Main');
    }
});