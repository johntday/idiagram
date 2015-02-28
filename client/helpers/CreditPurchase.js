bonusMode = {
    mode: 'none',
    dep: new Deps.Dependency,   //save dependent computations here
    get: function () {
        this.dep.depend();  //saves the Deps.currentComputation
        return this.mode;
    },
    set: function (newValue){
        this.mode = newValue;
        this.dep.changed();  //invalidates all dependent computations
        return this.mode;
    }
};

CreditPurchase = (function() {
    CreditPurchase.ORDER_STATE = 0;

    CreditPurchase.prototype._deps = {};

    CreditPurchase.prototype.amountInt = 0;

    CreditPurchase.prototype.state = 0;

    function CreditPurchase() {
        this._deps['state'] = new Deps.Dependency;
    }

    CreditPurchase.prototype.getState = function() {
        this._deps['state'].depend();
        return this.state;
    };

    CreditPurchase.prototype.setState = function(value) {
        if (value === this.state) {
            return;
        }
        this.state = value;
        return this._deps['state'].changed();
    };

    CreditPurchase.prototype.getAmountInt = function() {
        return this.amountInt;
    };

    CreditPurchase.prototype.setAmountInt = function(value) {
        return this.amountInt = value;
    };

    CreditPurchase.prototype.getVat = function() {
        return Math.round(this.amountInt * 0.19);
    };

    CreditPurchase.prototype.getTotal = function() {
        return this.getAmountInt() + this.getVat();
    };

    CreditPurchase.prototype.getName = function() {
        return this.name;
    };

    CreditPurchase.prototype.setName = function(value) {
        return this.name = value;
    };

    CreditPurchase.prototype.getAddress = function(value) {
        return this.address;
    };

    CreditPurchase.prototype.setAddress = function(value) {
        return this.address = value;
    };

    return CreditPurchase;

})();