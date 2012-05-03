/**
 * @author sebas
 */
Ext.define('Pic.view.Directions', {
    extend: 'Ext.Panel',    
    config : {
    	record: "",
    	layout: 'fit',
	    items  : [
	    	{ xtype: 'mapview' }
	    ]
	},
	changeRecord: function(record) {
		this.setRecord(record);
		var map = this.getItems().items[0];
		map.setRecord(this.getRecord());
		//map.codeAddress();		
		map.getDirections();		
	}
 });