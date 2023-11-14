import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider } from "./../../Slider/Component/slider";
import { addShippingZone, getCountryStatesCount } from "./../ApiCalls/apicalls";
import { getCountries, getStates } from '../../../common/ApiCalls/apicalls'
import { logInAction } from "./../../../Login_Signup/Actions/action";
import { getCookie } from "../../../../Constants/common";
import { Constant } from "../../../../Constants/constant";
import loader from "./../../../../Images/Spinner-1s-200px.gif";
import MerchantFooter from "../../../Footer/MerchantFooter/merchantFooter";
import Picky from "react-picky";
class AddShippingZone extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            countries: [],
            rates: [],
            userId: getCookie('user_id'),
            errorMessage: '',
            errorType: '',
            editCountryState: {},
            editShippingRate: {}
        }
    }

    componentDidMount() {
        var token = getCookie("token");
        var userRole = getCookie("userRole");
        var userId = getCookie('user_id');
        if (token === "") {
            this.props.history.push("/merchant/login");
            this.props.logInAction(token, false, Number(userRole));
            this.props.getCountries(token)
        } else if (this.props.loginReducer.token === '') {
            this.props.logInAction(token, false, Number(userRole));
            this.props.getCountries(token)
        } else {
            this.props.getCountries(token)
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.apiCallStatus.apiCallFor === 'getCountryStatesCount' &&
            nextProps.apiCallStatus.isCompleted === true &&
            nextProps.apiCallStatus.isFailed === false) {
            if (this.state.countries.length === 0) {
                this.setState({
                    errorMessage: '',
                    errorType: '',
                    countries: nextProps.apiCallStatus.message
                })
            } else {
                this.setState({
                    errorMessage: '',
                    errorType: '',
                    countries: nextProps.apiCallStatus.message
                })
            }

        }
        if (nextProps.apiCallStatus.apiCallFor === 'addShippingZone' &&
            nextProps.apiCallStatus.isCompleted === true &&
            nextProps.apiCallStatus.isFailed === false) {
            this.props.history.push('/merchant/shipping')
        }
    }
    fetchMoreData = () => {
        var token = getCookie("token");
        var userId = getCookie('user_id');
        this.setState({
            activePage: this.state.activePage + 1
        })
        this.props.getCustomers(token, userId, this.state.activePage - 1)
    };
    addCountry = (data) => {
        this.props.getCountryStatesCount('', data)
    }
    removeCountry = (index) => {
        let arr = Object.assign(this.state.countries);
        arr.splice(index, 1);
        this.setState({
            countries: arr,
            errorMessage: '',
            errorType: ''
        })

    }
    addShippingRate = (item) => {
        let arr = Object.assign(this.state.rates);
        arr.push(item);
        this.setState({
            rates: arr,
            errorMessage: '',
            errorType: ''
        })
    }
    removeRates = (index) => {
        let arr = Object.assign(this.state.rates);
        arr.splice(index, 1);
        this.setState({
            rates: arr,
            errorMessage: '',
            errorType: ''
        })

    }
    addShippinZone = () => {
        if (this.state.name === '') {
            this.setState({
                errorMessage: 'Name is empty',
                errorType: 'danger'
            })
        } else if (this.state.countries.length === 0) {
            this.setState({
                errorMessage: 'Please add countries',
                errorType: 'danger'
            })
        } else if (this.state.rates.length === 0) {
            this.setState({
                errorMessage: 'Please add shipping rates',
                errorType: 'danger'
            })
        } else {
            this.setState({
                errorMessage: '',
                errorType: ''
            })
            this.props.addShippingZone('', {
                name: this.state.name,
                countries: this.state.countries,
                shippingRates: this.state.rates,
                userId: this.state.userId
            })
        }

    }
    showEditModel = (item) => {
        window.jQuery('#stateModal').modal('toggle');
        this.props.getStates('', item.id);
        this.setState({
            editCountryState: item
        })
    }
    showShippingRateModel = (e, item, index, type) => {
        e.preventDefault();
        window.jQuery('#rateModal').modal('toggle');
        if (type === 'add') {
            this.setState({
                editShippingRate: {}
            })
        } else {
            item.index = index
            this.setState({
                editShippingRate: item
            })
        }
    }
    editStates = (item) => {
        let arr = Object.assign(this.state.countries);
        let index = arr.findIndex(x => x.id === item.id);
        if (index > -1) {
            arr[index] = item
        }
        this.setState({
            countries: arr,
            editCountryState : {}
        })
    }
    editShippingRate = (item,index) => {
        let arr = Object.assign(this.state.rates);
        arr[index] = item;
        this.setState({
            rates: arr,
            errorMessage: '',
            errorType: '',
            editShippingRate : {}
        })
    }
    render() {
        return (
            <div id="wrapper">
                <Slider />
                <div id="content-wrapper">
                    <div className="container-fluid">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/merchant/dashboard">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Add Zone</li>
                        </ol>
                        <h1>Add a new shipping zone</h1>
                        <hr />
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="add-shipping-Zone">
                                        <div className="fields">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputName">Name</label>
                                                <input type="text" className="form-control" id="name"
                                                    autoComplete='off'
                                                    value={this.state.name}
                                                    onChange={(e) => this.setState({ name: e.target.value })}
                                                    aria-describedby="nameHelp" placeholder="Enter Name" />
                                                <small id="nameHelp" className="form-text text-muted">Customer won't see</small>
                                            </div>

                                        </div>

                                        <div className="countries">
                                            <div className="panel">
                                                <div className="panel-header">
                                                    <h3>Countires</h3>
                                                    <a href="" className="btn btn-primary" data-toggle="modal" data-target="#countryModal">Add Countries</a>
                                                </div>
                                                <div className="panel-body">
                                                    <table className="table">
                                                        <tbody>
                                                            {this.state.countries.map((item, index) => {
                                                                return <tr id={"country-" + index} key={index}>
                                                                    <td align="left">

                                                                        <img src={Constant.host + 'flags/4x3/' + item.shortname.toLowerCase() + '.svg'} alt="icon" />
                                                                        {item.name}
                                                                    </td>
                                                                    <td align="center">
                                                                        ({item.state.length} of {item.totalState} states/provinces)
                              </td>
                                                                    <td align="right"><a href="javascript:void(0);" onClick={() => this.showEditModel(item)} >Edit</a></td>
                                                                    <td align="center"><a onClick={() => this.removeCountry(index)} href="javascript:void(0);">x</a></td>
                                                                </tr>
                                                            })}

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="rates">
                                            <div className="panel">
                                                <div className="panel-header">
                                                    <h3>Shipping Rates</h3>
                                                    <a href="" className="btn btn-primary" onClick={(e) => this.showShippingRateModel(e, {}, '', 'add')}>Add Shipping Rate</a>
                                                </div>
                                                <div className="panel-body">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Range</th>
                                                                <th>Rate Price</th>
                                                                <th></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.rates.map((item, index) => {
                                                                return <tr key={index}>
                                                                    <td>{item.name}</td>
                                                                    <td>${item.min} - ${item.max} </td>
                                                                    <td>${item.price}</td>
                                                                    <td align="right"><a href="javascript:void(0);" onClick={(e) => this.showShippingRateModel(e, item, index, 'edit')}>Edit</a></td>
                                                                    <td align="center"><a onClick={() => this.removeRates(index)} href="javascript:void(0);">x</a></td>
                                                                </tr>
                                                            })}

                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                        {this.state.errorMessage !== '' &&
                                            this.state.errorType === 'danger' ?
                                            <div className={"alert alert-danger"}>
                                                {this.state.errorMessage}
                                            </div> : ''}
                                        <a className="btn btn-primary" onClick={() => this.addShippinZone()}>Add Shipping Zone</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <Models
                            countries={this.props.commonReducer.countries}
                            states={this.props.commonReducer.state}
                            countryList={this.state.countries}
                            editShippingRate={this.state.editShippingRate}
                            editCountryState={this.state.editCountryState}
                            editStates={(item) => this.editStates(item)}
                            editShippingRates={(item,index) => this.editShippingRate(item,index)}
                            addShippingRate={(item) => this.addShippingRate(item)}
                            addCountry={(data) => this.addCountry(data)} />
                    </div>
                    <MerchantFooter />

                </div>
            </div >
        )
    }
}

class Models extends Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            shippingRateName: '',
            shippingType: 'price',
            states: [],
            minRange: '',
            maxRange: '',
            ratePrice: '',
            errorMessage: '',
            errorType: '',
            errorFor: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.countryList.length > 0 && this.state.countries.length === 0) {
            this.setState({
                countries: nextProps.countryList
            })
        }
        if (Object.keys(nextProps.editCountryState).length > 0 && this.state.states.length === 0) {
            this.setState({
                states: nextProps.editCountryState.state
            })
        }
        if (Object.keys(nextProps.editShippingRate).length > 0 &&
        this.state.shippingRateName === '' && this.state.ratePrice === '') {
        this.setState({
            shippingRateName: nextProps.editShippingRate.name,
            minRange: nextProps.editShippingRate.max,
            maxRange: nextProps.editShippingRate.min,
            ratePrice: nextProps.editShippingRate.price,
            shippingType: nextProps.editShippingRate.type
        })
    }
    }
    handleCountries = (item) => {
        this.setState({
            countries: item
        })
    }
    handleState = (item) => {
        this.setState({
            states: item
        })
    }
    addCountry = () => {
        window.jQuery('#countryModal').modal('toggle')
        if (this.state.countries.length > 0) {
            this.props.addCountry(this.state.countries);
        }
        this.setState({
            shippingRateName: '',
            shippingType: 'price',
            states: [],
            minRange: '',
            maxRange: '',
            ratePrice: '',
            errorMessage: '',
            errorType: '',
            errorFor: ''
        })
    }
    closeModel = (modelName) => {
        window.jQuery('#' + modelName).modal('toggle')
        this.setState({
            shippingRateName: '',
            shippingType: 'price',
            states: [],
            minRange: '',
            maxRange: '',
            ratePrice: '',
            errorMessage: '',
            errorType: '',
            errorFor: ''
        })
    }
    handleChange = (e) => {
        let id = e.target.id;
        let val = e.target.value;
        this.setState({
            [id]: val,
            errorMessage: '',
            errorType: '',
            errorFor: ''
        })
    }
    addShippingRate = () => {
        let isValid = this.validateFields();
        if (isValid) {
            window.jQuery('#rateModal').modal('toggle');
            if (Object.keys(this.props.editShippingRate).length > 0) {
                this.props.editShippingRates({
                    name: this.state.shippingRateName,
                    type: this.state.shippingType,
                    min: this.state.minRange,
                    max: this.state.maxRange,
                    price: this.state.ratePrice
                },this.props.editShippingRate.index)
            } else {
                this.props.addShippingRate({
                    name: this.state.shippingRateName,
                    type: this.state.shippingType,
                    min: this.state.minRange,
                    max: this.state.maxRange,
                    price: this.state.ratePrice
                })
            }
            this.setState({
                shippingRateName: '',
                shippingType: 'price',
                states: [],
                minRange: '',
                maxRange: '',
                ratePrice: '',
                errorMessage: '',
                errorType: '',
                errorFor: ''
            })
        }
    }
    validateFields = () => {
        let isValid = true;
        if (this.state.shippingRateName === '') {
            isValid = false;
            this.setState({
                errorMessage: 'Name is empty',
                errorType: 'danger',
                errorFor: 'rateModal'
            })
        } else if (this.state.shippingType === '') {
            isValid = false;
            this.setState({
                errorMessage: 'Please select the type',
                errorType: 'danger',
                errorFor: 'rateModal'
            })
        } else if (this.state.minRange === '') {

            isValid = false;
            this.setState({
                errorMessage: 'Minimium order is empty',
                errorType: 'danger',
                errorFor: 'rateModal'
            })
        } else if (this.state.maxRange === '') {
            isValid = false;
            this.setState({
                errorMessage: 'Maximium order is empty',
                errorType: 'danger',
                errorFor: 'rateModal'
            })
        } else if (this.state.ratePrice === '') {
            isValid = false;
            this.setState({
                errorMessage: 'Price Rate is empty',
                errorType: 'danger',
                errorFor: 'rateModal'
            })
        }
        return isValid;
    }
    addStates = () => {
        this.props.editStates({
            id: this.props.editCountryState.id,
            name: this.props.editCountryState.name,
            shortname: this.props.editCountryState.shortname,
            status: this.props.editCountryState.status,
            totalState: this.props.editCountryState.totalState,
            state: this.state.states
        })
        this.closeModel('stateModal')
    }
    render() {
        return (
            <React.Fragment>
                <div className="modal fade" id="countryModal" tabIndex="-1" role="dialog" aria-labelledby="countryModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="countryModalLabel">Add Countries</h5>
                                <button type="button" className="close" onClick={() => this.closeModel('countryModal')} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <Picky
                                        value={this.state.countries}
                                        options={this.props.countries}
                                        onChange={(item) => this.handleCountries(item)}
                                        open={true}
                                        valueKey="id"
                                        labelKey="name"
                                        multiple={true}
                                        includeSelectAll={true}
                                        includeFilter={true}
                                        dropdownHeight={600}
                                    />
                                </form>
                                <div className='clear10'></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.closeModel('countryModal')}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.addCountry()}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="rateModal" tabIndex="-1" role="dialog" aria-labelledby="rateModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="rateModalLabel">Add shipping rate</h5>
                                <button type="button" className="close" onClick={() => this.closeModel('rateModal')} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="nameInputEmail1">Name</label>
                                        <input type="text" className="form-control" id="shippingRateName"
                                            onChange={(e) => this.handleChange(e)}
                                            value={this.state.shippingRateName} aria-describedby="nameHelp" placeholder="Enter Name" />
                                        <small id="nameHelp" className="form-text text-muted">Customers will see this at checkout</small>
                                    </div>

                                    <div className="types">
                                        <h6>Type</h6>
                                        <div className="form-check">
                                            <label className="form-check-label" htmlFor="weightRadios1">
                                                <input className="form-check-input" type="radio"
                                                    onChange={(e) => this.handleChange(e)}
                                                    name="shippingType"
                                                    value='weight'
                                                    checked={this.state.shippingType === 'weight'} id="shippingType" />
                                                Weight based
                      </label>
                                        </div>

                                        <div className="form-check">
                                            <label className="form-check-label" htmlFor="priceRadios1">
                                                <input className="form-check-input"
                                                    checked={this.state.shippingType === 'price'}
                                                    value='price'
                                                    onChange={(e) => this.handleChange(e)} type="radio"
                                                    name="shippingType" id="shippingType" />
                                                Price based
                        </label>
                                        </div>
                                    </div>

                                    <div className="range">
                                        <h6>Range</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="minOrder1">Minimum order {this.state.shippingType === 'price' ? 'price' : 'weight (lb)'}</label>
                                                    <input type="number" className="form-control"
                                                        value={this.state.minRange}
                                                        onChange={(e) => this.handleChange(e)}
                                                        id="minRange" min="0" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="maxOrder1">Maximum order {this.state.shippingType === 'price' ? 'price' : 'weight (lb)'}</label>
                                                    <input type="number" className="form-control" value={this.state.maxRange}
                                                        onChange={(e) => this.handleChange(e)}
                                                        id="maxRange" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="form-group">
                                                    <label htmlFor="ratePrice1">Rate price</label>
                                                    <input type="number" className="form-control"
                                                        value={this.state.ratePrice}
                                                        onChange={(e) => this.handleChange(e)}
                                                        id="ratePrice" placeholder="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            {this.state.errorMessage !== '' &&
                                this.state.errorType === 'danger' &&
                                this.state.errorFor === 'rateModal' ?
                                <div className={"alert alert-danger"}>
                                    {this.state.errorMessage}
                                </div> : ''}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.closeModel('rateModal')}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.addShippingRate()}>Add Rate</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="stateModal" tabIndex="-1" role="dialog" aria-labelledby="stateModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="stateModel">Edit states / provinces</h5>
                                <button type="button" className="close" onClick={() => this.closeModel('stateModal')} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <Picky
                                        value={this.state.states}
                                        options={this.props.states}
                                        onChange={(item) => this.handleState(item)}
                                        open={true}
                                        valueKey="id"
                                        labelKey="name"
                                        multiple={true}
                                        includeSelectAll={true}
                                        includeFilter={true}
                                        dropdownHeight={600}
                                    />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => this.closeModel('stateModal')}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.addStates()}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    loginReducer: state.loginReducer,
    apiCallStatus: state.apiCallStatus,
    commonReducer: state.commonReducer,
    shippingMerchantReducer: state.shippingMerchantReducer
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    addShippingZone: (token, data) => dispatch(addShippingZone(token, data)),
    getCountryStatesCount: (token, countryId) => dispatch(getCountryStatesCount(token, countryId)),
    getCountries: (token) => dispatch(getCountries(token)),
    getStates: (token, countryId) => dispatch(getStates(token, countryId)),
    logInAction: (token, twoFactorAuth, userRole) => dispatch(logInAction(token, twoFactorAuth, userRole))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddShippingZone)