# SCOPE:
Các loại phạm vi:
- Global - Toàn cầu
- Code block - Khối mã: const, let, sử dụng if, while, for (sau dấu {}, ngoại trừ biến var)
- Local scope - Hàm: var, function
 * Biến được khai báo với từ khóa var sẽ có phạm vi global

Khi gọi mỗi hàm luôn có phạm vi mới được tạo
Các hàm có thể truy cập các biến được khai báo trong phạm vi của nó và bên ngoài nó
 * biến dc tao ra o hop lon hon se truy cap duoc o hop nho hon
 * luon lay bien o pham vi gan nhat

- Khi nào một biến bi xóa khỏi bộ nhớ?
 - Biến bộ nhớ
 - Biến trong code block & trong hàm?
 - Biến trong hàm được tham chiếu ở 1 hàm?

# CLOSURE:
Là 1 hàm có thể ghi nhớ nơi nó được tạo và truy cập được biến ở bên ngoài phạm vi của nó

# HOISTING:
đưa phần khai báo lên trên đầu phạm vi

## Hoisting với var và function declaration

console.log(age) // undefined
console.log(fullName) // ReferenceError: fullName is not defined
var age = 16

console.log(sum(6,9)) //15
function sum (a,b) {
	return a + b
}

## Hoisting với let, const (dc hoist nhung ko dc tao gia tri)

console.log(fullName) // ReferenceError: Cannot access fullName before intialization
let fullName = "Nguyen Van A"

var tip = 100;

## VI DU BAI TAP:
(function () {
  console.log("I have $" + husband());

  function wife() {
    return tip * 2;
  }

  function husband() {
    return wife() / 2;
  }

  var tip = 10;
})();

 /* Ở đây chúng ta có một IIFE (Biểu thức hàm được gọi ngay lập tức)

Biến tip sẽ là undefined vì var tip = 10 đã được khai báo bên trong hàm. Biến tip bên trong hàm được hoisted với giá trị mặc định là undefined. Khi thực hiện tính toán với 1 biến có giá trị là undefined thì kết quả trả về sẽ là NaN.

Nếu chúng ta không khai báo var tip = 10 ở cuối hàm thì đáp án sẽ là "I have $100". */

# VALUE TYPES & REFERENCE TYPES

## Value types (Primitive) THAM TRỊ
    number
    string
    boolean
    BigInt
    symbol
    undefined
    null

## Reference types (Non-primitive) THAM CHIẾU
    object
    array
    function


# THIS:
## Trong phương thức, this tham chiếu tới đối tượng truy cập phương thức (đối tượng trước dấu .)
  function Car (name,color) = {
    this.name = name;
    this.color = color;
    this.run = function() {
      console.log('Running',this)
    } 
  }
  const Mecedes = new Car ('Mecedes','black')
  console.log(Mecedes.run())

## Đứng ngoài phương thức, this tham chiếu tới đối tượng global (object Window)
   function myFunc () {
    console.log(this)
   }
   myFunc()

## Lưu ý:
- this trong hàm tạo là đại diện cho đối tượng được tạo
- this trong một hàm là undefined khi ở strict mode
- các phương thức bind(), call(), apply() có thể tham chiếu this tới đối tượng khác 
- arrow function () => {} ko có context nên sẽ lấy object ở phạm vi bên ngoài đối tượng, lấy đối tượng gần nhất