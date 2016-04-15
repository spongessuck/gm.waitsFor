# 1.1.0

## Features

* Added `gmWaitsForConfigProvider` for global configuration of templates.
* Added `waitsForTemplateUrl` attribute

## Breaking changes

* The directive no longer looks for `waitsFor.tpl.html` to use as a template. It will use a default template unless the template is overwritten or a template URL is provided during configuration using `gmWaitsForConfigProvider`.
* `waitingTemplate` changed to `waitsForTemplate`.
* Removed `waitingMessage` attribute.
* Watcher is automatically cancelled after the value resolves unless the `waitsForPersist` attribute is set to a truthy value.