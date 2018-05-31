import * as React from 'react';
import { HttpService } from './../../services/http.service';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import { createMuiTheme } from '@material-ui/core/styles';
import { IPageLoader, IPathModel, ISnackBar } from './../../services/model';

import './setting.component.css';

interface IState {
  input_path : IPathModel;
  input_path_value: string;
  output_path_value: string;
  output_path: IPathModel;
  pageLoader : IPageLoader;
  snackBar : ISnackBar;
}

export class Setting extends React.Component<{}, IState> {
  public state: IState;
  public httpService: any;
  constructor(props: any) {
    super(props);
    this.httpService = new HttpService();
    this.state = {
        input_path: {checking: false},
        output_path: {checking: false},
        input_path_value: "",
        output_path_value: "",
        pageLoader: {
          loading: true,
          title: 'Loading'
        },
        snackBar: {open: false, message: "", autoHideDuration: 3000}
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
  

  public checkFolderFromUI = (init: boolean, type: string, e: any) => {
    console.log(init, type)
     if(type === 'input'){
       this.checkInputFolder(init);
     }
     else{
       this.checkOutputFolder(init);
     }
  }

  public checkInputFolder = (init: boolean) => {
  	console.log("calling fun", init)
    if(init){
      this.setState({pageLoader: {loading: true, title: "Checking Files in input paths"}});
    } else {
      this.setState({input_path: {message: "Checking path...", msgStatus: "info", checking: true}});
    }
  	new HttpService().checkInputFolder()
        .then((res)=> {
          if(init) {
            this.setState({pageLoader: {loading: false}});
          }
          if(res.data.status === -1) {
            this.setState({input_path: {message: res.data.message, msgStatus: 'error'}})
          }
          if(res.data.status === 0) {
            this.setState({input_path: {message: res.data.message, msgStatus: 'error'}})
          }
          if(res.data.status === 1) {
            this.setState({input_path: {message: res.data.message, msgStatus: 'success'}})
          }
          if(init) {
            this.checkOutputFolder(true);
          }
          
        })
        .catch((err) => {
            this.setState({snackBar: {open: true, message: "ServerERR: Not able to Check the input folder!", autoHideDuration: 5000}});
            this.setState({pageLoader: {loading: false}});
            this.setState({input_path: {message: "Server Error: Not able to Check the input folder!", msgStatus: 'error'}})
            this.checkOutputFolder(true);
        })
  }

  public checkOutputFolder(init: boolean) {
    console.log("calling fun")
    if(init) {
      this.setState({pageLoader: {loading: true, title: "Checking Out Path.."}});
    } else {
      this.setState({output_path: {message: "Checking path...", msgStatus: "info", checking: true}});
    }
    new HttpService().checkOutputFolder()
        .then((res)=> {
          if(init) {
            this.setState({pageLoader: {loading: false}});
          }
          if(res.data.status === -1) {
            this.setState({output_path: {message: res.data.message, msgStatus: 'error'}})
          }
          if(res.data.status === 1) {
            this.setState({output_path: {message: res.data.message, msgStatus: 'success'}})
          }
          
        })
        .catch((err)=> {
            this.setState({snackBar: {open: true, message: "ServerERR: Not able to Check the output folder!", autoHideDuration: 5000}});
            this.setState({output_path: {message: "Server Error: Not able to Check the output folder!", msgStatus: 'error'}})
            this.setState({pageLoader: {loading: false}});
        })
  }

  public getProcessPath() {
    console.log("calling fun")
    this.state.pageLoader.title = "Getting Paths";
    new HttpService().getProcessPath()
        .then((res)=> {
          this.setState({input_path_value: res.data.input_path});
          this.setState({pageLoader: {loading: false}});
          this.checkInputFolder(true);
        })
        .catch((err)=> {
          this.setState({snackBar: {open: true, message: "ERR: Not able to fetch the folder history!", autoHideDuration: 5000}});
          this.setState({pageLoader: {loading: false}});
        })
  }
  public snackBarOnClose = (e) => {
    this.setState({snackBar:{open: false}});
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
            <Grid item xs={7} sm={5} md={7} className="field">
          		<Input
    		        placeholder="Enter input folder path"
                className="input"
    		        inputProps={{
    		          'aria-label': 'Description',
    		        }}
                value={this.state.input_path_value}
                onChange={ this.onInputChange.bind(this, 'input_path_value') }
    		      />
              { this.state.input_path.message ? (
              <div className={"_msg " + (this.state.input_path.msgStatus === 'success' ? 'text-success' : (this.state.input_path.msgStatus === 'info' ? 'text-info' : 'text-warning'))}>{this.state.input_path.message}</div>) : ''
              }
            </Grid>
            <Grid item xs={5} sm={3} md={2} className="field">
              { !this.state.input_path.checking ?
                 (
                     <Button variant="outlined" color="primary" onClick={this.checkFolderFromUI.bind(this, false, 'input')}>
                        Check
                    </Button>
                 ) : (
                      <CircularProgress size={33} />
                 )
              }

            </Grid>
          </Grid>

          <Grid container={true} className="_itm">
            <Grid item xs={12} sm={4} md={3} className="label">
              Output folder
            </Grid>
            <Grid item xs={7} sm={5} md={7} className="field">
              <Input
                placeholder="Enter output folder path"
                className="input"
                inputProps={{
                  'aria-label': 'Description',
                }}
                value={this.state.output_path_value}
                onChange={ this.onInputChange.bind(this, 'output_path_value') }
              />
              { this.state.output_path.message ? (
              <div className={"_msg " + (this.state.output_path.msgStatus === 'success' ? 'text-success' : (this.state.output_path.msgStatus === 'info' ? 'text-info' : 'text-warning'))}>{this.state.output_path.message}</div>) : ''
              }
              

            </Grid>
            <Grid item xs={5} sm={3} md={2} className="field">
              { !this.state.output_path.checking ?
                   (
                       <Button variant="outlined" color="primary" onClick={this.checkFolderFromUI.bind(this, false, 'output')}>
                          Check
                      </Button>
                   ) : (
                        <CircularProgress size={33} />
                   )
                }
            </Grid>
          </Grid>


          </div>
          )}
      	</div>
        <Snackbar
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.snackBar.open}
          autoHideDuration={this.state.snackBar.autoHideDuration}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          onClose={this.snackBarOnClose}
          message={<span id="message-id">{this.state.snackBar.message}</span>}
        />
      </div>
    );
  }
}

  