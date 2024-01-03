import React from 'react'
import {Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
//import { createBrowserHistory } from 'history';

import Memorysoft from '../components/Memorysoft'
import Main from '../components/Main'
import Home from '../components/Home'
import Login from '../components/Login'

//Profile Page Routes
import ProfilePage from '../containers/ProfilePage';



// Stores Pages Routes

import PickupWaitPage from '../containers/store/PickupWaitPage';
import PickupConPage from '../containers/store/PickupConPage';
import PickupSendPage from '../containers/store/PickupSendPage';  
import PickupsumPage from '../containers/store/PickupsumPage'; 
import PickupproductPage from '../containers/store/PickupproductPage';  
import PoPage from '../containers/store/PoPage'; 
import ProductPage from '../containers/store/ProductPage';
import ProductMinPage from '../containers/store/ProductMinPage';
import RecivePage from '../containers/store/RecivePage';  
import ReciveReportPage from '../containers/store/ReciveReportPage';
import OutPage from '../containers/store/OutPage';
import OutReportPage from '../containers/store/OutReportPage';
import AdjustPage from '../containers/store/AdjustPage';
import AdjustReportPage from '../containers/store/AdjustReportPage';
import TranferPage from '../containers/store/TranferPage';
import TranferReport from '../containers/store/TranferReport'; 
import TranferProduct from '../containers/store/TranferProduct'; 
import TranferBproduct from '../containers/store/TranferBproduct';

import ProductSetPage from '../containers/store/ProductSetPage';
import BRecivePage from '../containers/store/BRecivePage'; 
import BOutPage from '../containers/store/BOutPage';
import BAdjustPage from '../containers/store/BAdjustPage';

// Setting Pages Routes
import CompanyPage from '../containers/setting/CompanyPage';
import LogoPage from '../containers/setting/LogoPage';
import AutonumberPage from '../containers/setting/AutonumberPage';
import GerneralPage from '../containers/setting/GerneralPage';

import SupplierPage from '../containers/setting/SupplierPage';
import UserPage from '../containers/setting/UserPage';



const routes = (
  <Router history={hashHistory}  >  
    <Route path='/login' component={Login} />

 
    <Route path='/' component={Memorysoft} />  
      <Route path='/app' component={Main}>
    	<IndexRoute  component={Home} /> 
      
      <Route path="pickup-wait" component={PickupWaitPage} />
      <Route path="pickup-con" component={PickupConPage} />
      <Route path="pickup-send" component={PickupSendPage} />  
      <Route path="sumpickup" component={PickupsumPage} />  
      <Route path="sumproduct" component={PickupproductPage} />       
      <Route path="po" component={PoPage} /> 

      <Route path="product" component={ProductPage} />
      <Route path="product_min" component={ProductMinPage} />
      <Route path="recive" component={RecivePage} /> 
      <Route path="recive_report" component={ReciveReportPage} />
      <Route path="out" component={OutPage} />   
      <Route path="out_report" component={OutReportPage} />  
      <Route path="adjust" component={AdjustPage} /> 
      <Route path="adjust_report" component={AdjustReportPage} /> 
      <Route path="tranfer" component={TranferPage} />    
      <Route path="tranfer_rep" component={TranferReport} />  
      <Route path="tranfer_product" component={TranferProduct} />
      <Route path="tranfer_bproduct" component={TranferBproduct} />

      <Route path="product_set" component={ProductSetPage} />
      <Route path="brecive" component={BRecivePage} /> 
      <Route path="bout" component={BOutPage} />  
      <Route path="badjust" component={BAdjustPage} />  

      <Route path="company" component={CompanyPage} />
      <Route path="logo" component={LogoPage} />
      <Route path="autonumber" component={AutonumberPage} />
      <Route path="gerneral" component={GerneralPage} />

      <Route path="supplier" component={SupplierPage} />
      <Route path="user" component={UserPage} />  
      <Route path="profile" component={ProfilePage} />

 
    </Route>
  </Router>
)

export default routes