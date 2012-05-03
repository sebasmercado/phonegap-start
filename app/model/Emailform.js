/**
 * @author sebas
 */
Ext.define('Pic.model.Emailform', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'email',  type: 'string'},
            {name: 'captcha', type: 'string'}
        ],
        validations: [
        	{type:'presence', field:'email', friendlyName: "EMail"},
        	{type:'presence', field:'captcha', friendlyName: "Security Code"},
        	{type:'email', field:'email', friendlyName: "EMail"}
        ]
    }
});