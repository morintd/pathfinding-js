module.exports = {
  init(EdgeMap, sDeb) {
    let A = EdgeMap;

    let S = [];
    for(let vertex in A) {
        S.push(vertex);
    }

    let d = [];
    S.forEach((s) => {
      d[s] = Number.POSITIVE_INFINITY;
    });

    d[sDeb] = 0;

    let Q = S.concat();
    let predecessor = [];

    while(Q.length > 0) {
      let mini = Number.POSITIVE_INFINITY;
      let s1 = -1;

      Q.forEach((s) => {
        if(s1 == -1 || d[s] < mini) {
          mini = d[s];
          s1 = s;
        }
      });

      Q.splice(Q.indexOf(s1), 1);

      for(let s2 in A[s1]) {
        if(d[s2] > d[s1] + A[s1][s2]) {
          d[s2] = d[s1] + A[s1][s2];
          predecessor[s2] = s1;
        }
      }
    }

    return predecessor;
  },

  getPath(predecessor, sDeb, sEnd) {
    let A = [];
    let s = sEnd;

    while(s != sDeb)
    {
      A.push(s);
      s = predecessor[s];
    }

    A.push(sDeb)
    return A.reverse();
  },

  getWeight(edgeMap, path) {
    var weight = 0;
    var vertex = undefined;

    path.forEach(function(v) {
      if(vertex != undefined)
          weight += edgeMap[vertex][v];
      vertex = v;
    });

    return weight;
  }
}
