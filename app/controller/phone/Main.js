/**
 * @class Kitchensink.controller.phone.Main
 * @extends Kitchensink.controller.Main
 *
 * This is the Main controller subclass for the 'phone' profile. Most of the functionality required for this controller
 * is provided by the Kitchensink.controller.Main superclass, but we do need to add a couple of refs and control
 * statements to provide a slightly different behavior for the phone.
 *
 * The Main superclass provides a couple of capabilities that we use here. Firstly it sets up a listener on the main
 * navigation NestedList and redirects to the appropriate url for each view. For example, tapping on the 'Forms' item
 * in the list will redirect to the url 'demos/forms'.
 *
 * Secondly, it sets up a route that listens for urls in the form above and calls the controller's showView function
 * whenever one is detected. The showView function then just shows the appropriate view on the screen.
 *
 */
Ext.define('Pic.controller.phone.Main', {
    extend: 'Pic.controller.Main',

    config: {
        control: {
            nav: {
                back: 'onBackTap'
            }
        }
    },


    /**
     * For a given Demo model instance, shows the appropriate view. This is the endpoint for all routes matching
     * 'demo/:id', so is called automatically whenever the user navigates back or forward between demos.
     * @param {Kitchensink.model.Demo} item The Demo model instance for which we want to show a view
     */
    showView: function(item) {
         var nav    = this.getNav(),
            title  = item.get('text'),
            view   = this.createView(this.getViewName(item)),
            layout = nav.getLayout(),
            anim   = item.get('animation'),
            initialAnim = layout.getAnimation(),
            newAnim;

        if (anim) {
            layout.setAnimation(anim);
            newAnim = layout.getAnimation();
        }
				
        nav.setDetailCard(view);
        nav.goToNode(item.parentNode);
        nav.goToLeaf(item);        

        if (newAnim) {
            newAnim.on('animationend', function() {
                layout.setAnimation(initialAnim);
            }, this, { single: true });
        }
        return view;
    }
});