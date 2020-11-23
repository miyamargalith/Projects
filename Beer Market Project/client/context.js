import React, { Component } from "react";
import { detailProduct } from "./data";
import _ from "lodash";
import { saveCartToLocalStorage, fetchCartFromLocalStorage } from "./repos/cart-repo";
import { getAllBeers } from "./api/beers-api";
import { checkSession } from "./api/users-api";
import { withRouter } from "react-router-dom";
import { getAllActivities, createNewActivity, getUserCheckout } from "./api/activities-api";

const ProductContext = React.createContext();
//Provider
//Consumer
let url = "/";

class ProductProvider extends Component {
  state = {
    products: [],
    filteredProducts: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      isAuthenticated: false,
      isAdmin: false
    },
    activities: [],
    checkoutUserActivities: [],
    error: ""
  };

  componentDidMount() {
    url = this.props.location.pathname;
    checkSession()
      .then(res => {
        this.authenticate(res).then(() => {
          this.redirect(url);
        });
      })
      .catch(err => {
        this.handleError(err);
        this.redirect(url);
      });
  }

  redirect(path) {
    this.props.history.push(path);
  }

  authenticate(resData) {
    const { firstName, lastName, email } = resData;
    const isAuthenticated = !!resData;

    this.setState(prevState => ({
      user: {
        id: email,
        isAuthenticated: isAuthenticated,
        firstName: firstName,
        lastName: lastName,
        email: email,
        isAdmin: false
      },
      activities: []
    }));

    if (isAuthenticated) {
      this.authenticateSuccess();
    } else {
      this.authenticateFail();
    }
  }

  authenticateSuccess() {
    if (this.state.user.id === "admin@beerMarket.com") {
      this.setState(prevState => ({
        user: {
          isAuthenticated: prevState.user.isAuthenticated,
          id: prevState.user.id,
          firstName: prevState.user.firstName,
          lastName: prevState.user.lastName,
          email: prevState.user.email,
          isAdmin: true
        }
      }));
    }

    getAllBeers()
      .then(beers => {
        this.setProducts(beers);
        this.restoreFromLocalStorage();
        this.setUserCheckoutActivities();
        this.setActivities();
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  authenticateFail() {
    return;
  }

  restoreFromLocalStorage() {
    if (!this.state.user.id) {
      return;
    }

    const cart = fetchCartFromLocalStorage(this.state.user.id) || [];
    this.setState(
      {
        cart
      },
      () => {
        if (!_.isEmpty(cart)) {
          this.calculateTotals();
        }
      }
    );
  }

  setProducts = beers => {
    this.setState(() => {
      return { products: beers, filteredProducts: beers };
    });
  };

  getProductById = id => {
    const product = this.mergedProducts().find(p => p.id === id);
    return product;
  };

  fetchProductDetails = id => {
    const product = this.getProductById(id);
    if (!this.state.modalOpen) {
      const date = new Date();
      createNewActivity({
        name: "visit item",
        description: `user ${this.state.user.id} visited item ${product.title}`,
        userEmail: `${this.state.user.id}`,
        time: date.toLocaleDateString() + " " + date.toLocaleTimeString()
      }).catch(err => {
        this.handleError(err);
      });
    }

    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCart = productId => {
    const product = _.chain(this.state.products)
      .find(({ id }) => id === productId)
      .clone()
      .value();
    product.count = 1;
    product.total = product.price;

    const cart = _.concat(this.state.cart, [product]);
    this.setState(
      () => {
        return { cart };
      },
      () => {
        this.calculateTotals();
      }
    );
    // update localStorage
    saveCartToLocalStorage(this.state.user.id, cart);
    const date = new Date();
    createNewActivity({
      name: "add to cart",
      description: `user ${this.state.user.id} added item ${product.title} to cart`,
      userEmail: `${this.state.user.id}`,
      time: date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }).catch(err => {
      this.handleError(err, "did not create user activity");
    });
  };

  removeFromCart = productId => {
    const cart = _.chain(this.state.cart)
      .cloneDeep()
      .filter(product => product.id !== productId)
      .value();
    this.setState(
      () => {
        return {
          cart
        };
      },
      () => {
        this.calculateTotals();
      }
    );
    // update localStorage
    saveCartToLocalStorage(this.state.user.id, cart);
    const date = new Date();
    const productObj = this.getProductById(productId);
    createNewActivity({
      name: "remove from cart",
      description: `user ${this.state.user.id} removed item ${productObj.title} from cart`,
      userEmail: `${this.state.user.id}`,
      time: date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }).catch(err => {
      this.handleError(err, "did not create user activity");
    });
  };

  openModal = id => {
    const product = this.getProductById(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = productId => {
    const cart = _.cloneDeep(this.state.cart);
    const product = cart.find(({ id }) => id === productId);
    product.count += 1;
    product.total = product.price * product.count;

    this.setState(
      () => {
        return { cart };
      },
      () => {
        this.calculateTotals();
      }
    );
    // update localStorage
    saveCartToLocalStorage(this.state.user.id, cart);
  };

  decrement = productId => {
    const cart = _.cloneDeep(this.state.cart);
    const product = cart.find(({ id }) => id === productId);
    product.count -= 1;
    product.total = product.price * product.count;

    if (product.count === 0) return this.removeFromCart(productId);

    this.setState(
      () => {
        return { cart };
      },
      () => {
        this.calculateTotals();
      }
    );
    // update localStorage
    saveCartToLocalStorage(this.state.user.id, cart);
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.resetTotal();
        saveCartToLocalStorage(this.state.user.id, this.state.cart);
        const date = new Date();
        createNewActivity({
          name: "clear cart",
          description: `user ${this.state.user.id} cleared cart`,
          userEmail: `${this.state.user.id}`,
          time: date.toLocaleDateString() + " " + date.toLocaleTimeString()
        }).catch(err => {
          this.handleError(err, "did not create user activity");
        });
      }
    );
  };

  resetTotal = () => {
    this.setState(() => {
      return {
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
      };
    });
  };

  calculateTotals = () => {
    const subTotal = _.sumBy(this.state.cart, "total");
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  mergedProducts = () => {
    const { cart, products } = this.state;

    const cartByProductId = _.keyBy(cart, "id");

    return products.map(product => {
      const cartProduct = cartByProductId[product.id];
      if (!cartProduct) return _.cloneDeep(product);

      return {
        ...product,
        count: cartProduct.count,
        inCart: true
      };
    });
  };

  searchFilter = searchValue => {
    if (searchValue === "") {
      this.setState(() => {
        return { filteredProducts: this.state.products };
      });
    }
    let serchValueLower = searchValue.toLowerCase();
    let tempProducts = [...this.state.products];
    tempProducts = tempProducts.filter(
      item => item.title.toLowerCase().indexOf(serchValueLower) !== -1
    );
    this.setState(() => {
      return { filteredProducts: [...tempProducts] };
    });
    this.redirect("/search");
  };

  mergedSearchProducts = () => {
    const { cart, filteredProducts } = this.state;

    const cartByProductId = _.keyBy(cart, "id");

    return filteredProducts.map(product => {
      const cartProduct = cartByProductId[product.id];
      if (!cartProduct) return _.cloneDeep(product);

      return {
        ...product,
        count: cartProduct.count,
        inCart: true
      };
    });
  };

  setActivities = () => {
    getAllActivities()
      .then(activities => {
        this.setState(prevState => ({
          activities: activities
        }));
      })
      .catch(err => {
        this.handleError(err, "did not get activities");
      });
  };

  setUserActivities = userEmail => {
    if (userEmail === "") {
      this.setActivities();
    } else {
      const userEmailLower = userEmail.toLowerCase();
      getAllActivities()
        .then(activities => {
          const filteredActivities = activities.filter(
            activity => activity.userEmail.toLowerCase() === userEmailLower
          );
          this.setState(prevState => ({
            activities: filteredActivities
          }));
        })
        .catch(err => {
          this.handleError(err, "did not get user activities");
        });
    }
  };

  setUserCheckoutActivities = () => {
    const userEmail = this.state.user.id;
    getUserCheckout({ userEmail })
      .then(activities => {
        this.setState(prevState => ({
          checkoutUserActivities: activities
        }));
      })
      .catch(err => {
        this.handleError(err, "did not get user activities");
      });
  };

  handleError = (err, text) => {
    let textToConsole = "";
    if (text) {
      textToConsole = text;
    }
    if (!err.response) {
      console.log("Unknown error " + textToConsole);
    } else if (err.response.status === 401) {
      console.log("Unauthorized " + textToConsole);
      this.redirect("/signIn");
    } else if (err.response.status === 500) {
      console.log(
        "Whoops! Something went wrong :( Our best programmers are working on it! " + textToConsole
      );
    }
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          fetchProductDetails: this.fetchProductDetails,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeFromCart: this.removeFromCart,
          clearCart: this.clearCart,
          mergedProducts: this.mergedProducts,
          authenticate: this.authenticate.bind(this),
          searchFilter: this.searchFilter,
          mergedSearchProducts: this.mergedSearchProducts,
          setActivities: this.setActivities,
          setUserActivities: this.setUserActivities,
          setUserCheckoutActivities: this.setUserCheckoutActivities
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;
const ProductProviderWithRouter = withRouter(ProductProvider);

export { ProductProviderWithRouter, ProductConsumer, ProductContext };
