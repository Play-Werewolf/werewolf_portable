
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
    CREEPY_GIRL: "CREEPY_GIRL",
    DEATH_WITCH: "DEATH_WITCH",

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
    [Roles.SPY, "Spy"],
    [Roles.WOLF_SEER, "Wolf Seer"],
    [Roles.ARSONIST, "Arsonist"],
    [Roles.CREEPY_GIRL, "Creepy Girl"],
    [Roles.DEATH_WITCH, "Death Witch"],

    ["TOWN_INV", "♦ Invest ♦"],
    ["TOWN_ATCK", "♦ Attack ♦"],
    ["TOWN_RAND", "♦ Random ♦"],
    ["WOLF_RAND", "♦ Random ♦"],
    ["RANDOM", "♦ Random ♦"]
);

export const RoleImages = dict(
    [Roles.WEREWOLF,    "/asset/img/role/werewolf.png"],
    [Roles.VILLAGER,    "/asset/img/role/villager.png"],
    [Roles.HEALER,      "/asset/img/role/healer.png"],
    [Roles.SEER,        "/asset/img/role/seer.png"],
    [Roles.WITCH,       "/asset/img/role/witch.png"],
    [Roles.JESTER,      "/asset/img/role/jester.png"],
    [Roles.PRIEST,      "/asset/img/role/priest.png"],
    [Roles.VETERAN,     "/asset/img/role/veteran.png"],
    [Roles.ARSONIST,    "/asset/img/role/arsonist.png"],
    [Roles.WOLF_SEER,   "/asset/img/role/wolf_seer.png"],
    [Roles.INVESTIGATOR,"/asset/img/role/investigator.png"],
    [Roles.SPY,         "/asset/img/role/spy.png"],
    [Roles.CREEPY_GIRL, "/asset/img/role/creepy_girl.png"],
    [Roles.DEATH_WITCH, "/asset/img/role/witch.png"],
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
    [Roles.WOLF_SEER, "Pick a player to check"],
    [Roles.ARSONIST, "Pick a player to douse or ignite your targets"],
    [Roles.CREEPY_GIRL, "Pick a player to give your doll to"],
    [Roles.DEATH_WITCH, "Pick a player to kill"],
);

export const RoleColors = dict(
    [Roles.WEREWOLF, "red"],
    [Roles.WOLF_SEER, "red"],
    [Roles.VILLAGER, "green"],
    [Roles.HEALER, "green"],
    [Roles.SEER, "green"],
    [Roles.SPY, "green"],
    [Roles.INVESTIGATOR, "green"],
    [Roles.PRIEST, "green"],
    [Roles.VETERAN, "green"],
    [Roles.WITCH, "purple"],
    [Roles.CREEPY_GIRL, "purple"],
    [Roles.DEATH_WITCH, "purple"],
    [Roles.JESTER, "blue"],
    [Roles.ARSONIST, "orange"],
    ["TOWN_INV", "green"],
    ["TOWN_ATCK", "green"],
    ["TOWN_RAND", "green"],
    ["WOLF_RAND", "red"],
    ["RANDOM", "white"]
);

export const RoleCustomButtons = dict(
    [Roles.VETERAN, [
        ["Alert", true],
        ["Sleep", false]
    ]],
    [Roles.ARSONIST, [
        ["Ignite", true],
        ["Pass", false]
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
