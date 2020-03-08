import React from 'react';

class Error extends React.Component {
    static async getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 404
        return { statusCode: statusCode };
    }
    render() { 
        return ( 
            <>
            <p>{this.props.statusCode}</p>
            <p>
                {this.props.statusCode
                    ? `An error ${this.props.statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
            </>
        );
    }
}
 
export default Error;
