import React from 'react'
import {Router, Route, hashHistory, IndexRoute, browserHistory } from 'react-router'
//import { createBrowserHistory } from 'history';

import Memorysoft from '../components/Memorysoft'
import Home from '../components/Home'
import Login from '../components/Login'
import Main from '../components/Main'
import DoctorPage from '../containers/doctortime/DoctorPage'
import EmployeePage from '../containers/doctortime/EmployeePage'
import MemberPage from '../containers/member/MemberPage';
import PaymentPage from '../containers/order/PaymentPage';
import SendPage from '../containers/order/SendPage';
import ReportPage from '../containers/order/ReportPage';  
import SeedoctorPage from '../containers/seedoctor/SeedoctorPage'; 

import ProductPage from '../containers/product/ProductPage';
import TreatmentPage from '../containers/product/TreatmentPage';
import LaserPage from '../containers/product/LaserPage';
import MomPage from '../containers/product/MomPage';
import PromotionPage from '../containers/promotion/PromotionPage';
import ReviewPage from '../containers/review/ReviewPage';
import SlidePage from '../containers/slide/SlidePage';
import ContactPage from '../containers/contact/ContactPage';  
import AboutPage from '../containers/about/AboutPage'; 
import FlashSalePage from '../containers/flash/FlashSalePage';
import VdoPage from '../containers/vdo/VdoPage';
import YoutubePage from '../containers/vdo/YoutubePage';
import AppointmentPage from '../containers/appointment/AppointmentPage';

import GroupsPage from '../containers/group/GroupsPage';

const routes = (
  <Router history={hashHistory}  >   
    <Route path='/login' component={Login} />
    <Route path='/' component={Memorysoft} /> 
    <Route path='/app' component={Main}>
      <IndexRoute  component={Home} />
     
      <Route path="members" component={MemberPage} /> 
      <Route path="appointments" component={AppointmentPage} />   
      <Route path="doctortime" component={DoctorPage} />  
      <Route path="employeetime" component={EmployeePage} />  
      <Route path="abouts" component={AboutPage} /> 

      <Route path="seedoctor" component={SeedoctorPage} />    
      <Route path="payments" component={PaymentPage} /> 
      <Route path="sends" component={SendPage} />  
      <Route path="order_report" component={ReportPage} />   

      <Route path="promotion" component={PromotionPage} />
      <Route path="groups" component={GroupsPage} />
      <Route path="product" component={ProductPage} />
      <Route path="treatment" component={TreatmentPage} />
      <Route path="mom" component={MomPage} />
      <Route path="laser" component={LaserPage} />  
      <Route path="review" component={ReviewPage} />
      <Route path="slide" component={SlidePage} />
      <Route path="vdo" component={VdoPage} />
      <Route path="youtube" component={YoutubePage} />
      <Route path="contact" component={ContactPage} />
      <Route path="flash_sale" component={FlashSalePage} />
    </Route>
  </Router>
)

export default routes