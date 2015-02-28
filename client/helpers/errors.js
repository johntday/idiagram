// Local (client-only) collection
//Errors = new Meteor.Collection(null);

/**
 * Throw error for display
 * messageType can be 'w' (warning) or 'i' (info) or 's' (success) DEFAULT is (danger)
 */
throwError = function(message) {
    Common.scrollToTopOfPageFast();
	//Meteor.MyClientModule.scrollToTopOfPageFast();
	growl( message, {type:'d'} );
}

throwInfo = function(message) {
    Common.scrollToTopOfPageFast();
    //Meteor.MyClientModule.scrollToTopOfPageFast();
    growl( message, {type:'i'} );
}

throwSuccess = function(message) {
    Common.scrollToTopOfPageFast();
    //Meteor.MyClientModule.scrollToTopOfPageFast();
    growl( message, {type:'s'} );
}

growl = function(message, options) {

	var options = $.extend({}, growl_default_options, options);

	var $alert = $('<div>');

	$alert.attr('class', 'bootstrap-growl alert');

	if (options.type) {
		var message_type;
		if (options.type === "i") {
			message_type = "info";
		} else 	if (options.type === "w") {
			message_type = "warning";
		} else 	if (options.type === "s") {
			message_type = "success";
		} else 	if (options.type === "d") {
			message_type = "danger";
		} else {
			message_type = "danger";
		}

		$alert.addClass('alert-' + message_type);
	}

	if (options.allow_dismiss) {
		$alert.append('<a class="close" data-dismiss="alert" href="#">&times;</a>');
	}

	$alert.append(message);

	// Prevent BC breaks
	if (options.top_offset) {
		options.offset = {from: 'top', amount: options.top_offset};
	}

	// calculate any 'stack-up'
	var offsetAmount = options.offset.amount;
	$('.bootstrap-growl').each(function() {
		offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
	});

	css = {
		'position': (options.ele == 'body' ? 'fixed' : 'absolute'),
		'margin': 0,
		'z-index': '9999',
		'display': 'none'
	};
	css[options.offset.from] = offsetAmount + 'px';
	$alert.css(css);

	if (options.width !== 'auto') {
		$alert.css('width', options.width + 'px');
	}

	// have to append before we can use outerWidth()
	$(options.ele).append($alert);

	switch(options.align) {
		case 'center':
			$alert.css({
				'left': '50%',
				'margin-left': '-' + ($alert.outerWidth() / 2) + 'px'
			});
			break;
		case 'left':
			$alert.css('left', '20px');
			break;
		default:
			$alert.css('right', '20px');
	}

	$alert.fadeIn();
	// Only remove after delay if delay is more than 0
	if(options.delay > 0){
		$alert.delay(options.delay).fadeOut(function() {
			$(this).remove();
		});
	}

};

var growl_default_options = {
	ele: 'body',
	type: 'd',
	offset: {from: 'top', amount: 60},
	align: 'right', // (left, right, or center)
	width: 400,
	delay: 4000,
	allow_dismiss: true,
	stackup_spacing: 10
};
