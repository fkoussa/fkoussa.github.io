let schoolums = new Vue({
  el: "#app",
  data: {
    sitename: "School UMS",
    page: "products",
    products: products,
    showProducts: true,
    sortBy: "subject",
    sort_asc_desc: "asc",
    cart: [],
    checkout: [],
    test: false,
    search: "",
    order: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      email: "",
      phone: "",
      state: [],
    },
  },
  methods: {
    // Add product to cart
    addToCart(product) {
      // console.log(product.id);
      if (!this.cart.includes(product)) {
        this.cart.push(product);
        product.cartquantity += 1;
        product.space--;
        console.log("cart doesnt contain product");
      } else if (product.cartquantity == product.stock) {
        // Check if product spaces == cartquantity
        console.log("No more spaces left!");
      } else {
        console.log("cart contains product");
        product.cartquantity += 1;
        product.space--;
      }
    },

    // Show the cart page
    showCart() {
      // Toggle
      this.showProducts = this.showProducts ? false : true;
    },

    // Decrease the quantity of the product by one (1)
    decreaseCartQuantity(product) {
      product.cartquantity -= 1;
      product.space += 1;
    },

    // Remove product from cart in the cart page
    removeFromCart(product) {
      this.cart.splice(product, 1);
      product.cartquantity = 0;
      product.space = product.stock;
    },

    // Show or Hide Quantity Decreaser button in the cart page
    checkProductQuantity(product) {
      if (product.cartquantity > 0) {
        return true;
      } else {
        this.cart.splice(product, 1);
        return false;
      }
    },

    // Change page
    navigator(page) {
      this.page = page;
    },

    cartQuantity(product) {
      return product.cartquantity;
    },

    validateCheckoutInformation() {
      let name_regex = /^[A-Za-z\s]+$/;
      let phone_regex = /^[0-9]+$/;

      var first_name_validation = name_regex.test(this.order.firstName);
      var last_name_validation = name_regex.test(this.order.lastName);
      var phone_number_validation = phone_regex.test(this.order.phone);

      // Check if fields arent empty
      if (
        this.order.firstName &&
        this.order.lastName &&
        this.order.address &&
        this.order.city &&
        this.order.email &&
        this.order.phone &&
        this.order.state
      ) {
        // Regex field validation
        if (first_name_validation !== false) {
          if (last_name_validation !== false) {
            if (phone_number_validation !== false) {
              // Initiate checkout
              this.checkout.push(this.order);
              this.order = {
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                email: "",
                phone: "",
                state: "",
              };
              alert("Checkout Succeeded!");
              this.cart = [];
              this.navigator("products");
            } else {
              alert("Please verify your phone number.");
            }
          } else {
            alert("Please verify your last name");
          }
        } else {
          alert("Please verify your first name.");
        }
      } else {
        alert("Fill in Information Before Checking Out");
        this.page = "checkout";
      }
    },
  },
  computed: {
    cartItemCount: function () {
      return this.cart.length || "";
    },
    canAdd() {
      return this.products.quantity != 0;
    },

    isCartEmpty: function () {
      if (cart.length > 0) {
        console.log("Cart length is greater than 0");
        return false;
      } else {
        console.log("Cart length is less than 0");
        return true;
      }
    },

    // Search functionality
    productList() {
      if (this.search) {
        return this.products.filter((item) => {
          try {
            return (
              item.subject.toLowerCase().includes(this.search.toLowerCase()) ||
              item.location.toLowerCase().includes(this.search.toLowerCase())
            );
          } catch (err) {
            console.log(err);
          }
        });
      } else if (this.sortBy === "subject") {
        return this.products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.subject.localeCompare(b.subject);
          } else if (this.sort_asc_desc === "desc") {
            return b.subject.localeCompare(a.subject);
          }
        });
      } else if (this.sortBy === "price") {
        return this.products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.price - b.price;
          } else if (this.sort_asc_desc === "desc") {
            return b.price - a.price;
          }
        });
      } else if (this.sortBy === "space") {
        return this.products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.space - b.space;
          } else if (this.sort_asc_desc === "desc") {
            return b.space - a.space;
          }
        });
      } else if (this.sortBy === "location") {
        return this.products.sort((a, b) => {
          if (this.sort_asc_desc === "asc") {
            return a.location - b.location;
          } else if (this.sort_asc_desc === "desc") {
            return b.location - a.location;
          }
        });
      } else {
        return this.products;
      }
    },
  },
});
