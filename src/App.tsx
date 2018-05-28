import * as React from 'react';
import { BrowserRouter as BrowserRouter, Route } from "react-router-dom";
import './app.css';

import { AppHeader } from './components/app-header/app-header.component';
import { AppNav } from './components/app-nav/app.nav.component';
import { Home } from './components/home/home.component';
import { Setting } from './components/setting/setting.component';
import { SideDrawer } from './services/ui.service'

class App extends React.Component {

  public closeSideDrawer() {
    new SideDrawer().hide();
  }
  public render() {
    return (
      <BrowserRouter>
          <div className="app">
            <AppHeader/>
            <div className="app-nav-content active">
               <div className="app-nav-bg-drop" onClick={this.closeSideDrawer}/>
               <div className="app-nav">
                 <AppNav/>
               </div>
               <div className="app-content">
                
                   <div>
                     <Route exact={true} path="/" component={Home} />
                     <Route path="/setting" component={Setting} />
                   </div>
                 
               </div>
             </div>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
 