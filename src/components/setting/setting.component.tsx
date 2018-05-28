import * as React from 'react';
import { HttpService } from './../../services/http.service';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createMuiTheme } from '@material-ui/core/styles';

import './setting.component.css';

interface IState {
  input_path: any;
  pageLoader: boolean;
}

export class Setting extends React.Component<{}, IState> {
  public state: IState;
  public httpService: any;
  constructor(props: any) {
    super(props);
    this.httpService = new HttpService();
    this.state = {
        input_path: "fsfsdfsdf",
        pageLoader: true
      };
    this.checkInputFolder();
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
  	new HttpService().checkInputFolder()
        .then((res)=> {
          this.setState({pageLoader: false})
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
        { this.state.pageLoader ? (
          <div className="_full-page-loader">
            <div className="_cont_">
               <CircularProgress  />
              <div className="_title">Loading..</div>
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
                value={this.state.input_path}
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

  