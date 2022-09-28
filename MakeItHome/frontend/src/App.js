import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Products from "./components/Products";
import ViewProduct from "./components/ViewProduct";
import Cart from "./components/Cart";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import SignOut from "./components/SignOut";
import OrderDetails from "./components/OrderDetails";
import PendingOrders from "./components/PendingOrders";
import CancelledOrders from "./components/CancelledOrders";
import ShippedOrders from "./components/ShippedOrders";
import AllOrders from "./components/AllOrders";
import DeliveredOrders from "./components/DeliveredOrders";
import MyProfile from "./components/MyProfile"
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword"
import AddCartItemQty from "./components/AddCartItemQty";
import SubCartItemQty from "./components/SubCartItemQty";
import RemoveCartItem from "./components/RemoveCartItem";
import UserOrders from "./components/UserOrders";
import AddCategory from "./components/AddCategory";
import AddProduct from "./components/AddProduct";
import Address from "./components/Address";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import CategoryList from "./components/CategoryList";
import EditCategory from "./components/EditCategory";
import ProductListByCategory from "./components/ProductListByCategory";
import UsersList from "./components/UsersList";
import UserOrdersForAdmin from "./components/UserOrdersForAdmin";
import UpdatePassword from "./components/UpdatePassword";
import UpdatePasswordByOTP from "./components/UpdatePasswordByOTP";
import WishList from "./components/WishList";
import Checkout from "./components/Checkout";
import AllProducts from "./components/AllProducts";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import SalesGraph from "./components/SalesGraph";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/categories" element={<Categories />}></Route>
        <Route exact path="/products/category/:id" element={<Products />}></Route>
        <Route exact path="/login" element={<LoginForm />}></Route>
        <Route exact path="/products/:id" element={<ViewProduct />}></Route>
        <Route exact path="/carts" element={<Cart />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/logout" element={<SignOut />}></Route>
        <Route exact path="/orders" element={<AllOrders/>}></Route>
        <Route exact path="/pendingorders" element={<PendingOrders />}></Route>
        <Route exact path="/cancelledorders" element={<CancelledOrders />}></Route>
        <Route exact path="/shippedorders" element={<ShippedOrders />}></Route>
        <Route exact path="/deliveredorders" element={<DeliveredOrders />}></Route>
        <Route exact path="/orderdetails/:id" element={<OrderDetails />}></Route>
        <Route exact path="/myprofile" element={<MyProfile />}></Route>
        <Route exact path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route exact path="/resetpassword/:code" element={<ResetPassword />}></Route>
        <Route exact path="/addcartqty/:id" element={<AddCartItemQty />}></Route>
        <Route exact path="/subcartqty/:id" element={<SubCartItemQty />}></Route>
        <Route exact path="/removecartitem/:id" element={<RemoveCartItem />}></Route>
        <Route exact path="/userorders" element={<UserOrders />}></Route>
        <Route exact path="/addcategory" element={<AddCategory />}></Route>
        <Route exact path="/addproduct" element={<AddProduct />}></Route>
        <Route exact path="/address" element={<Address />}></Route>
        <Route exact path="/products" element={<ProductList />}></Route>
        <Route exact path="/editproduct/:id" element={<EditProduct />}></Route>
        <Route exact path="/categorylist" element={<CategoryList />}></Route>
        <Route exact path="/editcategory/:id" element={<EditCategory />}></Route>
        <Route exact path="/productslist/category/:id" element={<ProductListByCategory />}></Route>
        <Route exact path="/users" element={<UsersList />}></Route>
        <Route exact path="/userorders/:id" element={<UserOrdersForAdmin />}></Route>
        <Route exact path="/updatepassword" element={<UpdatePassword />}></Route>
        <Route exact path="/updatepassotp" element={<UpdatePasswordByOTP />}></Route>
        <Route exact path="/wishlists" element={<WishList />}></Route>
        <Route exact path="/checkout/:amt" element={<Checkout />}></Route>
        <Route exact path="/allproducts" element={<AllProducts />}></Route>
        <Route exact path="/contact" element={<ContactUs />}></Route>
        <Route exact path="/aboutus" element={<AboutUs />}></Route>

        <Route exact path="/sales" element={<SalesGraph />}></Route>
      </Routes>
    </div>
  );
}

export default App;
