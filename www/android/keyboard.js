var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    channel = require('cordova/channel');


var Keyboard = function() {};

Keyboard.hide = function() {
    exec(null, null, "Keyboard", "close", []);
};

Keyboard.show = function() {
    exec(null, null, "Keyboard", "show", []);
};

Keyboard.isVisible = false;

channel.onCordovaReady.subscribe(function() {
    exec(success, null, 'Keyboard', 'init', []);

    function success(msg) {
        var action = msg.charAt(0);
        if (action === 'S') {
            var keyboardHeight = msg.substr(1);
            Keyboard.isVisible = true;
            cordova.fireWindowEvent('keyboardDidShow', { 'keyboardHeight': +keyboardHeight });
        } else if (action === 'H') {
            Keyboard.isVisible = false;
            cordova.fireWindowEvent('keyboardDidHide');
        }
    }
});

module.exports = Keyboard;
