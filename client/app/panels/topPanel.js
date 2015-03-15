/*------------------------------------------------------------------------------------------------------------------------------*/
Template.topPanel.helpers({
    toggleWestArrow: function(){
        if ($('#westRightArrowBtnID').hasClass('hide')) {
            $('#westRightArrowBtnID').removeClass('hide');
        } else {
            $('#westRightArrowBtnID').addClass('hide');
        }
    },
    toggleEastArrow: function(){
        if ($('#eastLeftArrowBtnID').hasClass('hide')) {
            $('#eastLeftArrowBtnID').removeClass('hide');
        } else {
            $('#eastLeftArrowBtnID').addClass('hide');
        }
    },
    enableEastPanel: function(){
        return true;
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.topPanel.created = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.topPanel.destroyed = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.topPanel.events({
    'click #westRightArrowBtnID': function(e){
        e.preventDefault();
        toggleWestPanel();
    },
    'click #eastLeftArrowBtnID': function(e){
        e.preventDefault();
        toggleEastPanel();
    }
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.topPanel.rendered = function() {
};
/*------------------------------------------------------------------------------------------------------------------------------*/
