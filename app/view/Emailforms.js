/**
 * @author sebas
 */
Ext.define('Pic.view.Emailforms', {
    extend: 'Ext.form.Panel',
    config: {
            xtype: 'formpanel',
            id: 'emailForms',
            iconCls: 'refresh',
            record: new Pic.model.Emailform(),
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Email Forms',
                    instructions: 'Please enter the information above in order to receive the Forms.',
                    defaults: {
                        labelWidth: '35%'
                    },                    
                    items: [
                        {
                            xtype      : 'emailfield',
                            name       : 'email',
                            label      : 'Email',
                            placeHolder: 'me@youremailprovider.com',
                            clearIcon  : true,
                            required: true
                        },
                        {
                        	xtype: 'textfield',
                        	name: 'captcha',
                        	label: 'Enter Security Code:',
                        	placeHolder   : 'Type the characters you see below.',
                        	/*html: '<img src="server-scripts/CaptchaSecurityImages.php?width=100&amp;height=40&amp;characters=5" />'*/
                        	html: '<span id="captch"></span>'                        	
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
				            text: 'Send me the Forms',
				            handler: function() {
				            	var form = this.parent.parent;
				            	var formValues = form.getValues();
				            	form.getRecord().setData(formValues);
				            	var errors = form.getRecord().validate();
				            	if (errors.isValid()) {
					                Ext.Ajax.request({
									    url: 'server-scripts/emailforms.php', 
									    params: form.getValues(),
									    success: function(response) {
									        if (response.responseText == "OK") {
									            Ext.Msg.alert('Success', 'Thanks for contacting us! Shortly you\'ll receive the forms.');												
												form.reset();									            
												var captcha = Ext.getDom('captch');
												captcha.innerHTML = "";
												var image = document.createElement("img");
												image. src = "http://picfl.com/CaptchaSecurityImages.php?width=100&height=40&characters=5";
												captcha.appendChild(image);
									        } else {
									            Ext.Msg.alert('Fail', 'Hmm, that did not work, please try again.');
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
					var captcha = Ext.getDom('captch');
					captcha.innerHTML = "";
					var image = document.createElement("img");
					image. src = "http://picfl.com/CaptchaSecurityImages.php?width=100&height=40&characters=5";
					captcha.appendChild(image);
				}
				
			}              
       }
}); 