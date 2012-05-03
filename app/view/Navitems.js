/**
 * @author sebas
 */
Ext.define('Pic.view.Navitems', {
    extend: 'Ext.NestedList',
    xtype: 'navitems',
    config: {
    	id: 'mainNavigation',
        title: 'Diagnostic Imaging Services',
        store: 'Navitems'		
    },    
    getItemTextTpl: function(node) {
        return '<div class="headshot" style="background-image:url(css/images/{icon});"></div><span class="itmtext">{text}</span>';
    },
    getTitleTextTpl: function() {
        return '{text}';
    }    
});