import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';

const decks = ["1","2","3","4","5"]

export default class DeckPicker extends Component {
    render() {
        return (
            <div >
                {decks.map((d,ix) => {return <Button primary key={ix} onClick={() => this.props.onSubmit(d)}>{d}</Button>})}
            </div>
        )
    }
}