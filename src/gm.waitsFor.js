(function() {
  angular.module('gm.waitsFor', [])
  .directive('waitsFor', function() {
		var template;
		var defaultTemplateUrl = 'waitsFor.tpl.html';
		var defaultTemplate = '<span>Loading...</span>';
		return {
			restrict:'A',
			controller:['$scope', '$templateCache', function($scope, $templateCache) {
				template = $templateCache.get(defaultTemplateUrl) || defaultTemplate;
			}],
			link:function(scope, elem, attrs) {
				var contents = elem.contents();
				
				var msgEl;
				var msgTemplate;
				
				if(attrs.waitingTemplate)
					msgEl = angular.element(attrs.waitingTemplate);
				else
					msgEl = angular.element(template);
				
				if(attrs.waitingMessage) {
					if(template == defaultTemplate)
						msgEl.html(attrs.waitingMessage);
					else
						elem.after('<span>' + attrs.waitingMessage + '</span>');
				}
				
				scope.$watch(function() {
					return scope.$eval(attrs.waitsFor);
				}, function(newVal) {
					if(newVal) {
						contents.removeClass('hidden');
						msgEl.remove();
					} else {
						contents.addClass('hidden');
						elem.append(msgEl);
					}
				});
			}
		}
	});
})();
