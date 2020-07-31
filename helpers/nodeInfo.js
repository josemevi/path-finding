const nodeInfo = {            
    "O": {
        "neigh": ["A", "D"],
        "A": 5,
        "B": 6,
        "C": 5,
        "D": 3,
        "E": 11,                
        'Cstops': "D,C",
        'Bstops': "D,B",
        'Estops': "A,E"
    },
    "A": {
        "neigh": ["O", "B", "C", "E"],
        "O": 5,
        "B": 8,
        "C": 7,
        "D": 8,
        "E": 6,                                
        "Dstops": "O,D"                        
    },
    "B": {
        "neigh": ["A", "C", "D"],
        "O": 6,
        "A": 8,
        "C": 4,
        "D": 3,
        "E": 12,                                       
        "Ostops": "D,O",
        "Estops": "D,E"        
    },
    "C": {
        "neigh": ["A", "B", "D", "E"],
        "O": 5,
        "A": 7,
        "B": 4,
        "D": 2,
        "E": 8,                                        
        "Ostops" : "D,O"  
    },
    "D": {
        "neigh": ["O", "B", "C", "E"],
        "O": 3,
        "A": 8,
        "B": 3,
        "C": 2,
        "E": 9,                
        "Astops": "O,A"
    },
    "E": {
        "neigh": ["A", "C", "D"],
        "O": 11,
        "A": 6,
        "B": 12,
        "C": 8,
        "D": 9,                                    
        "Ostops": "A,O",
        "Bstops": "C,B"

    }
};

module.exports = nodeInfo;