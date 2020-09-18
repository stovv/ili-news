import React from "react";
import { connect } from 'react-redux';

import { Layouts } from '../../components';
import { Common } from "../../actions";

class PersonalArea extends React.Component{
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Common.changeInfinityState(false));
    }

    render(){
        return (
            <Layouts.UserArea>

            </Layouts.UserArea>
        );
    }
}

export default connect()(PersonalArea);