class Genetic {

  //init paths
  //train - iterate n times
  //        - select top 50% paths
  //        - mutate paths
  //      - select top path and return

  constructor(cities, trials, generations){
    this.cities = cities;
    this.iterations = iterations;
    this.paths = [];
  }

  generateRandomPath(){
    let unvisited = [...this.cities];
    let visited = [];
    let loops = unvisited.length;
    for(let i = 0; i < loops; i++){
      let j = floor(random(0, unvisited.length));
      visited.push(unvisited.splice(j, 1)[0]);
    }
    return visited;
  }

  swap(){



  }
}
