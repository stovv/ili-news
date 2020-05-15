import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';


class DraftCard extends React.Component {


    render() {

        const {} = this.props.draft;

        return <></>;
    }
}

DraftCard.propTypes = {
    draft: PropTypes.object.isRequired,
}

export default withTheme(DraftCard);