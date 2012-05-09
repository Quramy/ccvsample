(function($){

	var detectNewImage = function(opts) {
		var defaults = {
			async: false,
			interval: 5,
			minNeighbours: 1,
			pre: function(){},
			post: function(){}
		}, conf = $.extend('', defaults, opts);

		return $(this).each(function(){
			var imOrig, internalMain;
			if((imgOrig = $(this).get(0)).nodeName.toLowerCase() !== 'img') return;
			var img = $(this).clone();
			internalMain = function(){
				if (conf.async) {
					ccv.detect_objects({ 'canvas' : ccv.grayscale(ccv.pre(img.get(0))),
														 'cascade' : cascade,
														 'interval' : conf.interval,
														 'min_neighbors' : conf.minNeighbours,
														 'async' : true,
														 'worker' : 1 })(conf.post);
				} else {
					var comp = ccv.detect_objects({ 'canvas' : ccv.grayscale(ccv.pre(img.get(0))),
																				'cascade' : cascade,
																				'interval' : conf.interval,
																				'min_neighbors' : conf.minNeighbours });
																				conf.post(comp);
				}
			};

			if(!img.get(0).complete){
				img.bind('load', internalMain);
			}else{
				internalMain();
			}
		});
	};

	$.fn.extend({'jqfaces':detectNewImage});

})(jQuery);
