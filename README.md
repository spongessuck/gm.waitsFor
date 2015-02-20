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

The directive is similar to ngShow in that it hides the inner HTML of the element until the property is truthy using a 'hidden' class.

By default, it will just show the message 'Loading...'. You can also add an ngTemplate script to your HTML with id='waitsFor.tpl.html'. Any uses of waitsFor will then load that template to show instead. This allows you to show a custom element or spinner using CSS a la [SpinKit](https://github.com/tobiasahlin/SpinKit).

You can also add an attribute 'waiting-message' to show a custom message, or 'waiting-template-url' to show a non-default template. If you specify a default or custom template **and** also assign a value to waiting-message, the message will appear below the template.

# Demo
[View on Plunker](http://plnkr.co/edit/8qU5ft?p=preview)

Thanks to @tobiasahlin for spinner.

# Pull Requests Welcome

Setting up a config to set default would be nice, as well as supporting actual files instead of $templateCache entries. These aren't something I need, but could be useful for others.
