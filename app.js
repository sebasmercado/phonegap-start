//<debug>
Ext.Loader.setPath({
    'Ext.plugin': 'plugin'
});
//</debug>

Ext.application({
    name: 'Pic',
	requires: [
        'Ext.dataview.NestedList',
        'Ext.navigation.Bar',
        'Ext.Map'
    ],
	//Default profile is Desktop
    profiles: ['Phone', 'Tablet'],
	
	views:[		
		'Main',		
		'Page',
		'Location',
		'Navitems',
		'MapView',
		'Currentlocation'
	],
	models: ['Appointment', 'Emailform'],
	stores: [
		'Navitems'
	]
});