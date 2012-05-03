/**
 * @author sebas
 */
Ext.define('Pic.store.Navitems', {
	extend: 'Ext.data.TreeStore',
	config: { 	
		fields: ['text', "icon", "page", "view", "address", "telfax"],		
		autoLoad: true, 
		defaultRootProperty: 'items',
		proxy: {
			type: 'ajax',
			url: 'data/navigation.json'
		}
	}
})
