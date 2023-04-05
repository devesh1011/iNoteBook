var a = 0;
var b = 1;
console.log(a)
console.log(b)

var c;

for (var i = 0; i <= 8; i++) {
    c = a + b;
    a = b;
    b = c;
    console.log(c);
}