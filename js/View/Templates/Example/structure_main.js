//key is id, value is template name
/**
 The Language setting of controller which named Example
 */
var defineModule = [
    'View/Templates/Example/language/Japanese',
    'View/Templates/Example/language/English',
    'View/Templates/Example/language/Chinese',
];
define({
    /**
     The setting data is correspond to M_banner(div) in main.hbs
     */
    'banner': {
        /**
         Use the component(html template -- Handlebars)
         */
        html: 'Components/Banner/Particles',
        /**
         Set the css style on html template of component
         */
        css: 'Components/Banner/Particles',
        /**
          Execute the javascript when after the html template of component rendered on page
         */
        js: 'Components/Banner/Particles',
    }
});
