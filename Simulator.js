/// <reference path="TimePlan.ts" />
var Simulation;
(function (Simulation) {
    var Simulator = (function () {
        function Simulator(timePlan) {
            this.timePlan = null;
            this.currentTime = undefined;
            this.paused = false;
            this.timePlan = null;
            this.currentTime = undefined;
            this.paused = false;
        }
        Simulator.prototype.isPause = function () {
            return this.paused;
        };

        Simulator.prototype.pause = function () {
            this.paused = true;
        };

        Simulator.prototype.resume = function () {
            this.paused = false;
        };

        Simulator.prototype.getNextTime = function () {
            if (this.timePlan !== undefined) {
                return this.timePlan.nextTime;
            }
            return 0;
        };

        Simulator.prototype.isRunning = function () {
            return this.getCurretTime() !== undefined;
        };

        Simulator.prototype.isEmpty = function () {
            if (this.timePlan !== undefined) {
                return this.timePlan.isEmpty();
            }
            return true;
        };

        Simulator.prototype.stop = function () {
            this.timePlan.clear();
            this.currentTime = undefined;
        };

        Simulator.prototype.setCurrentTime = function (currentTime) {
            if (!this.isPause()) {
                this.currentTime = currentTime;
                if (this.getCurretTime() !== undefined) {
                    this.execute();
                }
            }
        };

        Simulator.prototype.getCurretTime = function () {
            return this.currentTime;
        };

        Simulator.prototype.execute = function () {
            var events = new Array();
            var time = this.getNextTime();
            while (this.getNextTime() <= this.getCurretTime()) {
                var event = this.timePlan.removeMinPriorityEvent();
                events.push(event);
            }

            for (var i = 0; i < events.length; i++) {
                throw new Error('Implementation missing');
            }
        };

        Simulator.prototype.addEvent = function (time) {
            if (this.timePlan !== undefined) {
                time += this.getCurretTime();
                var event = new Simulation.Event(time);
                this.timePlan.addEvent(event);
            }
        };
        return Simulator;
    })();
    Simulation.Simulator = Simulator;
})(Simulation || (Simulation = {}));
//# sourceMappingURL=Simulator.js.map
