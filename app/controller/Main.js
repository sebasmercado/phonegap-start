/**
 * @class Kitchensink.controller.Main
 * @extends Ext.app.Controller
 *
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('Pic.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        /**
         * @private
         */
        viewCache: [],

        refs: {
            nav: '#mainNavigation',
            main: 'mainview'
        },

        control: {
            nav: {
                itemtap: 'onNavTap'
            }
        },

        routes: {
            'demo/:id': 'showViewById',
            'menu/:id': 'showMenuById'
        },

        /**
         * @cfg {Ext.data.Model} currentDemo The Demo that is currently loaded. This is set whenever showViewById
         * is called and used by functions like onSourceTap to fetch the source code for the current demo.
         */
        currentDemo: undefined
    },
    /**
     * This is called whenever the user taps on an item in the main navigation NestedList
     */
    onNavTap: function(nestedList, list, index) {
        var record = list.getStore().getAt(index);		
        if (record.isLeaf()) {
        	var view = this.showViewById(record.get('id'));        	
        	if (record.get('page')) {
        		var http = (record.get('page').indexOf("http://") !== -1)?true:false;        		
        		var detailCard = this.getNav().getDetailCard();
        		var url = (http)?record.get('page'):'data/pages/' +  record.get('page');
        		Ext.Ajax.request({
				    url: url,
					success: function(response) {
				    	detailCard.setHtml(response.responseText);
				    	list.unmask();
					},
					failure: function() {
				    	detailCard.setHtml("Loading failed.");
				        list.unmask();
				    }
				});
        	} else if (record.get('address')) { //Maps
        		if (view !== null) {
        			view.changeRecord(record);
        		}
        	}
        }
    },	
	
    /**
     * Finds a given view by ID and shows it. End-point of the "demo/:id" route
     */
    showViewById: function(id) {
    	var view = null;
        var nav = this.getNav(),
            node = nav.getStore().getNodeById(id);

        view = this.showView(node);
        this.hideSheets();
        return view;
    },

    /**
     * @private
     * In the kitchen sink we have a large number of dynamic views. If we were to keep all of them rendered
     * we'd risk causing the browser to run out of memory, especially on older devices. If we destroy them as
     * soon as we're done with them, the app can appear sluggish. Instead, we keep a small number of rendered
     * views in a viewCache so that we can easily reuse recently used views while destroying those we haven't
     * used in a while.
     * @param {String} name The full class name of the view to create (e.g. "Kitchensink.view.Forms")
     * @return {Ext.Component} The component, which may be from the cache
     */
    createView: function(name) {
        var cache = this.getViewCache(),
            ln = cache.length,
            limit = 20,
            view, i, oldView;

        Ext.each(cache, function(item) {
            if (item.viewName === name) {
                view = item;
                return;
            }
        }, this);

        if (view) {
            return view;
        }

        if (ln >= limit) {
            for (i = 0; i < ln; i++) {
                oldView = cache[i];
                if (!oldView.isPainted()) {
                    oldView.destroy();
                    cache.splice(i, 1);
                    break;
                }
            }
        }

        view = Ext.create(name);
        view.viewName = name;
        cache.push(view);
        this.setViewCache(cache);

        return view;
    },

    /**
     * @private
     * Returns the full class name of the view to construct for a given Demo
     * @param {Kitchensink.model.Demo} item The demo
     * @return {String} The full class name of the view
     */
    getViewName: function(item) {
        var name = item.get('view') || item.get('text'),
            ns   = 'Pic.view.';

        if (name == 'TouchEvents') {
            if (this.getApplication().getCurrentProfile().getName() === 'Tablet') {
                return ns + 'tablet.' + name;
            } else {
                return ns + 'phone.' + name;
            }
        } else {
            return ns + name;
        }
    },
    
    /**
     * we iterate over all of the floating sheet components and make sure they're hidden when we
     * navigate to a new view. This stops things like Picker overlays staying visible when you hit
     * the browser's back button
     */
    hideSheets: function() {
        Ext.each(Ext.ComponentQuery.query('sheet'), function(sheet) {
            sheet.setHidden(true);
        });
    }    
});
