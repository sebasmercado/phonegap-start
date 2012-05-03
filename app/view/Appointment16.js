/**
 * @author sebas
 */
Ext.define('Pic.view.Appointment16', {
    extend: 'Ext.form.Panel',
    config: {
            xtype: 'formpanel',
            id: 'apptForm',
            iconCls: 'refresh',
            record: new Pic.model.Appointment(),
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Contact Us / Make appointment',
                    instructions: 'Please enter the information above.',
                    defaults: {
                        labelWidth: '35%'
                    },                    
                    items: [
                        {
                            xtype         : 'textfield',
                            name          : 'firstname',
                            label         : 'First Name',
                            placeHolder   : 'Type your name here',
                            autoCapitalize: true,
                            required      : true,
                            clearIcon     : true
                        },
                        {
                            xtype         : 'textfield',
                            name          : 'lastname',
                            label         : 'Last Name',
                            placeHolder   : 'Type your last name here',
                            autoCapitalize: true,
                            required      : true,
                            clearIcon     : true
                        },
                        {
                            xtype      : 'emailfield',
                            name       : 'email',
                            label      : 'Email',
                            placeHolder: 'me@youremailprovider.com',
                            clearIcon  : true,
                            required: true
                        },
                        {
                            xtype         : 'textfield',
                            name          : 'phone',
                            label         : 'Contact Phone',
                            placeHolder   : 'Type a phone number',
                            required      : true,
                            clearIcon     : true
                        },
                        {
                            xtype         : 'textfield',
                            name          : 'best',
                            label         : 'Service Requested',
                            placeHolder   : 'Type the service you\'re requesting',
                            required      : true,
                            clearIcon     : true
                        },
                        {
                            xtype: 'selectfield',
                            name : 'sel',
                            label: 'Location Requested',
                            options: [
                                {
                                    text : 'Orlando',
                                    value: 'orlando'
                                },
                                {
                                    text : 'Kissimmee',
                                    value: 'kissimmee'
                                },
                                {
                                    text : 'Winter Springs',
                                    value: 'wintersprings'
                                },
                                {
                                    text : 'Lake Mary',
                                    value: 'lakemary'
                                }
                            ]
                        },
                        {
                            xtype: 'datepickerfield',
                            destroyPickerOnHide: true,
                            name : 'date',
                            label: 'Date Requested',
                            value: new Date(),
                            picker: {
                                yearFrom: 1990
                            },
                            required: true
                        },
                        {
                            xtype         : 'textfield',
                            name          : 'time',
                            label         : 'Time Requested',
                            placeHolder   : 'Type what time would be of your convenience.',
                            required      : true,
                            clearIcon     : true
                        },
                        {
                            xtype         : 'textfield',
                            name          : 'ins',
                            label         : 'Insurance Company',
                            required      : true,
                            clearIcon     : true
                        },
                        {
                        	xtype: 'textfield',
                        	name: 'captcha',
							id: 'captcha',
                        	label: 'Enter Security Code:',
                        	placeHolder   : 'Type the characters you see below.',
                        	/*html: '<img src="server-scripts/CaptchaSecurityImages.php?width=100&amp;height=40&amp;characters=5" />'*/
                        	html: '<span id="app_captch"></span>'                        	
                        },
                        {
                        	xtype: 'textfield',
                        	name: 'comment',
                        	label: 'Message:',
                        	placeHolder   : 'Write a message to us.'                	
                        }                   
                    ]
                },
                {
				    xtype: 'toolbar',
				    docked: 'bottom',
				    layout: { pack: 'center' },
				    items: [
				        {
				            xtype: 'button',
				            name: 'sub',
				            text: 'Make Appointment',
				            handler: function() {
				            	var form = this.parent.parent;
				            	var formValues = form.getValues();
				            	form.getRecord().setData(formValues);
				            	var errors = form.getRecord().validate();
				            	if (errors.isValid()) {
					                Ext.Ajax.request({
									    url: 'server-scripts/contact.php', //THis is the form values
									    params: form.getValues(),
									    success: function(response) {
									        if (response.responseText == "OK") {
									            Ext.Msg.alert('Success', 'Thanks for contacting us! Shortly you\'ll be contacted.');
									            form.reset();
												var captcha = Ext.getDom('app_captch');
												captcha.innerHTML = "";
												var image = document.createElement("img");
												image. src = "http://picfl.com/CaptchaSecurityImages.php?width=100&height=40&characters=5";
												captcha.appendChild(image);
									        } else {
									            Ext.Msg.alert('Fail', 'Hmm, that did not work, please try again.<br>Cause: '+response.responseText);
									        }
									    },
									    failure: function(response) {
									    	Ext.Msg.alert('Fail','Hmmm... something failed.');
									    }
									});
								} else {
									var errMsg = "";
									errors.each(function(item, index, lenght){
										errMsg += "<b>"+item.getField()+"</b> "+item.getMessage()+"<br />";
										return true;
									});
									Ext.Msg.alert("Error", errMsg);
								}
				            }
				        }
				    ]
                }
            ],
			listeners: {
				show: function(form, opts) {
					var captcha = Ext.getDom('app_captch');
					captcha.innerHTML = "";
					var image = document.createElement("img");
					image. src = "http://picfl.com/CaptchaSecurityImages.php?width=100&height=40&characters=5";
					captcha.appendChild(image);
				}
				
			}
       }
}); 