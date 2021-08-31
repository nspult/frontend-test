import React from "react";
import {inject, observer} from "mobx-react";

@inject('appStore')
@observer
export default class Modals extends React.Component {
    render() {
        const {appStore} = this.props;
        return (
            <div>
                {appStore.modals.map((item, key) => {
                    return (
                        <div key={key}>
                            {item}
                        </div>

                    )
                })}
            </div>
        )
    }
}