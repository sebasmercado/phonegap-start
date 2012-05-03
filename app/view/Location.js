/**
 * @author sebas
 */
Ext.define('Pic.view.Location', {
    extend: 'Ext.Container',
    xtype: 'location',

    config: {
        title: 'Location Info',
        baseCls: 'x-show-contact',
        layout: 'vbox',

        items: [
            {
                id: 'content',
                tpl: [
                    '<div class="top">',
                        '<div class="headshot" style="background-image:url(resources/images/headshots/{headshot});"></div>',
                        '<div class="name">{firstName} {lastName}<span>{title}</span></div>',
                    '</div>'
                ].join('')
            },
            {
                xtype: 'map',
                flex: 1,
                mapOptions: {
                    zoomControl: false,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoom: 13
                }
            }
        ],

        record: null
    }
}); 