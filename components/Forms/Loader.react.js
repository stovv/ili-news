import React from 'react';
import { Flex } from 'reflexbox';


const Loader = ()=>(
    <Flex justifyContent="center" margin="80px 0">
        <div className={"loading"}>
            <div/>
            <div/>
            <div/>
        </div>
    </Flex>
);

export default Loader;