import React from 'react';

import {Containers, Images, Typography} from "../index";
import { Context } from '../Menus';
import { Avatar } from "../Images";
import {getImageLink} from "../Images/tools";
import { Flex, Box } from 'reflexbox';


class UserAreaLayout extends React.Component{

    render(){
        const cover = {
            "id": "70",
            "name": "abstract-background-beach-color-355288.jpg",
            "mime": "image/jpeg",
            "width": 5106,
            "height": 3404,
            "formats": {
                "large": {
                    "ext": ".jpg",
                    "url": "/uploads/large_abstract_background_beach_color_355288_1e296c6403.jpg",
                    "hash": "large_abstract_background_beach_color_355288_1e296c6403",
                    "mime": "image/jpeg",
                    "name": "large_abstract-background-beach-color-355288.jpg",
                    "path": null,
                    "size": 121.88,
                    "width": 1000,
                    "height": 667
                },
                "small": {
                    "ext": ".jpg",
                    "url": "/uploads/small_abstract_background_beach_color_355288_1e296c6403.jpg",
                    "hash": "small_abstract_background_beach_color_355288_1e296c6403",
                    "mime": "image/jpeg",
                    "name": "small_abstract-background-beach-color-355288.jpg",
                    "path": null,
                    "size": 36.85,
                    "width": 500,
                    "height": 333
                },
                "medium": {
                    "ext": ".jpg",
                    "url": "/uploads/medium_abstract_background_beach_color_355288_1e296c6403.jpg",
                    "hash": "medium_abstract_background_beach_color_355288_1e296c6403",
                    "mime": "image/jpeg",
                    "name": "medium_abstract-background-beach-color-355288.jpg",
                    "path": null,
                    "size": 74.84,
                    "width": 750,
                    "height": 500
                },
                "thumbnail": {
                    "ext": ".jpg",
                    "url": "/uploads/thumbnail_abstract_background_beach_color_355288_1e296c6403.jpg",
                    "hash": "thumbnail_abstract_background_beach_color_355288_1e296c6403",
                    "mime": "image/jpeg",
                    "name": "thumbnail_abstract-background-beach-color-355288.jpg",
                    "path": null,
                    "size": 10.37,
                    "width": 234,
                    "height": 156
                }
            },
            "url": "/uploads/abstract_background_beach_color_355288_1e296c6403.jpg",
            "hash": "abstract_background_beach_color_355288_1e296c6403"
        };
        const avatar = {
            "id": "1",
            "name": "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
            "mime": "image/jpeg",
            "width": 2744,
            "height": 4049,
            "formats": {
                "large": {
                    "ext": ".1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "url": "/uploads/large_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "hash": "large_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498",
                    "mime": "image/jpeg",
                    "name": "large_https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "path": null,
                    "size": 47.84,
                    "width": 678,
                    "height": 1000
                },
                "small": {
                    "ext": ".1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "url": "/uploads/small_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "hash": "small_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498",
                    "mime": "image/jpeg",
                    "name": "small_https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "path": null,
                    "size": 13.16,
                    "width": 339,
                    "height": 500
                },
                "medium": {
                    "ext": ".1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "url": "/uploads/medium_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "hash": "medium_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498",
                    "mime": "image/jpeg",
                    "name": "medium_https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "path": null,
                    "size": 26.97,
                    "width": 508,
                    "height": 750
                },
                "thumbnail": {
                    "ext": ".1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "url": "/uploads/thumbnail_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "hash": "thumbnail_photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498",
                    "mime": "image/jpeg",
                    "name": "thumbnail_https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80",
                    "path": null,
                    "size": 2.52,
                    "width": 106,
                    "height": 156
                }
            },
            "hash": "photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498",
            "url": "/uploads/photo_1537151608828_ea2b11777ee8_ixlib_rb_1_2_00a8aa8498.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=639&q=80"
        };
        const user = {

        };

        if (typeof window === "undefined" || typeof document === "undefined") return null;
        // margin bottom 108px
        return (<div id={"user-page"}>
            <Images.Lazy cover={cover} height="242px" blackout overflow="visible">
                <Box sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 112,
                    transform: "translateY(50%)"
                }}>
                    <Containers.Default>
                        <Avatar image={getImageLink(avatar, 'medium')['url']}/>
                    </Containers.Default>
                </Box>
            </Images.Lazy>
            <Flex justifyContent={"space-between"}>
                {/*<Box></Box>*/}
                {/*<Box></Box>*/}
            </Flex>
            <Context type="user" contextId="user-page"/>
            {/*<Box id="user-area" sx={{*/}
            {/*    width: "100vw", position: "absolute",*/}
            {/*    height: "100vh", top: 0, left: 0*/}
            {/*}}/>*/}
        </div>);
    }
}
//me-setting-menu

export default UserAreaLayout;