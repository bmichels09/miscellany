var directionDefs = [
    {
        name: "north",
        xChange: 0,
        yChange: -1,
        xCross: -1,
        yCross: 0,
        nextDirs: ["northeast", "north", "northwest"]
    },
    {
        name: "northwest",
        xChange: -1,
        yChange: -1,
        xCross: -1,
        yCross: 1,
        nextDirs: ["north", "northwest", "west"]
    },
    {
        name: "west",
        xChange: -1,
        yChange: 0,
        xCross: 0,
        yCross: 1,
        nextDirs: ["northwest", "west", "southwest"]
    },
    {
        name: "southwest",
        xChange: -1,
        yChange: 1,
        xCross: 1,
        yCross: 1,
        nextDirs: ["west", "southwest", "south"]
    },
    {
        name: "south",
        xChange: 0,
        yChange: 1,
        xCross: 1,
        yCross: 0,
        nextDirs: ["southwest", "south", "southeast"]
    },
    {
        name: "southeast",
        xChange: 1,
        yChange: 1,
        xCross: 1,
        yCross: -1,
        nextDirs: ["south", "southeast", "east"]
    },
    {
        name: "east",
        xChange: 1,
        yChange: 0,
        xCross: 0,
        yCross: -1,
        nextDirs: ["southeast", "east", "northeast"]
    },
    {
        name: "northeast",
        xChange: 1,
        yChange: -1,
        xCross: -1,
        yCross: 1,
        nextDirs: ["east", "northeast", "north"]
    }
]