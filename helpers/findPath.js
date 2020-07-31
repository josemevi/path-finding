const route = ['C','E','A','D'];
var visited = [];
var actualRoute = [];
var distanceTraveled = [];
//used to add Origin node to the route without interfering with the algorithm
var flag = true;
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
//Finds if the shortest path is a neighbor of the actual standing node
function isNeigh (arr, closeNode, node){
    for(let i = 0; i < arr.length; i++){        
        for(let k = 0; k < nodeInfo[node].neigh.length; k++){
            if(closeNode == nodeInfo[node].neigh[k]){
                return true;
            }
        }       
    }
}

//Finds and returns the nearest node in the route, also storages the distance traveled to that node
function findClose(arr, node){
    let minValue = [];
    let order = [];
    for(let i = 0; i < arr.length; i++){
        minValue.push(nodeInfo[node][arr[i]])
        order.push(arr[i]);
    }
    let distance = Math.min.apply(null, minValue);
    distanceTraveled.push(distance);
    let closeNode = order[minValue.indexOf(distance)];  
    return closeNode;
}
//returns the stops in order to reach a node that's destination isn't a neighbor
function splitPush(arr,str){   
    let newRoute = [];
    let pushArr = str.split(",");
    for(let i = 0; i < pushArr.length ;i++){
        newRoute.push(pushArr[i])
    }
    return newRoute;
}

function nextNode(route){
    if(route.length > 0){ 
        //We start by default from the O node   
        if(visited.length  == 0){
            //First we determined who's the nearest node in the route
            let closeNode = findClose(route, "O");
            //Then we determine if the nearest node in the route is a neighbor of the origin
            if(isNeigh(route, closeNode, "O")){
                //we take out the node of the route and then added this node to the travaled variables
                route.splice(route.indexOf(closeNode), 1);
                actualRoute.push(closeNode);
                visited.push(closeNode);
            }else {
                //In case that the node isn't a neighbor we determined and add the stops necessaries to this node
                route.splice(route.indexOf(closeNode), 1);             
                actualRoute = splitPush(route, nodeInfo.O[closeNode + "stops"]);                    
                visited.push(closeNode);
            }

        //In case we're in other node that's not the origin, we determined the last node store in "visited" and then, 
        //we repeat the same process above  
        }else {
            let closeNode = findClose(route, visited[visited.length -1]);
            if(isNeigh(route, closeNode, visited[visited.length -1])){                             
                route.splice(route.indexOf(closeNode), 1);
                actualRoute.push(closeNode);            
                visited.push(closeNode);
            }else {                              
                route.splice(route.indexOfcloseNode, 1);
                let newNodes = splitPush(route, nodeInfo[visited[visited.length -1]][closeNode + "stops"]);
                for(let i = 0; i < newNodes.length; i++){
                    actualRoute.push(newNodes[i]);
                }            
                visited.push(closeNode);            
            }
        }
    //When the route have no left nodes we add "O" to return to the origin
    }else if(flag) {       
        route.push('O');
        flag = false;    
    }
    //Descomment to watch in server console the process of route = route provided, visited = route in nearest order,
    //actualRoute = stops mades so far, distanceTraveled = all the distances between visited nodes and
    //distacedTraveled.reduce = distanceTraveled sum
    //console.log(route, visited, actualRoute, distanceTraveled ,distanceTraveled.reduce(function(acc, val) { return acc + val; }, 0));
}

while (route.length > 0 || flag){
    nextNode(route);
}

if(route.length == 0 || !flag) {
    console.log(route, visited, actualRoute, distanceTraveled ,distanceTraveled.reduce(function(acc, val) { return acc + val; }, 0));
}
