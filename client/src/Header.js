import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'

class Header extends Component {

    handleItemClick = (e,{path}) => {
        this.props.history.push(path)
    }

    render() {

        const currentPath = this.props.history.location.pathname

        return (
            <Menu color="blue" inverted icon='labeled' >
                <Menu.Item 
                    path='/deckofficer' 
                    active={currentPath.includes('/deckofficer') || currentPath === "/"} 
                    onClick={this.handleItemClick}>
                        Deck officer
                        </Menu.Item>
                <Menu.Item 
                    path='/tugmaster' 
                    active={currentPath.includes('/tugmaster')} 
                    onClick={this.handleItemClick}>
                        Tugmaster
                    </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(Header)
