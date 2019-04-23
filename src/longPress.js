exports.install = function(Vue, options) {
  if (!options) options = {};
  if (!options.duration) options.duration = 2000;

  Vue.directive("long-press", {
    bind: function(el, binding) {
      var self = this;

      this._timeout = null;
      this._touchend = function() {
        clearTimeout(self._timeout);
      };

      this._touchstart = function(e) {
        var context = this;

        self._timeout = setTimeout(function() {
          binding.value.call(context, e);
        }, options.duration);
      };

      el.addEventListener("touchstart", this._touchstart);
      document.addEventListener("touchend", this._touchend);
    },
    unbind: function(el) {
      clearTimeout(this._timeout);
      el.removeEventListener("touchstart", this._touchstart);
      document.removeEventListener("touchend", this._touchend);
    }
  });
};
