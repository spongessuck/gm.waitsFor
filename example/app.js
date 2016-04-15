(function() {
	angular.module('app', ['gm.waitsFor'])

	// .config(function(waitsForConfigProvider) {
	// 	waitsForConfigProvider.defaultTemplate("<span>Waiting...</span>");
	//	// 'defaultTemplateUrl' takes precedence over 'defaultTemplate'
	// 	waitsForConfigProvider.defaultTemplateUrl("waitsFor.tpl.html");
	// })

	.run(function($rootScope, $timeout) {

		setValue();

		function setValue() {
			$timeout(function() {
				$rootScope.value = '1';
				unsetValue();
			}, 3000);
		}

		function unsetValue() {
			$timeout(function() {
				$rootScope.value = null;
				setValue();
			}, 3000);
		}

	});

})();
