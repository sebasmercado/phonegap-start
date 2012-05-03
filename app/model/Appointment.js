/**
 * @author sebas
 */
Ext.define('Pic.model.Appointment', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'firstname',  type: 'string'},
            {name: 'lastname',  type: 'string'},
            {name: 'email',  type: 'string'},
            {name: 'phone',  type: 'string'},
            {name: 'best',  type: 'string'},
            {name: 'sel',  type: 'string'},
            {name: 'date',   type: 'date'},
            {name: 'time', type: 'string'},
            {name: 'ins', type: 'string'},
            {name: 'captcha', type: 'string'},
            {name: 'comment', type: 'string'}
        ],
        validations: [
        	{type:'presence', field:'firstname', friendlyName: "First Name"},
        	{type:'presence', field:'lastname', friendlyName: "Last Name"},
        	{type:'presence', field:'email', friendlyName: "EMail"},
        	{type:'presence', field:'phone', friendlyName: "Contact Phone"},
        	{type:'presence', field:'captcha', friendlyName: "Security Code"},
        	{type:'email', field:'email', friendlyName: "EMail"}
        ]
    }
});