
if (!this.js) { this.js = {}; }

( function (ns)
  {
    'use strict';

    if (!ns.util) { ns.util = {}; }

    ns.util.event = (function () {
			var event_click = "click",
          event_on_click = "onclick",
          event_on_mousedown = "onmousedown",
          event_on_mouseup = "onmouseup",
          event_pointer_down = "pointerdown",
          event_pointer_up = "pointerup",
          event_ms_pointer_down = "MSPointerDown",
          event_ms_pointer_up = "MSPointerUp",
          event_touch_start = "touchstart",
          event_touch_end = "touchend",
      // State flags
          pointerEventsConfigured = false,
      // Return object
          that = {};

      /**
       * Configure pointer event names for older versions of IE
       */
      function configurePointerEvents () {
				if (!window.PointerEvent) {
					event_pointer_down = event_ms_pointer_down;
					event_pointer_up = event_ms_pointer_up;
				}
        pointerEventsConfigured = true; // Set state flag
			}
      // Event types

      /**
       * Add click
       * @param {object} scope -
       * @param {Object} target - EventTarget DOM node
       * @param {Boolean} addClickListener - Indicates whether to add default Mouse click functionality
       * @param {Function} startHandler - 'click' start handler function
       * @param {Array} startArguments - Arguments array for the 'click' start function
       * @param {Function} endHandler - 'click' end handler function
       * @param {Array} endArguments - Arguments array for the 'click' end function
       */
      function addClick (scope, target, addClickListener, startHandler, startArguments, endHandler, endArguments) {
				// If pointer events aren't configured then configure
				if (!pointerEventsConfigured) { configurePointerEvents(); }

        /**
         * Start handler
         * @param {Object} e - Event object
         */
				function handleStart (e) {
          // console.log("handleStart : 1");
					// Prevent default action (?Can this can be done when the actual handler method) // e.preventDefault();

					// Remove mouse & start events
          /*jshint validthis: true */
          this.removeEventListener(event_click, handleClick, false);// Remove any mouse click event
					this.removeEventListener(touchStart, handleStart, false);// Touch start event
					this.removeEventListener(pointerDown, handleStart, false);// Pointer start event

					// Add end event listener
					switch (e.type) {
						case event_touch_start:
							this.addEventListener(event_touch_end, handleEnd, false);
							break;
						case event_pointer_down:
							this.addEventListener(event_pointer_up, handleEnd, false);
							break;
					}

					// Call start 'click' handler (If defined)
					if (startHandler) {
						startArguments.unshift(e);// Push event object into the supplied arguments array
					  startHandler.apply(scope, startArguments);// Call the start 'click' handler with the supplied arguments
					}
        }

				/**
         * End handler
         * @param {Event Object} e - Event object
         */
				function handleEnd (e) {
					// console.log("handleEnd : ");
					// Prevent default // e.preventDefault();

          /*jshint validthis: true */

          // Toggle event listeners from 'end' to 'start'
					switch (e.type) {
						case event_touch_end:
							//console.log("handleEnd : 'evTouchEnd'");
							this.removeEventListener(event_touch_end, handleEnd, false);
							this.addEventListener(event_touch_start, handleStart, false);
							break;

						case event_pointer_up:
							//console.log("handleEnd : 'evPointerUp'");
							this.removeEventListener(event_pointer_up, handleEnd, false);
							this.addEventListener(event_pointer_down, handleStart, false);
							break;
					}

					// Call the end 'click' handler (if supplied)
					if (endHandler) { processEnd(e); }
				}

				/**
         * Mouse click handler
         */
				function handleClick (e) {
					if (endHandler) { processEnd(e); } // Call the end 'click' handler (if supplied)
				}

        /**
         * Process end of 'click' event sequence
         */
				function processEnd (e)	{
					if (!endArguments) endArguments = [];

					// IE 8 nastiness!!
					if(!e.target && e.srcElement) {
						e.target /*e["target"]*/ = e.srcElement;
					}

					endArguments.unshift(e); // Push event object into the supplied arguments array
				  endHandler.apply(scope, endArguments);	// Call the end 'click' handler with the supplied arguments
				}

				// Add event handlers
				if (target.addEventListener) {
					target.addEventListener(touchStart, handleStart, false);
					target.addEventListener(pointerDown, handleStart, false);

					if (addClickListener) { target.addEventListener(click, handleClick, false); }

				}	else if (target.attachEvent) { // ie < 9
					target.attachEvent(onClick, handleClick);
				}
  		}

      // Assign public methods and return
      that.addClick = addClick;

      // Return that
      return that;
    })();

  }
)(this.js);
