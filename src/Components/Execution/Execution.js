import React from 'react';
import "./Execution.css";

const Execution = () => {
    return (
        <div className='execution'>
           <h1> Search Templates / Metadata</h1> <br/><br/>
            <div>
            Choose Templates &nbsp;&nbsp;&nbsp;&nbsp;
            <select className='templateDropdown'>
                <option>Templates</option>
                <option>Template_Id_1</option>
                <option>Template_Id_2</option>
                <option>Template_Id_3</option>
            </select>
            </div>
            <br/><br/>
            <div>
            Choose Metadata &nbsp;&nbsp;&nbsp;&nbsp;
            <select className='metadataDropdown'>
                <option>Metadata</option>
                <option>Metadata_1</option>
                <option>Metadata_2</option>
                <option>Metadata_3</option>
            </select>
            </div>
            <br/><br/>
            <div>
                Set Schedule &nbsp;&nbsp;&nbsp;&nbsp;
                <input className='cron' type='text'></input>
            </div>
            <br/><br/>
            <div className='executionButton'>
            <button>Execution</button>
            </div>
            
        </div>
    );
};

export default Execution;