import React from "react";

//
import NotFound404 from "./views/NotFound404";

// CustomerNew Components
import Home0 from "./views/customerNew/home";
import CustomerHomePage from "./views/customerNew/CustomerHomePage";
import BecomeASeller from "./views/customerNew/become-a-seller";
import SellerLogin0 from "./views/customerNew/seller-login";
import CustomerLogin0 from "./views/customerNew/customer-login";
import CustomerRegistration from "./views/customerNew/customer-registration";
import Categories from "./views/customerNew/categories.js";
import Wishlists from "./views/customerNew/wishlists";
import Brands from "./views/customerNew/brands";
import FlashDeals from "./views/customerNew/flash-deals";
import UserAccounts from "./views/customerNew/user-account";
import AboutUs from "./views/customerNew/about-us";
import Faqs from "./views/customerNew/faq";
import Terms from "./views/customerNew/terms";
import AllSellers from "./views/customerNew/all-sellers";
import CustomerProducts from "./views/customerNew/CustomerProducts";
import ContactUs from "./views/customerNew/contactus";
import MyOrder from "./views/customerNew/my-oder";
import Cart from "./views/customerNew/cart";
import PrivacyPolicy from "./views/customerNew/PrivacyPolicy";
import CheckoutDetails from "./views/customerNew/CheckoutDetails";
import ShopView from "./views/customerNew/ShopView";
import Product from "./views/customerNew/Product";
import CustomerLogout from "./views/customerNew/CustomerLogout";

//Customer Components
import CustomerIndexPage from "./views/customer";
import CustomerLogin from "./views/customer/CustomerLogin";
// import CustomerHomePage from "./views/customer/CustomerHomePage";

//Admin Components
import AdminIndexPage from "./views/admin";
import AdminLogin from "./views/admin/AdminLogin";
import AdminProfileUpdate1 from "./views/admin/AdminProfileUpdate1";
import AdminDashboard from "./views/admin/AdminDashboard";
import AdminPos from "./views/admin/AdminPos";
import AdminPosOrders from "./views/admin/AdminPosOrders";
import AdminBrandList from "./views/admin/AdminBrandList";
import AdminBrandEdit from "./views/admin/AdminBrandEdit";
import AdminCategoryView from "./views/admin/AdminCategoryView";
import AdminSubCategoryView from "./views/admin/AdminSubCategoryView";
import AdminSubSubCategoryView from "./views/admin/AdminSubSubCategoryView";
import AdminAttributeView from "./views/admin/AdminAttributeView";
import AdminProductListInHouse from "./views/admin/AdminProductListInHouse";
import AdminProductStockLimitListInHouse from "./views/admin/AdminProductStockLimitListInHouse";
import AdminProductBulkImport from "./views/admin/AdminProductBulkImport";
import AdminProductUpdatedProductList from "./views/admin/AdminProductUpdatedProductList";
import AdminProductListSellerStatus0 from "./views/admin/AdminProductListSellerStatus0";
import AdminBannerList from "./views/admin/AdminBannerList";
import AdminCouponAddNew from "./views/admin/AdminCouponAddNew";
import AdminNotificationAddNew from "./views/admin/AdminNotificationAddNew";
import AdminDealFlash from "./views/admin/AdminDealFlash";
import AdminDealDay from "./views/admin/AdminDealDay";
import AdminDealFeature from "./views/admin/AdminDealFeature";
import AdminStockProductStock from "./views/admin/AdminStockProductStock";
import AdminReviewsList from "./views/admin/AdminReviewsList";
import AdminStockProductInWishList from "./views/admin/AdminStockProductInWishList";
import AdminTransactionList from "./views/admin/AdminTransactionList";
import AdminTransactionRefundList from "./views/admin/AdminTransactionRefundList";
import AdminSellersSellerAdd from "./views/admin/AdminSellersSellerAdd";
import AdminSellersSellerList from "./views/admin/AdminSellersSellerList";
import AdminSellersWithdrawList from "./views/admin/AdminSellersWithdrawList";
import AdminCustomerList from "./views/admin/AdminCustomerList";
import AdminContactList from "./views/admin/AdminContactList";
import AdminSupportTicketView from "./views/admin/AdminSupportTicketView";
import AdminBusinessSettingsRefundListPending from "./views/admin/AdminBusinessSettingsRefundListPending";
import AdminBusinessSettingsSellerSettings from "./views/admin/AdminBusinessSettingsSellerSettings";
import AdminBusinessSettingsPaymentMethod from "./views/admin/AdminBusinessSettingsPaymentMethod";
import AdminBusinessSettingsSMSModule from "./views/admin/AdminBusinessSettingsSMSModule";
import AdminBusinessSettingsShippingMethodSetting from "./views/admin/AdminBusinessSettingsShippingMethodSetting";
import AdminBusinessSettingsLanguage from "./views/admin/AdminBusinessSettingsLanguage";
import AdminSocialLoginView from "./views/admin/AdminSocialLoginView";
import AdminCurrencyView from "./views/admin/AdminCurrencyView";
import AdminBusinessSettingsWebConfig from "./views/admin/AdminBusinessSettingsWebConfig";
import AdminBusinessSettingsWebConfigDBIndex from "./views/admin/AdminBusinessSettingsWebConfigDBIndex";
import AdminBusinessSettingsWebConfigEnvironmentSetup from "./views/admin/AdminBusinessSettingsWebConfigEnvironmentSetup";
import AdminBusinessSettingsWebConfigRefundIndex from "./views/admin/AdminBusinessSettingsWebConfigRefundIndex";
import AdminBusinessSettingsCaptcha from "./views/admin/AdminBusinessSettingsCaptcha";
import AdminBusinessSettingsAnalyticsIndex from "./views/admin/AdminBusinessSettingsAnalyticsIndex";
import AdminBusinessSettingsMail from "./views/admin/AdminBusinessSettingsMail";
import AdminBusinessSettingsFCMIndex from "./views/admin/AdminBusinessSettingsFCMIndex";
import AdminBusinessSettingsTermsCondition from "./views/admin/AdminBusinessSettingsTermsCondition";
import AdminBusinessSettingsPrivacyPolicy from "./views/admin/AdminBusinessSettingsPrivacyPolicy";
import AdminBusinessSettingsAboutUs from "./views/admin/AdminBusinessSettingsAboutUs";
import AdminHelpTopicList from "./views/admin/AdminHelpTopicList";
import AdminBusinessSettingsSocialMedia from "./views/admin/AdminBusinessSettingsSocialMedia";
import AdminBusinessSettingsMapApi from "./views/admin/AdminBusinessSettingsMapApi";
import AdminFileManagerIndex from "./views/admin/AdminFileManagerIndex";
import AdminReportEarning from "./views/admin/AdminReportEarning";
import AdminReportOrder from "./views/admin/AdminReportOrder";
import AdminReportInhouseProductSale from "./views/admin/AdminReportInhouseProductSale";
import AdminReportSellerProductSale from "./views/admin/AdminReportSellerProductSale";
import AdminCustomRoleCreate from "./views/admin/AdminCustomRoleCreate";
import AdminEmployeeAddNew from "./views/admin/AdminEmployeeAddNew";
import AdminEmployeeList from "./views/admin/AdminEmployeeList";
import AdminDeliveryManAdd from "./views/admin/AdminDeliveryManAdd";
import AdminDeliveryManList from "./views/admin/AdminDeliveryManList";
import AdminLogout from "./views/admin/AdminLogout";

//Seller Components
import SellerIndexPage from "./views/seller";
import SellerLogin from "./views/seller/SellerLogin";
import SellerProfileUpdate1 from "./views/seller/SellerProfileUpdate1";
import SellerDashboard from "./views/seller/SellerDashboard";
import SellerPosOrders from "./views/seller/SellerPosOrders";
import SellerProductList from "./views/seller/SellerProductList";
import SellerProductStockLimitInHouse from "./views/seller/SellerProductStockLimitInHouse";
import SellerProductBulkImport from "./views/seller/SellerProductBulkImport";
import SellerProductReviews from "./views/seller/SellerProductReviews";
import SellerRefundRequestList from "./views/seller/SellerRefundRequestList";
import SellerMessages from "./views/seller/SellerMessages";
import SellerMyBankInfo from "./views/seller/SellerMyBankInfo";
import SellerMyShop from "./views/seller/SellerMyShop";
import SellerBusinessSettingsWithdrawList from "./views/seller/SellerBusinessSettingsWithdrawList";
//
import SellerProductAddNew from "./views/seller/SellerProductAddNew";
import SellerProductEdit from "./views/seller/SellerProductEdit";
import SellerOrdersDetails from "./views/seller/SellerOrdersDetails";
import SellerOrdersList from "./views/seller/SellerOrdersList";
import SellerPosOrderDetails from "views/seller/SellerPosOrderDetails";
import SellerLogout from "views/seller/SellerLogout";
import SellerProductView from "views/seller/SellerProductView";
import SellerPurchaseOrder from "views/seller/SellerPurchaseOrder";
import SellerMyShopEdit from "views/seller/SellerMyShopEdit";
import SellerMyBankInfoEdit from "views/seller/SellerMyBankInfoEdit";
import AdminCategoryEdit from "views/admin/AdminCategoryEdit";
import AdminProductList from "views/admin/AdminProductList";
import AdminProductAddNew from "views/admin/AdminProductAddNew";
import AdminProductEdit from "views/admin/AdminProductEdit";
import SellerRefundDetails from "views/seller/SellerRefundDetails";
import SellerVendorList from "views/seller/SellerVendorList";
import AdminSubCategoryEdit from "views/admin/AdminSubCategoryEdit";
import AdminSubSubCategoryEdit from "views/admin/AdminSubSubCategoryEdit";
import AdminDeliveryManEdit from "views/admin/AdminDeliveryManEdit";
import SellerProductReturnList from "views/seller/SellerProductReturnList";
import AdminCustomerView from "views/admin/AdminCustomerView";
import AdminSellersOrderList from "views/admin/AdminSellersOrderList";
import AdminSellersProductList from "views/admin/AdminSellersProductList";
import AdminSellersView from "views/admin/AdminSellersView";
import AdminOrdersDetails from "views/admin/AdminOrdersDetails";
import CheckoutComplete from "views/customerNew/CheckoutComplete";
import CheckoutPayment from "views/customerNew/CheckoutPayment";
import AccountOrderDetails from "views/customerNew/AccountOrderDetails";
import TrackOrderResult from "views/customerNew/TrackOrderResult";
import SubmitReview from "views/customerNew/SubmitReview";
import RefundDetails from "views/customerNew/RefundDetails";
import SellerPurchaseOrderList from "views/seller/SellerPurchaseOrderList";
import SellerPurchaseOrderDetails from "views/seller/SellerPurchaseOrderDetails";
import AdminSubAdminAdd from "views/admin/AdminSubAdminAdd";
import AdminSubAdminList from "views/admin/AdminSubAdminList";
import AdminSubAdminEdit from "views/admin/AdminSubAdminEdit";
import UserAddress from "views/customerNew/UserAddress";
import UserAddressUpdate from "views/customerNew/UserAddressUpdate";
import UserAddressAdd from "views/customerNew/UserAddressAdd";
import SellerStaffList from "views/seller/SellerStaffList";
import SellerStaffView from "views/seller/SellerStaffView";
import SellerStaffAttendanceList from "views/seller/SellerStaffAttendanceList";
import SellerStaffAttendanceView from "views/seller/SellerStaffAttendanceView";
import SellerStaffAdd from "views/seller/SellerStaffAdd";
import SellerStaffEdit from "views/seller/SellerStaffEdit";
import SellerContactCenterAdd from "views/seller/SellerContactCenterAdd";
import AdminContactCenterList from "views/admin/AdminContactCenterList";
import SellerDealList from "views/seller/SellerDealList";
import SellerDealEdit from "views/seller/SellerDealEdit";
import AdminSellersDealList from "views/admin/AdminSellersDealList";
import AdminPoliciesList from "views/admin/AdminPoliciesList";
import AdminPoliciesEdit from "views/admin/AdminPoliciesEdit";
import SellerPurchaseOrderReturnList from "views/seller/SellerPurchaseOrderReturnList";
import AdminPoliciesView from "views/admin/AdminPoliciesView";
import UserBlogList from "views/customerNew/UserBlogList";
import UserSubscriptionList from "views/customerNew/UserSubscriptionList";
import AdminBlogsList from "views/admin/AdminBlogsList";
import AdminBlogsEdit from "views/admin/AdminBlogsEdit";
import AdminBlogsAdd from "views/admin/AdminBlogsAdd";
import AdminSubscriberList from "views/admin/AdminSubscriberList";
import AdminNewsLetterSubscribersList from "views/admin/AdminNewsLetterSubscribersList";
import AdminPoliciesAdd from "views/admin/AdminPoliciesAdd";
import SellerDealAdd from "views/seller/SellerDealAdd";
import AdminBlogsView from "views/admin/AdminBlogsView";
import AdminProductView from "views/admin/AdminProductView";
import AdminTermsAndConditionsList from "views/admin/AdminTermsAndConditionsList";
import AdminTermsAndConditionsView from "views/admin/AdminTermsAndConditionsView";
import AdminTermsAndConditionsEdit from "views/admin/AdminTermsAndConditionsEdit";
import AdminTermsAndConditionsAdd from "views/admin/AdminTermsAndConditionsAdd";
import AdminManageCustomerHomePage from "views/admin/AdminManageCustomerHomePage";
import AdminCouponsList from "views/admin/AdminCouponsList";
import AdminCouponsAdd from "views/admin/AdminCouponsAdd";
import AdminCouponsEdit from "views/admin/AdminCouponsEdit";
import AdminDealUpdate from "views/admin/AdminDealUpdate";
import AdminDealList from "views/admin/AdminDealList";
import AdminDealAddProduct from "views/admin/AdminDealAddProduct";
import AdminSellerViewProductEdit from "views/admin/AdminSellerViewProductEdit";
import AdminSellerViewOrdersDetails from "views/admin/AdminSellerViewOrdersDetails";
import StaffProfile from "views/seller/StaffProfile";
import ExpiryProduct from "views/seller/ExpiryProduct";
import VendorDetails from "views/seller/VendorDetails";
import PricingPolicy from "views/customer/PricingPolicy";
import ReplacePolicy from "views/customer/ReplacePolicy";
import PricingPolicyEdit from "views/customer/PricingPolicyEdit";
import ReplacePolicyEdit from "views/customer/ReplacePolicyEdit";
import SellerAdvertisement from "views/seller/SellerAdvertisement";
import AdminPricingPolicy from "views/admin/AdminPricingPolicy";
import AdminReplacePolicy from "views/admin/AdminReplacePolicy";
import ManageAdvertisement from "views/admin/ManageAdvertisement";
import AllAds from "views/customer/AllAds";
import ViewAllDetails from "views/customerNew/ViewAllDetails";
import SellerRefundList from "views/seller/SellerRefundList";
import AdminMarginPolicyList from "views/admin/AdminMarginPolicyList";
import AdminMarginPolicyEdit from "views/admin/AdminMarginPolicyEdit";
import SellerMarginPolicy from "views/seller/SellerMarginPolicy";
import AdminAreaWiseSeller from "views/admin/AdminAreaWiseSeller";
import CustomersNames from "views/seller/CustomersNames";
//

const customerRoutes = [
  {
    path: "/subscriptions/list",
    name: "",
    element: UserSubscriptionList,
    index: true,
  },
  { path: "/blogs/list", name: "", element: UserBlogList, index: true },
  {
    path: "/blogs/view/:id",
    name: "",
    element: AdminBlogsView,
    index: false,
  },
  { path: "/404", name: "", element: NotFound404, index: true },
  // customer routes
  //===========================================
  // { path: "/", name: "root", element: CustomerIndexPage, index: true },
  // { path: "/login", name: "login", element: CustomerLogin, index: false },
  // { path: "/home", name: "home", element: CustomerHomePage, index: false },
  //customer new routes
  // { path: "/Home0", name: "", element: Home0, index: true },
  // { path: "/Home1", name: "", element: Home1, index: true },
  { path: "/", name: "", element: CustomerHomePage, index: true },
  //============================================
  { path: "/shop/apply", name: "", element: BecomeASeller, index: true },
  {
    path: "/customer/auth/login",
    name: "",
    element: CustomerLogin0,
    index: true,
  },
  {
    path: "/customer/auth/logout",
    name: "",
    element: CustomerLogout,
    index: true,
  },
  {
    path: "/customer/auth/register",
    name: "",
    element: CustomerRegistration,
    index: true,
  },
  { path: "/categories", name: "", element: Categories, index: true },
  { path: "/wishlists", name: "", element: Wishlists, index: true },
  { path: "/brands", name: "", element: Brands, index: true },
  { path: "/flash-deals/:id", name: "", element: FlashDeals, index: true },
  { path: "/user-account", name: "", element: UserAccounts, index: true },
  { path: "/about-us", name: "", element: AboutUs, index: true },
  { path: "/helpTopic", name: "", element: Faqs, index: true },
  { path: "/terms", name: "", element: Terms, index: true },
  { path: "/sellers", name: "", element: AllSellers, index: true },
  { path: "/products", name: "", element: CustomerProducts, index: true },
  { path: "/allads", name: "", element: AllAds, index: true },
  { path: "/viewalldetails", name: "", element: ViewAllDetails, index: true },
  {
    path: "/products/latest-products",
    name: "",
    element: CustomerProducts,
    index: true,
  },
  {
    path: "/products/featured_products",
    name: "",
    element: CustomerProducts,
    index: true,
  },
  {
    path: "/products/best_selling_products",
    name: "",
    element: CustomerProducts,
    index: true,
  },
  {
    path: "/products/top_rated_products",
    name: "",
    element: CustomerProducts,
    index: true,
  },
  { path: "/contacts", name: "", element: ContactUs, index: true },
  { path: "/account-oder", name: "", element: MyOrder, index: true },
  { path: "/account-address", name: "", element: UserAddress, index: true },
  {
    path: "/account-address-store",
    name: "",
    element: UserAddressAdd,
    index: true,
  },
  {
    path: "/account-address-edit/:id",
    name: "",
    element: UserAddressUpdate,
    index: true,
  },
  { path: "/shop-cart", name: "", element: Cart, index: true },
  //
  { path: "/privacy-policy", name: "", element: PrivacyPolicy, index: true },
  { path: "/pricing-policy", name: "", element: PricingPolicy, index: true },
  {
    path: "/pricing-policy-edit/:id",
    name: "",
    element: PricingPolicyEdit,
    index: true,
  },
  { path: "/replace-policy", name: "", element: ReplacePolicy, index: true },
  {
    path: "/replace-policy-edit/:id",
    name: "",
    element: ReplacePolicyEdit,
    index: true,
  },
  { path: "/submit-review/:id", name: "", element: SubmitReview, index: true },
  {
    path: "/refund-details/:id",
    name: "",
    element: RefundDetails,
    index: true,
  },
  // { path: "/payment-razor", name: "", element: PrivacyPolicy, index: true },
  {
    path: "/checkout-payment",
    name: "",
    element: CheckoutPayment,
    index: true,
  },
  {
    path: "/checkout-complete",
    name: "",
    element: CheckoutComplete,
    index: true,
  },
  {
    path: "/checkout-details",
    name: "",
    element: CheckoutDetails,
    index: true,
  },
  { path: "/shopView/:id", name: "", element: ShopView, index: true },
  { path: "/product/:id", name: "", element: Product, index: true },
  {
    path: "/account-order-details",
    name: "",
    element: AccountOrderDetails,
    index: true,
  },
  {
    path: "/track-order/result",
    name: "",
    element: TrackOrderResult,
    index: true,
  },
];

const adminRoutes = [
  {
    path: "/refund/details/:id",
    name: "",
    element: SellerRefundDetails,
    index: false,
  },
  {
    path: "/refund/list/pending",
    name: "",
    element: SellerRefundRequestList,
    index: false,
  },
  {
    path: "/refund/list/approved",
    name: "",
    element: SellerRefundRequestList,
    index: false,
  },
  {
    path: "/refund/list/refunded",
    name: "",
    element: SellerRefundRequestList,
    index: false,
  },
  {
    path: "/refund/list/rejected",
    name: "",
    element: SellerRefundRequestList,
    index: false,
  },
  {
    path: "/business-settings/fcm-index",
    name: "",
    element: AdminBusinessSettingsFCMIndex,
    index: false,
  },
  {
    path: "/business-settings/mail",
    name: "",
    element: AdminBusinessSettingsMail,
    index: false,
  },
  {
    path: "/blogs/list",
    name: "",
    element: AdminBlogsList,
    index: false,
  },
  {
    path: "/blogs/edit/:id",
    name: "",
    element: AdminBlogsEdit,
    index: false,
  },
  {
    path: "/blogs/add",
    name: "",
    element: AdminBlogsAdd,
    index: false,
  },
  {
    path: "/blogs/view/:id",
    name: "",
    element: AdminBlogsView,
    index: false,
  },
  {
    path: "/subscribers/list",
    name: "",
    element: AdminSubscriberList,
    index: false,
  },
  {
    path: "/manage-homepage",
    name: "",
    element: AdminManageCustomerHomePage,
    // element: AdminNewsLetterSubscribersList,
    index: false,
  },
  {
    path: "/coupons/list",
    name: "",
    element: AdminCouponsList,
    index: false,
  },
  {
    path: "/coupons/add",
    name: "",
    element: AdminCouponsAdd,
    index: false,
  },
  {
    path: "/coupons/edit/:id",
    name: "",
    element: AdminCouponsEdit,
    index: false,
  },
  {
    path: "/newsletters/list",
    name: "",
    element: AdminNewsLetterSubscribersList,
    index: false,
  },
  {
    path: "/policies/list",
    name: "",
    element: AdminPoliciesList,
    index: false,
  },
  {
    path: "/policies/view/:id",
    name: "",
    element: AdminPoliciesView,
    index: false,
  },
  {
    path: "/policies/edit/:id",
    name: "",
    element: AdminPoliciesEdit,
    index: false,
  },
  {
    path: "/policies/add",
    name: "",
    element: AdminPoliciesAdd,
    index: false,
  },
  {
    path: "/termsAndConditions/list",
    name: "",
    element: AdminTermsAndConditionsList,
    index: false,
  },
  {
    path: "/termsAndConditions/view/:id",
    name: "",
    element: AdminTermsAndConditionsView,
    index: false,
  },
  {
    path: "/termsAndConditions/edit/:id",
    name: "",
    element: AdminTermsAndConditionsEdit,
    index: false,
  },
  {
    path: "/termsAndConditions/add",
    name: "",
    element: AdminTermsAndConditionsAdd,
    index: false,
  },
  // {
  //   path: "/deal/list",
  //   name: "",
  //   element: AdminSellersDealList,
  //   index: false,
  // },
  {
    path: "/deal/list",
    name: "",
    element: AdminDealList,
    index: false,
  },
  {
    path: "/deal/update/:id",
    name: "",
    element: AdminDealUpdate,
    index: false,
  },
  {
    path: "/deal/addproduct/:id",
    name: "",
    element: AdminDealAddProduct,
    index: false,
  },
  {
    path: "/contact-center/list",
    name: "",
    element: AdminContactCenterList,
    index: false,
  },
  {
    path: "/product/list",
    name: "",
    element: AdminProductList,
    index: false,
  },
  {
    path: "/product/add-new",
    name: "",
    element: AdminProductAddNew,
    index: false,
  },
  {
    path: "/product/edit/:id",
    name: "",
    element: AdminProductEdit,
    index: false,
  },
  {
    path: "/product/view/:id",
    name: "",
    element: AdminProductView,
    index: false,
  },
  {
    path: "/auth/logout",
    name: "",
    element: AdminLogout,
    index: true,
  },
  // admin routes
  { path: "", name: "admin", element: AdminIndexPage, index: true },
  { path: "/login", name: "login", element: AdminLogin, index: false },
  // { path: "/auth/login", name: "login", element: AdminLogin, index: false },
  {
    path: "/profile/update/1",
    name: "ad",
    element: AdminProfileUpdate1,
    index: false,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    element: AdminDashboard,
    index: false,
  },
  // { path: "/pos", name: "pos", element: AdminPos, index: false },
  {
    path: "/pos/orders",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/all",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/pending",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/confirmed",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/processing",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/out_for_delivery",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/delivered",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/returned",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/failed",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/list/canceled",
    name: "pos/orders",
    element: AdminPosOrders,
    index: false,
  },
  {
    path: "/orders/details/:id",
    name: "pos/orders",
    element: AdminOrdersDetails,
    index: false,
  },
  {
    path: "/sellers/orders/details/:id",
    name: "pos/orders",
    element: AdminSellerViewOrdersDetails,
    index: false,
  },
  {
    path: "/brand/edit/:id",
    name: "/brand/edit/:id",
    element: AdminBrandEdit,
    index: false,
  },
  {
    path: "/brand/list",
    name: "brand/list",
    element: AdminBrandList,
    index: false,
  },
  {
    path: "/category/view",
    name: "category/view",
    element: AdminCategoryView,
    index: false,
  },
  {
    path: "/category/edit/:id",
    name: "category/edit/:id",
    element: AdminCategoryEdit,
    index: false,
  },
  {
    path: "/sub-category/view",
    name: "sub-category/view",
    element: AdminSubCategoryView,
    index: false,
  },
  {
    path: "/sub-category/edit/:id",
    name: "sub-category/edit/:id",
    element: AdminSubCategoryEdit,
    index: false,
  },
  {
    path: "/sub-sub-category/view",
    name: "sub-sub-category/view",
    element: AdminSubSubCategoryView,
    index: false,
  },
  {
    path: "/sub-sub-category/edit/:id",
    name: "sub-sub-category/edit/:id",
    element: AdminSubSubCategoryEdit,
    index: false,
  },
  {
    path: "/attribute/view",
    name: "sub-sub-category/view",
    element: AdminAttributeView,
    index: false,
  },
  {
    path: "/product/list/in_house",
    name: "sub-sub-category/view",
    element: AdminProductListInHouse,
    index: false,
  },
  {
    path: "/product/stock-limit-list/in_house",
    name: "sub-sub-category/view",
    element: AdminProductStockLimitListInHouse,
    index: false,
  },
  {
    path: "/product/bulk-import",
    name: "sub-sub-category/view",
    element: AdminProductBulkImport,
    index: false,
  },
  {
    path: "/product/updated-product-list",
    name: "sub-sub-category/view",
    element: AdminProductUpdatedProductList,
    index: false,
  },
  {
    // path: "/product/list/seller?status=0",
    path: "/product/list/seller/status0",
    name: "sub-sub-category/view",
    element: AdminProductListSellerStatus0,
    index: false,
  },
  {
    path: "/banner/list",
    name: "sub-sub-category/view",
    element: AdminBannerList,
    index: false,
  },
  {
    path: "/coupon/add-new",
    name: "sub-sub-category/view",
    element: AdminCouponAddNew,
    index: false,
  },
  {
    path: "/notification/add-new",
    name: "sub-sub-category/view",
    element: AdminNotificationAddNew,
    index: false,
  },
  {
    path: "/deal/flash",
    name: "sub-sub-category/view",
    element: AdminDealFlash,
    index: false,
  },
  {
    path: "/deal/day",
    name: "sub-sub-category/view",
    element: AdminDealDay,
    index: false,
  },
  {
    path: "/deal/feature",
    name: "sub-sub-category/view",
    element: AdminDealFeature,
    index: false,
  },
  {
    path: "/stock/product-stock",
    name: "sub-sub-category/view",
    element: AdminStockProductStock,
    index: false,
  },
  {
    path: "/reviews/list",
    name: "sub-sub-category/view",
    element: AdminReviewsList,
    index: false,
  },
  {
    path: "/stock/product-in-wishlist",
    name: "sub-sub-category/view",
    element: AdminStockProductInWishList,
    index: false,
  },
  {
    path: "/transaction/list",
    name: "sub-sub-category/view",
    element: AdminTransactionList,
    index: false,
  },
  {
    path: "/transaction/refund-list",
    name: "sub-sub-category/view",
    element: AdminTransactionRefundList,
    index: false,
  },
  {
    path: "/sellers/seller-add",
    name: "sub-sub-category/view",
    element: AdminSellersSellerAdd,
    index: false,
  },
  {
    path: "/sellers/seller-list",
    name: "sub-sub-category/view",
    element: AdminSellersSellerList,
    index: false,
  },
  {
    path: "/sellers/order-list/:id",
    name: "sub-sub-category/view",
    element: AdminSellersOrderList,
    index: false,
  },
  {
    path: "/sellers/product-list/:id",
    name: "sub-sub-category/view",
    element: AdminSellersProductList,
    index: false,
  },
  {
    path: "/sellers/view/:id",
    name: "sub-sub-category/view",
    element: AdminSellersView,
    index: false,
  },
  {
    path: "/sellers/product/edit/:id",
    name: "sub-sub-category/view",
    element: AdminSellerViewProductEdit,
    index: false,
  },
  {
    path: "/sellers/withdraw_list",
    name: "sub-sub-category/view",
    element: AdminSellersWithdrawList,
    index: false,
  },
  {
    path: "/sellers/areaWiseSeller/list",
    name: "sub-sub-category/view",
    element: AdminAreaWiseSeller,
    index: false,
  },
  {
    path: "/customer/list",
    name: "sub-sub-category/view",
    element: AdminCustomerList,
    index: false,
  },
  {
    path: "/contact/list",
    name: "sub-sub-category/view",
    element: AdminContactList,
    index: false,
  },
  {
    path: "/support-ticket/view",
    name: "sub-sub-category/view",
    element: AdminSupportTicketView,
    index: false,
  },
  {
    path: "/business-settings/refund/list/pending",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsRefundListPending,
    index: false,
  },
  {
    path: "/business-settings/refund/list/approved",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsRefundListPending,
    index: false,
  },
  {
    path: "/business-settings/refund/list/refunded",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsRefundListPending,
    index: false,
  },
  {
    path: "/business-settings/refund/list/rejected",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsRefundListPending,
    index: false,
  },
  {
    path: "/business-settings/seller-settings",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsSellerSettings,
    index: false,
  },
  {
    path: "/business-settings/payment-method",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsPaymentMethod,
    index: false,
  },
  {
    path: "/business-settings/sms-module",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsSMSModule,
    index: false,
  },
  {
    path: "/business-settings/shipping-method/setting",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsShippingMethodSetting,
    index: false,
  },
  {
    path: "/business-settings/language",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsLanguage,
    index: false,
  },
  {
    path: "/social-login/view",
    name: "sub-sub-category/view",
    element: AdminSocialLoginView,
    index: false,
  },
  {
    path: "/currency/view",
    name: "sub-sub-category/view",
    element: AdminCurrencyView,
    index: false,
  },
  {
    path: "/business-settings/web-config",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsWebConfig,
    index: false,
  },
  {
    path: "/business-settings/web-config/db-index",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsWebConfigDBIndex,
    index: false,
  },
  {
    path: "/business-settings/web-config/environment-setup",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsWebConfigEnvironmentSetup,
    index: false,
  },
  {
    path: "/business-settings/web-config/refund-index",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsWebConfigRefundIndex,
    index: false,
  },
  {
    path: "/business-settings/captcha",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsCaptcha,
    index: false,
  },
  {
    path: "/business-settings/analytics-index",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsAnalyticsIndex,
    index: false,
  },
  {
    path: "/business-settings/mail",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsMail,
    index: false,
  },
  {
    path: "/business-settings/fcm-index",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsFCMIndex,
    index: false,
  },
  {
    path: "/business-settings/terms-condition",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsTermsCondition,
    index: false,
  },
  {
    path: "/business-settings/privacy-policy",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsPrivacyPolicy,
    index: false,
  },
  {
    path: "/business-settings/about-us",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsAboutUs,
    index: false,
  },
  {
    path: "/helpTopic/list",
    name: "sub-sub-category/view",
    element: AdminHelpTopicList,
    index: false,
  },
  {
    path: "/business-settings/social-media",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsSocialMedia,
    index: false,
  },
  {
    path: "/business-settings/map-api",
    name: "sub-sub-category/view",
    element: AdminBusinessSettingsMapApi,
    index: false,
  },
  {
    path: "/file-manager/index",
    name: "sub-sub-category/view",
    element: AdminFileManagerIndex,
    index: false,
  },
  {
    path: "/report/earning",
    name: "sub-sub-category/view",
    element: AdminReportEarning,
    index: false,
  },
  {
    path: "/report/order",
    name: "sub-sub-category/view",
    element: AdminReportOrder,
    index: false,
  },
  {
    path: "/report/inhoue-product-sale",
    name: "sub-sub-category/view",
    element: AdminReportInhouseProductSale,
    index: false,
  },
  {
    path: "/report/seller-product-sale",
    name: "sub-sub-category/view",
    element: AdminReportSellerProductSale,
    index: false,
  },
  {
    path: "/custom-role/create",
    name: "sub-sub-category/view",
    element: AdminCustomRoleCreate,
    index: false,
  },
  {
    path: "/employee/add-new",
    name: "sub-sub-category/view",
    element: AdminEmployeeAddNew,
    index: false,
  },
  {
    path: "/employee/list",
    name: "sub-sub-category/view",
    element: AdminEmployeeList,
    index: false,
  },
  {
    path: "/sub-admin/add",
    name: "sub-sub-category/view",
    element: AdminSubAdminAdd,
    index: false,
  },
  {
    path: "/sub-admin/list",
    name: "sub-sub-category/view",
    element: AdminSubAdminList,
    index: false,
  },
  {
    path: "/sub-admin/edit/:id",
    name: "sub-sub-category/view",
    element: AdminSubAdminEdit,
    index: false,
  },
  {
    path: "/delivery-man/add",
    name: "sub-sub-category/view",
    element: AdminDeliveryManAdd,
    index: false,
  },
  {
    path: "/delivery-man/list",
    name: "sub-sub-category/view",
    element: AdminDeliveryManList,
    index: false,
  },
  {
    path: "/delivery-man/edit/:id",
    name: "sub-sub-category/view",
    element: AdminDeliveryManEdit,
    index: false,
  },
  {
    path: "/customer/view/:id",
    name: "sub-sub-category/view",
    element: AdminCustomerView,
    index: false,
  },
  {
    path: "/pricingpolicy",
    name: "",
    element: AdminPricingPolicy,
    index: true,
  },
  {
    path: "/replacepolicy",
    name: "",
    element: AdminReplacePolicy,
    index: true,
  },
  {
    path: "/manageadvertisement",
    name: "",
    element: ManageAdvertisement,
    index: true,
  },
  {
    path: "/margin-policy/list",
    name: "",
    element: AdminMarginPolicyList,
    index: true,
  },
  {
    path: "/margin-policy/edit/:id",
    name: "",
    element: AdminMarginPolicyEdit,
    index: true,
  },
];

const sellerRoutes = [
  //
  {
    path: "/auth/logout",
    name: "",
    element: SellerLogout,
    index: true,
  },
  { path: "/auth/login", name: "", element: SellerLogin0, index: true },
  //
  {
    path: "/orders/details/:id",
    name: "",
    element: SellerOrdersDetails,
    index: false,
  },
  {
    path: "/deal/list",
    name: "",
    element: SellerDealList,
    index: false,
  },
  // {
  // UI is already there for adding deal
  //   path: "/deal/add",
  //   name: "",
  //   element: SellerDealAdd,
  //   index: false,
  // },
  {
    path: "/deal/edit/:id",
    name: "",
    element: SellerDealEdit,
    index: false,
  },
  {
    path: "/staff/list",
    name: "",
    element: SellerStaffList,
    index: false,
  },
  {
    path: "/staff/add",
    name: "",
    element: SellerStaffAdd,
    index: false,
  },
  {
    path: "/staff/view/:id",
    name: "",
    element: SellerStaffView,
    index: false,
  },
  {
    path: "/staff/edit/:id",
    name: "",
    element: SellerStaffEdit,
    index: false,
  },
  // {
  //   path: "/staff/attendance/list",
  //   name: "",
  //   element: SellerStaffAttendanceList,
  //   index: false,
  // },
  {
    path: "/staff/attendance/view/:id",
    name: "",
    element: SellerStaffAttendanceView,
    index: false,
  },
  {
    path: "/contact-center/add",
    name: "",
    element: SellerContactCenterAdd,
    index: false,
  },
  {
    path: "/vendor/list",
    name: "",
    element: SellerVendorList,
    index: false,
  },
  {
    path: "/vendor/add-new",
    name: "",
    element: SellerVendorList,
    index: false,
  },
  {
    path: "/vendor/edit/:id",
    name: "",
    element: SellerVendorList,
    index: false,
  },
  {
    path: "/vendor/view/:id",
    name: "",
    element: SellerVendorList,
    index: false,
  },
  {
    path: "/product/list",
    name: "",
    element: SellerProductList,
    index: false,
  },
  {
    path: "/product/add-new",
    name: "",
    element: SellerProductAddNew,
    index: false,
  },
  {
    path: "/product/edit/:id",
    name: "",
    element: SellerProductEdit,
    index: false,
  },
  {
    path: "/product/view/:id",
    name: "",
    element: SellerProductView,
    index: false,
  },
  {
    path: "/purchase-order",
    name: "seller",
    element: SellerPurchaseOrder,
    index: true,
  },
  {
    path: "/purchase-order/list",
    name: "seller",
    element: SellerPurchaseOrderList,
    index: true,
  },
  {
    path: "/purchase-order/return/list",
    name: "seller",
    element: SellerPurchaseOrderReturnList,
    index: true,
  },
  {
    path: "/purchase-order/:id",
    name: "seller",
    element: SellerPurchaseOrderDetails,
    index: true,
  },
  {
    path: "/product-returns/list",
    name: "seller",
    element: SellerProductReturnList,
    index: true,
  },

  {
    path: "purchase-order/expity-order",
    name: "seller",
    element: ExpiryProduct,
    index: true,
  },
  {
    path: "purchase-order/vendordetails",
    name: "seller",
    element: VendorDetails,
    index: true,
  },
  {
    path: "seller-advertisement",
    name: "",
    element: SellerAdvertisement,
    index: true,
  },
  {
    path: "customersnames",
    name: "",
    element: CustomersNames,
    index: true,
  },
  {
    path: "Margin-policy",
    name: "",
    element: SellerMarginPolicy,
    index: true,
  },
  {
    path: "refunddetails",
    name: "",
    element: RefundDetails,
    index: true,
  },
  // seller routes
  { path: "", name: "seller", element: SellerIndexPage, index: true },
  { path: "/login", name: "login", element: SellerLogin, index: false },
  {
    path: "/profile/update/1",
    name: "ad",
    element: SellerProfileUpdate1,
    index: false,
  },
  {
    path: "staff/profile/update",
    name: "staffProfile",
    element: StaffProfile,
    index: false,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    element: SellerDashboard,
    index: false,
  },
  // { path: "/pos", name: "pos", element: SellerPos, index: false },
  {
    path: "/pos/orders",
    name: "pos/orders",
    element: SellerPosOrders,
    index: false,
  },
  {
    path: "/pos/order-details/:id",
    name: "pos/order-details/100120",
    element: SellerPosOrderDetails,
    index: false,
  },
  {
    path: "/orders/list/all",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/pending",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/confirmed",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/processing",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/out_for_delivery",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/delivered",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/returned",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/failed",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/orders/list/canceled",
    name: "pos/orders",
    element: SellerOrdersList,
    index: false,
  },
  {
    path: "/product/stock-limit-list/in_house",
    name: "",
    element: SellerProductStockLimitInHouse,
    index: false,
  },
  {
    path: "/product/bulk-import",
    name: "",
    element: SellerPosOrders,
    index: false,
  },
  {
    path: "/product/bulk-export",
    name: "",
    element: SellerProductBulkImport,
    index: false,
  },
  {
    path: "/reviews/list",
    name: "",
    element: SellerProductReviews,
    index: false,
  },
  {
    path: "/messages/chat",
    name: "",
    element: SellerMessages,
    index: false,
  },
  {
    path: "/profile/view",
    name: "",
    element: SellerMyBankInfo,
    index: false,
  },
  {
    path: "/shop/view",
    name: "",
    element: SellerMyShop,
    index: false,
  },
  {
    path: "/seller-refund-list",
    name: "seller",
    element: SellerRefundList,
    index: true,
  },
  {
    path: "/shop/edit/1",
    name: "",
    element: SellerMyShopEdit,
    index: false,
  },
  {
    path: "/profile/bank-edit/1",
    name: "",
    element: SellerMyBankInfoEdit,
    index: false,
  },
  {
    path: "/business-settings/withdraw/list",
    name: "",
    element: SellerBusinessSettingsWithdrawList,
    index: false,
  },
];

const routes = [...customerRoutes, ...adminRoutes, ...sellerRoutes];

export default routes;
export { customerRoutes, adminRoutes, sellerRoutes };
