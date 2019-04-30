Observer = function() {
  var self = this;

  var defaults = {
    debug: false
  };

  // A mapping from selector to class.
  var selectorClassMap = [
    // {
    //   sel: 'div.component',
    //   class: sensible.classes.Component
    // }
  ];

  this.getInsertableSelectors = function() {
    var insertableSelctors = "";
    for( var i in selectorClassMap) {
      i = parseInt(i);
      insertableSelctors += selectorClassMap[i].sel;
      if (typeof selectorClassMap[i+1] !== "undefined") {
         insertableSelctors += ', '
      }
    }
    return insertableSelctors;
  }

  this.add = function(selector, sensibleClass) {
    selectorClassMap.push({
      sel: selector,
      class: sensibleClass
    });
  }

	//Alias in a very Custom Elements way
	this.registerComponent = this.add;

  //Attach a Mutation Observer to the document body
  var observer = new MutationObserver(function(mutations) {
  	mutations.forEach(function(mutation) {

			// For the IEs of the world.
			if (typeof NodeList.prototype.forEach !== 'function')  {
			    NodeList.prototype.forEach = Array.prototype.forEach;
			}

      if (self.debug) {
        console.log('Mutation! - Waterworld (1995)', mutation);
      }

      // These are the added nodes, but only the children to the target
      var addedChildren = mutation.addedNodes;
      // The added children are our first prospective matches. As an array.
      var prospectiveMatches = Array.prototype.slice.call(addedChildren);
      // For each added node, new to the DOM
      for( var i = 0; i < prospectiveMatches.length; i++) {
        var node = prospectiveMatches[i];

        // If this node is not an element..
        if (node.nodeType != 1) {
          // continue trying to find a match
          return true;
        }

        // Try to match the newly added node to a selector
        if (self.debug) {
          console.log('Trying to match node:', node);

  				console.log('Searching for match among ' + selectorClassMap.length + ' selectors');
        }

        for(var j in selectorClassMap) {
          var item = selectorClassMap[j];

					// If you don't have `matches` but you do have `matchesSelector`...
					if (typeof node.matches !== "function" && typeof node.msMatchesSelector === "function") {
						// Let's all agree to call it matches.
						node.matches = node.msMatchesSelector;
					}

					// TODO consider changing the attribute to data on the node.
          if (node.matches(item.sel) && !node.hasAttribute('constructed')) {
            if (self.debug) {
              console.log('About to construct upon ', node);
            }

            var options = {
              el: $(node)
            };
            var aComponent = new item.class(options);
						// Set a flag so that construction doesn't happen repeatedly.
						aComponent.el.attr('constructed', 'true');
            aComponent.el.trigger('complete');

          }
          else {
            if (self.debug) {
              console.log('Mismatch ', node, item.sel);
            }
          }

          // Consider also prospetive matches among the descendants of the target
          if (self.debug) {
            console.log('Attempting to select children', node, item.sel);
          }
          var addedDescendantsMatches = node.querySelectorAll(item.sel);
          if (addedDescendantsMatches.length > 0) {
            if (self.debug) {
              console.log(addedDescendantsMatches.length + ' children found', node, item.sel);
            }
            // Convert NodeList to array for concatenation
            addedDescendantsMatches = Array.prototype.slice.call(addedDescendantsMatches);
            //Treat is as an added node
            prospectiveMatches = prospectiveMatches.concat(addedDescendantsMatches);
          }
          else {
            if (self.debug) {
              console.log('None found', node, item.sel);
            }
          }

        }


      }

  	});
  });

  var observerConfig = {
  	attributes: true,
  	childList: true,
    subtree: true,
  	characterData: true
  };

  observer.observe(document.body, observerConfig);

  this.disconnect = observer.disconnect;

  return this;
}

module.exports = Observer;
