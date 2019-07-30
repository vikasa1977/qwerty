// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
// 2/2013 jon: modified regex to display any match, not restricted to word boundaries.

// License at http://www.the-art-of-web.com/copyright.html

(function ( window, factory ) {

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // Expose a factory as module.exports in loaders that implement the Node
    // module pattern (including browserify).
    // This accentuates the need for a real window in the environment
    // e.g. var jQuery = require("jquery")(window);
    module.exports = function( w ) {
      w = w || window;
      if ( !w.document ) {
        throw new Error("Hilitor requires a window with a document");
      }
      return factory( w.document );
    };
  } else {
    if ( typeof define === "function" && define.amd ) {
      // AMD. Register as a named module.
      define( [], function() {
        return factory(document);
      });
    } else {
        // Browser globals
        window.Hilitor = factory(document);
    }
  }

// Pass this, window may not be defined yet
}(this, function ( document, undefined ) {


function Hilitor(id, tag, options)
{
  var targetNode = document.getElementById(id) || document.body;
  var hiliteTag = tag || "EM";
  var skipTags = new RegExp("^(?:SCRIPT|FORM|INPUT|TEXTAREA|IFRAME|VIDEO|AUDIO)$");
  var colors = ["#ff6"];
  var wordColor = [];
  var colorIdx = 0;
  var matchRegex = "";
  var openLeft = true;
  var openRight = true;
  options = options || {};
  if (typeof options.onStart !== 'function') {
    options.onStart = function () { /* return FALSE when you want to abort */ };
  }
  if (typeof options.onFinish !== 'function') {
    options.onFinish = function () { /* What you return here is returned by Hilitor.apply() */ return true; };
  }
  if (typeof options.onDoOne !== 'function') {
    options.onDoOne = function (node) { /* return FALSE when you want to skip the highlighting change for this node */ };
  }

  this.setMatchType = function(type)
  {
    switch(type)
    {
    case "left":
      openLeft = false;
      openRight = true;
      break;
    case "right":
      openLeft = true;
      openRight = false;
      break;
    default:
    case "open":
      openLeft = openRight = true;
      break;
    case "complete":
      openLeft = openRight = false;
      break;
    }
  };

  this.setRegex = function (input)
  {
    input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'\-]+/g, "|");
    var re = "(" + input + ")";
    if(!openLeft) re = "\\b" + re;
    if(!openRight) re = re + "\\b";
    matchRegex = new RegExp(re, "i");
  };

  this.getRegex = function ()
  {
    var retval = matchRegex.toString();
    retval = retval.replace(/^\/(\\b)?|(\\b)?\/i$/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  };

  // recursively apply word highlighting
  this.hiliteWords = function (node)
  {
    var i;

    if(!node)
      return;
    if(!matchRegex)
      return;
    if(skipTags.test(node.nodeName))
       return;
    if(node.nodeName === hiliteTag && node.className === "hilitor")
      return;

    if(node.hasChildNodes()) {
      for(i = 0; i < node.childNodes.length; i++) {
        this.hiliteWords(node.childNodes[i]);
      }
    }
    if(node.nodeType === 3) { // NODE_TEXT
      if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
        if (false !== options.onDoOne.call(this, node)) {
          if(!wordColor[regs[0].toLowerCase()]) {
            wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
          }

          var match = document.createElement(hiliteTag);
          match.appendChild(document.createTextNode(regs[0]));
          match.className = "hilitor";
          match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
          match.style.fontStyle = "inherit";
          match.style.color = "#000";

          var after = node.splitText(regs.index);
          after.nodeValue = after.nodeValue.substring(regs[0].length);
          node.parentNode.insertBefore(match, after);
        }
      }
    }
  };

  // remove highlighting
  this.remove = function ()
  {
    var arr, i;
    do {
      arr = document.querySelectorAll(hiliteTag + ".hilitor");
      i = 0;
      while (i < arr.length && (el = arr[i])) {
        // store the reference to the parent of the hilite tag as that node itself, 
        // and all its links, is invalidated in the next .replaceChild() call:
        var parentNode = el.parentNode;
        if (!parentNode) {
          i++;      
          // this entry would otherwise crash in the code below; we can however improve 
          // on the total run-time costs by cutting back on the number of times we trigger
          // the outer loop (which serves as a recovery mechanism anyway) by continuing
          // with this querySelectorAll()'s results, but at it's higher indexes, which
          // are very probably still valid/okay. This saves a number of outer loops and 
          // thus a number of querySelectorAll calls.
          continue;
        }
        // Note that this stuff can crash (due to the parentNode being nuked) when multiple
        // snippets in the same text node sibling series are merged. That's what the
        // parentNode check is for. Ugly. Even while the .querySelectorAll() 'array' is updated
        // automatically, which would imply that this never occurs, yet: it does. :-(
        parentNode.replaceChild(el.firstChild, el);
        // and merge the text snippets back together again.
        parentNode.normalize();
      }
    } while (arr.length > 0);
  };

  // start highlighting at target node
  this.apply = function (input)
  {
    // always remove all highlight markers which have been done previously
    this.remove();
    if(!input) {
      return false;
    }
    this.setRegex(input);
    var rv = options.onStart.call(this);
    if (rv === false) {
      return rv;
    }
    // ensure all text node series are merged, etc. so that we don't have to bother with fragmented texts in the search/scan.
    targetNode.normalize();
    this.hiliteWords(targetNode);
    return options.onFinish.call(this);
  };
}


  return Hilitor;
}));

// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
// 2/2013 jon: modified regex to display any match, not restricted to word boundaries.

// License at http://www.the-art-of-web.com/copyright.html

(function ( window, factory ) {

  if ( typeof module === "object" && typeof module.exports === "object" ) {
    // Expose a factory as module.exports in loaders that implement the Node
    // module pattern (including browserify).
    // This accentuates the need for a real window in the environment
    // e.g. var jQuery = require("jquery")(window);
    module.exports = function( w ) {
      w = w || window;
      if ( !w.document ) {
        throw new Error("Hilitor requires a window with a document");
      }
      return factory( w.document );
    };
  } else {
    if ( typeof define === "function" && define.amd ) {
      // AMD. Register as a named module.
      define( [], function() {
        return factory(document);
      });
    } else {
        // Browser globals
        window.Hilitor = factory(document);
    }
  }

// Pass this, window may not be defined yet
}(this, function ( document, undefined ) {


function Hilitor(id, tag, options)
{
  var targetNode = document.getElementById(id) || document.body;
  var hiliteTag = tag || "EM";
  var skipTags = new RegExp("^(?:SCRIPT|FORM|INPUT|TEXTAREA|IFRAME|VIDEO|AUDIO)$");
  var colors = ["#ff6"];
  var wordColor = [];
  var colorIdx = 0;
  var matchRegex = "";
  var openLeft = true;
  var openRight = true;
  options = options || {};
  if (typeof options.onStart !== 'function') {
    options.onStart = function () { /* return FALSE when you want to abort */ };
  }
  if (typeof options.onFinish !== 'function') {
    options.onFinish = function () { /* What you return here is returned by Hilitor.apply() */ return true; };
  }
  if (typeof options.onDoOne !== 'function') {
    options.onDoOne = function (node) { /* return FALSE when you want to skip the highlighting change for this node */ };
  }

  this.setMatchType = function(type)
  {
    switch(type)
    {
    case "left":
      openLeft = false;
      openRight = true;
      break;
    case "right":
      openLeft = true;
      openRight = false;
      break;
    default:
    case "open":
      openLeft = openRight = true;
      break;
    case "complete":
      openLeft = openRight = false;
      break;
    }
  };

  this.setRegex = function (input)
  {
    input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'\-]+/g, "|");
    var re = "(" + input + ")";
    if(!openLeft) re = "\\b" + re;
    if(!openRight) re = re + "\\b";
    matchRegex = new RegExp(re, "i");
  };

  this.getRegex = function ()
  {
    var retval = matchRegex.toString();
    retval = retval.replace(/^\/(\\b)?|(\\b)?\/i$/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  };

  // recursively apply word highlighting
  this.hiliteWords = function (node)
  {
    var i;

    if(!node)
      return;
    if(!matchRegex)
      return;
    if(skipTags.test(node.nodeName))
       return;
    if(node.nodeName === hiliteTag && node.className === "hilitor")
      return;

    if(node.hasChildNodes()) {
      for(i = 0; i < node.childNodes.length; i++) {
        this.hiliteWords(node.childNodes[i]);
      }
    }
    if(node.nodeType === 3) { // NODE_TEXT
      if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
        if (false !== options.onDoOne.call(this, node)) {
          if(!wordColor[regs[0].toLowerCase()]) {
            wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
          }

          var match = document.createElement(hiliteTag);
          match.appendChild(document.createTextNode(regs[0]));
          match.className = "hilitor";
          match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
          match.style.fontStyle = "inherit";
          match.style.color = "#000";

          var after = node.splitText(regs.index);
          after.nodeValue = after.nodeValue.substring(regs[0].length);
          node.parentNode.insertBefore(match, after);
        }
      }
    }
  };

  // remove highlighting
  this.remove = function ()
  {
    var arr, i;
    do {
      arr = document.querySelectorAll(hiliteTag + ".hilitor");
      i = 0;
      while (i < arr.length && (el = arr[i])) {
        // store the reference to the parent of the hilite tag as that node itself, 
        // and all its links, is invalidated in the next .replaceChild() call:
        var parentNode = el.parentNode;
        if (!parentNode) {
          i++;      
          // this entry would otherwise crash in the code below; we can however improve 
          // on the total run-time costs by cutting back on the number of times we trigger
          // the outer loop (which serves as a recovery mechanism anyway) by continuing
          // with this querySelectorAll()'s results, but at it's higher indexes, which
          // are very probably still valid/okay. This saves a number of outer loops and 
          // thus a number of querySelectorAll calls.
          continue;
        }
        // Note that this stuff can crash (due to the parentNode being nuked) when multiple
        // snippets in the same text node sibling series are merged. That's what the
        // parentNode check is for. Ugly. Even while the .querySelectorAll() 'array' is updated
        // automatically, which would imply that this never occurs, yet: it does. :-(
        parentNode.replaceChild(el.firstChild, el);
        // and merge the text snippets back together again.
        parentNode.normalize();
      }
    } while (arr.length > 0);
  };

  // start highlighting at target node
  this.apply = function (input)
  {
    // always remove all highlight markers which have been done previously
    this.remove();
    if(!input) {
      return false;
    }
    this.setRegex(input);
    var rv = options.onStart.call(this);
    if (rv === false) {
      return rv;
    }
    // ensure all text node series are merged, etc. so that we don't have to bother with fragmented texts in the search/scan.
    targetNode.normalize();
    this.hiliteWords(targetNode);
    return options.onFinish.call(this);
  };
}


  return Hilitor;
}));

/**
*  Ajax Autocomplete for jQuery, version 1.2.24
*  (c) 2015 Tomas Kirda
*
*  Ajax Autocomplete for jQuery is freely distributable under the terms of an MIT-style license.
*  For details, see the web site: https://github.com/devbridge/jQuery-Autocomplete
*/

/*jslint  browser: true, white: true, plusplus: true, vars: true */
/*global define, window, document, jQuery, exports, require */

// Expose plugin as an AMD module if AMD loader is present:
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var getCompiledOption = function (str, option) {
        try {
            //var keys = Object.keys(suggestion);

            //for(var i=0; i<keys.length; i++) {
            //    if(suggestion.hasOwnProperty(keys[i])) {
            //        str = str.replace(new RegExp("{"+keys[i]+"}", "ig"), suggestion[keys[i]]);
            //    }
            //}

            var parentSplit = str.split('{');
            for (var i = 0; i < parentSplit.length; i++) {
                var childSplit = parentSplit[i].split('}');
                for (var j = 0; j < childSplit.length; j++) {
                    if (childSplit[j].indexOf('.') > 0 || option.hasOwnProperty(childSplit[j])) {
                        str = str.replace(new RegExp("{" + childSplit[j] + "}", "ig"), eval('option.' + childSplit[j]));
                    }
                }
            }
        }
        catch(e) {}
        return str;
    };

    var
        utils = (function () {
            return {
                escapeRegExChars: function (value) {
                    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                },
                createNode: function (containerClass) {
                    var div = document.createElement('div');
                    div.className = containerClass;
                    div.style.position = 'absolute';
                    div.style.display = 'none';
                    div.onclick = "event.stopPropagation()";
                    div.addEventListener('click', function () {
                        event.stopPropagation();
                    });
                    return div;
                }
            };
        }()),

        keys = {
            ESC: 27,
            TAB: 9,
            RETURN: 13,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

    function Autocomplete(el, options) {
        var noop = function () { },
            that = this,
            defaults = {
                ajaxSettings: {},
                autoSelectFirst: false,
                appendTo: document.body,
                serviceUrl: null,
                lookup: null,
                onSelect: null,
                width: 'auto',
                minChars: 1,
                maxHeight: 300,
                deferRequestBy: 0,
                params: {},
                formatResult: Autocomplete.formatResult,
                delimiter: null,
                zIndex: 9999,
                type: 'GET',
                noCache: false,
                onSearchStart: noop,
                onSearchComplete: noop,
                onSearchError: noop,
                preserveInput: false,
                containerClass: 'autocomplete-suggestions',
                tabDisabled: false,
                dataType: 'text',
                currentRequest: null,
                triggerSelectOnValidInput: true,
                preventBadQueries: true,
                lookupFilter: function (suggestion, originalQuery, queryLowerCase) {
                    //  Added by Sushant
                    try {
                        var str = '';
                        for (var i = 0; i < that.filterKeys.length; i++) {
                            str = str + eval('suggestion.' + that.filterKeys[i]).toLowerCase().trim() + ' ';
                        }
                        str = str.trim();
                    }
                    catch (e) { }
                    return str.indexOf(queryLowerCase) > -1;
                },
                paramName: 'query',
                transformResult: function (response) {
                    return typeof response === 'string' ? $.parseJSON(response) : response;
                },
                showNoSuggestionNotice: false,
                noSuggestionNotice: 'No results',
                orientation: 'bottom',
                forceFixPosition: false,
                multiselect: false,
                showLookup: false,
                addnew: false
            };

        // Shared variables:
        that.element = el;
        that.el = $(el);
        that.suggestions = [];
        that.badQueries = [];
        that.selectedIndex = -1;
        that.currentValue = that.element.value;
        that.intervalId = 0;
        that.cachedResponse = {};
        that.onChangeInterval = null;
        that.onChange = null;
        that.isLocal = false;
        that.suggestionsContainer = null;
        that.noSuggestionsContainer = null;
        that.options = $.extend({}, defaults, options);
        that.classes = {
            selected: 'autocomplete-selected',
            suggestion: 'autocomplete-suggestion'
        };
        that.hint = null;
        that.hintValue = '';
        that.selection = null;

        //  Added by Sushant
        that.displayKey = options.displayKey ? options.displayKey : 'value';
        that.filterKeys = options.filterKeys ? options.filterKeys : [that.displayKey];
        that.optionFormat = options.optionFormat ? options.optionFormat : '{' + that.displayKey + '}';

        that.setLookup = function (lookup) {
            that.options.lookup = lookup;
            if ($(that.element).is(":focus")) {
                that.onValueChange();
            }
        };

        // Initialize and set options:
        that.initialize();
        that.setOptions(options);

        //if (!that.options.addnew && !that.options.showLookup) {
        //    that.onValueChange();
        //}
        if ($(that.element).is(":focus")) {
            that.onValueChange();
            that.suggest();
        }
    }

Autocomplete.utils = utils;

    $.Autocomplete = Autocomplete;

    Autocomplete.formatResult = function (suggestion, currentValue, optionFormat) {
        var str = suggestion.optionFormat ? suggestion.optionFormat : optionFormat;
        return str = getCompiledOption(str, suggestion);
    };

    Autocomplete.prototype = {

        killerFn: null,

        initialize: function () {
            var that = this,
                suggestionSelector = '.' + that.classes.suggestion,
                selected = that.classes.selected,
                options = that.options,
                container;

            // Remove autocomplete attribute to prevent native suggestions:
            that.element.setAttribute('autocomplete', 'off');

            that.killerFn = function (e) {
                if ($(e.target).closest('.' + that.options.containerClass).length === 0) {
                    that.killSuggestions();
                    that.disableKillerFn();
                }
            };

            // html() deals with many types: htmlString or Element or Array or jQuery
            that.noSuggestionsContainer = $('<div class="autocomplete-no-suggestion"></div>')
                                          .html(this.options.noSuggestionNotice).get(0);

            that.suggestionsContainer = Autocomplete.utils.createNode(options.containerClass);

            container = $(that.suggestionsContainer);

            container.appendTo(options.appendTo);

            // Only set width if it was provided:
            if (options.width !== 'auto') {
                container.width(options.width);
            }

            // Listen for mouse over event on suggestions list:
            container.on('mouseover.autocomplete', suggestionSelector, function () {
                that.activate($(this).data('index'));
            });

            // Deselect active element when mouse leaves suggestions container:
            container.on('mouseout.autocomplete', function () {
                that.selectedIndex = -1;
                container.children('.' + selected).removeClass(selected);
            });

            // Listen for click event on suggestions list:
            container.on('click.autocomplete', suggestionSelector, function () {
                that.select($(this).data('index'));
            });

            that.fixPositionCapture = function () {
                if (that.visible) {
                    that.fixPosition();
                }
            };

            $(window).on('resize.autocomplete', that.fixPositionCapture);

            that.el.on('keydown.autocomplete', function (e) { that.onKeyPress(e); });
            that.el.on('keyup.autocomplete', function (e) { that.onKeyUp(e); });
            that.el.on('blur.autocomplete', function () { that.onBlur(); });
            that.el.on('focus.autocomplete', function () { that.onFocus(); });
            that.el.on('change.autocomplete', function (e) { that.onKeyUp(e); });
            that.el.on('input.autocomplete', function (e) { that.onKeyUp(e); });
        },

        onFocus: function () {
            var that = this;
            that.fixPosition();
            //if (that.options.minChars === 0 && that.el.val().length === 0) {
            //    that.onValueChange();
            //}
            that.onValueChange();
            that.suggest();
        },

        onBlur: function () {
            var that = this;
            //if(that.suggestions.length > 0 && that.suggestions[0].value.toLowerCase() === that.el.val().toLowerCase().trim()) {
            //    that.hide();
            //    that.onSelect(0);
            //}
            if (that.selectedIndex === -1) {
                that.hide();
         //       return;
           }
            this.enableKillerFn();
        },
        
        abortAjax: function () {
            var that = this;
            if (that.currentRequest) {
                that.currentRequest.abort();
                that.currentRequest = null;
            }
        },

        setOptions: function (suppliedOptions) {
            var that = this,
                options = that.options;

            $.extend(options, suppliedOptions);

            that.isLocal = $.isArray(options.lookup);

            if (that.isLocal) {
                options.lookup = that.verifySuggestionsFormat(options.lookup);
            }

            options.orientation = that.validateOrientation(options.orientation, 'bottom');

            // Adjust height, width and z-index:
            $(that.suggestionsContainer).css({
                'max-height': options.maxHeight + 'px',
                'width': options.width + 'px',
                'z-index': options.zIndex
            });
        },
        
        clearCache: function () {
            this.cachedResponse = {};
            this.badQueries = [];
        },

        clear: function () {
            this.clearCache();
            this.currentValue = '';
            this.suggestions = [];
        },

        disable: function () {
            var that = this;
            that.disabled = true;
            clearInterval(that.onChangeInterval);
            that.abortAjax();
        },

        enable: function () {
            this.disabled = false;
        },

        fixPosition: function () {
            // Use only when container has already its content

            var that = this,
                $container = $(that.suggestionsContainer),
                containerParent = $container.parent().get(0);
            // Fix position automatically when appended to body.
            // In other cases force parameter must be given.
            if (containerParent !== document.body && !that.options.forceFixPosition) {
                return;
            }

            // Choose orientation
            var orientation = that.options.orientation,
                containerHeight = $container.outerHeight(),
                height = that.el.outerHeight(),
                offset = that.el.offset(),
                styles = { 'top': offset.top, 'left': offset.left };

            if (orientation === 'auto') {
                var viewPortHeight = $(window).height(),
                    scrollTop = $(window).scrollTop(),
                    topOverflow = -scrollTop + offset.top - containerHeight,
                    bottomOverflow = scrollTop + viewPortHeight - (offset.top + height + containerHeight);

                orientation = (Math.max(topOverflow, bottomOverflow) === topOverflow) ? 'top' : 'bottom';
            }

            if (orientation === 'top') {
                styles.top += -containerHeight;
            } else {
                styles.top += height;
            }

            // If container is not positioned to body,
            // correct its position using offset parent offset
            if(containerParent !== document.body) {
                var opacity = $container.css('opacity'),
                    parentOffsetDiff;

                    if (!that.visible){
                        $container.css('opacity', 0).show();
                    }

                parentOffsetDiff = $container.offsetParent().offset();
                styles.top -= parentOffsetDiff.top;
                styles.left -= parentOffsetDiff.left;

                if (!that.visible){
                    $container.css('opacity', opacity).hide();
                }
            }

            // -2px to account for suggestions border.
            if (that.options.width === 'auto') {
                styles.width = (that.el.outerWidth() - 2) + 'px';
            }

            $container.css(styles);
        },

        enableKillerFn: function () {
            var that = this;
            $(document).on('click.autocomplete', that.killerFn);
        },

        disableKillerFn: function () {
            var that = this;
            $(document).off('click.autocomplete', that.killerFn);
        },

        killSuggestions: function () {
            var that = this;
            that.stopKillSuggestions();
            that.intervalId = window.setInterval(function () {
                if (that.visible) {
                    that.el.val(that.currentValue);
                    that.hide();
                }
                
                that.stopKillSuggestions();
            }, 50);
        },

        stopKillSuggestions: function () {
            window.clearInterval(this.intervalId);
        },

        isCursorAtEnd: function () {
            var that = this,
                valLength = that.el.val().length,
                selectionStart = that.element.selectionStart,
                range;

            if (typeof selectionStart === 'number') {
                return selectionStart === valLength;
            }
            if (document.selection) {
                range = document.selection.createRange();
                range.moveStart('character', -valLength);
                return valLength === range.text.length;
            }
            return true;
        },

        onKeyPress: function (e) {
            var that = this;

            // If suggestions are hidden and user presses arrow down, display suggestions:
            if (!that.disabled && !that.visible && e.which === keys.DOWN && that.currentValue) {
                that.suggest();
                return;
            }

            if (that.disabled || !that.visible) {
                return;
            }

            switch (e.which) {
                case keys.ESC:
                    that.el.val(that.currentValue);
                    that.hide();
                    break;
                case keys.RIGHT:
                    if (that.hint && that.options.onHint && that.isCursorAtEnd()) {
                        that.selectHint();
                        break;
                    }
                    return;
                case keys.TAB:
                    if (that.hint && that.options.onHint) {
                        that.selectHint();
                        return;
                    }
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    if (that.options.tabDisabled === false) {
                        return;
                    }
                    break;
                case keys.RETURN:
                    if (that.selectedIndex === -1) {
                        that.hide();
                        return;
                    }
                    that.select(that.selectedIndex);
                    break;
                case keys.UP:
                    that.moveUp();
                    break;
                case keys.DOWN:
                    that.moveDown();
                    break;
                default:
                    return;
            }

            // Cancel event if function did not return:
            e.stopImmediatePropagation();
            e.preventDefault();
        },

        onKeyUp: function (e) {
            var that = this;

            if (that.disabled) {
                return;
            }

            switch (e.which) {
                case keys.UP:
                case keys.DOWN:
                    return;
            }

            clearInterval(that.onChangeInterval);

            if (that.currentValue !== that.el.val()) {
                that.findBestHint();
                if (that.options.deferRequestBy > 0) {
                    // Defer lookup in case when value changes very quickly:
                    that.onChangeInterval = setInterval(function () {
                        that.onValueChange();
                    }, that.options.deferRequestBy);
                } else {
                    that.onValueChange();
                }
            }
        },

        onValueChange: function () {
            var that = this,
                options = that.options,
                value = that.el.val(),
                query = that.getQuery(value);

            if (that.selection && that.currentValue !== query) {
                that.selection = null;
                (options.onInvalidateSelection || $.noop).call(that.element);
            }

            clearInterval(that.onChangeInterval);
            that.currentValue = value;
            that.selectedIndex = -1;

            // Check existing suggestion for the match before proceeding:
            if (options.triggerSelectOnValidInput && that.isExactMatch(query)) {
                that.select(0);
                return;
            }

            if (query.length < options.minChars) {
                //Suggestion will not hide 
                if (!(that.options.showLookup || that.options.addnew))
                    that.hide();
            } else {
                that.getSuggestions(query);
            }
        },

        isExactMatch: function (query) {
            return false;
        },

        getQuery: function (value) {
            var delimiter = this.options.delimiter,
                parts;

            if (!delimiter) {
                return value;
            }
            parts = value.split(delimiter);
            return $.trim(parts[parts.length - 1]);
        },

        getSuggestionsLocal: function (query) {
            var that = this,
                options = that.options,
                queryLowerCase = query.toLowerCase(),
                filter = options.lookupFilter,
                limit = parseInt(options.lookupLimit, 10),
                data;

            data = {
                suggestions: $.grep(options.lookup, function (suggestion) {
                    //  If suggestion is set to filterable false, it will not get filtered
                    if ((suggestion.filterable != null || suggestion.filterable != undefined) && suggestion.filterable === false) {
                        return true;
                    }
                    return filter(suggestion, query, queryLowerCase);
                })
            };
            
            if (limit && data.suggestions.length > limit) {
                data.suggestions = data.suggestions.slice(0, limit);
            }

            return data;
        },

        getSuggestions: function (q) {
            var response,
                that = this,
                options = that.options,
                serviceUrl = options.serviceUrl,
                params,
                cacheKey,
                ajaxSettings;

            options.params[options.paramName] = q;
            params = options.ignoreParams ? null : options.params;

            if (options.onSearchStart.call(that.element, options.params) === false) {
                return;
            }

            if ($.isFunction(options.lookup)){
                options.lookup(q, function (data) {
                    that.suggestions = data.suggestions;
                    that.suggest();
                    options.onSearchComplete.call(that.element, q, data.suggestions);
                });
                return;
            }

            if (that.isLocal) {
                response = that.getSuggestionsLocal(q);
            } else {
                if ($.isFunction(serviceUrl)) {
                    serviceUrl = serviceUrl.call(that.element, q);
                }
                cacheKey = serviceUrl + '?' + $.param(params || {});
                response = that.cachedResponse[cacheKey];
            }

            if (response && $.isArray(response.suggestions)) {
                that.suggestions = response.suggestions;
                that.suggest();
                options.onSearchComplete.call(that.element, q, response.suggestions);
            } else if (!that.isBadQuery(q)) {
                that.abortAjax();

                ajaxSettings = {
                    url: serviceUrl,
                    data: params,
                    type: options.type,
                    dataType: options.dataType
                };

                $.extend(ajaxSettings, options.ajaxSettings);

                that.currentRequest = $.ajax(ajaxSettings).done(function (data) {
                    var result;
                    that.currentRequest = null;
                    result = options.transformResult(data, q);
                    that.processResponse(result, q, cacheKey);
                    options.onSearchComplete.call(that.element, q, result.suggestions);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    options.onSearchError.call(that.element, q, jqXHR, textStatus, errorThrown);
                });
            } else {
                options.onSearchComplete.call(that.element, q, []);
            }
        },

        isBadQuery: function (q) {
            if (!this.options.preventBadQueries){
                return false;
            }

            var badQueries = this.badQueries,
                i = badQueries.length;

            while (i--) {
                if (q.indexOf(badQueries[i]) === 0) {
                    return true;
                }
            }

            return false;
        },

        hide: function () {
            var that = this,
                container = $(that.suggestionsContainer);

            if ($.isFunction(that.options.onHide) && that.visible) {
                that.options.onHide.call(that.element, container);
            }

            that.visible = false;
            that.selectedIndex = -1;
            clearInterval(that.onChangeInterval);
            $(that.suggestionsContainer).hide();
            that.signalHint(null);
        },

        suggest: function () {
            //Skip condition when showlookup and addNew flag true
            if (!(this.options.showLookup || this.options.addnew)) {
                if (this.suggestions.length === 0) {
                    if (this.options.showNoSuggestionNotice) {
                        this.noSuggestions();
                    } else {
                        this.hide();
                    }
                    return;
                }
            }

            var that = this,
                options = that.options,
                groupBy = options.groupBy,
                formatResult = options.formatResult,
                value = that.getQuery(that.currentValue),
                className = that.classes.suggestion,
                classSelected = that.classes.selected,
                container = $(that.suggestionsContainer),
                noSuggestionsContainer = $(that.noSuggestionsContainer),
                beforeRender = options.beforeRender,
                html = '',
                category,
                formatGroup = function (suggestion, index) {
                        var currentCategory = suggestion.data[groupBy];

                        if (category === currentCategory){
                            return '';
                        }

                        category = currentCategory;

                        return '<div class="autocomplete-group"><strong>' + category + '</strong></div>';
                    };

            if (options.triggerSelectOnValidInput && that.isExactMatch(value)) {
                that.select(0);
                return;
            }


            var formattedResult, formattedTitle;

            // Build suggestions inner HTML:
            var totalIndex = 0;
            var innerWrapMaxHeight = (that.options.addnew == true || that.options.showLookup == true) ? that.options.maxHeight - 40 : that.options.maxHeight - 2;
            html += "<div class='scroll-inner-wrapp' style='max-height:" + innerWrapMaxHeight + "px;'>";
            $.each(that.suggestions, function (i, suggestion) {
                if (groupBy) {
                    html += formatGroup(suggestion, value, i);
                }
                formattedResult = formatResult(suggestion, value, that.optionFormat);
                try {
                    formattedTitle = escape(formattedResult);
                    formattedTitle = unescape(formattedTitle.replace(/%28/g, 'openingroundbracket').replace(/%29/g, 'closingroundbracket'));
                    formattedTitle = $(formattedTitle).text() ? $(formattedTitle).text() : formattedTitle;
                }
                catch (e) { }
                formattedTitle = formattedTitle.replace(/openingroundbracket/g, '(').replace(/closingroundbracket/g, ')');
                html += '<div class="' + className + '" data-index="' + i + '" title="' + unescape(formattedTitle) + '">' + formattedResult + '</div>';
                totalIndex = i + 1;
            });
            html +="</div>";
            if (that.options.addnew == true && that.options.showLookup == true) {
                html += '<div class="typeaHeade-add-new blue-text autocomplete-suggestion-half ' + className + '" data-index="' + totalIndex + '" title="Add New"><i class="icon icon-fix-overlay iconSmall" smart-tooltip position="bottom" delay="50" message="Add New"><svg><use xlink:href="#icon_CirclePlus"></use></svg></i></div>';
                html += '<div class="typeaHeade-open-lookup autocomplete-suggestion-half ' + className + '" data-index="' + ++totalIndex + '" title="Show Lookup"><a href="javascript:void(0)" class="waves-effect waves-light">Show Lookup</a></div>';
            } else {
            	if (that.options.addnew == true) {
            	    html += '<div class="typeaHeade-add-new width-adj-to blue-text ' + className + '" data-index="' + totalIndex + '" title="Add New"><i class="icon icon-fix-overlay iconSmall" smart-tooltip position="bottom" delay="50" message="Add New"><svg><use xlink:href="#icon_CirclePlus"></use></svg></i></div>';
            	}
            	if (that.options.showLookup == true) {
            	    html += '<div class="typeaHeade-open-lookup width-adj-to ' + className + '" data-index="' + ++totalIndex + '" title="Show Lookup"><a href="javascript:void(0)" class="waves-effect waves-light">Show Lookup</a></div>';
            	}
            }
            
            this.adjustContainerWidth();

            noSuggestionsContainer.detach();
            container.html(html);

            if ($.isFunction(beforeRender)) {
                beforeRender.call(that.element, container);
            }

            that.fixPosition();
            container.show();

            // Select first value by default:
            if (options.autoSelectFirst) {
                that.selectedIndex = 0;
                container.scrollTop(0);
                container.children('.' + className).first().addClass(classSelected);
            }

            that.visible = true;
            that.findBestHint();
        },

        noSuggestions: function() {
             var that = this,
                 container = $(that.suggestionsContainer),
                 noSuggestionsContainer = $(that.noSuggestionsContainer);

            this.adjustContainerWidth();

            // Some explicit steps. Be careful here as it easy to get
            // noSuggestionsContainer removed from DOM if not detached properly.
            noSuggestionsContainer.detach();
            container.empty(); // clean suggestions if any
            container.append(noSuggestionsContainer);

            that.fixPosition();

            container.show();
            that.visible = true;
        },

        adjustContainerWidth: function() {
            var that = this,
                options = that.options,
                width,
                container = $(that.suggestionsContainer);

            // If width is auto, adjust width before displaying suggestions,
            // because if instance was created before input had width, it will be zero.
            // Also it adjusts if input width has changed.
            // -2px to account for suggestions border.
            if (options.width === 'auto') {
                width = that.el.outerWidth() - 2;
                container.width(width > 0 ? width : 300);
            }
        },

        findBestHint: function () {
            var that = this,
                value = that.el.val().toLowerCase(),
                bestMatch = null;

            if (!value) {
                return;
            }

            $.each(that.suggestions, function (i, suggestion) {
                var str = suggestion.optionFormat ? suggestion.optionFormat : that.optionFormat;
                str = getCompiledOption(str, suggestion);
                var foundMatch = str.toLowerCase().indexOf(value) === 0;
                if (foundMatch) {
                    bestMatch = suggestion;
                }
                return !foundMatch;
            });

            that.signalHint(bestMatch);
        },

        signalHint: function (suggestion) {
            var hintValue = '',
                that = this;
            if (suggestion) {
                var str = suggestion.optionFormat ? suggestion.optionFormat : that.optionFormat;
                str = getCompiledOption(str, suggestion);
                hintValue = that.currentValue + str.substr(that.currentValue.length);
            }
            if (that.hintValue !== hintValue) {
                that.hintValue = hintValue;
                that.hint = suggestion;
                (this.options.onHint || $.noop)(hintValue);
            }
        },

        verifySuggestionsFormat: function (suggestions) {
            // If suggestions is string array, convert them to supported format:
            if (suggestions.length && typeof suggestions[0] === 'string') {
                return $.map(suggestions, function (value) {
                    return { value: value, data: null };
                });
            }

            return suggestions;
        },

        validateOrientation: function(orientation, fallback) {
            orientation = $.trim(orientation || '').toLowerCase();

            if($.inArray(orientation, ['auto', 'bottom', 'top']) === -1){
                orientation = fallback;
            }

            return orientation;
        },

        processResponse: function (result, originalQuery, cacheKey) {
            var that = this,
                options = that.options;

            result.suggestions = that.verifySuggestionsFormat(result.suggestions);

            // Cache results if cache is not disabled:
            if (!options.noCache) {
                that.cachedResponse[cacheKey] = result;
                if (options.preventBadQueries && result.suggestions.length === 0) {
                    that.badQueries.push(originalQuery);
                }
            }

            // Return if originalQuery is not matching current query:
            if (originalQuery !== that.getQuery(that.currentValue)) {
                return;
            }

            that.suggestions = result.suggestions;
            that.suggest();
        },

        activate: function (index) {
            var that = this,
                activeItem,
                selected = that.classes.selected,
                container = $(that.suggestionsContainer),
                children = container.find('.' + that.classes.suggestion);

            container.find('.' + selected).removeClass(selected);

            that.selectedIndex = index;

            if (that.selectedIndex !== -1 && children.length > that.selectedIndex) {
                activeItem = children.get(that.selectedIndex);
                $(activeItem).addClass(selected);
                return activeItem;
            }

            return null;
        },

        selectHint: function () {
            var that = this,
                i = $.inArray(that.hint, that.suggestions);

            that.select(i);
        },

        select: function (i) {
            var that = this;
            if(!that.options.multiselect) //prevent hiding suggetions for multiselect
                that.hide();
            that.onSelect(i);
        },

        moveUp: function () {
            var that = this;

            if (that.selectedIndex === -1) {
                return;
            }

            if (that.selectedIndex === 0) {
                $(that.suggestionsContainer).children().first().removeClass(that.classes.selected);
                that.selectedIndex = -1;
                that.el.val(that.currentValue);
                that.findBestHint();
                return;
            }

            that.adjustScroll(that.selectedIndex - 1);
        },

        moveDown: function () {
            var that = this;

            if (that.selectedIndex === (that.suggestions.length - 1)) {
                return;
            }

            that.adjustScroll(that.selectedIndex + 1);
        },

        adjustScroll: function (index) {
            var that = this,
                activeItem = that.activate(index);

            if (!activeItem) {
                return;
            }

            var offsetTop,
                upperBound,
                lowerBound,
                heightDelta = $(activeItem).outerHeight();

            offsetTop = activeItem.offsetTop;
            upperBound = $(that.suggestionsContainer).scrollTop();
            lowerBound = upperBound + that.options.maxHeight - heightDelta;

            if (offsetTop < upperBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop);
            } else if (offsetTop > lowerBound) {
                $(that.suggestionsContainer).scrollTop(offsetTop - that.options.maxHeight + heightDelta);
            }

            if (!that.options.preserveInput) {
                that.el.val(that.getValue(that.suggestions[index].value));
            }
            that.signalHint(null);
        },

        onSelect: function (index) {
            var that = this;
            //Added new callback for show lookup and Add New
            var getTotalSuggested = that.suggestions.length;
            if (index > getTotalSuggested && that.options.showLookup == true) {
                that.hide();
                if ($.isFunction(that.options.onClickShowLookup)) {
                    that.options.onClickShowLookup.call(that.element, "ShowLookup");
                    return;
                }
            }
            if (index == getTotalSuggested && that.options.addnew == true) {
                that.hide();
                if ($.isFunction(that.options.onClickAddNew)) {
                    that.options.onClickAddNew.call(that.element, "AddNEW");
                    return;
                }
            }
            var onSelectCallback = that.options.onSelect,
                suggestion = that.suggestions[index];

            that.currentValue = that.getValue(suggestion.value);

            if (that.currentValue !== that.el.val() && !that.options.preserveInput) {
                that.el.val(that.currentValue);
            }

            that.signalHint(null);
            that.suggestions = [];
            that.selection = suggestion;

            if ($.isFunction(onSelectCallback)) {
                onSelectCallback.call(that.element, suggestion);
            }
        },

        getValue: function (value) {
            var that = this,
                delimiter = that.options.delimiter,
                currentValue,
                parts;

            if (!delimiter) {
                return value;
            }

            currentValue = that.currentValue;
            parts = currentValue.split(delimiter);

            if (parts.length === 1) {
                return value;
            }

            return currentValue.substr(0, currentValue.length - parts[parts.length - 1].length) + value;
        },

        dispose: function () {
            var that = this;
            that.el.off('.autocomplete').removeData('autocomplete');
            that.disableKillerFn();
            $(window).off('resize.autocomplete', that.fixPositionCapture);
            $(that.suggestionsContainer).remove();
        }
    };

    // Create chainable jQuery plugin:
    $.fn.autocomplete = $.fn.devbridgeAutocomplete = function (options, args) {
        var dataKey = 'autocomplete';
        // If function invoked without argument return
        // instance of the first matched element:
        if (arguments.length === 0) {
            return this.first().data(dataKey);
        }

        return this.each(function () {
            var inputElement = $(this),
                instance = inputElement.data(dataKey);

            if (typeof options === 'string') {
                if (instance && typeof instance[options] === 'function') {
                    instance[options](args);
                }
            } else {
                // If instance already exists, destroy it:
                if (instance && instance.dispose) {
                    instance.dispose();
                }
                instance = new Autocomplete(this, options);
                inputElement.data(dataKey, instance);
            }
        });
    };
}));
(function ($) {
    $.fn.inputNumber = function (flag, step) {
        $(this).filter(function () {
            var $this;
            $this = $(this);
            return $this.is('input[data-numeric="true"]') && !($this.parent().is("span") && $this.next().is("div.number-spin-btn-container") && $this.next().children().first().is("div.number-spin-btn-up") && $this.next().children().eq(1).is("div.number-spin-btn-down"));
        }).each(function () {
            numberPolyfill.polyfills.push(new numberPolyfill(this, flag, step));
        });
        return $(this);
    };
    var numberPolyfill = function (elem, flagspinner, step) {
        var $fieldContainer, MutationObserver, attrObserver, halfHeight,
            _this = this;
        this.elem = $(elem);
        this.sib = this.elem.siblings('label');
        this.step = step;

        if (!(this.elem.is(":root *") && this.elem.height() > 0)) {
            throw new Error("Element must be in DOM and displayed so that its height can be measured.");
        }
        halfHeight = (this.elem.outerHeight() / 2) + 'px';
        this.upBtn = $('<div/>', {
            "class": 'number-spin-btn number-spin-btn-up',
            style: "height: " + halfHeight
        });
        this.downBtn = $('<div/>', {
            "class": 'number-spin-btn number-spin-btn-down',
            style: "height: " + halfHeight
        });
        this.btnContainer = $('<div/>', {
            "class": 'number-spin-btn-container'
        });

        if (flagspinner == 'true') {
            $fieldContainer = $('<span/>', {
                "class": 'number-spin-field',
                style: "white-space: nowrap"
            });
        } else {
            $fieldContainer = $('<span/>', {
                style: "white-space: nowrap"
            });
        }

        this.upBtn.appendTo(this.btnContainer);
        this.downBtn.appendTo(this.btnContainer);

        this.elem.attr('autocomplete', 'off').wrapAll($fieldContainer);

        this.sib.insertAfter(this.elem);
        this.btnContainer.insertBefore(this.elem);
        this.elem.on({
            focus: function (e) {
                _this.elem.on({
                    DOMMouseScroll: numberPolyfill.domMouseScrollHandler,
                    mousewheel: numberPolyfill.mouseWheelHandler
                }, {
                    p: _this
                });
            },
            blur: function (e) {
                _this.elem.off({
                    DOMMouseScroll: numberPolyfill.domMouseScrollHandler,
                    mousewheel: numberPolyfill.mouseWheelHandler
                });
            }
        });
        this.elem.on({
            keydown: numberPolyfill.elemKeypressHandler,
            change: numberPolyfill.elemChangeHandler
        }, {
            p: this
        });
        this.upBtn.on("mousedown", {
            p: this,
            func: "increment"
        }, numberPolyfill.elemBtnMousedownHandler);
        this.downBtn.on("mousedown", {
            p: this,
            func: "decrement"
        }, numberPolyfill.elemBtnMousedownHandler);

        this.attrMutationHandler("class");
        if ((typeof WebKitMutationObserver !== "undefined" && WebKitMutationObserver !== null) || (typeof MutationObserver !== "undefined" && MutationObserver !== null)) {
            if ((typeof WebKitMutationObserver !== "undefined" && WebKitMutationObserver !== null) && (typeof MutationObserver === "undefined" || MutationObserver === null)) {
                MutationObserver = WebKitMutationObserver;
            }
            attrObserver = new MutationObserver(function (mutations, observer) {
                var mutation, _i, _len;
                for (_i = 0, _len = mutations.length; _i < _len; _i++) {
                    mutation = mutations[_i];
                    if (mutation.type === "attributes") {
                        _this.attrMutationHandler(mutation.attributeName, mutation.oldValue, _this.elem.attr(mutation.attributeName));
                    }
                }
            });
            attrObserver.observe(elem, {
                attributes: true,
                attributeOldValue: true,
                attributeFilter: ["class", "style", "min", "max", "step"]
            });
        } else if (typeof MutationEvent !== "undefined" && MutationEvent !== null) {
            this.elem.on("DOMAttrModified", function (evt) {
                _this.attrMutationHandler(evt.originalEvent.attrName, evt.originalEvent.prevValue, evt.originalEvent.newValue);
            });
        }
    };
    numberPolyfill.polyfills = [];
    numberPolyfill.isNumber = function (input) {
        if ((input != null) && typeof input.toString === "function") {
            return /^-?\d+(?:\.\d+)?$/.test(input.toString());
        } else {
            return false;
        }
    };
    numberPolyfill.isFloat = function (input) {
        if ((input != null) && typeof input.toString === "function") {
            return /^-?\d+\.\d+$/.test(input.toString());
        } else {
            return false;
        }
    };
    numberPolyfill.isInt = function (input) {
        if ((input != null) && typeof input.toString === "function") {
            return /^-?\d+$/.test(input.toString());
        } else {
            return false;
        }
    };
    numberPolyfill.isNegative = function (input) {
        if ((input != null) && typeof input.toString === "function") {
            return /^-\d+(?:\.\d+)?$/.test(input.toString());
        } else {
            return false;
        }
    };
    numberPolyfill.raiseNum = function (num) {
        var a, numi, nump;
        if (typeof num === "number" || (typeof num === "object" && num instanceof Number)) {
            if (num % 1) {
                return {
                    num: num.toString(),
                    precision: 0
                };
            } else {
                return numberPolyfill.raiseNum(num.toString());
            }
        } else if (typeof num === "string" || (typeof num === "object" && num instanceof String)) {
            if (numberPolyfill.isFloat(num)) {
                num = num.replace(/(\.\d)0+$/, "$1");
                nump = numberPolyfill.getPrecision(num);
                numi = num.slice(0, -(nump + 1)) + num.slice(-nump);
                numi = numi.replace(/^(-?)0+(\d+)/, "$1$2");
                a = {
                    num: numi,
                    precision: nump
                };
                return a;
            } else if (numberPolyfill.isInt(num)) {
                return {
                    num: num,
                    precision: 0
                };
            }
        }
    };
    numberPolyfill.raiseNumPrecision = function (rNum, newPrecision) {
        var _i, _ref, i;
        if (rNum.precision < newPrecision) {
            for (i = _i = _ref = rNum.precision; _ref <= newPrecision ? _i < newPrecision : _i > newPrecision; i = _ref <= newPrecision ? ++_i : --_i) {
                rNum.num += "0";
            }
            rNum.precision = newPrecision;
        }
    };
    numberPolyfill.lowerNum = function (num) {
        if (num.precision > 0) {
            while (num.num.length < (num.precision + 1)) {
                if (numberPolyfill.isNegative(num.num)) {
                    num.num = num.num.slice(0, 1) + "0" + num.num.slice(1);
                } else {
                    num.num = "0" + num.num;
                }
            }
            return (num.num.slice(0, -num.precision) + "." + num.num.slice(-num.precision)).replace(/\.?0+$/, '').replace(/^(-?)(\.)/, "$10$2");
        } else {
            return num.num;
        }
    };
    numberPolyfill.preciseAdd = function (num1, num2) {
        var num1i, num2i, result;
        if ((typeof num1 === "number" || (typeof num1 === "object" && num1 instanceof Number)) && (typeof num2 === "number" || (typeof num2 === "object" && num2 instanceof Number))) {
            if (num1 % 1 === 0 && num2 % 1 === 0) {
                return (num1 + num2).toString();
            } else {
                return numberPolyfill.preciseAdd(num1.toString(), num2.toString());
            }
        } else if ((typeof num1 === "string" || (typeof num1 === "object" && num1 instanceof String)) && (typeof num2 === "string" || (typeof num2 === "object" && num2 instanceof String))) {
            if (numberPolyfill.isNumber(num1)) {
                if (numberPolyfill.isNumber(num2)) {
                    if (numberPolyfill.isInt(num1)) {
                        if (numberPolyfill.isInt(num2)) {
                            return numberPolyfill.preciseAdd(parseInt(num1, 10), parseInt(num2, 10));
                        } else if (numberPolyfill.isFloat(num2)) {
                            num1 += ".0";
                        }
                    } else if (numberPolyfill.isFloat(num1)) {
                        if (numberPolyfill.isInt(num2)) {
                            num2 += ".0";
                        }
                    }
                    num1i = numberPolyfill.raiseNum(num1);
                    num2i = numberPolyfill.raiseNum(num2);
                    if (num1i.precision < num2i.precision) {
                        numberPolyfill.raiseNumPrecision(num1i, num2i.precision);
                    } else if (num1i.precision > num2i.precision) {
                        numberPolyfill.raiseNumPrecision(num2i, num1i.precision);
                    }
                    result = (parseInt(num1i.num, 10) + parseInt(num2i.num, 10)).toString();
                    if (num1i.precision > 0) {
                        if (numberPolyfill.isNegative(result)) {
                            while (num1i.precision > (result.length - 1)) {
                                result = "-0" + result.slice(1);
                            }
                        } else {
                            while (num1i.precision > result.length) {
                                result = "0" + result;
                            }
                        }
                        result = numberPolyfill.lowerNum({
                            num: result,
                            precision: num1i.precision
                        });
                    }
                    result = result.replace(/^(-?)\./, '$10.');
                    if (numberPolyfill.isFloat(result)) {
                        result = result.replace(/0+$/, '');
                    }
                    return result;
                } else {
                    throw new SyntaxError("Argument \"" + num2 + "\" is not a number.");
                }
            } else {
                throw new SyntaxError("Argument \"" + num1 + "\" is not a number.");
            }
        } else {
            return numberPolyfill.preciseAdd(num1.toString(), num2.toString());
        }
    };
    numberPolyfill.preciseSubtract = function (num1, num2) {
        if (typeof num2 === "number" || (typeof num2 === "object" && num2 instanceof Number)) {
            return numberPolyfill.preciseAdd(num1, -num2);
        } else if (typeof num2 === "string" || (typeof num2 === "object" && num2 instanceof String)) {
            if (numberPolyfill.isNegative(num2)) {
                return numberPolyfill.preciseAdd(num1, num2.slice(1));
            } else {
                return numberPolyfill.preciseAdd(num1, "-" + num2);
            }
        }
    };
    numberPolyfill.getPrecision = function (num) {
        var k, kNum;
        if (typeof num === "number") {
            k = 0;
            kNum = num;
            while (kNum !== Math.floor(kNum)) {
                kNum = num * Math.pow(10, ++k);
            }
            return k;
        } else if (typeof num === "string") {
            if (numberPolyfill.isNumber(num)) {
                if (numberPolyfill.isFloat(num)) {
                    return /^-?\d+(?:\.(\d+))?$/.exec(num)[1].length;
                } else {
                    return 0;
                }
            }
        }
    };
    numberPolyfill.prototype.getParams = function () {
        var max, min, step, val;
        step = this.elem.attr('step');
        min = this.elem.attr('min');
        max = this.elem.attr('max');
        val = this.elem.val();
        if (!numberPolyfill.isNumber(step)) {
            step = null;
        }
        if (!numberPolyfill.isNumber(min)) {
            min = null;
        }
        if (!numberPolyfill.isNumber(max)) {
            max = null;
        }
        if (!numberPolyfill.isNumber(val)) {
            val = min || 0;
        }
        return {
            min: (min != null) ? min : null,
            max: (max != null) ? max : null,
            step: (step != null) ? step : "1",
            val: (val != null) ? val : null
        };
    };
    numberPolyfill.prototype.clipValues = function (value, min, max) {
        if ((max != null) && parseFloat(value) > parseFloat(max)) {
            return max;
        } else if ((min != null) && parseFloat(value) < parseFloat(min)) {
            return min;
        } else {
            return value;
        }
    };
    numberPolyfill.prototype.stepNormalize = function (value) {
        var cValue, min, params, sn, step;
        params = this.getParams();
        step = params['step'];
        min = params['min'];
        if (step == null) {
            return value;
        } else {
            step = numberPolyfill.raiseNum(step);
            cValue = numberPolyfill.raiseNum(value);
            if (cValue.precision > step.precision) {
                numberPolyfill.raiseNumPrecision(step, cValue.precision);
            } else if (cValue.precision < step.precision) {
                numberPolyfill.raiseNumPrecision(cValue, step.precision);
            }
            if (min != null) {
                cValue = numberPolyfill.raiseNum(numberPolyfill.preciseSubtract(value, min));
                numberPolyfill.raiseNumPrecision(cValue, step.precision);
            }
            if (parseFloat(cValue.num) % parseFloat(step.num) === 0) {
                return value;
            } else {
                cValue = numberPolyfill.lowerNum({
                    num: (Math.round(parseFloat(cValue.num) / (sn = parseFloat(step.num))) * sn).toString(),
                    precision: cValue.precision
                });
                if (min != null) {
                    cValue = numberPolyfill.preciseAdd(cValue, min);
                }
                return cValue;
            }
        }
    };
    numberPolyfill.domMouseScrollHandler = function (evt) {
        var p;
        p = evt.data.p;
        evt.preventDefault();
        if (evt.originalEvent.detail < 0) {
            p.increment();
        } else {
            p.decrement();
        }
    };
    numberPolyfill.mouseWheelHandler = function (evt) {
        var p;
        p = evt.data.p;
        evt.preventDefault();
        if (evt.originalEvent.wheelDelta > 0) {
            p.increment();
        } else {
            p.decrement();
        }
    };
    numberPolyfill.elemKeypressHandler = function (evt) {
        var p, _ref, _ref1;
        p = evt.data.p;

        if (evt.keyCode === 38) {
            p.increment();
        } else if (evt.keyCode === 40) {
            p.decrement();
        } else if (evt.shiftKey) {
            evt.preventDefault();
        } else if (evt.keyCode === 188) {
            //comma
            evt.preventDefault();
        } else if (evt.keyCode === 190) {
            if (!(/\./.test(p.step))) {
                evt.preventDefault();
            }
        } else if (evt.keyCode >= 186 && evt.keyCode <= 191) {
            evt.preventDefault();
        } else if (((_ref = evt.keyCode) !== 8 && _ref !== 9 && _ref !== 13 && _ref !== 35 && _ref !== 36 && _ref !== 37 && _ref !== 39 && _ref !== 46) && ((_ref1 = evt.which) !== 45 && (_ref1 < 48 || _ref1 > 57) && (_ref1 < 96 || _ref1 > 105))) {
            evt.preventDefault();
        }
    };
    numberPolyfill.elemChangeHandler = function (evt) {
        var min, newVal, p, params;
        p = evt.data.p;
        if (numberPolyfill.isNumber(p.elem.val())) {
            params = p.getParams();
            newVal = p.clipValues(params['val'], params['min'], params['max']);
            newVal = p.stepNormalize(newVal);
            if (newVal.toString() !== p.elem.val()) {
                p.elem.val(newVal).change();
            }
        } else {
            min = p.elem.attr('min');
            p.elem.val((min != null) && numberPolyfill.isNumber(min) ? min : "0").change();
        }
    };
    numberPolyfill.elemBtnMousedownHandler = function (evt) {
        var func, p, releaseFunc, timeoutFunc,
            _this = this;
        p = evt.data.p;
        func = evt.data.func;
        p[func]();
        timeoutFunc = function (incFunc) {
            p[func]();
            p.timeoutID = window.setTimeout(timeoutFunc, 50);
        };
        releaseFunc = function (e) {
            window.clearTimeout(p.timeoutID);
            $(document).off('mouseup', releaseFunc);
            $(_this).off('mouseleave', releaseFunc);
        };
        $(document).on('mouseup', releaseFunc);
        $(this).on('mouseleave', releaseFunc);
        p.timeoutID = window.setTimeout(timeoutFunc, 500);
        evt.stopPropagation();
    };
    numberPolyfill.prototype.attrMutationHandler = function (name, oldValue, newValue) {
        var ei, h, _i, _len, _ref, i;
        if (name === "class" || name === "style") {
            h = {};
            ei = null;
            _ref = ["opacity", "visibility", "-moz-transition-property", "-moz-transition-duration", "-moz-transition-timing-function", "-moz-transition-delay", "-webkit-transition-property", "-webkit-transition-duration", "-webkit-transition-timing-function", "-webkit-transition-delay", "-o-transition-property", "-o-transition-duration", "-o-transition-timing-function", "-o-transition-delay", "transition-property", "transition-duration", "transition-timing-function", "transition-delay"];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                i = _ref[_i];
                if ((ei = this.elem.css(i)) !== this.btnContainer.css(i)) {
                    h[i] = ei;
                }
            }
            if (this.elem.css("display") === "none") {
                h["display"] = "none";
            } else {
                h["display"] = "inline-block";
            }
            this.btnContainer.css(h);
        } else if (name === "min" || name === "max" || name === "step") {
            this.elem.change();
        }
    };
    numberPolyfill.prototype.increment = function () {
        var newVal, params;
        if (!this.elem.is(":disabled")) {
            params = this.getParams();
            newVal = numberPolyfill.preciseAdd(params['val'], params['step']);
            if ((params['max'] != null) && parseFloat(newVal) > parseFloat(params['max'])) {
                newVal = params['max'];
            }
            newVal = this.stepNormalize(newVal);
            this.elem.val(newVal).change();
        }
    };
    numberPolyfill.prototype.decrement = function () {
        var newVal, params;
        if (!this.elem.is(":disabled")) {
            params = this.getParams();
            newVal = numberPolyfill.preciseSubtract(params['val'], params['step']);
            if ((params['min'] != null) && parseFloat(newVal) < parseFloat(params['min'])) {
                newVal = params['min'];
            }
            newVal = this.stepNormalize(newVal);
            this.elem.val(newVal).change();
        }
    };

})(jQuery);
(function () {
	'use strict';

	angular.module('SMART2').directive('colorPicker', ['$parse', '$timeout', function ($parse, $timeout) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				onSelect: '&'
			},
			link: function (scope, element, attrs) {

				var $colorPicker = $(element).find('.colorPicker');
				$colorPicker.on("change.color", function (event, color) {
					if (color) {
						scope.$apply(function () {
							scope.onSelect({
								$event: { color: color }
							});
						});
					}
				});

				$colorPicker.colorpicker({
					showOn: "button",
					history: false
				});

				$(element).bind('click', function (e) {
					e.stopImmediatePropagation();
					$(this).find(".colorPicker").colorpicker("showPalette");
				});

				attrs.$observe('color', function (value) {
					$colorPicker.colorpicker('val', value);
				});
			},
			templateUrl: 'shared/directives/colorPicker/colorPickerTemplate.html'
		};
	}]);
})();
angular.module('SMART2')
.directive("sidenav", [sideNavFunc])
.directive("tabs", [tabsFunc])
.directive("dropdown", ["$compile", "$timeout", dropdownFunc])
.directive('inputDate', ["$compile", "$timeout", inputDateFunc])
.directive("modal", ["$compile", "$timeout", modal])
.directive("slideToggle", [slideToggleFunc])
.directive("collapsible", [collapsibleFunc]);

/*side nav*/
function sideNavFunc() {
    return {
        scope: {
            menuwidth: "@",
            closeonclick: "@"
        },
        link: function (scope, element, attrs) {
            
            element.sideNav({
                menuWidth: (angular.isDefined(scope.menuwidth)) ? scope.menuwidth : undefined,
                edge: attrs.sidenav ? attrs.sidenav : "left",
                closeOnClick: (angular.isDefined(scope.closeonclick)) ? scope.closeonclick == "true" : undefined
            });
        }
    };
}
/*tabs*/
function tabsFunc() {
    return {
        link: function (scope, element, attrs) {
            element.tabs();
            
        }
    };
}

function dropdownFunc($compile, $timeout) {
    return {
        scope: {
            inDuration: "@",
            outDuration: "@",
            constrainWidth: "@",
            hover: "@",
            alignment: "@",
            gutter: "@",
            belowOrigin: "@"
        },
        link: function (scope, element, attrs) {
            var dropdownCode;
            $timeout(function () {
                $compile(element.contents())(scope);
                dropdownCode = element.attr("data-activates");
                element.dropdown({
                    inDuration: (angular.isDefined(scope.inDuration)) ? scope.inDuration : undefined,
                    outDuration: (angular.isDefined(scope.outDuration)) ? scope.outDuration : undefined,
                    constrain_width: (angular.isDefined(scope.constrainWidth)) ? scope.constrainWidth : undefined,
                    hover: (angular.isDefined(scope.hover)) ? scope.hover : undefined,
                    alignment: (angular.isDefined(scope.alignment)) ? scope.alignment : undefined,
                    gutter: (angular.isDefined(scope.gutter)) ? scope.gutter : undefined,
                    belowOrigin: (angular.isDefined(scope.belowOrigin)) ? scope.belowOrigin : undefined
                });
            });
            
            scope.$on('closeDropdown', function(e, obj){
                  if(obj.ddname===dropdownCode){
                    element.trigger("close");  
                  }
            });
        }
    };
};


function inputDateFunc($compile, $timeout) {
   
    var style = $('<style>#inputCreated_root {outline: none;}</style>');
    $('html > head').append(style);

    var dateFormat = function () {

        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function (val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) {
                    val = "0" + val;
                }
                return val;
            };

        return function (date, mask, utc) {

            var dF = dateFormat;

            if (arguments.length === 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

                    
            date = date ? new Date(date) : new Date();
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

             
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function ($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();


    dateFormat.masks = {
        "default": "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

        
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

       
    Date.prototype.format = function (mask, utc) {
        return dateFormat(this, mask, utc);
    };

       
    var isValidDate = function (date) {
        if (Object.prototype.toString.call(date) === '[object Date]') {
            return !isNaN(date.getTime());
        }
        return false;
    };

    return {
        require: 'ngModel',
        scope: {
            container: "@",
            format: "@",
            formatSubmit: "@",
            monthsFull: "@",
            monthsShort: "@",
            weekdaysFull: "@",
            weekdaysLetter: "@",
            firstDay: "=",
            disable: "=",
            today: "=",
            clear: "=",
            close: "=",
            selectYears: "=",
            onStart: "&",
            onRender: "&",
            onOpen: "&",
            onClose: "&",
            onSet: "&",
            onStop: "&",
            ngReadonly: "=?",
            max: "@",
            min: "@"
        },
        link: function (scope, element, attrs, ngModelCtrl) {

            ngModelCtrl.$formatters.unshift(function (modelValue) {
                if (modelValue) {
                    var date = new Date(modelValue);
                    return (angular.isDefined(scope.format)) ? date.format(scope.format) : date.format('d mmmm, yyyy');
        }
                return null;
            });

            var monthsFull = (angular.isDefined(scope.monthsFull)) ? scope.$eval(scope.monthsFull) : undefined,
                monthsShort = (angular.isDefined(scope.monthsShort)) ? scope.$eval(scope.monthsShort) : undefined,
                weekdaysFull = (angular.isDefined(scope.weekdaysFull)) ? scope.$eval(scope.weekdaysFull) : undefined,
                weekdaysLetter = (angular.isDefined(scope.weekdaysLetter)) ? scope.$eval(scope.weekdaysLetter) : undefined;


            $compile(element.contents())(scope);
            if (!(scope.ngReadonly)) {
                $timeout(function () {
                    var pickadateInput = element.pickadate({
                        container: (angular.isDefined(scope.container)) ? scope.container : 'body',
                        format: (angular.isDefined(scope.format)) ? scope.format : undefined,
                        formatSubmit: (angular.isDefined(scope.formatSubmit)) ? scope.formatSubmit : undefined,
                        monthsFull: (angular.isDefined(monthsFull)) ? monthsFull : undefined,
                        monthsShort: (angular.isDefined(monthsShort)) ? monthsShort : undefined,
                        weekdaysFull: (angular.isDefined(weekdaysFull)) ? weekdaysFull : undefined,
                        weekdaysLetter: (angular.isDefined(weekdaysLetter)) ? weekdaysLetter : undefined,
                        firstDay: (angular.isDefined(scope.firstDay)) ? scope.firstDay : 0,
                        disable: (angular.isDefined(scope.disable)) ? scope.disable : undefined,
                        today: (angular.isDefined(scope.today)) ? scope.today : undefined,
                        clear: (angular.isDefined(scope.clear)) ? scope.clear : undefined,
                        close: (angular.isDefined(scope.close)) ? scope.close : undefined,
                        selectYears: (angular.isDefined(scope.selectYears)) ? scope.selectYears : undefined,
                        onStart: (angular.isDefined(scope.onStart)) ? function () { scope.onStart(); } : undefined,
                        onRender: (angular.isDefined(scope.onRender)) ? function () { scope.onRender(); } : undefined,
                        onOpen: (angular.isDefined(scope.onOpen)) ? function () { scope.onOpen(); } : undefined,
                        onClose: (angular.isDefined(scope.onClose)) ? function () { scope.onClose(); } : undefined,
                        onSet: (angular.isDefined(scope.onSet)) ? function () { scope.onSet(); } : undefined,
                        onStop: (angular.isDefined(scope.onStop)) ? function () { scope.onStop(); } : undefined
                    });
                 
                    var picker = pickadateInput.pickadate('picker');

            
                    scope.$watch('max', function (newMax) {
                        if (picker) {
                            var maxDate = new Date(newMax);
                            picker.set({ max: isValidDate(maxDate) ? maxDate : false });
                        }
                    });
                    scope.$watch('min', function (newMin) {
                        if (picker) {
                            var minDate = new Date(newMin);
                            picker.set({ min: isValidDate(minDate) ? minDate : false });
                        }
                    });
                });
            }
        }
    };
};
/*modal*/
var modalCounter = 0;


function modal($compile, $timeout) {
    return {
        restrict: 'E',
        scope: {},
        link: function (scope, element, attrs) {
            scope.templateUrl = attrs.templateUrl;
            scope.title = attrs.title;
            modalCounter = modalCounter + 1;
            scope.modalCounter = modalCounter;

            setTimeout(function () {
                angular.element('#modalButton' + modalCounter).leanModal();
            });
        },
        template: '<div><a id="modalButton{{modalCounter}}" class="waves-effect waves-light btn modal-trigger" href="#modal{{modalCounter}}" modal>{{title}}</a><div id="modal{{modalCounter}}" class="modal modal-sm" ng-include="templateUrl"></div>'
    };
}

function slideToggleFunc() {
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope) { },
        link: function (scope, element, attr) {
            element.bind('click', function () {
                var $slideBox = angular.element(attr.slideToggle);
                var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;
                $slideBox.stop().slideToggle(slideDuration);
            });
        }
    };
}

/*tabs*/
function collapsibleFunc() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.collapsible();
        }
    };
}
(function () {
    'use strict';
    angular.module('SMART2').factory('notification', [function () {
        var Obj = {};
        Obj.show = false;
        Obj.onCallback = undefined;

        Obj.on = function (callback) {
            Obj.onCallback = callback;
        };

        Obj.notify = function (config, callback) {
            this.show = true;
            this.config = config;
            this.broadcastItem();
            this.resultCallBack = function (result) {
                if (typeof (callback) == 'function') {
                        callback(result);
                }
            };
        };

        Obj.broadcastItem = function () {
            angular.isFunction(Obj.onCallback) && Obj.onCallback();
        };

        return Obj;
    }]);

    angular.module('SMART2').directive('smartNotification', ['$rootScope', 'notification', '$translate', '$sce', function ($rootScope, notification, $translate, $sce) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                showN: "@"
            },
            link: function (scope, element, attrs) {
                var topPositionBeforeModalOpen = 0;

                /*
                 *  Unbind window keyup listener and assign tabindex back to .picker elements
                 */
                var reset = function () {
                    $(window).off('keyup', onWindowKeyUp);
                    angular.element('.picker').attr("tabindex", 0);
                    angular.element(document).scrollTop(topPositionBeforeModalOpen);
                };

                /*
                 *  window on key up event listener
                 */
                var onWindowKeyUp = function (e) {
                    if (angular.element(e.target).closest('.modal').length == 0 && e.keyCode == 9) {
                        angular.element(element.find(':focusable')[0]).focus();
                    }
                };

                /*
                 *  On notification listener
                 */
                scope.dismissible = true;
                notification.on(function () {
                    scope.dismissible = angular.isDefined(notification.config.dismissible) ? notification.config.dismissible : true;
                    scope.showN = notification.show;
                    scope.config = notification.config;
                    scope.buttons = scope.config.buttons;
                    switch (scope.config.type) {
                        case "success":
                            scope.notifyClass = 'notify-success';
                            scope.title = $translate.instant("SUCCESS") + "!";
                            scope.icon = "#icon_CircleCheck";
                            break;
                        case "error":
                            scope.notifyClass = 'notify-error';
                            scope.title = $translate.instant("ERROR") + "!";
                            scope.icon = "#icon_Exclamation";
                            break;
                        case "warning":
                            scope.notifyClass = 'notify-warning';
                            scope.icon = "#icon_Warning";
                            scope.title = $translate.instant("WARNING") + "!";
                            break;
                        case "confirm":
                            scope.notifyClass = 'notify-confirm';
                            scope.icon = "#icon_Help";
                            scope.title = $translate.instant("CONFIRMATION");
                            break;
                        case "inform":
                            scope.notifyClass = 'notify-information';
                            scope.icon = "#icon_Info";
                            scope.title = $translate.instant("INFORMATION");
                            break;
                        case "sessionTimeOut":
                            scope.notifyClass = 'notify-session-timeout';
                            scope.icon = "#icon_AlertTimer";
                            scope.title = $translate.instant("Session timed out");
                            scope.dismissible = false;
                            break;
                        case "sessionExpire":
                            scope.notifyClass = 'notify-session-expire';
                            scope.icon = "#icon_AlertTimer";
                            scope.title = $translate.instant("your session is about to expire");
                            scope.dismissible = false;
                            break;
                    };
                    //scope.dismissible = (typeof notification.config.dismissible != "undefined")?(notification.config.dismissible) ? true : false : scope.dismissible;
                    scope.message = $sce.trustAsHtml(scope.config.message);
                    scope.checkboxText = scope.config.checkMessage;
                    scope.isCheckSelect = false;

                    setTimeout(function () {
                        angular.element(element.find(':focusable')[0]).focus();
                        $(window).on('keyup', onWindowKeyUp);
                        //  remove picker tabindex when popup to avoid focus on picker element
                        angular.element('.picker').removeAttr("tabindex");
                    });

                    topPositionBeforeModalOpen = angular.element(document).scrollTop();
                });

                scope.showN = false;
                scope.overlayCLicked = function () {
                    if (scope.dismissible) {
                        scope.showN = false;
                    }
                }
                scope.clickCallbackFunction = function (e) {
                    scope.showN = false;
                    var responceObj = {
                        "result": e,
                        "isChecked": scope.isCheckSelect
                    };
                    notification.resultCallBack(responceObj);
                    $rootScope.$broadcast("closedPopup");
                };

                scope.$on('$destroy', function () {
                    reset();
                });
            },
            templateUrl: 'shared/directives/notification/notificationTemplate.html',
        }
    }]);
})();
(function() {
	'use strict';
	angular
    .module('SMART2')
    .directive('onCaptureClick', ['$parse', function ($parse) {
      return {
        restrict: 'A',
        compile: function(element, attrs) {
          var fn = $parse(attrs.onCaptureClick);
          return function(scope, element) {
            element[0].addEventListener('click', function(event) {
              scope.$apply(function() {
                fn(scope, {
                  $event: event
                });
              });
            }, true);
          };
        }
      }
    }]);
})(angular);
(function () {
    'use strict';
    angular.module('SMART2').directive('onLoad', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                onLoadCallback: '&',
            },
            link: function (scope, element, attrs) {
                (scope.onLoadCallback) ? scope.onLoadCallback = scope.$eval(scope.onLoadCallback) : null;
                if (angular.isFunction(scope.onLoadCallback)) {
                    $timeout(function () {
                        scope.onLoadCallback();
                    }, 0);
                }
            }
        };
    }]);
})();

(function() {
    'use strict';
    angular.module('SMART2').directive('smartCarousel', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                "apiObj": "=",
                "carouselArr": "=",
                "arrowClick": "&",
                "getItem": "&"
            },
            link: function(scope, element, attrs) {
                var margin = 0;
                var marginToChange = "margin-left";
                var dimensionToChange = "width";
                var textAlign = "left";
                var stepSize = 114;

                scope.scrollBarClass = "scrollBarClass " + scope.carouselArr.classes;
                scope.arrowClass = "icon iconMedium reqNavArrow " + scope.carouselArr.arrow;

                if (scope.carouselArr.type == "vertical") {
                    marginToChange = "margin-top";
                    dimensionToChange = "height";
                    textAlign = "top";
                    stepSize = 94;
                }

                scope.internalAPIObj = scope.apiObj || {};
                scope.internalAPIObj.arrowClick = function(item) {
                    scope.arrowClick(scope, {
                        e: item
                    });
                };

                scope.getClickedItem = function (item) {
                	scope.getItem({ e: item });
                }

                scope.internalAPIObj.resetUI = function(availableLength, setMargin, add) {
                    var collectionEle = angular.element(element.children()[1]);
                    collectionEle.css("text-align", textAlign);
                    var length = scope.carouselArr.items.length * stepSize;
                    if (dimensionToChange == "height") {
                        collectionEle.css("height", length);
                        collectionEle.css("transition", "all 0.25s ease");
                    } else {
                        collectionEle.css("width", length);
                        collectionEle.css("transition", "all 0.25s ease");
                    }
                    if (setMargin) {
                        var lMarg = (length - (availableLength));
                        lMarg = lMarg * -1;
                    }
                    if ((availableLength) <= length) {
                        if (setMargin) {
                            collectionEle.css(marginToChange, lMarg);
                        }
                        scope.showArrow = true;
                    } else {
                        if (setMargin) {
                            collectionEle.css(marginToChange, lMarg);
                        } else {
                            collectionEle.css(marginToChange, "");
                        }
                        scope.showArrow = false;
                    }
                    if (typeof add != "undefined") {
                        if ((scope.carouselArr.id == "rightBar") && add) {
                            collectionEle.css({
                                "transition": "none",
                                "margin-left": "-120px"
                            });
                            $timeout(function() {
                                collectionEle.css({
                                    "transition": "all 0.5s ease",
                                    "margin-left": "0"
                                });
                            }, 0);
                        } else if ((scope.carouselArr.id == "rightBar") && (!add)) {
                            collectionEle.css({
                                "transition": "none",
                                "margin-left": "120px"
                            });
                            $timeout(function() {
                                collectionEle.css({
                                    "transition": "all 1s ease",
                                    "margin-left": "0"
                                });
                            }, 0);
                        } else if ((scope.carouselArr.id == "bottomBar") && (add)) {
                            collectionEle.css({
                                "transition": "none",
                                "margin-top": "-120px"
                            });
                            $timeout(function() {
                                collectionEle.css({
                                    "transition": "all 0.5s ease",
                                    "margin-top": "0"
                                });
                            }, 0);
                        } else if ((scope.carouselArr.id == "bottomBar") && (!add)) {
                            collectionEle.css({
                                "transition": "none",
                                "margin-top": "120px"
                            });
                            $timeout(function() {
                                collectionEle.css({
                                    "transition": "all 0.5s ease",
                                    "margin-top": "0"
                                });
                            }, 0);
                        }
                    }
                };
            },
            templateUrl: 'shared/directives/smartCarousel/smartCarousel.html'
        };
    }]);
})();

  /**
   * @memberof SMART2
   * @ngdoc directive
   * @name Sliding-menu
   * @description This directive is useful for creating a sliding menu.
   * 
   * @attr {Number} right
   *    Menu's right position
   * @attr {Number} top
   *    Menu's top position
   * @attr {Boolean} show
   *    Sliding menu will toggle as soon as value of this attribute changes
   * @attr {Boolean} modify-parent-style
   *    This attribute is useful when parent does not need to animated. For e.g. Default behaviour is when 'show' is set to true, 
   *    parent element gets resized depending upon the width of sliding-menu.
   * @attr {Boolean} detach-default-class
   *    If this attribute is set to true, default class will not be applied to directive's template
   * @attr {String} include-template
   *    Template to be used
   * 
   * @example
   Usage:
   <smart-sliding-menu>
        //  Contents will go here
   </smart-sliding-menu>
   */

(function () {
    'use strict';
    angular.module('SMART2').directive('smartSlidingMenu', ['RuleEngine', '$timeout', '$compile', '$translate', '$rootScope', function (RuleEngine, $timeout, $compile, $translate, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                right: '@',
                top: '@',
                show: '=',
                detachDefaultClass: '@',
                includeTemplate: '@',
                model: '@',
                modifyParentStyle: '@'
            },
            link: function (scope, $element, $attrs, controller) {
                scope.getModel = function () {
                    return JSON.parse(scope.model);
                };
                if (scope.detachDefaultClass) {
                    if (scope.detachDefaultClass.toLowerCase() === "true") {
                    } else {
                        $element.addClass('secondary-navigation white');
                    }
                } else {
                    $element.addClass('secondary-navigation white');
                }

                scope.slidingMenuId = 'sliding-menu-' + new Date().getTime();
                scope.rightPos = scope.right ? scope.right : 0;
                scope.leftPos = window.innerWidth - scope.rightPos;

                scope.$watch('show', function (newValue, oldValue) {
                    if (newValue != undefined || newValue != null) {
                        if (newValue) {
                            if (scope.modifyParentStyle) {
                                if (scope.modifyParentStyle.toLowerCase() !== 'false') {
                                    $element.parent().css({
                                        width: 'calc(100% - ' + $element.outerWidth(true) + 'px)'
                                    });
                                }
                            }
                            $element.css({
                                transform: 'translateX(-' + ($element.outerWidth(true) - scope.rightPos) + 'px)'
                            });
                        }
                        else {
                            if (scope.modifyParentStyle) {
                                if (scope.modifyParentStyle.toLowerCase() !== 'false') {
                                    $element.parent().css({
                                        width: 'calc(100% - ' + scope.rightPos + 'px)'
                                    });
                                }
                            }
                            $element.css({
                                transform: 'translateX(0px)'
                            });
                        }
                    }
                });
            },
            templateUrl: 'shared/directives/slidingMenu/slidingMenuTemplate.html'
        };
    }]);
})();
(function () {
	'use strict';

	angular.module('SMART2').directive('countdown', ['$interval', function ($interval) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				date: '@'
			},
			link: function (scope, element, attrs) {

				var from = new Date(attrs.date);

				function timer(t) {
					var days = Math.floor(t / 86400);
					t -= days * 86400;
					var hours = Math.floor(t / 3600) % 24;
					t -= hours * 3600;
					var minutes = Math.floor(t / 60) % 60;
					t -= minutes * 60;
					var seconds = t % 60;
					if (!days && !hours && !minutes && !seconds) {
						if (angular.isDefined(timerObj)) {
							$interval.cancel(timerObj);
						}
						return;
					}
					return days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
				}
				var timerObj = $interval(function () {
					var diff = Math.floor((from.getTime() - new Date().getTime()) / 1000);
					$(element).text(timer(diff));
				}, 1000)

			}
		};
	}]);
})();
(function () {
	'use strict';
	angular.module('SMART2').directive('smartDocSlider', ['$parse', function ($parse) {
		return {
			restrict: 'E',
			replace: true,
			scope: true,
			link: function (scope, element, attrs) {

				var onHide = $parse(attrs.onHide);

				attrs.$observe("slideObj", function (value) {
					if (attrs.slideObj) {

						var slideObj = JSON.parse(attrs.slideObj);
						scope.src = slideObj.src;
						scope.list = slideObj.list;
						scope.index = slideObj.index;

						scope.nextIndex = angular.copy(scope.index);
						scope.prevIndex = angular.copy(scope.index);

						var listLength = scope.list.length;

						if (scope.index == 0) {
							scope.nextIndex++;
							scope.prevIndex = listLength - 1;
						}
						else if (scope.index == listLength - 1) {
							scope.nextIndex = 0;
							scope.prevIndex--;
						}
						else if (scope.index < listLength - 1) {
							scope.nextIndex++;
							scope.prevIndex--;
						}
					}
				});

			    //Need to change the code
				scope.$watch(attrs.ngShow, function (value) {
				    console.log(value, "value")
				    if (value) {

				        angular.element('body').css('overflow', 'hidden');
				    } else {
				        angular.element('body').css('overflow', '');
				    }
				});

				scope.next = function () {

					var listLength = scope.list.length;
					var modal = angular.element('.slide-view-modal');

					modal.css('left', '-50%');
					
					if (scope.index < listLength - 1)
						scope.index++;
					else if (scope.index == listLength - 1)
						scope.index = 0;

					if (scope.index == 0) {
						scope.nextIndex = (angular.copy(scope.index)) + 1;
						scope.prevIndex = listLength - 1;
					}
					else if (scope.index == listLength - 1) {
						scope.nextIndex = 0;
						scope.prevIndex = (angular.copy(scope.index)) - 1;
					}
					else if (scope.index < listLength - 1) {
						scope.nextIndex = (angular.copy(scope.index)) + 1;
						scope.prevIndex = (angular.copy(scope.index)) - 1;
					}
					setTimeout(function () {
						modal.css('transition', 'none');
						modal.css('display', 'none');
						modal.css('left', '150%');
						modal.css('display', 'block');
					}, 350);
					setTimeout(function () {
						modal.css('transition', '0.5s ease-in-out');
						modal.css('left', '50%');
					}, 370);
				}

				scope.prev = function () {

					var listLength = scope.list.length;
					var modal = angular.element('.slide-view-modal');

					modal.css('left', '150%');

					if (scope.index > 0)
						scope.index--;
					else if (scope.index == 0)
						scope.index = listLength - 1;

					if (scope.index == 0) {
						scope.prevIndex = (angular.copy(scope.index)) + 1;
						scope.prevIndex = listLength - 1;
					}
					else if (scope.index == listLength - 1) {
						scope.prevIndex = 0;
						scope.prevIndex = (angular.copy(scope.index)) - 1;
					}
					else if (scope.index < listLength - 1) {
						scope.nextIndex = (angular.copy(scope.index)) + 1;
						scope.prevIndex = (angular.copy(scope.index)) - 1;
					}
					setTimeout(function () {
						modal.css('transition', 'none');
						modal.css('display', 'none');
						modal.css('left', '-50%');
						modal.css('display', 'block');
					}, 350);
					setTimeout(function () {
						modal.css('transition', '0.7s ease-in-out');
						modal.css('left', '50%');
					}, 370);
				};

				
				scope.close = function () {
					
					if (angular.isFunction(onHide)) {
						scope.$apply(function () {
							onHide(scope, { e: "" });
						});
					}
				};
			},
			templateUrl: 'shared/directives/smartDocSlider/smartDocSlider.html'
		};
	}]);
})();


(function () {
    'use strict';
    angular.module('SMART2').directive('smartGlobalLoader', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: true,
            link: function (scope, element, attrs) {
                var isFixed = attrs.isFixed && attrs.isFixed == "true";
                if (isFixed) {
                    scope.modalLoaderStyle = { position: 'fixed' };
                }
                attrs.$observe('isFixed', function (value) {
                    isFixed = value && value == "true";
                    if (isFixed) {
                        scope.modalLoaderStyle = { position: 'fixed' };
                    }
                });
            },
            templateUrl: 'shared/directives/smartGlobalLoader/smartGlobalLoader.html'
        };
    });
})();
/**
 * @memberof SMART2
 * @ngdoc directive
 * @name SmartHierarchy
 * @description This directive is useful for creating hierarchical structure.
 * 
 * @attr {Object} config
 *    Config object is expected to decide the behaviour of the component.
 * @attr {Function} callback
 *    Callback function when selections are done in component
 * 
 * @example
Controller : 
    config :
     $scope.treeComponentConfig = {
                selectedNodes: "", // Coma seperated codes string given to component for pre selection, 
                				   // so the default selections can be shown selected when the component 
                				   // in initialized.
                isRadio: false, // Boolean values to toggle between checkBox & radioButton
                getHierarchyOnSelection: true, // If set to true , selection hierarchy
                                               // (uptil the relevent parent) also will be recieved 
                                               // in selection callback.
                isLazyLoad: true, // If set to true, data would be fetched from the server on demand 
                                  // (lazyLoading on scroll & node expansion)
                data: null, // Custom data can also be passed to component, representation would be in hierarchical manner.
                disableLevelSelection: '', // comma seperated string values of levels to be shown disabled eg. "1,2,3".
                title: 'Category', // Title of the component.
                getSelections: false, // On setting it true, it will call the callback function 
                                      // provided to the component with seleted values in the ouput.
                clearCache: false, // On setting it true, it will clear the Java script heap 
                                   // runtime memory which will reduce the memory foot print of the web page.
                height: '328px', // Height can be set to the component.
                isSearchEnabled : true, // Bollean value to toggle the visibility of search bar.
                requestParameter: { // Request parameter is expected to fetch the data from the server. 
                    navigationContext: "PAS",
                    userExecutionContext: '{"ClientName":"abc,....}',
                    documentCode: null,
                    contactCode: null,
                }
            };
    callback :
         $scope.treeComponentCallback = function (e) {
                console.log(e);

                // Un comment the below logic to see admin use case.
                // TODO : getHierarchyOnSelection:true (in tree config)

                // var obj = { 'PASList': [] };
                // var levelData = _.groupBy(_.flatten(e.selectionHierarchy), "Level");
                // _.each(levelData, function (data, key) {
                    // _.each(data, function (n) {
                        // n['selection'] = "0";
                    // });
                    // obj['PASList'].push({
                        // "Level": key,
                        // "PASDetails": data
                    // });
                // });
                // $scope.treeComponentConfig.isRadio = true;
                // $scope.treeComponentConfig.data = obj;
                // $scope.treeComponentConfig.selectedNodes = e.selections[0]['ID'].toString();
         }
  Usage:
      <smart-hierarchy-component config="treeComponentConfig" callback="treeComponentCallback"></smart-hierarchy-component>
      */
      (function (angular) {
      	'use strict';
        angular.module('smartHierarchyComponent', [])
        .directive('smartHierarchyComponent', ['$timeout', 'RESTApi', '$q', '$rootScope',
          function($timeout, RESTApi, $q, $rootScope) {
           return {
            restrict : 'E',
            replace : true,
            scope : {
             config: '=',
             callback: '&'
           },
           link : function(scope, element, attrs) {
             /*config for the directive*/

             scope.treeConfig = scope.config;
             var doneCallback = scope.$eval(scope.callback);

             scope.config.refreshConfig = function (newData) {
              scope.treeConfig = newData;
              resetValue(scope.treeConfig);

            }

            var resetValue = function(data)
            {         
               if (scope.treeConfig.isRadio) {

               scope.uniqueRadioGroupName = uniqueIDGenerator();
            }

            if(scope.treeConfig.clearCache)
            {
               resetDataSourcesAndPromises();
               scope.isLoading = false;
               scope.treeConfig.clearCache = false;
            }



             dataRecievedCallPromise;
             preselectionRecievedPromise;
             promises = [];

             /*Local variables*/
             navContext = scope.treeConfig.navigationContext;
             isLazyLoadServerData = (scope.treeConfig.isLazyLoad == true || scope.treeConfig.isLazyLoad == false) ? scope.treeConfig.isLazyLoad : false;
             dataSet;
             searchBucket = 50;
             lazyLoadingBucket = 50;
             maxLevel = 1;
             lazyLoadOffset;
             lazyLoadMarker = [];
             levelKey = 'level';

             //levelWiseData = {};
             parentStringConstant = "parentString";
             parentCodeStringConstant = "parentCodeString";
             preselection;
             isInitialServiceCalled = false;
             searchCategories = [];
             baseLevelExpectNode = [];

             nodeExpandingCodeProperty;
             dataProperty;
             levelWiseDataProperty;
             searchProperty;
             modelProperty;

             //scope.totalSelection = 0;
             //totalID = [];
             //totalName = [];

             selectAllBool = false;

             scope.getUserSelectionArray =[];
             scope.selectionAndCountOptions = false;

             scope.treeType = scope.treeConfig.treeType;
             scope.isReadOnly = scope.treeConfig.isReadOnly;
             scope.isDisabled = scope.treeConfig.isDisabled;
             scope.isSingleSelect = scope.treeConfig.isRadio;

             

            // if(scope.treeConfig.requestParameter)
            // {
              
            //           //scope.treeConfig.requestParameter = n;
            //           RESTApi.setDocumentId(scope.treeConfig.requestParameter.documentCode);
            //           RESTApi.setContactCode(scope.treeConfig.requestParameter.contactCode);
            //           RESTApi.setUserContext(scope.treeConfig.requestParameter.userExecutionContext);
            //           RESTApi.setEnvironment(scope.treeConfig.requestParameter.environment);
            //           RESTApi.setRequestObject(scope.treeConfig.requestParameter.requestObject);
            //           setKeysAsPerNavigationContext(scope.treeConfig.requestParameter.navigationContext);
            //           navContext = scope.treeConfig.requestParameter.navigationContext;
                    
            //         init();
                  
            // }

            scope.showSelectAll = scope.treeConfig.showSelectAll;
            scope.showClearSelection = scope.treeConfig.showClearSelection;
            scope.showSelectionCount = scope.treeConfig.showSelectionCount;
            scope.enableLastLevelSelection  = scope.treeConfig.enableLastLevelSelection;
            
           }; 


            /* scope.$watch('config', function (n, o) {
              if (n) {
                scope.treeConfig = null;
                scope.treeConfig = scope.config;
                clearAllsearch();
               
                dataRecievedCallPromise;
                preselectionRecievedPromise;
                promises = [];
               
                navContext = scope.treeConfig.navigationContext;
                isLazyLoadServerData = (scope.treeConfig.isLazyLoad == true || scope.treeConfig.isLazyLoad == false) ? scope.treeConfig.isLazyLoad : false;
                dataSet;
                searchBucket = 50;
                lazyLoadingBucket = 50;
                maxLevel = 1;
                lazyLoadOffset;
                lazyLoadMarker = [];
                levelKey = 'level';
                levelWiseData = {};
                parentStringConstant = "parentString";
                parentCodeStringConstant = "parentCodeString";
                preselection;
                isInitialServiceCalled = false;
                searchCategories = [];
                baseLevelExpectNode = [];
                nodeExpandingCodeProperty;
                dataProperty;
                levelWiseDataProperty;
                searchProperty;
                modelProperty;
                scope.totalSelection = 0;
                totalID = [];
                totalName = [];
                selectAllBool = false;
                scope.getUserSelectionArray =[];
                scope.treeType = scope.treeConfig.treeType;
                scope.isReadOnly = scope.treeConfig.isReadOnly;
                scope.isDisabled = scope.treeConfig.isDisabled;
              }
            });*/

            function clearAllsearch()
            {
              serverSearchVal = "";
              scope.searchResults.length = 0;
              searchDataYetToBeDisplayed.length = 0;
              searchWithContainsHitResult.length = 0;
              scope.searchText = '';
              scope.searchFieldVal = '';
            }


            /*scope.$watch('config.clearCache', function (n, o) {
              if (n) {
               resetDataSourcesAndPromises();
               scope.isLoading = false;
               scope.config.clearCache = false;
             }
          });*/


            scope.$watch('config.getSelections', function (n, o) {
              if(n){
               getSelections();
               scope.config.getSelections = false;
             }
           });


            scope.$watch('config.requestParameter', function(n, o) {
      						//if (!scope.treeConfig.data && n) {
      							if (n) {
                      scope.treeConfig.requestParameter = n;
                      RESTApi.setDocumentId(n.documentCode);
                      RESTApi.setContactCode(n.contactCode);
                      RESTApi.setUserContext(n.userExecutionContext);
                      RESTApi.setEnvironment(n.environment);
                      RESTApi.setRequestObject(n.requestObject);
                      setKeysAsPerNavigationContext(n.navigationContext);
                      navContext = n.navigationContext;
      							//request params than it must go in 
      							//if (!isInitialServiceCalled)
      							init();
      						}
      						//scope.treeConfig.requestParameter = null;
      					});



            scope.$watch('config.selectedNodes', function (n, o) {
              if (n) {
               preselection = n.split(',');
               if (preselectionRecievedPromise)
                preselectionRecievedPromise.resolve();
            }
            scope.config.selectedNodes = null;
          });



            /*scope.$watch('config.isRadio', function(n, o) {
              scope.isSingleSelect = n;
              if (scope.isSingleSelect) {
               scope.uniqueRadioGroupName = uniqueIDGenerator();
             }
             scope.config.isRadio = false;
           });*/


            scope.$watch('config.data', function(n, o) {
              if (n) {
               setKeysAsPerNavigationContext(scope.treeConfig.navigationContext);
               navContext = scope.treeConfig.navigationContext;
               resetDataSourcesAndPromises(true);
               createLevelWiseDataSet(_.sortBy(n[dataProperty], 'Level'));
               dataRecievedCallPromise.resolve();
               renderLevels();
             }
             scope.config.data = null;
           });


            var navContext;
            /*promise*/
            var dataRecievedCallPromise;
            var preselectionRecievedPromise;
            var promises = [];
            var selectAllBool = false;
            /*Local variables*/
            var isLazyLoadServerData = (scope.treeConfig.isLazyLoad == true || scope.treeConfig.isLazyLoad == false) ? scope.treeConfig.isLazyLoad : false;
            var dataSet;
            var searchBucket = 50;
            var lazyLoadingBucket = 50;
            var maxLevel = 1;
            var lazyLoadOffset;
            var lazyLoadMarker = [];
            var levelKey = 'level';
            var levelWiseData = {};
            var parentStringConstant = "parentString";
            var parentCodeStringConstant = "parentCodeString";
            var preselection;
            var isInitialServiceCalled = false;
            var searchCategories = [];
            var baseLevelExpectNode = [];
            var nodeExpandingCodeProperty;
            var dataProperty;
            var levelWiseDataProperty;
            var searchProperty;
            var modelProperty;
            var treeTypeObject ="Generic"; 
            scope.codeProperty = 'ID';
            scope.titleProperty = 'Name';
            scope.levelProperty = 'Level';
            scope.parentProperty = 'ParentID';
            scope.getUserSelectionArray =[];
            scope.treeType = "Generic";
            scope.totalSelection = 0;
            
            scope.isReadOnly = false;
            scope.isDisabled = false;

            scope.showSelectAll = false;
            scope.showClearSelection = false;
            scope.showSelectionCount = false;
            scope.enableLastLevelSelection = false;

            scope.selectionAndCountOptions = false;
            var totalID = [];
            var totalName = [];

            function setKeysAsPerNavigationContext(mode) {
              switch(mode) {
               case 'PAS':
               nodeExpandingCodeProperty = 'PASCodes';
               dataProperty = 'PASList';
               levelWiseDataProperty = 'PASDetails';
               searchProperty = 'PAS_SearchList';
               scope.codeProperty = 'ID';
               scope.titleProperty = 'Name';
               scope.levelProperty = 'Level';
               scope.parentProperty = 'ParentID';
               modelProperty = 'SelectedPasCodeList';
               break;
               case 'REG':
               nodeExpandingCodeProperty = 'RegionId';
               levelWiseDataProperty = 'RegionDetails';
               dataProperty = 'RegionList';
               searchProperty = 'Region_SearchList';
               scope.codeProperty = 'ID';
               scope.titleProperty = 'Name';
               scope.levelProperty = 'Level';
               scope.parentProperty = 'ParentID';
               modelProperty = 'SelectedRegionList';
               break;
               case 'ORG':
               nodeExpandingCodeProperty = 'EntityDetailCode';
               levelWiseDataProperty = 'EntityDetails';
               dataProperty = 'Org_DetailsList';
               searchProperty = 'Org_SearchList';
               scope.codeProperty = 'EntityDetailCode';
               scope.titleProperty = 'EntityDisplayName';
               scope.levelProperty = 'Level';
               scope.parentProperty = 'ParentEntityDetailCode';
               modelProperty = 'SelectedORGList';
               break;
             };
           };

           scope.selectedData = [];

           /*Local member fuctions*/

           function resetDataSourcesAndPromises(isPromiseInit) {
            levelWiseData = {};
            scope.categories = [];
            lazyLoadMarker = [];
            scope.isLoading = true;
            scope.isError = false;

            scope.selectedData = [];
            scope.getUserSelectionArray =[];

            scope.totalSelection = 0;
            totalID = [];
            totalName = [];

            if (isPromiseInit) initializePromise(true, true);
          };

          function init() {
            scope.selectionAndCountOptions = false;
            isInitialServiceCalled = true;
            resetDataSourcesAndPromises(true);
            RESTApi.getData(navContext, function(response) {
             isInitialServiceCalled = false;
             if (response.action == 'success') {
              if (isLazyLoadServerData) {
               //setLevelWiseData(response.data.data);
               setLevelWiseDataSource(response.data.data);
             } else {
               createLevelWiseDataSet(_.sortBy(response.data.data[dataProperty], 'Level'));
             }
             renderLevels();

             
						//createSelectedModelIfRecieved(response.data.data.SelectedPasCodeList);
						createSelectedModelIfRecieved(response.data.data[modelProperty]);
						dataRecievedCallPromise.resolve();

            if(scope.treeType == treeTypeObject)
            { 
            }else
              { //working perfect in porject team case
                scope.totalSelection= scope.selectedData.length;  
              }


            } else {
              if (scope.isLoading) scope.isLoading = false;
              scope.isError = true;
            }
          }, (isLazyLoadServerData) ? {
           "LevelAt" : "1",
           "PageNumber" : 1,
           "PageSize" : lazyLoadingBucket
         } : {});
          };

          scope.getSelectAllBool = function(){
           if(scope.categories && scope.categories.length > 0)
           {
            var selectedNodes = _.filter(scope.categories,function(node){
              return (node.selection == "1" || node.disabled == true)
            });
            if(scope.categories.length>0 && selectedNodes.length == scope.categories.length){
              selectAllBool = true;
            }else{
              selectAllBool = false;
            }

          }else{
            selectAllBool = false;
          }
          return selectAllBool;
        }

        function createSelectedModelIfRecieved(data) {
          if (data && data.length > 0)
           scope.selectedData = getLeafNodeWithParentHierarchy(data);
       };

       function renderLevels() {

        scope.categories = levelWiseData[levelKey + '1'].slice(0, lazyLoadingBucket);
        if (scope.categories.length % lazyLoadingBucket == 0)
         lazyLoadMarker.push(scope.categories[scope.categories.length - 1]);
       scope.isLoading = false;
     
        if(scope.categories.length > 0)
             {
              scope.selectionAndCountOptions =  true;
             }
     };


     function initializePromise(dataRievedPromiseBool, preselectionRecievedPromiseBool) {
      dataRecievedCallPromise = null;
      preselectionRecievedPromise = null;
      promises.length = 0;
      if (dataRievedPromiseBool) {
       dataRecievedCallPromise = $q.defer();
       promises.push(dataRecievedCallPromise.promise);
     }
     if (preselectionRecievedPromiseBool) {
       preselectionRecievedPromise = $q.defer();
       promises.push(preselectionRecievedPromise.promise);
     }
     $q.all(promises).then(promiseResolved);
   }



   function promiseResolved() {
    initatePreSelection();
    initializePromise(false, true);
  }

  function createLevelWiseDataSet(dataSet) {
    var level = 1;
    var parentNodes = dataSet[level - 1][levelWiseDataProperty];
    insertParentHierarchyForFlatStrucure(parentNodes);
    while (parentNodes) {
     levelWiseData[levelKey + level] = (levelWiseData[levelKey + level]) ? _.map(_.groupBy(_.union(levelWiseData[levelKey + level], parentNodes), function(doc) {
      return doc[scope.codeProperty];
    }), function(grouped) {
      return grouped[0];
    }) : parentNodes;
     if (dataSet[level]) {
      insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet);
    };
    maxLevel = level;
    level = level + 1;
    parentNodes = (dataSet[level - 1]) ? dataSet[level - 1][levelWiseDataProperty] : null;
  };

};

function insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet) {
  var fetchedData = (level) ? _.groupBy(dataSet[level][levelWiseDataProperty], scope.parentProperty) : null;
  _.each(parentNodes, function(parent) {
   var childForParent = (fetchedData) ? fetchedData[parent[scope.codeProperty]] : parentNodes;
   if (childForParent) {
    _.each(childForParent, function(node, index) {
     node[parentStringConstant] = parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + node[scope.titleProperty] : (node[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + node[scope.titleProperty] : "";
     node[parentCodeStringConstant] = parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + node[scope.codeProperty] : (node[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + node[scope.codeProperty] : "";
     node['isExpanded'] = false;
     node['selection'] = (node && node.selection && (node.selection == "1" || node.selection == "0") && !scope.isSingleSelect) ? node.selection : (node.IsSelected == false || node.IsSelected == null || node.IsSelected) ? getSelectionState(node.IsSelected) : '0',
     checkDisableForPartialNode(node);
     node['index'] = index;

     if(node.selection == "1")
     {

      var index = totalID.indexOf(node[scope.codeProperty]);
      if (index > -1) {
      }else
      {
        totalID.push(node[scope.codeProperty]);
        totalName.push(node[scope.titleProperty]);
        scope.totalSelection++;
      }
    }


  });
  }
});
};



function checkDisableForPartialNode(node){
  if(scope.treeConfig.requestParameter)
  {   
      if(!scope.treeConfig.requestParameter.getComplete && scope.treeConfig.requestParameter.contactCode && node.selection=='2'){

    node.disabled = true;

  }else
  {
    node.disabled = false;
  }
  }else
  {
    node.disabled = false;
  }
  
};

function setLevelWiseDataSource(data, parent) {
  _.each(data[dataProperty], function(n) {
    _.each(n[levelWiseDataProperty], function(d) {
      d.selection = (parent && parent.selection && (parent.selection == "1" || parent.selection == "0") && !scope.isSingleSelect) ? parent.selection : (d.IsSelected == false || d.IsSelected == null || d.IsSelected) ? getSelectionState(d.IsSelected) : '0';
      checkDisableForPartialNode(d);
      d[parentCodeStringConstant] = parent && parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + d[scope.codeProperty] : (d[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + d[scope.codeProperty] : "";
      d[parentStringConstant] = parent && parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + d[scope.titleProperty] : (d[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + d[scope.titleProperty] : "";
      if (baseLevelExpectNode[d[scope.codeProperty]]) {
        d.selection = getStateForNode(d);
        scope.expandNode(d);
        delete baseLevelExpectNode[d[scope.codeProperty]];
      }
    });
    levelWiseData[levelKey + n.Level] = _.isArray(levelWiseData[levelKey + n.Level]) ? levelWiseData[levelKey + n.Level].concat(n[levelWiseDataProperty]) : n[levelWiseDataProperty];
  });
};
function setLevelWiseData(data, parent) {
  _.each(data[dataProperty], function(n) {
   _.each(n[levelWiseDataProperty], function(d) {
    if(scope.treeType == treeTypeObject)
    {

      d.selection = (parent && parent.selection && (parent.selection == "1" || parent.selection == "0") && !scope.isSingleSelect) ? parent.selection : (d.IsSelected == false || d.IsSelected == null || d.IsSelected) ? getSelectionState(d.IsSelected) : '0';

    }
    else

    {
      d.selection = '0';  
    }
    if(scope.treeType == treeTypeObject)
    {
      if(isLazyLoadServerData)
      {
        totalID.push(d[scope.codeProperty]);
        totalName.push(d[scope.titleProperty]);
        scope.totalSelection++;
      }
    }

    d[parentCodeStringConstant] = parent && parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + d[scope.codeProperty] : (d[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + d[scope.codeProperty] : "";
    d[parentStringConstant] = parent && parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + d[scope.titleProperty] : (d[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + d[scope.titleProperty] : "";
    if (baseLevelExpectNode[d[scope.codeProperty]]) {
     d.selection = getStateForNode(d);
     scope.expandNode(d);
     delete baseLevelExpectNode[d[scope.codeProperty]];
   }
 });
   levelWiseData[levelKey + n.Level] = _.isArray(levelWiseData[levelKey + n.Level]) ? levelWiseData[levelKey + n.Level].concat(n[levelWiseDataProperty]) : n[levelWiseDataProperty];
 });
};

			/*function createLevelWiseDataSet(dataSet) {
				var level = 1;
				var parentNodes = dataSet[level - 1][levelWiseDataProperty];
				insertParentHierarchyForFlatStrucure(parentNodes);
				while (parentNodes) {
					levelWiseData[levelKey + level] = parentNodes;
					if (dataSet[level]) {
						insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet);
					};
					maxLevel = level;
					level = level + 1;
					parentNodes = (dataSet[level - 1]) ? dataSet[level - 1][levelWiseDataProperty] : null;
				};
			};

			function insertParentHierarchyForFlatStrucure(parentNodes, level, dataSet) {
				var fetchedData = (level) ? _.groupBy(dataSet[level][levelWiseDataProperty], scope.parentProperty) : null;
				_.each(parentNodes, function(parent) {
					var childForParent = (fetchedData) ? fetchedData[parent[scope.codeProperty]] : parentNodes;
					if (childForParent) {
						_.each(childForParent, function(node, index) {
							node[parentStringConstant] = parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + node[scope.titleProperty] : (node[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + node[scope.titleProperty] : "";
							node[parentCodeStringConstant] = parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + node[scope.codeProperty] : (node[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + node[scope.codeProperty] : "";
							node['isExpanded'] = false;
							node['selection'] = node['selection'] ? node['selection'] : "0";
							node['index'] = index;
						});
					}
				});
			};

			function setLevelWiseData(data, parent) {
				_.each(data[dataProperty], function(n) {
					_.each(n[levelWiseDataProperty], function(d) {
						d.selection = (parent && parent.selection && (parent.selection == "1" || parent.selection == "0") && !scope.isSingleSelect) ? parent.selection : (d.IsSelected == false || d.IsSelected == null || d.IsSelected) ? getSelectionState(d.IsSelected) : '0';
						d[parentCodeStringConstant] = parent && parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + d[scope.codeProperty] : (d[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + d[scope.codeProperty] : "";
						d[parentStringConstant] = parent && parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + d[scope.titleProperty] : (d[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + d[scope.titleProperty] : "";

						if (baseLevelExpectNode[d[scope.codeProperty]]) {
							d.selection = getStateForNode(d);
							scope.expandNode(d);
							delete baseLevelExpectNode[d[scope.codeProperty]];
						}
					});
					levelWiseData[levelKey + n.Level] = _.isArray(levelWiseData[levelKey + n.Level]) ? levelWiseData[levelKey + n.Level].concat(n[levelWiseDataProperty]) : n[levelWiseDataProperty];
				});
			};*/

			function getSelectionState(val) {
				if (val) {
					return '1';
				} else if (val == false) {
					return '2';
				} else if (val == null) {
					return '0';
				}
			};

			function resetSelectionState() {
				_.each(scope.selectedData, function(_node) {
					scope.selectNode(_node, '0');
				});
			};

			function initatePreSelection() {
				resetSelectionState();
				_.each(preselection, function(preselectionNode) {
					var searchLevel = 1;
					while (searchLevel <= maxLevel) {
						var foundNode = _.groupBy(levelWiseData[levelKey + searchLevel],scope.codeProperty)[preselectionNode];
						if (foundNode) {
							scope.selectNode(foundNode[0], '1');
							break;
						}
						searchLevel = searchLevel + 1;
					}
				});
			};

			function getNodesFromServer(parent, level, bucket, pageIndex, callback) {
				scope.isLoading = true;
				if (scope.isError) scope.isError = false;
				if (parent)
					parent.childLoading = true;

				var reqPayLoad = {
					"LevelAt" : level,
					"PageNumber" : (!parent) ? pageIndex : null,
					"PageSize" : (!parent) ? bucket : null
				};
				reqPayLoad[nodeExpandingCodeProperty] = (parent) ? parent[scope.codeProperty] : null;
				//RESTApi.getData(scope.treeConfig.navigationContext, function (responseData) {
					//RESTApi.getData(scope.treeConfig.requestParameter.navigationContext, function (responseData) {
						RESTApi.getData(navContext, function (responseData) {
							if (responseData.action == 'success') {
								scope.isLoading = false;
							} else {
								scope.isError = true;
							}
							var level = (responseData.data.data[dataProperty] && responseData.data.data[dataProperty].length > 0) ? responseData.data.data[dataProperty][0].Level : null;
							maxLevel = (level && maxLevel < level) ? level : maxLevel;
							callback(parent, responseData, true, bucket, pageIndex);
						}, reqPayLoad);
					};


					function getRequestedDataFromCache(parent, bucket, pageIndex) {
						var childSearchLevel = (parent) ? parent[scope.levelProperty] + 1 : 1;
						var parentCodeStringIterator;
						var result = (parent) ? _.groupBy(levelWiseData[levelKey+childSearchLevel],scope.parentProperty)[parent[scope.codeProperty]] : levelWiseData[levelKey + childSearchLevel];
						var startIndex = (pageIndex - 1) * bucket;
						var bucketData = (bucket && result) ? result.slice(startIndex, startIndex + bucket) : (result) ? result : [];
						return {
							"data" : bucketData,
							"searchLevel" : childSearchLevel
						};
					};

					function getChildsForParentAsPerBucket(parent, bucket, pageIndex, callback) {
						var cachedDataSet = getRequestedDataFromCache(parent, bucket, pageIndex);
						var bucketData = cachedDataSet.data;
						var searchLevel = cachedDataSet.searchLevel;

						if (bucketData.length > 0) {
							callback(parent, bucketData, false, bucket, pageIndex);
						} else {
							getNodesFromServer(parent, searchLevel, bucket, pageIndex, callback);
						}
					};

					function lazyLoadLevelWiseData(markerNode) {
						var parentSearchLevel = markerNode[scope.levelProperty] - 1;
						var markerNodeParent = markerNode[scope.parentProperty];
						var parent = _.find(levelWiseData[levelKey + parentSearchLevel], function(node) {
							return node[scope.codeProperty] == markerNodeParent;
						});

						if (parent && parent.children && parent.children.length % lazyLoadingBucket != 0) {
							return;
						};

						getChildsForParentAsPerBucket(parent, lazyLoadingBucket, (parent) ? (parent.children.length / lazyLoadingBucket) + 1 : (scope.categories.length / lazyLoadingBucket) + 1, createTreeStructure);
					};

					var searchString = "";
					var searchLevel;
					var searchDataYetToBeDisplayed = [];
					var searchWithContainsHitResult = [];
					scope.searchResults = [];

					function searchAsPerBucketSize(searchStr, bucket,isMaintainSearchPointer) {
            if (!isMaintainSearchPointer) {
              if (searchString != searchStr) {
               searchString = searchStr;
               searchLevel = maxLevel;
               searchDataYetToBeDisplayed.length = 0;
               searchWithContainsHitResult.length = 0;
               scope.searchResults.length = 0;
             };
           }
           var searchData = getDataAsPerBucketSize(searchStr, bucket);
           $timeout(function () {
             scope.searchResults = scope.searchResults.concat(searchData);
           });
         };

         function getOffsetSearchData(bucket) {
          var partitionedData = _.partition(searchDataYetToBeDisplayed, function(data, index) {
           return index > (bucket - 1);
         });
          searchDataYetToBeDisplayed = partitionedData[0];
          return partitionedData[1];
        };

        function getOffsetSearchDataForContainsSearch(bucket) {
          var partitionedData = _.partition(searchWithContainsHitResult, function(data, index) {
           return index > (bucket - 1);
         });
          searchWithContainsHitResult = partitionedData[0];
          return partitionedData[1];
        };

        function getDataAsPerBucketSize(searchStr, bucket) {
          var bucketData = [];
          while (bucketData.length < bucket && searchLevel > 0) {
           var offsetSearchData = getOffsetSearchData(bucket);
           if (offsetSearchData.length == bucket) {
            bucketData = offsetSearchData;
            break;
          }
          var searchData = _.filter(levelWiseData[levelKey + searchLevel], function(node) {
            return -1 != node[scope.titleProperty].toLowerCase().indexOf(searchString.toLowerCase());
          });

          var containsSarchResult = _.filter(levelWiseData[levelKey + searchLevel], function(node) {
            return new RegExp("(" + _.compact(searchString.split(' ')).join('|') + ")", "gi").test(node[scope.titleProperty]) && -1 == node[scope.titleProperty].toLowerCase().indexOf(searchString.toLowerCase());
          });
          searchWithContainsHitResult = searchWithContainsHitResult.concat(containsSarchResult);
          var qumulativeData = offsetSearchData.concat(searchData);
          var partitionedData = _.partition(qumulativeData, function(data, index) {
            return index > (bucket - 1);
          });
          searchDataYetToBeDisplayed = searchDataYetToBeDisplayed.concat(partitionedData[0]);
          bucketData = bucketData.concat(partitionedData[1]);
          searchLevel = searchLevel - 1;
        }
        if (searchLevel == 0) {
         while (bucketData.length < bucket) {
          var containsSearchDataToBeAppended = getOffsetSearchDataForContainsSearch(bucket);
          if (containsSearchDataToBeAppended.length > 0) {
           bucketData = bucketData.concat(containsSearchDataToBeAppended);
         } else {
           break;
         }
       }
     }
     return bucketData;
   };

   function closeChildsForParent(parent) {
    getChildsForParentAsPerBucket(parent, null, null, function(parent, data) {
     var childs = _.filter(data, function(childNode) {
      return childNode.isExpanded;
    });
     _.each(childs, function(child) {
      child.isExpanded = false;
      child.children = [];
      closeChildsForParent(child);
    });
   });

  };

  scope.searchText = '';
  scope.searchFieldVal = '';

  scope.expandNode = function(node, index) {
    node.isExpanded = !node.isExpanded;
    if (node.isExpanded) {
     getChildsForParentAsPerBucket(node, lazyLoadingBucket, 1, createTreeStructure);
   } else {
     node.children = [];
     removeMarkerForParent(node);
   }
 };

 var createTreeStructure = function(node, data, isService, bucket, pageIndex) {
  if (isService) {
   if (node) {
    node.childLoading = false;
    node.lazyLoading = false;
  }
  if (data.action == 'success') {
    setLevelWiseData(data.data.data, node);
    if (node && data.data.data[dataProperty][0]) {
     if (!node.children) {
      node.children = getRequestedDataFromCache(node, bucket, pageIndex).data;
    } else {
      node.children = node.children.concat(getRequestedDataFromCache(node, bucket, pageIndex).data);
    }
    if (node.children.length % lazyLoadingBucket == 0) {
      lazyLoadMarker.push(node.children[node.children.length - 1]);
    }
  } else {
   scope.categories[scope.categories.length - 1].lazyLoading = false;
   scope.categories = scope.categories.concat(data.data.data[dataProperty][0][levelWiseDataProperty]);
   if (scope.categories.length % lazyLoadingBucket == 0) {
    lazyLoadMarker.push(scope.categories[scope.categories.length - 1]);
  }
}
} else {
  console.log('service failure');
}
} else {
 $timeout(function() {
  if (node) {
   if (node && node.children && node.children.length > 0)
    node.children[node.children.length - 1].lazyLoading = false;
							//node.children = (node.children) ? node.children.concat(data) : data;
							node.children = (node.children) ? ((scope.treeConfig.getAllLazyLoadedData) ? data : node.children.concat(data)) : data;

							if (node.children.length % lazyLoadingBucket == 0) {
								lazyLoadMarker.push(node.children[node.children.length - 1]);
							}
						} else {
							scope.categories[scope.categories.length - 1].lazyLoading = false;
							scope.categories = scope.categories.concat(data);
							if (scope.categories.length % lazyLoadingBucket == 0) {
								lazyLoadMarker.push(scope.categories[scope.categories.length - 1]);
							}
						}
					});
}
};

function removeMarkerForParent(parent) {
  var childMarkers = _.filter(lazyLoadMarker, function(node, index) {
   return -1 != node[parentCodeStringConstant].indexOf(parent[scope.codeProperty]);
 });
  lazyLoadMarker = _.difference(lazyLoadMarker, childMarkers);
  closeChildsForParent(parent);
};

var filterTextTimeout;
scope.searchAndSelectNode = function() {
  if (filterTextTimeout) {
   $timeout.cancel(filterTextTimeout);
 }
 if (scope.searchFieldVal.length <= 2) {
   serverSearchVal = "";
   scope.searchResults.length = 0;
   searchDataYetToBeDisplayed.length = 0;
   searchWithContainsHitResult.length = 0;
 } else {
   filterTextTimeout = $timeout(function() {
    if (!isLazyLoadServerData) {
     searchAsPerBucketSize(scope.searchFieldVal, searchBucket);
   } else {
     getSearchDataFromServer(searchBucket, createModelForSearchData, scope.searchFieldVal);
   }
 }, 500);
 }
};


scope.selectAll = function()
{



  if(selectAllBool)
  {
    for (var key in levelWiseData) {
      _.each(levelWiseData[key], function (data,n) {
        if(data.disabled == false)
        {
          data.selection = "0";
        }
        scope.selectedData = (key == (levelKey + '1'))  ? [] : [];  
      });
    }
    scope.getUserSelectionArray = [];
    scope.totalSelection = 0;
    totalID = [];
    totalName  = [];

  }else
  {
    for (var key in levelWiseData) {            
      _.each(levelWiseData[key], function (data,n) {
        if(data.disabled != true)
        {
          data.selection = "1";
        }
        scope.selectedData = (key == (levelKey + '1')) ? levelWiseData[levelKey + '1'] : scope.selectedData;
        var index = totalID.indexOf(data[scope.codeProperty]);
        if (index > -1) {
        }else
        {
          totalID.push(data[scope.codeProperty]);
          totalName.push(data[scope.titleProperty]);
          scope.totalSelection++;
        } 
      });
    }
  }
} 
scope.clearAllSelection = function()
{
  for (var key in levelWiseData) {
    _.each(levelWiseData[key], function (data,n) {
      data.selection = "0";
                //scope.selectedData = (key == (levelKey + '1'))  ? [] : [];
                //scope.getUserSelectionArray = [];
              });
  }
  scope.selectedData = [];
  scope.getUserSelectionArray = [];
  scope.totalSelection = 0;
  totalID = [];
  totalName  =[];
}

scope.selectNode = function(node, selectionState, byPassIsLazyLoadCheck) {
 if (isLazyLoadServerData && scope.searchFieldVal.length > 0 && !byPassIsLazyLoadCheck) {
  completeModelFromServerIfNeeded(node);
  return;
}
node.selection = selectionState;
if (scope.isSingleSelect) {
 if (scope.selectedData.length > 0 && scope.selectedData[0].$$hashKey != node.$$hashKey) {
  scope.selectedData[0].selection = '0';
};
scope.selectedData = [node];
} else {
  updateSelectionObject(node, selectionState);
  updateChildsForNode(node, selectionState);
}
updateParentForNode(node, selectionState);
updateUserSelection(node,selectionState);
if(scope.treeType == treeTypeObject)
{ 
} else
{
            //working perfect in project team
            scope.totalSelection= scope.selectedData.length;
          }
        };

        function updateSelectionObject(node, selectionState) {
          switch(selectionState) {
           case '0':
         //scope.selectedData = _.without(scope.selectedData, node);
         scope.selectedData = _.filter(scope.selectedData,function(data)
         {
          return data[scope.codeProperty] != node[scope.codeProperty];
        });
         scope.totalSelection =  scope.totalSelection -1;
         var index = totalID.indexOf(node[scope.codeProperty]);
         if(index > -1)
         {
          totalID.splice(index,1);
          totalName.splice(index,1);  
        }
        break;
        case '1':
        scope.selectedData.push(node);
        scope.totalSelection =  scope.totalSelection +1;
        totalID.push(node[scope.codeProperty]);
        totalName.push(node[scope.titleProperty]);
        break;
      }
    };
    function updateUserSelection(node,selectionState)
    {
      switch(selectionState) {
        case '0':
            scope.getUserSelectionArray = _.filter(scope.getUserSelectionArray,function(data){return data[scope.codeProperty] != node[scope.codeProperty]});//_.without(scope.getUserSelectionArray, node);
            break;
            case '1':
            scope.getUserSelectionArray.push(node);
            break;
          }
        }

     /*function updateParentForNode(node, selectionState) {
      var depthLevel = node[scope.levelProperty] - 1;
      var immediateParentCode = node[scope.parentProperty].toString();
      while (depthLevel > 0) {
       var parent = _.find(levelWiseData[levelKey + depthLevel], function(node) {
        return node[scope.codeProperty] == immediateParentCode;
      });
       if (!parent && depthLevel == 1) {
        baseLevelExpectNode[node[parentCodeStringConstant].split('>')[0]] = true;
        parent = {};
        parent[scope.codeProperty] = node[parentCodeStringConstant].split('>')[0];
        parent[scope.levelProperty] = 1;
        parent[scope.parentProperty] = parent[scope.codeProperty];
      }
      if (parent) {
        immediateParentCode = parent[scope.parentProperty].toString();
        if (!parent['isExpanded']) {
         scope.expandNode(parent);
       }
       if (!scope.isSingleSelect) {
         parent.selection = getStateForNode(parent);
       }
     }
     depthLevel = depthLevel - 1;
   }
 };*/

 function updateParentForNode(node, selectionState) {

  var depthLevel = node[scope.levelProperty] - 1;
  var immediateParentCode = node[scope.parentProperty].toString();

  while (depthLevel > 0) {
    var parent = _.find(levelWiseData[levelKey + depthLevel], function(node) {
      return node[scope.codeProperty] == immediateParentCode;
    });
    if (!parent && depthLevel == 1) {
      baseLevelExpectNode[node[parentCodeStringConstant].split('>')[0]] = true;
      parent = {};
      parent[scope.codeProperty] = node[parentCodeStringConstant].split('>')[0];
      parent[scope.levelProperty] = 1;
      parent[scope.parentProperty] = parent[scope.codeProperty];
    }
//if (parent && !parent.disabled) {
  if (parent && !parent.disabled) {
    immediateParentCode = parent[scope.parentProperty].toString();
    if (!parent['isExpanded']) {
      scope.expandNode(parent);
    }
    if (!scope.isSingleSelect) {
      parent.selection = getStateForNode(parent,parent.selection);
    }
  }else
  {
    immediateParentCode = parent[scope.parentProperty].toString();
    if (!parent['isExpanded']) {
      scope.expandNode(parent);
    }
    if (!scope.isSingleSelect) {
      var tempSelection  = getStateForNode(parent,parent.selection);
      parent.selection = "2";
    }
  }
  depthLevel = depthLevel - 1;
}
};

function getStateForNode(node,parentSelection ) {

  var depthLevel = node[scope.levelProperty] + 1;
  var parentCode = node[scope.codeProperty];
  var groupByData = _.groupBy(levelWiseData[levelKey + depthLevel], scope.parentProperty);
  var childCount = groupByData[parentCode].length;
  var selectedChild = _.filter(groupByData[parentCode], function(node) {
   return node.selection == '1';
 });
  var partiallySelectedChild = _.filter(groupByData[parentCode], function(node) {
   return node.selection == '2';
 });


/*
  if (childCount == selectedChild.length) {
    //scope.selectedData = _.difference(scope.selectedData, selectedChild);
    //JJ Add Later
    scope.selectedData = _.filter(scope.selectedData,function(data,n)
    {
      return data[scope.parentProperty] !=parentCode;
    });

    scope.selectedData.push(node);
    return "1";
  } else if ((selectedChild.length + partiallySelectedChild.length) > 0) {
   scope.selectedData = _.union(scope.selectedData, selectedChild);

   scope.selectedData = _.uniq(scope.selectedData,function(item,jey,a) {
    return item[scope.codeProperty]; 
  });
   //scope.selectedData = _.without(scope.selectedData, node);
   scope.selectedData = _.filter(scope.selectedData,function(data,n)
   {
    return data[scope.codeProperty] != node[scope.codeProperty];
  });

   return "2";
 } else {
   scope.selectedData = _.union(scope.selectedData, selectedChild);
   scope.selectedData = _.filter(scope.selectedData, function(data)
   {
    return data[scope.codeProperty] != node[scope.codeProperty];
  });
   //scope.selectedData = _.without(scope.selectedData, node);
   return "0";
 }
 */

 if(scope.treeType == treeTypeObject)
 {
  if (childCount == selectedChild.length) {

              ///scope.selectedData = _.difference(scope.selectedData, selectedChild);
              
              scope.selectedData = _.filter(scope.selectedData, function(data) { 
                return data[scope.parentProperty] != parentCode;
              });

              scope.selectedData.push(node);
              //Manage Total Selection and TotalName nd ID  
              scope.totalSelection = scope.totalSelection +1;
              var index = totalID.indexOf(node[scope.codeProperty]);
              if (index > -1) {
              }else
              {
                totalID.push(node[scope.codeProperty]);
                totalName.push(node[scope.titleProperty]);
              }//Ends

              return "1";

            } else if ((selectedChild.length + partiallySelectedChild.length) > 0) {

              scope.selectedData = _.union(scope.selectedData, selectedChild);
              
              scope.selectedData = _.uniq(scope.selectedData, function(item, key, a) { 
                return item[scope.codeProperty];
              });

              scope.selectedData = _.filter(scope.selectedData,function(data){
              return data[scope.codeProperty] != node[scope.codeProperty]}); //_.without(scope.selectedData, node);
              


              //Manage Total Selection and TotalName nd ID
              if(parentSelection != "0" && parentSelection != "2")
              {
                scope.totalSelection = scope.totalSelection -1;
              }
              var index = totalID.indexOf(node[scope.codeProperty]);
              if(index > -1)
              {
                totalID.splice(index,1);
                totalName.splice(index,1);
              }
              //Ends

              
              return "2";
            } else {

              scope.selectedData = _.union(scope.selectedData, selectedChild);
              
              scope.selectedData = _.filter(scope.selectedData,function(data){
                return data[scope.codeProperty] != node[scope.codeProperty]
              });

              //_.without(scope.selectedData, node);
              
              //Manage Total Selection and TotalName nd ID
              var index = totalID.indexOf(node[scope.codeProperty]);
              if(index > -1)
              {
                totalID.splice(index,1);
                totalName.splice(index,1);  
                scope.totalSelection = scope.totalSelection -1;
              }//Ends
              return "0";
            }
          } else {

            //Non Generic Tree management
            //it will not having parent selection full means 1 even if all childs are selected.
            if (childCount == selectedChild.length) {
            //scope.selectedData = selectedChild;
            scope.selectedData = _.union(scope.selectedData, selectedChild);
            return "2";

          }else if ((selectedChild.length + partiallySelectedChild.length) > 0) {

            scope.selectedData = _.union(scope.selectedData, selectedChild);
            
            scope.selectedData = _.uniq(scope.selectedData, function(item, key, a) { 
              return item[scope.codeProperty];
            });

            scope.selectedData = _.filter(scope.selectedData,function(data){return data[scope.codeProperty] != node[scope.codeProperty]});
            //_.without(scope.selectedData, node);
            return "2";
          }else
          {
            scope.selectedData = _.union(scope.selectedData, selectedChild);
            scope.selectedData = _.filter(scope.selectedData,function(data){return data[scope.codeProperty] != node[scope.codeProperty]});//_.without(scope.selectedData, node);
            return "0";
          }
        }


      };



/*
function updateChildsForNode(node, selectionState) {
  var depthLevel = node[scope.levelProperty] + 1;
  var parentCode = node[scope.codeProperty].toString();
  while (depthLevel <= maxLevel) {
   var childs = _.filter(levelWiseData[levelKey + depthLevel], function(node) {
    return -1 != node[parentCodeStringConstant].indexOf(parentCode);
  });
   _.each(childs, function(child) {
    child.selection = selectionState;
    if (selectionState == "1") {
     //scope.selectedData = _.without(scope.selectedData, child);
     scope.selectedData =_.filter(scope.selectedData,function(data)
     {
      return data[scope.codeProperty] != child[scope.codeProperty];
    });
   };
 });
   depthLevel = depthLevel + 1;
 }
 if (isLazyLoadServerData) {
   updateChildsForSelectedData(node);
 }
}*/

function updateChildsForNode(node, selectionState) {

  var depthLevel = node[scope.levelProperty] + 1;
  var parentCode = node[scope.codeProperty].toString();
  var tempNode = node;
  while (depthLevel <= maxLevel) {
    var childs = _.filter(levelWiseData[levelKey + depthLevel], function(node) {
            //return -1 != node[parentCodeString].indexOf(parentCode)
            var parentCodesofNode = node[parentCodeStringConstant].split(">");
            return -1 != parentCodesofNode.indexOf(parentCode);
          });


    _.each(childs, function(child) {
      if(scope.treeType == treeTypeObject)
      {
        if (selectionState == "1") {
              //Work in laziloading false
              scope.totalSelection = (child.selection == "1")? scope.totalSelection : scope.totalSelection + 1;
              scope.selectedData = _.filter(scope.selectedData,function(data){
                return data[scope.codeProperty] != child[scope.codeProperty]
              });
              //closed//_.without(scope.selectedData, child);
              var index = totalID.indexOf(child[scope.codeProperty]);
              if (index > -1) {
              }else
              {
                totalID.push(child[scope.codeProperty]);
                totalName.push(child[scope.titleProperty]);   
              } 
            }else
            {
              scope.totalSelection = scope.totalSelection -1;
              var index = totalID.indexOf(child[scope.codeProperty]);
              if(index > -1)
              {
                totalID.splice(index,1);
                totalName.splice(index,1);  
              }
            }
            child.selection = selectionState;

            scope.getUserSelectionArray = _.filter(scope.getUserSelectionArray,function(data){
              return data[scope.codeProperty] != child[scope.codeProperty]
              });//_.without(scope.selectedData, child);
              //jayesh add
            }else
            {
              child.selection = "0";
              scope.selectedData = _.filter(scope.selectedData,function(data){
              return data[scope.codeProperty] != child[scope.codeProperty]});//_.without(scope.selectedData, child);
            }
            /*scope.getUserSelectionArray = _.filter(scope.getUserSelectionArray,function(data){
            
              return data[scope.codeProperty] != child[scope.codeProperty]
            });//_.without(scope.selectedData, child);*/
          });

    depthLevel = depthLevel + 1;
  }
          //if (isLazyLoadServerData) {
            updateChildsForSelectedData(node);
          //}
        }



        function updateChildsForSelectedData(node) {
          var searchHits = [];
          _.each(scope.selectedData, function(data) {
           if (-1 != data[parentCodeStringConstant].indexOf(node[scope.codeProperty].toString())) {
            searchHits.push(data);
          }
        });
          _.each(searchHits, function(hits) {

   //scope.selectedData = _.without(scope.selectedData, hits);
   scope.selectedData = _.filter(scope.selectedData,function(data)
   {
    return data[scope.codeProperty] != hits[scope.codeProperty];
  });


 });
        }

        var uniqueIDGenerator = function() {
          var d = new Date().getTime();
          var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function(c) {
           var r = (d + Math.random() * 16) % 16 | 0;
           d = Math.floor(d / 16);
           return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
         });
          return uniqueID;
        };

        scope.scroll = function () {
          if (!lazyLoadOffset) {
           lazyLoadOffset = angular.element("#treeComponentContainer")[0].getBoundingClientRect().bottom;
         };
         if (lazyLoadMarker.length > 0 && scope.searchFieldVal.length == 0) {
           var markerNode = lazyLoadMarker[lazyLoadMarker.length - 1];
           if (angular.element("#" + markerNode[scope.codeProperty])[0].getBoundingClientRect().top <= lazyLoadOffset) {
            console.log(markerNode);
            markerNode.lazyLoading = true;
            lazyLoadMarker.length = (lazyLoadMarker.length > 0) ? lazyLoadMarker.length - 1 : 0;
            lazyLoadLevelWiseData(markerNode);
            console.log(lazyLoadMarker.length);
          }
        }
      };

      scope.scrollEnd = function () {
        if (scope.searchFieldVal.length > 2)
         if (!isLazyLoadServerData) {
          searchAsPerBucketSize(scope.searchFieldVal, searchBucket,true);
        } else {
          getSearchDataFromServer(searchBucket, createModelForSearchData, scope.searchFieldVal, true);
        }
      };

			/*lazyLoadOffset = angular.element("#treeComponentContainer")[0].getBoundingClientRect().bottom;
			console.log(lazyLoadOffset);
			angular.element('.scrollbar-outer').scrollbar({
				onScroll : function(y, x) {
					//console.log('marker length -- '+lazyLoadMarker.length);
					if (lazyLoadMarker.length > 0 && scope.searchFieldVal.length == 0) {
						var markerNode = lazyLoadMarker[lazyLoadMarker.length - 1];
						if (angular.element("#"+markerNode[scope.codeProperty])[0].getBoundingClientRect().top <= lazyLoadOffset) {
							console.log(markerNode);
							markerNode.lazyLoading = true;
							lazyLoadMarker.length = (lazyLoadMarker.length > 0) ? lazyLoadMarker.length - 1 : 0;
							lazyLoadLevelWiseData(markerNode);
							console.log(lazyLoadMarker.length);
						}
					}
					if (y.maxScroll > 0 && y.scroll == y.maxScroll && scope.searchFieldVal.length > 0) {
						if (!isLazyLoadServerData) {
							searchAsPerBucketSize(scope.searchFieldVal, searchBucket);
						} else {
							getSearchDataFromServer(searchBucket, createModelForSearchData, scope.searchFieldVal, true);
						}
					}
				}
			});*/

			var massageSelectedData = function(data) {
				_.each(data, function(e) {
					if (e['children'])
						delete e['children'];
				});
				return data;
			};


      var newtotalID = [];
      var newtotalName = [];


      var getSelections = function() {

        _.each(scope.selectedData,function(node)
        {
          if(node.disabled)
          {
            
            scope.selectedData = _.without(scope.selectedData, node);
          }
        });

        newtotalID  = [];
        newtotalName  = [];

        $timeout(function() {
          var outPutObject = {
            'selections' : massageSelectedData(scope.selectedData)
          };

          _.each(outPutObject.selections, function(data){
            newtotalID.push(data[scope.codeProperty]);
            newtotalName.push(data[scope.titleProperty]);
          });
          outPutObject["selectionIds"] = newtotalID;
          outPutObject["selectionNames"] = newtotalName;

          outPutObject["selectionAllIds"] = totalID;
          outPutObject["selectionAllNames"] = totalName;


          var hierarchyCollection = [];
          _.each(scope.selectedData, function(node) {
            if (node[scope.levelProperty] > 1) {
              var parentHierarchy = node[parentCodeStringConstant].split('>');
              var parentTraversalArray = [];
              _.each(parentHierarchy, function(parentNode, index) {
                var found = _.clone(_.find(levelWiseData[levelKey + (index + 1)], function(data) {
                  return data[scope.codeProperty] == parentNode;
                }));
                if (found && found['children'])
                  delete found['children'];
                parentTraversalArray.push(found);
              });
              hierarchyCollection.push(parentTraversalArray);
            } else {
              hierarchyCollection.push([node]);
            }
          });

        /*if(scope.treeConfig.getHierarchyOnSelection)
        {
          outPutObject['selectionHierarchy'] =  massageSelectedData(hierarchyCollection);
        }
        if(scope.treeConfig.getAllLazyLoadedData)
        {
          outPutObject['allLazyLoadedData'] = levelWiseData;
        }*/


        if(scope.treeConfig.getHierarchyOnSelection && (scope.treeType == treeTypeObject))
        {
          outPutObject['selectionHierarchy'] =  massageSelectedData(hierarchyCollection);
        }
        if(scope.treeConfig.getUserSelection && (scope.treeType == treeTypeObject))
        {
          outPutObject['userSelection'] = massageSelectedData(scope.getUserSelectionArray);
        }
        if(scope.treeConfig.getAllLazyLoadedData)
        {
          outPutObject['allLazyLoadedData'] = levelWiseData;
        }

        doneCallback(outPutObject);
        
      });



      };

      /** seacrh for server **/

      var searchResultPageNumber = 0;
      var serverSearchVal = "";
      var isLazyLoadingNode;
      var ongoingService;
      function getSearchDataFromServer(searchBucket, callback, searchVal, isLazyLoad) {
        if (searchVal != serverSearchVal) {
         serverSearchVal = searchVal;
         searchResultPageNumber = 0;
         scope.searchResults.length = 0;
       }

       scope.isLoading = true;
       if (scope.isError) scope.isError = false;

       if (scope.searchResults.length > 0) {
         isLazyLoadingNode = scope.searchResults[scope.searchResults.length - 1];
         isLazyLoadingNode.lazyLoading = true;
       }

       if (ongoingService && !isLazyLoad) {
         RESTApi.abort(ongoingService);
       }

       ongoingService = {
         "PageNumber" : searchResultPageNumber = searchResultPageNumber + 1,
         "PageSize" : searchBucket,
         "SearchText" : scope.searchFieldVal
       };

				//RESTApi.getData(scope.treeConfig.navigationContext, function(responseData) {
					//RESTApi.getData(scope.treeConfig.requestParameter.navigationContext, function(responseData) {
						RESTApi.getData(navContext, function(responseData) {
							ongoingService = null;
							if (responseData.action == 'success') {
								scope.isLoading = false;
							} else {
								scope.isError = true;
							}
							callback(responseData);
						}, ongoingService);
					}

					function createModelForSearchData(data) {
						if (isLazyLoadingNode)
							isLazyLoadingNode.lazyLoading = false;
						scope.searchResults = scope.searchResults.concat(getLeafNodeWithParentHierarchy(data.data.data[searchProperty]));
					};

					function getLeafNodeWithParentHierarchy(data) {
						var searchList = data;
						var searchDataCollection = [];
						var selectedData = _.groupBy(scope.selectedData, scope.codeProperty);
						_.each(searchList, function(searchData) {
							var searchDataHierarchy = searchData[levelWiseDataProperty];
							var sortedLevelSearchedData = _.sortBy(searchDataHierarchy, 'Level');
							var searchHitNode = sortedLevelSearchedData[sortedLevelSearchedData.length - 1];
							var parentString = "";
							var parentCodeString = "";

							_.each(sortedLevelSearchedData, function(data) {
								parentString = (parentString.length > 0) ? parentString + ' > ' + data[scope.titleProperty] : data[scope.titleProperty];
								parentCodeString = (parentCodeString.length > 0) ? parentCodeString + '>' + data[scope.codeProperty].toString() : data[scope.codeProperty].toString();
								data[parentStringConstant] = parentString;
								data[parentCodeStringConstant] = parentCodeString;
								data.selection = getSelectionFromLevelWiseData(data);
							});

						//searchHitNode.serverData = _.groupBy(sortedLevelSearchedData, scope.codeProperty);
						searchDataCollection.push(searchHitNode);
					});
						return searchDataCollection;
					};

					function resetSelectionForSearchNodes(node) {
						_.each(scope.searchResults, function(searchNode) {
							if (node[scope.codeProperty] != searchNode[scope.codeProperty] && searchNode[parentCodeStringConstant].indexOf((node[parentCodeStringConstant].length > 0) ? node[parentCodeStringConstant] : node[scope.codeProperty].toString()) != -1) {
								searchNode.selection = node.selection;
							} else {
								searchNode.selection = getSelectionFromLevelWiseData(searchNode);
							}
						});
					};

					function getSelectionFromLevelWiseData(node) {
						var searchLevel = node[scope.levelProperty];
						var groupedLevelData = _.groupBy(levelWiseData[levelKey + searchLevel], scope.codeProperty);
						var selectionState = (groupedLevelData[node[scope.codeProperty]]) ? groupedLevelData[node[scope.codeProperty]][0].selection : isPresentInInternalHierarchy(node) ? '1' : (node.IsSelected == false || node.IsSelected == null || node.IsSelected) ? getSelectionState(node.IsSelected) : '0';
						return selectionState;
					};

					function isPresentInInternalHierarchy(searchNode) {
						var retVal = false;
						for (var i = 0; i < scope.selectedData.length; i++) {
							var node = scope.selectedData[i];
							if (searchNode[parentCodeStringConstant].indexOf((node[parentCodeStringConstant].length > 0) ? node[parentCodeStringConstant] : node[scope.codeProperty].toString()) != -1) {
								retVal = true;
								break;
							}
						}
						return retVal;
					};

				/*function completeModelFromServerIfNeeded(node) {
					var parentHierarchy = node[parentCodeStringConstant].split('>');
					var dataRetrivalCount = parentHierarchy.length;
					parentHierarchy.length = dataRetrivalCount - 1;
					var recievedData = [];
					if (parentHierarchy.length > 0) {
						_.each(parentHierarchy, function(PASCode, index) {
							getChildsForParentAsPerBucket(node.serverData[PASCode][0], lazyLoadingBucket, 1, function(_node, data, isService, bucket, pageIndex) {
								if (isService) {
									if (data.action == 'success')
										setLevelWiseData(data.data.data, _node);
								};
								dataRetrivalCount = dataRetrivalCount - 1;
								if (dataRetrivalCount == 1) {
									updateSelectionInDataSource(node);
								}
							});
						});
					} else {
						updateSelectionInDataSource(node);
					}
				}*/

				function completeModelFromServerIfNeeded(node) {

					var parentHierarchy = node[parentCodeStringConstant].split('>');
					var levelNumber = node['Level'];
					var recievedData = [];

					if (!(levelWiseData[levelKey + node[scope.levelProperty]] && _.find(levelWiseData[levelKey + node[scope.levelProperty]], function(data) {
						return node[scope.codeProperty] == data[scope.codeProperty];
					}))) {
						var reqObj = {};
						reqObj[nodeExpandingCodeProperty] = [parseInt(parentHierarchy[parentHierarchy.length - 1])];

          	//RESTApi.getData(scope.treeConfig.requestParameter.navigationContext, function(responseData) {
              RESTApi.getData(navContext, function(responseData) {
               if (responseData.action == 'success') {
                var allResultData = responseData.data.data.PAS_SearchList[0][levelWiseDataProperty];
                var result = _.groupBy(allResultData, "Level");
                var level = 1;
                var levelData = [];
                while (level) {
                 var obj = {};
                 obj[levelWiseDataProperty] = result[level];
                 obj['Level'] = level;
                 levelData.push(obj);
                 level = level + 1;
                 if (!result[level])
                  break;
              };
              createLevelWiseDataSet(levelData);
              updateSelectionInDataSource(node);
            } else {
              console.log('error');
            }
          }, reqObj, true);
            } else {
              updateSelectionInDataSource(node);
            }
          }

          function updateSelectionInDataSource(node) {
           scope.selectNode(_.find(levelWiseData[levelKey + node.Level], function(data) {
            return data[scope.codeProperty] == node[scope.codeProperty];
          }), (node.selection == "1") ? "0" : "1", true);
           resetSelectionForSearchNodes(node);
         };

         scope.focusSearch = false;
         scope.isActive = false;
         scope.showMe = false;
         scope.showSearch = function () {
           scope.isActive = true;
           scope.focusSearch = true;
           scope.showMe = true;
           scope.hideClose = true;
         }

         scope.hideSearch = function () {
           scope.isActive = false;
           scope.focusSearch = false;
           scope.hideClose = false;
         }

       },
       templateUrl: 'shared/directives/smartHierarchy/smartHierarchyTemplate.html'
     };
   }])
.directive('ngIndeterminate', function ($compile) {
  return {
   restrict : 'A',
   link : function(scope, element, attributes) {
    scope.$watch(attributes['ngIndeterminate'], function(value) {
     element.prop('indeterminate', value);
   });
  }
};
})
.directive('ngHighlight', function ($compile, hilitor) {
  return {
   restrict : 'A',
   link : function(scope, element, attributes) {
    scope.$watch(attributes['ngHighlight'], function(value) {
     hilitor.getHilitor().apply(value);
   });
  }
};
})
.service('RESTApi', ['$http', '$q',
	function($http, $q) {
		var baseUrl;

		var env = "DEV";
		

		var callbackTracker = [];
		var userExecutionContext;
		var documentId;
		var contactCode;
		var requestObjectToBeExtended = null;
    this.setEnvironment = function(env)
    {
      switch(env) {
        case "DEV":
        baseUrl = 'https://gepdevsmart-rest.servicebus.windows.net/PortalRestService/';
        break;
        case "QC":
        baseUrl = 'https://gepqcsmart-rest.servicebus.windows.net/PortalRestService/';
        break;
        case "UAT":
        baseUrl = 'https://gepuatsmart-rest.servicebus.windows.net/PortalRestService/';
        break;
        case "PROD":
        baseUrl = 'https://gepsmart-rest.servicebus.windows.net/PortalRestService/';

      }
    }
    this.setDocumentId = function(val) {
     documentId = val;
   };
   this.setContactCode = function(val) {
     contactCode = val;
   };
   this.setUserContext = function(val) {
     userExecutionContext = val;
   };
   this.setRequestObject = function(val)
   {
     requestObjectToBeExtended =val;
   }
   function createRequest(mode, data,isOverrideInputPayload) {
     var contactPasMappingMethod,
     getPasDetailsMethod,
     inputParameterKey,
     getParentForNodeUrl;
     switch(mode) {
      case "PAS":
      contactPasMappingMethod = 'GetContactPASMappingDetails';
      getPasDetailsMethod = 'GetPASDetails';
      inputParameterKey = 'PASInputParam_Levels';
      getParentForNodeUrl  = "GetPASLevelDetailsByPASCodes";
      break;
      case "REG":
      contactPasMappingMethod = 'GetContactRegionMappingDetails ';
      getPasDetailsMethod = 'GetRegionDetails ';
      inputParameterKey = 'RegionInputParam_Levels';
      getParentForNodeUrl = "GetREGIONLevelDetailsByRegionIds";
      break;

      case "ORG":
      contactPasMappingMethod = 'GetContactOrgMappingDetails';
      getPasDetailsMethod = 'GetORGDetails ';
      inputParameterKey ='ORG_InputParams';
      getParentForNodeUrl = "GetOrgEntityLevelDetailsByEntityDetailCodes";
      break;	
    }


    var propmiseForThisInstance = $q.defer();
    var requestObject = {
      'url' : baseUrl,
      'headers' : {
       'Content-Type' : 'application/json',
       'UserExecutionContext' : null
     },
     'data' : {},
     'method' : 'POST',
     'timeout' : propmiseForThisInstance.promise
   };
   requestObject['data'][inputParameterKey] = {
    'ContactCode' : null,
    'DocumentCode' : null
  };

  if (isOverrideInputPayload == true) {
    requestObject.url = requestObject.url + getParentForNodeUrl;
    requestObject.data = data;
  }else
  {
    if (contactCode) {
     requestObject.data[inputParameterKey].ContactCode = contactCode;
     requestObject.url = requestObject.url + contactPasMappingMethod;
   } else {
     requestObject.data[inputParameterKey].ContactCode = null;
     requestObject.url = requestObject.url + getPasDetailsMethod;
   }
   requestObject.data[inputParameterKey].DocumentCode = (documentId) ? documentId : null;

 }
 requestObject.headers.UserExecutionContext = userExecutionContext;
 requestObject.promise = propmiseForThisInstance;
 if(requestObjectToBeExtended == null && contactCode == null)
 {
  requestObject.data[inputParameterKey] = _.extend(requestObject.data[inputParameterKey], data);
}else
{
  requestObject.data[inputParameterKey] = _.extend(_.extend(requestObject.data[inputParameterKey], data),requestObjectToBeExtended)
}
return requestObject;
};
this.abort = function(reqParam) {
 var dataFoundOnIndex;
 var promise = _.find(callbackTracker, function(reqObj, index) {
  dataFoundOnIndex = index;
  return _.isEqual(reqParam, reqObj.data);
}).promise;
 if (promise) {
  promise.resolve();
  console.log('canceled - ' + reqParam);
}
};

this.getData = function(mode, callback, data,isOverrideInputPayload) {
 var requestObject = new createRequest(mode, data,isOverrideInputPayload);
 callbackTracker.push({
  'key' : JSON.stringify(requestObject.data),
  'callback' : callback,
  'promise' : requestObject.promise,
  'data' : data
});
 serviceCall(requestObject);
};

function serviceCall(req) {
 $http(req).then(function(response) {
  var dataFoundOnIndex;
  var Callback = _.find(callbackTracker, function(reqObj, index) {
   dataFoundOnIndex = index;
   return _.isEqual(JSON.parse(reqObj.key), req.data);
 }).callback;
  callbackTracker.splice(dataFoundOnIndex, 1);
  Callback({
   'action' : 'success',
   'data' : response
 });
}, function(error) {
  var dataFoundOnIndex;
  var Callback = _.find(callbackTracker, function(reqObj, index) {
   dataFoundOnIndex = index;
   return _.isEqual(JSON.parse(reqObj.key), req.data);
 }).callback;
  callbackTracker.splice(dataFoundOnIndex, 1);
  Callback({
   'action' : 'failure',
   'data' : error
 });
});
};
}])
.service('hilitor', [
	function() {
		var hilitor = new Hilitor("treeComponentContainer");
		this.getHilitor = function() {
			return hilitor;
		};
	}]);

})(angular);
(function (angular) {
	'use strict';
	angular.module('SMART2').directive('smartLastRepeaterElement', function () {
		return function (scope, element, attrs) {
			if (scope.$last) {
				scope.$emit('LastRepeaterElement', element, attrs);
			}

		};
	});
})(angular);
(function (angular) {
	'use strict';
	angular.module('SMART2').directive('smartMetadataChips', ['debouncer', function (debouncer) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				"smartmetadata": "=metadata",
				"metadatatitle": "@",
				"callBack": "&"
			},
			link: function (scope, element, attrs) {

				scope.fieldClass = typeof attrs.fieldClass === 'undefined' ? 's4' : attrs.fieldClass;
				scope.itemTotal = typeof attrs.itemTotal === 'undefined' ? 3 : (parseInt(attrs.itemTotal, 10) <= 0 ? 0 : parseInt(attrs.itemTotal, 10));
				scope.fieldkey = typeof attrs.fieldkey === 'undefined' ? 'name' : attrs.fieldkey;
				scope.showMoreChips = 0;

				attrs.$observe('optionId', function () {
					scope.optionId = attrs.optionId;
				});

				scope.$on('LastRepeaterElement', function (scope, element, attrs) {
					debouncer.add(function () {
						var $chipsActiceContainer;
						$chipsActiceContainer = typeof $chipsActiceContainer !== 'undefined' ? $chipsActiceContainer : angular.element('#' + scope.targetScope.$parent.optionId + '-chips-0');
						if ($chipsActiceContainer) {
							$chipsActiceContainer.css({ 'transition': 'all .5s ease-in-out', 'background': '#e4e4e4', 'color': '#000' });
							$chipsActiceContainer.find('.chips-icon').css({ 'transition': 'all .5s ease-in-out', 'color': '#9e9e9e' });
							setTimeout(function () {
								$chipsActiceContainer.css('transition', 'none').find('.chips-icon').css('transition', 'none');
							}, 500);
						}
					}, 100);
				});

				scope.metadataAdd = function (data, $e) {
					var metadataContainer = angular.element('#' + scope.optionId).width() - 200,
						$chipsActiceContainer,
						fieldKey = scope.fieldkey;
					if (!data.displayfield.title) return 0;
					$chipsActiceContainer = angular.element('#' + scope.optionId + '-chips-0');
					if ($chipsActiceContainer) {
						$chipsActiceContainer.css({ 'transition': 'none', 'background': '#159dfc', 'color': '#fff' });
						$chipsActiceContainer.find('.chips-icon').css({ 'transition': 'none', 'color': '#fff' });
					}
					data.options.unshift({});
					data.options[0][fieldKey] = data.displayfield.title;
					data.displayfield.title = "";
					data.displayfield.isfocus = true;
				};
				scope.metadataCheck = function (data, $e) {
					var char = $e.which || $e.keyCode,
						charReq = [13, 188, 186],
						charReqLength = charReq.length,
						charReqKey,
						i;

					if (data.displayfield.title) {
						for (i = 0; i < charReqLength; i++) {
							if (char === charReq[i]) {
								charReqKey = charReq[i] === 188 ? ',' : charReq[i] === 186 ? ';' : '';
								if (charReqKey) {
									data.displayfield.title = data.displayfield.title.replace(charReqKey, '');
								}
								angular.element($e.currentTarget).blur();
								scope.metadataAdd(data, $e);
							}
						}
					}
				};
				scope.metadataDelete = function (data, ind) {
					angular.isFunction(scope.callBack) && scope.callBack({ data: { 'data': data.options[ind], 'type': 'delete' } });
					data.options.splice(ind, 1);
				};
				scope.smartmetachipTitleClick = function (data, ind) {
					angular.isFunction(scope.callBack) && scope.callBack({ data: { 'data': data.options[ind], 'type': 'add' } });
				};
				scope.metadataShowMore = function (cont) {
					angular.element('#' + cont).css('transition', '1s ease-in-out');
					debouncer.add(function () {
						scope.showMoreChips = 1;
					}, 10);
				};
				scope.metadataLessMore = function (cont) {
					angular.element('#' + cont).css('transition', 'none');
					scope.showMoreChips = 0;
				};
			},
			templateUrl: 'shared/directives/smartMetadataChips/smartMetadataChipsTemplate.html'
		};
	}]);
})(angular);
(function () {
	'use strict';
	angular.module('SMART2').value('uiSliderConfig', {}).directive('smartRangeSlider', ['uiSliderConfig', '$timeout', function (uiSliderConfig, $timeout) {
		uiSliderConfig = uiSliderConfig || {};
		return {
			require: 'ngModel',
			compile: function () {
				var preLink = function (scope, elm, attrs, ngModel) {

					function parseNumber(n, decimals) {
						return (decimals) ? parseFloat(n) : parseInt(n, 10);
					}

					var directiveOptions = angular.copy(scope.$eval(attrs.uiSlider));
					var options = angular.extend(directiveOptions || {}, uiSliderConfig);
					// Object holding range values
					var prevRangeValues = {
						min: null,
						max: null
					};

					// convenience properties
					var properties = ['min', 'max', 'step', 'lowerBound', 'upperBound'];
					var useDecimals = (!angular.isUndefined(attrs.useDecimals)) ? true : false;
					var updateOn = (angular.isDefined(options['updateOn'])) ? options['updateOn'] : 'slide'

					var init = function () {
						// When ngModel is assigned an array of values then range is expected to be true.
						// Warn user and change range to true else an error occurs when trying to drag handle
						if (angular.isArray(ngModel.$viewValue) && options.range !== true) {
							console.warn('Change your range option of ui-slider. When assigning ngModel an array of values then the range option should be set to true.');
							options.range = true;
						}

						// Ensure the convenience properties are passed as options if they're defined
						// This avoids init ordering issues where the slider's initial state (eg handle
						// position) is calculated using widget defaults
						// Note the properties take precedence over any duplicates in options
						angular.forEach(properties, function (property) {
							if (angular.isDefined(attrs[property])) {
								options[property] = parseNumber(attrs[property], useDecimals);
							}
						});

						elm.slider(options);
						init = angular.noop;
					};

					// Find out if decimals are to be used for slider
					angular.forEach(properties, function (property) {
						// support {{}} and watch for updates
						attrs.$observe(property, function (newVal) {
							if (!!newVal) {
								init();
								options[property] = parseNumber(newVal, useDecimals);
								elm.slider('option', property, parseNumber(newVal, useDecimals));
								ngModel.$render();
							}
						});
					});
					attrs.$observe('disabled', function (newVal) {
						init();
						elm.slider('option', 'disabled', !!newVal);
					});

					// Watch ui-slider (byVal) for changes and update
					scope.$watch(attrs.uiSlider, function (newVal) {
						init();
						if (newVal !== undefined) {
							elm.slider('option', newVal);
						}
					}, true);

					// Late-bind to prevent compiler clobbering
					$timeout(init, 0, true);

					// Update model value from slider
					elm.bind(updateOn, function (event, ui) {
						var valuesChanged;

						if (ui.values) {
							var boundedValues = ui.values.slice();

							if (options.lowerBound && boundedValues[0] < options.lowerBound) {
								boundedValues[0] = Math.max(boundedValues[0], options.lowerBound);
							}
							if (options.upperBound && boundedValues[1] > options.upperBound) {
								boundedValues[1] = Math.min(boundedValues[1], options.upperBound);
							}

							if (boundedValues[0] !== ui.values[0] || boundedValues[1] !== ui.values[1]) {
								valuesChanged = true;
								ui.values = boundedValues;
							}
						} else {
							var boundedValue = ui.value;

							if (options.lowerBound && boundedValue < options.lowerBound) {
								boundedValue = Math.max(boundedValue, options.lowerBound);
							}
							if (options.upperBound && boundedValue > options.upperBound) {
								boundedValue = Math.min(boundedValue, options.upperBound);
							}

							if (boundedValue !== ui.value) {
								valuesChanged = true;
								ui.value = boundedValue;
							}
						}


						ngModel.$setViewValue(ui.values || ui.value);
						$(ui.handle).find('.ui-slider-tip').text(ui.value);
						scope.$apply();

						if (valuesChanged) {
							setTimeout(function () {
								elm.slider('value', ui.values || ui.value);
							}, 0);

							return false;
						}
					});

					// Update slider from model value
					ngModel.$render = function () {
						init();
						var method = options.range === true ? 'values' : 'value';

						if (options.range !== true && isNaN(ngModel.$viewValue) && !(ngModel.$viewValue instanceof Array)) {
							ngModel.$viewValue = 0;
						}
						else if (options.range && !angular.isDefined(ngModel.$viewValue)) {
							ngModel.$viewValue = [0, 0];
						}

						// Do some sanity check of range values
						if (options.range === true) {
							// previously, the model was a string b/c it was in a text input, need to convert to a array.
							// make sure input exists, comma exists once, and it is a string.
							if (ngModel.$viewValue && angular.isString(ngModel.$viewValue) && (ngModel.$viewValue.match(/,/g) || []).length === 1) {
								// transform string model into array.
								var valueArr = ngModel.$viewValue.split(',');
								ngModel.$viewValue = [Number(valueArr[0]), Number(valueArr[1])];
							}
							// Check outer bounds for min and max values
							if (angular.isDefined(options.min) && options.min > ngModel.$viewValue[0]) {
								ngModel.$viewValue[0] = options.min;
							}
							if (angular.isDefined(options.max) && options.max < ngModel.$viewValue[1]) {
								ngModel.$viewValue[1] = options.max;
							}

							// Check min and max range values
							if (ngModel.$viewValue[0] > ngModel.$viewValue[1]) {
								// Min value should be less to equal to max value
								if (prevRangeValues.min >= ngModel.$viewValue[1]) {
									ngModel.$viewValue[1] = prevRangeValues.min;
								}
								// Max value should be less to equal to min value
								if (prevRangeValues.max <= ngModel.$viewValue[0]) {
									ngModel.$viewValue[0] = prevRangeValues.max;
								}
							}

							// Store values for later user
							prevRangeValues.min = ngModel.$viewValue[0];
							prevRangeValues.max = ngModel.$viewValue[1];

						}
						elm.slider(method, ngModel.$viewValue);
					};

					scope.$watch(attrs.ngModel, function () {
						if (options.range === true) {
							ngModel.$render();

							$(elm).find('.ui-slider-tip').each(function (i, tipElm) {
								$(tipElm).text(ngModel.$viewValue[i]);
							});
						} else {
							$(elm).find('.ui-slider-tip').text(ngModel.$viewValue);
						}
					}, true);

					function destroy() {
						if (elm.hasClass('ui-slider')) {
							elm.slider('destroy');
						}
					}

					scope.$on("$destroy", destroy);
					elm.one('$destroy', destroy);
				};

				var postLink = function (scope, element, attrs, ngModel) {
					// Add tick marks if 'tick' and 'step' attributes have been setted on element.
					// Support horizontal slider bar so far. 'tick' and 'step' attributes are required.
					var options = angular.extend({}, scope.$eval(attrs.uiSlider));
					var properties = ['min', 'max', 'step', 'tick', 'tip'];
					angular.forEach(properties, function (property) {
						if (angular.isDefined(attrs[property])) {
							options[property] = attrs[property];
						}
					});
					if (angular.isDefined(options['tick']) && angular.isDefined(options['step'])) {
						var total = parseInt((parseInt(options['max']) - parseInt(options['min'])) / parseInt(options['step']));
						for (var i = total; i >= 0; i--) {
							var left = ((i / total) * 100) + '%';
							$("<div/>").addClass("ui-slider-tick").appendTo(element).css({ left: left });
						};
					}
					if (angular.isDefined(options['tip'])) {
						$timeout(function () {
							var handles = element.find('.ui-slider-handle');
							if (handles && handles.length > 1 && ngModel.$viewValue && angular.isArray(ngModel.$viewValue)) {
								$(handles[0]).append('<div class="ui-slider-tip">' + ngModel.$viewValue[0] + '</div>');
								$(handles[1]).append('<div class="ui-slider-tip">' + ngModel.$viewValue[1] + '</div>');
							} else {
								element.find('.ui-slider-handle').append('<div class="ui-slider-tip">' + ngModel.$viewValue + '</div>');
							}
						}, 10);
					}
				}

				return {
					pre: preLink,
					post: postLink
				};
			}
		};
	}]);
})();
(function() {
    'use strict';
    angular.module('SMART2')
        .directive('smartSavedViewPopup', ['notification', 'cacheHelperService', smartSavedViewPopupFunc]);

    function smartSavedViewPopupFunc(notification, cacheHelperService) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                show: '=',
                hide: '&',
                model: '=ngModel',
                config: '=',
                isApplyFilters: "=",
                isSavedView: "=",
                isSavedViewModified: "=",
                openPopupSavedView: "=",
                api: "="
            },
            controller: ["$scope", "$http", function($scope, $http) {

                $scope.showSavedViewPopup = true;
                $scope.showSaveView = true;
                $scope.showSavedView = function() {
                    $scope.isSavedView = true;
                    $scope.isSavedFilter = true;
                    if (!$scope.model.name) {
                        $scope.model.name = $scope.api.currentViewApplied.name;
                    }
                    $scope.api.currentViewApplied = _.find($scope.config, { name: $scope.model.name });
                    if ($scope.api.currentViewApplied == null) {
                        cacheHelperService.setFilterDef('{"defaultFilterType":3,"filters":[]}');
                    }
                    if ($scope.api.currentViewApplied != undefined) {
                        cacheHelperService.setFilterDef($scope.api.currentViewApplied.Filters);
                    }
                    $scope.api.selectedSavedview = { "name": $scope.model.name };
                    if ($scope.isMarkAsDefault.check == true) {
                        $scope.api.currentViewApplied.isDefault = true;
                        SaveResetOrMarkAsDefault($scope.api.currentViewApplied);
                        $scope.isMarkAsDefault.check = false;
                    }
                    $scope.api.applyViewOnGrid();
                };

                $scope.Reset = function() {
                    var sysDefault = _.find($scope.config, { IsSystemDefault: true });
                    sysDefault.isDefault = true;
                    $scope.api.currentViewApplied = sysDefault;
                    var req = {
                        method: 'POST',
                        url: $scope.api.UpdateSavedViewURL,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };
                    _.each($scope.config, function(n) {
                        if (!n.IsSystemDefault) {
                            if (n.isDefault) {
                                req.data = n;
                                $http(req).then(function(response) {}).catch(function(errorCallback) {
                                    console.log(errorCallback.statusText);
                                });
                            }
                            n.isDefault = false;
                        }
                    })
                    $scope.api.applyViewOnGrid();
                };

                $scope.isMarkAsDefault = { 'check': false };
                $scope.SystemAsDefault = { 'check': false };
                $scope.showSavedViewPopup = false;
                $scope.showSaveView = false;
                $scope.focusSearch = false;
                $scope.isActive = false;
                $scope.showMe = false;

                $scope.showSearch = function() {
                    $scope.isActive = true;
                    $scope.focusSearch = true;
                    $scope.showMe = true;
                    $scope.hideClose = true;
                }

                $scope.hideSearch = function() {
                    $scope.isActive = false;
                    $scope.focusSearch = false;
                    $scope.hideClose = false;
                }

                var msg = {
                    type: "inform",
                    buttons: [{
                        "title": "OK",
                        "result": "true"
                    }]
                }

                $scope.deleteItem = function(index) {
                    if ($scope.config[index].IsSystemDefault) {
                        msg.message = "You can not delete the System Default View.";
                        notification.notify(msg, function(result) {});
                    } else if ($scope.config[index].isDefault == true) {
                        msg.message = "You can not delete a saved view when it is marked as default.";
                        notification.notify(msg, function(result) {});
                    } else {
                        var config = {
                            type: "warning",
                            message: "Are you sure you want to delete the view ?",
                            buttons: [{
                                "title": "YES",
                                "result": "true"
                            }, {
                                "title": "NO",
                                "result": "false"
                            }]
                        };
                        var alterView = cacheHelperService.getDefaultSavedView($scope.config, false) || cacheHelperService.getDefaultSavedView($scope.config, true);
                        notification.notify(config, function(result) {
                            if (result.result == "true") {
                                var deletedView = $scope.config.splice(index, 1);
                                var req = {
                                    method: 'DELETE',
                                    url: $scope.api.deleteSavedViewURL,
                                    data: { "data": { "savedViewId": deletedView[0].ViewId } },
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                };
                                $http(req).then(function(response) {
                                    if (response.data != null) {
                                      if(alterView){
                                        $scope.api.currentViewApplied = alterView;
                                        $scope.model.name = alterView.name;
                                        $scope.api.applyViewOnGrid();
                                        console.log("Saved View Deleted");
                                      }
                                    }
                                }).catch(function(errorCallback) {
                                    console.log(errorCallback.statusText);
                                });
                            }

                        });
                    }

                };

                $scope.showEditor = false;

                $scope.editCurrentViewName = function(index) {
                    angular.forEach($scope.config, function(key, value) {
                        if ($scope.config[value].showCurrentItemEditor == true) {
                            $scope.config[value].showCurrentItemEditor = false;
                        }
                    });
                    if (!$scope.config[index].IsSystemDefault) {
                        $scope.config[index].showCurrentItemEditor = true;
                        $scope.getEditedviewName.name = $scope.config[index].name;
                    } else {
                        msg.message = "You can not rename the System Default View.";
                        notification.notify(msg, function(result) {});
                    }
                }

                $scope.getEditedviewName = { "name": "" };

                $scope.updateViewName = function(index, e) {
                    if ($scope.getEditedviewName.name.length == 0) {
                        keepPopupOpen();
                        return false;
                    }
                    var duplicateItem = $scope.config.filter(function(view) {
                        return (view.name === $scope.getEditedviewName.name && view.ViewId !== $scope.config[index].ViewId)
                    });
                    if (duplicateItem.length != 0) {
                        showAlertMessage($scope.api.duplicateErrorMessage);
                    } else if (greaterThanMaxCharacterLength($scope.getEditedviewName.name)) {
                        showAlertMessage($scope.api.maxCharacterLength);
                    } else {
                        $scope.config[index].name = $scope.getEditedviewName.name;
                        $scope.config[index].showCurrentItemEditor = false;
                        var obj = {
                            'ViewName': $scope.config[index].name || $scope.config[index].ViewName,
                            'IsDefaultView': $scope.config[index].isDefault,
                            'IsSystemDefault': $scope.config[index].IsSystemDefault,
                            'SortColumn': $scope.config[index].SortColumn,
                            'SortOrder': $scope.config[index].SortOrder,
                            'ViewId': $scope.config[index].ViewId,
                            'GroupColumn': $scope.config[index].GroupColumn,
                            'Filters': $scope.config[index].Filters,
                            'DocumentTypeCode': $scope.config[index].DocumentTypeCode,
                            'ContactCode': $scope.config[index].ContactCode,
                            'ColumnList': $scope.config[index].ColumnList
                        };
                        var req = {
                            method: 'POST',
                            url: $scope.api.UpdateSavedViewURL,
                            data: obj,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        };
                        $http(req).then(function(response) {
                            if (response.data != null) {
                                console.log($scope.api.updateMessage);
                            }
                        }).catch(function(errorCallback) {
                            console.log(errorCallback.statusText);
                        });

                    }
                };

                $scope.closeEditPanel = function(index) {
                    $scope.config[index].showCurrentItemEditor = false;
                };

                $scope.viewObject = {};
                $scope.viewObject.SaveViewName = "";

                $scope.saveCurrentView = function(passData) {
                    if (passData != '') {
                        if (isNameDuplicate(passData)) {
                            showAlertMessage($scope.api.duplicateErrorMessage);
                        } else if (greaterThanMaxCharacterLength(passData)) {
                            showAlertMessage($scope.api.maxCharacterLength);
                        } else {
                            $scope.isApplyFilters = false;

                            $scope.model = { 'name': passData, 'isDefault': false, 'showCurrentItemEditor': false };

                            var req = {
                                method: 'POST',
                                url: $scope.api.insertSavedViewURL,
                                data: {
                                    "ViewId": 0,
                                    "ViewName": passData,
                                    "ContactCode": $scope.api.contactCode,
                                    "ColumnList": cacheHelperService.getColDef() || "",
                                    "Filters": cacheHelperService.getFilterDef() || "",
                                    "SortColumn": "NeedByDate",
                                    "SortOrder": "Ascending",
                                    "GroupColumn": cacheHelperService.getGroupDef() || "",
                                    "IsDefaultView": false,
                                    "IsSystemDefault": false,
                                    "DocumentTypeCode": $scope.api.documentTypeCode
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            };
                            $http(req).then(function(response) {
                                if (response.data != null) {
                                    $scope.isSavedView = true;
                                    $scope.config.push({
                                        "ViewId": response.data,
                                        "ViewName": passData,
                                        "ContactCode": $scope.api.contactCode,
                                        "ColumnList": cacheHelperService.getColDef() || "",
                                        "Filters": cacheHelperService.getFilterDef() || "",
                                        "SortColumn": "NeedByDate",
                                        "SortOrder": "Ascending",
                                        "GroupColumn": cacheHelperService.getGroupDef() || "",
                                        "IsDefaultView": false,
                                        "IsSystemDefault": false,
                                        "DocumentTypeCode": $scope.api.documentTypeCode,
                                        "showCurrentItemEditor": false,
                                        "name": passData,
                                        "isDefault": false
                                    });
                                    $scope.api.currentViewApplied = _.find($scope.config, { name: $scope.model.name });
                                    console.log("Saved View Created");
                                }
                            }).catch(function(errorCallback) {
                                console.log(errorCallback.statusText);
                            });
                            $scope.isSavedFilter = true;
                            $scope.viewObject.SaveViewName = '';


                        }
                    } else {
                        keepPopupOpen();
                    }
                }

                function keepPopupOpen(e) {
                    if (!e) {
                        var e = window.event;
                    }
                    e.cancelBubble = true;
                    if (e.stopPropagation) {
                        e.stopPropagation();
                    }
                }

                function isNameDuplicate(editedSavedName) {
                    var duplicateName = "";
                    duplicateName = _.find($scope.config, { name: editedSavedName });
                    if (typeof duplicateName === 'undefined') {
                        return false;
                    }
                    return true;
                }

                function greaterThanMaxCharacterLength(editedSavedName) {
                    if (editedSavedName.length > $scope.api.viewNameLength) {
                        return true;
                    }
                    return false;
                }

                function showAlertMessage(alertMessage) {
                    notification.notify(alertMessage, function(result) {});
                }
                $scope.$watch('show', function(n, o) {
                    angular.forEach($scope.config, function(key, value) {
                        if ($scope.config[value].showCurrentItemEditor == true) {
                            $scope.config[value].showCurrentItemEditor = false;
                        }
                    }); //clearing if anything in edit state
                    if ($scope.openPopupSavedView == true && n == true) {
                        $scope.showSavedViewPopup = true;
                        $scope.showSaveView = false;
                    } else if ($scope.openPopupSavedView != true && n == true) {
                        $scope.showSavedViewPopup = false;
                        $scope.showSaveView = true;
                    } else {
                        $scope.showSavedViewPopup = false;
                        $scope.showSaveView = false;
                        $scope.show = false;
                    }

                });

                function SaveResetOrMarkAsDefault(currentViewApplied) {
                    var obj = {
                        "ViewId": currentViewApplied.ViewId,
                        "ViewName": currentViewApplied.name,
                        "ContactCode": currentViewApplied.ContactCode,
                        "ColumnList": currentViewApplied.ColumnList,
                        "Filters": currentViewApplied.Filters,
                        "SortColumn": "NeedByDate",
                        "SortOrder": "Ascending",
                        "GroupColumn": currentViewApplied.GroupColumn,
                        "IsDefaultView": currentViewApplied.isDefault,
                        "IsSystemDefault": currentViewApplied.IsSystemDefault,
                        "DocumentTypeCode": currentViewApplied.DocumentTypeCode
                    };
                    var req = {
                        method: 'POST',
                        url: $scope.api.UpdateSavedViewURL,
                        data: obj,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };
                    $http(req).then(function(response) {
                        if (response.data != null) {
                            console.log($scope.api.updateMessage);
                            if (currentViewApplied.isDefault) {
                                for (var i = 0; i < $scope.config.length; i++) {
                                    if ($scope.config[i].ViewId != currentViewApplied.ViewId && $scope.config[i].isDefault) {
                                        $scope.config[i].isDefault = false;
                                    }
                                }
                            }
                        }
                    }).catch(function(errorCallback) {
                        console.log(errorCallback.statusText);
                    });
                }
                $scope.search_data = $scope.config;
                var b = [];
                $scope.search_savedpopup = function(e) {
                    $scope.config = [];

                    if (e.data[0].value != null && e.data[0].value != "") {

                        b = [];
                        for (var i = 0; i < $scope.search_data.length; i++) {
                            var lowerStr = ($scope.search_data[i].name + "").toLowerCase();
                            var s = lowerStr.indexOf(e.data[0].value.toLowerCase()) === 0;
                            if (s) {
                                if (b.indexOf($scope.search_data[i].name) == -1) {
                                    b.push({ 'name': $scope.search_data[i].name, 'isDefault': $scope.search_data[i].isDefault, 'showCurrentItemEditor': $scope.search_data[i].showCurrentItemEditor });
                                }
                            }
                        }
                        $scope.config = b;
                    } else {
                        b = [];
                        $scope.config = $scope.search_data;
                    }
                }

                $scope.onHide = function() {
                    $scope.viewObject.SaveViewName = '';
                    $scope.hide();
                };

            }],
            templateUrl: 'shared/directives/smartSavedViewPopup/smartSavedViewPopupTemplate.html'
        };
    }
})();
(function () {
    'use strict';
    angular.module('SMART2').directive('smartSearch', ['httpService', '$timeout', 'APPCONSTANTS', '$translate', function (httpService, $timeout, APPCONSTANTS, $translate) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                type: '@'
            },
            link: function (scope, element, attrs) {
                var scopeValues = { "RFX": { "value": "0", "string": "RFX", "SubAppCodes": 103 }, "RFP": { "value": "1", "string": "RFP", "SubAppCodes": 103 }, "RFQ": { "value": "2", "string": "RFQ", "SubAppCodes": 103 }, "RFI": { "value": "3", "string": "RFI", "SubAppCodes": 103 }, "Auction": { "value": "4", "string": "Auction", "SubAppCodes": 103 }, "Contract": { "value": "5", "string": "Contract", "SubAppCodes": 104 }, "Catalog": { "value": "6", "string": "Catalog", "SubAppCodes": 108 }, "Requisition": { "value": "7", "string": "Requisition", "SubAppCodes": 107 }, "PO": { "value": "8", "string": "PO", "SubAppCodes": 107 }, "Order": { "value": "8", "string": "Order", "SubAppCodes": 107 }, "Invoice": { "value": "9", "string": "Invoice", "SubAppCodes": 107 }, "Receipts": { "value": "10", "string": "Receipt", "SubAppCodes": 107 }, "Forms": { "value": "11", "string": "Forms", "SubAppCodes": 105 }, "Scorecards": { "value": "12", "string": "Scorecards", "SubAppCodes": 105 }, "Workbench": { "value": "13", "string": "Workbench", "SubAppCodes": 110 }, "InvoiceReconciliation": { "value": "14", "string": "InvoiceReconciliation", "SubAppCodes": 107 }, "Items": { "value": "20", "string": "Items" }, "Templates": { "value": "15", "string": "Templates", "SubAppCodes": 111 }, "Partners": { "value": "19", "string": "Partners", "SubAppCodes": 105 }, "ContractRequest": { "value": "16", "string": "ContractRequest" }, "RFxRequest": { "value": "17", "string": "RFxRequest" }, "AuctionRequest": { "value": "18", "string": "AuctionRequest" }, "PaymentRequest": { "value": "27", "string": "PaymentRequest" }, "Project": { "value": "21", "string": "Project", "SubAppCodes": 113 }, "CreditMemo": { "value": "22", "string": "CreditMemo", "SubAppCodes": 107 }, "ReturnNote": { "value": "20", "string": "ReturnNote", "SubAppCodes": 107 }, "ActionPlan": { "value": "23", "string": "ActionPlan", "SubAppCodes": 105 }, "Blanket": { "value": "30", "string": "Blanket", "SubAppCodes": 104 }, "CategoryWorkbench": { "value": "28", "string": "CategoryWorkbench", "SubAppCodes": 116 }, "ProjectDashboard": { "value": "101", "string": "ProjectDashboard", "SubAppCodes": 113 } };

                /*
                 *  Get current module scope
                 */
                var getCurrentModuleScope = function () {
                    var selectedModules = scope.selectedModule.FilterKey.split(',');
                    var moduleScopeString = "";

                    for (var i = 0; i < selectedModules.length; i++) {
                        switch (selectedModules[i]) {
                            case (scopeValues.RFI.value):
                                moduleScopeString += scopeValues.RFI.string + ",";
                                break;
                            case (scopeValues.RFP.value):
                                moduleScopeString += scopeValues.RFP.string + ",";
                                break;
                            case (scopeValues.RFQ.value):
                                moduleScopeString += scopeValues.RFQ.string + ",";
                                break;
                            case (scopeValues.Auction.value):
                                moduleScopeString += scopeValues.Auction.string + ",";
                                break;
                            case scopeValues.Workbench.value:
                                moduleScopeString += scopeValues.Workbench.string + ",";
                                break;
                            case scopeValues.Contract.value:
                                moduleScopeString += scopeValues.Contract.string + ",";
                                break;
                            case scopeValues.Scorecards.value:
                                moduleScopeString += scopeValues.Scorecards.string + ",";
                                break;
                            case scopeValues.Forms.value:
                                moduleScopeString += scopeValues.Forms.string + ",";
                                break;
                            case scopeValues.Requisition.value:
                                moduleScopeString += scopeValues.Requisition.string + ",";
                                break;
                            case scopeValues.Order.value:
                                moduleScopeString += scopeValues.Order.string + ",";
                                break;
                            case scopeValues.Invoice.value:
                                moduleScopeString += scopeValues.Invoice.string + ",";
                                break;
                            case scopeValues.InvoiceReconciliation.value:
                                moduleScopeString += scopeValues.InvoiceReconciliation.string + ",";
                                break;
                            case scopeValues.Receipts.value:
                                moduleScopeString += scopeValues.Receipts.string + ",";
                                break;
                            case scopeValues.AuctionRequest.value:
                                moduleScopeString += scopeValues.AuctionRequest.string + ",";
                                break;
                            case scopeValues.RFxRequest.value:
                                moduleScopeString += scopeValues.RFxRequest.string + ",";
                                break;
                            case scopeValues.ContractRequest.value:
                                moduleScopeString += scopeValues.ContractRequest.string + ",";
                                break;
                            case scopeValues.PaymentRequest.value:
                                moduleScopeString += scopeValues.PaymentRequest.string + ",";
                                break;
                            case scopeValues.Partners.value:
                                moduleScopeString += scopeValues.Partners.string + ",";
                                break;
                            case scopeValues.Templates.value:
                                moduleScopeString += scopeValues.Templates.string + ",";
                                break;
                            case scopeValues.Catalog.value:
                                moduleScopeString += scopeValues.Catalog.string + ",";
                                break;
                                //PPST
                            case scopeValues.Project.value:
                                moduleScopeString += scopeValues.Project.string + ",";
                                break;
                            case scopeValues.CreditMemo.value:
                                moduleScopeString += scopeValues.CreditMemo.string + ",";
                                break;
                            case scopeValues.ReturnNote.value:
                                moduleScopeString += scopeValues.ReturnNote.string + ",";
                                break;
                            case scopeValues.ActionPlan.value:
                                moduleScopeString += scopeValues.ActionPlan.string + ",";
                                break;
                            case scopeValues.Blanket.value:
                                moduleScopeString += scopeValues.Blanket.string + ",";
                                break;
                            case scopeValues.CategoryWorkbench.value:
                                moduleScopeString += scopeValues.CategoryWorkbench.string + ",";
                                break;
                            case scopeValues.ProjectDashboard.value:
                                moduleScopeString += scopeValues.ProjectDashboard.string + ",";
                                break;
                        }
                    }

                    //if ModuleScope is 'RFI,RFQ & RFP' than it should be RFx
                    if ((moduleScopeString.indexOf(scopeValues.RFI.string) !== -1) ||
                        (moduleScopeString.indexOf(scopeValues.RFP.string) !== -1) ||
                        (moduleScopeString.indexOf(scopeValues.RFQ.string) !== -1)) {
                        moduleScopeString = moduleScopeString.replace(scopeValues.RFI.string + ",", '');
                        moduleScopeString = moduleScopeString.replace(scopeValues.RFP.string + ",", '');
                        moduleScopeString = moduleScopeString.replace(scopeValues.RFQ.string + ",", '');
                        moduleScopeString += scopeValues.RFX.string;
                    }

                    // Remove last comma from modulescopestring
                    var lastChar = moduleScopeString.slice(-1);
                    if (lastChar == ',') {
                        moduleScopeString = moduleScopeString.slice(0, -1);
                    }

                    return moduleScopeString;
                };


                /*
                 *  Get search navigation url
                 */
                scope.getSearchNavigateURL = function (moduleScope, fieldKey) {
                    var redirectURL = generateUrl(moduleScope);
                    if (fieldKey) {
                        redirectURL += "&fieldkey=" + fieldKey;
                    }
                    return redirectURL;
                };


                /*
                 *  Get scope from module type
                 */
                var getScopeFromModuleType = function (moduleType) {
                    var scope = '';
                    var array = $.makeArray("16,17,18,27".split(','), moduleType.split(',')[0]);

                    if (moduleType == "1,2,3") {
                        scope = scopeValues.RFX.string.toLowerCase();
                    }
                    else if (array == "16" || array == "17" || array == "18" || array == "27") {
                        scope = "request";
                    }
                    else {
                        for (var key in scopeValues) {
                            if (scopeValues[key].value == moduleType) {
                                scope = scopeValues[key].string.toLowerCase();
                                break;
                            }
                        }
                    }
                    return scope;
                };

                var getModuleTypeFromScope = function (moduleScope) {
                    var type = '';
                    for (var key in scopeValues) {
                        if (scopeValues[key].string.toLowerCase() == moduleScope) {
                            type = scopeValues[key].value;
                            break;
                        }
                    }
                    return type;
                };

                var IsAdvanceSearchEnabled = function (moduleScope) {
                    var productsArray = getAdvanceSearchEnabledProducts();
                    var type = getModuleTypeFromScope(moduleScope);
                    if (productsArray.length > 0) {
                        if (productsArray.indexOf(type) != -1)
                            return true;
                        else
                            return false;
                    }
                };

                var getAdvanceSearchEnabledProducts = function () {
                    var productsArray = scope.advancedSearchDocTypes != null ? scope.advancedSearchDocTypes.split(",") : [];
                    return productsArray;
                };

                /*
                 *  Create redirection url
                 */
                var generateUrl = function (moduleScope) {
                    var searchText = scope.searchText.trim();
                    var url = '';
                    if (IsAdvanceSearchEnabled(moduleScope)) {
                        url = searchConstants.portalURL + 'Portal/Dashboard/Documents?scope=' + moduleScope + '&q=' + searchText + '&oloc=' + searchConstants.documentTypeCodes;
                    }
                    else {
                        url = searchConstants.portalURL + 'Portal/search/searchresults?q=' + searchText + '&scope=' + moduleScope + '&oloc=' + searchConstants.documentTypeCodes;
                    }

                    switch (moduleScope.toLowerCase()) {
                        case scopeValues.Catalog.string.toLowerCase():
                            url = searchConstants.portalURL + '/Catalog/Manage/Navigation?bpc=' + searchConstants.encryptedBPC + '&navTo=1&q=' + searchText + '&scope=' + moduleScope + '&' + searchConstants.catalogQueryString + '&oloc=' + scopeValues.Catalog.SubAppCodes;
                            break;
                        case scopeValues.Order.string.toLowerCase():
                            url += '&' + searchConstants.orderQueryString;
                            break;
                        case scopeValues.Invoice.string.toLowerCase():
                            url += '&' + searchConstants.invoiceQueryString;
                            break;
                        case scopeValues.Receipts.string.toLowerCase():
                            url += '&' + searchConstants.receiptQueryString;
                            break;
                        case scopeValues.Requisition.string.toLowerCase():
                            url += '&' + searchConstants.requisitionQueryString;
                            break;
                        case scopeValues.InvoiceReconciliation.string.toLowerCase():
                            url += '&' + searchConstants.invoiceReconcillationQueryString;
                            break;
                        case scopeValues.CreditMemo.string.toLowerCase():
                            url += '&' + searchConstants.creditMemoQuerystring;
                            break;
                        case scopeValues.Blanket.string.toLowerCase():
                            url += '&' + searchConstants.blanketQueryString;
                            break;
                        case scopeValues.CategoryWorkbench.string.toLowerCase():
                            url += '&' + searchConstants.categoryWorkbenchQueryString;
                            break;
                        case scopeValues.Partners.string.toLowerCase():
                            url = searchConstants.portalURL + 'Portal/search/searchresults?q=' + searchText + '&scope=' + moduleScope + '&' + searchConstants.partnersQueryString + '&oloc=' + searchConstants.documentTypeCodes;
                            break;
                        case scopeValues.Forms.string.toLowerCase():
                            url += '&' + searchConstants.formQueryString;
                            break;
                        case scopeValues.Scorecards.string.toLowerCase():
                            url += '&' + searchConstants.assessmentQueryString;
                            break;
                        case scopeValues.Workbench.string.toLowerCase():
                            url += '&' + searchConstants.workBenchQueryString;
                            break;
                        case scopeValues.RFX.string.toLowerCase():
                        case scopeValues.RFP.string.toLowerCase():
                        case scopeValues.RFQ.string.toLowerCase():
                        case scopeValues.RFI.string.toLowerCase():
                            url += '&' + searchConstants.rfxQueryString;
                            break;
                        case scopeValues.Auction.string.toLowerCase():
                            url += '&' + searchConstants.auctionQueryString;
                            break;
                        case scopeValues.ActionPlan.string.toLowerCase():
                            url += '&' + searchConstants.actionPlanQueryString;
                            break;
                        case scopeValues.Contract.string.toLowerCase():
                            url += '&' + searchConstants.contractQueryString;
                            break;
                        case scopeValues.Templates.string.toLowerCase():
                            url += '&' + searchConstants.catalogQueryString;
                            break;
                        case "request":
                            moduleScope = scopeValues.RFxRequest.string.toLowerCase() + "," + scopeValues.AuctionRequest.string.toLowerCase() + "," + scopeValues.ContractRequest.string.toLowerCase() + "," + scopeValues.PaymentRequest.string.toLowerCase();
                            url = searchConstants.portalURL + 'Portal/search/searchresults?q=' + searchText + '&scope=' + moduleScope + '&oloc=' + searchConstants.documentTypeCodes;
                            break;
                        case "returnnote":
                            url += '&' + searchConstants.returnNoteQuerystring;
                            break;
                        case scopeValues.Project.string.toLowerCase():
                            url = searchConstants.portalURL + 'PPST/Project/ProjectHome?oloc=113&q=' + searchText + '&' + searchConstants.projectQueryString;
                            break;
                        default:
                            if ((moduleScope.toLowerCase().indexOf(scopeValues.AuctionRequest.string.toLowerCase()) !== -1) || (moduleScope.toLowerCase().indexOf(scopeValues.RFxRequest.string.toLowerCase()) !== -1) || (moduleScope.toLowerCase().indexOf(scopeValues.ContractRequest.string.toLowerCase()) !== -1) || (moduleScope.toLowerCase().indexOf(scopeValues.PaymentRequest.string.toLowerCase()) !== -1)) {
                                url += '&' + searchConstants.auctionQueryString;
                            }
                            break;
                    }

                    if (APPCONSTANTS.userPreferences.UserBasicDetails.IsSupplier) {
                        url = url + "&dd=" + searchConstants.encryptedBPC;
                    }

                    return url;
                };


                scope.searchText = '';

                var request, searchConstants, lastSearchedText;

                /*
                 *  Get search constants from .net controller
                 */
                if (APPCONSTANTS && APPCONSTANTS.userPreferences && APPCONSTANTS.userPreferences.constantURLAndQueryStringValue)
                    searchConstants = APPCONSTANTS.userPreferences.constantURLAndQueryStringValue;
                else {
                    request = {
                        method: 'GET',
                        url: '/' + APPCONSTANTS.userPreferences.AreaName + '/GetConstantURLAndQueryStringValues'
                    };

                    httpService.directhttp(request).then(function (result) {
                        searchConstants = result;
                    }, function (errorData) {
                        searchConstants = {};
                    });
                }

                request = {
                    method: 'GET',
                    url: '/' + APPCONSTANTS.userPreferences.AreaName + '/GetAllowedModulesList?oloc=216&BuyerPartnerCode=' + APPCONSTANTS.userPreferences.UserBasicDetails.BuyerPartnerCode
                };

                function setAllowedModuleListData(result) {
                    var modules = result.Output;
                    var orderIndex = -1;
                    for (var i = 0; i < modules.length; i++) {
                        if (modules[i].FilterKey == 8) {
                            orderIndex = i;
                            break;
                        }
                    }
                    if (orderIndex > -1) {
                        var quickSearchItem = modules.splice(orderIndex, 1);
                        modules.splice(1, 0, quickSearchItem[0]);
                    }
                    scope.modules = angular.copy(modules);
                    scope.selectedModule = scope.modules[0];
                    scope.advancedSearchDocTypes = result.AdvancedSearchDocTypes;
                };

                if (APPCONSTANTS.userPreferences.allowedModulesList){
                    setAllowedModuleListData(APPCONSTANTS.userPreferences.allowedModulesList);
                }else{
                    httpService.directhttp(request).then(function (result) {
                        setAllowedModuleListData(result);
                    }, function (errorData) { });
                }
                
                /*
                 *  On module item click handler
                 */
                scope.onModuleClick = function (module) {
                    scope.selectedModule = module;
                    scope.showFilterList = false;
                    scope.recentSearches = null;
                    scope.searchResult = null;
                };


                /*
                 *  Get recent searches
                 */
                var getRecentSearches = function () {
                    if (scope.recentSearches) {
                        scope.recentSearches = scope.recentSearches.splice(0, 5);
                        scope.showRecentSearches = true;
                        return;
                    }

                    scope.recentSearches = null;

                    scope.isRecentSearchesLoading = true;

                    request = {
                        method: 'GET',
                        url: '/Controls/HeaderBar/GetRecentSearches?oloc=101&moduleType=' + (scope.selectedModule.IsAllMenu ? 0 : scope.selectedModule.FilterKey.split(',')[0]) + '&fieldKey=' + (scope.selectedModule.FieldKey != undefined ? scope.selectedModule.FieldKey : 0)
                    };

                    httpService.directhttp(request).then(function (result) {
                        scope.showRecentSearches = true;
                        scope.isRecentSearchesLoading = false;
                        try {
                            scope.recentSearches = JSON.parse(result.RecentSearches).splice(0, 5);
                        }
                        catch (e) {
                            scope.recentSearches = [];
                        }
                    }, function (errorData) {
                        scope.isRecentSearchesLoading = false;
                    });
                };


                /*
                 *  Get search results
                 */
                scope.onSearchTextChange = function (event) {
                    if (event.keyCode === 13 && scope.searchText.trim().length > 2) {
                        if (!scope.selectedModule.IsAllMenu) {
                            window.location.href = scope.getSearchNavigateURL(getScopeFromModuleType(scope.selectedModule.FilterKey), scope.selectedModule.FieldKey);
                            return;
                        }

                        scope.showRecentSearches = false;
                        scope.showFilterList = false;
                        scope.showSearchResult = true;
                        scope.isSearchResultLoading = true;

                        //  If user has recently searched for the text entered, do not hit the service
                        if (lastSearchedText === scope.searchText.trim() && scope.searchResult) {
                            scope.isSearchResultLoading = false;
                            return;
                        }

                        if (!scope.recentSearches) {
                            getSearchResults();
                            return;
                        }

                        var recentSearches = [{ "Sequence": 0, "SearchText": scope.searchText.trim() }];

                        //  Remove duplicate entries from recent searches and generate recent search sequence
                        for (var i = 0; i < scope.recentSearches.length; i++) {
                            if (scope.recentSearches[i].SearchText != scope.searchText.trim()) {
                                recentSearches.push({
                                    "Sequence": recentSearches.length,
                                    "SearchText": scope.recentSearches[i].SearchText
                                });
                            }
                        }

                        scope.recentSearches = angular.copy(recentSearches);

                        request = {
                            method: 'POST',
                            url: '/Controls/HeaderBar/SaveRecentSearches?oloc=101',
                            data: {
                                "recentSearches": JSON.stringify(recentSearches),
                                "moduleType": scope.selectedModule.IsAllMenu ? 0 : scope.selectedModule.FilterKey.split(",")[0],
                                "fieldKey": scope.selectedModule.FieldKey != undefined ? scope.selectedModule.FieldKey : 0
                            }
                        };

                        httpService.directhttp(request).then(function (result) {
                            getSearchResults();
                        }, function (errorData) {
                            getSearchResults();
                        });
                    }
                    else {
                        if (scope.searchText.trim().length == 0) {
                            scope.showSearchResult = false;
                            getRecentSearches();
                        }
                    }
                };


                var getSearchResults = function () {
                    lastSearchedText = angular.copy(scope.searchText.trim());

                    scope.searchResult = null;

                    request = {
                        method: 'POST',
                        url: '/Controls/BaseSearch/GetSearchResultForWeb?oloc=101',
                        data: {
                            "searchKeyword": scope.searchText.trim(),
                            "Filters": ["searchScope:All", "pageNumber:1", "isGlobalSearch:true", "module:all", "moduleScope:" + getCurrentModuleScope(), "noOfRecords:0"]
                        }
                    };

                    if (scope.selectedModule.FieldKey) {
                        request.data.Filters.push("fieldkey:" + scope.selectedModule.FieldKey);
                    }

                    httpService.directhttp(request).then(function (result) {
                        scope.isSearchResultLoading = false;
                        if (result.DataSearchResult.GroupTotal.TotalCount > 0) {
                            scope.searchResult = result.DataSearchResult.GroupTotal;
                        }
                        else {
                            scope.searchResult = [];
                        }
                    }, function (errorData) {
                        scope.isSearchResultLoading = false;
                    });
                };


                /*
                 *  On search-text focus
                 */
                scope.onSearchTextFocus = function (e) {
                    if (scope.searchText.trim().length == 0) {
                        scope.showSearchResult = false;
                        getRecentSearches();
                    }
                };


                /*
                 *  On recent search item click handler
                 */
                scope.onRecentSearchItemClick = function (text) {
                    scope.searchText = text;
                    scope.onSearchTextChange({ keyCode: 13 });
                };


                /*
                 *  Get translated label
                 */
                scope.getTranslatedLabel = function (label) {
                    return $translate.instant(label);
                };


                /*
                 *  On document click handler
                 */
                var onDocumentClick = function () {
                    $timeout(function () {
                        scope.showRecentSearches = false;
                        scope.showFilterList = false;
                        scope.showSearchResult = false;
                        try {
                            httpService.abort(request);
                        }
                        catch (e) { }
                    });
                };

                $(document).on('click', onDocumentClick);

                scope.$on('$destroy', function () {
                    $(document).off('click', onDocumentClick);
                })
            },
            templateUrl: 'shared/directives/smartSearch/smartSearchTemplate.html'
        };
    }]);
})();
(function (angular) {
	'use strict';
	angular.module('SMART2').directive('smartTreePopup', ['$timeout',
	function($timeout) {
		return {
			restrict : 'E',
			scope : {
				header : "@",
				isRadio : "@",
				toggle : "@",
				preselection : "@",
				onHide : "&",
				onSelect : "&",
                disableLevelSelection : "@"
			},
			link : function(scope, element, attrs) {
			    //watch treePopupToggle boolean to toggle popup
			    var isInitServiceCall = true;
				scope.$watch('toggle', function(value) {
				    scope.showPopupBool = scope.$eval(value);
				    if (scope.showPopupBool) {
				        scope.treeConfig.hideSearch = false;
				        if (isInitServiceCall) {
				            $timeout(function () {
				                scope.treeConfig.initServiceCall();
				            });
				            isInitServiceCall = false;
				        }
				    }
				});
				
				//watch preselection
				scope.$watch('preselection', function(value) {
					scope.treeConfig.SelectedNodes = value;
				});

				//on-hide callback
				var hideCallback = scope.$eval(scope.onHide);
				
				//on-select callback
				var selectCalback = scope.$eval(scope.onSelect);

				//creating Tree Component Config
				scope.treeConfig = {
					IsRadio : scope.$eval(scope.isRadio),
					type : "Category",
					SelectedNodes : "",
					title: scope.header,
					disableLevelSelection: scope.disableLevelSelection,
                    hideSearch : false
				};
				scope.onDoneCallback = function(e) {
					if (angular.isFunction(selectCalback)) {
						selectCalback(e);
					};
				};

				// view bindings
				scope.showPopupBool = false;
				scope.onPopupHideCallback = function() {
				    scope.showPopupBool = false;
				    scope.treeConfig.hideSearch = true;
					if (angular.isFunction(hideCallback)) {
						hideCallback();
					};
				};
			},
			templateUrl : 'shared/directives/smartTree/smartTreePopup.html'
		};
	}]);

	/*******----smartTreeComponent Module----*******/

	angular.module('smartTreeComponent', []).directive('smartTreeComponent', ['$timeout', 'RESTApiSt', '$q', 'APPCONSTANTS', 'Common',
	function ($timeout, RESTApiSt, $q, APPCONSTANTS, Common) {
		return {
			restrict : 'E',
			replace : true,
			scope : {
				config : '=',
				onDone : '&'
			},
			link: function (scope, element, attrs) {

			    // ID's generation
			    scope.parentId = 'Parent_' + Common.uniqueIDGenerator();
			    scope.templateId = 'Template_' + Common.uniqueIDGenerator() + '.html';


				/*config for the directive*/
			    scope.config.initServiceCall = function () {
			        RESTApiSt.getData(scope.treeConfig.type, RESTApiStCallback, req);
			    }
				scope.treeConfig = scope.config;
				var doneCallback = scope.$eval(scope.onDone);
				scope.$watch('config.SelectedNodes', function(n, o) {
					if (n) {
						preselection = n.split(',');
						if (preselectionRecievedPromise)
							preselectionRecievedPromise.resolve();
					}
				});

				scope.$watch('config.hideSearch', function (n, o) {
				    if (n && scope.searchFieldVal.length > 0) {
				        $timeout(function () {
				            angular.element('#closeButton').trigger('click');
				        });
				    }
				});

				/*promise*/
				var dataRecievedCallPromise;
				var preselectionRecievedPromise;
				var promises = [];
				initializePromise(true, true);

				/*Local variables*/
				var dataSet;
				var searchBucket = 50;
				var lazyLoadingBucket = 50;
				var maxLevel;
				var lazyLoadOffset;
				var lazyLoadMarker = [];
				var levelKey = 'level';
				var levelWiseData = {};
				var parentStringConstant = "parentString";
				var parentCodeStringConstant = "parentCodeString";
				var preselection;
				var searchCategories = [];
				var req;

				switch(scope.treeConfig.type) {
				case 'Category':
					scope.codeProperty = 'PASCode';
					scope.titleProperty = 'PASName';
					scope.levelProperty = 'PASLevel';
					scope.parentProperty = 'ParentPASCode';
					/*req = {
					    method: 'POST',
					    url: 'https://gepqcsmart-rest.servicebus.windows.net/PortalRestService/GetPASForDeviceMob',
					    headers: {
					        'Content-Type': 'application/json',
					        'UserExecutionContext': '{"ClientName":"BuyerSqlConn","ClientID":2,"BuyerPartnerCode":6315,"Product":2,"UserId":"28082","EntityType":"supplier registration","EntityId":8888,"LoggerCode":"EC101","Culture":"en-US","UserName":"RiteAid.Admin@gep.com","CompanyName":"BuyerSqlConn","ContactCode":63150040000001}'
					    },
					    data: {
					        "ContactCode": 63150040000001,
					        "entityDetailCode": 7,
					        "entityId": 1
					    }
					};*/
					req = {
					    method: 'POST',
					    url: APPCONSTANTS.userPreferences.URLs.AppURL + 'PortalRestService/GetPASForDeviceMob?oloc=218',
					    headers: {
					        'Content-Type': 'application/json',
					        'UserExecutionContext': JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails),
					    },
					    data: {
					        "ContactCode": APPCONSTANTS.userPreferences.UserBasicDetails.ContactCode,
					        "entityDetailCode": APPCONSTANTS.userPreferences.ACEntityId,
					        "entityId": APPCONSTANTS.userPreferences.UserBasicDetails.EntityId
					    }
					};
					break;
				case 'Region':
					scope.codeProperty = 'RegionId';
					scope.titleProperty = 'RegionName';
					scope.levelProperty = 'RegionLevel';
					scope.parentProperty = 'RegionParentId';
					break;
				};
				
				scope.isLoading = true;
				scope.selectedData = [];
				scope.isSingleSelect = scope.treeConfig.IsRadio;
				scope.msg = "Loading..."

				/*Local member fuctions*/

				function initializePromise(dataRievedPromiseBool, preselectionRecievedPromiseBool) {
					dataRecievedCallPromise = null;
					preselectionRecievedPromise = null;
					promises.length = 0;
					if (dataRievedPromiseBool) {
						dataRecievedCallPromise = $q.defer();
						promises.push(dataRecievedCallPromise.promise);
					}
					if (preselectionRecievedPromiseBool) {
						preselectionRecievedPromise = $q.defer();
						promises.push(preselectionRecievedPromise.promise);
					}
					$q.all(promises).then(promiseResolved);
				}

				function promiseResolved() {
					initatePreSelection();
					initializePromise(false, true);
				}

				function createLevelWiseDataSet() {
					var level = 1;
					var parentNodes = dataSet[level];
					insertParentHierarchyForFlatStrucure(parentNodes);
					while (parentNodes) {
						levelWiseData[levelKey + level] = parentNodes;
						insertParentHierarchyForFlatStrucure(parentNodes, level);
						maxLevel = level;
						level = level + 1;
						parentNodes = dataSet[level];
					}
				};

				function insertParentHierarchyForFlatStrucure(parentNodes, level) {
					var fetchedData = (level) ? _.groupBy(dataSet[level + 1], scope.parentProperty) : null;
					_.each(parentNodes, function(parent) {
						var childForParent = (fetchedData) ? fetchedData[parent[scope.codeProperty]] : parentNodes;
						if (childForParent) {
							_.each(childForParent, function(node, index) {
								node[parentStringConstant] = parent[parentStringConstant] ? parent[parentStringConstant] + ' > ' + node[scope.titleProperty] : (node[scope.levelProperty] > 1) ? parent[scope.titleProperty] + ' > ' + node[scope.titleProperty] : "";
								node[parentCodeStringConstant] = parent[parentCodeStringConstant] ? parent[parentCodeStringConstant] + '>' + node[scope.codeProperty] : (node[scope.levelProperty] > 1) ? parent[scope.codeProperty] + '>' + node[scope.codeProperty] : "";
								node['isExpanded'] = false;
								node['selection'] = "0";
								node['index'] = index;
							});
						}
					});
				};

				function RESTApiStCallback(response) {
				    try{
				        dataSet = _.groupBy(JSON.parse(response.data.GetPASForDeviceMobResult), scope.levelProperty);
				        createLevelWiseDataSet();
				        scope.categories = levelWiseData[levelKey + '1'].slice(0, lazyLoadingBucket);
				        lazyLoadMarker.push(levelWiseData[levelKey+'1'][levelWiseData[levelKey + '1'].length - 1]);
				        scope.isLoading = false;
				    }catch(e){
				        scope.msg = "Error occurred while loading data."
				    }
				    dataRecievedCallPromise.resolve();
				};

				function resetSelectionState() {
					_.each(scope.selectedData, function(_node) {
						scope.selectNode(_node, '0');
					});
				};

				function initatePreSelection() {
					resetSelectionState();
					_.each(preselection, function(preselectionNode) {
						var searchLevel = 1;
						while (searchLevel <= maxLevel) {
							var foundNode = _.groupBy(levelWiseData[levelKey + searchLevel],scope.codeProperty)[preselectionNode];
							if (foundNode) {
								scope.selectNode(foundNode[0], '1');
								break;
							}
							searchLevel = searchLevel + 1;
						}
					});
				};

				function openSelectionTree() {
					var partialSeletedNodes = _.filter(levelWiseData[levelKey + 0], function(node) {
						return node.selection = '2';
					});
					_.each(partialSeletedNodes, function(nodes) {
						var level = nodes[scope.levelProperty];
						//var childs = _.
					});
				}

				function getChildsForParentAsPerBucket(parent, bucket, startIndex) {
					var childSearchLevel = parent[scope.levelProperty] + 1;
					var parentCodeStringIterator;
					var result = _.groupBy(levelWiseData[levelKey+childSearchLevel],scope.parentProperty)[parent[scope.codeProperty]];
					//var bucketData = (bucket) ? result.slice(startIndex, startIndex + bucket) : result;
					var bucketData = result;
					return bucketData;
				};

				function lazyLoadLevelWiseData(markerNode) {
					var parentSearchLevel = markerNode[scope.levelProperty] - 1;
					var markerNodeParent = markerNode[scope.parentProperty];
					var parent = _.find(levelWiseData[levelKey + parentSearchLevel], function(node) {
						return node[scope.codeProperty] == markerNodeParent;
					});
					if (parent) {
						var bucketChilds = getChildsForParentAsPerBucket(parent, lazyLoadingBucket, markerNode.index + 1);
						console.log('childs appended = ' + bucketChilds.length);
						if (bucketChilds.length > 0) {
							parent.children = parent.children.concat(bucketChilds);
							lazyLoadMarker.push(bucketChilds[bucketChilds.length - 1]);
							scope.$apply();
						}
					}
				};

				var searchString = "";
				var searchLevel;
				var searchDataYetToBeDisplayed = [];
				var searchWithContainsHitResult = [];
				scope.searchResults = [];
				function searchAsPerBucketSize(searchStr, bucket) {
					if (searchString != searchStr) {
						searchString = searchStr;
						searchLevel = maxLevel;
						searchDataYetToBeDisplayed.length = 0;
						searchWithContainsHitResult.length = 0;
						scope.searchResults.length = 0;
					};
					var searchData = getDataAsPerBucketSize(searchStr, bucket);
					scope.searchResults = scope.searchResults.concat(searchData);
				};

				function getOffsetSearchData(bucket) {
					var partitionedData = _.partition(searchDataYetToBeDisplayed, function(data, index) {
						return index > (bucket - 1);
					});
					searchDataYetToBeDisplayed = partitionedData[0];
					return partitionedData[1];
				};

				function getOffsetSearchDataForContainsSearch(bucket) {
					var partitionedData = _.partition(searchWithContainsHitResult, function(data, index) {
						return index > (bucket - 1);
					});
					searchWithContainsHitResult = partitionedData[0];
					return partitionedData[1];
				};

				function getDataAsPerBucketSize(searchStr, bucket) {
					var bucketData = [];
					while (bucketData.length < bucket && searchLevel > 0) {
						var offsetSearchData = getOffsetSearchData(bucket);
						if (offsetSearchData.length == bucket) {
							bucketData = offsetSearchData;
							break;
						}
						var searchData = _.filter(levelWiseData[levelKey + searchLevel], function(node) {
							return -1 != node[scope.titleProperty].toLowerCase().indexOf(searchString.toLowerCase());
						});

						var containsSarchResult = _.filter(levelWiseData[levelKey + searchLevel], function(node) {
							return new RegExp("(" + _.compact(searchString.split(' ')).join('|') + ")", "gi").test(node[scope.titleProperty]) && -1 == node[scope.titleProperty].toLowerCase().indexOf(searchString.toLowerCase());
						});
						searchWithContainsHitResult = searchWithContainsHitResult.concat(containsSarchResult);
						var qumulativeData = offsetSearchData.concat(searchData);
						var partitionedData = _.partition(qumulativeData, function(data, index) {
							return index > (bucket - 1);
						});
						searchDataYetToBeDisplayed = searchDataYetToBeDisplayed.concat(partitionedData[0]);
						bucketData = bucketData.concat(partitionedData[1]);
						searchLevel = searchLevel - 1;
					}
					if (searchLevel == 0) {
						while (bucketData.length < bucket) {
							var containsSearchDataToBeAppended = getOffsetSearchDataForContainsSearch(bucket);
							if (containsSearchDataToBeAppended.length > 0) {
								bucketData = bucketData.concat(containsSearchDataToBeAppended);
							} else {
								break;
							}
						}
					}
					return bucketData;
				};

				function closeChildsForParent(parent) {
					var childs = _.filter(getChildsForParentAsPerBucket(parent), function(childNode) {
						return childNode.isExpanded;
					});
					_.each(childs, function(child) {
						child.isExpanded = false;
						child.children = [];
						closeChildsForParent(child);
					});
				}


				scope.searchText = '';
				scope.searchFieldVal = '';

				scope.expandNode = function(node, index) {
					node.isExpanded = !node.isExpanded;
					if (node.isExpanded) {
						node.children = getChildsForParentAsPerBucket(node, lazyLoadingBucket, 0);
						lazyLoadMarker.push(node.children[node.children.length - 1]);
					} else {
						node.children = [];
						removeMarkerForParent(node);
					}
				};

				function removeMarkerForParent(parent) {
					var childMarkers = _.filter(lazyLoadMarker, function(node, index) {
						return -1 != node[parentCodeStringConstant].indexOf(parent[scope.codeProperty]);
					});
					lazyLoadMarker = _.difference(lazyLoadMarker, childMarkers);
					closeChildsForParent(parent);
				};

				var filterTextTimeout;
				scope.searchAndSelectNode = function(node) {
					if (filterTextTimeout)
						$timeout.cancel(filterTextTimeout);
					filterTextTimeout = $timeout(function() {
						if (scope.searchFieldVal.length > 2)
							searchAsPerBucketSize(scope.searchFieldVal, searchBucket);
						else {
							searchDataYetToBeDisplayed.length = 0;
							searchWithContainsHitResult.length = 0;
						}
					}, 300);
				};

				scope.selectNode = function(node, selectionState) {
					node.selection = selectionState;
					if (scope.isSingleSelect) {
					    if (scope.selectedData && scope.selectedData[0] && scope.selectedData[0][scope.codeProperty] != node[scope.codeProperty]) {
					        scope.selectedData[0].selection = '0';
					    };
					    scope.selectedData = (selectionState == '0') ? [] : [node];
					} else {
						updateSelectionObject(node, selectionState);
						updateChildsForNode(node, selectionState);
					}
					updateParentForNode(node, selectionState);
				};

				function updateSelectionObject(node, selectionState) {
					switch(selectionState) {
					case '0':
						scope.selectedData = _.without(scope.selectedData, node);
						break;
					case '1':
						scope.selectedData.push(node);
						break;
					}
				};

				function updateParentForNode(node, selectionState) {
					var depthLevel = node[scope.levelProperty] - 1;
					var immediateParentCode = node[scope.parentProperty].toString();
					while (depthLevel > 0) {
						var parent = _.find(levelWiseData[levelKey + depthLevel], function(node) {
							return node[scope.codeProperty] == immediateParentCode;
						});
						immediateParentCode = parent[scope.parentProperty].toString();
						if (!parent['isExpanded']) {
							scope.expandNode(parent);
						}
						if (!scope.isSingleSelect) {
							parent.selection = getStateForNode(parent);
						}
						depthLevel = depthLevel - 1;
					}
				};

				function getStateForNode(node) {
					var childCount = node.ChildCount;
					var depthLevel = node[scope.levelProperty] + 1;
					var parentCode = node[scope.codeProperty];
					var groupByData = _.groupBy(levelWiseData[levelKey + depthLevel], scope.parentProperty);
					var selectedChild = _.filter(groupByData[parentCode], function(node) {
						return node.selection == '1';
					});
					var partiallySelectedChild = _.filter(groupByData[parentCode], function(node) {
						return node.selection == '2';
					});
					if (childCount == selectedChild.length) {
						scope.selectedData = _.difference(scope.selectedData, selectedChild);
						scope.selectedData.push(node);
						return "1";
					} else if ((selectedChild.length + partiallySelectedChild.length) > 0) {
						scope.selectedData = _.union(scope.selectedData, selectedChild);
						scope.selectedData = _.without(scope.selectedData, node);
						return "2";
					} else {
						scope.selectedData = _.union(scope.selectedData, selectedChild);
						scope.selectedData = _.without(scope.selectedData, node);
						return "0";
					}
				};

				function updateChildsForNode(node, selectionState) {
					var depthLevel = node[scope.levelProperty] + 1;
					var parentCode = node[scope.codeProperty].toString();
					while (depthLevel <= maxLevel) {
						var childs = _.filter(levelWiseData[levelKey + depthLevel], function(node) {
							return -1 != node[parentCodeStringConstant].indexOf(parentCode);
						});
						_.each(childs, function(child) {
							child.selection = selectionState;
							if (selectionState == "1") {
								scope.selectedData = _.without(scope.selectedData, child);
							};
						});
						depthLevel = depthLevel + 1;
					}
				}

				var uniqueIDGenerator = function() {
					var d = new Date().getTime();
					var uniqueID = 'xxx2xxxpxxxoxxx'.replace(/[xy]/g, function(c) {
						var r = (d + Math.random() * 16) % 16 | 0;
						d = Math.floor(d / 16);
						return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
					});
					return uniqueID;
				};
				if (scope.isSingleSelect) {
					scope.uniqueRadioGroupName = uniqueIDGenerator();
				}

				/*$timeout(function() {
					lazyLoadOffset = angular.element("#treeComponentContainer")[0].getBoundingClientRect().bottom;
					angular.element('.scrollbar-outer').scrollbar({
						onScroll : function(y, x) {
							if (lazyLoadMarker.length > 0 && scope.searchFieldVal.length == 0) {
								var markerNode = lazyLoadMarker[lazyLoadMarker.length - 1];
								if (angular.element("#"+markerNode[scope.codeProperty])[0].getBoundingClientRect().top <= lazyLoadOffset) {
									console.log(markerNode);
									lazyLoadMarker.length = (lazyLoadMarker.length > 0) ? lazyLoadMarker.length - 1 : 0;
									lazyLoadLevelWiseData(markerNode);
									console.log(lazyLoadMarker.length);
								}
							}
							if (y.maxScroll > 0 && y.scroll == y.maxScroll && scope.searchFieldVal.length > 0) {
								$timeout(function() {
									searchAsPerBucketSize(scope.searchFieldVal, searchBucket);
								});
							}
						}
					});
				});*/
				
				scope.scrollEnd = function(e){
					searchAsPerBucketSize(scope.searchFieldVal, searchBucket);
				};

				scope.doneClickHandler = function() {
					if (angular.isFunction(doneCallback)) {
						doneCallback(scope.selectedData);
					}
				};
				
				scope.focusSearch = false;
				scope.isActive = false;
				scope.showMe = false;
				scope.showSearch = function () {
				    scope.isActive = true;
				    scope.focusSearch = true;
				    scope.showMe = true;
				    scope.hideClose = true;
				}

				scope.hideSearch = function () {
				    scope.isActive = false;
				    scope.focusSearch = false;
				    scope.hideClose = false;


				}


			},
			templateUrl : 'shared/directives/smartTree/smartTreeTemplate.html'
		};
	}]).directive('ngIndeterminate', function($compile) {
		return {
			restrict : 'A',
			link : function(scope, element, attributes) {
				scope.$watch(attributes['ngIndeterminate'], function(value) {
					element.prop('indeterminate', value);
				});
			}
		};
	}).directive('ngHighlightSt',['$compile', 'hilitor', function($compile, hilitor) {
		return {
			restrict : 'A',
			link : function(scope, element, attributes) {
				scope.$watch(attributes['ngHighlight'], function(value) {
					hilitor.getHilitor().apply(value);
				});
			}
		};
	}]).service('RESTApiSt', ['$http',
	function($http) {
		var Callback;

		this.getData = function(mode, callback, requestObject) {
			switch(mode) {
			case 'Category':
				Callback = callback;
				serviceCall(requestObject);
				break;
			}
		};

		function serviceCall(req) {
			$http(req).then(function(response) {
				Callback(response);
			}, function(error) {
				Callback(error);
			});
		};
	}]).service('hilitor', [
	function() {
		var hilitor = new Hilitor("treeComponentContainer");
		this.getHilitor = function() {
			return hilitor;
		};
	}]);

})(angular);

(function() {

    /*
     *  Prevent document's default scroll behaviour on space
     */
    window.onkeydown = function(e) {
        if (e.keyCode == 32 && $(e.target).hasClass('ui-grid-focuser')) {
            e.preventDefault();
            return false;
        }
    };


    angular.module('SMART2')
        .directive("uigridCompatible", ['uiGridConstants', 'uiGridEditConstants', '$rootScope', uigridCompatibleFunc]);

    function uigridCompatibleFunc(uiGridConstants, uiGridEditConstants, $rootScope) {
        return {
            require: ['?^uiGrid', '?^uiGridRenderContainer'],
            restrict: 'A',
            link: function(scope, element, attrs, controllers) {
                var uiGridCtrl = controllers[0];
                var renderContainerCtrl = controllers[1];

                var isFocused = false;
                var isSelectElement = false;

                /*
                 *  Remove previous cell scope if any
                 */
                if (window.lastRenderedElementScope) {
                    try {
                        window.lastRenderedElementScope.stopEdit();
                        window.lastRenderedElementScope = undefined;
                    }
                    catch (e) { }
                }

                window.lastRenderedElementScope = scope;

                /*
                 *  On popup close listener
                 */
                var onPopupClosed = $rootScope.$on("popupClosed", function () {
                    uiGridCtrl.focus();
                });

                /*
                *  On date component close listener
                */
                var onDatePopupClosed = $rootScope.$on("closedPopup", function () {
                    uiGridCtrl.focus();
                });

                /*
                 *  On popup open listener
                 */
                var onPopupOpened = $rootScope.$on("popupOpened", function () {
                    document.activeElement.blur();
                });

                /*
                 *  Viewport keydown broadcast listener
                 */
                var onViewPortKeyDown = uiGridCtrl.grid.api.cellNav.on.viewPortKeyDown(scope, function (e, rowCol) {
                    var inputText = element.find("input");
                    var anchor = element.find("a");

                    switch (e.keyCode) {
                        case 32:
                            if (anchor.length > 0) {
                                window.isPopupOpenedByUIGridCompatibleElement = true;
                                anchor.trigger("click");
                            }
                            else if (inputText.length > 0 && !isFocused) {
                                inputText.focus();
                                isFocused = true;
                            }
                            else if (isSelectElement) {
                                select.focus();
                            }
                            break;
                        case 9:
                            scope.stopEdit();
                            break;
                        default:
                            if (element.attr("type") !== "date") {
                                inputText.focus();
                            }
                            break;
                    }
                });

                /*
                 *  Stop cell editing and destroy the scope
                 */
                scope.stopEdit = function (e) {
                    if (isSelectElement) {
                        select.blur();
                    }
                    scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                };


                /*
                 *  Element key down handler
                 */
                var onElementKeyDown = function (e) {
                    switch (e.keyCode) {
                        case 32:
                            var inputText = element.find("input");
                            var anchor = element.find("a");

                            if (anchor.length > 0) {
                                window.isPopupOpenedByUIGridCompatibleElement = true;
                                anchor.trigger("click");
                            }
                            else if (isSelectElement) {
                                select.focus();
                            }
                            break;
                        case uiGridConstants.keymap.ESC:
                            e.stopPropagation();
                            scope.$emit(uiGridEditConstants.events.CANCEL_CELL_EDIT);
                            break;
                    }
                    if (uiGridCtrl && uiGridCtrl.grid.api.cellNav) {
                        e.uiGridTargetRenderContainerId = renderContainerCtrl.containerId;
                        if (uiGridCtrl.cellNav.handleKeyDown(e) !== null) {
                            scope.stopEdit(e);
                        }
                    }
                    else {
                        //handle enter and tab for editing not using cellNav
                        switch (e.keyCode) {
                            case uiGridConstants.keymap.ENTER: // Enter (Leave Field)
                            case uiGridConstants.keymap.TAB:
                                scope.stopEdit(e);
                                break;
                        }
                    }
                };

                element.on('keydown', onElementKeyDown);


                //  Focus select element
                var select = element.find("select");
                isSelectElement = select.length > 0;
                if (isSelectElement) {
                    setTimeout(function () {
                        select.focus();
                    });
                }



                //  Trigger anchor tag's click event if cell clicked
                if (window.isCellClicked) {
                    setTimeout(function () {
                        var anchor = element.find("a");
                        if (anchor.length > 0) {
                            window.isPopupOpenedByUIGridCompatibleElement = true;
                            anchor.trigger('click');
                        }
                    });
                    window.isCellClicked = false;
                }


                /*
                 *  Destroy broadcast listeners on scope destroy
                 */
                scope.$on('$destroy', function () {
                    onPopupClosed();
                    onDatePopupClosed();
                    onPopupOpened();
                    onViewPortKeyDown();
                    element.off('keydown', onElementKeyDown);
                });
            }
        };
    };
})();

(function () {
    'use strict';
    angular.module('SMART2').directive('smartButton', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                callback: "&",
                onClick: "&",
                config: "=",
                backgroundColor: "=",
                fabConfig: "=",
                flat: "=",
                disable: "=",
                callbackParams: "="
            },
            link: function (scope, element, attrs) {
                //check is floating
                scope.isFloating = (attrs.floating) ? scope.$eval(attrs.floating) : false;

                //check is large
                scope.isLarge = (attrs.large) ? scope.$eval(attrs.large) : false;

                //click callback
                var callback = scope.$eval(scope.callback);

                //Local click binding
                scope.clickCallback = function (e) {
                    if (!scope.disable) {
                        if (angular.isFunction(callback)) callback(e, scope.callbackParams);
                        scope.onClick();
                    }
                };

                attrs.$observe('ngClass', function (value) {
                    scope.styleClass = value;
                });
            },
            templateUrl: 'shared/directives/uiElements/smartButton/smartButtonTemplate.html'
        };
    }]);
})();
  /**
   * @memberof SMART2
   * @ngdoc directive
   * @name Checkbox
   * @description This directive is useful for creating a checkbox.
   *
   * @attr {String} label
   *    Label to be displayed for identification of this ui element
   * @attr {Boolean} ng-model
   *    Checkbox's default state (selected or unselected)
   * @attr {Object} ng-model-options
   *    https://docs.angularjs.org/api/ng/directive/ngModelOptions. 
   *    <a href="SMART2.Textfield.html">Click here</a> and scoll down to 'Textfield with ng-model-options' to see example reference.
   * @attr {Boolean} disable
   *    If value of this attribute is set to true, checkbox will not be clickable
   * @attr {Boolean} focus 
   *    If set to true, this ui element will be focused
   * @attr {Boolean} validate
   *    If set to true, this ui element will be validated on the basis of rules passed to it
   * @attr {Array} rules 
   *    Rules to be evaluated when this element's blur event is fired. A rule must have 'rule' and 'errorMessage' properties (keys).
   *    'rule' must be a condition or group of conditions. 'errorMessage' will be the message to be displayed when corresponding rule fails. See example for more.
   * @attr {String} error-message 
   *    Error message to be displayed. This attribute can be set at any point to display an error message.
   * @attr {Boolean} is-mandatory 
   *    If set to true, default error message will be displayed when blur event is fired and this ui element is left blank
   * @attr {Boolean} is-visible 
   *    If set to true, this ui element will be displayed on form regardless of 'is-mandatory' property's value. 
   *    This ui element can be removed from form by clicking 'x' button on top right corner of this ui element.
   * @attr {Number} colspan
   *    Number of columns to be occupied by this ui element. 1 column is equal to 1 ui element.
   *    Default value is 1.
   *    For e.g. If colspan is set to 2, this ui element will occupy width of 2 ui elements (fields).
   * @attr {Function} on-change
   *    Callback function when checkbox state is changed 
   * 
   * @example
   Dynamic:
   Controller:
       $scope.config = {
            "modelData": {
                "isUrgent": true
            }, 
            "formConfig": {
                "sections": [
                    {
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "Urgent",
                                        "type": "checkbox",
                                        "isMandatory": true,
                                        "data": "isUrgent",
                                        "colspan": 1,
                                        "onChange": "onChange"  //  controller function ,
                                        "attributes": {
                                            "fill": true
                                        },
                                        "rules": [
                                            { 
                                                "rule": "this == true", 
                                                "error": "Checkbox should not be selected" 
                                            }
                                        ]
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
   
   * @example
   Static:
   Controller:
       $scope.isUrgent = true;
       $scope.onChange = function(isUrgent) {
           console.log(isUrgent);
       };
   Usage:
       <smart-checkbox label="Urgent" ng-model="isUrgent" on-change="onChange(isUrgent)"></smart-checkbox>
       
   * @example
   Disabled checkbox:
   <smart-checkbox disable="true"></smart-checkbox>     
   */
  

(function() {
    'use strict';
    var checkboxCounter = 0;
    
    angular.module('SMART2').directive('smartCheckbox', ['$timeout', 'ScrollTo', 'RuleEngine', function ($timeout, ScrollTo, RuleEngine) {
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            scope: {
                //ngModel: '=?',
                disable: '@',
                isMandatory: '@',
                isVisible: '=?',
                label: '@',
                minHeight: '@',
                fill: '@',
                rules: '@',
                validate: '=?',
                focus: '=?',
                parentElement: '@',
                errorMessage: '@',
                onChange: '&',
                removable: '@'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                checkboxCounter++;
                scope.checkBoxId = "checkbox-" + checkboxCounter;
                scope.isRemovable = scope.$eval(scope.removable) == undefined ? true : scope.$eval(scope.removable);

                scope.fill = scope.$eval(scope.fill) == undefined ? true : scope.$eval(scope.fill);

                /*
                 *  Following code has been added to make ng-model-options work
                 *  ngModelCtrl.$render & ngModelCtrl.$setViewValue serve the purpose
                 */
                try {
                    ngModelCtrl.$render = function () {
                        scope.ngModel = ngModelCtrl.$modelValue;
                    };
                }
                catch (e) { }

                var updateView = function () {
                    try {
                        ngModelCtrl.$setViewValue(scope.ngModel);
                    }
                    catch (e) { }
                };


                /*
                 * Focus field when focus is set to true
                 */
                var onFocus = scope.$watch('focus', function (newVal) {
                    if (newVal) {
                        ScrollTo.perform(element, angular.element('#' + scope.parentElement));
                        scope.focus = false;
                    }
                });

                /*
                 * Validate field whene validate is set to true
                 */
                var onValidate = scope.$watch('validate', function (newValue) {
                    if (newValue != undefined && newValue) {
                        scope.validateRules();
                    }
                });

                /*
                 * Validate rules
                 */
                scope.validateRules = function () {
                    scope.validate = false;
                    scope.errorMessage = null;

                    if (scope.rules) {
                        var rules = scope.$eval(scope.rules);
                        var isFoundInvalid = false;

                        for (var i = 0; i < rules.length; i++) {
                            if (typeof rules[i] == 'object') {
                                if (eval((rules[i].rule).replace(/this/g, 'scope.ngModel'))) {
                                    scope.validate = true;
                                    scope.errorMessage = rules[i].error;
                                    break;
                                }
                                else {
                                    if (!isFoundInvalid) {
                                        RuleEngine.isValid(rules[i], function (e) {
                                            scope.validate = true;
                                            scope.errorMessage = e.errorData.error;
                                            isFoundInvalid = true;
                                        });
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                };


                scope.ngChange = function () {
                    updateView();
                    scope.validateRules();
                    $timeout(function () {
                        scope.onChange();
                    });
                };


                scope.$on('$destroy', function () {
                    onFocus();
                    onValidate();
                });
            },
            templateUrl: 'shared/directives/uiElements/smartCheckBox/smartCheckBoxTemplate.html'
        };
    }]);
})();

(function () {
    'use strict';

    var startIndex;

    angular.module('SMART2').directive('smartSortable', [function () {
        return {
            restrict: 'A',
            scope: {
                onSort: '&'
            },
            link: function (scope, element, attrs) {
                element.sortable({
                    placeholder: attrs.placeholder ? attrs.placeholder : "drop-hover",
                    helper: attrs.helper ? attrs.helper : "original",
                    handle: ".collapsible-header-drag-icon",
                    cancel: ".disable-sort-item",
                    connectWith: attrs.connectWith ? attrs.connectWith : "",
                    appendTo: attrs.appendTo ? attrs.appendTo : "parent",
                    start: function (event, ui) {
                        startIndex = ui.item.index();
                        if (ui.placeholder) {
                            ui.placeholder.height(ui.item.height()).css("width", ui.item.outerWidth());
                        }
                    },
                    update: function (event, ui) {
                        scope.$apply(function () {
                            scope.onSort({
                                $event: {
                                    startIndex: startIndex,
                                    endIndex: ui.item.index()
                                }
                            });
                        });
                        if (attrs.swipItem == "true") {
                            // swiping element position with each other
                            if (ui.sender) {
                                var el = ui.item.next().length == 1 ? ui.item.next() : ui.item.prev();
                                ui.sender.append(el);
                            }
                        }
                    },
                    sort: function (event, ui) {
                        //console.log({ event, ui })
                        if (attrs.whileSorting == "true") {
                            var ele = $(".slick-list"),
                                scrollpos = ele.scrollLeft(),
                                main_width = ele.outerWidth(),
                                ew = ui.helper.outerWidth(),
                                elft = ui.helper.offset().left - ele.offset().left,
                                rpos = (main_width - (elft + ew));
                            if (elft < 0) { // left
                                $('.slick-prev').click();
                            } else if (rpos < 0) { // right    
                                $('.slick-next').click();
                            }
                        }
                    }
                });
            }
        };
    }]);

    angular.module('SMART2').directive('isDraggable', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('isDraggable', function (isDraggable) {
                    if (isDraggable != undefined) {
                        if (isDraggable == 'true' || isDraggable == true) {
                            element.removeClass('disable-sort-item');
                        }
                        if (isDraggable == 'false' || isDraggable == false) {
                            element.addClass('disable-sort-item');
                        }
                    }
                });
            }
        };
    }]);



    //var droppableParent;

    ///*
    // * Highlight droppables on mouse down
    // */
    //var highlightDroppableElements = function (currentDraggableElement) {
    //    currentDraggableElement.removeAttr('style').addClass('being-dragged z-index-plus');
    //    angular.element('.ui-droppable').addClass('being-dropped-on');
    //};

    ///*
    // * Unhighlight droppables on mouse up
    // */
    //var unhighlightDroppableElements = function (currentDraggableElement) {
    //    currentDraggableElement.removeClass('being-dragged z-index-plus');
    //    angular.element('.ui-droppable').removeClass('being-dropped-on');
    //};

    ///*
    // *  This directive will handle dragging of portlet
    // */
    //angular.module('SMART2').directive('smartDraggable', [function () {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, element, attrs) {
    //            if (attrs.smartDraggable == 'false' || attrs.smartDraggable == false) {
    //                return;
    //            }

    //            attrs.$observe('enabled', function (isEnabled) {
    //                if (isEnabled != undefined) {
    //                    if (isEnabled == 'true' || isEnabled == true) {
    //                        element.draggable('enable');
    //                    }
    //                    if (isEnabled == 'false' || isEnabled == false) {
    //                        element.draggable('disable');
    //                    }
    //                }
    //            });

    //            /*
    //             *  Make portlet dragging enabled
    //             */
    //            element.draggable({
    //                revert: 'invalid',
    //                handle: '.collapsible-header-drag-icon',
    //                revertDuration: 200,
    //                delay: 200,
    //                appendTo: 'body',
    //                containment: 'body',
    //                start: function () {
    //                    droppableParent = $(this).parent();
    //                    $(droppableParent).addClass('being-dragged z-index-plus');
    //                },
    //                drag: function (e) {
    //                    if (e.clientX > window.innerWidth - 10 || e.clientX < 10 || e.clientY > window.innerHeight - 10 || e.clientY < 10) {
    //                        $(document).trigger('mouseup');
    //                    }
    //                },
    //                stop: function () {
    //                    setTimeout(function () {
    //                        $(droppableParent).removeClass('being-dragged z-index-plus');
    //                        // clearTimeout(dragTimeout);
    //                    }, 250);
    //                }
    //            });
    //        }
    //    };
    //}]);


    ///*
    // *  This directive will handle dropping of portlet
    // */
    //angular.module('SMART2').directive('smartDroppable', ['$compile', '$timeout', function ($compile, $timeout) {
    //    return {
    //        restrict: 'A',
    //        link: function (scope, element, attrs) {
    //            if (attrs.smartDroppable == 'false' || attrs.smartDroppable == false) {
    //                return;
    //            }

    //            /*
    //             *  Make portlet dropping enabled
    //             */
    //            element.droppable({
    //                hoverClass: 'drop-hover',
    //                drop: function (event, ui) {
    //                    var draggable = $(ui.draggable[0]),
    //                        draggableOffset = draggable.offset(),
    //                        container = $(event.target),
    //                        containerOffset = container.offset();

    //                    $('.draggable', event.target).appendTo(droppableParent).css({ opacity: 0 }).animate({ opacity: 1 }, 200);
    //                    draggable.appendTo(container).css({ left: draggableOffset.left - containerOffset.left, top: draggableOffset.top - containerOffset.top }).animate({ left: 0, top: 0 }, 200);
    //                }
    //            });
    //        }
    //    };
    //}]);
})();

/**
 * @memberof SMART2
 * @ngdoc directive
 * @name Form-widget
 * @description Form widget directive accepts form-config and model-data. 
 *    ui elements (fields) that are optional are added in right-panel (widget-panel). Optional fields can be added on form by simply clicking that item in right-panel. 
 *    Optional field can also be removed by clicking 'x' icon on the upper right corner of ui element or 'x' icon against that item in right-panel. 
 * 
 * @attr {Array} form-config
 *    Form config is expected to be an array of ui elements (fields)
 * @attr {Object} model-data
 *    Data to be bound on ui elements (fields)
 * @attr {Boolean} is-sequencial
 *    If the value of this attribute is set to true, newly added ui element (field) will be added at the end of the section.
 *    If the value of this attribute is set to false, newly added ui element (field) will be added by the orders it appears in form-config.  
 * @attr {Boolean} show-widget
 *    When form-config is passed to form-widget, right-panel will always be created if this attribute is not set to false.
 * @attr {String} search-holder
 *    Id of DOM element where search bar should appear. This attribute enables form-widget search feature, where user can search for optional sections and fields on the form.
 *    And navigate to optional section or field by clicking on search result item.
 * @attr {Number} widget-panel-top
 *    Top position for widget-panel (right-panel)
 * @attr {Number} widget-panel-right
 *    Right position for widget-panel (right-panel)
 * @attr {Function} on-section-sort
 *    Callback function when sections are sorted or rearranged
 * @attr {Function} on-save
 *    Callback function when sections are need to be save on outside section click
 *
 * @example
 Dynamic:
 Controller:
      $scope.config = {
          modelData: {
              "firstName": "Sushant",
              "lastName": "Ahirrao"
          },    
          formConfig: {
              "sections": [
                  {
                      "isMandatory": true
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "First name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "firstName"
                                  }, {
                                      "label": "Last name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "lastName"
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          },
          "rules": [
              {
                  "rule": "this.firstName == \"Sushant\" && this.lastName != \"Ahirrao\"",
                  "error": "First name and last name combination is not matching"
              }
          ]
      };

  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

 * @example
 Dynamic attribute value. One can set a scope variable or function as attribute value. 
 One can also pass parameters in calling function as is done on callback functions.
 In following example, value of 'isMandatory' field for 'Last Name' can be 'isLastNameMandatory(config.modelData)'.
 'options' attribute does not support function as value.
 Controller:
      $scope.isFirstNameMandatory = true;

      $scope.isLastNameMandatory = function() {
            return true;
      };

      $scope.config = {
          modelData: {
              "firstName": "Sushant",
              "lastName": "Ahirrao"
          },    
          formConfig: {
              "sections": [
                  {
                      "isMandatory": true,
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "First name",
                                      "type": "textfield",
                                      "isMandatory": "isMandatory",
                                      "data": "firstName"
                                  }, {
                                      "label": "Last name",
                                      "type": "textfield",
                                      "isMandatory": "isLastNameMandatory",
                                      "data": "lastName"
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          },
          "rules": [
              {
                  "rule": "this.firstName == \"Sushant\" && this.lastName != \"Ahirrao\"",
                  "error": "First name and last name combination is not matching"
              }
          ]
      };
  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
      
 * @example
 Form widget without widget panel (right panel):
 <smart-form-widget show-widget="false"></smart-form-widget>   
     
 * @example
 If newly added ui elements (fields) to be added at the end of the section:
 <smart-form-widget is-sequencial="true"></smart-form-widget>
 
 * @example
 Widget-panel with top and right position:
 <smart-form-widget widget-panel-top="100" widget-panel-right="70"></smart-form-widget>    
 
 * @example
 Form widget with 'Rule Engine' service:
 Controller:
      $scope.config = {
          modelData: {
              "firstName": "Sushant",
              "lastName": "Ahirrao"
          },    
          formConfig: {
              "sections": [
                  {
                      "isMandatory": true,
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "First name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "firstName"
                                  }, {
                                      "label": "Last name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "lastName"
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          },
          "rules": [
              {
                  "rule": "this.firstName == \"Sushant\" && this.lastName != \"Ahirrao\"",
                  "error": "First name and last name combination is not matching"
              }
          ]
      };

      $scope.validateForm = function() {
          RuleEngine.setRules($scope.config.formConfig.sections, $scope.config.modelData, $scope.config.rules);
          RuleEngine.execute(function (e) {
              console.log(e);   //  Check e for more details
          }, $scope);  
      };
  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
      <button ng-click="validateForm()">Validate Form</button>

* @example
Saving sections on outside section click.
 Dynamic:
 Controller:
      $scope.config = {
          modelData: {
              "firstName": "Sushant",
              "lastName": "Ahirrao"
          },    
          formConfig: {
              "sections": [
                  {
                      "isMandatory": true,
					  "save": true
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "First name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "firstName"
                                  }, {
                                      "label": "Last name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "lastName"
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          },
          "rules": [
              {
                  "rule": "this.firstName == \"Sushant\" && this.lastName != \"Ahirrao\"",
                  "error": "First name and last name combination is not matching"
              }
          ]
      };
	  $scope.onSave = function (data, prevObj) {
	      console.log(data, "In Controller ", prevObj)
		  // Note: data will give scope.modelData Obj and prevObj will give scope.formConfig.sections[..]
		  // use class="savable" in actionable container within the section for avoiding the onSave callback function. 
	  };
  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData" on-save="onSave(data, prevObj)"></smart-form-widget>


 */

(function () {
    'use strict';
    var formWidgetCounter = 0;
    angular.module('SMART2').directive('smartFormWidget', ['APPCONSTANTS', 'ScrollTo', 'formWidgetUtils', '$translate', '$timeout', '$compile', function (APPCONSTANTS, ScrollTo, formWidgetUtils, $translate, $timeout, $compile) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                formConfig: '=?',
                modelData: '=?',
                isSequential: '@',
                showWidget: '@',
                searchHolder: '@',
                widgetPanelTop: '@',
                widgetPanelRight: '@',
                onSectionSort: '&',
                onSave: '&'
            },
            link: function (scope, element, attrs) {
                scope.widgetPanelRightPos = scope.widgetPanelRight ? parseFloat(scope.widgetPanelRight) : 70;
                formWidgetCounter = formWidgetCounter + 1;
                scope.formWidgetId = 'form-widget-' + formWidgetCounter;

                scope.visibleSectionTrackerItemsCount = 0;

                var currentSelectedSection = 0;
                var sectionItemClicked = false;


                /*
                 *  Update visible section tracker items
                 */
                var updateVisibleSectionTrackerItemsCount = function () {
                    var count = 0;
                    for (var i = 0; i < scope.sectionTrackerItems.length; i++) {
                        if (scope.sectionTrackerItems[i].visible && !scope.sectionTrackerItems[i].hidden) {
                            count++;
                        }
                    }
                    scope.visibleSectionTrackerItemsCount = count;
                };


                var onSubHeaderHeight = attrs.$observe('subHeaderHeight', function (value) {
                    if (!isNaN(value)) {
                        ScrollTo.setScrollingTopMargin(parseInt(value));
                    }
                });

                var onFormConfig = scope.$watch('formConfig', function (newConfig, oldConfig) {
                    if (newConfig) {
                        var sectionItems = [];
                        var optionalSections = [];
                        var optionalFieldsAndSections = [];

                        //when formconfing having one section its default open.
                        if (newConfig.sections.length == 1) {
                            //newConfig.sections[0].isActive = true;
                        }

                        for (var i = 0; i < scope.formConfig.sections.length; i++) {
                            scope.formConfig.sections[i].isMandatory = formWidgetUtils.convertAndGetValue(scope.formConfig.sections[i].isMandatory, scope, scope.formConfig.sections[i]);
                            if (angular.isDefined(scope.formConfig.sections[i].isVisible)) {
                                scope.formConfig.sections[i].isVisible = formWidgetUtils.convertAndGetValue(scope.formConfig.sections[i].isVisible, scope, scope.formConfig.sections[i]);
                            }
                            else {
                                scope.formConfig.sections[i].isVisible = scope.formConfig.sections[i].isMandatory;
                            }
                            if (angular.isDefined(scope.formConfig.sections[i].isHidden)) {
                                scope.formConfig.sections[i].isHidden = scope.formConfig.sections[i].isHidden;
                            } else {
                                scope.formConfig.sections[i].isHidden = false;
                            }
                            scope.formConfig.sections[i].key = scope.formWidgetId + '-section-' + i;

                            if (scope.$eval(scope.showWidget) != false) {
                                sectionItems.push({
                                    label: scope.formConfig.sections[i].label,
                                    sectionIndex: i,
                                    visible: scope.formConfig.sections[i].isVisible,
                                    hidden: scope.formConfig.sections[i].isHidden,
                                    isActive: i == currentSelectedSection,
                                    save: scope.formConfig.sections[i].save
                                });
                            }

                            if (!scope.formConfig.sections[i].isMandatory && scope.$eval(scope.showWidget) != false && !scope.formConfig.sections[i].isHidden) {
                                optionalSections.push({
                                    label: scope.formConfig.sections[i].label,
                                    searchLabel: $translate.instant(scope.formConfig.sections[i].label),
                                    sectionIndex: i,
                                    visible: false,
                                    hidden: scope.formConfig.sections[i].isHidden,
                                    isActive: false,
                                    isSection: true,
                                    save: scope.formConfig.sections[i].save
                                });
                            }

                            var sectionOptionalFields = [];

                            for (var j = 0; j < scope.formConfig.sections[i].rows.length; j++) {
                                for (var k = 0; k < scope.formConfig.sections[i].rows[j].properties.length; k++) {
                                    scope.formConfig.sections[i].rows[j].properties[k].isMandatory = formWidgetUtils.convertAndGetValue(scope.formConfig.sections[i].rows[j].properties[k].isMandatory, scope, scope.formConfig.sections[i].rows[j].properties[k]);
                                    if (angular.isDefined(scope.formConfig.sections[i].rows[j].properties[k].isVisible)) {
                                        scope.formConfig.sections[i].rows[j].properties[k].isVisible = formWidgetUtils.convertAndGetValue(scope.formConfig.sections[i].rows[j].properties[k].isVisible, scope, scope.formConfig.sections[i].rows[j].properties[k]);
                                    }
                                    else {
                                        scope.formConfig.sections[i].rows[j].properties[k].isVisible = scope.formConfig.sections[i].rows[j].properties[k].isMandatory;
                                    }
                                    if (angular.isDefined(scope.formConfig.sections[i].rows[j].properties[k].isHidden)) {
                                        scope.formConfig.sections[i].rows[j].properties[k].isHidden = formWidgetUtils.convertAndGetValue(scope.formConfig.sections[i].rows[j].properties[k].isHidden, scope, scope.formConfig.sections[i].rows[j].properties[k]);
                                    }
                                    if (!scope.formConfig.sections[i].rows[j].properties[k].isMandatory && scope.$eval(scope.showWidget) != false && !scope.formConfig.sections[i].rows[j].properties[k].isHidden) {
                                        sectionOptionalFields.push({
                                            sectionKey: scope.formConfig.sections[i].key,
                                            label: scope.formConfig.sections[i].rows[j].properties[k].label,
                                            sectionLabel: scope.formConfig.sections[i].label,
                                            searchLabel: $translate.instant(scope.formConfig.sections[i].label) + ' ' + $translate.instant(scope.formConfig.sections[i].rows[j].properties[k].label),
                                            sectionIndex: i,
                                            rowIndex: j,
                                            propertyIndex: k,
                                            visible: scope.formConfig.sections[i].rows[j].properties[k].isVisible,
                                            isSection: false
                                        });
                                    }
                                }
                            }

                            scope.formConfig.sections[i].optionalFields = sectionOptionalFields;
                            optionalFieldsAndSections = optionalFieldsAndSections.concat(scope.formConfig.sections[i].optionalFields);
                        }

                        scope.sectionTrackerItems = sectionItems;
                        scope.optionalSections = optionalSections;

                        optionalFieldsAndSections = scope.optionalSections.concat(optionalFieldsAndSections);

                        scope.optionalFieldsAndSections = optionalFieldsAndSections;

                        updateVisibleSectionTrackerItemsCount();
                        /*
                         *  If search is enabled
                         */
                        if (angular.element('#' + scope.searchHolder).length > 0) {
                            angular.element('#' +scope.searchHolder).html('<div ng-include="\'shared/directives/uiElements/smartFormWidget/searchTemplate.html\'"></div>');
                            $compile(angular.element('#' +scope.searchHolder).contents()) (scope);
                        }
                        scope.showWidget = scope.sectionTrackerItems.length > 1 || scope.optionalSections.length > 0;
                    }
                }, true);


                if (scope.$eval(scope.showWidget) != false) {
                    var windowHeight = $(window).height();
                    var newSelected = 0;
                    var filterTextTimeout = null;

                    var onDocumentScroll = function () {
                        if (filterTextTimeout) {
                            $timeout.cancel(filterTextTimeout);
                        }

                        filterTextTimeout = $timeout(function () {
                            try {
                                var formWidgetTop = angular.element('#' + scope.formWidgetId).offset().top + 100;
                                if (!sectionItemClicked) {
                                    var scrollTop = $(window).scrollTop();
                                    for (var i = 0; i < scope.sectionTrackerItems.length; i++) {
                                        var $this = element.find('#' + scope.formWidgetId + '-section-' + i);
                                        
                                        // Position of section relative to window
                                        if ($this.children().length > 0) {
                                            var offset = $this.offset().top;
                                            //get index of div in the parent document
                                            if (scrollTop >= (offset - formWidgetTop)) {
                                                newSelected = i;
                                                //break;
                                            }
                                        }
                                    }
                                    if (scrollTop + $(window).height() == $(document).height()) {
                                        newSelected = scope.sectionTrackerItems.length - 1;
                                    }
                                    if (scope.sectionTrackerItems[newSelected].visible) {
                                        scope.sectionTrackerItems[currentSelectedSection].isActive = false;
                                        scope.sectionTrackerItems[newSelected].isActive = true;
                                        currentSelectedSection = newSelected;
                                    }
                                }
                            }
                            catch (e) { }
                        }, 100);
                    };

                    $(document).on('scroll', onDocumentScroll);

                    
                    /*
                     * Section item click handler
                     */
                    scope.onSectionItemClick = function (item, sectionNumber) {
                        //  For loop is needed in this case, because it is difficult to maintain the index of dragged/dropped item.
                        for (var i = 0; i < scope.sectionTrackerItems.length; i++) {
                            scope.sectionTrackerItems[i].isActive = false;
                        }
                        scope.sectionTrackerItems[sectionNumber].isActive = true;
                        currentSelectedSection = sectionNumber;
                        scope.formConfig.sections[item.sectionIndex].isActive = true;
                        sectionItemClicked = true;
                        ScrollTo.perform(element.find('#' + scope.formWidgetId + '-section-' + item.sectionIndex), angular.element('#' + scope.formWidgetId), function (e) {
                            sectionItemClicked = false;
                        });
                    };


                    /*
                     * On optional section item click handler
                     */
                    scope.onOptionalSectionItemClick = function (isLabelClicked, item) {
                        if (isLabelClicked && item.isVisible) {
                            return;
                        }

                        scope.formConfig.sections[item.sectionIndex].isVisible = !scope.formConfig.sections[item.sectionIndex].isVisible;

                        //  Toggle section tracker item visibility
                        for (var i = 0; i < scope.sectionTrackerItems.length; i++) {
                            if (scope.sectionTrackerItems[i].label === item.label) {
                                scope.sectionTrackerItems[i].visible = !item.visible;
                                break;
                            }
                        }

                        /*
                         *  scope.isSequential is set to 'true', form-widget-section would be added 
                         *  where it is positioned in the JSON structure else 
                         *  form-widget-section would be added at the end of row
                         */
                        if (!scope.$eval(scope.isSequential) && scope.formConfig.sections[item.sectionIndex].isVisible) {
                            //  Re-arrange sections order
                            var tmpSection = scope.formConfig.sections[item.sectionIndex];
                            scope.formConfig.sections.splice(item.sectionIndex, 1);
                            scope.formConfig.sections.push(tmpSection);

                            //  Re-arrange sections tracker items order
                            for (var i = 0; i < scope.sectionTrackerItems.length; i++) {
                                if (scope.sectionTrackerItems[i].label === item.label) {
                                    var tmpSection = scope.sectionTrackerItems[i];
                                    scope.sectionTrackerItems.splice(i, 1);
                                    scope.sectionTrackerItems.push(tmpSection);
                                    break;
                                }
                            }

                            //  Re-arrange sections tracker items section index
                            for (var i = 0; i < scope.formConfig.sections.length; i++) {
                                for (var j = 0; j < scope.sectionTrackerItems.length; j++) {
                                    if (scope.formConfig.sections[i].label == scope.sectionTrackerItems[j].label) {
                                        scope.sectionTrackerItems[j].sectionIndex = i;
                                    }
                                }
                            }

                            //  Re-arrange sections optional fields section index
                            for (var i = 0; i < scope.formConfig.sections.length; i++) {
                                for (var j = 0; j < scope.optionalSections.length; j++) {
                                    if (scope.formConfig.sections[i].label == scope.optionalSections[j].label) {
                                        scope.optionalSections[j].sectionIndex = i;
                                    }
                                }
                            }
                        }
                        item.visible = !item.visible;
                        setTimeout(function () {
                            if (item.visible) {
                                ScrollTo.perform(element.find('#' + scope.formWidgetId + '-section-' + item.sectionIndex), angular.element('#' + scope.formWidgetId));
                            }
                        }, 200);

                        updateVisibleSectionTrackerItemsCount();
                    };


                    scope.onOptionalFieldClick = function (isLabelClicked, item) {
                        if (!item.visible) {
                            ScrollTo.perform(element.find('#' +scope.formWidgetId + '-section-' + item.sectionIndex), angular.element('#' +scope.formWidgetId));
                        }
                        scope.$broadcast('optionalFieldClick', { isLabelClicked: isLabelClicked, item: item });
                    };


                    /*
                     * Widget panel
                     */
                    scope.showWidgetPanel = false;

                    scope.toggleWidgetPanel = function () {
                        scope.showWidgetPanel = !scope.showWidgetPanel;
                    };


                    /*
                     *  Callback function when section order gets changed
                     */
                    scope.onSort = function (e) {
                        var tmpSectionItems = angular.copy(scope.sectionTrackerItems);
                        var item = tmpSectionItems.splice(e.startIndex, 1);
                        tmpSectionItems.splice(e.endIndex, 0, item[0]);
                        scope.sectionTrackerItems = angular.copy(tmpSectionItems);
                        tmpSectionItems = null;
                        var formConfigAfterSort = [];
                        for (var i = 0; i < scope.sectionTrackerItems.length; i++) {
                            formConfigAfterSort.push(scope.formConfig.sections[scope.sectionTrackerItems[i].sectionIndex]);
                        }
                        scope.onSectionSort({
                            $event: { formConfig: formConfigAfterSort }
                        });
                    };


                    /*
                     *  Make section active in section tracker
                     */
                    var previousClickedSection = [];
                    scope.onSectionClick = function (section) {
                    	if (attrs.onSave) {
                    		if (section.hasOwnProperty('save') && section != previousClickedSection[(previousClickedSection.length - 1)]) {
                    			previousClickedSection.push(section);
                    		}

                    		if (previousClickedSection.length > 2) {
                    			previousClickedSection.shift();
                    		}
                    	}
                        for (var i = 0; i < scope.sectionTrackerItems.length; i++) {
                            if (scope.sectionTrackerItems[i].label === section.label) {
                                scope.sectionTrackerItems[currentSelectedSection].isActive = false;
                                scope.sectionTrackerItems[i].isActive = true;
                                currentSelectedSection = i;
                                break;
                            }
                        }
                    };

					// Auto Save Callback
                    if (attrs.onSave) {
                    	var onDocumentClick = function (e) {
                    		if (!previousClickedSection.length) return;

                    		if ((!$(e.target).closest('#' + previousClickedSection[0].key).length) || ($(e.target).closest('#' + previousClickedSection[0].key).length && $(e.target).closest('.savable').length)) {
                    			scope.onSave({ data: scope.modelData, prevObj: previousClickedSection[0] });
                    			previousClickedSection.shift();
                    		}
                    	}
                    	$(document).on('click', onDocumentClick);
                    }

                    /*
                     *  Remove all listeners on scope destroy
                     */
                    scope.$on('$destroy', function () {
                    	$(document).off('scroll', onDocumentScroll);
                    	$(document).off('click', onDocumentClick);
                        onSubHeaderHeight();
                        onFormConfig();
                    });


                    scope.iconClasses = APPCONSTANTS.formWidgetItemClasses;
                }
            },
            templateUrl: 'shared/directives/uiElements/smartFormWidget/smartFormWidgetTemplate.html'
        };
    }]);


    angular.module('SMART2').directive('smartSvgIcon', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.html('<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#' + attrs.smartSvgIcon + '"></use></svg>');
            }
        };
    }]);


    /*
     *  Text highlighting filter
     */
    angular.module('SMART2').filter('highlight', ['$sce', function ($sce) {
        return function (text, phrase) {
            if (phrase) {
                text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span style="background: yellow">$1</span>');
            }
            return $sce.trustAsHtml(text);
        }
    }]);
})();

(function () {
	'use strict';
	angular.module('SMART2').directive('smartDropdown', ['$window', function ($window) {
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {
				config: "@",
				show: "@",
				onHide: "&"
			},
			link: function (scope, element, attrs) {
				//initialization
				setTimeout(function () {
					var element = angular.element(".dropdown-button");
					$(element).dropdown(angular.extend(typeof scope.$eval(attrs.config) == "object" ? scope.$eval(attrs.config) : {}, {
						onHide: scope.onHide
					}));
					if (angular.element(".dd-close-off").length > 0) {
						angular.element(".dd-close-off").click(function (e) {
							e.stopPropagation();
						});
					}
				});

				if (scope.$eval(attrs.fixed)) {
					$(element).find('.dropdown-content').addClass('fixeddd');
					$(element).find('.dropdown-button').bind('click', function (e) {
						(function ($t) {
							setTimeout(function () {
								var ddCnt = $t.next('.dropdown-content');
								ddCnt.css({ 'left': e.clientX - e.offsetX - 2 + 'px', 'top': e.clientY - e.offsetY - 2 + 'px' });
								ddCnt.attr('style', function (i, s) { return s + 'display: block !important;' });
								var lastScrollPosition = e.clientY - e.offsetY - 2,
									newScrollPosition = e.clientY - e.offsetY - 2;

								var ddHgt = ddCnt.css('height'),
                                    winHgt = angular.element(window).height();
								if ((parseInt(ddHgt) + e.clientY) > winHgt) {
									var diffHgt = (parseInt(ddHgt) + e.clientY) - winHgt;
									ddCnt.css('top', (e.clientY - e.offsetY - diffHgt - 15) + 'px');
									lastScrollPosition = (e.clientY - e.offsetY - diffHgt - 15),
									newScrollPosition = (e.clientY - e.offsetY - diffHgt - 15);
								}

								angular.element($window).on("scroll.smartFixedSmartDrop", function () {
									newScrollPosition = this.pageYOffset;
									if (newScrollPosition !== lastScrollPosition) {
										if (ddCnt.hasClass('active')) {
											scope.hideDropDown(ddCnt);
										}
									}
									lastScrollPosition = newScrollPosition;
								});
							});
						})($(this));
					});

				} else {

				    // Animation from bottom to top
				    $(element).find('.dropdown-button').bind('click', function (e) {
				        $(this).next('.dropdown-content').addClass('ddautoHeight');
				        (function ($t) {
				            setTimeout(function () {
				                var ddCnt = $t.next('.dropdown-content');
				                var ddCntTop = ddCnt.css('top')
				                if (parseInt(ddCntTop, 10) < 0) {
				                    ddCnt.css('top', 0);
				                    ddCnt.animate({ top: ddCntTop });
				                    console.log(ddCnt.css('top'), "top");
				                }
				            });
				        })($(this));
				    });
				}


				var onShow = attrs.$observe('show', function (value) {
					if (angular.isDefined(value)) {
						if (!scope.$eval(value)) {
							var dropdown = element.find('.dropdown-content');
							scope.hideDropDown(dropdown);
						}
					}
				});


				scope.hideDropDown = function (dropdown) {
					if (dropdown.length > 0) {
						dropdown.fadeOut(250);
						dropdown.removeClass('active');
						dropdown.css('max-height', '');
						angular.element("[data-activates='" + dropdown.attr('id') + "']").removeClass('active');
						angular.isFunction(scope.onHide) && scope.onHide();
					}
				}


				scope.$on('$destroy', function () {
					onShow();
					angular.element($window).off("scroll.smartFixedSmartDrop");
				});
			},
			templateUrl: 'shared/directives/uiElements/smartDropdown/smartDropdownTemplate.html'
		};
	}]);


	angular.module('SMART2').directive('actionCloseDropdown', [function () {
		return {
			restrict: 'C',
			scope: true,
			link: function (scope, element, attrs) {
				var traverseAndFireHideDropDown = function (scopeRef, dropdown) {
					for (var key in scopeRef) {
						if (key == 'hideDropDown') {
							scopeRef.hideDropDown(dropdown);
							return;
						}
					}
					traverseAndFireHideDropDown(scopeRef.$parent, dropdown);
				};

				element.bind('click', function () {
					var dropdown = element.closest('.dropdown-content');
					traverseAndFireHideDropDown(scope.$parent, dropdown);
				});
			}
		};
	}]);
})();
(function () {
    'use strict';
    angular.module('SMART2').directive('smartGrid', ['$filter', function ($filter) {
        return {
            restrict: 'AE',
            scope: {
                gridConfig: '=config'
            },
            controller: function ($scope) {
                /*
                 * Current formatter
                 */
                $scope.currencyFormatter = function (amountarg, symbol, zeroprecision, defaultCurrency) {
                    var amount = amountarg;
                    if (zeroprecision)
                        amount = Number(amountarg).toFixed(0);

                    var formattedAmount;
                    if (amount >= 1000000 || amount <= -1000000) {
                        shortamount = amount / 1000000;
                        formattedAmount = $scope.currencyFormatter(shortamount, symbol, false, defaultCurrency);
                        //if (zeroprecision)
                        //formattedAmount = formattedAmount.substring(0, formattedAmount.length - 3);
                        formattedAmount = formattedAmount + " MM";
                    }
                    else {
                        formattedAmount = $filter('currency')(amount);
                        if (defaultCurrency != undefined) symbol = defaultCurrency;
                        if (amount < 0) {
                            if (symbol !== undefined)
                                formattedAmount = $filter('currency')(amount, symbol).replace("(", "-").replace(")", "");
                            else
                                formattedAmount = $filter('currency')(amount).replace("(", "-").replace(")", "");
                        }
                        else if (symbol !== undefined) {
                            formattedAmount = $filter('currency')(amount, symbol);
                        }
                        if (zeroprecision) {
                            if (parseInt(formattedAmount.substring(formattedAmount.length - 2, formattedAmount.length)) == 0) {
                                formattedAmount = formattedAmount.substring(0, formattedAmount.length - 3);
                            }
                        }
                    }
                    return formattedAmount.toString();
                };

                /*
                 * Number formatter
                 */
                $scope.numberFormatter = function (amountarg, zeroprecision) {
                    var formattedAmount = amountarg;
                    if (zeroprecision)
                        formattedAmount = Number(amountarg).toFixed(0);
                    if (formattedAmount >= 1000000 || formattedAmount <= -1000000) {
                        var shortamount = formattedAmount / 1000000;
                        if (zeroprecision) {
                            formattedAmount = Number(shortamount).toFixed(0);
                        } else {
                            formattedAmount = shortamount;
                        }
                        return $filter('number')(formattedAmount) + " MM";
                    }
                    else {
                        return $filter('number')(formattedAmount);
                    }
                };
            },
            link: function (scope, element, attr) {
                var headerTemplate, rowTemplate, headerData, rowData, cellTemplate, cellRenderer, headerCellRenderer, onClick, rowHeight, cellStyle;

                scope.$watch('gridConfig', function (n, o) {
                    if (n) {
                        scope.config = scope.gridConfig;

                        if (scope.config && scope.config.headerTemplate) {
                            headerTemplate = scope.config.headerTemplate;
                        }

                        if (scope.config && scope.config.rowTemplate) {
                            rowTemplate = scope.config.rowTemplate;
                        }

                        if (scope.config && scope.config.headerData) {
                            headerData = scope.config.headerData;
                        }

                        if (scope.config && scope.config.rowData) {
                            rowData = scope.config.rowData;
                        }

                        if (scope.config && scope.config.dimension && scope.config.dimension.height) {
                            scope.gridHeight = scope.config.dimension.height;
                        }
                        else {
                            scope.gridHeight = element.parent().outerHeight(true);
                        }

                        scope.gridHeight = scope.gridHeight - 1; // 1 is the border

                        if (scope.config && scope.config.cellRenderer) {
                            cellRenderer = scope.config.cellRenderer;
                        }

                        if (scope.config && scope.config.headerCellRenderer) {
                            headerCellRenderer = scope.config.headerCellRenderer;
                        }

                        if (scope.config && scope.config.onClick) {
                            onClick = scope.config.onClick;
                        }

                        if (scope.config && scope.config.cellTemplate) {
                            cellTemplate = scope.config.cellTemplate;
                        }

                        if (scope.config && scope.config.rowHeight) {
                            rowHeight = scope.config.rowHeight;
                        }
                        else {
                            rowHeight = 40;
                        }

                        if (scope.config && scope.config.cellStyle) {
                            cellStyle = scope.config.cellStyle;
                        }

                        var columnDefs = [];
                        var cellWidth = element.parent().outerWidth() / headerData.length;

                        for (var i = 0; i < headerData.length; i++) {
                            columnDefs.push({
                                displayName: headerData[i].title,
                                field: headerData[i].datamappingkey,
                                suppressSorting: headerData[i].sortable ? false : true,
                                formatterType: headerData[i].formatterType,
                                clickable: headerData[i].clickable ? true : false,
                                align: headerData[i].align,
                                width: headerData[i].width != undefined ? headerData[i].width : cellWidth,
                                cellStyle: headerData[i].cellStyle != undefined ? headerData[i].cellStyle : undefined
                            });

                            //  Set default currency if the formatter type is currency
                            if (headerData[i].formatterType == 'currency') {
                                columnDefs[columnDefs.length - 1].defaultCurrency = headerData[i].defaultCurrency;
                            }

                            if (cellTemplate != undefined) {
                                columnDefs[columnDefs.length - 1].template = cellTemplate;
                            }
                            else {
                                columnDefs[columnDefs.length - 1].cellRenderer = cellRenderer ? cellRenderer : function (e) {
                                    var columnValue, titleValue;
                                    switch (e.colDef.formatterType) {
                                        case 'link':
                                            columnValue = titleValue = '<a>' + e.value + '</a>';
                                            break;

                                        case 'number':
                                            if (e.colDef.clickable) {
                                                columnValue = titleValue = '<a>' + e.value + '</a>';
                                            }
                                            break;

                                        case 'currency':
                                            columnValue = titleValue = scope.currencyFormatter(e.value, undefined, true, e.colDef.defaultCurrency);
                                            if (e.colDef.clickable) {
                                                columnValue = '<a>' + columnValue + '</a>';
                                            }
                                            break;

                                        default:
                                            columnValue = e.value === 0 || e.value === '0' ? '0' : (e.value == 'null' || e.value == null || e.value == '' ? '<span style="color: transparent;">-</span>' : e.value);
                                            titleValue = e.value;
                                            if (e.colDef.clickable) {
                                                columnValue = '<a>' + columnValue + '</a>';
                                            }
                                            break;
                                    }
                                    if (e.value == 'null' || e.value == null || e.value == '') {
                                        return '<span style="width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; float: ' + e.colDef.align + '; text-align: ' + e.colDef.align + ';">' + columnValue + '</span>';
                                    }
                                    else {
                                        return '<span style="width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; float: ' + e.colDef.align + '; text-align: ' + e.colDef.align + ';" title="' + titleValue + '">' + columnValue + '</span>';
                                    }
                                    //'<a style="white-space: normal;">' + columnValue + '</a>' - To avoid text ellipsis
                                };
                            }
                        }

                        var tmpRowData = [];
                        for (var i = 0; i < rowData.length; i++) {
                            tmpRowData[i] = {};
                            for (var j = 0; j < columnDefs.length; j++) {
                                tmpRowData[i][columnDefs[j].field] = rowData[i][columnDefs[j].field]; // rowData[i][columnDefs[j].field] == 'null' || rowData[i][columnDefs[j].field] == null  || rowData[i][columnDefs[j].field] == '' ? '<span style="color: transparent;">-</span>' : rowData[i][columnDefs[j].field];
                            }
                        }

                        if (scope.angularGridConfig) {
                            scope.angularGridConfig.columnDefs = columnDefs;
                            scope.angularGridConfig.rowData = tmpRowData;
                            scope.angularGridConfig.api.onNewRows();
                        }
                        else {
                            scope.angularGridConfig = {
                                columnDefs: columnDefs,
                                rowData: tmpRowData,
                                enableSorting: true,
                                angularCompileRows: true,
                                virtualPaging: true,
                                enableColResize: true,
                                angularCompileHeaders: scope.config && scope.config.angularCompileHeaders,
                                headerCellRenderer: headerCellRenderer ? headerCellRenderer : function (e) {
                                    return '<span style="width: 80%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; float: ' + e.colDef.align + '; text-align: ' + e.colDef.align + ';">' + e.colDef.displayName + '</span>';
                                },
                                cellClicked: onClick ? function (e) {
                                    onClick({ dataMappingKey: e.colDef.field, value: e.value, rowIndex: e.rowIndex, rowData: rowData[e.rowIndex], clickable: e.colDef.clickable });
                                } : undefined,
                                rowHeight: rowHeight == undefined ? undefined : rowHeight
                            };
                        }
                    }
                });
            },
            templateUrl: 'shared/directives/uiElements/smartGrid/smartGrid.html'
        };
    }]);
})();
/*
 * Inject required CSS
 */
//var angularGridCSS = document.createElement("link");
//angularGridCSS.setAttribute("rel", "stylesheet");
//angularGridCSS.setAttribute("type", "text/css");
//angularGridCSS.setAttribute("href", $('#blobURL').val()+'shared/libraries/angularGrid/angularGrid.css');
//document.getElementsByTagName("head")[0].appendChild(angularGridCSS);

//var angularGridThemeCSS = document.createElement("link");
//angularGridThemeCSS.setAttribute("rel", "stylesheet");
//angularGridThemeCSS.setAttribute("type", "text/css");
//angularGridThemeCSS.setAttribute("href", $('#blobURL').val()+'shared/libraries/angularGrid/theme-fresh.css');
//document.getElementsByTagName("head")[0].appendChild(angularGridThemeCSS);

(function () {
    'use strict';
    angular.module('SMART2').directive('smartList', ['$parse', '$window', 'commonUtilities', function ($parse, $window, commonUtilities) {
        return {
            restrict: 'AE',
            replace: false,
            scope: true,
            link: function (scope, element, attrs) {
                scope.styleClass = 'collection';
                scope.itemClass = 'collection-item';
                // evaluating callback for list
                var clickCallback = $parse(attrs.clickCallback);

                attrs.$observe('selectiveDisplayConfig', function (displayConfig) {
                    if (displayConfig) {
                        scope.listDisplayConfig = scope.$eval(displayConfig);
                    } else {
                        scope.listDisplayConfig = { "showIcon": true, "showAction": false, "importantAttribLimit": 5 };
                    }

                });

                //Loacal list Click handler
                scope.listClickHandler = function (item) {
                    if (angular.isFunction(clickCallback)) {
                        clickCallback(scope, { e: item });
                    }
                };

                attrs.$observe("height", function (value) {
                    if (value) {
                        scope.listHeight = value;
                    }
                });

                attrs.$observe('model', function (value) {
                    if (value) {
                        scope.dataModel = scope.$eval(value);
                    }
                });


                attrs.$observe('styleClass', function (value) {
                    scope.styleClass = value;
                });

                attrs.$observe('itemClass', function (value) {
                    scope.itemClass = value;
                });

                attrs.$observe('template', function (value) {
                    scope.template = value;
                });
                var lazyLoadingCallback = $parse(attrs.lazyLoadCallback);
                var backToTopCallback = $parse(attrs.backToTopCallback);
                var scrolledCallback = $parse(attrs.scrollInProgress);

                scope.scrollEndCallback = function () {
                    if (angular.isFunction(lazyLoadingCallback)) {
                        lazyLoadingCallback(scope, { e: '' });
                    };
                };

                scope.scrollToTopCallback = function () {
                    if (angular.isFunction(backToTopCallback)) {
                        backToTopCallback(scope, { e: '' });
                    };
                };

                scope.scrollInProgress = function () {
                    if (angular.isFunction(scrolledCallback)) {
                        scrolledCallback(scope, { e: '' });
                    };
                };

                scope.actionElementID = commonUtilities.uniqueIDGenerator;

            },
            templateUrl: 'shared/directives/uiElements/smartList/smartListTemplate.html'
        };
    }]);
})();
(function () {
    'use strict';
    angular.module('SMART2').directive('smartListLookup', ['$rootScope', '$timeout', 'ScrollTo', 'lookup', function ($rootScope, $timeout, ScrollTo, lookup) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                label: '@',
                ngModel: '=?',
                options: '=?',
                isMandatory: '@',
                isVisible: '=?',
                rules: '@',
                validate: '=?',
                focus: '=?',
                callAddNew: '&',
                lookupOpen: '&',
                lookupHide: '&',
                readonly: '@',
                displayformat: '@',
                multiselect: '@',
                addnew: '@',
                titleofmodel: '@',
                selecttypeoption: '='
            },
            link: function (scope, element, attrs) {
                scope.ngModel = (scope.ngModel == undefined || scope.ngModel == null) ? '' : scope.ngModel;
                var multiselect = (scope.multiselect == undefined || scope.multiselect == null) ? false : scope.multiselect=="true"?true:false;
                var addnew = (scope.addnew == undefined || scope.addnew == null) ? false : scope.addnew == "true" ? true : false;
                var readonly = (scope.readonly == undefined || scope.readonly == null) ? false : scope.readonly == "true" ? true : false;
                var formatedArray = eval(scope.displayformat);
                scope.valuetoshow = "";
                scope.titleofmodel = (scope.titleofmodel == undefined || scope.titleofmodel == null) ? 'Title Of Model' : scope.titleofmodel;

                function generateName(obj) {
                	var label = "";
                	for (var j = 0; j < formatedArray.length; j++) {
                		if (obj.hasOwnProperty(formatedArray[j])) {
                			label = label + " " + obj[formatedArray[j]];
                		}
                	}
                	return label;
                }

                scope.$watch("ngModel", function (newVal) {
                    scope.valuetoshow = "";
                    if (multiselect) {
                    	if (angular.isDefined(newVal)) {
                    		if (newVal.length > 0) {
                    			scope.valuetoshow = generateName(newVal[0]);
                    			var totalEl = newVal.length;
                    			if (totalEl > 1) {
                    				scope.valuetoshow += " + " + (totalEl - 1) + " More";
                    			}
                    		}
                    	}
                    } else {
                    	scope.valuetoshow = generateName(newVal);
                    }
                    if (scope.valuetoshow == "") {
                        scope.isActive = false;
                    }else{
                        scope.isActive = true;
                    }
                });

                scope.openLookup = function () {
                    if ($.isFunction(scope.lookupOpen)) {
                        scope.lookupOpen();
                    }
                    var lookupConfig = {
                        modelData: scope.ngModel,
                        config: {
                            mutliselect: multiselect,
                            displayProperties: formatedArray,
                            options: scope.options,
                            addnew: addnew,
                            titleOfModel: scope.titleofmodel,
                            selectTypeOption: scope.selecttypeoption,
                            readonly: readonly
                        }
                    }
                    $timeout(function () {
                        lookup.open(lookupConfig, function (response) {
                            console.log(response);
                            if (response.addnew) {
                                if ($.isFunction(scope.callAddNew)) {
                                    scope.callAddNew();
                                }
                            }
                            scope.ngModel = response.result;
                            scope.defaultselectiontext = response.defaultSelectionText;
                            scope.selecttypeoption = response.selectTypeOption;
                            if ($.isFunction(scope.lookupHide)) {
                                scope.lookupHide();
                            }
                        });
                    });
                }

                scope.ngModel = (scope.ngModel == undefined || scope.ngModel == null) ? '' : scope.ngModel;
            },
            templateUrl: 'shared/directives/uiElements/smartListLookup/smartListLookupTemplate.html'
        };
    }]);
})();
(function () {
    'use strict';
    angular.module('SMART2').factory('httpLoaderInterceptor', ['$rootScope', function ($rootScope) {
        // Active request count
        var requestCount = 0;

        function startRequest(config) {
            // If no request ongoing, then broadcast start event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderStart');
            }

            requestCount++;
            return config;
        }

        function endRequest(arg) {
            // No request ongoing, so make sure we don’t go to negative count
            if (!requestCount)
                return;

            requestCount--;
            // If it was last ongoing request, broadcast event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderEnd');
            }

            return arg;
        }

        /* ROOTSCOPE EXPOSED BROADCAST TRIGGERS FOR LOADER */
        $rootScope.showCentralLoader = function () {
            $rootScope.$broadcast('httpLoaderStart');
        };

        $rootScope.hideCentralLoader = function () {
            $rootScope.$broadcast('httpLoaderEnd');
        };
        /* END FOR -- ROOTSCOPE EXPOSED BROADCAST TRIGGERS FOR LOADER */

        // Return interceptor configuration object
        return {
            'request': startRequest,
            'requestError': endRequest,
            'response': endRequest,
            'responseError': endRequest
        };
    }]);

    angular.module('SMART2').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpLoaderInterceptor');
    }]);

    angular.module('SMART2').directive('httpLoader', function () {
        return {
            restrict: 'EA',
            templateUrl: 'shared/directives/uiElements/smartLoader/smartLoaderTemplate.html',
            link: function (scope, element) {
                // Store original display mode of element
                var shownType = element.css('display');
                function hideElement() {
                    element.css('display', 'none');
                }

                scope.$on('httpLoaderStart', function () {
                    element.css('display', shownType);
                });

                scope.$on('httpLoaderEnd', hideElement);

                // Initially hidden
                hideElement();
            }
        };
    });

    angular.module('SMART2').directive('routeLoader', function () {
        return {
            restrict: 'EA',
            templateUrl: 'shared/directives/uiElements/smartLoader/smartLoaderTemplate.html',
            link: function (scope, element) {
                // Store original display mode of element
                var shownType = element.css('display');
                function hideElement() {
                    element.css('display', 'none');
                }

                scope.$on('$routeChangeStart', function () {
                    element.css('display', shownType);
                });
                scope.$on('$routeChangeSuccess', hideElement);
                scope.$on('$routeChangeError', hideElement);
                // Initially element is hidden
                hideElement();
            }
        }
    });
})();
(function () {
    'use strict';
    angular.module('SMART2').factory('lookup', ['$rootScope', function ($rootScope) {
        var Obj = {};
        Obj.onCallback = undefined;

        Obj.on = function (callback) {
            Obj.onCallback = callback;
        };

        Obj.open = function (config, callback) {
            this.config = config;
            this.broadcastItem();
            this.resultCallBack = function (result) {
                callback(result);
            };
        };
        Obj.broadcastItem = function () {
            angular.isFunction(Obj.onCallback) && Obj.onCallback();
        };
        return Obj;
    }]);

    var countForTheProprty = 0;
    angular.module('SMART2').directive('smartLookup', ['$rootScope', '$timeout', 'ScrollTo', 'lookup', function ($rootScope, $timeout, ScrollTo, lookup) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                label: '@'
            },
            link: function (scope, element, attrs) {
            	function isObjectEquals(obj1, obj2) {
            		if (obj2 == '' || obj2 == null || obj2 == '{}') {
            			return false;
            		}
                    for (var i in obj2) {
                        if (obj2.hasOwnProperty(i)) {
                            if (!obj1.hasOwnProperty(i)) return false;
                            if (obj2[i] != obj1[i]) return false;
                        }
                    }
                    return true;
                }
                function containsObject(obj, list) {
                     for (var i = 0; i < list.length; i++) {
                         if (isObjectEquals(obj,list[i])) {
                            return true;
                        }
                    }
                    return false;
                }

                scope.searchText = "";
                scope.selectdCount = 0;
                scope.model = [];
                scope.options = [];
                scope.displayProperties = ["name"];
                scope.propKey = "";
                countForTheProprty++;
                function generateName(obj) {
                    var label = "";
                    for (var j = 0; j < scope.displayProperties.length; j++) {
                        label = label + " " + obj[scope.displayProperties[j]];
                    }
                    return label;
                }
                var stopInit = false
                function initialize() {
                    //migrate two array with flag
                    scope.propKey = "counterProp" + countForTheProprty;
                    if (scope.options == undefined) {
                        scope.options = [];
                    }
                    if (scope.multiple) {
                        for (var i = 0; i < scope.options.length; i++) {
                            if (!scope.options[i].hasOwnProperty("ischecked") && !stopInit) {
                                if (containsObject(scope.options[i], scope.model)) {
                                    scope.options[i].ischecked = true;
                                    scope.options[i][scope.propKey] = generateName(scope.options[i]);
                                } else {
                                    scope.options[i].ischecked = false;
                                    scope.options[i][scope.propKey] = generateName(scope.options[i]);
                                }
                            }                           
                        }
                    } else {
                        for (var i = 0; i < scope.options.length; i++) {
                            if (!stopInit) {
                                if (isObjectEquals(scope.options[i], scope.model)) {
                                    scope.options[i].ischecked = true;
                                    scope.options[i][scope.propKey] = generateName(scope.options[i]);
                                } else {
                                    scope.options[i].ischecked = false;
                                    scope.options[i][scope.propKey] = generateName(scope.options[i]);
                                }
                            }
                        }
                    }
                }
                scope.triggerFlag = false;
                var returnObj = {};
                lookup.on(function () {
                    scope.config = lookup.config.config;
                    scope.isSearchOpen = false;
                    scope.multiple = false;
                    scope.addnew = false;
                    scope.readonly = false;
                    scope.multiple = typeof (scope.config.mutliselect) == "undefined" ? false : scope.config.mutliselect;
                    scope.addnew = typeof (scope.config.addnew) == "undefined" ? false : scope.config.addnew;
                    scope.readonly = typeof (scope.config.readonly) == "undefined" ? false : scope.config.readonly;
                    scope.titleOfModel = typeof (scope.config.titleOfModel) === "undefined" ? "TITLE OF MODEL" : scope.config.titleOfModel;
                	/*  Default Selection scope variable */
                    scope.config.defaultSelectOption = typeof (scope.config.defaultSelectOption) === "undefined" ? false : scope.config.defaultSelectOption;
                    scope.config.defaultSelectionText = typeof (scope.config.defaultSelectionText) === "undefined" ? "" : scope.config.defaultSelectionText;
                    scope.config.selectTypeOption = typeof (scope.config.selectTypeOption) === "undefined" ? null : scope.config.selectTypeOption;
                    scope.selectiontext = angular.copy(scope.config.selectTypeOption);

                    scope.model = lookup.config.modelData;
                    if (angular.isDefined(scope.model) && scope.model != null) {
                        scope.selectdCount = scope.model.length;
                    } else {
                        scope.selectdCount = 0;
                    }
                    scope.options = scope.config.options;
                    scope.displayProperties = scope.config.displayProperties.length > 0 ? scope.config.displayProperties : scope.displayProperties;
                    initialize();
                    scope.triggerFlag = true;
                    $timeout(function () {
                        scope.isSearchOpen = true;
                    }, 1000);
                    scope.$watch(function () {
                        return lookup.config.config.options;
                    },
                    function (newVal, oldVal) {
                        initialize();
                    }, true);
                    returnObj.addnew = false;
                    returnObj.result = scope.model;
                    returnObj.defaultSelectionText = scope.config.defaultSelectionText.trim(),
                    returnObj.selectTypeOption = scope.config.selectTypeOption;
                });

                scope.searchToggle = function () {
                    scope.isSearchOpen = !scope.isSearchOpen;
                };
                scope.closeSearch = function () {
                    if (scope.searchText != "") {
                        scope.searchText = "";
                    } else {
                        scope.isSearchOpen = false;
                    }
                };

            	/*  triggers which default radio btn click */
                scope.ondefaultSelectItem = function (obj) {
                	obj.ischecked = true;
                	scope.onChangeItem(obj)
                };

                scope.onChangeItem = function (obj) {
                    if (scope.multiple) {
                        if (obj.ischecked) {
                            scope.selectdCount++;
                        } else {
                            scope.selectdCount--;
                        }
                    } else {
                        scope.model = obj;
                        initialize();
                    }
                };
                
                function cleanData() {
                    stopInit = true;
                    for (var i = 0; i < scope.options.length; i++) {
                        delete scope.options[i].ischecked;
                        delete scope.options[i][scope.propKey];
                    }
                    $timeout(function () {
                        stopInit = false;
                    }, 500);
                }
                scope.selectionDone = function () {
                    if (scope.multiple) {
                        var result = [];
                        stopInit = true;
                        for (var i = 0; i < scope.options.length; i++) {
                            delete scope.options[i][scope.propKey];
                            if (scope.options[i].ischecked) {
                            	delete scope.options[i].ischecked;

                            	/*  Default Selection check point */
                                if (scope.config.defaultSelectionText.trim() === scope.options[i].name) {
                                	result.unshift(scope.options[i]);
                                } else {
                                	result.push(scope.options[i]);
                                }
                            }
                        }
                        cleanData();
                        $timeout(function () {
                            stopInit = false;
                        }, 500);
                    }
                    else {
                        stopInit = true;
                        delete scope.model.ischecked;
                        delete scope.model[scope.propKey];
                        result = scope.model;
                        if (scope.config.selectTypeOption != null) {
                            scope.config.selectTypeOption.selectiontext = scope.selectiontext.selectiontext;
                        }
                        cleanData();
                        $timeout(function () {
                            stopInit = false;
                        }, 500)
                    }

                    returnObj.result = result;
                    returnObj.defaultSelectionText = scope.config.defaultSelectionText.trim();
                    returnObj.selectTypeOption = scope.config.selectTypeOption;
                }
                scope.addNew = function () {
                    cleanData();
                    returnObj.addnew = true;
                    scope.triggerFlag = false;
                }

                //Popup hide/show flag
                scope.callbackOnHide = function (e) {
                    scope.triggerFlag = false;
                    scope.isSearchOpen = false;
                    cleanData();
                    /*  Return Default Selection Object */
                    lookup.resultCallBack(returnObj);
                }
            },
            templateUrl: 'shared/directives/uiElements/smartLookup/smartLookupTemplate.html'
        };
    }]);
})();
(function() {
	'use strict';
	var multiSelectId = 0;
	angular.module('SMART2').directive('smartMultiselect', [function () {
		return {
			restrict : 'E',
			replace : true,
			scope:{
				label: '@',
				options: '=?',
				ngModel: '=?',
				isMandatory: '@',
				isVisible: '=?',
				rules: '@',
				validate: '=?',
				focus: '=?',
				onChange: '&',
				disable: '@',
				multiple: '@',
				datakey: '@',
				removable: '@',
				autocomplete: '@',
				filterkeys: '@',
				optionformat: '@',
				displayformat: '@',
				width: '@'
			},
			link : function(scope, element, attrs) {
				var options;
				var filterKeys;
				scope.defaultText = "";

				if (attrs.id != undefined || attrs.id != null) {
					scope.multiSelectId = attrs.id;
					element.removeAttr('id');
				}
				else {
					multiSelectId = multiSelectId + 1;
					scope.multiSelectId = 'multiselect-' + multiSelectId;
				}
				scope.labelForMultiSelectId = 'label-for-' + scope.multiSelectId;
				scope.displayformat = scope.displayformat ? scope.displayformat : '{title}';
				scope.$watch('ngModel', function (newValue) {
					scope.selectedOptions = newValue;
				});

				scope.setDisplayFormat = function (item) {
					var displayArray = scope.displayformat.substring(1, scope.displayformat.length - 1);
					displayArray = displayArray.replace(/  +/g, ' ');
					var valu = "";
					var arrayD = displayArray.split('} {');
					for (var i = 0; i < arrayD.length; i++) {
						valu += item[arrayD[i]]+" ";
					}
					return valu;
				}

				scope.ngKeyDown = function (event) {
					if (event.keyCode === 8 && scope.defaultText == "") {
						if ((scope.ngModel[scope.ngModel.length - 1].selectForDelete) === true) {
							scope.ngModel.pop();
						} else {
							scope.ngModel[scope.ngModel.length - 1].selectForDelete = true;
						}
					} else {
						scope.ngModel[scope.ngModel.length - 1].selectForDelete = false;
					}
				}
				scope.deleteSelected = function (elementIndex) {
					scope.ngModel.splice(elementIndex, 1);
					scope.defaultText = "";
					$("#" + scope.multiSelectId).focus();
				}

				if (angular.isDefined(scope.filterkeys) && scope.filterkeys.trim().indexOf('[') == 0) {
					filterKeys = scope.filterkeys ? scope.$eval(scope.filterkeys) : ['title'];
				}
				else {
					filterKeys = scope.filterkeys ? scope.$eval('[' + scope.filterkeys + ']') : ['title'];
				}
				var optionFormat = scope.optionformat ? scope.optionformat : '{title}';
				var displayFormat = scope.displayformat ? scope.displayformat : '{title}';

				function getFormattedData(data) {
					if (!data || data.length == 0) {
						return [];
					}
					for (var i = 0; i < data.length; i++) {
						var str = displayFormat;
						try {
							var parentSplit = str.split('{');
							for (var j = 0; j < parentSplit.length; j++) {
								var childSplit = parentSplit[j].split('}');
								for (var k = 0; k < childSplit.length; k++) {
									if (childSplit[k].indexOf('.') > 0 || data[i].hasOwnProperty(childSplit[k])) {
										str = str.replace(new RegExp("{" + childSplit[k] + "}", "ig"), eval('data[i].' + childSplit[k]));
									}
								}
							}
						}
						catch (e) { }
						data[i].value = str.trim();
					}
					return data;
				};

				scope.$watch('options', function (newOptions) {
					try {
						if (!$('#' + scope.multiSelectId).devbridgeAutocomplete()) {
							$('#' + scope.multiSelectId).devbridgeAutocomplete({
								filterKeys: filterKeys,
								optionFormat: optionFormat,
								displayFormat: displayFormat,
								lookup: getFormattedData(newOptions),
								width: scope.width,
								onSelect: function (suggestion) {
									angular.element('#' + scope.labelForMultiSelectId).trigger('click');
									scope.$evalAsync(function () {
										scope.ngModel.push(suggestion)
									});
									$(this).focus();
									scope.defaultText = "";
								}
							});
						}
						else {
							$('#' + scope.multiSelectId).devbridgeAutocomplete().setLookup(getFormattedData(newOptions));
						}
					}
					catch (e) { }
				});

				/*
				 * Destroy autocomplete on scope destroy
				 */
				scope.$on('$destroy', function () {
					if ($('#' + scope.multiSelectId).devbridgeAutocomplete()) {
						$('#' + scope.multiSelectId).devbridgeAutocomplete().dispose();
					}
				});

			},
			templateUrl: 'shared/directives/uiElements/smartMultiselect/smartMultiselectTemplate.html'
		}
	}]
	)
})();
/**
 * @memberof SMART2
 * @ngdoc directive
 * @name Popup
 * @description This directive is useful for creating a popup.
 * 
 * @attr {String} template-url
 *    Template url that is expected to appear as popup contents
 * @attr {Boolean} show
 *    Popup will toggle as soon as value of this attribute changes
 * @attr {String} modal-type
 *    Modal type. Possible values are 'large' or 'small'.
 * @attr {Boolean} dismissible
 *   If set to true, popup will not hide when clicked outside. Default value is true.
 * @attr {Function} on-hide
 *    Callback function when popup hides
 * 
 * @example
 Controller:
 $scope.showPopup = false;
 $scope.onPopupHide = function() {
      $scope.showPopup = false;
 };
Usage:
 <smart-popup template-url="abc.html" show="{{showPopup}}" on-hide="onPopupHide()"></smart-popup>
 <button ng-click="showPopup=true">Click here</button>
 */

(function () {
    'use strict';
    angular.module('SMART2').directive('smartPopup', ['$rootScope', '$parse', '$timeout', function ($rootScope, $parse, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            link: function (scope, element, attrs) {
                var onHide = $parse(attrs.onHide);
                var topPositionBeforeModalOpen = 0;

                scope.isCancelButton = (attrs.cancelButton) ? scope.$eval(attrs.cancelButton) : false;

                scope.headerUrl = attrs.headerUrl;
                scope.contentUrl = attrs.contentUrl;
                scope.footerUrl = attrs.footerUrl;
                scope.templateUrl = attrs.templateUrl;
                scope.modalType = attrs.type;

                attrs.$observe('expandCollapse', function (value) {
                    scope.expandCollapse = value;
                    setTimeout(function () {

                        angular.element(scope.expandCollapse).click(function () {
                            angular.element(scope.expandCollapse).closest('.modal').addClass('expand-css-trans');
                            setTimeout(function () {
                                angular.element(scope.expandCollapse).closest('.modal .modal-header').toggleClass('extra-nav-wrap expand-header expand-css-trans');
                            }, 500);

                            setTimeout(function () {
                                angular.element(scope.expandCollapse).closest('.modal').removeClass('expand-css-trans');
                            }, 200);

                            angular.element(scope.expandCollapse).closest('.modal').toggleClass('expand-css');
                            angular.element(scope.expandCollapse).parent('.modal-header').next().next('.modal-footer_new').find('.modal-close').click(function () {
                                angular.element(scope.expandCollapse).closest('.modal').removeClass('expand-css');
                                angular.element(scope.expandCollapse).closest('.modal .modal-header').removeClass('extra-nav-wrap expand-header expand-css-trans');
                                angular.element(scope.expandCollapse).parents('body').find('.lean-overlay').css('display', 'block');
                            });
                            if (angular.element(scope.expandCollapse).closest('.modal').hasClass('expand-css')) {
                                angular.element(scope.expandCollapse).parents('body').find('.lean-overlay').css('display', 'none');
                                angular.element(scope.expandCollapse).closest('.modal').css('border-radius', '0');
                            }
                            else {
                                angular.element(scope.expandCollapse).parents('body').find('.lean-overlay').css('display', 'block');
                            }
                        });
                    }, 1000);
                });


                /*
                 *  Unbind window keyup listener and assign tabindex back to .picker elements
                 */
                var reset = function () {
                    $(window).off('keyup', onWindowKeyUp);
                    angular.element('.picker').attr("tabindex", 0);
                    angular.element(document).scrollTop(topPositionBeforeModalOpen);
                };


                /*
                 *  window on key up event listener
                 */
                var onWindowKeyUp = function (e) {
                    if (angular.element(e.target).closest('.modal').length == 0 && e.keyCode == 9) {
                        angular.element(element.find(':focusable')[0]).focus();
                    }
                };


                /*
                 * Show pop up
                 */
                var onShow = attrs.$observe('show', function (value) {
                    if (angular.isDefined(value)) {
                        if (scope.$eval(value)) {
                            topPositionBeforeModalOpen = angular.element(document).scrollTop();
                            angular.element(element).openModal({
                                dismissible: scope.$eval(attrs.dismissible),
                                complete: function () {
                                    if (angular.isFunction(onHide)) {
                                        scope.$apply(function () {
                                            onHide(scope, { e: "" });
                                        });
                                    }
                                    reset();

                                    //  Check if popup is opened by uigrid-compatible element
                                    if (window.isPopupOpenedByUIGridCompatibleElement) {
                                        //  Following event is listened inside uigrid-compatible dir
                                        $rootScope.$emit("popupClosed");
                                        window.isPopupOpenedByUIGridCompatibleElement = undefined;
                                    }
                                    $timeout(function() {
                                        var marginy = parseInt($(element).css('margin-top'));
                                        $(element).css('transform', 'scaleX(1) translateY(' + marginy + ')');
                                        $(element).css('margin-top', '0');
                                        $(element).removeClass('noTransform');
                                    },100);
                                },
                                ready: function () {
                                    //  Check if popup is opened by uigrid-compatible element
                                    if (window.isPopupOpenedByUIGridCompatibleElement) {
                                        $rootScope.$emit("popupOpened");
                                    }
                                    $timeout(function() {
                                        var translatey = parseInt($(element).css('transform').split(',')[5]);
                                        $(element).css('margin-top', translatey);
                                        $(element).addClass('noTransform');

                                        //Auto focus first feild / manage tab index
                                        angular.element(element.find(':focusable').not('.select-dropdown')[0]).not('.datepicker').focus();
                                        $(window).on('keyup', onWindowKeyUp);

                                        //Remove picker tabindex when popup to avoid focus on picker element
                                        angular.element('.picker').removeAttr("tabindex");
                                    });
                                }
                            });
                        }
                        else {
                            angular.element(element).closeModal();
                            //  remove the listener and add tabindex back on picker
                            reset();

                            //  Check if popup is opened by uigrid-compatible element
                            if (window.isPopupOpenedByUIGridCompatibleElement) {
                                //  Following event is listened inside uigrid-compatible dir
                                $rootScope.$emit("popupClosed");
                                window.isPopupOpenedByUIGridCompatibleElement = undefined;
                            }
                        }
                    }
                });


                scope.$on('$destroy', function () {
                    onShow();
                    reset();
                     ;
                    scope = null;
                    console.log("onSubsectionLoad smartPopUp ", scope);
                });
                
            },
            templateUrl: 'shared/directives/uiElements/smartPopUp/smartPopUpTemplate.html'
        };
    }]);
})();
/**
   * @memberof SMART2
   * @ngdoc directive
   * @name Radio
   * @description This directive is useful for creating a radio button or a group of radio buttons.
   * 
   * @attr {String} label
   *    Label to be displayed for identification of this ui element
   * @attr {Array} options
   *    Number of radio buttons to be created. Only one option can be selected at a time.
   * @attr {Object} ng-model
   *    Default selected option. This is expected to be one of the 'options'.
   * @attr {Object} ng-model-options
   *    https://docs.angularjs.org/api/ng/directive/ngModelOptions. 
   *    <a href="SMART2.Textfield.html">Click here</a> and scoll down to 'Textfield with ng-model-options' to see example reference.
   * @attr {String} datakey
   *    A property of an option to be used to display the label for option. Default value is 'title'.
   * @attr {String} layout
   *    'vertical' or 'horizontal' layout
   * @attr {Boolean} validate
   *    If set to true, this ui element will be validated on the basis of rules passed to it
   * @attr {Array} rules 
   *    Rules to be evaluated when this element's blur event is fired. A rule must have 'rule' and 'errorMessage' properties (keys).
   *    'rule' must be a condition or group of conditions. 'errorMessage' will be the message to be displayed when corresponding rule fails. See example for more.
   * @attr {String} error-message 
   *    Error message to be displayed. This attribute can be set at any point to display an error message.
   * @attr {Boolean} is-mandatory 
   *    If set to true, default error message will be displayed when blur event is fired and this ui element is left blank
   * @attr {Boolean} is-visible 
   *    If set to true, this ui element will be displayed on form regardless of 'is-mandatory' property's value. 
   *    This ui element can be removed from form by clicking 'x' button on top right corner of this ui element.
   * @attr {Number} colspan
   *    Number of columns to be occupied by this ui element. 1 column is equal to 1 ui element.
   *    Default value is 1.
   *    For e.g. If colspan is set to 2, this ui element will occupy width of 2 ui elements (fields).
   * @attr {Function} on-change
   *    Callback function when any of the buttons from radio group is selected
   * @type cool
   * 
   * @example
   Dynamic:
   Controller:
       $scope.config = {
            "modelData": {
                "currency": { "code": "€", "name": "EUR" }
            }, 
            "formConfig": {
                "sections": [
                    {
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "Currency",
                                        "type": "radio",
                                        "isMandatory": true,
                                        "data": "currency",
                                        "colspan": 1,
                                        "onChange": "onChange",  //  controller function
                                        "attributes": {
                                            "options": [{
                                                "code": "$",
                                                "name": "USD"
                                            }, {
                                                "code": "€",
                                                "name": "EUR"
                                            }],
                                            "datakey": "name"
                                        },
                                        "rules": [
                                            { 
                                                "rule": "this.title == \"Option 2\"", 
                                                "error": "Invalid selection" 
                                            }
                                        ]
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
   
   * @example
   Static:
   Controller:
       $scope.currencyOptions = [{
            "code": "$",
            "name": "USD"
       }, {
           "code": "€",
           "name": "EUR"
       }];
       $scope.selectedCurrency = { "code": "€", "name": "EUR" };
       $scope.onChange = function(selectedCurrency) {
           console.log(selectedCurrency);
       };
   Usage:
       <smart-radio label="Currency" ng-model="selectedCurrency" options="currencyOptions" datakey="name" on-change="onChange(selectedCurrency)"></smart-radio> 

   * @example
   Radio with disabled option:
   Controller:
       $scope.currencyOptions = [{
            "code": "$",
            "name": "USD",
            "disable": true
       }, {
           "code": "€",
           "name": "EUR"
       }];
       $scope.selectedCurrency = { "code": "€", "name": "EUR" };
   Usage:
       <smart-radio label="Currency" ng-model="selectedCurrency" options="currencyOptions" datakey="name"></smart-radio> 
   */

(function () {
    'use strict';
    var radioGroupId = 0;

    angular.module('SMART2').directive('smartRadio', ['$timeout', 'ScrollTo', 'RuleEngine', function ($timeout, ScrollTo, RuleEngine) {
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            scope: {
                label: '@',
                options: '=?',
                ngModelCopy: '=?ngModel',
                isMandatory: '@',
                isVisible: '=?',
                layout: '@',
                rules: '@',
                validate: '=?',
                focus: '=?',
                parentElement: '@',
                errorMessage: '@',
                onChange: '&',
                removable: '@',
                datakey: '@',
                optionId: '@',
                groupId: '@'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.isRemovable = scope.$eval(scope.removable) == undefined ? true : scope.$eval(scope.removable);

                var isNgModelFunction = typeof scope.ngModelCopy == 'function';

                // key to be used to bind options
                scope.dataKey = scope.datakey ? scope.datakey : 'title';

                //uniqueID
                radioGroupId = radioGroupId + 1;
                scope.radioGrouptId = (attrs.groupId) ? attrs.groupId : "radio-group-" + radioGroupId;

                if (typeof attrs.optionId != "undefined") {
                    scope.optionId = attrs.optionId;
                }

                //check is gap
                scope.isGap = (attrs.gap) ? scope.$eval(attrs.gap) : false;

                scope.layout = scope.layout ? scope.layout : 'horizontal';


                /*
                 *  Following code has been added to make ng-model-options work
                 *  ngModelCtrl.$render & ngModelCtrl.$setViewValue serve the purpose
                 */
                if (isNgModelFunction) {
                    try {
                        ngModelCtrl.$render = function () {
                            scope.ngModel = ngModelCtrl.$modelValue;
                            scope.selectedOption = scope.ngModel;
                        };
                    }
                    catch (e) { }
                }

                var updateView = function () {
                    if (isNgModelFunction) {
                        try {
                            ngModelCtrl.$setViewValue(scope.ngModel);
                        }
                        catch (e) { }
                    }
                };


                /*
                 * Focus field when focus is set to true
                 */
                var onFocus = scope.$watch('focus', function (newVal) {
                    if (newVal) {
                        ScrollTo.perform(element, angular.element('#' + scope.parentElement));
                        scope.focus = false;
                    }
                });

                /*
                 * Validate field whene validate is set to true
                 */
                var onValidate = scope.$watch('validate', function (newValue) {
                    if (newValue != undefined && newValue) {
                        scope.validateRules();
                    }
                });

                /*
                 * Watch needs to be added on ngModel
                 */
                var onNgModel = scope.$watch(isNgModelFunction ? 'ngModel' : 'ngModelCopy', function (newVal) {
                    scope.selectedOption = newVal;
                }, true);

                /*
                 * Validate rules
                 */
                scope.validateRules = function () {
                    if (scope.$eval(scope.isMandatory) && (isNgModelFunction && (scope.ngModel === '' || scope.ngModel === undefined || scope.ngModel === null)) || (!isNgModelFunction && (scope.ngModelCopy === '' || scope.ngModelCopy === undefined || scope.ngModelCopy === null))) {
                        scope.validate = true;
                        scope.errorMessage = 'Please select an option';
                        return;
                    }

                    scope.validate = false;
                    scope.errorMessage = null;

                    if (scope.rules) {
                        var rules = scope.$eval(scope.rules);
                        var isFoundInvalid = false;

                        for (var i = 0; i < rules.length; i++) {
                            if (typeof rules[i] == 'object') {
                                if (eval((rules[i].rule).replace(/this/g, 'scope.selectedOption'))) {
                                    scope.validate = true;
                                    scope.errorMessage = rules[i].error;
                                    break;
                                }
                                else {
                                    if (!isFoundInvalid) {
                                        RuleEngine.isValid(rules[i], function (e) {
                                            scope.validate = true;
                                            scope.errorMessage = e.errorData.error;
                                            isFoundInvalid = true;
                                        });
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                };

                scope.ngChange = function (selectedOption) {
                    // Commented below code for fixing TWO-2748
                    //if (!scope.$eval(scope.isMandatory) && angular.isDefined(scope.selectedOption) && scope.selectedOption[scope.dataKey] == selectedOption[scope.dataKey]) {
                    //    scope.selectedOption = '';
                    //}
                    //else {
                    //    scope.selectedOption = selectedOption;
                    //}

                    // Added below code for fixing TWO-2748
                    scope.selectedOption = selectedOption;

                    if (!scope.groupId) {
                        if (isNgModelFunction) {
                            scope.ngModel = scope.selectedOption;
                        }
                        else {
                            scope.ngModelCopy = scope.selectedOption;
                        }
                    }
                    updateView();
                    scope.validateRules();
                    $timeout(function () {
                        scope.onChange();
                    });
                };

                scope.$on('$destroy', function () {
                    onFocus();
                    onValidate();
                    onNgModel();
                    scope = null;
                    console.log("onSubsectionLoad smartRadio ", scope);
                });

                
            },
            templateUrl: 'shared/directives/uiElements/smartRadio/smartRadioTemplate.html'
        };
    }]);
})();
(function () {
    'use strict';
    var scrollCounter = 0;

    angular.module('SMART2').directive('smartScroll', ['$parse', '$timeout', '$window', function ($parse, $timeout, $window) {
        return {
            restrict: 'EA'
         
        };
    }]);
})();


  /**
   * @memberof SMART2
   * @ngdoc directive
   * @name Section
   * @description This directive is useful for creating a section.
   * 
   * @attr {String} label
   *    Label to be displayed on section header. If 'is-header' is set to true, label will be displayed on section header.
   * @attr {Boolean} plain
   *    If set to true, section with no style will be generated
   * @attr {Boolean} is-collapsible
   *    If set to true, section will be collapsible
   * @attr {String} header-template
   *    This attribute is useful for creating sections with custom header templates.
   *    'header-template' is expected to be an URL of a template.
   * @attr {Boolean} is-active
   *    If set to false and if 'is-collapsible' is set to true, section will be displayed in collapsed mode. Default value is true.      
   * @attr {Boolean} is-header
   *    If set to true, section-header will be displayed. Default value is true.
   * 
   * @example
   Dynamic:
   Controller:
       $scope.config = {
            "modelData": {
                "firstName": "Sushant"
            }, 
            "formConfig": {
                "sections": [
                    {
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "First name",
                                        "type": "textfield",
                                        "isMandatory": true,
                                        "data": "firstName"
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
    
   * @example 
   Dynamic: (Section with header)
   Controller:
       $scope.config = {
            "modelData": {
                "firstName": "Sushant"
            }, 
            "formConfig": {
                "sections": [
                    {
                        "label": "Section header",
                        "isHeader": true,
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "First name",
                                        "type": "textfield",
                                        "isMandatory": true,
                                        "data": "firstName"
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

   * @example 
   Dynamic: (Section with custom header-template)
   Controller:
       $scope.config = {
            "modelData": {
                "firstName": "Sushant"
            }, 
            "formConfig": {
                "sections": [
                    {
                        "headerTemplate": "abc.html",
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "First name",
                                        "type": "textfield",
                                        "isMandatory": true,
                                        "data": "firstName"
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

   * @example 
   Dynamic: (Section with collapsible header)
   Controller:
       $scope.config = {
            "modelData": {
                "firstName": "Sushant"
            }, 
            "formConfig": {
                "sections": [
                    {
                        "headerTemplate": "abc.html",
                        "isCollapsible": true,
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "First name",
                                        "type": "textfield",
                                        "isMandatory": true,
                                        "data": "firstName"
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

   * @example
   Static:
   <smart-section>
        Section contents will go here
    </smart-section> 

   * @example
   Static: (Section with header)
   <smart-section label="Section Header" is-header="true">
        Section contents will go here
   </smart-section>

   * @example
   Static: (Section with collpsible header)
   <smart-section is-collapsible="true">
        Section contents will go here
   </smart-section>
        
   * @example
   Static: (Section with header and content place holder)
   <smart-section is-header="true">
        <smart-section-header>
            Section header will go here
        </smart-section-header>
        <smart-section-content>
            Section contents will go here
        </smart-section-content>
    </smart-section>    
   */

(function() {
    'use strict';
    
    var sectionCounter = 0;
    
    angular.module('SMART2').directive('smartSection', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            restrict: 'E',
            replace: true,
            transclude: {
                'header': '?smartSectionHeader',
                'body': '?smartSectionBody'
            },
            scope: {
                config: '=?',
                model: '=?',
                label: '@',
                isSequential: '@',
                isMandatory: '@',
                isDraggable: '@',
                parentScope: '=?',
                formWidgetId: '@',
                isCollapsible: '@',
                headerTemplate: '@',
                isActive: '=?',
                isHeader: '@',
                plain: '@',
                onClick: '&',
                onHeaderClick: '&'
            },
            link: function (scope, element, attrs) {
                if (attrs.id !== '' || attrs.id !== undefined || attrs.id !== null) {
                    scope.sectionId = attrs.id;
                }
                else {
                    scope.sectionId = 'section-' + sectionCounter;
                    sectionCounter = sectionCounter + 1;
                }

                element.attr('id', scope.sectionId);

                scope.collapsible = scope.$eval(scope.isCollapsible) == true ? true : false;
                scope.active = angular.isUndefined(scope.isActive) || scope.isActive == true ? true : false;
                scope.header = scope.$eval(scope.isHeader) ? true : false;

                if(!scope.collapsible) {
                    scope.active = true;
                }
                else {
                    scope.header = true;
                }

                scope.isCollapsed = scope.active;

                if(!scope.headerTemplate) {
                    scope.headerTemplate = '';
                }

				/*
				 * Update optional field item
				 */
                var onRowsConfig = scope.$watch('config.rows', function (newConfig) {
                    if(newConfig) {
						for(var j=0; j<scope.config.rows.length; j++) {
						    for (var k = 0; k < scope.config.rows[j].properties.length; k++) {
								if(!scope.config.rows[j].properties[k].isMandatory) {
									updateOptionalField(scope.config.rows[j].properties[k]);
								}
							}
						}
                    }
                }, true);
                    
				var updateOptionalField = function(item) {
					for(var i=0; i<scope.config.optionalFields.length; i++) {
						if(item.label == scope.config.optionalFields[i].label) {
							scope.config.optionalFields[i].visible = item.isVisible;
							return;
						}
					}
				};


                /*
                 * Get row's visible properties length
                 */
                var getVisiblePropertiesLength = function (rowIndex) {
                    var visiblePropertiesLength = 0;
                    for (var i = 0; i < scope.config.rows[rowIndex].properties.length; i++) {
                        if (scope.config.rows[rowIndex].properties[i].isVisible && !scope.config.rows[rowIndex].properties[i].isHidden) {
                            visiblePropertiesLength++;
                        }
                    }
                    return visiblePropertiesLength;
                };


                scope.onOptionalFieldClick = function (isLabelClicked, item) {
                    if (isLabelClicked && item.isVisible) {
                        return;
                    }

                    /*
                     *  If row's visible properties length is 0
                     *  then splice the row and push it at the end of section
                     */
                    if (!scope.$eval(scope.isSequential) && getVisiblePropertiesLength(item.rowIndex) == 0) {
                        var tmpRow = scope.config.rows[item.rowIndex];
                        scope.config.rows.splice(item.rowIndex, 1);
                        scope.config.rows.push(tmpRow);
                        item.rowIndex = scope.config.rows.length - 1;
                    }

                    scope.config.rows[item.rowIndex].properties[item.propertyIndex].isVisible = !scope.config.rows[item.rowIndex].properties[item.propertyIndex].isVisible;

                    /*
                     *  scope.isSequential is set to 'true', form-widget-property would be added 
                     *  where it is positioned in the JSON structure else 
                     *  form-widget-property would be added at the end of row
                     */
                    if (!scope.$eval(scope.isSequential) && scope.config.rows[item.rowIndex].properties[item.propertyIndex].isVisible) {
                        var tmpProperty = scope.config.rows[item.rowIndex].properties[item.propertyIndex];
                        scope.config.rows[item.rowIndex].properties.splice(item.propertyIndex, 1);
                        scope.config.rows[item.rowIndex].properties.push(tmpProperty);
                        for (var i = 0; i < scope.config.rows[item.rowIndex].properties.length; i++) {
                            for (var j = 0; j < scope.config.optionalFields.length; j++) {
                                if (scope.config.rows[item.rowIndex].properties[i].label == scope.config.optionalFields[j].label) {
                                    scope.config.optionalFields[j].propertyIndex = i;
                                }
                            }
                        }
                    }
                    item.visible = !item.visible;
                    //  Expand the section
                    if (item.visible) {
                        setTimeout(function () {
                            expandSection();
                        }, 250);
                    }
                };


                /*
                 * Expand section if isActive is set to true
                 */
                var onIsActive = scope.$watch('isActive', function (newValue) {
                    if (angular.isDefined(newValue) && newValue) {
                        expandSection();
                        scope.isActive = false;
                    }
                });


                /*
                 * On optional field click listener
                 */
                var onOptionalFieldClick = scope.$on('optionalFieldClick', function (event, args) {
                    try {
                        if (args.item.sectionKey === scope.config.key) {
                            scope.onOptionalFieldClick(args.isLabelClicked, args.item);
                        }
                    }
                    catch(e) {}
                });


                /*
                 *  Expand section
                 */
                var expandSection = function () {
                    if (!element.find('.collapsible-header').hasClass('active')) {
                        element.find('.collapsible-header').trigger('click');
                    }
                    else if (!angular.element(element.find('.collapsible-header')[0]).hasClass('active')) {
                        angular.element(element.find('.collapsible-header')[0]).trigger('click');
                    }
                };


                setTimeout(function () {
                    element.find('.collapsible-header').click(function () {
                        var ele = this;
                        scope.$evalAsync(function () {
                            scope.isCollapsed = angular.element(ele).hasClass('active');
                            scope.onClick();
                            scope.onHeaderClick();
                        });
                    });
                });
                

                /*
                 *  Remove all listeners on scope destroy
                 */
                scope.$on('$destroy', function () {
                    onRowsConfig();
                    onIsActive();
                    onOptionalFieldClick();
                });
            },
            templateUrl: 'shared/directives/uiElements/smartSection/smartSectionTemplate.html'
        };
    }]);
    
    
    angular.module('SMART2').directive('smartSectionItemRenderer', ['$compile', 'formWidgetUtils', '$translate', function ($compile, formWidgetUtils, $translate) {
        return {
            restrict: 'E',
            replace: false,
            link: function (scope, element, attrs) {
                var html = "", commonAttributes;

                if (scope.section) {
                    if (scope.section.controller) {
                        //  Creating dataModel variable so that child controller can access it using $scope.formDataModel
                        scope.formDataModel = scope.$parent.$parent.$parent.modelData;

                        html += '<div ng-controller="' + scope.section.controller + '">';
                    }

                    //  Section's primary attribute and can be optional
                    scope.extendedSectionConfig = angular.extend({
                        isMandatory: false,
                        isCollapsible: true,
                        isDraggable: false,
                        isHeader: true,
                        isActive: true,
                        isHidden: true,
                        headerTemplate: ''
                    }, scope.section);

                    commonAttributes = ' label="{{section.label | translate}}" config="section" model="modelData" plain="{{section.plain}}" is-sequential="{{isSequential}}" ' + formWidgetUtils.getAttributesMapping('primary', scope.extendedSectionConfig, scope, true) + ' parent-scope="' + (scope.section.controller ? '$parent.$$childTail' : '$parent.$parent.$parent.$parent') + '" form-widget-id="{{formWidgetId}}" ';

                    html += '<smart-section id=' + scope.formWidgetId + '-section-' + scope.$index + ' ' + commonAttributes + formWidgetUtils.mapEvents([
                        { type: 'on-click', listener: 'onSectionClick(section)' },
                        { type: 'on-header-click', listener: formWidgetUtils.generateFunctionWithParams(scope.section.onHeaderClick, '$parent.$parent.$parent.$parent', true) }
                    ]) + '></smart-section>';

                    if (scope.section.controller) {
                        html += '</div>';
                    }
                }
                else {
                    var ngModelMapping;

                    if (scope.property.type == 'subsection') {
                        ngModelMapping = 'model-data="model.' + scope.property.data + '"' + 'form-model="model"';
                    }
                    else {
                        ngModelMapping = 'ng-model="model.' + scope.property.data + '"';

                        try {
                            if (scope.property.attributes.ngModelOptions.getterSetter) {
                                ngModelMapping = 'ng-model="parentScope.' + scope.property.data + '"';
                            }
                        }
                        catch (e) { }
                    }

                    commonAttributes = ' class="' + formWidgetUtils.getColspanClass(scope.property.colspan) + (scope.property.type != 'subsection' ? ' line-height-manager' : '') + '" label="{{property.label | translate}}" focus="' + (typeof scope.property.focus == 'string' ? 'parentScope.' + scope.property.focus : 'property.focus') + '" validate="' + (typeof scope.property.validate == 'string' ? 'parentScope.' + scope.property.validate : 'property.validate') + '" ' + ngModelMapping + ' ' + formWidgetUtils.getAttributesMapping('primary', scope.property, scope) + ' parent-element="{{formWidgetId}}" ' + formWidgetUtils.getAttributesMapping('secondary', scope.property.attributes, scope);

                    switch (scope.property.type) {
                        case 'textfield':
                            html = '<smart-textfield ' + commonAttributes + formWidgetUtils.mapEvents([
                                { type: 'on-change', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onChange, 'parentScope') },
                                { type: 'on-focus', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onFocus, 'parentScope') },
                                { type: 'on-blur', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onBlur, 'parentScope') },
                                { type: 'on-key-up', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onKeyUp, 'parentScope') },
                                { type: 'on-key-down', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onKeyDown, 'parentScope') },
                                { type: 'on-key-press', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onKeyPress, 'parentScope') },
                                { type: 'on-enter', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onEnter, 'parentScope') },
                                { type: 'on-select', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onSelect, 'parentScope') },
                                { type: 'on-destroy', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onDestroy, 'parentScope') }
                            ]) + '></smart-textfield>';
                            break;

                        case 'dropdown':
                        case 'select':
                            html = '<smart-select validate="property.validate" ' + commonAttributes + formWidgetUtils.mapEvents([
                                { type: 'on-change', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onChange, 'parentScope') },
                                { type: 'on-destroy', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onDestroy, 'parentScope') }
                            ]) + '></smart-select>';
                            break;

                        case 'radio':
                            html = '<smart-radio gap="true"' + commonAttributes + formWidgetUtils.mapEvents([
                                { type: 'on-change', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onChange, 'parentScope') },
                                { type: 'on-destroy', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onDestroy, 'parentScope') }
                            ]) + '></smart-radio>';
                            break;

                        case 'checkbox':
                            html = '<smart-checkbox fill="true" min-height="50px" ' + commonAttributes + formWidgetUtils.mapEvents([
                                { type: 'on-change', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onChange, 'parentScope') },
                                { type: 'on-destroy', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onDestroy, 'parentScope') }
                            ]) + '></smart-checkbox>';
                            break;

                        case 'switch':
                            html = '<smart-switch ' + commonAttributes + formWidgetUtils.mapEvents([
                                { type: 'on-change', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onChange, 'parentScope') },
                                { type: 'on-destroy', listener: formWidgetUtils.generateFunctionWithParams(scope.property.onDestroy, 'parentScope') }
                            ]) + '></smart-switch>';
                            break;

                        case 'subsection':
                            /*
                             *  Convert onLoad function in a way that function name should be converted to subsection controller function
                             *  and its parameteres should be converted into parent controller's variables
                             */
                            var onLoadFunction = '';
                            if (scope.property.onLoad == '' || scope.property.onLoad == undefined || scope.property.onLoad == null) {
                                scope.property.onLoad = '';
                            }
                            if(scope.property.onLoad != '') {
                                onLoadFunction = formWidgetUtils.generateFunctionWithParams(scope.property.onLoad, 'parentScope');
                                onLoadFunction = onLoadFunction.replace('parentScope.' + scope.property.onLoad.split('(')[0], '$$$childHead.' + scope.property.onLoad.split('(')[0]);
                                onLoadFunction = onLoadFunction.replace(',property', '');
                            }
                            html = '<smart-subsection class="' + formWidgetUtils.getColspanClass(scope.property.colspan) + ' padding0" controller="{{property.controller}}" template-url="{{property.templateUrl}}" parent-scope="parentScope" ' + commonAttributes + formWidgetUtils.mapEvents([
                                { type: 'on-load', listener: onLoadFunction }
                            ]) + '></smart-subsection>';
                            break;
                    }
                }
                element.html(html);
                $compile(element.contents())(scope);
            }
        };
    }]);
})();    
  /**
   * @memberof SMART2
   * @ngdoc directive
   * @name Select
   * @description This directive is useful for creating a select ui element.
   * 
   * @attr {String} label
   *    Label to be displayed for identification of this ui element
   * @attr {Array} options
   *    Number of options to be created
   * @attr {Var} ng-model
   *    Default selected option. Please refer example for more details.
   * @attr {Object} ng-model-options
   *    https://docs.angularjs.org/api/ng/directive/ngModelOptions. 
   *    <a href="SMART2.Textfield.html">Click here</a> and scoll down to 'Textfield with ng-model-options' to see example reference.
   * @attr {String} datakey
   *    ng-model variable will be updated on the basis of this property. datakey will be used to display an option when displaykey is not set.
   * @attr {String} displaykey
   *    A property of an option to be used to display an option
   * @attr {Boolean} disable
   *    If set to true, none of the options can be selected
   * @attr {Boolean} focus 
   *    If set to true, this ui element will be focused
   * @attr {Boolean} validate
   *    If set to true, this ui element will be validated on the basis of rules passed to it
   * @attr {Array} rules 
   *    Rules to be evaluated when this element's blur event is fired. A rule must have 'rule' and 'errorMessage' properties (keys).
   *    'rule' must be a condition or group of conditions. 'errorMessage' will be the message to be displayed when corresponding rule fails. See example for more.
   * @attr {String} error-message 
   *    Error message to be displayed. This attribute can be set at any point to display an error message.
   * @attr {Boolean} is-mandatory 
   *    If set to true, default error message will be displayed when blur event is fired and this ui element is left blank
   * @attr {Boolean} is-visible 
   *    If set to true, this ui element will be displayed on form regardless of 'is-mandatory' property's value. 
   *    This ui element can be removed from form by clicking 'x' button on top right corner of this ui element.
   * @attr {Number} colspan
   *    Number of columns to be occupied by this ui element. 1 column is equal to 1 ui element.
   *    Default value is 1.
   *    For e.g. If colspan is set to 2, this ui element will occupy width of 2 ui elements (fields).
   * @attr {Function} on-change
   *    Callback function when option is changed
   * 
   * @example
   Dynamic:
   Controller:
       $scope.config = {
            "modelData": {
                "currency": { "code": "€", "name": "EUR" }
            }, 
            "formConfig": {
                "sections": [
                    {
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "Currency",
                                        "type": "dropdown",      //  select will also work
                                        "isMandatory": true,
                                        "data": "currency",
                                        "colspan": 1,
                                        "onChange": "onChange",  //  controller function
                                        "attributes": {
                                            "options": [{
                                                "code": "$",
                                                "name": "USD"
                                            }, {
                                                "code": "€",
                                                "name": "EUR"
                                            }],
                                            "datakey": "name"
                                        },
                                        "rules": [
                                            { 
                                                "rule": "this.title == \"Option 2\"", 
                                                "error": "Invalid selection" 
                                            }
                                        ]
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

   * @example
   Static:
   Controller:
       $scope.currencyOptions = [{
            "code": "$",
            "name": "USD"
       }, {
           "code": "€",
           "name": "EUR"
       }];
       $scope.selectedCurrency = { "code": "€", "name": "EUR" };
       $scope.onChange = function(selectedCurrency) {
           console.log(selectedCurrency);
       };
   Usage:
       <smart-select label="Currency" ng-model="selectedCurrency" options="currencyOptions" on-change="onChange(selectedCurrency)"></smart-select> 

   * @example
   Select with disabled state:
   <smart-select label="Currency" ng-model="selectedCurrency" options="currencyOptions" datakey="name" disable="true"></smart-radio> 

   * @example
   Select with ng-model as 'String' (In following example, when an option is selected, ng-model would be either '$' or '€'):
   Controller:
       $scope.currencyOptions = [{
            "code": "$",
            "name": "USD"
       }, {
           "code": "€",
           "name": "EUR"
       }];
       $scope.selectedCurrency = "$";
       $scope.onChange = function(selectedCurrency) {
           console.log(selectedCurrency);
       };
   Usage:
       <smart-select label="Currency" ng-model="selectedCurrency" options="currencyOptions" datakey="code" displaykey="name" on-change="onChange(selectedCurrency)"></smart-select> 

   * @example
   Select with disabled option:
   Controller:
       $scope.currencyOptions = [{
            "code": "$",
            "name": "USD",
            "disable": true
       }, {
           "code": "€",
           "name": "EUR"
       }];
       $scope.selectedCurrency = { "code": "€", "name": "EUR" };
       $scope.onChange = function(selectedCurrency) {
           console.log(selectedCurrency);
       };
   Usage:
       <smart-select label="Currency" ng-model="selectedCurrency" options="currencyOptions" datakey="name" on-change="onChange(selectedCurrency)"></smart-select> 
   */

(function() {
    'use strict';
    var selectId = 0;
    
    angular.module('SMART2').directive('smartSelect', ['$timeout', 'ScrollTo', 'RuleEngine', function ($timeout, ScrollTo, RuleEngine) {
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            scope: {
                label: '@',
                options: '=?',
                ngModelCopy: '=?ngModel',
                isMandatory: '@',
                isVisible: '=?',
                rules: '@',
                validate: '=?',
                focus: '=?',
                parentElement: '@',
                onChange: '&',
                disable: '@',
                multiple: '@',
                datakey: '@',
                displaykey: '@',
                removable: '@',
                preview: '@'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                var options, isNgModelWatchAdded = false;
                var onNgModel = function () { };
                scope.selectOptions = [];
                var typeOfNgModel;

                var isNgModelFunction = typeof scope.ngModelCopy == 'function';

                // create unique id
                selectId = selectId + 1;
                scope.dropDownId = "dropdown-" + selectId;

                // key to be used to bind options
                scope.dataKey = scope.datakey ? scope.datakey : 'title';
                scope.displayKey = scope.displaykey ? scope.displaykey : scope.dataKey;

                /*
                 *  Following code has been added to make ng-model-options work
                 *  ngModelCtrl.$render & ngModelCtrl.$setViewValue serve the purpose
                 */
                if (isNgModelFunction) {
                    try {
                        ngModelCtrl.$render = function () {
                            scope.ngModel = ngModelCtrl.$modelValue;
                            scope.selectedOption = scope.ngModel;
                        };
                    }
                    catch (e) { }
                }

                var updateView = function () {
                    if (isNgModelFunction) {
                        try {
                            ngModelCtrl.$setViewValue(scope.ngModel);
                        }
                        catch (e) { }
                    }
                };



                /*
    		     * Check if new option is added
    		     */
                var onOptions = scope.$watch('options', function (newOptions) {
                    if (!newOptions) {
                        return;
                    }

                    if (newOptions && newOptions.length > 0) {
                        //if (scope.label && newOptions[0][scope.dataKey] != scope.label) {
                        if (scope.$eval(scope.isMandatory)) {
                            options = newOptions;
                        }
                        else {
                            options = [{ title: 'Choose your option', disable: false, id: 'fakeOptionId' }].concat(newOptions);
                            options[0][scope.displayKey] = options[0].title;
                        }
                        //}
                        //else {
                        //    options = newOptions;
                        //}
                    }
                    else {
                        return;
                    }

                    var optionGroups = [];

                    for (var i = 0; i < options.length; i++) {
                        if (options[i].hasOwnProperty('groupName') && optionGroups.indexOf(options[i].groupName) == -1) {
                            optionGroups.push(options[i].groupName);
                        }
                    }

                    //if (optionGroups.length > 0) {
                    //    options.splice(0, 1);
                    //}

                    scope.optionGroups = angular.copy(optionGroups);

                    scope.selectOptions = options;

                    //if (!scope.selectedOption) {
                    //    scope.selectedOption = options[0];
                    //}

                    //try {
                    //    scope.selectedOptionString = angular.copy(scope.selectedOption[scope.dataKey]);
                    //}
                    //catch (e) { }

                    if (!isNgModelWatchAdded) {
                        onNgModel = scope.$watch(isNgModelFunction ? 'ngModel' : 'ngModelCopy', function (newVal) {
                            if (angular.isUndefined(typeOfNgModel) && (newVal !== '' && newVal != undefined && newVal != null)) {
                                typeOfNgModel = typeof newVal;
                            }
                            var newValueCopy;

                            if (typeOfNgModel == 'string' || typeOfNgModel == 'number') {
                                for (var i = 0; i < options.length; i++) {
                                    if (newVal == options[i][scope.dataKey]) {
                                        newValueCopy = options[i];
                                        break;
                                    }
                                }
                            }
                            else {
                                newValueCopy = newVal;
                            }

                            scope.selectedOption = angular.copy(newValueCopy);

                            try {
                                if (!scope.selectedOption) {
                                    scope.selectedOption = options[0];
                                }

                                scope.selectedOptionString = angular.copy(scope.selectedOption[scope.dataKey]);
                            }
                            catch (e) { }

                            setTimeout(function () {
                                angular.element("#" + scope.dropDownId).material_select();
                            });
                        }, true);

                        isNgModelWatchAdded = true;
                    }

                    setTimeout(function () {
                        angular.element("#" + scope.dropDownId).material_select();
                    });
                });

                scope.isRemovable = scope.$eval(scope.removable) == undefined ? true : scope.$eval(scope.removable);


                /*
                 * Watch needs to be added on disable since element needs to be updated
                 */
                var onDisable = scope.$watch('disable', function (newVal) {
                    setTimeout(function () {
                        angular.element("#" + scope.dropDownId).material_select();
                    });
                });

                /*
                 * Focus field when focus is set to true
                 */
                var onFocus = scope.$watch('focus', function (newVal) {
                    if (newVal) {
                        ScrollTo.perform(element, angular.element('#' + scope.parentElement));
                        scope.focus = false;
                    }
                });

                /*
    			 * Validate field whene validate is set to true
    			 */
                var onValidate = scope.$watch('validate', function (newValue) {
                    if (newValue != undefined && newValue) {
                        scope.validateRules();
                    }
                });

                /*
    			 * Validate rules
    			 */
                scope.validateRules = function () {
                    //if (scope.$eval(scope.isMandatory)) {
                    //    if ((isNgModelFunction && (scope.ngModel === '' || scope.ngModel === undefined || scope.ngModel === null)) || (!isNgModelFunction && (scope.ngModelCopy === '' || scope.ngModelCopy === undefined || scope.ngModelCopy === null))) {
                    //        scope.validate = true;
                    //        scope.errorMessage = 'Please select an option';
                    //        return;
                    //    }
                    //}

                    scope.validate = false;
                    scope.errorMessage = null;

                    if (scope.rules) {
                        var rules = scope.$eval(scope.rules);
                        var isFoundInvalid = false;

                        for (var i = 0; i < rules.length; i++) {
                            if (typeof rules[i] == 'object') {
                                if (eval((rules[i].rule).replace(/this/g, 'scope.selectedOption'))) {
                                    scope.validate = true;
                                    scope.errorMessage = rules[i].error;
                                    break;
                                }
                                else {
                                    if (!isFoundInvalid) {
                                        RuleEngine.isValid(rules[i], function (e) {
                                            scope.validate = true;
                                            scope.errorMessage = e.errorData.error;
                                            isFoundInvalid = true;
                                        });
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                };

                scope.ngChange = function (selectedOption) {
                    var tmpSelectedOption;
                    if (!scope.$eval(scope.isMandatory) && selectedOption == options[0][scope.displayKey] && scope.optionGroups.length == 0) {
                        tmpSelectedOption = '';
                    }
                    else {
                        for (var i = 0; i < options.length; i++) {
                            if (options[i][scope.dataKey] == selectedOption) {
                                tmpSelectedOption = options[i];
                                break;
                            }
                        }
                    }
                    if (isNgModelFunction) {
                    	if (typeOfNgModel == 'string' || typeOfNgModel == 'number') {
                    		scope.ngModel = tmpSelectedOption[scope.dataKey];
                    	}
                    	else {
                    		scope.ngModel = tmpSelectedOption;
                    	}
                    }
                    else {
                        if (typeOfNgModel == 'string' || typeOfNgModel == 'number') {
                            if (!scope.$eval(scope.isMandatory) && (selectedOption == options[0][scope.displayKey] || selectedOption == undefined || selectedOption == 'fakeOptionId')) {
                                scope.ngModelCopy = '';
                            }
                            else {
                                scope.ngModelCopy = tmpSelectedOption[scope.dataKey];
                            }
                        }
                        else {
                            scope.ngModelCopy = tmpSelectedOption;
                        }
                    }
                    updateView();
                    scope.selectedOption = tmpSelectedOption == '' ? options[0] : angular.copy(tmpSelectedOption);
                    scope.validateRules();
                    $timeout(function () {
                        scope.onChange();
                    });
                };

                scope.$on('$destroy', function () {
                    angular.element("#" + scope.dropDownId).material_select('destroy');
                    onOptions();
                    onDisable();
                    onNgModel();
                    onFocus();
                    onValidate();
                    scope = null;
                    console.log("onSubsectionLoad smartSelect ", scope);
                });
                
            },
            templateUrl: 'shared/directives/uiElements/smartSelect/smartSelectTemplate.html'
        };
    }]);
})();
  /**
   * @memberof SMART2
   * @ngdoc directive
   * @name Sub-section
   * @description This directive is useful for creating subsection with custom behaviour.
   * 
   * @attr {Var} ng-model
   *    Data to be passed to subsection controller. ngModel can be accessed as $scope.ngModel.data. Any modifications done on $scope.ngModel.data will reflect in actual data model.
   * @attr {String} template-url
   *    Template to be rendered inside subsection ui element
   * @attr {Number} colspan
   *    Number of columns to be occupied by this ui element. 1 column is equal to 1 ui element.
   *    Default value is 1.
   *    For e.g. If colspan is set to 2, this ui element will occupy width of 2 ui elements (fields).
   * @attr {Function} on-load
   *    Callback function when subsection is rendered. This is expected to be subsection controller function and parameters which are passed are expected to be form-widget controllers variables.
   * 
   * @example
   Dynamic:
   Controller:
       $scope.config = {
            "modelData": {
                "location": {
                    "address1": "Building no. 3, Mindspace IT park",
                    "address2": "Airoli",
                    "city": "Navi Mumbai",
                    "state": "MH",
                    "country": "India"
                }
            },
            "formConfig": {
                "sections": [
                    {
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "",
                                        "type": "subsection",
                                        "isMandatory": true,
                                        "data": "location",
                                        "templateUrl": "abc.html",
                                        "colspan": 1
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
    
   * @example
    Static:
    Controller:
        $scope.location = { "address1": "Building no. 3, Mindspace IT park", "address2": "Airoli", "city": "Navi Mumbai", "state": "MH", "country": "India" };
       
    Usage:
        <smart-subsection template-url="abc.html" ng-model="location"></smart-subsection> 
   */

(function() {
    'use strict';
    var subsectionId = 0;
    
    angular.module('SMART2').directive('smartSubsection', ['$compile', 'ScrollTo', function ($compile, ScrollTo) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                modelData: '=?',
                templateUrl: '@',
                controller: '@',
                isMandatory: '@',
                isVisible: '=',
                focus: '=?',
                parentElement: '@',
                parentScope: '=?',
                removable: '@',
                formModel: '=?',
            },
            link: function (scope, element, attrs) {
                scope.onLoad = attrs.onLoad;

                subsectionId = subsectionId + 1;
                scope.subsectionId = 'subsection-' + subsectionId;

                scope.ngModel = {
                    data: scope.modelData
                };

                /*
                 *  Listen the changes on model data and update sub-section data
                 */
                var onModelData = scope.$watch('modelData', function (newVal) {
                    scope.ngModel = {
                        data: newVal
                    };
                }, true);

                /*
                 *  Listen the changes send it to parent scope
                 */
                var onNgModelData = scope.$watch('ngModel.data', function (newVal) {
                    scope.modelData = newVal;
                }, true);

                /*
                 * Focus the textfield as soon as the focus is set to true
                 */
                var onFocus = scope.$watch('focus', function (newVal, oldVal) {
                    if (newVal) {
                        ScrollTo.perform(element, angular.element('#' + scope.parentElement));
                        scope.focus = false;
                    }
                });

                scope.isRemovable = scope.$eval(scope.removable) == undefined ? true : scope.$eval(scope.removable);

                if (scope.controller == '') {
                    element.html('<div ng-class="{\'optionalField\': isMandatory == \'false\' && isRemovable}"><div class="optionalFieldHover highlight" ng-if="isMandatory == \'false\' && isRemovable" ng-include="\'shared/directives/uiElements/commonTemplates/optionalFieldRemoveButton.html\'"></div><div ng-include="templateUrl" on-subsection-load></div></div>');
                }
                else {
                    element.html('<div ng-class="{\'optionalField\': isMandatory == \'false\' && isRemovable}"><div class="optionalFieldHover highlight" ng-if="isMandatory == \'false\' && isRemovable" ng-include="\'shared/directives/uiElements/commonTemplates/optionalFieldRemoveButton.html\'"></div><div ng-controller="' + scope.controller + '" ng-include="templateUrl" on-subsection-load></div></div>');
                }
                $compile(element.contents())(scope);

                scope.$on('$destroy', function () {
                    onModelData();
                    onNgModelData();
                    onFocus();
                    scope = null;
                    scope.log("subsection distroyed",scope);
                });
            }
        };
    }]);


    angular.module('SMART2').directive('onSubsectionLoad', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (angular.isDefined(scope.onLoad)) {
                    scope.$eval(scope.onLoad);
                }
                scope.$on('$destroy', function () {
                    scope = null;
                    console.log("onSubsectionLoad Distroyed ", scope);
                });
            }
        };
    }]);
})();    
  /**
   * @memberof SMART2
   * @ngdoc directive
   * @name Switch
   * @description This directive is useful for creating a switch.
   *
   * @attr {String} label
   *    Label to be displayed for identification of this ui element
   * @attr {Boolean} ng-model
   *    Switch's default state (selected or unselected)
   * @attr {Object} ng-model-options
   *    https://docs.angularjs.org/api/ng/directive/ngModelOptions. 
   *    <a href="SMART2.Textfield.html">Click here</a> and scoll down to 'Textfield with ng-model-options' to see example reference.
   * @attr {Boolean} disable
   *    If value of this attribute is set to true, switch will not be clickable
   * @attr {Boolean} focus 
   *    If set to true, this ui element will be focused
   * @attr {Boolean} validate
   *    If set to true, this ui element will be validated on the basis of rules passed to it
   * @attr {Array} rules 
   *    Rules to be evaluated when this element's blur event is fired. A rule must have 'rule' and 'errorMessage' properties (keys).
   *    'rule' must be a condition or group of conditions. 'errorMessage' will be the message to be displayed when corresponding rule fails. See example for more.
   * @attr {String} error-message 
   *    Error message to be displayed. This attribute can be set at any point to display an error message.
   * @attr {Boolean} is-mandatory 
   *    If set to true, default error message will be displayed when blur event is fired and this ui element is left blank
   * @attr {Boolean} is-visible 
   *    If set to true, this ui element will be displayed on form regardless of 'is-mandatory' property's value. 
   *    This ui element can be removed from form by clicking 'x' button on top right corner of this ui element.
   * @attr {Number} colspan
   *    Number of columns to be occupied by this ui element. 1 column is equal to 1 ui element.
   *    Default value is 1.
   *    For e.g. If colspan is set to 2, this ui element will occupy width of 2 ui elements (fields).
   * @attr {Function} on-change
   *    Callback function when switch state is changed 
   * 
   * @example
   Dynamic:
   Controller:
       $scope.config = {
            "modelData": {
                "isUrgent": true
            }, 
            "formConfig": {
                "sections": [
                    {
                        "isMandatory": true,
                        "rows": [
                            {
                                "properties": [
                                    {
                                        "label": "Urgent",
                                        "type": "switch",
                                        "isMandatory": true,
                                        "data": "isUrgent",
                                        "colspan": 1,
                                        "onChange": "onChange"  //  controller function ,
                                        "rules": [
                                            { 
                                                "rule": "this == true", 
                                                "error": "Checkbox should not be selected" 
                                            }
                                        ]
                                    }
                                ]    
                            }
                        ]
                    }
                ]
            }
        };
    Usage:
        <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
   
   * @example
   Static:
   Controller:
       $scope.isUrgent = true;
       $scope.onChange = function(isUrgent) {
           console.log(isUrgent);
       };
   Usage:
       <smart-switch label="Urgent" ng-model="isUrgent" on-change="onChange(isUrgent)"></smart-switch>
       
   * @example
   Disabled switch:
   <smart-switch disable="true"></smart-switch>     
   */
  
(function() {
    'use strict';
    
    angular.module('SMART2').directive('smartSwitch', ['$timeout', 'ScrollTo', 'RuleEngine', function ($timeout, ScrollTo, RuleEngine) {
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            scope: {
                //ngModel: '=?',
                disable: '@',
                isMandatory: '@',
                isVisible: '=?',
                label: '@',
                rightLabel: '=?',
                leftLabel:'=?',
                minHeight: '@',
                fill: '@',
                rules: '@',
                validate: '=?',
                focus: '=?',
                parentElement: '@',
                errorMessage: '@',
                onChange: '&',
                removable: '@'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.isRemovable = scope.$eval(scope.removable) == undefined ? true : scope.$eval(scope.removable);
    
                scope.fill = scope.$eval(scope.fill) == undefined ? true : scope.$eval(scope.fill);
                scope.leftLbl = "Off";
                scope.rightLbl = "On";

                if (typeof scope.leftLabel != "undefined")
                    scope.leftLbl = scope.leftLabel;
                if (typeof scope.rightLabel!="undefined")
                    scope.rightLbl = scope.rightLabel;


                /*
                 *  Following code has been added to make ng-model-options work
                 *  ngModelCtrl.$render & ngModelCtrl.$setViewValue serve the purpose
                 */
                try {
                    ngModelCtrl.$render = function () {
                        scope.ngModel = ngModelCtrl.$modelValue;
                    };
                }
                catch (e) { }

                var updateView = function () {
                    try {
                        ngModelCtrl.$setViewValue(scope.ngModel);
                    }
                    catch (e) { }
                };

                
                /*
                 * Focus field when focus is set to true
                 */
                var onFocus = scope.$watch('focus', function(newVal) {
                    if(newVal) {
                        ScrollTo.perform(element, angular.element('#' + scope.parentElement));
                        scope.focus = false;
                    }
                });
                
                /*
                 * Validate field whene validate is set to true
                 */
                var onValidate = scope.$watch('validate', function(newValue) {
                    if(newValue != undefined && newValue) {
                        scope.validateRules();
                    }
                });
                
                /*
                 * Validate rules
                 */
                scope.validateRules = function () {
                    scope.validate = false;
                    scope.errorMessage = null;

                    if (scope.rules) {
                        var rules = scope.$eval(scope.rules);
                        var isFoundInvalid = false;

                        for (var i = 0; i < rules.length; i++) {
                            if (typeof rules[i] == 'object') {
                                if (eval((rules[i].rule).replace(/this/g, 'scope.ngModel'))) {
                                    scope.validate = true;
                                    scope.errorMessage = rules[i].error;
                                    break;
                                }
                                else {
                                    if (!isFoundInvalid) {
                                        RuleEngine.isValid(rules[i], function (e) {
                                            scope.validate = true;
                                            scope.errorMessage = e.errorData.error;
                                            isFoundInvalid = true;
                                        });
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                };
                
                scope.ngChange = function () {
                    updateView();
                    scope.validateRules();
                    $timeout(function() {
                        scope.onChange();
                    });
                };

                scope.$on('$destroy', function () {
                    onFocus();
                    onValidate();
                    scope = null;
                    console.log("smartSwitch distroyed",scope);
                });
            },
            templateUrl: 'shared/directives/uiElements/smartSwitch/smartSwitchTemplate.html'
        };
    }]);
})();    
/**
 * @memberof SMART2
 * @ngdoc directive
 * @name Tabs-control
 * @description This directive is useful for creating a tabs control.
 *
 * @attr {Array} tab-config
 *    Tabs config. Please see example for more.
 * @attr {String} width
 *    Width of tabs holder. Default value is '100%'.
 *
 * @example
 Tabs Config in default case
  $scope.tabsData = [{
 "title" : "Tab 1",
 "contentUrl" : "tab1.html",
 "active" : true
 }, {
 "title" : "Tab 2",
 "contentUrl" : "tab2.html"
 }, {
 "title" : "Tab 3",
 "contentUrl" : "tab3.html"
 }];
 
 *@example
 Controller in case default tab styling is to be overriden(set htmlmode=true and pass template url in tabsUrl):
 $scope.tabsData = [{
 "title" : "Tab 1",
 "contentUrl" : "tab1.html",
 "active" : true,
 "htmlmode":true,
 "tabsUrl":"template1.html"
 }, {
 "title" : "Tab 2",
 "contentUrl" : "tab2.html",
 "htmlmode":true,
 "tabsUrl":"template2.html"
 }, {
 "title" : "Tab 3",
 "contentUrl" : "tab3.html",
 "htmlmode":true,
 "tabsUrl":"template3.html"
 }];

 Usage:
 <smart-tabs tab-config="{{tabsData}}" width="60%" header-template="test_template.html"></smart-tabs>
 */

(function() {
	'use strict';
	var tabsId = 0;

	angular.module('SMART2').directive('smartTabs', ['$timeout','$parse',
	function ($timeout, $parse) {
		return {
			restrict : 'E',
			replace : true,
			scope : true,
			link: function (scope, element, attrs) {
			    var selectionCallback = $parse(attrs.onSelect);
				var tabWidth = attrs.width;
				var tabParent = element.find('.tabparent');
				var currentTab;
				tabParent.css('width', tabWidth);
				$timeout(function() {
					var tabs = element.find('.tabs');
					tabs.tabs();
				});
				scope.stickTabs = false;

				scope.vertical = attrs.vertical;

				//uniqueID
				tabsId = tabsId + 1;
				scope.tabId = "tab-" + tabsId;
				var tabWidthInFloat = parseFloat(tabWidth);
				var remainingWidth = (100 - tabWidthInFloat) + "%";
				//var rightHeaderStyle="{'background-color':'red';'width':"+remainingWidth+";'margin-left'}";
				scope.headerStyle = {
					"width" : remainingWidth,
					"margin-left" : tabWidth,
					"height" : '48px'
				};
				scope.headerTemplate = attrs.headerTemplate;
				attrs.$observe('tabConfig', function(value) {
				    scope.tabConfig = scope.$eval(value);
				    currentTab = (_.find(scope.tabConfig, function(tab) {
				        return tab.active;
				    }));
				    scope.selectedTabContentUrl = currentTab.contentUrl;
				});

				attrs.$observe('stickTabs', function (value) {
				    scope.stickTabs = scope.$eval(value);
				});
				scope.tabClickCallback = function (item) {
				    var returnObject = angular.copy(item);
				    returnObject.previousTab = currentTab;
				    currentTab = item;
				    scope.selectedTabContentUrl = item.contentUrl;
				    if (angular.isFunction(selectionCallback)) {
				        selectionCallback(scope, { 'e': returnObject });
				    }
				    $timeout(function () {
				        scope.$broadcast('scrollTopToBottom', element.find('.scroll-container').outerHeight());
				    }, 800);
				};
				scope.$on('$destroy', function () {
				    scope = null;
				    console.log("smartTabs Distroyed ", scope);
				});
			},
			templateUrl : 'shared/directives/uiElements/smartTabs/smartTabsTemplate.html'
		};
	}]);
})();

/**
 * @memberof SMART2
 * @ngdoc directive
 * @name Textfield
 * @description This directive is useful for creating a textfield or a date-picker or a auto-complete ui element depending upon the 'type' passed.
 * 
 * @attr {String} label
 *    Label to be displayed for identification of this ui element
 * @attr {String} placeholder
 *    Hint text to be displayed in textfield
 * @attr {String} align
 *    Text alignment. Possible values are left, center, right.
 * @attr {Boolean} autocomplete 
 *    This attribute is useful for turning off browser's default autocomplete behaviour
 * @attr {Number} maxlength
 *    Number of characters allowed in textfield
 * @attr {Number} decimalprecision
 *    Number of characters allowed after decimal precision in textfield
 * @attr {Number} min
 *    Minimum value allowed in textfield 
 * @attr {Number} max
 *    Maximum value allowed in textfield
 * @attr {Number} minmaxprecision
 *    Number of characters that should be visible in number type textfield. Internally filter is applied for the given numbers. Data to be sent in array format with 2 array contents 
 * @attr {Var} ng-model
 *    Default value to be displayed in textfield
 * @attr {Object} ng-model-options
 *    https://docs.angularjs.org/api/ng/directive/ngModelOptions
 * @attr {Boolean} focus 
 *    If set to true, this ui element will be focused
 * @attr {Boolean} validate
 *    If set to true, this ui element will be validated on the basis of rules passed to it
 * @attr {Array} rules 
 *    Rules to be evaluated when this element's blur event is fired. A rule must have 'rule' and 'errorMessage' properties (keys).
 *    'rule' must be a condition or group of conditions. 'errorMessage' will be the message to be displayed when corresponding rule fails. See example for more.
 * @attr {String} error-message 
 *    Error message to be displayed. This attribute can be set at any point to display an error message.
 * @attr {Boolean} is-mandatory 
 *    If set to true, default error message will be displayed when blur event is fired and this ui element is left blank
 * @attr {Boolean} is-visible 
 *    If set to true, this ui element will be displayed on form regardless of 'is-mandatory' property's value. 
 *    This ui element can be removed from form by clicking 'x' button on top right corner of this ui element.
 * @attr {Number} colspan
 *    Number of columns to be occupied by this ui element. 1 column is equal to 1 ui element.
 *    Default value is 1.
 *    For e.g. If colspan is set to 2, this ui element will occupy width of 2 ui elements (fields).
 * @attr {String} type 
 *    Type of textfield. Default value is 'text'. Possible values are area (textarea), number, email, date, autocomplete.
 * @attr {Boolean} readonly 
 *    If set to true, textfield cannot be editable. Textfield's blur and focus events will still be fired (default behaviour).
 * @attr {Boolean} disable 
 *    If set to true, textfield cannot be editable. Textfield's blur and focus events will not be fired (default behaviour).
 * @attr {Function} on-focus
 *    Callback function when ui element's focus event is fired
 * @attr {Function} on-blur
 *    Callback function when ui element's blur event is fired
 * @attr {Function} on-key-up
 *    Callback function when ui element's keyup event is fired
 * @attr {Function} on-key-down
 *    Callback function when ui element's keydown event is fired
 * @attr {Function} on-key-press
 *    Callback function when ui element's keypress event is fired
 * @attr {Function} on-enter
 *    Callback function when ENTER (RETURN) key is pressed
 * 
 * @example
 Dynamic:
 Controller:
     $scope.config = {
          "modelData": {
              "companyName": "GEP"
          }, 
          "formConfig": {
              "sections": [
                  {
                      "isMandatory": true,
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "Company name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "isVisible": false,
                                      "data": "companyName",
                                      "colspan": 1,
                                      "validate": false,
                                      "focus": false,
                                      "onFocus": "onFocus",
                                      "onBlur": "onBlur" 
                                      "onChange": "onChange"
                                      "onKeyPress": "onKeyPress"
                                      "onKeyUp": "onKeyUp"
                                      "onKeyDown": "onKeyDown",
                                      "attributes": {
                                          "type": "number"
                                          "maxlength": "",
                                          "decimalprecision": "",
                                          "minmaxprecision": [2,5],
                                          "disable": true,
                                          "readonly": true,
                                          "align": "left",
                                          "placeholder": "",
                                          "autocomplete": false
                                      },
                                      "rules": [
                                          { 
                                              "rule": "this.length > 10", 
                                              "errorMessage": "Length should not be greater than 10" 
                                          }
                                      ]
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          }
      };
  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

 * @example
 Textfield with ng-model-options. This example is applicable only if one wants to use 'ng-model-options' with 'getterSetter' option. Otherwise VM
 does not need to be used as 'ng-model' or 'data'.
 Dynamic:
 Controller:
     var defaultCompanyName = 'GeP';
     this.companyName = function (val) {
         if (val !== undefined) {
             defaultCompanyName = val;
         }
         return defaultCompanyName;
     };

     $scope.config = {
          "modelData": {
              "companyName": "GEP"
          }, 
          "formConfig": {
              "sections": [
                  {
                      "isMandatory": true,
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "Company name",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "isVisible": false,
                                      "data": "controllerVM.companyName",
                                      "attributes": {
                                          "ngModelOptions": { getterSetter: true }
                                      },
                                      "rules": [
                                          { 
                                              "rule": "this.length > 10", 
                                              "errorMessage": "Length should not be greater than 10" 
                                          }
                                      ]
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          }
      };
  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

 * @example
 Textfield with ng-model-options. This example is applicable only if one wants to use 'ng-model-options' with 'getterSetter' option. Otherwise VM
 does not need to be used as 'ng-model' or 'data'.
 Static:
 Controller:
     angular.module('SMART2', []).controller('textFieldController', ['$scope', function($scope) {
         var defaultCompanyName = 'GeP';
         this.companyName = function (val) {
             if (val !== undefined) {
                 defaultCompanyName = val;
             }
             return defaultCompanyName;
         };
     }]);
  Usage:
      <div ng-controller="textFieldController as textFieldVM">
        <smart-textfield ng-model="textFieldVM.companyName" ng-model-options="{getterSetter: true}"></smart-textfield>
      </div>

 * @example
 Static:
 Controller:
      $scope.companyName = "GEP";
 Usage:
      <smart-textfield label="First name" ng-model="companyName"></smart-textfield>
      
 * @example
 Textfield with events: 
 '$event' passed in callback functions in following example is angular event. 
  <smart-textfield on-focus="onFocus()" 
                   on-blur="onBlur()" 
                   on-change="onChange($event)"
                   on-key-press="onKeyPress($event)"
                   on-key-up="onKeyUp($event)"
                   on-key-down="onKeyDown($event)"></smart-textfield>        
 */


/**
 * @memberof SMART2
 * @ngdoc directive
 * @name Date-picker
 * @description This directive is useful for creating a date picker. This directive is derived from 'textfield' directive. All the attributes of 'textfield' directive are applicable to this directive. Following are some additional attributes.
 * 
 * @attr {String} format 
 *    Date format. For e.g. dd/MM/yyyy. For more details browse https://docs.angularjs.org/api/ng/filter/date
 * @attr {Var} ng-model
 *    Default date to be displayed. 'ng-model' is expected to be in milliseconds (timestamp) or javascript date. For e.g. 5656534324368 or "2014-09-18T10:03:58" or "Fri Mar 04 2016 13:10:56 GMT+0530 (IST)"
 * 
 * @example
 Dynamic: (Timestamp)
 Controller:
     $scope.config = {
          "modelData": {
              "date": 1457094173954
          }, 
          "formConfig": {
              "sections": [
                  {
                      "isMandatory": true,
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "Date",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "date",
                                      "attributes": {
                                          "type": "date",
                                          "format": "dd/MM/yyyy"
                                      }
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          }
      };
  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

 * @example
 Dynamic: (Javascript date)
 Controller:
     $scope.config = {
          "modelData": {
              "date": "Fri Mar 04 2016 17:50:50 GMT+0530 (IST)"
          }, 
          "formConfig": {
              "sections": [
                  {
                      "isMandatory": true,
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "Date",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "date",
                                      "attributes": {
                                          "type": "date",
                                          "format": "dd/MM/yyyy"
                                      }
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          }
      };
  Usage:
      <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>

 * @example
 Static: (Timestamp)
 Controller:
      $scope.date = 1457094173954;
 Usage:
      <smart-textfield type="date" label="Date" ng-model="date"><smart-textfield> 
      
 * @example
 Static: (Javascript date)
 Controller:
      $scope.date = "Fri Mar 04 2016 17:50:50 GMT+0530 (IST)";
 Usage:
      <smart-textfield type="date" label="Date" ng-model="date"><smart-textfield>         
 */


/**
 * @memberof SMART2
 * @ngdoc directive
 * @name Auto-complete
 * @description This directive is useful for creating an auto-complete ui element. This directive is derived from 'textfield' directive. All the attributes of 'textfield' directive are applicable to this directive. Following are some additional attributes.
 * 
 * @attr {Object} ng-model
 *    Default value to be displayed in textfield. 'ng-model' is expected to be an object having property (key) set in 'datakey' attribute.
 * @attr {Array} filterkeys
 *    An array of properties (keys) on which filtering to be applied. Suggestions will get filtered on the basis of properties (keys) passed in array.
 * @attr {String} optionformat
 *    A single suggestion format (template)
 * @attr {String} displayformat
 *    A format in which the data in textfield to be displayed
 * @attr {Boolean} loading 
 *    This attribute can be used to display a loader while autosuggest data is being fetched from the server.
 * @attr {Function} on-select
 *    Callback when a suggestion is selected
 * 
 * @example
 Dynamic:
 Controller:
     $scope.onChange = function(uiElementConfig) {
          uiElementConfig.attributes.options = [
              {
                  "UserId": 28360,
                  "UserName": "SRUser1@outlook.com",
                  "FirstName": "SR ",
                  "LastName": "User1"
              }, {
                  "UserId": 28977,
                  "UserName": "test1",
                  "FirstName": "Test",
                  "LastName": ""
              }, {
                  "UserId": 57950,
                  "UserName": "HShah",
                  "FirstName": "Harshit",
                  "LastName": "Shah"
              }
          ];
     };
     $scope.onSelect = function(autoSuggestData) {
         console.log(autoSuggestData);
         //   autoSuggestData will be updated every time a new suggestion is chosen. Passing 'model' in 'onSelect' is optional.
     };
     $scope.config = {
          "modelData": {
              "autoSuggestData": { "UserId": 28360, "UserName": "SRUser1@outlook.com", "FirstName": "SR", "LastName": "User1", "title": "SR User1" }
          }, 
          "formConfig": {
              "sections": [
                  {
                      "isMandatory": true,
                      "rows": [
                          {
                              "properties": [
                                  {
                                      "label": "Auto complete",
                                      "type": "textfield",
                                      "isMandatory": true,
                                      "data": "autoSuggestData",
                                      "onChange": "onChange",
                                      "onSelect": "onSelect(autoSuggestData)",
                                      "attributes": {
                                          "type": "autocomplete",
                                          "options": [],
                                          "filterkeys": ["FirstName", "LastName"],
                                          "optionformat": "<span>{FirstName} {LastName}</span>",
                                          "displayformat": "{FirstName} {LastName}",
                                          "loading": false
                                      }
                                  }
                              ]    
                          }
                      ]
                  }
              ]
          }
     };
  Usage:
     <smart-form-widget form-config="config.formConfig" model-data="config.modelData"></smart-form-widget>
 * @example
 Static:
 Controller:
     $scope.autoCompleteData = { "UserId": 28360, "UserName": "SRUser1@outlook.com", "FirstName": "SR", "LastName": "User1", "title": "SR User1" };
     $scope.onChange = function(e) {
          //  Textfield's value can be found in e.data[0].value
          //  See console for more
          console.log(e);
          $scope.options = [
              {
                  "UserId": 28360,
                  "UserName": "SRUser1@outlook.com",
                  "FirstName": "SR ",
                  "LastName": "User1"
              }, {
                  "UserId": 28977,
                  "UserName": "test1",
                  "FirstName": "Test",
                  "LastName": ""
              }, {
                  "UserId": 57950,
                  "UserName": "HShah",
                  "FirstName": "Harshit",
                  "LastName": "Shah"
              }
          ]; 
     };
     $scope.onSelect = function(autoCompleteData) {
         console.log(autoCompleteData);
         //   autoCompleteData will be updated every time a new suggestion is chosen. Passing 'model' in 'onSelect' is optional.
     };
 Usage:
     <smart-textfield type="autocomplete" label="Auto complete" ng-model="autoCompleteData" filterkeys="['FirstName', 'LastName']" optionformat="<span>{FirstName} {LastName}</span>" displayformat="{FirstName} {LastName}" options="options" on-change="onChange($event)" on-select="onSelect(autoCompleteData)"></smart-textfield>
 */

(function () {
    'use strict';
    var textfieldId = 0;

    angular.module('SMART2').directive('smartTextfield', ['$rootScope', '$timeout', 'ScrollTo', 'RuleEngine', function ($rootScope, $timeout, ScrollTo, RuleEngine) {
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            scope: {
                label: '@',
                //ngModel: '=?',
                options: '=?',
                isMandatory: '@',
                isVisible: '=?',
                rules: '@',
                validate: '=?',
                focus: '=?',
                parentElement: '@',
                onChange: '&',
                onFocus: '&',
                onBlur: '&',
                onKeyUp: '&',
                onKeyDown: '&',
                onKeyPress: '&',
                onEnter: '&',
                onSelect: '&',
                onDestroy: '&',
                onDateChange:'&',
                errorMessage: '@',
                setFromGrid: '@',
                //  input element's attribute except for listeners should be in small letters
                type: '@',
                align: '@',
                datanumeric: '@',
                spinner: '@',
                step: '@',
                format: '@',    //  date format
                timePicker: '@', //boolean value if date with time picker
                isValueDateObj: '@',
                readonly: '@',
                disable: '@',
                prefixicon: '@',
                suffixicon: '@',
                maxlength: '@',
                min: '@',
                max: '@',
                charactercounter: '@',
                decimalprecision: '@',
                minmaxprecision: '@',
                placeholder: '@',
                autocomplete: '@',
                removable: '@',
                datakey: '@',
                filterkeys: '@',
                optionformat: '@',
                displayformat: '@',
                width: '@',      //  autosuggest container width
                minchars: '@',   //  autosuggest min chars
                loading: '@',     //  loader while autosuggest data is being fetched
                count: '@'
            },
            link: function (scope, element, attrs, ngModelCtrl) {
                scope.placeholder = scope.placeholder == undefined || scope.placeholder == null ? '' : scope.placeholder;
                scope.ngModel = scope.ngModel == undefined || scope.ngModel == null ? '' : scope.ngModel;
                scope.textAlign = scope.align == undefined || scope.align == null ? 'left' : scope.align;
                scope.suffixicon = ((scope.suffixicon == undefined || scope.suffixicon == null) && scope.type == "date") ? "#icon_Calendar" : scope.suffixicon; //  date picker icon
                var timePicker = (typeof scope.timePicker == undefined ? false : scope.timePicker == 'true' ? true : false);
                scope.format = (scope.format ? scope.format : timePicker ? 'DD/MM/YYYY h:mm' : 'DD/MM/YYYY');
                scope.count = 0;
                var number, rulesValidationEvent;

                var uniqueIDGenerator = function () {
                    var d = new Date().getTime();
                    var uniqueID = 'xx2xxpxxoxx'.replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                    return uniqueID;
                };

                if (attrs.validateOn) {
                    rulesValidationEvent = attrs.validateOn;
                }
                else {
                    rulesValidationEvent = 'blur';
                }


                /*
                 *  Following code has been added to make ng-model-options work
                 *  ngModelCtrl.$render & ngModelCtrl.$setViewValue serve the purpose
                 */
                try {
                    ngModelCtrl.$render = function () {
                        scope.ngModel = ngModelCtrl.$modelValue;
                    };
                }
                catch (e) { }

                var updateView = function () {
                    try {
                        ngModelCtrl.$setViewValue(scope.ngModel);
                    }
                    catch (e) { }
                };


                function checkIfActive() {
                    if(scope.readonly == 'true'){
                        return true;
                    }
                    if (scope.type == 'number' && scope.ngModel !== 0 + '' && scope.placeholder === '' && (scope.ngModel === '' || isNaN(scope.ngModel) || scope.ngModel === undefined || scope.ngModel === null)) {
                        return false;
                    }
                    if (scope.type != 'number' && scope.type != 'autocomplete' && scope.placeholder === '' && (scope.ngModel === '' || scope.ngModel === undefined || scope.ngModel === null)) {
                        return false;
                    }
                    if (scope.type == 'autocomplete' && scope.placeholder === '' && (scope.displayModel === '' || scope.displayModel === undefined || scope.displayModel === null)) {
                        return false;
                    }
                    return true;
                }


                function setPrecisionLimits() {
                    number = scope.ngModel;
                    if (number != undefined) {
                        var arr = (number.toString()).split('e')
                        if (arr.length > 1 && parseInt(arr[1]) < 0) {
                            number = (number).toFixed(6);
                            scope.ngModel = number;
                        }
                        var tempArr = number.toString().split('.');
                        if (tempArr != undefined && tempArr.length > 1) {
                            var preDecimal = tempArr[0];
                            if (preDecimal != 0 && preDecimal.toString().length > 20) {
                                var tempVal = preDecimal.toString().substring(0, 19);
                                scope.ngModel = parseInt(tempVal);
                            }
                        }
                        else {
                            if (number != 0 && number.toString().length > 20) {
                                var tempVal = number.toString().substring(0, 19);
                                scope.ngModel = parseInt(tempVal);
                            }
                        }
                        if (scope.decimalprecision != undefined) {
                            scope.ngModel = parseFloat(parseFloat(scope.ngModel).toFixed(scope.decimalprecision));
                        }
                        else if (scope.minmaxprecision !== undefined && scope.minmaxprecision !== '') {
                            var splitPrecision = JSON.parse(scope.minmaxprecision);
                            if (splitPrecision.length > 2 || splitPrecision.length < 1)
                                return;
                            var lowerPrecisionLimit = splitPrecision[0];
                            var highPrecisionLimit = splitPrecision[1];

                            var postDecimalNumbers = ((scope.ngModel + "").split(".")[1] != undefined) ? (scope.ngModel + "").split(".")[1].length : 0;

                            if (postDecimalNumbers == 0)
                                return;

                            if (lowerPrecisionLimit > postDecimalNumbers && postDecimalNumbers < highPrecisionLimit && postDecimalNumbers != 0) {
                                scope.ngModel = parseFloat(parseFloat(scope.ngModel).toFixed(lowerPrecisionLimit));
                            }
                            else if (postDecimalNumbers >= highPrecisionLimit && postDecimalNumbers != 0) {
                                var fixed = Math.pow(10, highPrecisionLimit);
                                scope.ngModel = Math.floor(scope.ngModel * fixed) / fixed;
                            }
                        }
                    }
                }

                scope.isActive = checkIfActive();

                scope.isRemovable = scope.$eval(scope.removable) == undefined ? true : scope.$eval(scope.removable);

                if (attrs.id != undefined || attrs.id != null) {
                    scope.textfieldId = attrs.id;
                    element.removeAttr('id');
                }
                else {
                    textfieldId = uniqueIDGenerator();
                    scope.textfieldId = 'txt-' + textfieldId;
                }

                scope.labelForTextfieldId = 'label-for-' + scope.textfieldId;

                /*
                * Skip tab key focus, if the field is readonly
                */
                $timeout(function () {
                    if (scope.readonly == 'true' && scope.type != 'date') {
                        angular.element('#' + scope.textfieldId).attr('tabindex', -1);
                    }
                });

                /*
                 * Validate the textfield as soon as the validate is set to true
                 */
                var unbindValidate = scope.$watch('validate', function (newVal, oldVal) {
                    if (newVal) {
                        scope.validateRules();
                    }
                });

                /*
                 * Focus the textfield as soon as the focus is set to true
                 */
                var unbindFocus = scope.$watch('focus', function (newVal, oldVal) {
                    if (newVal) {
                        ScrollTo.perform(element, angular.element('#' + scope.parentElement));
                        //  settimeout is added to avoid $digest already in progress
                        setTimeout(function () {
                            angular.element('#' + scope.labelForTextfieldId).trigger('click');
                        });
                        scope.focus = false;
                    }
                });

                /*
                 * Validate textfield rules
                 */
                scope.validateRules = function () {
                    if (scope.readonly == 'true') {
                        scope.isActive = true;
                        return;
                    }
                    if ((scope.type == 'autocomplete' && scope.$eval(scope.isMandatory) && (scope.displayModel == '' || scope.displayModel == null || scope.displayModel == undefined)) || (scope.type != 'autocomplete' && scope.$eval(scope.isMandatory) && (scope.ngModel + '' == '' || scope.ngModel == null || scope.ngModel == undefined))) {
                        scope.validate = true;
                        scope.errorMessage = 'You must enter a value for the attribute';
                        return;
                    }

                    if (scope.type == 'number') {
                        if (!scope.$eval(scope.isMandatory) && isNaN(scope.ngModel)) {
                            angular.element('#' + scope.textfieldId).val('');
                            return;
                        }
                        if (scope.$eval(scope.isMandatory) && isNaN(scope.ngModel) || (!scope.$eval(scope.isMandatory) && number == undefined)) {
                            scope.validate = true;
                            scope.errorMessage = 'This field should be a number';
                            return;
                        }
                    }

                    scope.validate = false;
                    scope.errorMessage = null;

                    if (scope.rules) {
                        var rules = scope.$eval(scope.rules);
                        var isFoundInvalid = false;

                        for (var i = 0; i < rules.length; i++) {
                            if (typeof rules[i] == 'object') {
                                if (eval((rules[i].rule).replace(/this/g, scope.type == 'autocomplete' ? 'scope.displayModel' : 'scope.ngModel'))) {
                                    scope.validate = true;
                                    scope.errorMessage = rules[i].error;
                                    break;
                                }
                            }
                            else {
                                if (!isFoundInvalid) {
                                    RuleEngine.isValid(rules[i], function (e) {
                                        scope.validate = true;
                                        scope.errorMessage = e.errorData.error;
                                        isFoundInvalid = true;
                                    });
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                };


                //  callback events
                var isDateBlank = false;
                scope.ngChange = function (e) {
                    if (scope.type == 'number') {
                        if (scope.ngModel == null || scope.ngModel == undefined)
                            scope.count = 0;
                        setPrecisionLimits();
                    }
                    scope.isActive = checkIfActive();
                    if (rulesValidationEvent == 'change') {
                        scope.validateRules();
                    }

                    if (scope.type != 'autocomplete') {
                        updateView();
                    }

                    //  Value of 'e' is undefined in ng-change
                    scope.onChange({
                        $event: {
                            data: angular.element('#' + scope.textfieldId)
                        }
                    });
                };

                scope.ngFocus = function (e) {
                    scope.isActive = true;
                    if (rulesValidationEvent == 'focus') {
                        scope.validateRules();
                    }
                    scope.onFocus({ $event: e });
                };

                scope.ngBlur = function (e) {
                    if (scope.type == 'number') {
                        if (scope.min != undefined || scope.min != null) {
                            if (scope.ngModel == undefined || scope.ngModel == null || isNaN(scope.ngModel)) {
                                $('#' + scope.textfieldId).val('');
                            }
                        }
                    }
                    if (scope.type == 'date' && isDateBlank) {
                        $timeout(function () {
                            var targetedEle = document.activeElement;
                            if (!(angular.element(targetedEle).hasClass('monthselect') || angular.element(targetedEle).hasClass('yearselect') || angular.element(targetedEle).hasClass('hourselect') || angular.element(targetedEle).hasClass('minuteselect'))) {
                                scope.ngModel = null;
                                scope.dateModel = "";
                            }
                            if (angular.isFunction(scope.onDateChange)) {
                                scope.onDateChange({
                                    $date: scope.ngModel
                                });
                            }
                        });
                    }
                    scope.validateRules();
                    scope.isActive = checkIfActive();

                    //  had to use jQuery because 'active' class does not get removed sometimes even if scope.isActive's value is false
                    scope.isActive || scope.validate ? angular.element('#' + scope.labelForTextfieldId).addClass('active') : angular.element('#' + scope.labelForTextfieldId).removeClass('active');

                    //  had to use jQuery because 'invalid' class does not get removed sometimes even if scope.validate's value is false
                    if (attrs.charactercounter) {
                        scope.validate && scope.errorMessage ? angular.element('#' + scope.textfieldId).addClass('invalid') : angular.element('#' + scope.textfieldId).removeClass('invalid');
                    }
                    scope.focus = false;
                    scope.onBlur({ $event: e });
                };

                scope.ngKeyUp = function (e) {
                    if (scope.type == 'date') {
                        if (e.which != 32) {
                            var currentInputValue = $('#' + scope.textfieldId).val();
                            if (currentInputValue == "") {
                                scope.ngModel = null;
                                scope.dateModel = ""
                                isDateBlank = true;
                                if (angular.isFunction(scope.onDateChange)) {
                                    scope.onDateChange({
                                        $date: scope.ngModel
                                    });
                                }
                            }
                        }
                    }
                    if (rulesValidationEvent == 'keyUp') {
                        scope.validateRules();
                    }
                    scope.onKeyUp({ $event: e });
                };

                scope.ngKeyDown = function (e) {
                    if (rulesValidationEvent == 'keyDown') {
                        scope.validateRules();
                    }
                    scope.onKeyDown({ $event: e });
                };

                scope.ngKeyPress = function (e) {
                    if (scope.type == 'number') {
                        //to control number of +,- signs on number fields
                        if (e.charCode == 45 || e.charCode == 43)
                            e.preventDefault();
                        //to control number of decimal dots in number fields
                        if (e.charCode == 46) {
                            scope.count++;
                            if (scope.count >= 2) {
                                e.preventDefault();
                                scope.count = 1;
                            }
                        }
                        if (scope.min != undefined || scope.min != null) {
                            if (scope.min >= 0 && e.charCode == 45) {
                                e.preventDefault();
                            }
                        }
                    }
                    if (rulesValidationEvent == 'keyPress') {
                        scope.validateRules();
                    }
                    scope.onKeyPress({ $event: e });
                    if (e.charCode == 13) {
                        scope.onEnter({ $event: e });
                    }
                };


                /*
                 * This function is required to generate value attribute 
                 * and useful when up/down key is pressed
                 */
                function getFormattedData(data) {
                    if (!data || data.length == 0) {
                        return [];
                    }
                    for (var i = 0; i < data.length; i++) {
                        var str = displayFormat;
                        try {
                            var parentSplit = str.split('{');
                            for (var j = 0; j < parentSplit.length; j++) {
                                var childSplit = parentSplit[j].split('}');
                                for (var k = 0; k < childSplit.length; k++) {
                                    if (childSplit[k].indexOf('.') > 0 || data[i].hasOwnProperty(childSplit[k])) {
                                        str = str.replace(new RegExp("{" + childSplit[k] + "}", "ig"), eval('data[i].' + childSplit[k]));
                                    }
                                }
                            }
                        }
                        catch (e) { }
                        data[i].value = str.trim();
                    }
                    return data;
                };


                /*
                 * Get plain display data
                 */
                function getDisplayData(data) {
                    if (data == undefined || data == null || data == '') {
                        return '';
                    }
                    var str = displayFormat, evalResult, evaluatedKeysCounter = 0, nullKeysCounter = 0;
                    try {
                        var parentSplit = str.split('{');
                        for (var j = 0; j < parentSplit.length; j++) {
                            var childSplit = parentSplit[j].split('}');
                            for (var k = 0; k < childSplit.length; k++) {
                                if (childSplit[k].indexOf('.') > 0 || data.hasOwnProperty(childSplit[k])) {
                                    evalResult = eval('data.' + childSplit[k]);
                                    evaluatedKeysCounter++;
                                    if (evalResult == undefined || evalResult == null || (evalResult + '').trim().length == 0) {
                                        evalResult = '';
                                        nullKeysCounter++;
                                    }
                                    str = str.replace(new RegExp("{" + childSplit[k] + "}", "ig"), evalResult);
                                }
                            }
                        }
                        if (evaluatedKeysCounter == nullKeysCounter) {
                            str = '';
                        }
                    }
                    catch (e) { }
                    return str === undefined || str === null || str === 'undefined' || str === 'null' ? '' : str;
                }


                /*
                 *  Convert timestamp to UTC timestamp 
                 */
                function toUTC(date) {
                    return Date.UTC(
                        date.getFullYear()
                        , date.getMonth()
                        , date.getDate()
                        , date.getHours()
                        , date.getMinutes()
                        , date.getSeconds()
                        , date.getMilliseconds()
                    );
                };
                scope.isValueDateObj = false;
                var doesContainDateString = false;
                var dateFormate = scope.format;
                function getGridFormatToTimestamp(stringdate) {
                    var tmpModel = (stringdate + '').replace(new RegExp("/", "ig"), '');
                    tmpModel = tmpModel.split('+');
                    tmpModel = eval('new ' + tmpModel[0] + (tmpModel.length > 1 ? ').getTime()' : ''));
                    return moment(tmpModel).format(dateFormate);
                }
                function createDatePicker() {
                    $timeout(function () {
                        var picker = angular.element('#' + scope.textfieldId);
                        var callApplyFuncFlag = true;
                        function setDateFormate(datePar) {
                            isDateBlank = false;
                            if (doesContainDateString) {
                                scope.ngModel = '\/Date(' + (datePar.unix() * 1000) + ')\/';
                            } else {
                                if (scope.isValueDateObj) {
                                    var tempDate = datePar.format();
                                    scope.ngModel = new Date(tempDate);
                                } else {
                                    scope.ngModel = (datePar.unix() * 1000);
                                }
                            }
                            if (angular.isFunction(scope.onDateChange)) {
                                scope.onDateChange({ $date: scope.ngModel });
                            }
                        }
                        var minDate = angular.isDefined(scope.min) ? doesContainDateString ? getGridFormatToTimestamp(scope.min) : moment(parseInt(scope.min)).format(dateFormate) : '';
                        var maxDate = angular.isDefined(scope.max) ? doesContainDateString ? getGridFormatToTimestamp(scope.max) : moment(parseInt(scope.max)).format(dateFormate) : '';
                        picker.daterangepicker({
                            "singleDatePicker": true,
                            "showDropdowns": true,
                            "timePicker": timePicker,
                            "timePicker24Hour": true,
                            "autoApply": false,
                            "opens": "right",
                            "drops": "down",
                            "minDate": minDate,
                            "maxDate": maxDate,
                            "locale": {
                                "format": dateFormate
                        }
                        }, function (start, end, label) {
                            callApplyFuncFlag = false;
                            setDateFormate(end);
                        });
                        picker.on('apply.daterangepicker', function (ev, pickerr) {
                            if (callApplyFuncFlag) {
                                setDateFormate(pickerr.endDate)
                            }
                            callApplyFuncFlag = true;
                        });

                        if (isDateBlank) {
                            picker.val('');
                            scope.ngModel = "";
                        };
                    });
                }

                switch (scope.type) {
                    case 'autocomplete':
                        // key to be used to bind options
                        var filterKeys;
                        if (angular.isDefined(scope.filterkeys) && scope.filterkeys.trim().indexOf('[') == 0) {
                            filterKeys = scope.filterkeys ? scope.$eval(scope.filterkeys) : ['title'];
                        }
                        else {
                            filterKeys = scope.filterkeys ? scope.$eval('[' + scope.filterkeys + ']') : ['title'];
                        }
                        var optionFormat = scope.optionformat ? scope.optionformat : '{title}';
                        var displayFormat = scope.displayformat ? scope.displayformat : '{title}';

                        /*
                         * Check if the options are updated
                         */
                        var unbindOptions = scope.$watch('options', function (newOptions) {
                            try {
                                if (!$('#' + scope.textfieldId).devbridgeAutocomplete()) {
                                    $('#' + scope.textfieldId).devbridgeAutocomplete({
                                        filterKeys: filterKeys,
                                        optionFormat: optionFormat,
                                        displayFormat: displayFormat,
                                        lookup: getFormattedData(newOptions),
                                        width: scope.width,
                                        minChars: angular.isDefined(scope.minchars) ? parseInt(scope.minchars) : 1,
                                        onSelect: function (suggestion) {
                                            angular.element('#' + scope.labelForTextfieldId).trigger('click');
                                            scope.$evalAsync(function () {
                                                scope.displayModel = getDisplayData(suggestion);
                                                scope.ngModel = suggestion;
                                                updateView();
                                                $timeout(function () {
                                                    scope.onSelect({
                                                        $event: {
                                                            data: suggestion
                                                        }
                                                    });
                                                });
                                            });
                                        }
                                    });
                                }
                                else {
                                    $('#' + scope.textfieldId).devbridgeAutocomplete().setLookup(getFormattedData(newOptions));
                                }
                            }
                            catch (e) { }
                        });

                        /*
                         * Destroy autocomplete on scope destroy
                         */
                        scope.$on('$destroy', function () {
                            if ($('#' + scope.textfieldId).devbridgeAutocomplete()) {
                                $('#' + scope.textfieldId).devbridgeAutocomplete().dispose();
                            }
                            destroyEverythingElse();
                        });
                        break;
                    case 'date':
                        /*
                         * Destroy datepicker on scope destroy
                         */
                        scope.$on('$destroy', function () {
                            angular.element('#' + scope.textfieldId + '_root').remove();
                            destroyEverythingElse();
                        });
                        break;
                    case 'text':
                    case 'area':
                    case 'number':
                        scope.$on('$destroy', function () {
                            destroyEverythingElse();
                        });
                        break;
                }

                /*
                 *  Update 'active' class when textfield's value is updated
                 */
                switch (scope.type) {
                    case 'autocomplete':
                    case 'text':
                    case 'area':
                    case 'number':
                        var unbindNumber = scope.$watch('ngModel', function (newVal) {
                            if (scope.type == 'autocomplete' && angular.isDefined(newVal)) {
                                scope.displayModel = getDisplayData(newVal);
                            }
                            if (scope.type == 'number') {
                                setPrecisionLimits();
                            }
                            scope.isActive = checkIfActive();
                            if (rulesValidationEvent == 'change') {
                                scope.validateRules();
                            }
                            if (scope.type == 'area') {
                                $timeout(function () {
                                    angular.element('#' + scope.textfieldId).trigger('autoresize');
                                });
                            }
                        });
                        break;

                    case 'date':
                        var unbindDateModel = scope.$watch('dateModel', function (newVal) {
                            scope.isActive = checkIfActive();
                            if (rulesValidationEvent == 'change') {
                                scope.validateRules();
                            }
                        });
                        var unbindNgModel = scope.$watch('ngModel', function (newVal) {
                            dateFormate = scope.format.replace(/d/g, 'D').replace(/y/g, 'Y').replace(/E/g, 'd');
                            isDateBlank = false;
                            doesContainDateString = scope.setFromGrid == 'true' ? true : (newVal + '').toLowerCase().indexOf('date') > -1 ? true : false;
                            if (newVal == "" || newVal == null) {
                                newVal = Date.now();
                                isDateBlank = true;
                                scope.isValueDateObj = false;
                            } else {
                                if (doesContainDateString) {
                                    var tmpModel = (newVal + '').replace(new RegExp("/", "ig"), '');
                                    tmpModel = tmpModel.split('+');
                                    tmpModel = eval('new ' + tmpModel[0] + (tmpModel.length > 1 ? ').getTime()' : ''));
                                    scope.dateModel = moment(tmpModel).format(dateFormate);
                                }
                                else {
                                    if (Object.prototype.toString.call(newVal) === '[object Date]') {
                                        scope.isValueDateObj = true;
                                    } else {
                                        newVal = parseInt(newVal);
                                    }
                                }
                            }

                            scope.placeholder = scope.format;
                            
                            if (!isDateBlank) {
                                if (!doesContainDateString) {
                                    scope.dateModel = moment(newVal).format(dateFormate);
                                }
                            } else {
                                scope.dateModel = "";
                            }
                            createDatePicker();
                        });
                        var unbindMin = scope.$watch('min', function (n) {
                            createDatePicker();
                        });
                        var unbindMax = scope.$watch('max', function (n) {
                            createDatePicker();
                        });
                        break;

                    default:
                        var unbindNgModel = scope.$watch('ngModel', function (newVal) {
                            scope.isActive = checkIfActive();
                            if (rulesValidationEvent == 'change') {
                                scope.validateRules();
                            }
                        });
                        break;
                }

                if (scope.datanumeric == 'true') {
                    scope.spinner = typeof attrs.spinner == 'undefined' ? 'true' : scope.spinner;
                    scope.step = typeof attrs.step == 'undefined' ? 1 : scope.step;
                    $timeout(function () {
                        angular.element('#' + scope.textfieldId).inputNumber(scope.spinner, scope.step);
                    });
                }


                function destroyEverythingElse() {
                    element.off(); // deregister all event handlers
                    $('#' + scope.textfieldId).off();
                    $('#' + scope.labelForTextfieldId).off();

                    if (unbindValidate)
                        unbindValidate();
                    if (unbindFocus)
                        unbindFocus();
                    if (unbindOptions)
                        unbindOptions();
                    if (unbindNumber)
                        unbindNumber();
                    if (unbindDateModel)
                        unbindDateModel();
                    if (angular.isFunction(scope.onDestroy)) {
                        scope.onDestroy({});
                    }
                    // Removing contents of HTML from DOM
                    $('#' + scope.textfieldId).remove();
                    $('#' + scope.labelForTextfieldId).remove();
                     ;
                    scope = null;
                    console.log("smart text distroy", scope);
                }
            },
            templateUrl: 'shared/directives/uiElements/smartTextfield/smartTextfieldTemplate.html'
        };
    }]);


    angular.module('SMART2').directive('smartCharacterCount', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (parseInt(attrs.smartCharacterCount) > -1) {
                    element.attr('length', attrs.smartCharacterCount);
                   element.characterCounter();
                }
            }
        }
    }]);

})();
(function () {
    'use strict';
    var smartTimeLineID = 0;
    angular.module('SMART2').directive('smartTimeline', ['$rootScope', '$timeout', 'ScrollTo', 'lookup', function ($rootScope, $timeout, ScrollTo, lookup) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                label: '@',
                ngModel: '=?',
                readonly: '@',
                dateFormat: '@',
                selectable: '@',
                showCurrentTime: '@',
                onSelect: '&',
                onLoad: '&',
                groupOrder: '&'
            },
            link: function (scope, element, attrs) {
                var readonly = (scope.readonly == null || scope.readonly == "undefined") ? false : (scope.readonly == 'true') ? true : false;
                var selectable = (scope.selectable == null || scope.selectable == "undefined") ? true : (scope.selectable == 'true') ? true : false;
                var showCurrentTime = (angular.isDefined(scope.showCurrentTime)) ? (scope.showCurrentTime == 'true') ? true : false : true;
                scope.ngModel = scope.ngModel ? scope.ngModel : null;
                var timeline = null;
                var groupOrderFunc = function (a, b) {
                    if (angular.isDefined(attrs.groupOrder)) {
                        return scope.groupOrder({ $a: a, $b: b });
                    } else {
                        if (angular.isDefined(scope.ngModel[a.id]) && angular.isDefined(scope.ngModel[b.id])) {
                            return scope.ngModel[a.id].lines[0].start - scope.ngModel[b.id].lines[0].start;
                        }
                    }
                };
                scope.timelineID = "TimeLineId-" + smartTimeLineID;
                smartTimeLineID++;
                function isTodayInBetween(s, e) {
                    s = parseInt(s);
                    e = parseInt(e);
                    var d = new Date();
                    var c = d.getTime();
                    if (s < c && c < e) { // running 
                        return 0;
                    }
                    if (e < c) { // ended
                        return -1;
                    }
                    if (c < s) { // not started
                        return 1;
                    }
                }
                function getAngularDateFormat(format) {
                    return format.replace(/d/g, 'D').replace(/y/g, 'Y').replace(/E/g, 'd');
                }
                scope.$watch("ngModel", function (newVal) {
                    scope.ngModel = newVal;
                    var dateFormat = scope.dateFormat ? scope.dateFormat : 'dd/MM/yyyy';
                    dateFormat = getAngularDateFormat(dateFormat);
                    var groups = [];
                    var items = [];
                    var groupItemPeer = [];
                    function formateData() {
                        groups = [];
                        items = [];
                        var k = 0;
                        for (var i = 0; i < scope.ngModel.length; i++) {
                            groups.push({
                                id: i,
                                content: scope.ngModel[i].title,
                                className: (typeof scope.ngModel[i].className === 'undefined') ? "" : scope.ngModel[i].className,
                                style: (typeof scope.ngModel[i].style === 'undefined') ? "" : scope.ngModel[i].style
                            });

                            for (var j = 0; j < scope.ngModel[i].lines.length; j++) {
                                var obj = {
                                    id: k,
                                    group: i
                                }
                                groupItemPeer[k] = j;
                                var flagS = false, flagE = false;
                                var classNamee = "vis-timeline-cstyle-" + (i % 10);
                                if (scope.ngModel[i].lines[j].start != null && scope.ngModel[i].lines[j].start != "" && typeof scope.ngModel[i].lines[j].start != "undefined") {
                                    obj.start = new Date(scope.ngModel[i].lines[j].start * 1);
                                    obj.startFormated = moment.unix(scope.ngModel[i].lines[j].start / 1000).format(dateFormat);
                                    flagS = true;
                                }
                                if (scope.ngModel[i].lines[j].end != null && scope.ngModel[i].lines[j].end != "" && typeof scope.ngModel[i].lines[j].end != "undefined") {
                                    obj.end = new Date(scope.ngModel[i].lines[j].end * 1);
                                    obj.endFormated = moment.unix(scope.ngModel[i].lines[j].end / 1000).format(dateFormat);
                                    flagE = true;
                                }
                                if (flagS && flagE) {
                                    var respo = isTodayInBetween(scope.ngModel[i].lines[j].start, scope.ngModel[i].lines[j].end);
                                    if (respo == -1) {
                                        classNamee = classNamee + " line-ended";
                                    }
                                    if (respo == 1) {
                                        classNamee = classNamee + " line-not-started";
                                    }
                                }
                                var passedClassName = (typeof scope.ngModel[i].lines[j].className === 'undefined') ? "" : scope.ngModel[i].lines[j].className;
                                classNamee = classNamee + " " + passedClassName;
                                obj.className = classNamee;
                                var barStyle = (typeof scope.ngModel[i].lines[j].style === 'undefined') ? "" : scope.ngModel[i].lines[j].style;
                                obj.style = barStyle;
                                if (typeof scope.ngModel[i].lines[j].content === 'undefined') {
                                    obj.content = "<div class='padding5' smart-tooltip title='" + obj.startFormated + " - " + obj.endFormated + "' position='top' delay='500' message='Tooltip message'></div>";
                                } else {
                                    obj.content = scope.ngModel[i].lines[j].content;
                                }
                                items.push(obj);
                                k++;
                            }
                        }
                    }
                    formateData();
                    $timeout(function () {
                        var groupSet = new vis.DataSet(groups);
                        var itemSet = new vis.DataSet(items);
                        var container = document.getElementById(scope.timelineID);
                        if (timeline == null) {
                            timeline = new vis.Timeline(container);
                        }
                        timeline.setGroups(groupSet);
                        timeline.setItems(itemSet);
                        var options = {
                            editable: readonly,
                            groupOrder: groupOrderFunc,
                            selectable: selectable,
                            showCurrentTime: showCurrentTime
                        };
                        timeline.setOptions(options);
                        $timeout(function () {
                            if (angular.isFunction(scope.onLoad)) {
                                scope.onLoad();
                            }
                        }, 2000);
                        timeline.on('select', function (obj) {
                            var props = timeline.getEventProperties(obj.event);
                            var groupObj = (props.group != null) ? scope.ngModel[props.group] : null;
                            var itemObj = (props.item != null) ? scope.ngModel[props.group].lines[groupItemPeer[props.item]] : null;
                            var returnObj = {
                                item: itemObj,
                                group: groupObj,
                                properties: props
                            }

                            if (angular.isFunction(scope.onSelect)) {
                                scope.onSelect({
                                    $res: returnObj
                                });
                            }
                        });
                    });
                }, true);

                scope.$on('$destroy', function () {
                     ;
                    scope = null;
                    console.log("smart text smartTimeline", scope);
                });
            },
            templateUrl: 'shared/directives/uiElements/smartTimeline/smartTimelineTemplate.html'
        };
    }]);
})();
  /**
   * @memberof SMART2
   * @ngdoc directive
   * @name Tooltip
   * @description This directive is useful for creating a tooltip.
   * 
   * @attr {String} position
   *    Tooltip position. Possible values are left, right, top, bottom. Default value is 'left'.
   * @attr {Number} delay
   *    Tooltip delay. Default value is '250'.
   * @attr {String} tooltip
   *    Tooltip message
   * 
   * @example
   Usage:
   <span smart-tooltip position="top" delay="500" message="Tooltip message"></span>
   */

(function () {
    'use strict';
    angular.module('SMART2').directive('smartTooltip', [function () {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                customStyle: "="
            },
            link: function (scope, element, attrs) {
                var onMessage = attrs.$observe('message', function (value) {
                    element.attr('data-tooltip', value);
                });
                element.attr('data-position', attrs.position ? attrs.position : 'left');
                element.attr('data-delay', attrs.delay ? attrs.delay : '50');
                element.attr('data-tooltip', attrs.message ? attrs.message : '');
                element.addClass('tooltipped');
                if (typeof scope.customStyle != "undefined") {
                    var optionsObject = {
                        "customStyle": scope.customStyle
                    };
                }
                element.tooltip(optionsObject);
                element.on('click', function () {
                    element.trigger('mouseleave');
                });
                //  Destroy tooltip on scope destroy
                scope.$on('$destroy', function () {
                    element.tooltip('remove');
                     ;
                    scope = null;
                    console.log("tooltips distroyed", scope);
                    onMessage();
                });
            }
        };
    }]);
})();
(function () {
    'use strict';
    var typeaheadId = 0;
    angular.module('SMART2').directive('smartTypeahead', ['$rootScope', '$timeout', 'ScrollTo', 'lookup', 'RuleEngine', function ($rootScope, $timeout, ScrollTo, lookup, RuleEngine) {
        return {
            restrict: 'E',
            replace: true,
            //     require: '?ngModel',
            scope: {
                label: '@',
                ngModel: '=?',
                options: '=?',
                isMandatory: '@',
                isVisible: '=?',
                rules: '@',
                validate: '=?',
                focus: '=?',
                parentElement: '@',
                onChange: '&',
                onFocus: '&',
                onBlur: '&',
                onKeyUp: '&',
                onKeyDown: '&',
                onKeyPress: '&',
                onEnter: '&',
                onSelect: '&',
                callbackOnIconClick: '&',
                callAddNew: '&',
                lookupOpen: '&',
                lookupHide: '&',
                errorMessage: '@',
                //  input element's attribute except for listeners should be in small letters
                align: '@',
                format: '@',    //  date format
                readonly: '@',
                disable: '@',
                prefixicon: '@',
                maxlength: '@',
                charactercounter: '@',
                decimalprecision: '@',
                minmaxprecision: '@',
                placeholder: '@',
                autocomplete: '@',
                removable: '@',
                datakey: '@',
                filterkeys: '@',
                optionformat: '@',
                displayformat: '@',
                multiselect: '@',
                showLookup: '@',
                infoIcon: '@',
                addnew: '@',
                titleofmodel: '@',
                selecttypeoption: '=?',
                showInfoIcon: '=?',
                defaultselectoption: '@',
                defaultselectiontext: '@',
                width: '@',
                minCharForTrigger: '@'
                //  autosuggest container width
            },
            link: function (scope, element, attrs) {
                scope.placeholder = (scope.placeholder == undefined || scope.placeholder == null) ? '' : scope.placeholder;
                scope.ngModel = (scope.ngModel == undefined || scope.ngModel == null) ? '' : scope.ngModel;
                scope.textAlign = (scope.align == undefined || scope.align == null) ? 'left' : scope.align;
                scope.infoIconFlag = (scope.infoIcon == undefined || scope.infoIcon == null) ? false : true;
                scope.titleofmodel = (scope.titleofmodel == undefined || scope.titleofmodel == null) ? 'Title Of Model' : scope.titleofmodel;
                var multiselect = (scope.multiselect == undefined || scope.multiselect == null) ? false : scope.multiselect=="true"?true:false;
                var showLookup = (scope.showLookup == undefined || scope.showLookup == null) ? true : scope.showLookup == "true" ? true : false;
                var addnew = (scope.addnew == undefined || scope.addnew == null) ? false : scope.addnew == "true" ? true : false;
                var readonly = (scope.readonly == undefined || scope.readonly == null) ? false : scope.readonly == "true" ? true : false;
                var minCharForTrigger = scope.minCharForTrigger ? parseInt(scope.minCharForTrigger): 3;
                var number, rulesValidationEvent;
                scope.disabled = "";
                scope.showInfoIcon = (scope.showInfoIcon == undefined || scope.showInfoIcon == null) ? false : scope.showInfoIcon;

                if (readonly) {
                    scope.disabled = "disabled";
                }
                var uniqueIDGenerator = function () {
                    var d = new Date().getTime();
                    var uniqueID = 'xx2xxpxxoxx'.replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                    return uniqueID;
                };

                function checkIfActive() {
                    if (scope.placeholder === '' && (scope.displayModel === '' || scope.displayModel === undefined || scope.displayModel === null)) {
                        return false;
                    }
                    return true;
                }
                scope.isActive = checkIfActive();
                if (attrs.id != undefined || attrs.id != null) {
                    scope.typeaheadId = attrs.id;
                    element.removeAttr('id');
                }
                else {
                    var typeaheadId = uniqueIDGenerator();
                    scope.typeaheadId = 'typeahead-' + typeaheadId;
                }
                scope.labelFortypeaheadId = 'label-for-' + scope.typeaheadId;

                /*
                * Skip tab key focus, if field is readonly
                */
                $timeout(function () {
                    if (readonly) {
                        angular.element('#' + scope.typeaheadId).attr('tabindex', -1);
                    }
                });

                var unbindFocus = scope.$watch('focus', function (newVal, oldVal) {
                    if (newVal) {
                        ScrollTo.perform(element, angular.element('#' + scope.parentElement));
                        setTimeout(function () {
                            angular.element('#' + scope.labelFortypeaheadId).trigger('click');
                        });
                        scope.focus = false;
                    }
                });
            
                var changeTimeout, keyUpTimeout, keyDownTimeout, keyPressTimeout;
                scope.ngChange = function (e) {
                    scope.isActive = checkIfActive();
                    if (changeTimeout) {
                        $timeout.cancel(changeTimeout);
                    }
                    changeTimeout = $timeout(function () {
                        scope.onChange({
                            $event: {
                                data: angular.element('#' + scope.typeaheadId)
                            }
                        });
                    }, 500);
                };
                scope.ngFocus = function (e) {
                    scope.isActive = true;
                    scope.onFocus({ $event: e });
                };
                scope.ngBlur = function (e) {
                    setValues(scope.ngModel);
                    if (multiselect && scope.ngModel.length > 0) {
                        scope.multiselectFlag = true;
                    }

                    scope.isActive = checkIfActive();
                    scope.onBlur({ $event: e });
                    if (scope.ngModel == undefined || scope.ngModel == null || scope.ngModel == '' || Object.getOwnPropertyNames(scope.ngModel).length === 0) {
                        scope.showInfoIcon = false;
                    } else {
                        scope.showInfoIcon = true;
                    }
                    scope.validateRules();
                };
                scope.ngKeyUp = function (e) {
                    if (multiselect && e.target.value == "") {
                        scope.ngModel = [];
                    }
                    if (!multiselect && e.target.value == "") {
                        scope.ngModel = null;
                    }
                    scope.showInfoIcon = false;
                    if (keyUpTimeout) {
                        $timeout.cancel(keyUpTimeout);
                    }
                    keyUpTimeout = $timeout(function () {
                        scope.onKeyUp({ $event: e });
                    }, 500);
                };
                scope.ngKeyDown = function (e) {
                    scope.showInfoIcon = false;
                    if (keyDownTimeout) {
                        $timeout.cancel(keyDownTimeout);
                    }
                    keyDownTimeout = $timeout(function () {
                        scope.onKeyDown({ $event: e });
                    }, 500);
                };
                scope.ngKeyPress = function (e) {
                    if (keyPressTimeout) {
                        $timeout.cancel(keyPressTimeout);
                    }
                    keyPressTimeout = $timeout(function () {
                        scope.onKeyPress({ $event: e });

                        if (e.charCode == 13) {
                            scope.onEnter({ $event: e });
                        }
                    }, 500);
                };

                scope.clickedOnIcon = function (e) {
                    scope.callbackOnIconClick({ $event: e });
                };

                scope.validateRules = function () {
                    if (scope.readonly == 'true') {
                        scope.isActive = true;
                        return;
                    }
                    scope.validate = false;
                    scope.errorMessage = null;

                    if (scope.rules) {
                        var rules = scope.$eval(scope.rules);
                        var isFoundInvalid = false;
                        for (var i = 0; i < rules.length; i++) {
                            if (typeof rules[i] == 'object') {
                                if (eval((rules[i].rule).replace(/this/g,'scope.displayModel'))) {
                                    scope.validate = true;
                                    scope.errorMessage = rules[i].error;
                                    break;
                                }
                            }
                            else {
                                if (!isFoundInvalid) {
                                    RuleEngine.isValid(rules[i], function (e) {
                                        scope.validate = true;
                                        scope.errorMessage = e.errorData.error;
                                        isFoundInvalid = true;
                                    });
                                }
                                else {
                                    break;
                                }
                            }
                        }
                    }
                };
        
                var unbindValidate = scope.$watch('validate', function (newVal, oldVal) {
                    if (newVal) {
                        scope.validateRules();
                    }
                });

                function getFormattedData(data) {
                    if (!data || data.length == 0) {
                        return [];
                    }
                    for (var i = 0; i < data.length; i++) {
                        var str = displayFormat;
                        try {
                            var parentSplit = str.split('{');
                            for (var j = 0; j < parentSplit.length; j++) {
                                var childSplit = parentSplit[j].split('}');
                                for (var k = 0; k < childSplit.length; k++) {
                                    if (childSplit[k].indexOf('.') > 0 || data[i].hasOwnProperty(childSplit[k])) {
                                        str = str.replace(new RegExp("{" + childSplit[k] + "}", "ig"), eval('data[i].' + childSplit[k]));
                                    }
                                }
                            }
                        }
                        catch (e) { }
                        data[i].value = str.trim();
                    }
                    return data;
                };

                var filterKeys;
                if (angular.isDefined(scope.filterkeys) && scope.filterkeys.trim().indexOf('[') == 0) {
                    filterKeys = scope.filterkeys ? scope.$eval(scope.filterkeys) : ['title'];
                }
                else {
                    filterKeys = scope.filterkeys ? scope.$eval('[' + scope.filterkeys + ']') : ['title'];
                }

                //set optionFormat displayFormat related to filterKeys incase undefined
                scope.filterKeys = scope.$eval(scope.filterkeys);
                function getOpFormate() {
                    var opFor = "";
                    for (var i = 0; i < filterKeys.length; i++) {
                        opFor = opFor + "{" + filterKeys[i] + "} ";
                    }
                    if (opFor == "") {
                        return "{title}";
                    }
                    opFor.trim();
                    return opFor;
                }

                function getDispFormate() {
                    var opDisp = "<span>";
                    for (var i = 0; i < filterKeys.length; i++) {
                        opDisp = opDisp + "{" + filterKeys[i] + "} ";
                    }
                    if (opDisp == "<span>") {
                        return "{title}";
                    }
                    opDisp.trim();
                    opDisp = opDisp + "</span>";
                    return opDisp;
                }

                var optionFormat = scope.optionformat ? scope.optionformat : getDispFormate();
                var displayFormat = scope.displayformat ? scope.displayformat : getOpFormate();

                function getDisplayData(data) {
                    if (data == undefined || data == null || data == '') {
                        return '';
                    }
                    var str = displayFormat, evalResult, evaluatedKeysCounter = 0, nullKeysCounter = 0;
                    try {
                        var parentSplit = str.split('{');
                        for (var j = 0; j < parentSplit.length; j++) {
                            var childSplit = parentSplit[j].split('}');
                            for(var k = 0; k < childSplit.length; k++) {
                                if (childSplit[k].indexOf('.') > 0 || data.hasOwnProperty(childSplit[k])) {
                                    evalResult = eval('data.' + childSplit[k]);
                                    evaluatedKeysCounter++;
                                    if (evalResult == undefined || evalResult == null || (evalResult + '').trim().length == 0) {
                                        evalResult = '';
                                        nullKeysCounter++;
                                    }
                                    str = str.replace(new RegExp("{" +childSplit[k]+ "}", "ig"), evalResult);
                                }
                            }
                        }
                        if (evaluatedKeysCounter == nullKeysCounter) {
                            str = '';
                        }
                    }
                    catch (e) {
                    }
                    return str === undefined || str === null || str === 'undefined' || str === 'null' ? '': str;
                }
                //Function return the array of proprrties Input:"{abc} {dfg}"; Output:["abc","dfg"]
                function getFormatedArray(formatString) {
                    var str = formatString.trim();
                    try {
                        var parentSplit = str.split('{'),propArray = [];
                        for (var j = 0; j < parentSplit.length; j++) {
                            var childSplit = parentSplit[j].split('}');
                            if (j != 0) {
                                propArray.push(childSplit[0].trim());
                            }
                        }
                    }
                    catch (e) { }
                    return propArray === undefined || propArray === null || propArray === 'undefined' || propArray === 'null' ? '' : propArray;
                };
                var formatedArray = getFormatedArray(displayFormat);

                var delimiterVal = null;
                if (multiselect == true) {
                    delimiterVal = /(,|;)\s*/;
                }
                var unbindOptions;
                $timeout(function () {
                    unbindOptions = scope.$watch('options', function (newOptions) {
                        try {
                            if (!readonly) {
                                if (!$('#' + scope.typeaheadId).devbridgeAutocomplete()) {
                                    $('#' + scope.typeaheadId).devbridgeAutocomplete({
                                        filterKeys: filterKeys,
                                        optionFormat: optionFormat,
                                        displayFormat: displayFormat,
                                        lookup: getFormattedData(newOptions),
                                        width: scope.width,
                                        multiselect: multiselect,
                                        showLookup: showLookup,
                                        addnew: addnew,
                                        minChars: minCharForTrigger,
                                        delimiter: delimiterVal,
                                        showNoSuggestionNotice: true,
                                        noSuggestionNotice: "No Data Found",
                                        onSelect: function (suggestion) {
                                            angular.element('#' + scope.labelFortypeaheadId).trigger('click');
                                            scope.$evalAsync(function () {
                                                if (multiselect == true) {
                                                    scope.displayModel = scope.displayModel + getDisplayData(suggestion) + ',';
                                                    scope.ngModel.push(suggestion);
                                                } else {
                                                    scope.displayModel = getDisplayData(suggestion);
                                                    scope.ngModel = suggestion;
                                                }
                                                $timeout(function () {
                                                    scope.onSelect(suggestion);
                                                });
                                            });
                                        },
                                        onClickAddNew: function (e) {
                                            if (addnew) {
                                                scope.callAddNew({ $event: e });
                                                document.body.style.height = document.body.scrollHeight + 2 + "px";
                                                $timeout(function () {
                                                    window.scrollTo(0, (document.body.scrollTop + 1));
                                                    window.scrollTo(0, (document.body.scrollTop - 1));
                                                    document.body.style.height = "";
                                                });
                                            }
                                        },
                                        onClickShowLookup: function (e) {
                                            if (showLookup) {
                                                scope.openLookup();
                                            }
                                        }
                                    });
                                } else {
                                    $('#' + scope.typeaheadId).devbridgeAutocomplete().setLookup(getFormattedData(newOptions));
                                }
                            }
                        }
                        catch (e) { }
                    });
                });

                scope.openLookup = function () {
                	if ($.isFunction(scope.lookupOpen)) {
                		scope.lookupOpen();
                	}
                	var lookupConfig = {
                		modelData: scope.ngModel,
                		config: {
                			mutliselect: multiselect,
                			displayProperties: formatedArray,
                			options: scope.options,
                			addnew: addnew,
                			titleOfModel: scope.titleofmodel,
                			defaultSelectOption: scope.defaultselectoption,
                			defaultSelectionText: scope.defaultselectiontext,
                			selectTypeOption: scope.selecttypeoption,
                			readonly: readonly
                		}
                	}
                	$timeout(function () {
                	    lookup.open(lookupConfig, function (response) {
                	        if (response.addnew) {
                	            if ($.isFunction(scope.callAddNew)) {
                	                scope.callAddNew();
                	            }
                	        }
                			scope.ngModel = response.result;

                			scope.defaultselectiontext = response.defaultSelectionText;
                			scope.selecttypeoption = response.selectTypeOption;
                			if ($.isFunction(scope.lookupHide)) {
                			    scope.lookupHide();
                			}
                		});
                	});
                }
                scope.$on('$destroy', function () {
                    if ($('#' + scope.typeaheadId).devbridgeAutocomplete()) {
                        $('#' + scope.typeaheadId).devbridgeAutocomplete().dispose();
                    }
                    destroyEverythingElse();
                });               

                scope.multiselectFlag = false;

                function setValues(newVal) {
                    scope.mutiselectVal = "";
                    if (angular.isDefined(newVal)) {
                        var valuee = "";
                        if (multiselect == true) {
                            if (newVal.length > 0) {
                                if (showLookup) {
                                    scope.multiselectFlag = true;
                                }
                                if (scope.defaultselectiontext) {
                                	for (var i = 0; i < newVal.length; i++) {
                                		if (newVal[i].name === scope.defaultselectiontext) {
                                			scope.mutiselectVal = getDisplayData(newVal[i]);
                                			break;
                                		}
                                	}
                                } else {
                                	scope.mutiselectVal = getDisplayData(newVal[0]);
                                }
                            	//scope.mutiselectVal = getDisplayData(newVal[0]);
                                var totalEl = newVal.length;
                                if (totalEl > 1) {
                                    scope.mutiselectVal += " + " + (totalEl -1) + " More";
								}
                            } else {
                                scope.multiselectFlag = false;
                            }
                            for (var i = 0; i < newVal.length; i++) {
                                valuee += getDisplayData(newVal[i]) + ",";
                            }
                        } else {
                            valuee = getDisplayData(newVal);
                            scope.showInfoIcon = (valuee == '') ? false : true ;
                        }
                        scope.displayModel = valuee;
                    }
                    scope.isActive = checkIfActive();
                }

                var unbindNumber = scope.$watch("ngModel", function (newVal) {
                    setValues(newVal);
                });
                    function destroyEverythingElse() {
                    element.off(); // deregister all event handlers
                    $('#' +scope.typeaheadId).off();
                    $('#' +scope.labelFortypeaheadId).off();
                    if (unbindFocus)
                        unbindFocus();
                    if (unbindOptions)
                        unbindOptions();
                    if (unbindNumber)
                        unbindNumber();
                        // Removing contents of HTML from DOM
                    $('#' +scope.typeaheadId).remove();
                    $('#' + scope.labelFortypeaheadId).remove();
                     ;
                    scope = null;
                    console.log("typeahead directive distroy",scope);
                }
            },
            templateUrl: 'shared/directives/uiElements/smartTypeahead/smartTypeaheadTemplate.html'
        };
    }]);
})();
(function () {
    'use strict';
    angular.module('SMART2').directive('smartUiGrid', ['$filter', 'gridConfigProvider', 'APPCONSTANTS', 'httpService', 'uiGridConstants', '$injector', function ($filter, gridConfigProvider, APPCONSTANTS, httpService, uiGridConstants, $injector) {
        return {
            restrict: 'AE',
            scope: {
                colDef: '@',
                model: '=',
                callback: '&',
                focusRowCol: '@',
                validationService: '@',
                searchTerm: '@'
            },
            link: function (scope, element, attr) {
                if (scope.validationService != undefined) {
                    var service = $injector.get(scope.validationService);
                    scope.$parent[scope.validationService] = service;
                    scope.cellClassFunction = scope.validationService + ".validateGridRow";
                    scope.cellEditableConditionFunction = scope.validationService + ".isEditableGridRow";
                }
                var gridInstance;
                var defaultGridOptions = {
                    paginationPageSizes: [10, 25, 50, 75],
                    paginationPageSize: 10,
                    enableCellEditOnFocus: true,
                    enableFiltering: true,
                    enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
                    treeRowHeaderAlwaysVisible: false
                };
                var callback = scope.$eval(scope.callback);
                var cellClassFunction = scope.$parent.$eval(scope.cellClassFunction);
                var cellEditableConditionFunction = scope.$parent.$eval(scope.cellEditableConditionFunction);

                scope.gridConfig = defaultGridOptions;
                var modifiedColDef;

                scope.$watch('focusRowCol', function (n, o) {
                   if(n){
                        gridInstance.cellNav.scrollToFocus(n.row.entity,n.col.colDef)
                    }
                });

                scope.$watch('searchTerm', function (n, o) {
                    if (n && typeof n == 'string') {
                        gridInstance.grid.refresh();
                    }
                });

                scope.$watch('colDef', function (n, o) {
                    if (scope.$eval(n)) {
                        modifiedColDef = gridConfigProvider.getMassagedGirdConfig(scope.$eval(n), scope, cellClassFunction, cellEditableConditionFunction);
                        scope.gridConfig.columnDefs = null;
                        scope.gridConfig.columnDefs = modifiedColDef;

                        var groupingCol = _.filter(scope.gridConfig.columnDefs, function (col) { return col.isGrouped;})
                        if (groupingCol && groupingCol.length > 0 && gridInstance) {
                            gridInstance.grouping.clearGrouping();
                            _.each(groupingCol, function (col) {
                                gridInstance.grouping.groupColumn(col.field);
                            });
                        }
                    }
                });

                scope.$watch('model', function (newModel) {
                    if (!newModel) {
                        scope.gridConfig.data = [];
                        return;
                    }
                    var treeColumns = treeViewColumnsToBeCreated(scope.gridConfig.columnDefs);
                    if (treeColumns.length > 0) {
                        scope.gridConfig = angular.extend(scope.gridConfig, {
                            showTreeRowHeader: true,
                            enableRowHeaderSelection: true, // Display checkboxes on every row when it's true
                            showTreeExpandNoChildren: false
                        });
                        var dataModelCopy = sortData(angular.copy(newModel), treeColumns[0].field);
                        scope.gridConfig.data = assignTreeLevel(dataModelCopy, treeColumns[0].field);
                    }
                    else {
                        scope.gridConfig.data = newModel;
                    }
                });


                if (!gridInstance) {
                    scope.gridConfig.onRegisterApi = getGridInstanceCallback;
                }


                /*
                 *  This function will check and return an array of columns for tree view
                 */
                var treeViewColumnsToBeCreated = function (colDefs) {
                    return _.filter(colDefs, function (col) {
                        return col.isTree;
                    });
                };

                /*
                 *  Sort grid data
                 */
                var sortData = function (data, key) {
                    return data.slice(0).sort(function (a, b) {
                        return (eval('a.' + key) > eval('b.' + key)) ? 1 : (eval('a.' + key) < eval('b.' + key)) ? -1 : 0;
                    });
                };

                /*
                 *  Assign tree view since it is required to create a tree view
                 */
                var assignTreeLevel = function (data, key) {
                    var loopedItems = [];
                    for (var i = 0; i < data.length; i++) {
                        data[i].$$treeLevel = 0;
                        if (loopedItems.indexOf(eval('data[i].' + key)) > -1) {
                            data[i].$$treeLevel = 1;
                        }
                        loopedItems.push(eval('data[i].' + key));
                    }
                    return data;
                };

                function getCellValue(row, col) {
                    var data = gridInstance.grid.getCellDisplayValue(row, col);
                    return data ? data.toString() : "";
                };

                function outerSearchCallback(rows, cols) {
                    if (scope.searchTerm && typeof scope.searchTerm == 'string' && scope.searchTerm.length > 0) {
                        _.each(rows, function (row, rowIndex) {
                            var match = false;
                            _.each(cols, function (col) {
                                var cellValue = $filter('translate')(getCellValue(row, col));
                                if (col.colDef.attributes && col.colDef.attributes.type && col.colDef.attributes.type.toLowerCase() == "date") {
                                    var formattedDate = (cellValue).replace(new RegExp("/", "ig"), '');
                                    formattedDate = formattedDate.split('+');
                                    formattedDate = eval('new ' + formattedDate[0] + (formattedDate.length > 1 ? ')' : ''));
                                    var month = formattedDate.getMonth() + 1 + '';
                                    if (month.length === 1) {
                                        month = 0 + '' + month;
                                    }
                                    formattedDate = formattedDate.getDate() + '/' + month + '/' + formattedDate.getFullYear();
                                    var decession = formattedDate.toLowerCase().trim().indexOf(escape(scope.searchTerm).replace(/%5C/g, '').trim()) > -1;
                                    if (decession) {
                                        match = true;
                                    }
                                }
                                else if (cellValue.match(new RegExp(scope.searchTerm, "i"))) {
                                    match = true;
                                }
                            });
                            row.visible = match;
                        });
                    };
                    return rows;
                };


                function getGridInstanceCallback(instance) {
                    if (angular.isFunction(callback)) {
                        callback('gridInstance', instance);
                    }
                    gridInstance = instance;
                    gridInstance.grid.registerRowsProcessor(outerSearchCallback, 200);
                    gridInstance.core.on.rowsRendered(scope, function (row) {
                        setHeightForGrid();
                    });
                    gridInstance.cellNav.on.navigate(scope, function (newRowcol, oldRowCol) {
                        if (newRowcol.col.colDef.isRegFocusCol) {
                            if (angular.isFunction(callback)) {
                                callback('composedGridFocusColumnDispatcher', {
                                    "focusedRowColObj": newRowcol,
                                    "bluredRowColObj": oldRowCol
                                });
                            }
                        }
                    });
                    gridInstance.edit.on.afterCellEdit(scope, function (rowEntity, colDef) {
                        if (colDef.isRegUpdateCol) {
                            if (angular.isFunction(callback)) {
                                callback('composedGridUpdateColumnDispatcher', {
                                    "rowModel": rowEntity,
                                    "colDef": colDef
                                });
                            }
                        }
                    });
                    gridInstance.edit.on.beginCellEdit(scope, function (rowEntity, colDef) {
                        switch (colDef.uiType) {
                            case "dropdown":
                                if (colDef.attributes.serviceObj && colDef.attributes.options.length == 0) {
                                    getDataFolDropDown(colDef, rowEntity)
                                } else {
                                    colDef.attributes.options.map(function (x) { x[colDef.attributes.dataKey] = $filter('translate')(x[colDef.attributes.dataKey]) });
                                    scope.dropDownOptions = colDef.attributes.options;
                                }
                                break;
                        };

                        if (colDef.isRegBeginEditCol) {
                            if (angular.isFunction(callback)) {
                                callback('composedGridBeginEditColumnDispatcher', {
                                    "rowModel": rowEntity,
                                    "colDef": colDef
                                });
                            }
                        }
                    });
                };

                function setHeightForGrid() {
                    var rowCount = gridInstance.core.getVisibleRows(gridInstance.grid).length;
                    var height;
                    if (rowCount == 0) return;
                    if (scope.gridConfig.rowHeight > 0) {
                        height = ((rowCount + 1) * scope.gridConfig.rowHeight) + 54;
                    } else {
                        height = (rowCount * 35) + 54;
                    }
                    $($('.ui-grid')[0]).css({ 'width': '100%', 'height': height });
                    $($('.ui-grid')[0]).find('ui-grid-header-canvas').css("width", "100%");
                    gridInstance.core.handleWindowResize();
                };


                //*****************************************************autoSuggest bindings START*********************************************
                scope.autoSuggestOptions = [];
                scope.autoSuggestOnChange = function (e, col) {
                    var serviceObj = col.colDef.attributes.serviceObj;
                    var req = {
                        method: "GET",
                        url: serviceObj.url,
                        params: JSON.parse(JSON.stringify(serviceObj.param).replace("@term", e.data[0].value)),
                        headers: {
                            "Content-Type": "application/json",
                            "UserExecutionContext": JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails)
                        }
                    };
                    httpService.directhttp(req).then(function (response) {
                        var resp = [];
                        if (typeof response === "string")
                            response = JSON.parse(response);
                        _.each(response, function (obj) {
                            var mapperObj = {};
                            _.each(serviceObj.mapper, function (mapper) {
                                var mapperstri = '';
                                if (angular.isArray(mapper['toBeMapped'])) {
                                    _.each(mapper['toBeMapped'], function (res) {
                                        mapperstri += obj[res] + " ";
                                    });
                                    mapperstri.trim();
                                }
                                else
                                    mapperstri = obj[mapper['toBeMapped']];

                                mapperObj[mapper['key']] = mapperstri;

                            });
                            _.each(serviceObj.staticValues, function (item) {
                                mapperObj[item['key']] = item['value'];
                            });
                            resp.push(mapperObj);
                        });
                        scope.autoSuggestOptions = resp;
                    }, function () {
                    });
                };
                scope.autoSuggestOnSelect = function () {

                };
                //*****************************************************autoSuggest bindings END***********************************************

                //*****************************************************dropDOwn bindings START***********************************************
                scope.isObject = function (val) {
                    return typeof val == 'object';
                }

                scope.dropDownOnChange = function (row, col, val) {
                    if (angular.isFunction(callback)) {
                        callback('composedGridDropDownOnSelectDispatcher', {
                            "row": row,
                            "col": col,
                            "val": val
                        });
                    }
                };

                scope.dropDownOptions = [];
                function getDataFolDropDown(col, row) {
                    var serviceObj = col.attributes.serviceObj;
                    var req = {
                        method: "GET",
                        url: serviceObj.url,
                        params: serviceObj.param,
                        headers: {
                            "Content-Type": "application/json",
                            "UserExecutionContext": JSON.stringify(APPCONSTANTS.userPreferences.UserBasicDetails)
                        }
                    };
                    httpService.directhttp(req).then(function (response) {
                        if (typeof row[col.field] != 'object') {
                            var resp = [];
                            _.each(response, function (x, index) {
                                var obj = {};
                                obj[col.attributes.dataKey] = $filter('translate')(x);
                                obj[col.attributes.idKey] = index;
                                resp.push(obj);
                            });
                            col.attributes.options = resp;
                        } else {
                            col.attributes.options = response;
                        }
                        scope.dropDownOptions = col.attributes.options;
                    }, function () {
                    });
                };
                //*****************************************************dropDOwn bindings END***********************************************
                //*****************************************************popup bindings START***********************************************

                scope.popUpButtonClickCallback = function (row, col) {
                    if (angular.isFunction(callback)) {
                        callback('composedGridPopupButtonClickDispatcher', {
                            "row": row,
                            "col": col
                        });
                    }
                };

                //*****************************************************popup bindings END***********************************************

                //*****************************************************checkBox bindings START***********************************************
                scope.checkBoxOnChange = function (row, col, val) {
                    callback('composedGridCheckBoxOnChangeDispatcher', {
                        "row": row,
                        "col": col,
                        "val": val
                    });
                };
                //*****************************************************checkBox bindings END***********************************************

                scope.$on('$destroy', function () {
                     ;
                    scope = null;
                    console.log("smartUiGrid Distroyed ", scope);
                });

            },
            templateUrl: 'shared/directives/uiElements/smartUiGrid/smartUiGrid.html'
        };
    }]);
})();