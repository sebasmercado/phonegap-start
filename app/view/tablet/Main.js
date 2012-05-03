/**
 * @author sebas
 */
Ext.define('Pic.view.tablet.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    config: {
    	fullscreen: true,
    	layout: {
            type: 'card',
            animation: {
                type: 'slide',
                direction: 'left',
                duration: 250
            }
        },  
        items: [
        	{
        		xtype: 'container',
        		html: '<div class="header"><div class="himg"></div></div>',
        		docked:'top'
        	},
        	{
        		xtype: 'currentLocation',
        		docked: 'bottom'
        	},
        	{
        		xtype: 'navitems',
        		docked:'left',
        		width : 350
        	},
        	{
        		id: 'launchscreen',
                cls : 'card',
				styleHtmlContent: true,				
                scrollable: true,
                html: '<h1>Welcome to Professional Imaging Centers</h1><p>We provide our patients with superior diagnostic imaging services in a caring, safe and convenient environment. Our qualified professionals are here to exceed patients and referring physicians expectations when it comes to care and attention to details.</p><p>It is our mission to earn your trust and become your preferred choice for your Orlando, Kissimmee, Winter Springs and Heathrow - Lake Mary MRI, Xray, CT Scan, Ultrasound, Digital Mammography and Bone Density / Dexa and all other diagnostic imaging needs.</p><p>We understand when patients look to us for imaging and health screening, they are also looking for peace of mind. That\'s why we offer Board Certified radiologists, highly trained technologists, state-of-the-art medical equipment, and advanced technology.</p><p>We also provide the highest quality in customer service. Our staff and technical team view the imaging process from the patient\'s perspective. We are committed to answering questions, providing quick and accurate results, and easing the patient\'s tensions through compassionate care.</p><p>We strive to be the only Orlando, Kissimmee, Winter Springs, Heathrow - Lake Mary MRI / Xray facility you will ever need, so contact us today.</p><p>Professional Imaging Centers: It\'s what\'s inside that counts.</p><p>We look forward to taking care of you.</p>' 
        	}
        ]
    }
});