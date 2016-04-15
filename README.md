# gm.waitsFor
AngularJS directive that automatically shows a message or template while a value is loaded asynchronously.

I found I was always making a second element with the inverse ngIf statement from an element where I show data that would just say 'Loading...'.

The waitsFor directive takes care of this automatically, optionally putting in a custom message or template.

# Usage

*The project assumes you're using Bootstrap CSS. If not, you'll need to create a class called 'hidden' that sets display to 'none.'*

Say you have some data you're loading asynchronously. You can use waitsFor to show the element that uses the data only when it's ready and give the user feedback while it's loading:

    <div waits-for='items'>
      <div ng-repeat='item in items'>
        ...
      </div>
    </div>

The directive is similar to ngShow in that it hides the inner HTML of the element until the property is truthy using a 'hidden' class. Because of this, the contents have to be inside elements to be hidden. Text nodes will be unaffected.

By default, it will just show `<span>'Loading...'</span>`. You can also provide your own default template using `waitsForConfigProvider`.

You can also add an attribute `waits-for-template` to show a non-default template, or `waits-for-template-url` to load a non-default template from a file or from `$templateCache`. A template from a URL takes precedence over a string template.

The watcher that checks the value passed in to the `waitsFor` attribute is automatically cancelled after the value resolves to a truthy value. To keep the watcher active, set the `waitsForPersist` attribute to a truthy value.

# Demo
[View on Plunker](http://plnkr.co/edit/oS1nUW?p=preview)

Thanks to @tobiasahlin for spinner.
