adrrApp.directive(
	'backstretch',
    function(){
	    return {
		    restrict: 'A',
		    link: function (scope, element, attr) {
			    console.log('eeeeeeee');
			    element.backstretch([attr.bg1,attr.bg2,attr.bg3], {duration: 3000, fade: 750});
		    }
	    };
    }
);