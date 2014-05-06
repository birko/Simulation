/// <reference path="TimePlan.ts" />
module Simulation.TimePlanFactory {
    var timePlans: Array<TimePlan> = new Array();

    export function clear() {
        timePlans = new Array();
    }

    export function hasTimePlan(name: string): boolean {
        return timePlans[name] !== undefined;
    }

    export function getTimePlan(name: string): TimePlan {
        if (!hasTimePlan(name)) {
            timePlans[name] = new TimePlan();
        }
        return timePlans[name];
    }

    export function removeTimePlan(name: string): TimePlan {
        var result = undefined;
        if (hasTimePlan(name)) {
            result = getTimePlan(name);
            timePlans[name] = undefined;
        }
        return result;
    }
}
