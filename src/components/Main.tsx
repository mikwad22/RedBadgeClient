import React from "react";
import Auth from "./Auth/Auth";
import Movie from './Home/Movie';
import Navbar from '../components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom";
import APIURL from "./helpers/environment";
import Home from "./Home/Movie";
import Admin from "./Admin/Admin";

// type SessionToken = {
//     sessionToken: string
// }
type states = {
    sessionToken: any,
    login: string,
    role:string,
    firstName:string

}

class Main extends React.Component <{},states>{
    constructor(props:states){
        super(props)
        this.state = {
            sessionToken: "",
            login: "LOGIN",
            role:"",
            firstName:"HOME"
        }
    }
    // componentDidMount(){
    //     if(localStorage.getItem("token")){
    //         this.setState({
    //             sessionToken: localStorage.getItem("token")
    //         })
    //     }
    // }
    // componentDidUpdate(){
    //     if(localStorage.getItem("token")){
    //         this.setState({
    //             sessionToken: localStorage.getItem("token")
    //         })
    //     }
    // }
    //updating a sessionToken
    updateToken = (sessionToken:string,role:string,firstName:string)=>{
        localStorage.setItem("token",sessionToken);
        this.setState({
            sessionToken: sessionToken,
            role:role,
            firstName:firstName
        })
    }

    clearToken = (e:any) => {
        localStorage.clear();
        this.setState({sessionToken: ('')});
        this.setState({login:"LOGIN"});
        this.setState({firstName:"HOME"});
    }

    updateLog = (log:string)=>{
        this.setState({
            login:log
        })
    }
    updateView = ()=>{
        if(this.state.sessionToken === localStorage.getItem("token")){
            if(this.state.role === "User"){

                return(
    
                    <Movie token={this.state.sessionToken} user = {this.state.role} />
                )
            }
            else{
                return(
                    <Admin token = {this.state.sessionToken}/>
                )
            }
        }
        else{
            return(

                <Auth updateToken = {this.updateToken} token = {this.state.sessionToken} updateLog = {this.updateLog}/>
            )
        }
    }

    render(){
        return(
            <div>
                <Router>
                    <Navbar clearToken={this.clearToken} log = {this.state.login} username = {this.state.firstName} />
                    {this.updateView()}
                </Router>
            </div>
        )
    }
}

export default Main;