
dialog = function(message, options) {
    var isExist = false;

	var options = $.extend({}, dialog_default_options, options);

	var $alert = $('<div>');

	$alert.attr('class', 'bootstrap-dialog alert');

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

    $alert.append('<hr><div>');
    $alert.append('<button id="dialog-no"  type="button" class="btn btn-default">' + options.no +  '</button> &nbsp;&nbsp;&nbsp;&nbsp;');
    $alert.append('<button id="dialog-yes" type="button" class="btn btn-primary">' + options.yes + '</button>');
    $alert.append('</div>');

    $alert.find('#dialog-yes').click(function(){
        $(this).addClass('disabled');

        options.callback.call(options.context);

        $alert.fadeOut(function() {
            $(this).remove();
        });
    });
    $alert.find('#dialog-no').click(function(){
        $alert.fadeOut(function() {
            $(this).remove();
        });
    });

    // Prevent BC breaks
	if (options.top_offset) {
		options.offset = {from: 'top', amount: options.top_offset};
	}

	// calculate any 'stack-up'
	var offsetAmount = options.offset.amount;
	$('.bootstrap-dialog').each(function() {
        isExist = true;
		offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
	});
    if (isExist)
        return;

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

var dialog_default_options = {
	ele: 'body',
	type: 'i',
	offset: {from: 'top', amount: 60},
	align: 'right', // (left, right, or center)
	width: 400,
	delay: 0,
	allow_dismiss: true,
	stackup_spacing: 10,
    yes: ' Yes',
    no: ' No ',
    context: {},
    callback: function(){return true;}
};
