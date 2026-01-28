// Câu 1: Khai báo constructor function Product để tạo đối tượng sản phẩm
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}

// Câu 2: Khởi tạo mảng products gồm ít nhất 6 sản phẩm, thuộc tối thiểu 2 danh mục khác nhau
let products = [
  new Product(1, "iPhone 15 Pro Max", 34000000, 10, "Phone", true),
  new Product(2, "Samsung S24 Ultra", 28000000, 5, "Phone", true),
  new Product(3, "Macbook Pro M3", 45000000, 0, "Laptop", false),
  new Product(4, "AirPods Pro 2", 5000000, 20, "Accessories", true),
  new Product(5, "Apple Watch Series 9", 9000000, 15, "Accessories", true),
  new Product(6, "Dell XPS 15", 42000000, 8, "Laptop", true),
];

console.log("--- Câu 2: Danh sách sản phẩm khởi tạo ---");
console.log(products);

// Câu 3: Tạo mảng mới chỉ chứa: name, price của mỗi sản phẩm
let productBriefs = products.map(function (item) {
  return {
    name: item.name,
    price: item.price,
  };
});
console.log("\n--- Câu 3: Mảng rút gọn (name, price) ---");
console.log(productBriefs);

// Câu 4: Lọc ra các sản phẩm còn hàng trong kho (quantity > 0)
let inStockProducts = products.filter(function (item) {
  return item.quantity > 0;
});
console.log("\n--- Câu 4: Sản phẩm còn hàng ---");
console.log(inStockProducts);

// Câu 5: Kiểm tra xem có ít nhất một sản phẩm có giá trên 30.000.000 hay không
let hasExpensiveProduct = products.some(function (item) {
  return item.price > 30000000;
});
console.log("\n--- Câu 5: Có sản phẩm trên 30 triệu không? ---");
console.log(hasExpensiveProduct ? "Có" : "Không");

// Câu 6: Kiểm tra xem tất cả sản phẩm thuộc danh mục "Accessories" có đang được bán (isAvailable = true) hay không
let allAccessoriesAvailable = products
  .filter(function (item) {
    return item.category === "Accessories";
  })
  .every(function (item) {
    return item.isAvailable === true;
  });
console.log(
  "\n--- Câu 6: Tất cả sản phẩm thuộc danh mục Accessories có đang bán hay không? ---"
);
console.log(allAccessoriesAvailable ? "Có Bán" : "Không Bán");

// Câu 7: Tính tổng giá trị kho hàng. Công thức: Giá trị kho = price * quantity
let totalInventoryValue = products.reduce(function (total, item) {
  return total + item.price * item.quantity;
}, 0);
console.log("\n--- Câu 7: Tổng giá trị kho hàng ---");
console.log(totalInventoryValue.toLocaleString() + " VND");

// Câu 8: Dùng for...of để duyệt mảng products và in ra các thông tin: Tên sản phẩm – Danh mục – Trạng thái
console.log("\n--- Câu 8: Duyệt bằng for...of ---");
for (const p of products) {
  const status = p.isAvailable ? "Đang bán" : "Ngừng bán";
  console.log(`${p.name} - ${p.category} - ${status}`);
}

// Câu 9: Dùng for...in để in ra tên thuộc tính và giá trị tương ứng
console.log(
  "\n--- Câu 9: Duyệt thuộc tính đối tượng bằng for...in cho SP đầu tiên ---"
);
let firstProduct = products[0];
for (const key in firstProduct) {
  console.log(`Thuộc tính: ${key} | Giá trị: ${firstProduct[key]}`);
}

// Câu 10: Lấy danh sách tên các sản phẩm hiện đang được bán và vẫn còn hàng
let availableAndInStockNames = products
  .filter(function (item) {
    return item.isAvailable === true && item.quantity > 0;
  })
  .map(function (item) {
    return item.name;
  });
console.log("\n--- Câu 10: Tên SP đang bán và còn hàng ---");
console.log(availableAndInStockNames);
