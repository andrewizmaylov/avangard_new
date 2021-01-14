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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'editOrder',
  data: function data() {
    return {
      details: {},
      products: []
    };
  },
  created: function created() {
    var _this = this;

    this.refreshOrder();
    axios.get('/api/products').then(function (response) {
      _this.products = response.data;
      console.log(response);
    })["catch"](function (error) {
      console.log(error);
    });
  },
  methods: {
    saveOrder: function saveOrder() {
      var _this2 = this;

      axios.post('/api/order/' + this.details.order.id, {
        client_email: this.details.order.client_email,
        status: this.details.order.status // id: this.details.order.id

      }).then(function (response) {
        _this2.refreshOrder();

        console.log(response);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    savePartner: function savePartner() {
      var _this3 = this;

      axios.post('/api/partner/' + this.details.order.partner.id, {
        email: this.details.order.partner.email,
        name: this.details.order.partner.name // id: this.details.order.id

      }).then(function (response) {
        _this3.refreshOrder();

        console.log(response);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    saveDetails: function saveDetails() {
      var _this4 = this;

      axios.post('/api/order_products/' + this.details.order.id, this.details.orderDetails).then(function (response) {
        _this4.refreshOrder();

        console.log(response);
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
    markRows: function markRows() {
      var position = 0;
      return this.details.orderDetails.filter(function (item) {
        return item.position = position += 1;
      });
    },
    goOrdersPage: function goOrdersPage() {
      this.$router.push({
        name: 'orders'
      });
    },
    refreshOrder: function refreshOrder() {
      var _this5 = this;

      axios.get('/api/order/' + this.$route.params.order.id).then(function (response) {
        console.log('success');
        _this5.details = response.data;
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
    _c("div", { staticClass: "flex flex-col rounded-lg shadow-lg my-6" }, [
      _c(
        "form",
        {
          staticClass: "w-4/5 mx-auto mb-16",
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
          _c("label", { staticClass: "block tex-sm text-gray-600 mb-2 ml-2" }, [
            _vm._v("Clients email")
          ]),
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
                _vm.$set(_vm.details.order, "client_email", $event.target.value)
              }
            }
          }),
          _vm._v(" "),
          _c("label", { staticClass: "block tex-sm text-gray-600 mb-2 ml-2" }, [
            _vm._v("Order status")
          ]),
          _vm._v(" "),
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.details.order.status,
                  expression: "details.order.status"
                }
              ],
              staticClass:
                "mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
              attrs: { name: "order.status", id: "order.status", type: "text" },
              on: {
                change: function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.$set(
                    _vm.details.order,
                    "status",
                    $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                  )
                }
              }
            },
            [
              _c("option", { domProps: { value: 0 } }, [_vm._v("New order")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 10 } }, [
                _vm._v("Order Confirmed")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 20 } }, [
                _vm._v("Order Completed")
              ])
            ]
          ),
          _vm._v(" "),
          _vm._m(0)
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
          _c("label", { staticClass: "block tex-sm text-gray-600 mb-2 ml-2" }, [
            _vm._v("Partner email")
          ]),
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
          _c("label", { staticClass: "block tex-sm text-gray-600 mb-2 ml-2" }, [
            _vm._v("Partner name")
          ]),
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
                _vm.$set(_vm.details.order.partner, "name", $event.target.value)
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
          _c("table", { staticClass: "min-w-full divide-y divide-gray-200" }, [
            _vm._m(2),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.markRows(), function(product) {
                return _c(
                  "tr",
                  {
                    key: product.id,
                    class:
                      product.position % 2 == 0 ? "bg-gray-100" : "bg-white"
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
                          "\n          \t\t\t\t\t\t" +
                            _vm._s(_vm.productName(product.id)[0].name) +
                            "\n          \t\t\t\t\t"
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
                            type: "number"
                          },
                          domProps: { value: product.quantity },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(product, "quantity", $event.target.value)
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
                          "\n          \t\t\t\t\t\t" +
                            _vm._s(product.price) +
                            "\n          \t\t\t\t\t"
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
                          "\n          \t\t\t\t\t\t" +
                            _vm._s(product.quantity * product.price) +
                            "\n          \t\t\t\t\t"
                        )
                      ]
                    )
                  ]
                )
              }),
              0
            )
          ]),
          _vm._v(" "),
          _vm._m(3)
        ]
      )
    ])
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
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "flex mt-6" }, [
      _c(
        "button",
        {
          staticClass:
            "shadow bg-gray-100 hover:bg-indigo-600 hover:text-white focus:shadow-outline focus:outline-none text-gray-500 font-bold py-2 px-4 rounded",
          attrs: { type: "submit" }
        },
        [_vm._v("Change Order Details")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/views/components/EditOrder.vue":
/*!*****************************************************!*\
  !*** ./resources/js/views/components/EditOrder.vue ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditOrder_vue_vue_type_template_id_7a1c738a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditOrder.vue?vue&type=template&id=7a1c738a& */ "./resources/js/views/components/EditOrder.vue?vue&type=template&id=7a1c738a&");
/* harmony import */ var _EditOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditOrder.vue?vue&type=script&lang=js& */ "./resources/js/views/components/EditOrder.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EditOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EditOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





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
/*! no static exports found */
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