(function() {
  angular.module('gm.waitsFor', [])
  .directive('waitsFor', function() {
		var defaultTemplateUrl = 'spinner.html';
		var defaultTemplate = '<span>Loading...</span>';
		return {
			restrict:'A',
			controller:['$scope', '$templateCache', function($scope, $templateCache) {
				defaultTemplate = $templateCache.get(defaultTemplateUrl) || defaultTemplate;
			}],
			link:function(scope, elem, attrs) {
				var contents = elem.contents();
				contents.addClass('hidden');
				
				var msgEl;
				
				var waitingTemplate = attrs.waitingTemplate || defaultTemplate;
				
				msgEl = angular.element(waitingTemplate);
				
				if(attrs.waitingMessage) {
					if(waitingTemplate == defaultTemplate)
						msgEl.html(attrs.waitingMessage);
					else
						msgEl.append('<span>' + attrs.waitingMessage + '</span>');
				}
				
				elem.append(msgEl);
				
				var cancelWatch = scope.$watch(function() {
					return scope.$eval(attrs.waitsFor);
				}, function(newVal) {
					if(newVal) {
						cancelWatch();
						contents.removeClass('hidden');
						msgEl.remove();
					}
				});
			}
		}
	});
})();
