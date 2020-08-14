import React from 'react';

const AdminTextSetting = (props) => {
    const {setByEnv, disabled, ...sharedProps} = props;
    const isTextDisabled = disabled || setByEnv;

    return (
        <TextSetting
            {...sharedProps}
            labelClassName='col-sm-4'
            inputClassName='col-sm-8'
            disabled={isTextDisabled}
            footer={setByEnv ? <SetByEnv/> : null}
        />
    );
};

export default AdminTextSetting;
