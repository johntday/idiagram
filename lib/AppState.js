AppState = (function() {
    AppState.updateTimeMilliSeconds = 5000;
    AppState.admin = 'johntday';
    AppState.signupcode = 'photon';
    AppState.showSignUpCode = false;
    AppState.version = '0.1.3';
    AppState.splash_username = 'keira';

    AppState.prototype.userTags = [];

    function AppState() {
    }

    //AppState.prototype._deps = {};
    //
    //AppState.prototype.state = 0;
    //
    //function AppState() {
    //    this._deps['state'] = new Deps.Dependency;
    //}
    //AppState.prototype.getState = function() {
    //    this._deps['state'].depend();
    //    return this.state;
    //};
    //AppState.prototype.setState = function(value) {
    //    if (value === this.state) {
    //        return;
    //    }
    //    this.state = value;
    //    return this._deps['state'].changed();
    //};

    AppState.prototype.addTag = function(tag){
        this.userTags.push(tag);
        this.userTags.sort();
        return true;
    };
    AppState.prototype.removeTag = function(tag){
        this.userTags.remove(tag);
        return true;
    };
    AppState.prototype.setTags = function(tags){
        this.userTags = tags;
        return true;
    };
    AppState.prototype.getTags = function(){
        return this.userTags;
    };

    return AppState;
})();
