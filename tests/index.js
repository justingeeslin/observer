const Observer = require('../src/index.js');

describe('Observer', function() {

  beforeAll(function() {
    theObserver = new Observer({
      debug: true
    });
    // Define a component
    SuperComponent = function(options) {
      var self = this;

      var defaults = {};

      $.extend(self, defaults, options);

      return self;
    }
  });

  it('should register a component', function() {
    theObserver.registerComponent('div[super]', SuperComponent);

    expect(theObserver.getInsertableSelectors().indexOf('div[super]') > -1).toBe(true);
  });

  it('should construct the component upon insertion to the document', function(done) {
    // On complete, as it bubbles up from the component
    $(document.body).on('complete', function() {
      console.log('Complete event on body..')
      expect($('div[super]')[0].hasAttribute('constructed')).toBe(true);
      done();
    });

    $(document.body).append('<div super="true">Child</div>');
  });

  it('should construct the component upon insertion to the document with attributes as data members', function(done) {
    superMarkup = $('<div super="true" custom="tree">Child</div>');

    superMarkup.on('complete', function(event, componentObj) {
      console.log('Complete event on body..', event)
      expect(componentObj.super).toBe("true");
      done();
    });

    $(document.body).append(superMarkup);
  });

  it('should construct the component upon insertion to the document, subtree test', function(done) {
    // On complete, as it bubbles up from the component
    $(document.body).on('complete', function() {
      console.log('Complete event on body..')
      expect($('div[super]')[0].hasAttribute('constructed')).toBe(true);
      done();
    });

    $(document.body).append('<div><div super="true">Descendant</div></div>');
  });

  it('should construct the component upon insertion to the document, nested components', function(done) {
    // On complete, as it bubbles up from the component
    var nestedComponentSel = 'div.nested[super]';
    $(document.body).on('complete', nestedComponentSel, function() {
      console.log('Complete event on body..')
      expect($(nestedComponentSel)[0].hasAttribute('constructed')).toBe(true);
      done();
    });

    $(document.body).append('<div><div><!-- Test loops by not having the element to be constructed be the first element --></div><div super="true">Component<div super="true" class="nested">Nested Descendant</div></div></div>');
  });

});
