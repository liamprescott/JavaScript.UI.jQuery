
if (!this.js) { this.js = {}; }

( function (ns)
  {
      'use strict';
      // Toggle functionality
      ns.toggle = function (data) {

        var that = {};

        //
        // Initialisation
        //
        var init = function ()
        {
          // Assign event handler
          data.trigger.on("click", function (e){ handleClick(e, data); });
        },

        //
        // Event handlers
        //
        handleClick = function (e, data)
        {
          // Toggle target class on target
          var tgt = data.module;
          var c = data.className;
          (tgt.hasClass(c)) ? tgt.removeClass(c) : tgt.addClass(c);
        };

        // Run initialisation
        init();

        return that;
    };


  }
)(this.js);




$(document).ready
(
  function (e)
  {
    // Create toggle
    var toggle1 = js.toggle(
        {
          name: "Toggle 1",
          module: jQuery(".js-toggle"),
          trigger: jQuery(".js-toggle-trigger"),
          className: "is-open"
        }
    );


    /*
    var toggle2 = js.toggle(
        {
          name:"Toggle 2",
          module: jQuery(".js-toggle-other"),
          trigger: jQuery(".js-toggle-other"),
          className: "im-a-banana"
        }
    );
    */


  }
);


/*
var toggle2 = toggle(
    {name:"b"}
);
*/
