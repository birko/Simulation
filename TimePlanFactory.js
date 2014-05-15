var Simulation;
(function (Simulation) {
    /// <reference path="TimePlan.ts" />
    (function (TimePlanFactory) {
        "use strict";
        var timePlans = new Array();

        function clear() {
            timePlans = new Array();
        }
        TimePlanFactory.clear = clear;

        function hasTimePlan(name) {
            return timePlans[name] !== undefined;
        }
        TimePlanFactory.hasTimePlan = hasTimePlan;

        function getTimePlan(name) {
            if (!hasTimePlan(name)) {
                timePlans[name] = new Simulation.TimePlan();
            }
            return timePlans[name];
        }
        TimePlanFactory.getTimePlan = getTimePlan;

        function removeTimePlan(name) {
            var result = undefined;
            if (hasTimePlan(name)) {
                result = getTimePlan(name);
                timePlans[name] = undefined;
            }
            return result;
        }
        TimePlanFactory.removeTimePlan = removeTimePlan;
    })(Simulation.TimePlanFactory || (Simulation.TimePlanFactory = {}));
    var TimePlanFactory = Simulation.TimePlanFactory;
})(Simulation || (Simulation = {}));
//# sourceMappingURL=TimePlanFactory.js.map
