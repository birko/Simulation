var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Simulation;
(function (Simulation) {
    var TimeSimulator = (function (_super) {
        __extends(TimeSimulator, _super);
        function TimeSimulator(timePlan, period) {
            _super.call(this, timePlan);
            this.period = undefined;
            this.pausePeriod = undefined;
            this.timeOut = undefined;
            this.timeOutTime = undefined;
            this.speed = 1;
            this.period = period;
            this.timeOut = undefined;
            this.speed = 1;
        }
        TimeSimulator.prototype.getPeriod = function () {
            return this.period;
        };

        TimeSimulator.prototype.getTikPeriod = function () {
            var tikPeriod = this.getPeriod();
            if (this.pausePeriod != undefined) {
                tikPeriod = this.pausePeriod;
                this.pausePeriod = undefined;
            }
            return tikPeriod / this.getSpeed();
        };

        TimeSimulator.prototype.getSpeed = function () {
            return this.speed;
        };

        TimeSimulator.prototype.setSpeed = function (speed) {
            this.speed = speed;
        };

        TimeSimulator.prototype.setCurrentTime = function (time) {
            _super.prototype.setCurrentTime.call(this, time);
            clearTimeout(this.timeOut);
            this.timeOut = undefined;
            this.timeOutTime = undefined;
            this.simulate();
        };

        TimeSimulator.prototype.pause = function () {
            _super.prototype.pause.call(this);
            clearTimeout(this.timeOut);
            var now = new Date();
            this.pausePeriod = (now.valueOf() - this.timeOutTime.valueOf());
            this.timeOutTime = undefined;
        };

        TimeSimulator.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this.simulate();
        };

        TimeSimulator.prototype.simulate = function () {
            var _this = this;
            if (!this.pause()) {
                this.timeOutTime = new Date();
                var toTime = this.getTikPeriod();
                this.timeOut = setTimeout(function () {
                    var time = _this.getCurretTime() + _this.getPeriod();
                    _this.setCurrentTime(time);
                }, toTime);
            }
        };
        return TimeSimulator;
    })(Simulation.Simulator);
    Simulation.TimeSimulator = TimeSimulator;
})(Simulation || (Simulation = {}));
//# sourceMappingURL=TimeSimulator.js.map
