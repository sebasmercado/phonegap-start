/**
 * @author sebas
 */
var infoWindow = new google.maps.InfoWindow({
    content: 'Sencha HQ'
});
//var geocoder = new google.maps.Geocoder();
Ext.define("Pic.view.MapView", {
    extend: "Ext.Map",
    xtype: 'mapview',        
    config: {
    	zIndex: 100,
        //useCurrentLocation: true,
        address: "", //Adress to look for in case not looking for current position
		geocoder: new google.maps.Geocoder(),
		renderer: new google.maps.DirectionsRenderer(),
		dirService: new google.maps.DirectionsService(),
        mapOptions : {		
			zoom : 15,
			mapTypeId : google.maps.MapTypeId.HYBRID,
			navigationControl: true,
			navigationControlOptions: {
			    style: google.maps.NavigationControlStyle.DEFAULT
			},
			draggable: true,
			scrollWheel: true
	    },
		listeners: {
			initialize: function(map, opts) {
				map.getRenderer().setMap(map.getMap());
			}
		}
    },
    codeAddress: function() {    	
		var address = this.getRecord().get('address'), map = this.getMap(), telfax = this.getRecord().get('telfax');
		var geocoder = this.getGeocoder();
    	if (map) {    			
		    geocoder.geocode( { 'address': address}, function(results, status) {
		      if (status == google.maps.GeocoderStatus.OK) {
		        map.setCenter(results[0].geometry.location);
		        var marker = new google.maps.Marker({
		            map: map,
		            position: results[0].geometry.location,
		            icon: 'css/images/map_pin.png'
		        });
		        var addrCmp = results[0].address_components;
		        infoWindow.content = "<div class='cmkrs-map'><h2>Professional Imaging Centers</h2><h3>"+addrCmp[2].long_name+"</h3><p>"+addrCmp[0].long_name+" "+addrCmp[1].long_name+"</p>"+"<p>"+addrCmp[4].long_name+" "+addrCmp[6].long_name+"</p>"+"<p>"+telfax+"</p></div>";
		        infoWindow.open(map, marker);
		      } else {
		        alert("Geocode was not successful for the following reason: " + status);
		      }
		    });
		}
	},
	getDirections: function(origin) {
		origin = Ext.getCmp('currentLocation').getLocation(); //"14962-14968 Huntcliff Park Way";
		if (origin != "Unknown") {
			destination = this.getRecord().get('address');
			var dirService = this.getDirService();
			var renderer = this.getRenderer();
			var me = this;
			dirService.route({origin: origin, destination: destination, travelMode: google.maps.DirectionsTravelMode.DRIVING}, function( result, status) {
				if (status == google.maps.DirectionsStatus.OK) {				
					renderer.setDirections(result);
				} else {
					me.codeAddress();
				}
			});
		} else {
			this.codeAddress();
		}
	}
})