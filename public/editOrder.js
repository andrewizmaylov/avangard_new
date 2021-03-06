(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["editOrder"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/components/EditOrder.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/components/EditOrder.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'editOrder',
  data: function data() {
    return {
      details: {
        order: {
          partner: {}
        },
        orderDetails: []
      },
      products: [],
      addNewItem: false,
      newItem: {},
      isLoading: false
    };
  },
  created: function created() {
    var _this = this;

    this.refreshOrder();
    axios.get('/api/products').then(function (response) {
      _this.products = response.data;
    })["catch"](function (error) {
      console.log(error);
    });
  },
  methods: {
    markOrder: function markOrder(status) {
      var fieldsToChange = {
        status: status
      };
      this.updateOrder(fieldsToChange);
    },
    deleteItem: function deleteItem(item) {
      var _this2 = this;

      if (this.details.order.status == 20) {
        alert('This order is already delivered. You can not modified it any more');
        return;
      }

      var deleteItem = confirm("You are aboute to delete " + this.productName(item.product_id)[0].name + " from the order");

      if (deleteItem) {
        axios.post('/api/deleteItem/' + item.id).then(function (response) {
          _this2.refreshOrder();
        })["catch"](function (error) {
          console.log(error);
        });
      }
    },
    clearNewItem: function clearNewItem() {
      this.addNewItem = false;
      this.newItem = {};
    },
    checkOrderCompleted: function checkOrderCompleted() {
      if (this.details.order.status == 20) {
        alert('This order is already delivered. You can not modified it any more');
        return;
      }

      this.addNewItem = true;
    },
    addProduct: function addProduct() {
      var _this3 = this;

      if (!this.newItem.quantity) {
        alert('You have to provide item quantuty first');
        return;
      }

      ;
      var itemToAdd = this.newItem;
      itemToAdd.order_id = this.details.order.id;
      axios.post('/api/addNewProduct', itemToAdd).then(function (response) {
        _this3.clearNewItem();

        _this3.refreshOrder();
      })["catch"](function (error) {
        console.log(error);
      });
      this.addNewItem = false;
      this.refreshOrder;
    },
    newItemPrice: function newItemPrice() {
      if (!this.newItem || !this.newItem.quantity) {
        return null;
      } else {
        return this.newItem.price * this.newItem.quantity;
      }
    },
    saveOrder: function saveOrder() {
      var fieldsToChange = {
        client_email: this.details.order.client_email // status: this.details.order.status,					   

      };
      this.updateOrder(fieldsToChange);
    },
    updateOrder: function updateOrder(fieldsToChange) {
      var _this4 = this;

      if (fieldsToChange.status == 20 && this.details.order.status !== 20) {
        this.isLoading = true;
        axios.get('/api/orderComplete/' + this.details.order.id).then(function (response) {
          if (response.status == 200) {
            alert('Message about Order is Completed was sended to the all users from the order');
          }

          _this4.isLoading = false;
        })["catch"](function (error) {
          if (error.response.status == 403) {
            alert('To send a message about Order is Completed you have to check and setup .env file');
          }

          console.log(error);
          _this4.isLoading = false;
        });
      }

      axios.post('/api/order/' + this.details.order.id, fieldsToChange).then(function (response) {
        _this4.refreshOrder();
      })["catch"](function (error) {
        console.log(error);
      });
    },
    savePartner: function savePartner() {
      var _this5 = this;

      axios.post('/api/partner/' + this.details.order.partner.id, {
        email: this.details.order.partner.email,
        name: this.details.order.partner.name // id: this.details.order.id

      }).then(function (response) {
        _this5.refreshOrder();
      })["catch"](function (error) {
        console.log(error);
      });
    },
    saveDetails: function saveDetails() {
      var _this6 = this;

      if (this.details.order.status == 20) {
        alert('This order is already delivered. You can not modified it any more');
        return;
      }

      axios.post('/api/order_products/' + this.details.order.id, this.details.orderDetails).then(function (response) {
        _this6.refreshOrder();
      })["catch"](function (error) {
        console.log(error);
      });
    },
    productName: function productName(id) {
      return this.products.filter(function (product) {
        if (product.id == id) {
          return product;
        }
      });
    },
    goOrdersPage: function goOrdersPage() {
      this.$router.push({
        name: 'orders'
      });
    },
    refreshOrder: function refreshOrder() {
      var _this7 = this;

      axios.get('/api/order/' + this.$route.params.order.id).then(function (response) {
        _this7.details = response.data;
      })["catch"](function (error) {
        console.log(error);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/components/EditOrder.vue?vue&type=template&id=7a1c738a&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/views/components/EditOrder.vue?vue&type=template&id=7a1c738a& ***!
  \******************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", [
    _c("div", { staticClass: "flex justify-between" }, [
      _c("span", { staticClass: "text-lg text-gray-600" }, [
        _vm._v("Change order " + _vm._s(_vm.details.order.id))
      ]),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass:
            "shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
          on: { click: _vm.goOrdersPage }
        },
        [_vm._v("goBack")]
      )
    ]),
    _vm._v(" "),
    !_vm.isLoading
      ? _c(
          "div",
          {
            staticClass:
              "flex flex-col rounded-lg shadow-lg my-6 border border-gray-200"
          },
          [
            _c(
              "form",
              {
                staticClass: "w-4/5 mx-auto mt-6 mb-16",
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.saveOrder($event)
                  }
                }
              },
              [
                _c(
                  "label",
                  { staticClass: "block text-2xl text-gray-600 mb-4 ml-2" },
                  [_vm._v("Change order details")]
                ),
                _vm._v(" "),
                _c(
                  "label",
                  { staticClass: "block tex-sm text-gray-600 mb-2 ml-2" },
                  [_vm._v("Clients email")]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.details.order.client_email,
                      expression: "details.order.client_email"
                    }
                  ],
                  staticClass:
                    "mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  attrs: {
                    name: "order.client_email",
                    id: "order.client_email",
                    type: "email"
                  },
                  domProps: { value: _vm.details.order.client_email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.details.order,
                        "client_email",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm._m(0)
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "w-4/5 mx-auto mb-16" }, [
              _c(
                "label",
                {
                  staticClass:
                    "block text-2xl text-gray-600 mb-4 ml-2 text-center"
                },
                [_vm._v("Change order status")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "flex justify-center" }, [
                _c(
                  "span",
                  {
                    staticClass:
                      "cursor-pointer mx-2 shadow hover:bg-indigo-700 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded",
                    class:
                      _vm.details.order.status == 0
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-500",
                    on: {
                      click: function($event) {
                        return _vm.markOrder(0)
                      }
                    }
                  },
                  [
                    _vm.details.order.status !== 0
                      ? _c("span", [_vm._v("Mark order as a NEW")])
                      : _c("span", [_vm._v("This is a New Order")])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass:
                      "cursor-pointer mx-2 shadow hover:bg-indigo-700 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded",
                    class:
                      _vm.details.order.status == 10
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-500",
                    on: {
                      click: function($event) {
                        return _vm.markOrder(10)
                      }
                    }
                  },
                  [
                    _vm.details.order.status !== 10
                      ? _c("span", [_vm._v("Mark order as a CONFIRMED")])
                      : _c("span", [_vm._v("This order was confirmed")])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass:
                      "cursor-pointer mx-2 shadow hover:bg-indigo-700 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded",
                    class:
                      _vm.details.order.status == 20
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-500",
                    on: {
                      click: function($event) {
                        return _vm.markOrder(20)
                      }
                    }
                  },
                  [
                    _vm.details.order.status !== 20
                      ? _c("span", [_vm._v("Mark order as a COMPLETED")])
                      : _c("span", [_vm._v("This order is completed")])
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "form",
              {
                staticClass: "w-4/5 mx-auto mb-16",
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.savePartner($event)
                  }
                }
              },
              [
                _c(
                  "label",
                  { staticClass: "block text-2xl text-gray-600 mb-4 ml-2" },
                  [_vm._v("Change Partner")]
                ),
                _vm._v(" "),
                _c(
                  "label",
                  { staticClass: "block tex-sm text-gray-600 mb-2 ml-2" },
                  [_vm._v("Partner email")]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.details.order.partner.email,
                      expression: "details.order.partner.email"
                    }
                  ],
                  staticClass:
                    "mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  attrs: {
                    name: "order.partner.email",
                    id: "order.partner.email",
                    type: "email"
                  },
                  domProps: { value: _vm.details.order.partner.email },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.details.order.partner,
                        "email",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "label",
                  { staticClass: "block tex-sm text-gray-600 mb-2 ml-2" },
                  [_vm._v("Partner name")]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.details.order.partner.name,
                      expression: "details.order.partner.name"
                    }
                  ],
                  staticClass:
                    "mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  attrs: {
                    name: "order.partner.name",
                    id: "order.partner.name",
                    type: "text"
                  },
                  domProps: { value: _vm.details.order.partner.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.details.order.partner,
                        "name",
                        $event.target.value
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _vm._m(1)
              ]
            ),
            _vm._v(" "),
            _c(
              "form",
              {
                staticClass: "w-4/5 mx-auto mb-16",
                on: {
                  submit: function($event) {
                    $event.preventDefault()
                    return _vm.saveDetails($event)
                  }
                }
              },
              [
                _c(
                  "label",
                  { staticClass: "block text-2xl text-gray-600 mb-4 ml-2" },
                  [_vm._v("Change Bascket")]
                ),
                _vm._v(" "),
                _c(
                  "table",
                  { staticClass: "min-w-full divide-y divide-gray-200" },
                  [
                    _vm._m(2),
                    _vm._v(" "),
                    _c(
                      "tbody",
                      _vm._l(_vm.details.orderDetails, function(
                        product,
                        index
                      ) {
                        return _c(
                          "tr",
                          {
                            key: product.id,
                            class: index % 2 == 0 ? "bg-white" : "bg-gray-100"
                          },
                          [
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _vm._v(
                                  "\n\t          \t\t\t\t\t\t" +
                                    _vm._s(
                                      _vm.productName(product.product_id)[0]
                                        .name
                                    ) +
                                    "\n\t          \t\t\t\t\t"
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: product.quantity,
                                      expression: "product.quantity"
                                    }
                                  ],
                                  staticClass:
                                    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                  attrs: {
                                    name: "product.quantity",
                                    id: "product.id",
                                    type: "number",
                                    disabled: _vm.details.order.status == 20
                                  },
                                  domProps: { value: product.quantity },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        product,
                                        "quantity",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _vm._v(
                                  "\n\t          \t\t\t\t\t\t" +
                                    _vm._s(product.price) +
                                    "\n\t          \t\t\t\t\t"
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _vm._v(
                                  "\n\t          \t\t\t\t\t\t" +
                                    _vm._s(product.quantity * product.price) +
                                    "\n\t          \t\t\t\t\t"
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass: "cursor-pointer py-2",
                                    on: {
                                      click: function($event) {
                                        return _vm.deleteItem(product)
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "svg",
                                      {
                                        staticClass: "w-4 h-4 mx-auto",
                                        attrs: {
                                          xmlns: "http://www.w3.org/2000/svg",
                                          fill: "none",
                                          viewBox: "0 0 24 24",
                                          stroke: "currentColor"
                                        }
                                      },
                                      [
                                        _c("path", {
                                          attrs: {
                                            "stroke-linecap": "round",
                                            "stroke-linejoin": "round",
                                            "stroke-width": "2",
                                            d:
                                              "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              ]
                            )
                          ]
                        )
                      }),
                      0
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "flex mt-6" }, [
                  _c(
                    "button",
                    {
                      staticClass:
                        "shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
                      attrs: { type: "submit" }
                    },
                    [_vm._v("Change Order Details")]
                  ),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      staticClass:
                        "ml-auto shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
                      on: { click: _vm.checkOrderCompleted }
                    },
                    [_vm._v("Add more product to order")]
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _vm.addNewItem
              ? _c(
                  "form",
                  {
                    staticClass: "w-4/5 mx-auto mb-16",
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.addProduct($event)
                      }
                    }
                  },
                  [
                    _c(
                      "label",
                      { staticClass: "block text-2xl text-gray-600 mb-4 ml-2" },
                      [
                        _vm._v(
                          "Add new item for the order " +
                            _vm._s(_vm.details.order.id)
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "table",
                      { staticClass: "min-w-full divide-y divide-gray-200" },
                      [
                        _vm._m(3),
                        _vm._v(" "),
                        _c("tbody", [
                          _c("tr", { staticClass: "bg-white" }, [
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _c(
                                  "select",
                                  {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.newItem,
                                        expression: "newItem"
                                      }
                                    ],
                                    staticClass:
                                      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                    on: {
                                      change: function($event) {
                                        var $$selectedVal = Array.prototype.filter
                                          .call($event.target.options, function(
                                            o
                                          ) {
                                            return o.selected
                                          })
                                          .map(function(o) {
                                            var val =
                                              "_value" in o ? o._value : o.value
                                            return val
                                          })
                                        _vm.newItem = $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      }
                                    }
                                  },
                                  _vm._l(_vm.products, function(product) {
                                    return _c(
                                      "option",
                                      { domProps: { value: product } },
                                      [_vm._v(_vm._s(product.name))]
                                    )
                                  }),
                                  0
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.newItem.quantity,
                                      expression: "newItem.quantity"
                                    }
                                  ],
                                  staticClass:
                                    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                                  attrs: {
                                    name: "product.quantity",
                                    id: "product.id",
                                    type: "number",
                                    placeholder: "enter quantuty..."
                                  },
                                  domProps: { value: _vm.newItem.quantity },
                                  on: {
                                    input: function($event) {
                                      if ($event.target.composing) {
                                        return
                                      }
                                      _vm.$set(
                                        _vm.newItem,
                                        "quantity",
                                        $event.target.value
                                      )
                                    }
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                model: {
                                  value: _vm.newItem.price,
                                  callback: function($$v) {
                                    _vm.$set(_vm.newItem, "price", $$v)
                                  },
                                  expression: "newItem.price"
                                }
                              },
                              [
                                _vm._v(
                                  "\n\t          \t\t\t\t\t\t" +
                                    _vm._s(_vm.newItem.price) +
                                    "\n\t          \t\t\t\t\t"
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "td",
                              {
                                staticClass:
                                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                              },
                              [
                                _vm._v(
                                  "\n\t          \t\t\t\t\t\t" +
                                    _vm._s(_vm.newItemPrice()) +
                                    "\n\t          \t\t\t\t\t"
                                )
                              ]
                            )
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "flex mt-6" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
                          attrs: { type: "submit" }
                        },
                        [
                          _vm._v(
                            "Add New Item to the order " +
                              _vm._s(_vm.details.order.id)
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          staticClass:
                            "ml-6 shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
                          on: { click: _vm.clearNewItem }
                        },
                        [_vm._v("Add Cancel")]
                      )
                    ])
                  ]
                )
              : _vm._e()
          ]
        )
      : _c("img", {
          staticClass: "mx-auto my-16",
          attrs: { src: "/image/isLoading.gif" }
        })
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex" }, [
      _c(
        "button",
        {
          staticClass:
            "shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
          attrs: { type: "submit" }
        },
        [_vm._v("Change Order")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex" }, [
      _c(
        "button",
        {
          staticClass:
            "shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
          attrs: { type: "submit" }
        },
        [_vm._v("Change Partner Details")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "bg-gray-100" }, [
      _c("tr", [
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Product Name")])]
        ),
        _vm._v(" "),
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Quantity")])]
        ),
        _vm._v(" "),
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Price")])]
        ),
        _vm._v(" "),
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Sum")])]
        ),
        _vm._v(" "),
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            attrs: { scope: "col" }
          },
          [_c("span", { staticClass: "mx-auto" }, [_vm._v("Delete order")])]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "bg-gray-100" }, [
      _c("tr", [
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Product Name")])]
        ),
        _vm._v(" "),
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Quantity")])]
        ),
        _vm._v(" "),
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Price")])]
        ),
        _vm._v(" "),
        _c(
          "th",
          {
            staticClass:
              "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
            attrs: { scope: "col" }
          },
          [_c("span", [_vm._v("Sum")])]
        )
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/components/EditOrder.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/components/EditOrder.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditOrder_vue_vue_type_template_id_7a1c738a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditOrder.vue?vue&type=template&id=7a1c738a& */ "./resources/js/views/components/EditOrder.vue?vue&type=template&id=7a1c738a&");
/* harmony import */ var _EditOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditOrder.vue?vue&type=script&lang=js& */ "./resources/js/views/components/EditOrder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EditOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditOrder_vue_vue_type_template_id_7a1c738a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditOrder_vue_vue_type_template_id_7a1c738a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/components/EditOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/views/components/EditOrder.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/views/components/EditOrder.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditOrder.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/components/EditOrder.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/components/EditOrder.vue?vue&type=template&id=7a1c738a&":
/*!************************************************************************************!*\
  !*** ./resources/js/views/components/EditOrder.vue?vue&type=template&id=7a1c738a& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditOrder_vue_vue_type_template_id_7a1c738a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./EditOrder.vue?vue&type=template&id=7a1c738a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/views/components/EditOrder.vue?vue&type=template&id=7a1c738a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditOrder_vue_vue_type_template_id_7a1c738a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditOrder_vue_vue_type_template_id_7a1c738a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);