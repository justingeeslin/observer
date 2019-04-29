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

      // For each added node, new to the DOM
      mutation.addedNodes.forEach(function(node) {

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

        }
      })

  	});
  });

  var observerConfig = {
  	attributes: true,
  	childList: true,
    // subtree: true,
  	characterData: true
  };

  observer.observe(document.body, observerConfig);

  this.disconnect = observer.disconnect;

  return this;
}

module.exports = Observer;
