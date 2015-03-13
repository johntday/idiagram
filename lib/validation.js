/**
 * GENERIC FUNCTIONS
 */
isIntegerBetween = function(value, low, high) {
	var isInt = Match.test(parseInt( value ), Match.Integer);
	if (!isInt)
		return false;

	return (value > low && value < high);
};
validateFieldLength = function(field, fieldLabel, minChars, maxChars) {
	if (! field) {
		throwError('Please add "' + fieldLabel + '"');
		return true;
	}
	if (field.length < minChars || field.length > maxChars) {
		throwError('Please add "' + fieldLabel + '" at least ' + minChars + ' characters, and less than ' + maxChars);
		return true;
	}
	return false;
};
checkFieldLength = function(fieldName, fieldValue, minChars, maxChars) {
	if (! fieldValue || !_.isString(fieldValue) || fieldValue.length < minChars || fieldValue.length > maxChars) {
		return fieldName + ' must be more than ' + (minChars-1) + ' characters, and less than ' + maxChars;
	}
};
checkTitle = function(value) {
	return checkFieldLength('"Title"', value, 10, 128);
};
checkDescription = function(value) {
	return checkFieldLength('"Description"', value, 10, 2048);
};
validatePersonName = function(name) {
	if (name) {
		var nameArray = name.split(" ", 4);
		if (nameArray.length > 1) {/*more than 1 word*/
			for (var i=0; i < nameArray.length; i++) {
				if (nameArray[i].length > 2)/*each word has more than 2 chars*/
					return false;
			}
		}
	}
	throwError('Please enter valid name (e.g. "Mary Poppins")');
	return true;
};
checkForDupOnServer = function(Collection, fieldName, fieldValue, current_id) {
	var selector = {project_id: getProjectId()};
	selector[fieldName] = {$regex: RegExp.quote(fieldValue), $options: 'i'};
	if (current_id)
		selector['_id'] = {$ne: current_id};
	var item = Collection.findOne( selector );
	if ( item )
		return true;
	return false;
};
//-------------------------------------------------------------------------------------------------------------------
/**
 * VALIDATE USERPROFILE
 */
validateUserprof = function(userprof) {
	//var hasInputError = validatePersonName(userprof.name);
	return false;
};
// Transform person before save.
transformUserprof = function(userprof) {
	return userprof;
};

/**
 * VALIDATE Diagram
 */
validateDiagram = function(diagram) {
	return validateFieldLength(diagram.title, 'Title', 3, 128);
};
// Transform diagram before save.
transformDiagram = function(diagram) {
	return diagram;
};

validateTags = function(tags){
    _.each(tags, function(element, index, list){
        if (!Match.test(element, String))
            return false;
        if (!element || element.length == 0 || element.length > 15){
            throwError('Tag must be less than 15 chars');
            return false;
        }
    });
    return true;
};