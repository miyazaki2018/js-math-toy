import React from 'react'
import T from 'prop-types'

import MG from '../../lib/math-generator'


class PreviewFormula extends React.Component {

    static propTypes = {
        row:    T.number,
        column: T.number,
    }

    constructor(props) {
      super(props);
      this.state = { formulas:[]};
    }

    componentDidMount() {
        var formulas = this._genForumlas(this.props.row, this.props.column);
        this.setState({
            formulas: formulas
        })
    }

    render() {
        const formulas = this.state.formulas;
        return (
            <div>
                <table width="100%" >
                    <tbody>{this._renderTable(formulas)}</tbody>
                </table>
            </div>
        );
    }

    _genForumlas(row, column) {
        var formulas = [];
        for(var i=0; i<row; i++) {
            var rowContent = []
            for(var j=0; j<column; j++) {
                rowContent.push(this._genFormula())
            }
            formulas.push(rowContent)
        }
        return formulas;
    }

    _genFormula() {
        var operator = MG.operator.add;
        if (Math.floor(Math.random() * 2)) {operator = MG.operator.subtract;}

        return MG.generateFormula({
            leftDigits: 2,
            operator: operator,
            rightDigits: 2,
            minResultsDigits: 1,
            maxResultsDigits: 2,
            flags: {
                ignoreNegativeResults:true,
            }
        });
    }

    _renderRow(rowContent) {
        var rowMarup = rowContent.map((columnContent) => {
            console.log('columnContent:'+columnContent)
            return (
                <td key={columnContent}>{columnContent}</td>
            )
        });
        return rowMarup;
    }

    _renderTable(formulas) {
        var formulasMarkup = formulas.map((rowContent) => {
            return (
                <tr key={rowContent}>{this._renderRow(rowContent)}</tr>
            );
        });
        return formulasMarkup;
    }
  }
export default PreviewFormula;