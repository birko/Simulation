/// <reference path="TimePlan.ts" />
module Simulation.TimePlanFactory {
    "use strict";
    var timePlans: Array<TimePlan> = new Array();

    export function clear(): void {
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
        var result:TimePlan = undefined;
        if (hasTimePlan(name)) {
            result = getTimePlan(name);
            timePlans[name] = undefined;
        }
        return result;
    }
}
