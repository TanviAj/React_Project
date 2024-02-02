import React from 'react'

const Conditions = ({id,query,clauseState,handleOperand1Change,handleOperand2Change,handleOperator1Change,handleOperator2Change}) => {

  return (
    <div className='d-flex mx-2 my-2'>
         {query && <select
                value={clauseState.operator2}
                onChange={(e) => handleOperator2Change(e, id)}
              >
                <option>Operator 2</option>
                <option>Greater Than ({">"})</option>
                <option>Less Than ({"<"})</option>
                <option>Greater Than Equals({">="})</option>
                <option>Less Than Equals({"<="})</option>
                <option>Equals({"="})</option>
                <option>Not Equals({"!="})</option>
              </select>
              }
        <div className='mx-2'>
          {clauseState.operator2 && (
            <div>
              <select  value={clauseState.operand1} onChange= {(e) => handleOperand1Change(e,id)}>
                <option id="1">Operands</option>
                <option id="2" value="col">Col</option>
                <option id="3" value="int">Int</option>
                <option id="4" value="string">String</option>
                <option id="5" value="date">Date</option>
              </select> 
            </div>
          )}
          {clauseState.operand1 !== null && clauseState.operand1 === "col" ? (
            <div>
              <select >
                <option value="col_br">Col_BR</option>
                <option value="col_yv">Col_YV</option>
              </select>
            </div>
          ) : (
            clauseState.operand1 && (
              <div>
                <input  type={"text"} />
              </div>
            )
          )}

          {clauseState.operator2 && (
            <div>
              <select value={clauseState.operand2} onChange= {(e) => handleOperand2Change(e, id)}>
          <option id="1">Operands</option>
          <option id="2"value="col">Col</option>
          <option id="3"value="int">Int</option>
          <option id="4"value="string">String</option>
          <option id="5"value="date">Date</option>
          </select> 
            </div>
          )}
          {clauseState.operand2 !== null && clauseState.operand2 === "col" ? (
            <div>
              <select >
                <option value="col_br">Col_BR</option>
                <option value="col_yv">Col_YV</option>
              </select>
            </div>
          ) : (
            clauseState.operand2 && (
              <div>
                <input  type={"text"} />
              </div>
            )
          )}
        </div>
    </div>
  )
}

export default Conditions