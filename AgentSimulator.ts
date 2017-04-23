/// <reference path="TimePlan.ts" />
/// <reference path="Simulator.ts" />
/// <reference path="TimeSimulator.ts" />
/// <reference path="../DataStructures/Types.ts" />
module Simulation {
    "use strict";

    export class Agent extends TimeSimulator {
        private name: string;
        private simulator: AgentSimulator = null;
        private timePlans: string[] = null;

        constructor(name: string, simulator: AgentSimulator, period: number) {
            super(simulator.getTimePlan(name), period);
            this.setSimulator(simulator)
                .setName(name);
        }

        public getName(): string {
            return this.name;
        }

        public setName(name: string): Agent {
            this.name = name;
            return this;
        }

        public getSimulator(): AgentSimulator {
            return this.simulator;
        }

        public setSimulator(simulator: AgentSimulator): Agent {
            this.simulator = simulator;
            return this;
        }
    }

    export class AgentFactory extends DataStructures.AbstractFactory<Agent> {}

    export class AgentSimulator extends AbstractSimulator {
        private agents: AgentFactory = new AgentFactory();
        private timePlanFactory: TimePlanFactory = new TimePlanFactory();

        public addAgent(agent: Agent): AgentSimulator {
            this.agents.set(agent.getName(), agent);
            agent.setSimulator(this);
            return this;
        }

        public getAgent(name: string): Agent {
            return this.agents.get(name);
        }

        public getTimePlan(name: string): TimePlan {
            return this.timePlanFactory.get(name);
        }

        public addEventToAgent(agentName: string, time: number, func: EventFunction = null): AgentSimulator {
            this.agents.get(agentName).addEvent(time, func);
            return this;
        }

        public addEvent(time: number, func: EventFunction = null): AgentSimulator {
            if (this.agents.hasData()) {
                this.agents.getData().getValues()[0].addEvent(time, func);
            }
            return this;
        }

        public setCurrentTime(currentTime: number): AgentSimulator {
            super.setCurrentTime(currentTime);
            this.agents.getItems().forEach((value: Agent, index: number) => {
                if (!value.isPause()) {
                    value.setCurrentTime(currentTime);
                }
            });
            return this;
        }

        public pause(): AgentSimulator {
            super.pause();
            this.agents.getItems().forEach((value: Agent, index: number) => {
                value.pause();
            });
            return this;
        }

        public resume(): AgentSimulator {
            super.resume();
            this.agents.getItems().forEach((value: Agent, index: number) => {
                value.resume();
            });
            return this;
        }

        public stop(): AgentSimulator {
            super.stop();
            this.agents.getItems().forEach((value: Agent, index: number) => {
                value.stop();
            });
            return this;
        }

        public exexute(): AgentSimulator {
            return this.simulate();
        }

        public simulate(): AgentSimulator {
            if (!this.isPause() || !this.isRunning()) {
                this.agents.getItems().forEach((value: Agent, index: number) => {
                    if (!value.pause() || !value.isRunning()) {
                        value.simulate();
                    }
                });
            }
            return this;
        }
    }
}