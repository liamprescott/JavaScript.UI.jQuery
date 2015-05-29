

if (!this.js) { this.js = {}; }

( function(ns, $)
  {
    'use strict';

    ns.accordion = function (data)
    {

      var dp = "data-acc-initstate";

      // Create return object
      var that = {};


      // Initialisation
      function init ()
      {
        // Assign event handler
        var mod = data.module,
            items = data.items = mod.find(data.$item), // Find and store all states
            c = data.$itemTrigger,
            links = data.itemLinks = [];

        // Find all links within each state, store and assign click handler
        items.each(function(i){ // One item at a time so we can identify associated parent item
          var item = $(this);
          links[i] = item.find(c).each(function(j)
          {
            $(this).on("click", function(e) { updateState(data, item, i); });
          });
        });

        // Set initial state
        // Extract ID
        // Call setState
      }


      //
      function setState (data, id)
      {
        // Validate id
        // Get item by id
        //
      }


      // Event handlers
      function updateState (data, item, itemId)
      {
          //console.log("i've been clicked..... lets set some state... itemId = " + itemId + " // item = " + item.attr("class"));
          var c = data.cssClassItemVisible,
              show = !item.hasClass(c);

          // If setup then close all other states
          if (data.modeSingular){ closeAllItems(data); }
          //
          displayItem(item, show, c);
          configureLinks(data.itemLinks[itemId], show, data.cssClassTriggerVisible);

      }


      // Show / hide specific state
      //
      function displayItem (item, show, cssClass)
      {
        if (show) {
          item.addClass(cssClass);
        } else {
          item.removeClass(cssClass);
        }
      }


      // @param {Array} items
      function closeAllItems (data)
      {
        var cItem = data.cssClassItemVisible;
        var cTrigger = data.cssClassTriggerVisible;
        data.items.each(function(i)
        {
           displayItem($(this), false, cItem);
           configureLinks(data.itemLinks[i], false, cTrigger);
        });
      }


      // Configure links within an item
      //
      function configureLinks (links, show, cssClass)
      {
        var i,
            l = links.length-1;
        for (i = l; i >= 0; i--) {
          (show) ? $(links[i]).addClass(cssClass) : $(links[i]).removeClass(cssClass);
        }
      }

      //Run initialisation
      init();

      // Return object
      return that;

    };

})(this.js, jQuery);



/*
 * Initialisation example
 */
$(document).ready(
  function ()
  {
    // Create accordion
    var accordion = js.accordion(
      {
        name : 'Accordion Example 1', //
        module : jQuery(".js-example-acc"),            // Module target

        // Targeting strings
        $item : '.js-acc__item',
        $itemTrigger : '.js-acc__link',
        $itemBody : '.js-acc__body',

        // Classnames
        cssClassItemVisible : "acc__item--is-open",
        cssClassTriggerVisible : "acc__item__link--is-active",


        // Feature configuration
        modeSingular : true,
        initState : null,

        // Created internally
        items : null

      }
    );
  }
);


/*

  <div class="js-acc">
    <div class="js-acc__item">
        <div class="js-acc__link"></div>
        <div class="js-acc__body"></div>
    </div>
    <div class="js-acc__item">
        <div class="js-acc__link"></div>
        <div class="js-acc__body"></div>
    </div>
    <div class="js-acc__item">
        <div class="js-acc__link"></div>
        <div class="js-acc__body"></div>
    </div>
    <div class="js-acc__item">
        <div class="js-acc__link"></div>
        <div class="js-acc__body"></div>
    </div>
    <div class="js-acc__item">
        <div class="js-acc__link"></div>
        <div class="js-acc__body"></div>
    </div>
  </div>

*/


/*
DOM elements should not matter - class names do!
Class names should be configurable
Init should be localised to module so multiple modules can be independently instantiated with different props (e.g. class names)
Should be able to configure whether opening an item closes all others or leaves all others in their current state

On item link click:
                ? (if mode = only one item open at a time)
                                - find all items within module
                                - remove open class from all
                - Add open class to item links parent (js-acc__item)

...if you're feeling brave.... add ability to specify a start state.....

See toggle.js for some guidance


*/
