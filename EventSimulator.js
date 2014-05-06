var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Simulation;
(function (Simulation) {
    var EventSimulator = (function (_super) {
        __extends(EventSimulator, _super);
        function EventSimulator() {
            _super.apply(this, arguments);
        }
        EventSimulator.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this.simulate();
        };

        EventSimulator.prototype.simulate = function () {
            if (!this.isRunning() || this.isPause()) {
                if (this.isPause()) {
                    this.resume();
                }
                while (!this.isEmpty() && !this.isPause()) {
                    this.setCurrentTime(this.getNextTime());
                }
                if (!this.isPause()) {
                    this.stop();
                }
            }
        };
        return EventSimulator;
    })(Simulation.Simulator);
    Simulation.EventSimulator = EventSimulator;
})(Simulation || (Simulation = {}));
//# sourceMappingURL=EventSimulator.js.map
