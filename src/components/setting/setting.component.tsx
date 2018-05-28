import * as React from 'react';
import { HttpService } from './../../services/http.service';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createMuiTheme } from '@material-ui/core/styles';
import { IPageLoader, IPathModel } from './../../services/model';

import './setting.component.css';

interface IState {
  input_path: IPathModel;
  pageLoader: IPageLoader;
}

export class Setting extends React.Component<{}, IState> {
  public state: IState;
  public httpService: any;
  constructor(props: any) {
    super(props);
    this.httpService = new HttpService();
    this.state = {
        input_path: {value: ""},
        pageLoader: {
          loading: true,
          title: 'Loading'
        }
      };
    this.getProcessPath();
    console.log(createMuiTheme())
  }


  public onInputChange(to, event) {
     console.log("target", to, event.target.value);
     const obj = {};
     obj[to] = event.target.value;
     this.setState(obj);
  }
  

  public checkInputFolder() {
  	console.log("calling fun")
    this.setState({pageLoader: {loading: true, title: "Checking Files in paths"}});
  	new HttpService().checkInputFolder()
        .then((res)=> {
          this.setState({pageLoader: {loading: false}});
        })
  }

  public getProcessPath() {
    console.log("calling fun")
    this.state.pageLoader.title = "Getting Paths";
    new HttpService().getProcessPath()
        .then((res)=> {
          this.setState({input_path: { value: res.data.input_path}});
          this.setState({pageLoader: {loading: false}});
          this.checkInputFolder();
        })
  }
  public render() {
    return (
      <div className="lyt-cnt _setting">
      	<div className="_hdr">
      		<div className="_ttl"> Settings </div>
      		<div className="_right">actions</div>
      	</div>
      	<div className="_cont">
        { this.state.pageLoader.loading ? (
          <div className="_full-page-loader">
            <div className="_cont_">
               <CircularProgress  />
              <div className="_title">{this.state.pageLoader.title ? this.state.pageLoader.title : 'Loading..'}</div>
            </div>
          </div>) : (
        
        <div className="_st_items">
      		<Grid container={true} className="_itm">
            <Grid item xs={12} sm={4} md={3} className="label">
              Input folder
            </Grid>
            <Grid item xs={12} sm={8} md={9} className="field">
          		<Input
    		        placeholder="Enter input folder path"
                className="input"
    		        inputProps={{
    		          'aria-label': 'Description',
    		        }}
                value={this.state.input_path.value}
                onChange={ this.onInputChange.bind(this, 'input_path') }
    		      />
            </Grid>
          </Grid>

          <Grid container={true} className="_itm">
            <Grid item xs={12} sm={4} md={3} className="label">
              Output folder
            </Grid>
            <Grid item xs={12} sm={8} md={9} className="field">
              <Input
                placeholder="Enter output folder path"
                className="input"
                inputProps={{
                  'aria-label': 'Description',
                }}
              />
            </Grid>
          </Grid>


          </div>
          )}
      	</div>
      </div>
    );
  }
}

  