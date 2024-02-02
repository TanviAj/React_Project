import React, { useState, useEffect } from "react";
import "./Template.css";
import { Link } from "react-router-dom";
import File from "./Files.json";
import Schema from "./Schema.json";

const Template = () => {
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [ruleNames, setRuleNames] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [selectedTableName, setSelectedTableName] = useState("");
  const [query, setQuery] = useState(null);
  const [clauseState, setClauseState] = useState({
    operator1: "",
    operator2: "",
    operand1: null,
    operand2: null,
  });

  // setClauseState({...clauseState, operator2: "add"});

  const onOptionChangeTemplateHandler = (event) => {
    const selectedTableName = event.target.value;
    setSelectedTableName(selectedTableName);
    const selectedTableData = File.find(
      (table) => table.template_name === selectedTableName
    );
    console.log("selectedTableData", selectedTableData);
    if (selectedTableData.ui.selection) {
      console.log("Hello");
      setShowButton(true);
    } else {
      console.log("Else hello");
      setShowButton(false);
    }
  };

  const handleTableChange = (event) => {
    const selectedTableName = event.target.value;
    setSelectedTable(selectedTableName);
    // Fetch the columns based on the selected table
    const selectedTableData = Schema.find(
      (table) => table.table_name === selectedTableName
    );
    if (selectedTableData) {
      setSelectedColumns(selectedTableData.columns);
    } else {
      // If the table does not have columns, reset the selectedColumns state
      setSelectedColumns([]);
    }
  };

  const handleButtonClick = (file) => {
    // Do something with the selected file, for example:
    console.log(`Button clicked for file: ${JSON.stringify(file)}`);
    const columnId = file.name;
    const selectedConfiguration = findConfigurationById(columnId);

    if (selectedConfiguration) {
      // Log or use the target attributes
      console.log("Target Attribute:", selectedConfiguration.attribute_name);
      // console.log("Rule Type:", selectedConfiguration._rule_type);
      // Add more properties as needed
    } else {
      console.error("Configuration not found for column with ID:", columnId);
    }
  };

  const findConfigurationById = (id) => {
    for (let i = 0; i < File.length; i++) {
      let curentFileObject = File[i];
      console.log("jabcsc", id, curentFileObject);
      for (
        let j = 0;
        j < curentFileObject.query_components.select.length;
        j++
      ) {
        if (
          id &&
          id.toLowerCase() ===
            curentFileObject.query_components.select[
              j
            ].attribute_name?.toLowerCase()
        ) {
          console.log("File found:", File);
          console.log(
            "Target Attribute:",
            curentFileObject.query_components.select[j].attribute_name
          );
          // getRuleNames(curentFileObject.query_components.select[j]);
          showQueryContainer(curentFileObject);
          console.log("curentFileObject", curentFileObject);
          //getRuleType(curentFileObject.ui.selection[j]);
          // Check if File and File.ui are defined
          console.log("File && File.query_components", File);
          if (File && File[0].query_components) {
            const { query_components } = File[0];

            // Check if ui.selection is defined
            if (query_components && query_components.select) {
              const selectedConfiguration = query_components.select.find(
                (config) =>
                  config.attribute_name.toLowerCase() === id.toLowerCase()
              );
              // Check if a configuration was found
              if (selectedConfiguration) {
                console.log("selectedConfiguration", selectedConfiguration);
                return selectedConfiguration;
              } else {
                console.error(
                  "Configuration not found for column with ID:",
                  id
                );
              }
            } else {
              console.error("ui.selection is not defined");
              return null;
            }
          } else {
            console.error("File or File.ui is not defined");
            return null;
          }
        } else {
          setQuery(null);
        }
      }
    }
  };

  const handleOperand1Change = (e) => {
    e.preventDefault();
    setClauseState({ ...clauseState, operand1: e.target.value });
  };
  const handleOperand2Change = (e) => {
    e.preventDefault();
    setClauseState({ ...clauseState, operand2: e.target.value });
  };

  const handleOperator1Change = (e) => {
    e.preventDefault();
    setClauseState({ ...clauseState, operator1: e.target.value });
  };

  const handleOperator2Change = (e) => {
    e.preventDefault();
    setClauseState({ ...clauseState, operator2: e.target.value });
  };

  // const getRuleNames = (curentFileObject) => {
  //   const ruleNames = [];
  //   curentFileObject._rule_derivation._conditions.map(condition => ruleNames.push(condition._condition));
  //   console.log('ruleNames',ruleNames);
  //   if (ruleNames) {
  //     setRuleNames(ruleNames);
  //   } else {
  //     setRuleNames([]);
  //   }
  //   return ruleNames;
  // };

  const showQueryContainer = (selectColumnsArray) => {
    let noramlQuery;
    console.log("selectColumnsArray", selectColumnsArray);
    for (
      let i = 0;
      i < selectColumnsArray.query_components.select.length;
      i++
    ) {
      if (selectColumnsArray.query_components.select[i].attribute_name) {
        noramlQuery = (
          <div className="wide-inner">
            <p>
              <label>Select</label>
            </p>
            <select>
              <option>Col</option>
              {selectedColumns.map((file) => (
                <option key={file.id}>
                  {file.name}&nbsp;&nbsp;&nbsp;&nbsp;
                </option>
              ))}
            </select>
            <br />
            <br />

            <p>
              <label for="table">From</label>
            </p>
            <input
              type="text"
              id="table"
              defaultValue={
                selectColumnsArray.query_components.from.source_name
              }
            />
            <br />
            <br />

            <p>
              <label for="condition">Where</label>
            </p>
            <div className="whereClause">
              <select
                value={clauseState.operator1}
                onChange={(e) => handleOperator1Change(e)}
              >
                <option>Operator 1</option>
                <option>AND</option>
                <option>OR</option>
              </select>
            </div>
          </div>
        );
      }
    }
    {
      console.log("====>", noramlQuery);
    }
    setQuery(noramlQuery);
  };

  return (
    <div className="">
      <div className="verticalContainer">
        {selectedColumns.map((file) => (
          <button key={file.id} onClick={() => handleButtonClick(file)}>
            {file.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
        ))}
      </div>

      <div className="widecontainer">
        {/* <div className="wide-inner">
        <p><label>Select</label></p>
          <select>
          <option>Col</option>
          {selectedColumns.map((file) => (
         <option key={file.id} onClick={() => handleButtonClick(file)}>{file.name}&nbsp;&nbsp;&nbsp;&nbsp;
         </option >
        ))}
          </select> 
          <br/><br/>
      
        <p><label for="table">From</label></p>
        <input type="text" id="table"/><br/><br/>

          <p><label for="condition">Where</label></p>
          <textarea id="condition" name="condition" rows="2" cols="30" ></textarea>
        
          </div> */}
        <div className="whereClause">
          {query}
          {clauseState.operator1 && (
            <div>
              <select
                className="operator2"
                value={clauseState.operator2}
                onChange={(e) => handleOperator2Change(e)}
              >
                <option>Operator 2</option>
                <option>Greater Than ({">"})</option>
                <option>Less Than ({"<"})</option>
                <option>Greater Than Equals({">="})</option>
                <option>Less Than Equals({"<="})</option>
                <option>Equals({"="})</option>
                <option>Not Equals({"!="})</option>
              </select>
            </div>
          )}

          {clauseState.operator2 && (
            <div className="operands">
              <select
                value={clauseState.operand1}
                onChange={(e) => handleOperand1Change(e)}
              >
                <option id="1">Operands</option>
                <option id="2" value="col">
                  Col
                </option>
                <option id="3" value="int">
                  Int
                </option>
                <option id="4" value="string">
                  String
                </option>
                <option id="5" value="date">
                  Date
                </option>
              </select>
            </div>
          )}
          {clauseState.operand1 !== null && clauseState.operand1 === "col" ? (
            <div className="operandsOption">
              <select>
                <option value="col_br">Col_BR</option>
                <option value="col_yv">Col_YV</option>
              </select>
            </div>
          ) : (
            clauseState.operand1 && (
              <div className="operandsOption">
                <input type={"text"} />
              </div>
            )
          )}

          {clauseState.operator2 && (
            <div className="operands">
              <select
                value={clauseState.operand2}
                onChange={(e) => handleOperand2Change(e)}
              >
                <option id="1">Operands</option>
                <option id="2" value="col">
                  Col
                </option>
                <option id="3" value="int">
                  Int
                </option>
                <option id="4" value="string">
                  String
                </option>
                <option id="5" value="date">
                  Date
                </option>
              </select>
            </div>
          )}
          {clauseState.operand2 !== null && clauseState.operand2 === "col" ? (
            <div className="operandsOption">
              <select>
                <option value="col_br">Col_BR</option>
                <option value="col_yv">Col_YV</option>
              </select>
            </div>
          ) : (
            clauseState.operand2 && (
              <div className="operandsOption">
                <input type={"text"} />
              </div>
            )
          )}
        </div>
      </div>

      <div className="navcontainer ">
        <nav className="nav">
          <div className="links">
            <Link to="/ui">UI</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/about">SQL</Link>
          </div>

          <div className="template">
            <select
              className="dropdown"
              onChange={onOptionChangeTemplateHandler}
            >
              <option>Templates</option>
              {File &&
                File.map((file) => {
                  return <option>{file.template_name}</option>;
                })}
            </select>
          </div>

          <div className="metadata">
            <select
              className="dropdown"
              value={selectedTable}
              onChange={handleTableChange}
            >
              <option value="">Metadata</option>
              {Schema.map((schema, index) => (
                <option key={index} value={schema.table_name}>
                  {schema.table_name}
                </option>
              ))}
            </select>
          </div>
        </nav>
      </div>

      <button
          type="button"
          className="editButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Edit
        </button>
      <div
        className="modalContainer modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                ></input>
                <label class="form-check-label" for="flexRadioDefault1">
                  Add
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                ></input>
                <label class="form-check-label" for="flexRadioDefault2">
                  Remove
                </label><br/>
                
            
              </div>
            </div>
            <select className="modalDropdown">
                  <option>Rule</option>
                </select>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
