import React from 'react';

function Form(props: any) {
    return <form {...props}>{props.children}</form>;
}
export default Form;
