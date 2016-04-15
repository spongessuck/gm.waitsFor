(function() {
	angular.module('app', ['gm.waitsFor'])
	.run(function($rootScope, $timeout) {
		$timeout(function() {
			$rootScope.value = '1';
		}, 2000);
	});
})();
