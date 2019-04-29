# Observer

* Enables declarative Web Components.
* Similar to Custom Elements, but without the need of new HTML tags.

Cross-browser Testing provided by:
<br>
<a href="https://browserstack.com">
![BrowserStack Logo](https://github.com/justingeeslin/observer/blob/master/docs/Browserstack-logo@2x.png?raw=true)
</a>

## Usage
1. Define the Class you'd like to construct upon Node insertion.

```js
SuperComponent = function(options) {
  var self = this;

  var defaults = {};

  $.extend(self, defaults, options);

  return self;
}
```

2. Initialize the Observer.
```js
theObserver = new Observer();
```

3. Register a selector/Class pair
```js
theObserver.registerComponent('div[super]', SuperComponent);
```

4. Insert the element.
```js
$(document.body).append('<div super="true"></div>');
```

 When the element is inserted and it matches the selector, the Class will be constructed upon it.
