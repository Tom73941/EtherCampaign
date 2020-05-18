// JavaScript source code
import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from '../routes';

export default ()=>{
    return (
        <Menu style={{marginTop:'10px'}}>
            <Menu.Item>
                <Link route="/"><a>首页</a></Link>
            </Menu.Item>
            <Menu.Item position= 'right'>
                <Menu.Item>众筹</Menu.Item>
                <Menu.Item>
                    <Link route="/campaigns/new"><a>+</a></Link>
                </Menu.Item>
            </Menu.Item>
        </Menu>
    );
}