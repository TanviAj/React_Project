import React, { useState, useEffect } from "react";
import "./Template.css";
import { Link } from "react-router-dom";
import File from "./Files.json";
import Schema from "./Schema.json";

const Template = () => {
  const [showSelectionDiv, setHideSelection] = useState(false);
  const [showConditionDiv, setHideCondition] = useState(false);
  const [operatorType, setOperatorType] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [ruleNames, setRuleNames] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [selectedTableName, setSelectedTableName] = useState("");

  // const handleSelection = () => {
  //   setHideSelection(true);
  //   setHideCondition(false);
  //   setOperatorType("Arthimatic");
  // };

  // const handleCondition = () => {
  //   setHideSelection(false);
  //   setHideCondition(true);
  // };

  // const handleAggregation = () => {};

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
      console.log("Target Attribute:", selectedConfiguration.target_attrbiute);
      console.log("Rule Type:", selectedConfiguration._rule_type);
      // Add more properties as needed
    } else {
      console.error("Configuration not found for column with ID:", columnId);
    }
  };

  const findConfigurationById = (id) => {
    for(let i=0;i < File.length; i++){
      let curentFileObject = File[i];
      console.log('jabcsc',id)
      for(let j=0;j<curentFileObject.ui.selection.length; j++){
      if(id && (id.toLowerCase() === curentFileObject.ui.selection[j].target_attrbiute.toLowerCase())){
        console.log("File found:", File);
        console.log("Target Attribute:", curentFileObject.ui.selection[j]);
        getRuleNames(curentFileObject.ui.selection[j]);
        // Check if File and File.ui are defined
        if (File && File.ui) {
          const { ui } = File;
          console.log("File found in if:", File);
      
          // Check if ui.selection is defined
          if (ui && ui.selection) {
            const selectedConfiguration = ui.selection.find((config) => config.target_attrbiute === `col_${id}`);
            debugger;
            // Check if a configuration was found
            if (selectedConfiguration) {
              return selectedConfiguration;
            } else {
              console.error("Configuration not found for column with ID:", id); 
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
        setRuleNames([]);
      }
      }
    }
  };

  const getRuleNames = (curentFileObject) => {
    const ruleNames = [];
    curentFileObject._rule_derivation._conditions.map(condition => ruleNames.push(condition._condition));
    console.log('ruleNames',ruleNames);
    if (ruleNames) {
      setRuleNames(ruleNames);
    } else {
      setRuleNames([]);
    }
    return ruleNames;
  };
  

  return (
    <div className="">
      <div className="container">
        {selectedColumns.map((file) => (
         <button key={file.id} onClick={() => handleButtonClick(file)}>{file.name}&nbsp;&nbsp;&nbsp;&nbsp;</button>
        ))}

      </div>

      <div className="vcontainer">
        <div className="sidebarContainer">
          {/* <div>
            {showButton && <button class="btn btn-secondary selection-btn"onClick={handleSelection}>Selection</button>}
            
          </div>

          <div>
            <button
              class="btn btn-secondary condition-btn"
              onClick={handleCondition}
            >
              Condition
            </button>
          </div>

          <div>
            <button
              class="btn btn-secondary aggregation-btn"
              onClick={handleAggregation}
            >
              Aggregation
            </button>
          </div> */}
        {ruleNames.map((ruleName) => (
         <button key={ruleName._rule_name}>{ruleName._rule_name}&nbsp;&nbsp;&nbsp;&nbsp;</button>
        ))}
        </div>
      </div>

      <div className="widecontainer">
        {/* {showSelectionDiv && (
          <div className="Button Group vertical">
            <select>
              <option value="apple">Arithmatic</option>
              <option value="orange">Logical</option>
            </select>
          
          </div>
        )}

        {showConditionDiv && (
          <div className="btn-group1">
            <button>And</button>
            <button>OR</button>
          </div>
        )} */}
      </div>

      <div className="navcontainer ">
        <nav>
          <div className="links">
            <Link to="/ui">UI</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/about">SQL</Link>
          </div>

          <div class="template">
            <select onChange={onOptionChangeTemplateHandler}>
              <option>Templates</option>
              {File &&
                File.map((file) => {
                  return <option>{file.template_name}</option>;
                })}
            </select>
          </div>

          <div class="metadata">
            <select value={selectedTable} onChange={handleTableChange}>
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
    </div>
  );
};

export default Template;
