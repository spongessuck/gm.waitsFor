(function () {
	angular.module('gm.waitsFor', [])
	.provider('waitsForConfig', waitsForConfigProvider)
	.directive('waitsFor', ['waitsForConfig', '$http', waitsForDirective]);

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

		this.$get = function ($templateCache, $http) {
			var templateInCache = config.defaultTemplateUrl && $templateCache.get(config.defaultTemplateUrl);

			if(config.defaultTemplateUrl && !templateInCache) {
				config.templateRequest = $http.get(config.defaultTemplateUrl)
				.success(function(result) {
					config.defaultTemplate = result;
				});
			}
			return config;
		};
	}

	function waitsForDirective(config, $http) {

		return {
			restrict: 'A',
			link: function (scope, elem, attrs) {
				var msgEl;
				var msgTemplate;
				var template = config.defaultTemplate;

				if(attrs.waitsForTemplateUrl) {
					// Template URL passed in as attribute
					$http.get(scope.$eval(attrs.waitsForTemplateUrl))
					.success(templateReady);
				}
				else if(scope.$eval(attrs.waitsForTemplate))
					// Template string passed in as attribute
					templateReady(scope.$eval(attrs.waitsForTemplate));
				else if(config.templateRequest)
					// Template URL passed in as default - continue when ready
					config.templateRequest.success(templateReady);
				else
					// Use default template string
					templateReady(template)

				function templateReady(templateString) {

					msgEl = angular.element(templateString);

					var cancelWatch = scope.$watch(function () {
						return scope.$eval(attrs.waitsFor);
					}, function (newVal) {
						if (newVal) {
							elem.contents().removeClass('hidden');
							msgEl.remove();
							if (msgTemplate)
								msgTemplate.remove();

							if (!attrs.waitsForPersist)
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
	}
})();
