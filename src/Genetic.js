class Genetic {

  //init paths
  //train - iterate n times
  //        - select top 50% paths
  //        - mutate paths
  //      - select top path and return

  constructor(cities, population, generations){
    this.cities = cities;
    this.generations = generations;
    this.population = population;
    this.paths = [];
    console.log(this.generations);
  }

  getGens(){
    return this.generations;
  }

  selectAndMutate(){
    this.paths = this.paths.sort(this.comparePaths);
    let topPaths = [];
    for(let i = 0; i < this.population/2; i++){

      topPaths.push(this.paths[i]);

    }
    let newPaths = [];
    for(let i = 0; i < topPaths.length; i++){

      newPaths.push(this.swap(topPaths[i]));

    }
    return topPaths.concat(newPaths);

  }

  comparePaths(a, b){
    return calcDistance(a) - calcDistance(b);
  }

  populatePaths(){

    for(let i = 0; i < this.population; i++){
      this.paths.push(this.generateRandomPath());
    }

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
  //a -> b -> c -> d
  //a -> c -> b -> d
  swap(path){
    let newPath = path.slice();
    let a = floor(random(path.length));
    let b = floor(random(path.length));

    while(b == a){
      b = floor(random(path.length));
    }
    console.log(a);
    console.log(b);
    let t = newPath[a];
    newPath[a] = newPath[b];
    newPath[b] = t;
    console.log(newPath);
    return newPath;
  }
}
