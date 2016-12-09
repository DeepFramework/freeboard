
var defineModule = [
];
define(defineModule, function() {
    return {
        name: 'Example-script_main', // Just only a flag which you can get know the javascript object which executed
        exe: function() {
            $(document).ready(function() {
            	alert('一枚程序猿出品');
            });
        }
    }
});
