import React from 'react';

class Error extends React.Component {
    static async getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : 404
        return { statusCode };
    }
    render() { 
        return ( 
            <p>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
        );
    }
}
 
export default Error;
