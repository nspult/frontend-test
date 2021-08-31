import React from "react";
import { inject, observer } from "mobx-react";

import Portal from "../../service/Portal";
import { getScreen } from "../../../utils/grid";

import Modals from "./Modals";

@inject('appStore')
@observer
export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.props.appStore.changeScreen(getScreen());
    }


    render() {
        const { appStore } = this.props;
        return (
            <>
                <Portal Component={Modals} container={document.getElementById('root-app-modals')}/>
                {appStore.contentRoots.map((item, key) => {
                    return (
                        <div key={key}>
                            {item}
                        </div>
                    )
                })}
                {appStore.showCompareSuccess &&   <CompareSuccessLine/>}
            </>
        )
    }
}