import React, { useEffect, useState, useContext } from "react";
import Helmet from "react-helmet";
// import "./customScript";
// import "vendor.min copy";
import axios from "axios";
import { getSellerSessionToken } from "utils/Common";
import { Context } from "context/newContext";
import SellerPosOrderDetails from "./SellerPosOrderDetails";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { searchFor } from "utils/search-through-all-values-in-objects";
import { getYYYYMMDD } from "utils/DateTime";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAPIErrorHandler } from "api/api";

// TODO: THIS PAGE IS INCOMPLETE AND NEED TO WORK ON IT.
function SellerPos() {
  const [loading, setLoading] = useState(false);

  const myFunc = () => {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js";
    script.id = "googleMaps";
    document.body.appendChild(script);
  };
  useEffect(() => {
    myFunc();
    const script = document.createElement("script");

    // script.src = "https://use.typekit.net/foobar.js";
    script.async = false;
    script.innerHTML = `$(document).on('ready', function () {
    });
function printDiv(divName) {
var printContents = document.getElementById(divName).innerHTML;
var originalContents = document.body.innerHTML;
document.body.innerHTML = printContents;
window.print();
document.body.innerHTML = originalContents;
location.reload();
}

function set_category_filter(id) {
var nurl = new URL('https://6valley.6amtech.com/admin/pos');
nurl.searchParams.set('category_id', id);
location.href = nurl;
}


$('#search-form').on('submit', function (e) {
e.preventDefault();
var keyword= $('#datatableSearch').val();
var nurl = new URL('https://6valley.6amtech.com/admin/pos');
nurl.searchParams.set('keyword', keyword);
location.href = nurl;
});

function store_key(key, value) {
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': "BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz"
    }
});
$.post({
    url: 'https://6valley.6amtech.com/admin/pos/store-keys',
    data: {
        key:key,
        value:value,
    },
    success: function (data) {
        toastr.success(key+' '+'Selected!', {
            CloseButton: true,
            ProgressBar: true
        });
    },
});
}

function addon_quantity_input_toggle(e)
{
var cb = $(e.target);
if(cb.is(":checked"))
{
    cb.siblings('.addon-quantity-input').css({'visibility':'visible'});
}
else
{
    cb.siblings('.addon-quantity-input').css({'visibility':'hidden'});
}
}
function quickView(product_id) {
// $.ajax({
//     url: 'https://6valley.6amtech.com/admin/pos/quick-view',
//     type: 'GET',
//     data: {
//         product_id: product_id
//     },
//     dataType: 'json', // added data type
//     beforeSend: function () {
//         $('#loading').show();
//     },
//     success: function (data) {
//         console.log("success...");
//         console.log(data);

//         // $("#quick-view").removeClass('fade');
//         // $("#quick-view").addClass('show');

//         $('#quick-view').modal('show');
//         $('#quick-view-modal').empty().html(data.view);
//     },
//     complete: function () {
//         $('#loading').hide();
//     },
// });



$('#quick-view').modal('show');
// $('#quick-view-modal').empty().html(data.view);















}

function checkAddToCartValidity() {
var names = {};
$('#add-to-cart-form input:radio').each(function () { // find unique names
    names[$(this).attr('name')] = true;
});
var count = 0;
$.each(names, function () { // then count them
    count++;
});
if ($('input:radio:checked').length == count) {
    return true;
}
return false;
}

function cartQuantityInitialize() {
$('.btn-number').click(function (e) {
    e.preventDefault();

    var fieldName = $(this).attr('data-field');
    var type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());

    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});

$('.input-number').focusin(function () {
    $(this).data('oldValue', $(this).val());
});

$('.input-number').change(function () {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    var name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cart',
            text: 'Sorry, the minimum value was reached'
        });
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cart',
            text: 'Sorry, stock limit exceeded.'
        });
        $(this).val($(this).data('oldValue'));
    }
});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
}

function getVariantPrice() {
if ($('#add-to-cart-form input[name=quantity]').val() > 0 && checkAddToCartValidity()) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });
    $.ajax({
        type: "POST",
        url: 'https://6valley.6amtech.com/admin/pos/variant_price',
        data: $('#add-to-cart-form').serializeArray(),
        success: function (data) {
            
            $('#add-to-cart-form #chosen_price_div').removeClass('d-none');
            $('#add-to-cart-form #chosen_price_div #chosen_price').html(data.price);
            $('#set-discount-amount').html(data.discount);
        }
    });
}
}

function addToCart(form_id = 'add-to-cart-form') {
if (checkAddToCartValidity()) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });
    $.post({
        url: 'https://6valley.6amtech.com/admin/pos/add-to-cart',
        data: $('#' + form_id).serializeArray(),
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            
            if (data.data == 1) {
                Swal.fire({
                    icon: 'info',
                    title: 'Cart',
                    text: "Product already added in cart"
                });
                return false;
            } else if (data.data == 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cart',
                    text: 'Sorry, product is out of stock.'
                });
                return false;
            }
            $('.call-when-done').click();

            toastr.success('Item has been added in your cart!', {
                CloseButton: true,
                ProgressBar: true
            });
            $('#cart').empty().html(data.view);
            //updateCart();
            $('.search-result-box').empty().hide();
            $('#search').val('');
        },
        complete: function () {
            $('#loading').hide();
        }
    });
} else {
    Swal.fire({
        type: 'info',
        title: 'Cart',
        text: 'Please choose all the options'
    });
}
}

function removeFromCart(key) {
//console.log(key);
$.post('https://6valley.6amtech.com/admin/pos/remove-from-cart', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz', key: key}, function (data) {
    
    $('#cart').empty().html(data.view);
    if (data.errors) {
        for (var i = 0; i < data.errors.length; i++) {
            toastr.error(data.errors[i].message, {
                CloseButton: true,
                ProgressBar: true
            });
        }
    } else {
        //updateCart();
        
        toastr.info('Item has been removed from cart', {
            CloseButton: true,
            ProgressBar: true
        });
    }
    

});
}

function emptyCart() {
Swal.fire({
    title: 'Are you sure ',
    text: 'You want to remove all items from cart!!',
    type: 'warning',
    showCancelButton: true,
    cancelButtonColor: 'default',
    confirmButtonColor: '#161853',
    cancelButtonText: 'No',
    confirmButtonText: 'Yes',
    reverseButtons: true
}).then((result) => {
    if (result.value) {
        $.post('https://6valley.6amtech.com/admin/pos/empty-cart', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz'}, function (data) {
            $('#cart').empty().html(data.view);
            toastr.info('Item has been removed from cart', {
                CloseButton: true,
                ProgressBar: true
            });
        });
    }
})
}

function updateCart() {
$.post('https://6valley.6amtech.com/admin/pos/cart-items', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz'}, function (data) {
    $('#cart').empty().html(data);
});
}

$(function(){
$(document).on('click','input[type=number]',function(){ this.select(); });
});


function updateQuantity(key,qty,e){

if(qty!==""){
    var element = $( e.target );
    var minValue = parseInt(element.attr('min'));
    // maxValue = parseInt(element.attr('max'));
    var valueCurrent = parseInt(element.val());

    //var key = element.data('key');

    $.post('https://6valley.6amtech.com/admin/pos/update-quantity', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz', key: key, quantity:qty}, function (data) {
        
        if(data.qty<0)
        {
            toastr.warning('Product quantity is not enough!', {
                CloseButton: true,
                ProgressBar: true
            });
        }
        if(data.upQty==='zeroNegative')
        {
            toastr.warning('Product quantity can not be zero or less than zero in cart!', {
                CloseButton: true,
                ProgressBar: true
            });
        }
        if(data.qty_update==1){
            toastr.success('Product quantity updated!', {
                CloseButton: true,
                ProgressBar: true
            });
        }
        $('#cart').empty().html(data.view);
    });
}else{
    var element = $( e.target );
    var minValue = parseInt(element.attr('min'));
    var valueCurrent = parseInt(element.val());

    $.post('https://6valley.6amtech.com/admin/pos/update-quantity', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz', key: key, quantity:minValue}, function (data) {
        
        if(data.qty<0)
        {
            toastr.warning('Product quantity is not enough!', {
                CloseButton: true,
                ProgressBar: true
            });
        }
        if(data.upQty==='zeroNegative')
        {
            toastr.warning('Product quantity can not be zero or less than zero in cart!', {
                CloseButton: true,
                ProgressBar: true
            });
        }
        if(data.qty_update==1){
            toastr.success('Product quantity updated!', {
                CloseButton: true,
                ProgressBar: true
            });
        }
        $('#cart').empty().html(data.view);
    });
}

// Allow: backspace, delete, tab, escape, enter and .
if(e.type == 'keydown')
{
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

};

// INITIALIZATION OF SELECT2
// =======================================================
$('.js-select2-custom').each(function () {
var select2 = $.HSCore.components.HSSelect2.init($(this));
});

$('.js-data-example-ajax').select2({
ajax: {
    url: 'https://6valley.6amtech.com/admin/pos/customers',
    data: function (params) {
        return {
            q: params.term, // search term
            page: params.page
        };
    },
    processResults: function (data) {
        return {
        results: data
        };
    },
    __port: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
    }
}
});

$('#order_place').submit(function(eventObj) {
if($('#customer').val())
{
    $(this).append('<input type="hidden" name="user_id" value="'+$('#customer').val()+'" /> ');
}
return true;
});
`;

    document.body.appendChild(script);
  }, []);

  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);

  const defaultMainState = {
    cartItems: [],
    customerDetails: {
      customerName: "",
      customerId: "",
      customerCartId: "",
      customerCartName: "",
    },
    // customerList: [],
    selected: {
      product_id: "",
      quantity: 0,
      category_id: "",
      category_name: "",
      customer_id: "",
      customer_name: "",
      cart_id: "",
      cart_name: "",
      customerMobile: "",
    },
    addNewCustomer: {
      _id: "",
      f_name: "",
      l_name: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      address: "",
      disable: false,
    },
    newCustomerDetails: {},
    bill: {
      subTotal: 0,
      productDiscount: 0,
      extraDiscount: 0,
      couponDiscount: 0,
      tax: 0,
      grandTotal: 0,
      paymentmode: "upi",
    },
  };

  const [mainState, setMainState] = useState({
    allCategories: [],
    cartItems: [],
    customerDetails: {
      customerName: "",
      customerId: "",
      customerCartId: "",
      customerCartName: "",
    },
    customerList: [],
    selected: {
      product_id: "",
      quantity: 0,
      category_id: "",
      category_name: "",
      customer_id: "",
      customer_name: "",
      cart_id: "",
      cart_name: "",
      customerMobile: "",
    },
    addNewCustomer: {
      _id: "",
      f_name: "",
      l_name: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      address: "",
      disable: false,
    },
    productList: [],
    newCustomerDetails: {},
    bill: {
      subTotal: 0,
      productDiscount: 0,
      extraDiscount: 0,
      tax: 0,
      grandTotal: 0,
      couponDiscount: 0,
      paymentmode: "upi",
    },
  });

  const handleGetCustomerDetails = (phone) => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      // data: formData,
    })
      .then((response) => {
        console.log(response.data);
        // navigate("/seller/dashboard", { replace: true });
        setMainState((prev) => ({
          ...prev,
          productList: [...response.data.data],
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };
  const handleRemoveFromCart = (e, index) => {
    const newCartItems = mainState.cartItems.slice();
    newCartItems.splice(index, 1);

    setMainState((prev) => ({
      ...prev,
      cartItems: newCartItems,
    }));
  };
  const handleChangeQtyOfCartItem = (e, index) => {
    const newCartItems = mainState.cartItems.slice();
    newCartItems[index].quantity = e.target.value;

    if (+e.target.value <= 0) {
      alert("Invalid Value");
      return;
    }
    if (+newCartItems[index].product_stock < +e.target.value) {
      alert("Not Enough Stock Available for this Product");
      return;
    }
    if (+newCartItems[index].p_quantity < +e.target.value) {
      alert("Not Enough Stock Available for this Product");
      return;
    }

    setMainState((prev) => ({
      ...prev,
      cartItems: newCartItems,
    }));
  };
  const handleAddToCart = () => {
    const newCartItems = mainState.cartItems.slice();
    newCartItems.push({
      product_id: mainState.selected.product_id,
      quantity: mainState.selected.quantity,
    });

    setMainState((prev) => ({
      ...prev,
      cartItems: newCartItems,
    }));
  };
  const validateBeforeSubmitAddNewCustomer = () => {
    return true;
  };
  const handleSubmitAddNewCustomer = (e) => {
    e.preventDefault();
    // validateBefore
    if (!validateBeforeSubmitAddNewCustomer) {
      return;
    }

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/posuser",
      headers: {
        "Content-Type": "application/json",
        Authorization: state.sellerToken,
      },
      // data: JSON.stringify({
      //   email: mainState.addNewCustomer.email,
      //   password: "123123123",
      //   phone: mainState.addNewCustomer.phone,
      //   f_name: mainState.addNewCustomer.f_name,
      //   l_name: mainState.addNewCustomer.l_name,
      //   social_id: "fb-testuser6",
      //   login_medium: "123",
      // }),
      data: JSON.stringify({
        firstname: mainState.addNewCustomer.f_name,
        lastname: mainState.addNewCustomer.l_name,
        email: mainState.addNewCustomer.email,
        phone: +mainState.addNewCustomer.phone,
        country: mainState.addNewCustomer.country,
        state: mainState.addNewCustomer.state,
        city: mainState.addNewCustomer.city,
        address: mainState.addNewCustomer.address,
        zipcode: mainState.addNewCustomer.zip_code,
      }),
    })
      .then(function (response) {
        console.log(response.data.data);
        if (response.data.status === "OK") {
          alert("Customer Successfully registered.");
          getPOSUserList();
          // let newObj = [response.data.data];
          // newObj[0].f_name = newObj[0].firstname;
          // newObj[0].l_name = newObj[0].lastname;
          // newObj[0].zip_code = newObj[0].zipcode;
          // newObj[0].disable = true;
          // // delete newObj[0].firstname;
          // // delete newObj[0].lastname;

          // setMainState((prev) => ({
          //   ...prev,
          //   addNewCustomer: { ...response.data.data },
          //   customerList: [...prev.customerList, { ...response.data.data }],
          // }));
        }
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };
  const handleClearCart = () => {
    setMainState((prev) => ({
      ...prev,
      cartItems: [],
    }));
  };
  const handleNewOrder = () => {
    setMainState((prev) => ({
      ...prev,
      ...defaultMainState,
    }));
  };
  const validateBeforeSubmitOrder = () => {
    return true || false;
  };
  const callAddToCartAPI = async (item) => {
    await axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/cart",
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        product_id: item._id,
        quantity: "" + item.quantity,
        user_id: mainState.addNewCustomer?._id || "",
      }),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));

        if ((response.data.code = 403)) {
          alert(response.data.message);
          console.log(response.data.message);
          return;
        } else if ((response.data.code = 200)) {
          console.log(
            `Product Added to cart api: ${item?.pname} ${item?.quantity}`
          );
          return;
        }
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };
  const handleSubmitOrder = async (e) => {
    const isValid = validateBeforeSubmitOrder();

    if (!isValid) {
      return alert("Invalid Order");
    }

    e.preventDefault();
    if (!mainState.cartItems.length) {
      alert("Cart can not be empty");
      return;
    }

    if (mainState.addNewCustomer._id === "") {
      alert("Add Customer First");
      return;
    }

    for (let num = 0; num < mainState.cartItems.length; num++) {
      const element = await callAddToCartAPI(mainState.cartItems[num]);
    }

    // BUG: never use forEach for async await things
    // mainState.cartItems.forEach((item) => {
    //   callAddToCartAPI(item);
    // });

    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/order",
      headers: {
        Authorization: state.sellerToken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        paymentmode: mainState.bill.paymentmode,
        customer_name:
          mainState.addNewCustomer.f_name +
          " " +
          mainState.addNewCustomer.l_name,
        customer_mobile: mainState.addNewCustomer.phone.toString(),
        payment_status: "paid",
        order_address: mainState.addNewCustomer.address,
        order_city: mainState.addNewCustomer.city,
        order_state: mainState.addNewCustomer.state,
        order_country: mainState.addNewCustomer.country,
        order_pincode: mainState.addNewCustomer.zip_code,
        cc_discount: "0",
        delivery_charge: "0",
        order_type: "offline",
        user_id: mainState.addNewCustomer._id,
        delivery_time_slot: "0:00",
        Delivery_date: getYYYYMMDD(),
      }),
    })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.code === 200) {
          alert("Order Successfully placed");
        }
      })
      .catch(function (error) {
        defaultAPIErrorHandler(error)
      });
  };
  const handleInputChange = (e) => {
    const { name } = e.target;

    if (name === "category") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          category_id: e.target.value,
          category_name: e.target.options[e.target.selectedIndex].text,
        },
        productList:
          e.target.value === ""
            ? prev.resproductList
            : prev.resproductList.filter(
                (item) => item.category_id === e.target.value
              ),
      }));
    } else if (name === "customer") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          customer_id: e.target.value,
          customer_name: e.target.options[e.target.selectedIndex].text,
          cart_id: mainState.customerList.filter(
            (item) => item.id === e.target.value
          )?.[0]?.cartId,
        },
      }));
      console.log(e.target.value);
    } else if (name === "cart") {
      setMainState((prev) => ({
        ...prev,
        selected: {
          ...prev.selected,
          cart_id: e.target.value,
          cart_name: e.target.options[e.target.selectedIndex].text,
          customer_id: mainState.customerList.filter(
            (item) => item.cartId === e.target.value
          )?.[0]?.id,
          customer_name: mainState.customerList.filter(
            (item) => item.cartId === e.target.value
          )?.[0]?.name,
        },
      }));
    } else if (
      name === "f_name" ||
      name === "l_name" ||
      name === "email" ||
      name === "phone" ||
      name === "country" ||
      name === "state" ||
      name === "city" ||
      name === "zip_code" ||
      name === "address"
    ) {
      // if (name === "zip_code" || name === "phone") {
      //   setMainState((prev) => ({
      //     ...prev,
      //     addNewCustomer: {
      //       ...prev.addNewCustomer,
      //       [name]: +e.target.value,
      //     },
      //   }));
      // } else {
      setMainState((prev) => ({
        ...prev,
        addNewCustomer: {
          ...prev.addNewCustomer,
          [name]: e.target.value,
        },
      }));
      // }
    } else if (name === "customerMobile") {
      console.log(1, e.target.value);
      if (e.target.value.toString().length > 10) {
        alert("Mobile number must be of 10 digits");
        return;
      } else if (e.target.value.length === 10) {
        if (mainState.customerList.length) {
          console.log(e.target.value, "p");
          console.log(
            mainState.customerList?.filter((item) => {
              return item.phone === +e.target.value;
            })
          );

          const newObj = mainState.customerList?.filter((item) => {
            return item.phone === +e.target.value;
          });

          console.log(newObj.length);
          console.log(newObj);

          if (!!newObj.length) {
            newObj[0].f_name = newObj[0].firstname;
            newObj[0].l_name = newObj[0].lastname;
            newObj[0].zip_code = newObj[0].zipcode;
            newObj[0].disable = true;
            // delete newObj[0].firstname;
            // delete newObj[0].lastname;
            // delete newObj[0].zipcode;

            setMainState((prev) => ({
              ...prev,
              selected: {
                ...prev.selected,
                [name]: +e.target.value,
                customer_name: `${newObj[0].f_name} ${newObj[0].l_name}`,
              },
              addNewCustomer: {
                ...prev.addNewCustomer,
                ...newObj[0],
                phone: +e.target.value,
              },
            }));
          } else {
            setMainState((prev) => ({
              ...prev,
              selected: {
                ...prev.selected,
                [name]: +e.target.value,
              },
              addNewCustomer: {
                ...prev.addNewCustomer,
                ...newObj[0],
                phone: +e.target.value,
              },
            }));
          }
        } else {
          setMainState((prev) => ({
            ...prev,
            selected: {
              ...prev.selected,
              [name]: +e.target.value,
              customer_name: "",
            },
            addNewCustomer: {
              ...prev.addNewCustomer,
              _id: "",
              f_name: "",
              l_name: "",
              email: "",
              // phone: "",
              phone: +e.target.value,
              country: "",
              state: "",
              city: "",
              zip_code: "",
              address: "",
              disable: false,
            },
          }));
        }
      } else if (e.target.value.toString() === "") {
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: "",
            customer_name: "",
          },
          addNewCustomer: {
            _id: "",
            f_name: "",
            l_name: "",
            email: "",
            phone: "",
            // phone: +e.target.value,
            country: "",
            state: "",
            city: "",
            zip_code: "",
            address: "",
            disable: false,
          },
        }));
      } else {
        setMainState((prev) => ({
          ...prev,
          selected: {
            ...prev.selected,
            [name]: +e.target.value,
            customer_name: "",
          },
          addNewCustomer: {
            ...prev.addNewCustomer,
            _id: "",
            f_name: "",
            l_name: "",
            email: "",
            // phone: "",
            phone: +e.target.value,
            country: "",
            state: "",
            city: "",
            zip_code: "",
            address: "",
            disable: false,
          },
        }));
      }
    } else if (name === "search") {
      console.log(e.target.value);
      setMainState((prev) => ({
        ...prev,
        selected: { ...prev.selected, [name]: e.target.value },
        // productList: e.target.value?.length > 1 ? searchFor(e.target.value, prev.resproductList) : prev.resproductList,
        productList: searchFor(e.target.value, prev.resproductList),
      }));

      // setMainState((prev) => ({
      //   ...prev,

      //   selected: { ...prev.selected, [name]: e.target.value },
      //   productList:
      //     e.target.value === ""
      //       ? prev.resproductList
      //       : prev.resproductList.filter((item) => item.pname.toLowerCase().includes(e.target.value.toLowerCase())),
      // }));
    } else {
      setMainState((prev) => ({ ...prev, [name]: e.target.value }));
    }
  };
  const validateBeforeAddProduct = () => {
    return true || false;
  };
  const getAllCat_SubCat_SubSubCat = () => {
    const config3 = {
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      // data: formData,
    };
    axios(config3)
      .then((response) => {
        console.log(
          "🌊subsubcategory api called"
          // , JSON.stringify(response.data)
        );
        setMainState((prev) => ({
          ...prev,
          allCategories: response.data.data,
        }));
        return;

        // navigate("/seller/dashboard", { replace: true });
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
        return [];
      });
  };
  const getProducts = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/product",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      // data: formData,
    })
      .then((response) => {
        console.log(response.data);
        // navigate("/seller/dashboard", { replace: true });
        setMainState((prev) => ({
          ...prev,
          productList: [...response.data.data],
          resproductList: [...response.data.data],
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };
  const getPOSUserList = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "/api/posuser/userdata",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.sellerToken,
      },
      // data: formData,
    })
      .then((response) => {
        console.log("🔥", response.data);

        // navigate("/seller/dashboard", { replace: true });
        setMainState((prev) => ({
          ...prev,
          addNewCustomer: {
            f_name: "",
            l_name: "",
            email: "",
            phone: "",
            country: "",
            state: "",
            city: "",
            address: "",
            zip_code: "",
          },
          customerList: [...response.data.data],
        }));
      })
      .catch((error) => {
        // defaultAPIErrorHandler(error)
      });
  };

  useEffect(() => {
    getProducts();
    getPOSUserList();
    getAllCat_SubCat_SubSubCat();
  }, []);

  useEffect(() => {
    console.log("sda");
    if (mainState.cartItems.length) {
      console.log("dsa");
      const productDiscount = mainState.cartItems.reduce((acc, obj) => {
        return (
          acc +
            obj.display_price * obj.quantity -
            obj.selling_price * obj.quantity || 0
        );
      }, 0);

      const subTotal = mainState.cartItems.reduce((acc, obj) => {
        return acc + obj.selling_price * obj.quantity || 0;
      }, 0);

      const grandTotal = mainState.cartItems.reduce((acc, obj) => {
        return acc + obj.selling_price * obj.quantity || 0;
      }, 0);

      setMainState((prev) => ({
        ...prev,
        bill: {
          ...prev.bill,
          subTotal: subTotal,
          productDiscount: productDiscount,
          grandTotal: grandTotal,
        },
      }));
      console.log(productDiscount, subTotal);
    }
  }, [mainState.cartItems, mainState.cartItems.length]);

  return (
    <div className="footer-offset">
      <Helmet>
        <script type="text/javascript">{`
          $(document).on('ready', function () {
          });
  function printDiv(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;
      d
ocument.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload();
  }

  function set_category_filter(id) {
      var nurl = new URL('https://6valley.6amtech.com/admin/pos');
      nurl.searchParams.set('category_id', id);
      location.href = nurl;
  }


  $('#search-form').on('submit', function (e) {
      e.preventDefault();
      var keyword= $('#datatableSearch').val();
      var nurl = new URL('https://6valley.6amtech.com/admin/pos');
      nurl.searchParams.set('keyword', keyword);
      location.href = nurl;
  });
  function store_key(key, value) {
      $.ajaxSetup({
          headers: {
              'X-CSRF-TOKEN': "BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz"
          }
      });
      $.post({
          url: 'https://6valley.6amtech.com/admin/pos/store-keys',
          data: {
              key:key,
              value:value,
          },
          success: function (data) {
              toastr.success(key+' '+'Selected!', {
                  CloseButton: true,
                  ProgressBar: true
              });
          },
      });
  }

  function addon_quantity_input_toggle(e)
  {
      var cb = $(e.target);
      if(cb.is(":checked"))
      {
          cb.siblings('.addon-quantity-input').css({'visibility':'visible'});
      }
      else
      {
          cb.siblings('.addon-quantity-input').css({'visibility':'hidden'});
      }
  }
  // function quickView(product_id) {
  //     $.ajax({
  //         url: 'https://6valley.6amtech.com/admin/pos/quick-view',
  //         type: 'GET',
  //         data: {
  //             product_id: product_id
  //         },
  //         dataType: 'json', // added data type
  //         beforeSend: function () {
  //             $('#loading').show();
  //         },
  //         success: function (data) {
  //             console.log("success...");
  //             console.log(data);

  //             // $("#quick-view").removeClass('fade');
  //             // $("#quick-view").addClass('show');

  //             $('#quick-view').modal('show');
  //             $('#quick-view-modal').empty().html(data.view);
  //         },
  //         complete: function () {
  //             $('#loading').hide();
  //         },
  //     });

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
  }

  function checkAddToCartValidity() {
      var names = {};
      $('#add-to-cart-form input:radio').each(function () { // find unique names
          names[$(this).attr('name')] = true;
      });
      var count = 0;
      $.each(names, function () { // then count them
          count++;
      });
      if ($('input:radio:checked').length == count) {
          return true;
      }
      return false;
  }

  function cartQuantityInitialize() {
      $('.btn-number').click(function (e) {
          e.preventDefault();

          var fieldName = $(this).attr('data-field');
          var type = $(this).attr('data-type');
          var input = $("input[name='" + fieldName + "']");
          var currentVal = parseInt(input.val());

          if (!isNaN(currentVal)) {
              if (type == 'minus') {

                  if (currentVal > input.attr('min')) {
                      input.val(currentVal - 1).change();
                  }
                  if (parseInt(input.val()) == input.attr('min')) {
                      $(this).attr('disabled', true);
                  }

              } else if (type == 'plus') {

                  if (currentVal < input.attr('max')) {
                      input.val(currentVal + 1).change();
                  }
                  if (parseInt(input.val()) == input.attr('max')) {
                      $(this).attr('disabled', true);
                  }

              }
          } else {
              input.val(0);
          }
      });

      $('.input-number').focusin(function () {
          $(this).data('oldValue', $(this).val());
      });

      $('.input-number').change(function () {

          minValue = parseInt($(this).attr('min'));
          maxValue = parseInt($(this).attr('max'));
          valueCurrent = parseInt($(this).val());

          var name = $(this).attr('name');
          if (valueCurrent >= minValue) {
              $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Cart',
                  text: 'Sorry, the minimum value was reached'
              });
              $(this).val($(this).data('oldValue'));
          }
          if (valueCurrent <= maxValue) {
              $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Cart',
                  text: 'Sorry, stock limit exceeded.'
              });
              $(this).val($(this).data('oldValue'));
          }
      });
      $(".input-number").keydown(function (e) {
          // Allow: backspace, delete, tab, escape, enter and .
          if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
              // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
              // Allow: home, end, left, right
              (e.keyCode >= 35 && e.keyCode <= 39)) {
              // let it happen, don't do anything
              return;
          }
          // Ensure that it is a number and stop the keypress
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
          }
      });
  }

  function getVariantPrice() {
      if ($('#add-to-cart-form input[name=quantity]').val() > 0 && checkAddToCartValidity()) {
          $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
              }
          });
          $.ajax({
              type: "POST",
              url: 'https://6valley.6amtech.com/admin/pos/variant_price',
              data: $('#add-to-cart-form').serializeArray(),
              success: function (data) {
                  
                  $('#add-to-cart-form #chosen_price_div').removeClass('d-none');
                  $('#add-to-cart-form #chosen_price_div #chosen_price').html(data.price);
                  $('#set-discount-amount').html(data.discount);
              }
          });
      }
  }

  function addToCart(form_id = 'add-to-cart-form') {
      if (checkAddToCartValidity()) {
          $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
              }
          });
          $.post({
              url: 'https://6valley.6amtech.com/admin/pos/add-to-cart',
              data: $('#' + form_id).serializeArray(),
              beforeSend: function () {
                  $('#loading').show();
              },
              success: function (data) {
                  
                  if (data.data == 1) {
                      Swal.fire({
                          icon: 'info',
                          title: 'Cart',
                          text: "Product already added in cart"
                      });
                      return false;
                  } else if (data.data == 0) {
                      Swal.fire({
                          icon: 'error',
                          title: 'Cart',
                          text: 'Sorry, product is out of stock.'
                      });
                      return false;
                  }
                  $('.call-when-done').click();

                  toastr.success('Item has been added in your cart!', {
                      CloseButton: true,
                      ProgressBar: true
                  });
                  $('#cart').empty().html(data.view);
                  //updateCart();
                  $('.search-result-box').empty().hide();
                  $('#search').val('');
              },
              complete: function () {
                  $('#loading').hide();
              }
          });
      } else {
          Swal.fire({
              type: 'info',
              title: 'Cart',
              text: 'Please choose all the options'
          });
      }
  }

  function removeFromCart(key) {
      //console.log(key);
      $.post('https://6valley.6amtech.com/admin/pos/remove-from-cart', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz', key: key}, function (data) {
          
          $('#cart').empty().html(data.view);
          if (data.errors) {
              for (var i = 0; i < data.errors.length; i++) {
                  toastr.error(data.errors[i].message, {
                      CloseButton: true,
                      ProgressBar: true
                  });
              }
          } else {
              //updateCart();
              
              toastr.info('Item has been removed from cart', {
                  CloseButton: true,
                  ProgressBar: true
              });
          }
          

      });
  }

  function emptyCart() {
      Swal.fire({
          title: 'Are you sure ',
          text: 'You want to remove all items from cart!!',
          type: 'warning',
          showCancelButton: true,
          cancelButtonColor: 'default',
          confirmButtonColor: '#161853',
          cancelButtonText: 'No',
          confirmButtonText: 'Yes',
          reverseButtons: true
      }).then((result) => {
          if (result.value) {
              $.post('https://6valley.6amtech.com/admin/pos/empty-cart', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz'}, function (data) {
                  $('#cart').empty().html(data.view);
                  toastr.info('Item has been removed from cart', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              });
          }
      })
  }

  function updateCart() {
      $.post('https://6valley.6amtech.com/admin/pos/cart-items', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz'}, function (data) {
          $('#cart').empty().html(data);
      });
  }

 $(function(){
      $(document).on('click','input[type=number]',function(){ this.select(); });
  });


  function updateQuantity(key,qty,e){
      
      if(qty!==""){
          var element = $( e.target );
          var minValue = parseInt(element.attr('min'));
          // maxValue = parseInt(element.attr('max'));
          var valueCurrent = parseInt(element.val());

          //var key = element.data('key');
      
          $.post('https://6valley.6amtech.com/admin/pos/update-quantity', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz', key: key, quantity:qty}, function (data) {
              
              if(data.qty<0)
              {
                  toastr.warning('Product quantity is not enough!', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              }
              if(data.upQty==='zeroNegative')
              {
                  toastr.warning('Product quantity can not be zero or less than zero in cart!', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              }
              if(data.qty_update==1){
                  toastr.success('Product quantity updated!', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              }
              $('#cart').empty().html(data.view);
          });
      }else{
          var element = $( e.target );
          var minValue = parseInt(element.attr('min'));
          var valueCurrent = parseInt(element.val());
      
          $.post('https://6valley.6amtech.com/admin/pos/update-quantity', {_token: 'BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz', key: key, quantity:minValue}, function (data) {
              
              if(data.qty<0)
              {
                  toastr.warning('Product quantity is not enough!', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              }
              if(data.upQty==='zeroNegative')
              {
                  toastr.warning('Product quantity can not be zero or less than zero in cart!', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              }
              if(data.qty_update==1){
                  toastr.success('Product quantity updated!', {
                      CloseButton: true,
                      ProgressBar: true
                  });
              }
              $('#cart').empty().html(data.view);
          });
      }
      
      // Allow: backspace, delete, tab, escape, enter and .
      if(e.type == 'keydown')
      {
          if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
              // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
              // Allow: home, end, left, right
              (e.keyCode >= 35 && e.keyCode <= 39)) {
              // let it happen, don't do anything
              return;
          }
          // Ensure that it is a number and stop the keypress
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
          }
      }

  };

  // INITIALIZATION OF SELECT2
  // =======================================================
  $('.js-select2-custom').each(function () {
      var select2 = $.HSCore.components.HSSelect2.init($(this));
  });

  $('.js-data-example-ajax').select2({
      ajax: {
          url: 'https://6valley.6amtech.com/admin/pos/customers',
          data: function (params) {
              return {
                  q: params.term, // search term
                  page: params.page
              };
          },
          processResults: function (data) {
              return {
              results: data
              };
          },
          __port: function (params, success, failure) {
              var $request = $.ajax(params);

              $request.then(success);
              $request.fail(failure);

              return $request;
          }
      }
  });

  $('#order_place').submit(function(eventObj) {
      if($('#customer').val())
      {
          $(this).append('<input type="hidden" name="user_id" value="'+$('#customer').val()+'" /> ');
      }
      return true;
  });

        `}</script>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="loading" style={{ display: "none" }} className="d-none">
              <div
                style={{
                  position: "fixed",
                  zIndex: 9999,
                  left: "40%",
                  top: "37%",
                  width: "100%",
                }}
              >
                <img
                  width={200}
                  src="https://6valley.6amtech.com/public/assets/admin/img/loader.gif"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <header
        id="header"
        className="col-12 navbar navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered"
      >
        <div className="navbar-nav-wrap">
          <div className="navbar-brand-wrapper">
            <Link
              className="navbar-brand"
              to="/seller/dashboard"
              aria-label="Front"
              style={{
                paddingTop: "0!important",
                paddingBottom: "0!important",
                backgroundColor: "rgb(59, 113, 222)",
              }}
            >
              <img
                className
                style={{ height: "55px" }}
                // src={
                //   process.env.REACT_APP_PUBLIC_URL +
                //   // "/abc/fav2.jpg"
                //   "/storage/app/public/company/2021-11-22-619b218f20766.png"
                // }
                src="/zambet_logo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div className="navbar-nav-wrap-content-right">
            <ul className="navbar-nav align-items-center flex-row">
              <li className="nav-item d-sm-inline-block">
                <div className="hs-unfold">
                  <a
                    id="short-cut"
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    data-toggle="modal"
                    data-target="#short-cut-keys"
                    title="Short cut keys"
                    data-hs-unfold-invoker
                  >
                    <i className="tio-keyboard" />
                  </a>
                </div>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <div className="hs-unfold">
                  <a
                    className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
                    href
                    data-hs-unfold-invoker
                  >
                    <i className="tio-shopping-cart-outlined" />
                  </a>
                </div>
              </li>
              <li className="nav-item">
                <div className="hs-unfold">
                  <a
                    className="js-hs-unfold-invoker navbar-dropdown-account-wrapper"
                    href="javascript:;"
                    data-hs-unfold-options='{
                               "target": "#accountNavbarDropdown",
                               "type": "css-animation"
                             }'
                    data-hs-unfold-target="#accountNavbarDropdown"
                    data-hs-unfold-invoker
                  >
                    <div className="avatar avatar-sm avatar-circle">
                      <img
                        className="avatar-img"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg"
                        alt="Image"
                      />
                      <span className="avatar-status avatar-sm-status avatar-status-success" />
                    </div>
                  </a>
                  <div
                    id="accountNavbarDropdown"
                    className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account hs-unfold-hidden hs-unfold-content-initialized hs-unfold-css-animation animated"
                    style={{ width: "16rem", animationDuration: "300ms" }}
                    data-hs-target-height="128.8"
                    data-hs-unfold-content
                    data-hs-unfold-content-animation-in="slideInUp"
                    data-hs-unfold-content-animation-out="fadeOut"
                  >
                    <div className="dropdown-item-text">
                      <div className="media align-items-center text-break">
                        <div className="avatar avatar-sm avatar-circle mr-2">
                          <img
                            className="avatar-img"
                            src={
                              state.sellerProfile?.vendor_photo
                                ? state.sellerProfile?.vendor_photo
                                : "https://6valley.6amtech.com/public/assets/back-end/img/160x160/img1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="media-body">
                          <span className="card-title h5">
                            {state.sellerProfile
                              ? `${state.sellerProfile?.first_name} ${state.sellerProfile?.last_name}`
                              : "kamrujjaman"}
                          </span>
                          <span className="card-text">
                            {state.sellerProfile
                              ? state.sellerProfile?.email_address
                              : "test.seller@gmail.com"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link
                      className="dropdown-item"
                      to="/seller/auth/logout"
                      onclick="Swal.fire({
                              title: 'Do you want to logout?',
                              showDenyButton: true,
                              showCancelButton: true,
                              confirmButtonColor: '#FC6A57',
                              cancelButtonColor: '#363636',
                              confirmButtonText: `Yes`,
                              denyButtonText: `Don't Logout`,
                              }).then((result) => {
                              if (result.value) {
                              location.href='https://6valley.6amtech.com/admin/auth/logout';
                              } else{
                              Swal.fire('Canceled', '', 'info')
                              }
                              })"
                    >
                      <span className="text-truncate pr-2" title="Sign out">
                        Sign out
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main id="content" role="main" className="main pointer-event">
        <section className="section-content padding-y-sm bg-default mt-1">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 card padding-y-sm ">
                <div className="card-header">
                  <div className="row w-100 d-flex justify-content-between">
                    <div className="col-sm-6 col-md-12 col-lg-5 mb-2">
                      <form className="col-sm-12 col-md-12 col-lg-12">
                        <div className="input-group-overlay input-group-merge input-group-flush">
                          <div className="input-group-prepend">
                            <div className="input-group-text">
                              <i className="tio-search" />
                            </div>
                          </div>
                          <input
                            id="search"
                            autoComplete="off"
                            type="text"
                            name="search"
                            className="form-control search-bar-input"
                            placeholder="Search here"
                            aria-label="Search here"
                            value={mainState.selected.search}
                            onChange={handleInputChange}
                          />
                          <div
                            className="card search-card w-4"
                            style={{
                              position: "absolute",
                              zIndex: 1,
                              width: "100%",
                            }}
                          >
                            <div
                              id="search-box"
                              className="card-body search-result-box"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-5">
                      <div className="input-group float-right">
                        <select
                          name="category"
                          // id="category"
                          className="form-control js-select2-custom mx-1"
                          // title="select category"
                          // onchange="set_category_filter(this.value)"
                          // data-select2-id="category"
                          // tabIndex={-1}
                          // aria-hidden="true"
                          onChange={handleInputChange}
                          value={mainState.selected.category_id}
                        >
                          <option value="" selected>
                            All Categories
                          </option>
                          {!!mainState.allCategories &&
                            !!mainState.allCategories.length &&
                            mainState.allCategories?.map((item) => (
                              <option
                                key={item._id}
                                value={item._id}
                                selected={item._id === mainState.category_id}
                              >
                                {item.category_name}
                              </option>
                            ))}
                          {/* <option value data-select2-id={2}>
                            All Categories
                          </option>
                          <option value={116} data-select2-id={3}>
                            Beauty, Health &amp; Hair
                          </option>
                          <option value={114} data-select2-id={4}>
                            Home Improvement &amp; Tools
                          </option>
                          <option value={47} data-select2-id={5}>
                            Outdoor Fun &amp; Sports
                          </option>
                          <option value={46} data-select2-id={6}>
                            Toys , Kids &amp; Babies
                          </option>
                          <option value={45} data-select2-id={7}>
                            Bags &amp; Shoes
                          </option>
                          <option value={44} data-select2-id={8}>
                            Home, Pet &amp; Appliances
                          </option>
                          <option value={43} data-select2-id={9}>
                            Jewelry &amp; Watches
                          </option>
                          <option value={40} data-select2-id={10}>
                            Computer, Office &amp; Security
                          </option>
                          <option value={39} data-select2-id={11}>
                            Phones &amp; Telecom
                          </option>
                          <option value={38} data-select2-id={12}>
                            Men's Fashion
                          </option>
                          <option value={37} data-select2-id={13}>
                            Women's Fashion
                          </option> */}
                        </select>
                        <span
                          className="select2 select2-container select2-container--default select2-hidden-accessible"
                          dir="ltr"
                          data-select2-id={1}
                          style={{ width: "100%" }}
                        >
                          <span className="selection">
                            <span
                              className="select2-selection custom-select"
                              role="combobox"
                              aria-haspopup="true"
                              aria-expanded="false"
                              title="select category"
                              tabIndex={0}
                              aria-disabled="false"
                              aria-labelledby="select2-category-container"
                            >
                              <span
                                className="select2-selection__rendered"
                                id="select2-category-container"
                                role="textbox"
                                aria-readonly="true"
                                title="All Categories"
                              >
                                <span>All Categories</span>
                              </span>
                              <span
                                className="select2-selection__arrow"
                                role="presentation"
                              >
                                <b role="presentation" />
                              </span>
                            </span>
                          </span>
                          <span
                            className="dropdown-wrapper"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body" id="items">
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "70vh", overflowY: "scroll" }}
                  >
                    <table
                      id="datatable"
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th>SL#</th>
                          {/* <th>
                            Product Photo
                          </th> */}
                          <th>Product Name</th>
                          <th>HSN Code</th>
                          <th>Product Qty</th>
                          <th>MRP</th>
                          <th>Selling Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td colSpan={"100%"}>
                              <center>
                                <ClipLoader
                                  // color={"#ffffff"}
                                  // loading={!!camps}
                                  loading
                                  // cssOverride={override}
                                  // size={150}
                                />
                              </center>
                            </td>
                          </tr>
                        )}
                        {!!mainState.productList.length &&
                          mainState.productList.map((item, index) => (
                            <tr
                              key={index}
                              onClick={() => {
                                console.log(item);
                                if (+item.product_stock <= 0) {
                                  alert("Product is Out Of Stock");
                                } else {
                                  if (
                                    mainState.cartItems.filter(
                                      (item2) => item2._id === item._id
                                    ).length === 0
                                  ) {
                                    setMainState((prev) => ({
                                      ...prev,
                                      cartItems: [
                                        ...prev.cartItems,
                                        { ...item, quantity: 1 },
                                      ],
                                    }));
                                  } else {
                                    alert("Already in cart");
                                  }
                                }
                              }}
                            >
                              <th scope="row">{index + 1}</th>
                              {/* <td
                                style={{
                                  width: "2vw",
                                  textAlign: "center",
                                }}
                              >
                              <label
                                className={`badge badge-${
                                  item.verifyStatus === "Approved"
                                    ? "success"
                                    : item.verifyStatus === "Denied"
                                    ? "danger"
                                    : "warning"
                                }`}
                              >
                                {item.verifyStatus}
                              </label> 
                                <img
                                  src={item.pphoto}
                                  style={{
                                    width: "2vw",
                                  }}
                                ></img>
                              </td> */}
                              <td>
                                <Link
                                  to={`/seller/product/view/${item._id}`}
                                  state={item}
                                >
                                  {item.pname.slice(0, 20) || "..."}
                                </Link>
                              </td>
                              <td>{item.hsncode || "..."}</td>
                              <td>{item.product_stock}</td>
                              <td>₹{item.display_price}</td>
                              <td>₹{item.selling_price}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {!mainState.productList.length && (
                    <div className="text-center p-4">
                      <img
                        className="mb-3"
                        src="/assets/back-end/svg/illustrations/sorry.svg"
                        alt="Image Description"
                        style={{ width: "7rem" }}
                      />
                      <p className="mb-0">No data to show</p>
                    </div>
                  )}
                  {/* <div
                    className="d-flex flex-wrap mt-2 mb-3"
                    style={{ justifyContent: "space-around" }}
                  >
                    {mainState.productList.length ? (
                      mainState.productList.map((item) => (
                        <>
                          <div className="item-box">
                            <style
                              dangerouslySetInnerHTML={{ __html: "\n\n" }}
                            />
                            <div
                              className="product-card card"
                              // onclick="quickView('1')"
                              onClick={() => {
                                console.log(item);
                                if (+item.product_stock <= 0) {
                                  alert("Product is Out Of Stock");
                                } else {
                                  setMainState((prev) => ({
                                    ...prev,
                                    cartItems: [
                                      ...prev.cartItems,
                                      { ...item, quantity: 1 },
                                    ],
                                  }));
                                }
                              }}
                              // onClick={() => window.quickView("1")}
                              style={{ cursor: "pointer" }}
                            >
                              <div
                                className="card-header inline_product clickable p-0"
                                style={{
                                  height: "134px",
                                  width: "100%",
                                  overflow: "hidden",
                                }}
                              >
                                <div className="d-flex align-items-center justify-content-center d-block">
                                  {item?.product_stock < 1 && (
                                    <div
                                      className="d-flex"
                                      style={{
                                        top: "0px",
                                        position: "absolute",
                                        left: "0px",
                                        background: "#3b71de",
                                      }}
                                    >
                                      <span
                                        className="for-discoutn-value p-1 pl-2 pr-2"
                                        style={{
                                          borderRadius: "5px 0px",
                                          color: "white",
                                        }}
                                      >
                                        {item?.product_stock <= 0
                                          ? "Out Of Stock"
                                          : "10% Off"}
                                      </span>
                                    </div>
                                  )}
                                  <img
                                    src={
                                      // process.env.REACT_APP_PUBLIC_URL +
                                      // "/storage/app/public/product/thumbnail/2021-06-05-60bb276239631.png"
                                      item.pphoto
                                    }
                                    style={{
                                      width: "100%",
                                      borderRadius: "5%",
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                className="card-body inline_product text-center p-1 clickable"
                                style={{
                                  height: "3.5rem",
                                  maxHeight: "3.5rem",
                                }}
                              >
                                <div
                                  style={{ position: "relative" }}
                                  className="product-title1 text-dark font-weight-bold"
                                >
                                  {item.pname.slice(0, 10) ||
                                    "Women's long-..."}
                                </div>
                                <div className="justify-content-between text-center">
                                  <div className="product-price text-center">
                                    {`₹${item.selling_price}` || `20.00 `}

                                    <strike
                                      style={{
                                        fontSize: "12px",
                                        color: "grey",
                                      }}
                                    >
                                      {` ₹${item.display_price}` || "20.00"}
                                    </strike>
                                    <br />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>1
                        </>
                      ))
                    ) : (
                      <h1>No Products</h1>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="col-md-4 padding-y-sm mt-2">
                <div className="card pr-1 pl-1">
                  <div className="row mt-2">
                    <div className="form-group mt-1 col-12 w-i6">
                      <input
                        className="js-data-example-ajax form-control"
                        style={{ width: "100%" }}
                        type="number"
                        placeholder="Enter Customer Phone Number (eg; 7623124324 )"
                        name="customerMobile"
                        onChange={handleInputChange}
                        value={mainState.selected.customerMobile}
                      ></input>
                      {/* <select
                        onchange="customer_change(this.value);"
                        // id="customer"
                        name="customer"
                        // data-placeholder="Walk In Customer"
                        // className="js-data-example-ajax form-control select2-hidden-accessible"
                        className="js-data-example-ajax form-control"
                        // data-select2-id="customer"
                        // tabIndex={-1}
                        // aria-hidden="true"
                        onChange={handleInputChange}
                        value={mainState.customer_id}
                      >
                        <option value="" selected>
                          ---Select---
                        </option>
                        {!!mainState.customerList &&
                          !!mainState.customerList.length &&
                          mainState.customerList?.map((item) => (
                            <option
                              key={item._id}
                              value={item._id}
                              selected={
                                item._id === mainState.selected.customer_id
                              }
                            >
                              {`${item.firstname} ${item.lastname}`}
                            </option>
                          ))}
                      </select>
                      <span
                        className="select2 select2-container select2-container--default select2-hidden-accessible"
                        dir="ltr"
                        data-select2-id={15}
                        style={{ width: "588.662px" }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection select2-selection--single"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-labelledby="select2-customer-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-customer-container"
                              role="textbox"
                              aria-readonly="true"
                              title="Walking customer"
                            >
                              Walking customer
                            </span>
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation" />
                            </span>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span> */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mt-1 col-12 col-lg-6 mb-0">
                      <button
                        className="w-100 d-inline-block btn btn-success rounded"
                        id="add_new_customer"
                        type="button"
                        data-toggle="modal"
                        data-target="#add-customer"
                        title="Add Customer"
                        // onClick={handleGetCustomerDetails}
                      >
                        <i className="tio-add-circle-outlined" /> Customer
                      </button>
                    </div>
                    <div className="form-group mt-1 col-12 col-lg-6 mb-0">
                      <a
                        className="w-100 d-inline-block btn btn-warning rounded"
                        // onclick="new_order()"
                        onClick={handleNewOrder}
                      >
                        New order
                      </a>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="form-group col-12 mb-0">
                      <label className="input-label text-capitalize border p-1">
                        Current customer :{" "}
                        <span
                          className="style-i4 mb-0 p-1"
                          id="current_customer"
                        >
                          {mainState.selected.customer_name || "-----"}
                        </span>
                      </label>
                    </div>
                    <div className="form-group col-12 mb-0">
                      <label className="input-label text-capitalize border p-1">
                        Total Purchase Amount :{" "}
                        <span
                          className="style-i4 mb-0 p-1"
                          id="current_customer"
                        >
                          {0 || 0}
                        </span>
                      </label>
                    </div>
                    <div className="form-group col-12 mb-0">
                      <label className="input-label text-capitalize border p-1">
                        Current Month Purchase Amount :{" "}
                        <span
                          className="style-i4 mb-0 p-1"
                          id="current_customer"
                        >
                          {0 || 0}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="form-group mt-1 col-12 col-lg-6 mt-2 mb-0">
                      <input
                        type="text"
                        placeholder="Barcode Number"
                        className="form-control js-select2-custom"
                      ></input>
                      {/* <select
                        // id="cart_id"
                        name="cart"
                        className="form-control js-select2-custom"
                        // onchange="cart_change(this.value);"
                        // data-select2-id="cart_id"
                        // tabIndex={-1}
                        // aria-hidden="true"
                        onChange={handleInputChange}
                        value={mainState.selected.cart_id}
                      >
                        <option value="" selected>
                          ---Select---
                        </option>
                        {/* {!!mainState.customerList &&
                          !!mainState.customerList.length &&
                          mainState.customerList?.map((item) => (
                            <option
                              key={item.cartId}
                              value={item.cartId}
                              selected={
                                item.cart_id === mainState.selected.cartId
                              }
                            >
                              {item.cartId}
                            </option>
                          ))} */}
                      {/* <option value="wc-308" selected data-select2-id={17}>
                          wc-308
                        </option> */}
                      {/* </select> */}
                      <span
                        className="select2 select2-container select2-container--default select2-hidden-accessible"
                        dir="ltr"
                        data-select2-id={14}
                        style={{ width: "100%" }}
                      >
                        <span className="selection">
                          <span
                            className="select2-selection custom-select"
                            role="combobox"
                            aria-haspopup="true"
                            aria-expanded="false"
                            tabIndex={0}
                            aria-disabled="false"
                            aria-labelledby="select2-cart_id-container"
                          >
                            <span
                              className="select2-selection__rendered"
                              id="select2-cart_id-container"
                              role="textbox"
                              aria-readonly="true"
                              title="wc-308"
                            >
                              <span>wc-308</span>
                            </span>
                            <span
                              className="select2-selection__arrow"
                              role="presentation"
                            >
                              <b role="presentation" />
                            </span>
                          </span>
                        </span>
                        <span className="dropdown-wrapper" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="form-group mt-1 col-12 col-lg-6 mt-2 mb-0">
                      <a
                        className="w-100 d-inline-block btn btn-danger rounded"
                        // onclick="clear_cart()"
                        onClick={handleClearCart}
                      >
                        Clear cart
                      </a>
                    </div>
                  </div>
                  <div className="w-100" id="cart">
                    <div
                      className="d-flex flex-row"
                      style={{ maxHeight: "300px", overflowY: "scroll" }}
                    >
                      {/* <table className="table table-bordered">
                        <thead className="text-muted">
                          <tr>
                            <th scope="col">Item</th>
                            <th scope="col" className="text-center">
                              Qty
                            </th>
                            <th scope="col">Price</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table> */}
                      <table className="table table-bordered">
                        <thead className="text-muted">
                          <tr>
                            <th scope="col">Item</th>
                            <th scope="col" className="text-center">
                              Qty
                            </th>
                            <th scope="col">Price</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mainState.cartItems?.map((item, index) => (
                            <tr>
                              <td className="media align-items-center">
                                {/* <img
                                  className="avatar avatar-sm mr-1"
                                  src={item.pphoto}
                                  // src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe5a872824.png"
                                  alt="alter"
                                /> */}
                                <div className="media-body">
                                  <h5 className="text-hover-primary mb-0">
                                    {item.pname.slice(0, 50) || "New Fashio..."}
                                  </h5>
                                  {/* <small>
                                    {item.pdesc.slice(0, 15) || "AliceBlue-s-a"}
                                  </small> */}
                                </div>
                              </td>
                              <td className="align-items-center text-center">
                                <input
                                  type="text"
                                  data-key={0}
                                  style={{ width: "50px", textAlign: "center" }}
                                  // defaultValue={1}
                                  // min={1}
                                  onkeyup="updateQuantity('27',this.value,event)"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    handleChangeQtyOfCartItem(e, index)
                                  }
                                />
                              </td>
                              <td className="text-center px-0 py-1">
                                <div className="btn">
                                  {`₹${item.selling_price}` || "₹500.0"}
                                </div>
                                {/* price-wrap .// */}
                              </td>
                              <td className="align-items-center text-center">
                                <a
                                  // href="javascript:removeFromCart(0)"
                                  onClick={(e) =>
                                    handleRemoveFromCart(e, index)
                                  }
                                  className="btn btn-sm btn-outline-danger"
                                >
                                  <i className="tio-delete-outlined" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="box p-3">
                      <dl className="row text-sm-right">
                        <dt className="col-sm-6">Sub total : </dt>
                        <dd className="col-sm-6 text-right">
                          {mainState.cartItems.length
                            ? `₹${mainState.bill.subTotal}`
                            : `₹${0.0}`}
                        </dd>
                        <dt className="col-sm-6">Product Discount :</dt>
                        <dd className="col-sm-6 text-right">
                          {mainState.cartItems.length
                            ? `₹${mainState.bill.productDiscount}`
                            : `₹${0.0}`}
                        </dd>
                        <dt className="col-sm-6">Extra Discount :</dt>
                        <dd className="col-sm-6 text-right">
                          <button
                            id="extra_discount"
                            className="btn btn-sm"
                            type="button"
                            data-toggle="modal"
                            data-target="#add-discount"
                          >
                            <i className="tio-edit" />
                          </button>
                          {mainState.cartItems.length
                            ? `₹${mainState.bill.extraDiscount}`
                            : `₹${0.0}`}
                        </dd>
                        <dt className="col-sm-6">Coupon Discount :</dt>
                        <dd className="col-sm-6 text-right">
                          <button
                            id="coupon_discount"
                            className="btn btn-sm"
                            type="button"
                            data-toggle="modal"
                            data-target="#add-coupon-discount"
                          >
                            <i className="tio-edit" />
                          </button>
                          {mainState.cartItems.length
                            ? `₹${mainState.bill.couponDiscount}`
                            : `₹${0.0}`}
                        </dd>
                        <dt className="col-sm-6">Tax : </dt>
                        <dd className="col-sm-6 text-right">
                          {mainState.cartItems.length
                            ? `₹${mainState.bill.tax}`
                            : `₹${0.0}`}
                        </dd>
                        <dt className="col-sm-6">Total : </dt>
                        <dd className="col-sm-6 text-right h4 b">
                          {mainState.cartItems.length
                            ? `₹${mainState.bill.grandTotal}`
                            : `₹${0.0}`}
                        </dd>
                      </dl>
                      <div className="row">
                        <div className="col-md-6 mb-2">
                          <a
                            // href="#"
                            className="btn btn-danger btn-lg btn-block"
                            // onclick="emptyCart()"
                            onClick={handleClearCart}
                          >
                            <i className="fa fa-times-circle " /> Cancel
                          </a>
                        </div>
                        <div className="col-md-6">
                          <button
                            id="submit_order"
                            type="button"
                            className="btn btn-primary btn-lg btn-block"
                            data-toggle="modal"
                            data-target="#paymentModal"
                          >
                            <i className="fa fa-shopping-bag" />
                            Order
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="add-discount" tabIndex={-1}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Update discount</h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="row">
                              <div className="form-group col-sm-6">
                                <label htmlFor>Discount</label>
                                <input
                                  type="number"
                                  id="dis_amount"
                                  className="form-control"
                                  name="discount"
                                />
                              </div>
                              <div className="form-group col-sm-6">
                                <label htmlFor>Type</label>
                                <select
                                  name="type"
                                  id="type_ext_dis"
                                  className="form-control"
                                >
                                  <option value="amount" selected>
                                    Amount()
                                  </option>
                                  <option value="percent">Percent(%)</option>
                                </select>
                              </div>
                              <div className="form-group col-sm-12">
                                <button
                                  className="btn btn-primary"
                                  onclick="extra_discount();"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="add-coupon-discount"
                      tabIndex={-1}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Coupon discount</h5>
                            <button
                              id="coupon_close"
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="form-group col-sm-12">
                              <label htmlFor>Coupon code</label>
                              <input
                                type="text"
                                id="coupon_code"
                                className="form-control"
                                name="coupon_code"
                              />
                            </div>
                            <div className="form-group col-sm-12">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                onclick="coupon_discount();"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="add-tax" tabIndex={-1}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Update tax</h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form className="row">
                              {/* <input
                                type="hidden"
                                name="_token"
                                defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                              />{" "} */}
                              <div className="form-group col-12">
                                <label htmlFor>Tax (%)</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="tax"
                                  min={0}
                                />
                              </div>
                              <div className="form-group col-sm-12">
                                <button
                                  className="btn btn-primary"
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="paymentModal" tabIndex={-1}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Payment</h5>
                            <button
                              id="payment_close"
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <form
                              // id="order_place"
                              className="row"
                            >
                              {/* <input
                                type="hidden"
                                name="_token"
                                defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                              />{" "} */}
                              <div className="form-group col-lg-6 col-md-6 col-12">
                                <label className="input-label" htmlFor>
                                  Total Bill Amount({`₹`})
                                </label>
                                <input
                                  type="number"
                                  className="form-control w-100"
                                  name="amount"
                                  min={0}
                                  step="0.01"
                                  // defaultValue={0}
                                  value={mainState.bill.grandTotal}
                                  readOnly
                                />
                              </div>
                              <div className="form-group col-lg-6 col-md-6 col-12">
                                <label className="input-label" htmlFor>
                                  Type
                                </label>
                                <select
                                  name="type"
                                  className="form-control w-100"
                                  onChange={(e) =>
                                    setMainState((prev) => ({
                                      ...prev,
                                      bill: {
                                        ...prev.bill,
                                        paymentmode: e.target.value,
                                      },
                                    }))
                                  }
                                  value={mainState.bill.paymentmode}
                                >
                                  <option value="cash">Cash</option>
                                  <option value="card">Card</option>
                                  <option value="upi">UPI</option>
                                  {/* <option value="pending">Pending</option> */}
                                  <option value="credit">Credit</option>
                                  <option value="cod">Cash On Delivery</option>
                                </select>
                              </div>
                              <div className="form-group col-md-6 col-12">
                                <label className="input-label" htmlFor>
                                  Enter Amount Received({`₹`})
                                </label>
                                <input
                                  type="number"
                                  className="form-control w-100"
                                  name="amount"
                                  min={0}
                                  step="1"
                                  // defaultValue={0}
                                  // value={mainState.bill.grandTotal}
                                  // readOnly
                                  onChange={(e) =>
                                    setMainState((prev) => ({
                                      ...prev,
                                      amountReceived: +e.target.value,
                                    }))
                                  }
                                  value={mainState.amountReceived}
                                />
                              </div>
                              <div className="form-group col-md-6 col-12">
                                <label className="input-label" htmlFor>
                                  Difference Amount({`₹`})
                                </label>
                                <input
                                  type="number"
                                  className="form-control w-100"
                                  name="amount"
                                  min={0}
                                  step="1"
                                  // defaultValue={0}
                                  // value={mainState.bill.grandTotal}
                                  readOnly
                                  value={
                                    +mainState.bill.grandTotal -
                                    +mainState.amountReceived
                                  }
                                />
                              </div>
                              <div className="form-group col-12">
                                <button
                                  className="btn btn-primary"
                                  // id="order_complete"
                                  // type="submit"
                                  onClick={handleSubmitOrder}
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal fade"
                      id="short-cut-keys"
                      tabIndex={-1}
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Short cut keys</h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <span>To click order : alt + O</span>
                            <br />
                            <span>To click payment submit : alt + S</span>
                            <br />
                            <span>To close payment submit : alt + Z</span>
                            <br />
                            <span>To click cancel cart item all : alt + C</span>
                            <br />
                            <span>
                              To click add new customer : alt + A
                            </span>{" "}
                            <br />
                            <span>
                              To submit add new customer form : alt + N
                            </span>
                            <br />
                            <span>To click short cut keys : alt + K</span>
                            <br />
                            <span>To print invoice : alt + P</span> <br />
                            <span>To cancel invoice : alt + B</span> <br />
                            <span>To focus search input : alt + Q</span> <br />
                            <span>To click extra discount : alt + E</span>{" "}
                            <br />
                            <span>To click coupon discount : alt + D</span>{" "}
                            <br />
                            <span>To click clear cart : alt + X</span> <br />
                            <span>To click new order : alt + R</span> <br />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade"
          id="quick-view"
          tabIndex={-1}
          style={{ display: "none" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content" id="quick-view-modal">
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n    .btn-check {\n        position: absolute;\n        clip: rect(0, 0, 0, 0);\n        pointer-events: none;\n    }\n\n    .choice-input {\n        width: 7rem;\n    }\n\n    .addon-input {\n        height: 7rem;\n        width: 7rem;\n    }\n\n    .addon-quantity-input {\n        height: 2rem;\n        width: 7rem;\n        z-index: 9;\n        bottom: 1rem;\n        visibility: hidden;\n    }\n\n    .check-label {\n        background-color: #F3F3F3;\n        color: #000000;\n        border-width: 2px;\n        border-color: #BABFC4;\n        font-weight: bold;\n    }\n\n    .btn-check:checked + .check-label {\n        background-color: #EF7822;\n        color: #FFFFFF;\n        border: none;\n    }\n    .color-border{\n        border-color: #ffffff;\n    }\n    .border-add{\n        border-color: #ff0303 !important;\n        border:2px;\n        border-style:solid;\n    }\n    \n}\n",
                }}
              />
              <div className="modal-header p-2">
                <h4 className="modal-title product-title"></h4>
                <button
                  className="close call-when-done"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-row">
                  {/* Product gallery*/}
                  <div
                    className="d-flex align-items-center justify-content-center active"
                    style={{ height: "9.5rem" }}
                  >
                    <img
                      className="img-responsive"
                      style={{
                        height: "100%",
                        width: "auto",
                        overflow: "hidden",
                        borderRadius: "5%",
                      }}
                      src="https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-04-20-625fe611c0c72.png"
                      data-zoom="https://6valley.6amtech.com/storage/app/public/product/"
                      alt="Product image"
                      width
                    />
                    <div className="cz-image-zoom-pane" />
                  </div>
                  {/* Product details*/}
                  <div className="details pl-2">
                    <a href="#" className="h3 mb-2 product-title">
                      Timex marlin stainless ste...
                    </a>
                    <div className="mb-3 text-dark">
                      <span className="h3 font-weight-normal text-accent mr-1">
                        ₹4,500.0
                      </span>
                      <strike style={{ fontSize: "12px!important" }}>
                        ₹5,000.0
                      </strike>
                    </div>
                    <div className="mb-3 text-dark">
                      <strong>Discount : </strong>
                      <strong id="set-discount-amount">₹500.0</strong>
                    </div>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col-12">
                    <h2>Description</h2>
                    <span className="d-block text-dark"></span>
                    <form id="add-to-cart-form" className="mb-2">
                      <input
                        type="hidden"
                        name="_token"
                        defaultValue="BJbY6TlQZjBRSHcPMyTUVgpgmutaYtMSYM0wmMwz"
                      />{" "}
                      <input type="hidden" name="id" defaultValue={18} />
                      <div className="position-relative mr-n4 mb-3">
                        <div className="flex-start">
                          <div className="product-description-label mt-2">
                            Color:
                          </div>
                          <div
                            className="d-flex justify-content-left flex-wrap"
                            id="option1"
                          >
                            <input
                              className="btn-check"
                              type="radio"
                              onclick="color_change(this);"
                              id="18-color-0"
                              name="color"
                              defaultValue="#F0F8FF"
                              defaultChecked
                              autoComplete="off"
                            />
                            <label
                              id="label-18-color-0"
                              className="btn m-2 color-border border-add"
                              style={{ background: "#F0F8FF" }}
                              htmlFor="18-color-0"
                              data-toggle="tooltip"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="h3 p-0 pt-2">size</div>
                      <div className="d-flex justify-content-left flex-wrap">
                        <input
                          className="btn-check"
                          type="radio"
                          id="choice_1-s"
                          name="choice_1"
                          defaultValue="s"
                          defaultChecked
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-sm check-label mx-1 choice-input"
                          htmlFor="choice_1-s"
                        >
                          s
                        </label>
                        <input
                          className="btn-check"
                          type="radio"
                          id="choice_1-                  l"
                          name="choice_1"
                          defaultValue="                  l"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-sm check-label mx-1 choice-input"
                          htmlFor="choice_1-                  l"
                        >
                          {" "}
                          l
                        </label>
                      </div>
                      <div className="h3 p-0 pt-2">type</div>
                      <div className="d-flex justify-content-left flex-wrap">
                        <input
                          className="btn-check"
                          type="radio"
                          id="choice_2-a"
                          name="choice_2"
                          defaultValue="a"
                          defaultChecked
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-sm check-label mx-1 choice-input"
                          htmlFor="choice_2-a"
                        >
                          a
                        </label>
                        <input
                          className="btn-check"
                          type="radio"
                          id="choice_2-                  b"
                          name="choice_2"
                          defaultValue="                  b"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-sm check-label mx-1 choice-input"
                          htmlFor="choice_2-                  b"
                        >
                          {" "}
                          b
                        </label>
                      </div>
                      {/* Quantity + Add to cart */}
                      <div className="d-flex justify-content-between">
                        <div className="product-description-label mt-2 text-dark h3">
                          Quantity:
                        </div>
                        <div className="product-quantity d-flex align-items-center">
                          <div
                            className="input-group input-group--style-2 pr-3"
                            style={{ width: "160px" }}
                          >
                            <span className="input-group-btn">
                              <button
                                className="btn btn-number text-dark"
                                type="button"
                                data-type="minus"
                                data-field="quantity"
                                disabled="disabled"
                                style={{ padding: "10px" }}
                              >
                                <i className="tio-remove  font-weight-bold" />
                              </button>
                            </span>
                            <input
                              type="text"
                              name="quantity"
                              className="form-control input-number text-center cart-qty-field"
                              placeholder={1}
                              defaultValue={1}
                              min={1}
                              max={100}
                            />
                            <span className="input-group-btn">
                              <button
                                className="btn btn-number text-dark"
                                type="button"
                                data-type="plus"
                                data-field="quantity"
                                style={{ padding: "10px" }}
                              >
                                <i className="tio-add  font-weight-bold" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="row no-gutters mt-2 text-dark"
                        id="chosen_price_div"
                      >
                        <div className="col-2">
                          <div className="product-description-label">
                            Total Price:
                          </div>
                        </div>
                        <div className="col-10">
                          <div className="product-price">
                            <strong id="chosen_price">₹4,750.0</strong>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-2">
                        <button
                          className="btn btn-primary"
                          onclick="addToCart()"
                          type="button"
                          style={{ width: "37%", height: "45px" }}
                        >
                          <i className="tio-shopping-cart" />
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="add-customer" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add new customer</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="product_form">
                  {/* <input
                    type="hidden"
                    name="_token"
                    defaultValue="v89RrQ5XJh2sZuRK5Rjxee33POLaeJRflrxcSRTC"
                  />{" "} */}
                  <div className="row pl-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          First name{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="f_name"
                          className="form-control"
                          placeholder="First name"
                          value={mainState.addNewCustomer.f_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Last name{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="l_name"
                          className="form-control"
                          placeholder="Last name"
                          value={mainState.addNewCustomer.l_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row pl-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Email
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Ex : ex@example.com"
                          value={mainState.addNewCustomer.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Phone
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          name="phone"
                          className="form-control"
                          placeholder="Phone"
                          value={mainState.addNewCustomer.phone}
                          onChange={(e) => {
                            e.target.value = e.target.value?.slice(0, 10);
                            handleInputChange(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row pl-2">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Country{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="country"
                          className="form-control"
                          placeholder="Country"
                          value={mainState.addNewCustomer.country}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          State{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          className="form-control"
                          placeholder="State"
                          value={mainState.addNewCustomer.state}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          City{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          placeholder="City"
                          value={mainState.addNewCustomer.city}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label className="input-label">
                          Zip code{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <input
                          type="number"
                          name="zip_code"
                          className="form-control"
                          placeholder="Zip code"
                          value={mainState.addNewCustomer.zip_code}
                          onChange={(e) => {
                            e.target.value = e.target.value?.slice(0, 6);
                            handleInputChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-12">
                      <div className="form-group">
                        <label className="input-label">
                          Address{" "}
                          <span className="input-label-secondary text-danger">
                            *
                          </span>
                        </label>
                        <textarea
                          type="text"
                          cols="40"
                          rows="5"
                          name="address"
                          className="form-control"
                          placeholder="Address"
                          value={mainState.addNewCustomer.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button
                    // type="submit"
                    // id="submit_new_customer"
                    className="btn btn-primary"
                    onClick={handleSubmitAddNewCustomer}
                    disabled={mainState.addNewCustomer.disable}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SellerPos;
