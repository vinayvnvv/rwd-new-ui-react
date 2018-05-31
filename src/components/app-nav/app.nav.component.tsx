import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { SideDrawer } from './../../services/ui.service';

import './app-nav.component.css';
export class AppNav extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {
			    	navs: [
			    				{name: "Home", link: '/', icon: 'home'},
			    				{name: "Settings", link: '/setting', icon: 'settings'},
			    				{name: "Review", link: '/review', icon: 'visibility'},
			    				{name: "Dashboard", link: '/dashboard', icon: 'dashboard'},
			    				{name: "Inbox", link: '/inbox', icon: 'inbox'}
			    		  ]
			     };
  }

  public onNavClick() {
  	new SideDrawer().hideOnMobile();
  }

  public render() {
    return (
		      <div className="app-nav">
		      	{this.state.navs.map((nav: any) => 
		      	<NavLink key={nav.link} exact={true} to={nav.link} onClick={this.onNavClick} activeClassName="active" className="item">
		    			<Icon className="icon">{nav.icon}</Icon>
		    			<div className="name">{nav.name}</div>
			    </NavLink>
			    )}
		      </div>
    );
  }
}

 