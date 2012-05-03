/**
 * @author sebas
 */
Ext.define('Pic.view.Currentlocation', {
    extend: 'Ext.Panel',
    xtype: 'currentLocation',
    config: {            
            id: 'currentLocation',
            location: 'Unknown',
            html: '<div class="footer"><div class="icon" style="background-image:url(css/images/currentlocation.png);"></div><div id="cmkrs-location" class="cmk-label">Getting Location...</div></div>',
            geo:  new Ext.util.Geolocation(),
           	listeners: {
            	initialize: function(locPanel, opts) {  					
            		this.getGeo().setAutoUpdate(true);  		
	        		this.getGeo().on('locationupdate',function(geo){						
	        			if (geo) {
	        				var latlng = new google.maps.LatLng(geo.getLatitude(), geo.getLongitude());							
							var geocoder = new google.maps.Geocoder();
							if (latlng) {
								var geoRequest = { location: latlng };
								geocoder.geocode(geoRequest, function(result, status){								
									if (status === "OK") {									
										locPanel.setLocation(result[1].formatted_address);
										locPanel.setHtml('<div class="footer"><div class="icon" style="background-image:url(css/images/currentlocation.png);"></div><div id="cmkrs-location" class="cmk-label">'+locPanel.getLocation()+'</div></div>');										
									}
								});
							} else {
								locPanel.setLocation("Browser does not support Geolocation");
								locPanel.setHtml('<div class="footer"><div class="icon" style="background-image:url(css/images/currentlocation.png);"></div><div id="cmkrs-location" class="cmk-label">'+locPanel.getLocation()+'</div></div>');								
							}            				 
	        			}	        				        				        			
	        		});	        		
            	}	
            }
    }
 });
            
