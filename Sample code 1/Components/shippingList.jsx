import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider } from "./../../Slider/Component/slider";
import { Link } from "react-router-dom";
import { getShippingZone, deleteShippingZone } from "./../ApiCalls/apicalls";
import { logInAction } from "./../../../Login_Signup/Actions/action";
import { getCookie } from "../../../../Constants/common";
import InfiniteScroll from "react-infinite-scroll-component";
import loader from "./../../../../Images/Spinner-1s-200px.gif";
import MerchantFooter from "../../../Footer/MerchantFooter/merchantFooter";
class ShippingList extends Component {
    constructor() {
        super();
        this.state = {
            activePage: 1
        }
    }

    componentDidMount() {
        var token = getCookie("token");
        var userRole = getCookie("userRole");
        var userId = getCookie('user_id');
        if (token === "") {
            this.props.history.push("/merchant/login");
            this.props.logInAction(token, false, Number(userRole));
            this.props.getShippingZone(token, userId, this.state.activePage - 1)
        } else if (this.props.loginReducer.token === '') {
            this.props.logInAction(token, false, Number(userRole));
            this.props.getShippingZone(token, userId, this.state.activePage - 1)
        } else {
            this.props.getShippingZone(token, userId, this.state.activePage - 1)
        }
    }
    fetchMoreData = () => {
        var token = getCookie("token");
        var userId = getCookie('user_id');
        this.setState({
            activePage: this.state.activePage + 1
        })
        this.props.getShippingZone(token, userId, this.state.activePage - 1)
    };
    render() {
        return (
            <div id="wrapper">
                <Slider />
                <div id="content-wrapper">
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/marchant/dashboard">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">ShippingList</li>
                        </ol>
                        <h1>Shipping Settings</h1>
                        <hr />
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="shipping-setting">
                                        <div className="methods">
                                            <div className="form-group form-check">
                                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" for="exampleCheck1">Require customers to choose a shipping method</label>
                                            </div>
                                            <a className="btn btn-primary " href="#">Update Settings</a>
                                        </div>
                                        <div className="zones">
                                            <div className="add-zone">
                                                <h2>Zones and rates</h2>
                                                <p>Use shipping zones to choose the regions that you ship to. Define your shipping rates for each zone that will show up during checkout.</p>
                                                <Link className="btn btn-primary" to="/merchant/addShipping">Add Shipping Zone</Link>
                                            </div>
                                            <InfiniteScroll
                                                dataLength={this.props.shippingMerchantReducer.list.length}
                                                next={() => this.fetchMoreData()}
                                                hasMore={this.props.shippingMerchantReducer.total <= this.props.shippingMerchantReducer.list.length ? false : true}
                                                loader={<div colSpan="12" className="loadmore" > <img src={loader} /></div>}
                                            >
                                                {this.props.shippingMerchantReducer.list.map((item, index) => {
                                                    return <div className="panel" key={index}>
                                                        <div className="panel-header">
                                                            <h3>{item.name}</h3>
                                                            <div className="buttons">
                                                                <Link className="btn btn-link" to={"/merchant/editShipping/"+item._id}>Edit</Link><a className="btn btn-link " href='javascript:void(0)' onClick={() => this.props.deleteShippingZone('',item._id)}>Delete</a>
                                                            </div>
                                                        </div>
                                                        <div className="panel-body">
                                                            <p><i className='fa fa-globe'></i>&nbsp;
                                                                {item.countries.map((coutry, i) => {
                                                                    return i === 0 ? (coutry.name + " ")
                                                                        : i !== 0 ?
                                                                            (", " + coutry.name) : ''
                                                                })}
                                                                {item.countries.length === 1 ?
                                                                    ("(" + item.countries[0].state.length + " states)") : ''}</p>
                                                            <h3>Shipping Rates</h3>

                                                            <table className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Range</th>
                                                                        <th>Price</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item.shippingRates.map((rate, j) => {
                                                                        return <tr key={j}>
                                                                            <td>{rate.name}</td>
                                                                            <td>${rate.min} - ${rate.max}</td>
                                                                            <td>${rate.price}</td>
                                                                        </tr>
                                                                    })

                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                })}

                                            </InfiniteScroll>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr />

                    </div>
                    <MerchantFooter />

                </div>


            </div >
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    loginReducer: state.loginReducer,
    apiCallStatus: state.apiCallStatus,
    shippingMerchantReducer: state.shippingMerchantReducer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteShippingZone: (token, id) => dispatch(deleteShippingZone(token, id)),
    getShippingZone: (token, userId, offset) => dispatch(getShippingZone(token, userId, offset)),
    logInAction: (token, twoFactorAuth, userRole) => dispatch(logInAction(token, twoFactorAuth, userRole))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingList)