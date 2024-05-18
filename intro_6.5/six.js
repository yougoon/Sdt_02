var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom","zerooooAlom"];

let big = friends[0].length;
let big_d = friends[0];

for (let i = 1; i < friends.length; i++) {
    if (friends[i].length > big) {
        big_d = friends[i];
        big = friends[i].length;
    } 
}

console.log(big_d);
