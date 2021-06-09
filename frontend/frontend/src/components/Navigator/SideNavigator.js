import React from 'react';


function SideNavigator(props) {
    if (!props.nav) {
        return null;
      }
    return (
        <dic className="SideNavigator">
            <div>side</div>
        </dic>
    );
}



export default SideNavigator;