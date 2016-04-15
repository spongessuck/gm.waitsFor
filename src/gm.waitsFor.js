(function () {
	angular.module('gm.waitsFor', [])
		.provider('waitsForConfig', waitsForConfigProvider)
		.directive('waitsFor', ['waitsForConfig', waitsForDirective]);

	function waitsForConfigProvider() {
		this.defaultTemplateUrl = function (url) {
			config.defaultTemplateUrl = url;
		};

		this.defaultTemplate = function (templateString) {
			config.defaultTemplate = templateString;
		};

		var config = {
			defaultTemplateUrl: null,
			defaultTemplate: '<span>Loading...</span>'
		};

		this.$get = function () {
			return config;
		};
	}

	function waitsForDirective(config) {
		var template;
		return {
			restrict: 'A',
			controller: ['$templateCache', function ($templateCache) {
				template = config.defaultTemplateUrl ? $templateCache.get(config.defaultTemplateUrl) : config.defaultTemplate;
			}],
			link: function (scope, elem, attrs) {
				var msgEl;
				var msgTemplate;

				if (attrs.waitingTemplate)
					msgEl = angular.element(attrs.waitingTemplate);
				else
					msgEl = angular.element(template);

				if (attrs.waitingMessage) {
					if (template == config.defaultTemplate)
						msgEl.html(attrs.waitingMessage);
					else
						msgTemplate = angular.element('<span>' + attrs.waitingMessage + '</span>');
				}

				var cancelWatch = scope.$watch(function () {
					return scope.$eval(attrs.waitsFor);
				}, function (newVal) {
					if (newVal) {
						elem.contents().removeClass('hidden');
						msgEl.remove();
						if (msgTemplate)
							msgTemplate.remove();

						if (!attrs.hasOwnProperty('waitsForPersist') || !attrs.waitsForPersist)
							cancelWatch();
					} else {
						elem.contents().addClass('hidden');
						elem.append(msgEl);
						if (msgTemplate)
							elem.after(msgTemplate);
					}
				});
			}
		}
	}
})();
