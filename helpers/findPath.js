const route = ['C', 'A', 'E', 'D'];
const visited = [];
const nodeInfo = {            
                    "O": {
                        "neigh": ["A", "D"],
                        "A": 5,
                        "B": 6,
                        "C": 5,
                        "D": 3,
                        "E": 11,                
                        "5":"A,C",
                        "6":"B",
                        "3":"D",
                        "11":"E"                                
                    },
                    "A": {
                        "neigh": ["O", "B", "C", "E"],
                        "O": 5,
                        "B": 8,
                        "C": 7,
                        "D": 8,
                        "E": 6,                
                        "5":"O",
                        "8":"B,D",
                        "7":"C",
                        "6":"E"        
                    },
                    "B": {
                        "neigh": ["A", "C", "D"],
                        "O": 6,
                        "A": 8,
                        "C": 4,
                        "D": 3,
                        "E": 12,                
                        "6":"O",
                        "8":"A",
                        "4":"C",
                        "3":"D",
                        "12":"E"        
                    },
                    "C": {
                        "neigh": ["A", "B", "D", "E"],
                        "O": 5,
                        "A": 7,
                        "B": 4,
                        "D": 2,
                        "E": 8,                
                        "5":"O",
                        "7":"A",
                        "4":"B",
                        "2":"D",
                        "8":"E"  
                    },
                    "D": {
                        "neigh": ["O", "B", "C", "E"],
                        "O": 3,
                        "A": 8,
                        "B": 3,
                        "C": 2,
                        "E": 9,                
                        "3":"O",
                        "8":"A",
                        "3":"B",
                        "2":"C",
                        "9":"E"  
                    },
                    "E": {
                        "neigh": ["A", "C", "D"],
                        "O": 11,
                        "A": 6,
                        "B": 12,
                        "C": 8,
                        "D": 9,                
                        "11":"O",
                        "6":"A",
                        "12":"B",
                        "8":"C",
                        "9":"D"  
                    }
                };


function findClose(arr, node){
    let minValue = [];
    for(let i = 0; i < arr.length; i++){
        minValue.push(nodeInfo[node][arr[i]])
    }
    return Math.min.apply(null, minValue);
}

function nextNode(route){
    if(visited.length  == 0){
        let closeNode = findClose(route, "O");
        route.splice(route.indexOf(nodeInfo.O[closeNode]), 1);
        visited.push(nodeInfo.O[closeNode]);
    }else {       
        let closeNode = findClose(route, visited[visited.length -1]);
        route.splice(route.indexOf(nodeInfo[visited[visited.length -1]][closeNode]), 1);
        visited.push(nodeInfo[visited[visited.length -1]][closeNode]);
    }
    console.log(route, visited);
}
while (route.length > 0){
    nextNode(route);
}

