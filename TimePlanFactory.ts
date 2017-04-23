/// <reference path="TimePlan.ts" />
/// <reference path="..\DataStructures\Types.ts" />
module Simulation {
    "use strict";
    export module TimePlanSingleton {
        var instance: TimePlanFactory = null;

        export function getInstance(): TimePlanFactory {
            if (instance === null || instance === undefined) {
                instance = new TimePlanFactory();
            }
            return instance;
        }
    }

    export class TimePlanFactory extends DataStructures.AbstractFactory<TimePlan> {}
}
