/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Clients from './clients';
import ClientsList from './clientslist';
import Leades from './leades';
import Leads from './Leads';
import LeadView from './LeadView';

const EmployeeRoute = ({ match }) => (
   <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
      <Route path={`${match.url}/clients`} component={Clients} />
      <Route path={`${match.url}/clients-list`} component={ClientsList} />
      {/* <Route path={`${match.url}/leads`} component={Leades} /> */}
      <Route path={`${match.url}/leads`} component={Leads} />
      <Route path={`${match.url}/ticket-view`} component={LeadView} />
   </Switch>
);

export default EmployeeRoute;
