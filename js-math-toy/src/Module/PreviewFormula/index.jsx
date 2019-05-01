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
  
    genFormula() {
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

    componentDidMount() {
        var formulas = [];
        for(var i=0; i<this.props.row; i++) {
            var rowContent = []
            for(var j=0; j<this.props.column; j++) {
                rowContent.push(this.genFormula())
            }
            formulas.push(rowContent)
        }
        this.setState({
            formulas: formulas
        })

    }
  
    componentWillUnmount() {
      
    }

    renderRow(rowContent) {
        var rowMarup = rowContent.map((columnContent) => {
            console.log('columnContent:'+columnContent)
            return (
                <td key={columnContent}>{columnContent}</td>
            )
        });
        return rowMarup;
    }

    renderTable(formulas) {
        var formulasMarkup = formulas.map((rowContent) => {
            return (
                <tr key={rowContent}>{this.renderRow(rowContent)}</tr>
            );
        });
        return formulasMarkup;
    }
  
    render() {
        const formulas = this.state.formulas;
        return (
            <div>
                <table width="100%" >
                    <tbody>{this.renderTable(formulas)}</tbody>
                </table>
            </div>
        );
    }
  }
export default PreviewFormula;