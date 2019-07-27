import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <Menu>
                <Menu.Item name='Deck officer'>
                    <Link to="/deckofficer">Deck Officer</Link>
                </Menu.Item>
                <Menu.Item name='Tugmaster'>
                    <Link to="/tugmaster">Tugmaster</Link>
                </Menu.Item>               
            </Menu>
        )
    }
}
