import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const MyComponent = props => {
    return (
        <div>
            <p> My Other Contents </p>
            <SunEditor onChange={(contents)=>console.log(contents)}/>
        </div>
    );
};
export default MyComponent;