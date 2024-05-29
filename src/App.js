/* eslint no-eval: 0 */

import React from "react";
import "./App.css";
import store from "./store";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            out: "0",
        };
        this.refOutput = React.createRef();
    }

    tapeNumber(value) {
        let currentVal = value;
        let output = this.refOutput.current;

        this.setState({
            out: currentVal,
        });

        if (output.value === "0") {
            output.value = "";
        }

        output.value += currentVal;
    }

    tapeOper(value) {
        let output = this.refOutput.current;

        if (value === "CE") {
            output.value.length === 1
                ? (output.value = "0")
                : (output.value = output.value.substring(
                      0,
                      output.value.length - 1
                  ));
        } else if (value === "C") {
            output.value = "0";
        } else if (value === "=") {
            try {
                if (output.value.includes("/0")) {
                    output.value = "Делить на ноль нельзя";
                    setTimeout(() => {
                        output.value = 0;
                    }, 1500);
                } else {
                    output.value = eval(output.value);
                }
            } catch {
                output.value = "Недопустимое значение или операция";
                setTimeout(() => {
                    output.value = 0;
                }, 1500);
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="output">
                    <input
                        ref={this.refOutput}
                        type="text"
                        defaultValue={this.state.out}
                    />
                </div>
                <div className="buttons">
                    {store.buttons.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => this.tapeNumber(item.val)}
                        >
                            {item.val}
                        </button>
                    ))}
                    {store.opers.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => this.tapeOper(item.val)}
                        >
                            {item.val}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
