import Player from './objects/player';
import PositionComponent from './objects/components/position';
import {EntityStore} from './entities';
import {Events, EventType} from './events';
import ClientSocket from './client-socket';

export enum ScreenType {
    Normal = "NORMAL",
    Insert = "INSERT",
    MainMenu = "MAIN-MENU",
};

export type GlobalContext = {
    display: {
        width: number;
        height: number;
    };
    activePlayers: {
        [key: string]: PositionComponent,
    };
};

export type LocalContext = {
    isServer: boolean;
    screen: ScreenType;
    player: Player;
    store: EntityStore;
    events: Events;
    socket: ClientSocket;
    id: number;
};

// TODO: Determine if I want this...
export const GameContext = {
    bulletSpeedHor: 3,
    bulletSpeedVert: 2,
    bulletDistanceHor: 30,
    bulletDistancesVert: 20,
};

let contextId = 0;

export function createLocalContext({
    screen,
    store,
    events,
    player,
    socket,
    isServer,
}: {
    screen?: ScreenType,
    store?: EntityStore,
    events?: Events,
    player?: Player,
    socket?: ClientSocket,
    isServer?: boolean,
} = {}): LocalContext {
    const out = {
        get screen() {
            return screen;
        },
        set screen(s: ScreenType) {
            screen = s;
            if (out.events) {
                out.events.emit({
                    type: EventType.ScreenTypeChanged
                });
            }
        },
        player,
        socket,
        events,
        store,
        isServer: !!isServer,
        id: contextId++,
    } as LocalContext;

    return out;
}

export default {
    display: {
        width: 80,
        height: 24,
    },
    activePlayers: {}
} as GlobalContext;

