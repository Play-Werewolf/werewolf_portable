
export const dict = function(){
    var di = {};
    for (var i = 0; i < arguments.length; i++) {
        di[arguments[i][0]] = arguments[i][1];
    }
    return di;
};

export const Roles = {
    // Town idle
    VILLAGER: "VILLAGER",

    // Town protective
    HEALER: "HEALER",

    // Town informative
    SEER: "SEER",
    SPY: "SPY", // TODO
    INVESTIGATOR: "INVESTIGATOR", // TODO

    // Town killing
    VETERAN: "VETERAN",
    PRIEST: "PRIEST",

    // Werewolves
    WEREWOLF: "WEREWOLF",
    WOLF_SEER: "WOLF_SEER", // TODO

    // Witches
    WITCH: "WITCH",

    // Arsonist
    ARSONIST: "ARSONIST", // TODO

    // Neutral roles
    JESTER: "JESTER",
};

export const RoleNames = dict(
    [Roles.WEREWOLF, "Werewolf"],
    [Roles.VILLAGER, "Villager"],
    [Roles.HEALER, "Healer"],
    [Roles.SEER, "Fortune Teller"],
    [Roles.WITCH, "Witch"],
    [Roles.JESTER, "Jester"],
    [Roles.PRIEST, "Priest"],
    [Roles.VETERAN, "Veteran"],
    [Roles.ARSONIST, "Arsonist"],
    [Roles.WOLF_SEER, "Wolf Seer"],
    [Roles.INVESTIGATOR, "Investigator"],
    [Roles.SPY, "Spy"]
);

export const RoleImages = dict(
    [Roles.WEREWOLF, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418ff3e4b01431efe4b918/1413582835740/?format=500w"],
    [Roles.VILLAGER, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.HEALER, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54419037e4b04f34e6f89f0d/1413582914591/?format=500w"],
    [Roles.SEER, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54419024e4b04f34e6f89ec3/1413582884890/?format=500w"],
    [Roles.WITCH, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.JESTER, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.PRIEST, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.VETERAN, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.ARSONIST, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.WOLF_SEER, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.INVESTIGATOR, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
    [Roles.SPY, "https://static1.squarespace.com/static/532a4886e4b0e5f755112794/t/54418f50e4b0a94c767922f0/1413582672430/?format=500w"],
) // TODO CHANGE WITCH PIC

export const Phases = {
    LOBBY: "LOBBY",
    ROLE_SELECTION: "ROLE_SELECTION",
    PRE_GAME: "PRE_GAME",
    NIGHT_TRANSITION: "NIGHT_TRANSITION",
    NIGHT: "NIGHT",
    DAY_TRANSITION: "DAY_TRANSITION",
    DAY_CALLOUTS: "DAY_CALLOUTS",
    DISCUSSION: "DISCUSSION",
    TRIAL: "TRIAL",
    EXECUTION: "EXECUTION",
    GAME_OVER: "GAME_OVER"
};

export const RoleMessages = dict(
    [Roles.WEREWOLF, "Pick a player to kill"],
    [Roles.VILLAGER, "You are useless"],
    [Roles.HEALER, "Pick a player to heal"],
    [Roles.SEER, "Pick a player to check"],
    [Roles.WITCH, "Pick a player to spell, then pick their new target"],
    [Roles.JESTER, "Pick a player to haunt"],
    [Roles.PRIEST, "Pick a player to kill"],
    [Roles.VETERAN, "Would you like to stay on alert?"],
    [Roles.ARSONIST, "Pick a player to douse or ignite doused players"],
    [Roles.WOLF_SEER, "Pick a player to check"],
    [Roles.INVESTIGATOR, "Pick a player to investigate"],
    [Roles.SPY, "Pick a player to look at"],
);

export const RoleColors = dict(
    [Roles.WEREWOLF, "red"],
    [Roles.VILLAGER, "green"],
    [Roles.HEALER, "green"],
    [Roles.SEER, "green"],
    [Roles.PRIEST, "green"],
    [Roles.VETERAN, "green"],
    [Roles.WITCH, "purple"],
    [Roles.JESTER, "blue"]
);

export const RoleCustomButtons = dict(
    [Roles.VETERAN, [
        ["Alert", true],
        ["Sleep", false]
    ]]
)

export const Presets = {
    "EMPTY": {
        name: "Empty",
        roles: []
    },
    "CLASSIC": {
        name: "Classic",
        roles: [
            Roles.WEREWOLF,
            Roles.HEALER,
            Roles.SEER,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF,
            Roles.VILLAGER,
        ]
    },
    "CLASSIC+": {
        name: "Classic+",
        roles: [
            Roles.WEREWOLF,
            Roles.HEALER,
            Roles.SEER,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF
        ],
    },
    "CHAOS": {
        name: "Chaos",
        roles: [
            Roles.WEREWOLF,
            Roles.HEALER,
            Roles.SEER,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.JESTER,
            Roles.WITCH,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF,
            Roles.VILLAGER,
            Roles.VILLAGER,
            Roles.WEREWOLF
        ]
    }
}
