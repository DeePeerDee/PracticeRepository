import { JOURNAL, SCRIPTS, ROADS, MAIL_ROUTE } from "../constants/sandboxsources.mjs";

console.log("App has started!");

function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdge(from,to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  for (let [from,to] of edges.map(r => r.split("-"))) {
    addEdge(from,to);
    addEdge(to,from);
  }

  return graph;
}

const roadGraph = buildGraph(ROADS);

class VillageState {
  place;
  parcels;
  // define: place <- string
  // define: parcels <- Object(place <- string, address <- string)
  constructor(place,parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    // if: destination not in the road graph's key -> return the same instance
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      // otherwise: map parcels
      // mapping: if instance's place and current parcel's place iteration aren't equal
      // return the return the current parcel
      // fallback return: Object(place:=destination,address:=current parcel's address)
      // filter: parcel's place and address must not be equal
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) {
          return p;
        }

        return {place: destination, address: p.address};
      });

      parcels = parcels.filter(p => p.place != p.address);
    return new VillageState(destination,parcels);
    };
  }
}

// Define:
// state <- VillageState
// robot <- callback function
function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }

    // action (state, memory) => Object(direction, memory)
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// Define:
// array <- elements of a certain place
// RET: pseudorandom element within the array
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

// Define:
// state <- VillageState
// RET: Object(direction <- string **from neighbors of the place**
function randomRobot(state) {
  let direction = randomPick(roadGraph[state.place]);
  return {direction}
}

// Define random:
// parcelCount <- number **default value = 5**
VillageState.random = function(parcelCount = 5) {
  // init: parcels <- empty array
  let parcels = [];
  // loop while idx < 5
  for (let i = 0; i < parcelCount; i++) {
    // define address <- random pick from road graph keys. See: Line 24 for roadGraph variable
    let address = randomPick(Object.keys(roadGraph));

    // init: place
    let place;

    // do: assign place <- random pick from road graph keys.
    do {
      place = randomPick(Object.keys(roadGraph));
    // while: place != address
    } while (place == address);
    
    // parcels << [place, address]
    parcels.push({place, address});
  }

  // Create a VillageState instance: "Post Office" as initial place
  return new VillageState("Post Office", parcels);
}

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = MAIL_ROUTE;
  }

  return {direction: memory[0], memory: memory.slice(1)};
}

let first = new VillageState("Post Office", [{place: "Post Office", address: "Alice's House"}]);

const exerciseFunction1 = function() {
  let next = first.move("Alice's House");
}

const exerciseFunction2 = function() {
  let obj1 = Object.freeze({value:5});

  try {
    console.log(obj1);
    obj1.value = 10;
  } catch (e) {
    console.error("An Error has occurred");
    let isTypeError = (e instanceof TypeError);
    console.log(isTypeError);
    console.error(e.name);
    console.error(e.message);
    console.error(e.stack);
  } finally {
    console.log("Function continues...");
    console.log(obj1);
  }
}

const exerciseFunction3 = function() {
  runRobot(VillageState.random(), randomRobot);
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) {
        return route.concat(place);
      }
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
  return [];
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
  
    let parcel = parcels[0];
    
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }

  return {direction: route[0], memory: route.slice(1)};
}

function countSteps(state, robot, memory) {
  for (let steps = 0;; steps++) {
    if (state.parcels.length == 0) {
      return steps;
    }

    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let total1 = 0;
  let total2 = 0;

  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }

  console.log(`Robot 1 needed ${total1 / 100} steps per task`);
  console.log(`Robot 2 needed ${total2 / 100} steps per task`);
}

function lazyRobot({place, parcels}, route) {
  if (route.length == 0) {
    let routes = parcels.map(parcel => {
      if (parcel.place != place) {
        return {route: findRoute(roadGraph, place, parcel.place),
          pickUp: true};
      } else {
        return {route: findRoute(roadGraph, place, parcel.address),
          pickUp: false};
      }
    });

    function score({route, pickUp}) {
      return (pickUp ? 0.5 : 0) - route.length;
    }

    route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
  }

  return {direction: route[0], memory: route.slice(1)};
}

const exerciseFunction4 = function() {
  // compareRobots(routeRobot, [], goalOrientedRobot, []);
  compareRobots(lazyRobot, [], goalOrientedRobot, []);
}

class PGroup {
  #members;
  constructor(members) {
    this.#members = members;
  }

  add(value) {
    if (this.has(value)) {
      return this;
    }

    return new PGroup(this.#members.concat([value]));
  }

  delete(value) {
    if (!this.has(value)) {
      return this;
    }

    return new PGroup(this.#members.filter(m => m !== value));
  }

  has(value) {
    return this.#members.includes(value);
  }

  static empty = new PGroup([]);

}

const exerciseFunction5 = function() {
  let a = PGroup.empty.add("a");
  let ab = a.add("b");
  let b = ab.delete("a");

  console.log(a);
  console.log(ab);
  console.log(b);

  console.log(b.has("b"));
  console.log(a.has("b"));
  console.log(b.has("a"));
}

const customWindowFunction = function(e) {
  if (e.keyCode === 32) {
      // ASCII 32 for SPACE key
      exerciseFunction1();
  } else if (e.keyCode === 13) {
      // ASCII 13 for ENTER key
      exerciseFunction1();
  } else if (e.keyCode === 27) {
      window.location.reload();
  }
}

// Define document element mapping
const button1 = document.getElementById("submit-1");
const button2 = document.getElementById("submit-2");
const button3 = document.getElementById("submit-3");
const button4 = document.getElementById("submit-4");
const button5 = document.getElementById("submit-5");

// Add event listeners (one (1) for the window keydown event, five (5) for each button)
window.addEventListener("keydown", customWindowFunction, false);
button1.addEventListener("click", exerciseFunction1, false);
button2.addEventListener("click", exerciseFunction2, false);
button3.addEventListener("click", exerciseFunction3, false);
button4.addEventListener("click", exerciseFunction4, false);
button5.addEventListener("click", exerciseFunction5, false);
