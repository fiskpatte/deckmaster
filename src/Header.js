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
            <Menu color="blue" inverted >
                <Menu.Item name='Deck officer' path='/deckofficer' active={currentPath.includes('/deckofficer')} onClick={this.handleItemClick}/>
                <Menu.Item name='Tugmaster' path='/tugmaster' active={currentPath.includes('/tugmaster')} onClick={this.handleItemClick}/>
            </Menu>
        )
    }
}

export default withRouter(Header)
