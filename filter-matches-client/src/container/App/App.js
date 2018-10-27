import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Layout, Menu, Breadcrumb, Divider } from 'antd';

import ProfileHolder from '../../components/ProfileHolder/ProfileHolder'
import Filter from '../../components/Filter/Filter'
import UserDetails from '../../models/user-details';

import * as actions from './actions';
import { selectUserDomain, selectUserMatch } from './selectors';
import '../../styles/containers/App.css';
import 'antd/dist/antd.css';

const { Header, Content } = Layout;

class App extends Component {

    constructor(props) {
        super(props);
        let userDetails = new UserDetails({});
        let userMatchDetails = []
        this.state = {
            userDetails,
            userMatchDetails: null,
            filter: {},
        };
    }

    hasPhotos = (value) => {
        console.log("value", value);
        const { filter } = this.state;
        if (value === 2) {
            value = 0;
        }
        filter.hasFace = value;
        this.setState({ filter });
    }

    inContact = (value) => {
        const { filter } = this.state;
        if (value === 2) {
            value = 0;
        }
        filter.inContact = value;
        this.setState({ filter });
    }

    isFavorite = (value) => {
        const { filter } = this.state;
        if (value === 2) {
            value = 0;
        }
        filter.favourite = value;
        this.setState({ filter });
    }

    compatibilityChange = (value) => {
        const { filter } = this.state;
        filter.compatibilityScoreFrom = value[0];
        filter.compatibilityScoreTo = value[1];
        this.setState({ filter });
    }

    ageChange = (value) => {
        const { filter } = this.state;
        filter.ageFrom = value[0];
        filter.ageTo = value[1];
        this.setState({ filter });
    }

    heightChange = (value) => {
        const { filter } = this.state;
        filter.heightFrom = value[0];
        filter.heightTo = value[1];
        this.setState({ filter });
    }

    distanceChange = (value) => {
        const { filter } = this.state;
        filter.radius = value[1];
        this.setState({ filter });
    }

    onFilterApply = () => {
        console.log("on apply click");
        this.props.actions.applyFilter(this.state.userDetails.userId, this.state.filter);
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps:", nextProps, this.props);
        if (nextProps.userDetails.userId && !nextProps.userMatchDetails) {
            this.setState({ userDetails: nextProps.userDetails }, function () {
                this.props.actions.getMatches(nextProps.userDetails.userId);
            });
        }

        if (nextProps.userMatchDetails && nextProps.userMatchDetails.matches.len) {
            let newMatchList = []
            nextProps.userMatchDetails.matches.forEach(element => {
                newMatchList = newMatchList.concat(new UserDetails(element))
            });
            this.setState({ userMatchDetails: newMatchList })
        }

    }

    componentWillMount() {
        console.log("App IS MOUNTED", this.state.userDetails);
        if (this.state.userDetails.userId === -1) {
            this.props.actions.getUser();
        } else {
            // this.setState({ text: "no data in initial data to proceed" });
            console.log("User Details are fetched");
        }
    }

    render() {
        let profList = []
        console.log("state", this.props, this.state);
        if (this.props.userMatchDetails) {
            for (let i = 0; i < this.props.userMatchDetails.matches.length; i++) {
                profList = profList.concat(
                    <div key={i}  >
                        <ProfileHolder className="flex-container" profile={{
                            "age": this.props.userMatchDetails.matches[i].age,
                            "name": this.props.userMatchDetails.matches[i].display_name,
                            "religion": this.props.userMatchDetails.matches[i].religion,
                            "height": this.props.userMatchDetails.matches[i].height_in_cm,
                            "city": this.props.userMatchDetails.matches[i].city,
                            "profession": this.props.userMatchDetails.matches[i].job_title,
                            "contactShared": this.props.userMatchDetails.matches[i].contacts_exchanged,
                            "image": this.props.userMatchDetails.matches[i].main_photo,
                            "width": 150,
                            "height": 150
                        }}>
                        </ProfileHolder>
                        <Divider />
                    </div>
                )
            }
        }

        console.log("profList*********", this.state, this.props);
            return (
                <Header className="header">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"></Menu.Item>
                    </Menu>
                    <Layout>
                        <Layout style={{ padding: '0px 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 700 }}>
                                {this.props.userDetails ? 
                                <ProfileHolder className="flex-container" profile={{
                                    "age": this.props.userDetails.age,
                                    "name": this.props.userDetails.display_name,
                                    "religion": this.props.userDetails.religion,
                                    "height": this.props.userDetails.height_in_cm,
                                    "city": this.props.userDetails.city,
                                    "profession": this.props.userDetails.job_title,
                                    "contactShared": this.props.userDetails.contacts_exchanged,
                                    "image": this.props.userDetails.main_photo,
                                }}></ProfileHolder>
                                : ""}
                                <Divider />
                                Find Matches below
                <Divider />


                                <Filter hasPhotos={this.hasPhotos}
                                    isFavorite={this.isFavorite}
                                    inContact={this.inContact}
                                    compatibilityChange={this.compatibilityChange}
                                    ageChange={this.ageChange}
                                    heightChange={this.heightChange}
                                    distanceChange={this.distanceChange}
                                    onApplyClick={this.onFilterApply}
                                />


                                <Divider />

                                {profList}
                            </Content>
                        </Layout>
                    </Layout>
                </Header>
            );
    }
}

const mapStateToProps = createStructuredSelector({
    userDetails: selectUserDomain(),
    userMatchDetails: selectUserMatch(),
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
