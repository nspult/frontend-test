import React from "react";

import "jquery-mask-plugin";
import Form from "../../../components/form";
import {User} from "../../../agent";
import Analytics from "../../../analytics";
import {Modal} from "../../../components/modal";

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <form className="form form-registration">
                <div className="form__header">
                    <div className="form__title bold">
                        Регистрация
                    </div>
                </div>
                <div className="form__main">
                    <div className="invalid-feedback form-main-error"/>
                    <div className="form-group form-group-pressed">
                        <input className="form-control form-control-lg" type="text" name="name" placeholder="Имя"/>
                    </div>
                    <div className="form-group form-group-pressed">
                        <input className="form-control form-control-lg" type="email" name="email" placeholder="E-mail"/>
                    </div>
                    <div className="form-group form-group-pressed">
                        <input className="form-control form-control-lg imaskjs__input_tel" type="text" name="phone"
                               placeholder="Телефон" maxLength="18"/>
                    </div>
                    <ul className="form-group form-registration__checks">
                        <li className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name="subscribe[]" value="mail"
                                   defaultChecked id="registration_p2"/>
                            <label className="custom-control-label" htmlFor="registration_p2">
                                Подписаться на e-mail рассылки
                            </label>
                        </li>
                        <li className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name="subscribe[]" value="sms"
                                   defaultChecked id="registration_p3"/>
                            <label className="custom-control-label" htmlFor="registration_p3">
                                Подписаться на SMS рассылки
                            </label>
                        </li>
                        <li className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name="agree" defaultChecked
                                   id="registration_p1"/>
                            <label className="custom-control-label" htmlFor="registration_p1">
                                Согласие на&nbsp;<a className="link"
                                                    href="https://www.pult.ru/company/soglasie-na-obrabotku-personalnykh-dannykh/"
                                                    target="_blank">обработку данных</a>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className="form__btns">
                    <button type="submit" className="form__btn medium ">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        )
    }
}